import React, { Component } from "react";
import "../CSS/Login.css";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { clearErrors } from "../store/actions/errorActions";
import { login } from "../store/actions/authActions";
import { fetchCurrentUser } from "../store/actions/authActions";
import { sendUserToken } from "../store/actions/authActions";
import { fetchFavouritesPage } from "../store/actions/favouriteActions";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      loginDivOpen: true,
      redirect: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  // componentDidMount() {
  //   console.log(this.props);
  // }

  toggle = () => {
    this.setState({
      loginDivOpen: !this.state.loginDivOpen,
    });

    if (this.state.loginDivOpen) {
      this.setState({ redirect: "/" });

      let that = this;
      setTimeout(function () {
        if (that.props.changeLoginOpen !== undefined) {
          that.props.changeLoginOpen();
        }
      }, 500);
    }
  };
  componentDidMount() {
    if (this.props.state.auth.token) {
      this.props.fetchFavouritesPage();
    }
  }
  componentDidUpdate(prevProps) {
    console.log("reload");
    const { error } = this.props;

    if (error !== prevProps.error) {
      //check for register error

      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    let user = this.state;

    //attempt to login//
    this.props.login(user);
    this.setState({
      [e.target.name]: e.target.value,

      password: "",
      email: "",
    });

    let password = this.props.password;
    let email = this.props.email;
    if (password !== "" && email !== "") {
      console.log("logged in");
      // this.setState({ loginDivOpen: false }, console.log("logindivclose"));
      console.log(this.props.state.commentsPath.commentsPath);
      this.setState({ redirect: this.props.state.commentsPath.commentsPath });
      this.props.clearErrors();
    }

    await this.props.sendUserToken();
    await this.props.fetchCurrentUser();
  };

  render() {
    if (this.state.redirect !== null) {
      console.log("adlajljadjlljsld;djadlkjadladjasdjk");
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div className="login-wrapper">
        {this.state.loginDivOpen ? (
          <div className="user-loginform">
            {this.state.msg ? (
              <div className="login-alert">Alert! {this.state.msg}</div>
            ) : null}

            <form onSubmit={this.handleSubmit}>
              <div className="form-flexer">
                <div className="form-password">
                  <label>Password: </label>
                  <input
                    name="password"
                    placeholder="password"
                    type="password"
                    value={this.state.password}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="form-email">
                  <label>E-mail: </label>
                  <input
                    name="email"
                    placeholder="e-mail"
                    type="text"
                    value={this.state.email}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
              </div>
              <br />
              <div className="submitbutton">
                <input
                  onClick={(e) => this.handleSubmit(e)}
                  type="submit"
                  value="Please click after entering your data"
                />
              </div>
            </form>

            <div className="close-login-field" onClick={this.toggle}>
              close
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
  };
};

export default connect(mapStateToProps, {
  login,
  fetchCurrentUser,
  sendUserToken,
  clearErrors,
})(Login);
