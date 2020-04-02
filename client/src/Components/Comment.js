import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

// Thanks, Pol! This is a complicated part for me and you help me a lot to understand it:P I have

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
    let writer = this.props.state.auth.user._id;
    let postId = this.props.itineraryId;

    console.log(content, writer, postId);

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({
      content,
      writer,
      postId
    });

    axios
      .post(url, body, config)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response.data);
      });

    // axios
    //   .post(
    //     "http://myitinerariestravelapp.herokuapp.com/comments/saveComment",
    //     body,
    //     {
    //       headers
    //     }
    //   )
    //   .then(response => {
    //     console.log(response);
    //     if (response.data.success) {
    //       this.setState({ comment: "" });
    //       //new comment we just saved in Mongo is response.data.result//
    //       this.props.refreshFunction(response.data.result);
    //     } else {
    //       alert("failed to save comment");
    //     }
    //     console.log(body);
    //   });
  };

  render() {
    return (
      <div>
        <p>replies</p>
        {/* comment lists */}
        {/* root comment form */}
        <hr></hr>
        {this.props.commentList}
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
