import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "../CSS/Comments.css";
import { Redirect } from "react-router-dom";
import DeleteComments from "./DeleteComments";
import { sendCommentsPath } from "../store/actions/commentActions";
import { register } from "../store/actions/authActions";

class Comment extends Component {
  state = {
    comment: "",
    redirect: null,
    currentUserMatch: "",
  };

  componentDidMount() {
    this.setStateOf();
  }

  setStateOf = () => {
    let that = this;
    setTimeout(function () {
      if (
        that.props.state.auth.currentUser !== null &&
        that.props.commentListsMongo[0] !== undefined
      ) {
        console.log(
          that.props.state.auth.currentUser.firstName +
            that.props.state.auth.currentUser.lastName,
          that.props.commentListsMongo
        );
        that.setState({
          currentUserMatch: that.props.state.auth.currentUser._id.includes(
            that.props.commentListsMongo[0].writer
          ),
        });
      }
    }, 5000);
  };

  redirectToLogin = (e) => {
    e.preventDefault();

    this.setState({ redirect: "/Login/" });
    let itineraryPathName = this.props.itineraryPathName;
    this.props.sendCommentsPath(itineraryPathName);
  };

  handleChange = (e) => {
    let comment = e.currentTarget.value;

    this.setState({ comment: comment });
  };

  onSubmit = (e) => {
    e.preventDefault();

    let url = "";

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/comments/saveComment";
    }
    if (process.env.NODE_ENV === "production") {
      url = "https://myitinerariestravelapp.herokuapp.com/comments/saveComment";
    }
    let date = new Date();
    let day = date.getDate();
    let month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    let monthText = month[date.getMonth()];
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let commentMoment =
      day + " " + monthText + " " + year + " " + hours + ":" + minutes;

    let content = this.state.comment;
    let writer = this.props.state.auth.user;
    let postId = this.props.itineraryId;
    let userData = this.props.state.auth.user;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      content,
      writer,
      postId,
      userData,
      commentMoment,
    });

    axios
      .post(url, body, config)
      .then((res) => {
        this.setState({ comment: "" });
        this.props.refreshFunction(res.data.result);
        this.props.getCurrentCommentsAfterUpdate();
      })

      .catch((err) => {
        console.log(err.response.data);
      });
  };

  // let favouritesToShow = favourites.map((favouriteItinerary, index) => (

  render() {
    //   console.log(this.props.state.auth.currentUser._id);
    //   console.log(this.props.commentListsMongo[0].writer);
    // }
    // if (this.state.redirect !== null) {
    //   return <Redirect to={this.state.redirect} />;
    // }
    let commentLists = this.props.commentListsMongo;

    let commentListsDisplay = commentLists.map((comment) => (
      <div className="commentbox" key={comment._id}>
        <div className="comment-username">
          {comment.userData.firstName} {comment.userData.lastName + ":"}{" "}
          {comment.commentMoment}
        </div>
        <div className="comment-content">{comment.content}</div>
        {comment.writer.includes(this.props.state.auth.currentUser._id) ? (
          <div className="comment-delete">
            <DeleteComments
              getCurrentCommentsAfterUpdate={
                this.props.getCurrentCommentsAfterUpdate
              }
              commentId={comment._id}
            ></DeleteComments>
          </div>
        ) : null}
        <div className="comment-horizontal-line">
          <hr />
        </div>
      </div>
    ));
    let commentListsDisplayWithoutRemoveButton = commentLists.map((comment) => (
      <div className="commentbox" key={comment._id}>
        <div className="comment-username">
          {comment.userData.firstName} {comment.userData.lastName + ":"}{" "}
          {comment.commentMoment}
        </div>
        <div className="comment-content">{comment.content}</div>
        <div className="comment-delete"></div>
        <div className="comment-horizontal-line">
          <hr />
        </div>
      </div>
    ));

    return (
      <div>
        {" "}
        {this.props.state.auth.isAuthenticated ? (
          <div className="comment-all-wrapper">
            <form onSubmit={this.onSubmit}>
              <label>
                <input
                  type="text"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.comment}
                  placeholder="write some comments"
                ></input>
                <button>Submit</button>
              </label>
            </form>
            <p>comments</p>
            <div className="comment-wrapper">
              <div className="comment-flexer">{commentListsDisplay}</div>
            </div>
            <hr></hr>
          </div>
        ) : (
          <div className="comment-all-wrapper">
            To write a comment, please
            <p
              className="comment-login-redirecter"
              onClick={this.redirectToLogin}
            >
              &nbsp;login
            </p>
            <div className="comment-wrapper">
              <div className="comment-flexer">
                {commentListsDisplayWithoutRemoveButton}
              </div>
            </div>
            <hr></hr>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendCommentsPath: (itineraryPathName) =>
      dispatch(sendCommentsPath(itineraryPathName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
