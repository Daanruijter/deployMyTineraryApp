import React, { Component } from "react";
import { logout } from "../store/actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../CSS/Logout.css";

class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return <div onClick={this.props.logout}>logout</div>;
  }
}
const mapStateToProps = state => {
  return {
    state: state
  };
};

export default connect(mapStateToProps, { logout })(Logout);
