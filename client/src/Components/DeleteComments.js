import React, { Component } from "react";
import "../CSS/DeleteComments.css";
import axios from "axios";

export default class Deletecomment extends Component {
  deleteComment = () => {
    console.log("deletecomment");

    let url = "";

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/comments/deleteComment";
    }
    if (process.env.NODE_ENV === "production") {
      url =
        "https://myitinerariestravelapp.herokuapp.com/comments/deleteComment";
    }
    let commentId = this.props.commentId;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      commentId,
    });

    axios
      .post(url, body, config)
      .then((res) => {
        console.log(res);
        this.props.getCurrentCommentsAfterUpdate();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  render() {
    return (
      <div onClick={this.deleteComment} className="delete-comments-button">
        X
      </div>
    );
  }
}
