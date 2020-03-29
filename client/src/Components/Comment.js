import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

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
    const variables = {
      content: this.state.comment,
      writer: this.props.state.auth.user._id,
      postId: this.props.itineraryId
    };
    axios
      .post("http://localhost:5000/comments/saveComment", variables)
      .then(response => {
        console.log(response);
        if (response.data.success) {
          this.setState({ comment: "" });
          //new comment we just saved in Mongo is response.data.result//
          this.props.refreshFunction(response.data.result);
        } else {
          alert("failed to save comment");
        }
        console.log(variables);
      });
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
