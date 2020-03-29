import React, { Component } from "react";
import "../CSS/CreateAccount.css";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../store/actions/authActions";

import { clearErrors } from "../store/actions/errorActions";

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createaccountDivOpen: true,
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      picture: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  toggle = () => {
    console.log(this.state);
    this.setState({
      createaccountDivOpen: !this.state.createaccountDivOpen
    });
  };

  // componentDidMount() {
  //   this.props.getUserId();
  // }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      //check for register error

      if (error.id === "REGISTER_FAIL") {
        console.log(error.msg);
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    let user = this.state;

    //attempt to register//
    this.props.register(user);
    this.setState({
      [e.target.name]: e.target.value,

      firstName: "",
      lastName: "",
      password: "",
      email: "",
      picture: ""
    });
    let firstName = this.props.firstName;
    let lastName = this.props.lastName;
    let password = this.props.password;
    let email = this.props.email;
    let picture = this.props.picture;

    if (
      firstName !== "" &&
      lastName !== "" &&
      password !== "" &&
      email !== "" &&
      picture !== ""
    ) {
      this.props.clearErrors();
    }
  };

  render() {
    return (
      <div>
        {this.state.createaccountDivOpen ? (
          <div className="user-registration-form">
            {this.state.msg ? (
              <div className="register-alert">Alert! {this.state.msg}</div>
            ) : null}
            <form onSubmit={this.handleSubmit}>
              <label>
                First name:
                <input
                  name="firstName"
                  placeholder="first name"
                  type="text"
                  value={this.state.firstName}
                  onChange={e => this.handleChange(e)}
                />
              </label>
              <label>
                <br />
                Last name:
                <input
                  name="lastName"
                  placeholder="last name"
                  type="text"
                  value={this.state.lastName}
                  onChange={e => this.handleChange(e)}
                />
              </label>
              <label>
                <br />
                Password:
                <input
                  name="password"
                  placeholder="password"
                  type="password"
                  value={this.state.password}
                  onChange={e => this.handleChange(e)}
                />
              </label>
              <label>
                <br />
                E-mail:
                <input
                  name="email"
                  placeholder="e-mail"
                  type="text"
                  value={this.state.email}
                  onChange={e => this.handleChange(e)}
                />
              </label>
              <label>
                <br />
                Picture:
                <input
                  name="picture"
                  placeholder="picture"
                  type="text"
                  value={this.state.picture}
                  onChange={e => this.handleChange(e)}
                />
              </label>
              <br />
              <div className="submitbutton">
                <input
                  onClick={e => this.handleSubmit(e)}
                  type="submit"
                  value="Please click after entering your data"
                />
              </div>
            </form>
            <div onClick={this.toggle} className="close-register-field">
              close
            </div>
          </div>
        ) : null}
      </div>
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

export default connect(mapStateToProps, { register, clearErrors })(
  CreateAccount
);
