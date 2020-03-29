// import React from "react";
import "../CSS/App.css";
import "../CSS/HamburgerMenu.css";
import DrawerToggleButton from "./DrawerToggleButton";
import { connect } from "react-redux";
import React, { Component } from "react";
import Login from "./Login";
import Logout from "./Logout";
import CreateAccount from "./CreateAccount";
import jwt_decode from "jwt-decode";
import { fetchCurrentUser } from "../store/actions/authActions";
import { sendUserToken } from "../store/actions/authActions";
import { fetchFavourites } from "../store/actions/favouriteActions";

// const express = require("express");
// const router = express.Router();

class HamburgerMenu extends Component {
  state = {
    loginOpen: false
  };

  showUsername() {
    let userName = "";
    if (this.props.state.auth.currentUser !== null) {
      userName =
        this.props.state.auth.currentUser.firstName +
        this.props.state.auth.currentUser.lastName;
      return userName;
    }
  }

  componentDidMount() {
    this.props.fetchCurrentUser();

    if (
      this.props.state.auth.isAuthenticated !== null ||
      this.props.state.auth.isAuthenticated !== false
    ) {
      this.props.sendUserToken();
    }

    // if (this.props.state.auth.isAuthenticated !== false) {
    //   var token = localStorage.getItem("token");

    //   var decoded = jwt_decode(token);
    //   let currentUserIdToFetch = decoded.id;

    //   this.props.fetchFavourites(currentUserIdToFetch);
    // }

    // console.log("componentdidmount");

    // if (
    //   this.props.state.auth.isAuthenticated !== true &&
    //   localStorage.getItem("token")
    // ) {
    //   // console.log("users fetched");
    //   var token = localStorage.getItem("token");
    //   var decoded = jwt_decode(token);
    //   let currentUserIdToFetch = decoded.id;
    //   // let currentUserIdToFetch = this.props.state.auth.currentUser._id;
    //   // console.log(currentUserIdToFetch);

    //   this.props.fetchFavourites(currentUserIdToFetch);
    // }
  }

  toggleLogin = () => {
    // console.log(this.state);
    // if (this.state.registerOpen !== true) {
    this.setState({
      loginOpen: !this.state.loginOpen,
      registerOpen: false
    });
    // }
  };

  toggleRegisterOpen = () => {
    // if (this.state.loginOpen !== true) {
    this.setState({
      registerOpen: !this.state.registerOpen,
      loginOpen: false
    });
    // }
  };

  render() {
    let userName = this.showUsername();
    // setTimeout(function() {
    //   alert("Hello");
    // }, 3000);

    // console.log(this.props.state.auth.currentUser.lastName);

    return (
      <header className="hamburger-menu-header">
        <nav className="hamburger-menu-navigation">
          {localStorage.getItem("token") ? (
            <div className="hamburger-grid-loggedin">
              <div className="register-login-container-loggedin">
                <div className="hamburger-logout">
                  <Logout></Logout>
                </div>
              </div>
              <div className="hamburger-welcome-user">Welcome, {userName} </div>

              <div className="hamburger-icon">
                <div className="hamburger-icon-flexer">
                  <DrawerToggleButton
                    click={this.props.drawerToggleClickHandler}
                  ></DrawerToggleButton>
                </div>
              </div>
            </div>
          ) : (
            <div className="hamburger-grid">
              <div className="register-login-container">
                <div
                  onClick={this.toggleRegisterOpen}
                  className="hamburger-register"
                >
                  register
                </div>
                <div onClick={this.toggleLogin} className="hamburger-login">
                  login
                </div>
              </div>
              <div className="hamburger-icon">
                <div className="hamburger-icon-flexer">
                  <DrawerToggleButton
                    click={this.props.drawerToggleClickHandler}
                  ></DrawerToggleButton>
                </div>
              </div>
            </div>
          )}

          <div className="hamburger-menu-container">
            <div className="hamburger-menu-user-logo"></div>
            {/* login */}
            {!localStorage.getItem("token") ? (
              <div>{this.state.loginOpen ? <Login></Login> : null}</div>
            ) : null}
            {/* register */}
            {!localStorage.getItem("token") ? (
              <div>
                {this.state.registerOpen ? (
                  <CreateAccount></CreateAccount>
                ) : null}
              </div>
            ) : null}
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  };
};

export default connect(mapStateToProps, {
  fetchCurrentUser,
  sendUserToken
  // fetchFavourites
})(HamburgerMenu);
