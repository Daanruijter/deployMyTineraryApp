import React, { Component } from "react";
import "../CSS/DeleteComments.css";
import axios from "axios";

export default class Deletecomment extends Component {
  deleteComment = () => {
    console.log(this.props.commentId);
  };

  render() {
    return (
      <div onClick={this.deleteComment} className="delete-comments-button">
        X
      </div>
    );
  }
}
