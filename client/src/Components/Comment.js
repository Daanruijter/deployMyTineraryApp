import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "../CSS/Comments.css";

class Comment extends Component {
  state = {
    comment: ""
  };

  handleChange = e => {
    let comment = e.currentTarget.value;
    console.log(comment);
    this.setState({ comment: comment });
  };

  onSubmit = e => {
    e.preventDefault();
    let url = "";

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/comments/saveComment";
    }
    if (process.env.NODE_ENV === "production") {
      url = "https://myitinerariestravelapp.herokuapp.com/comments/saveComment";
    }

    let content = this.state.comment;
    let writer = this.props.state.auth.user;
    let postId = this.props.itineraryId;
    let userData = this.props.state.auth.user;

    console.log(content, writer, postId);

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({
      content,
      writer,
      postId,
      userData
    });

    axios
      .post(url, body, config)
      .then(res => {
        console.log(res);
        this.setState({ comment: "" });
        this.props.refreshFunction(res.data.result);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  // let favouritesToShow = favourites.map((favouriteItinerary, index) => (

  render() {
    let commentLists = this.props.commentListsMongo;
    let commentListsDisplay = commentLists.map(comment => (
      <div className="commentbox" key={comment._id}>
        <p className="comment-username">
          {comment.userData.firstName} {comment.userData.lastName}
          {":"}
        </p>{" "}
        {comment.content}
        <hr />
      </div>
    ));
    console.log(commentListsDisplay);

    return (
      <div className="comment-all-wrapper">
        <form onSubmit={this.onSubmit}>
          <label>
            <input
              type="text"
              onChange={e => this.handleChange(e)}
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
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state
  };
};
export default connect(mapStateToProps, null)(Comment);

// mapDispatchToProps
