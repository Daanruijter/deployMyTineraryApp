import axios from "axios";
import { returnErrors } from "./errorActions";

// import jwt_decode from "jwt-decode";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILURE,
  SEND_USER_TOKEN_FAILURE,
  SEND_USER_TOKEN_SUCCESS
} from "./userTypes";

//check token and load user/
export const loadUser = () => (dispatch, getState) => {
  //user loading
  dispatch({ type: USER_LOADING });

  axios
    .get("http://localhost:5000/login/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.data, err.status));

      dispatch({
        type: AUTH_ERROR
      });
    });
};

//Register User
export const register = ({
  firstName,
  lastName,
  email,
  password,
  picture
}) => dispatch => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //request body//
  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    password,
    picture
  });

  axios
    .post("http://localhost:5000/createaccount", body, config)

    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(fetchCurrentUser());
    })

    .catch(err => {
      dispatch(returnErrors(err.data, err.status, "REGISTER_FAIL"));
      console.log(err.response);
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

//setup config/headers and token

export const tokenConfig = getState => {
  //Get token from localStorage
  const token = getState().auth.token;

  // Headers;
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  //if token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

//logout user
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

//login user
//Register User
export const login = ({ email, password, firstName, lastName }) => dispatch => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  console.log(email);
  //request body//
  const body = JSON.stringify({
    email,
    password,
    firstName,
    lastName
  });

  axios
    .post("http://localhost:5000/login", body, config)

    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(fetchCurrentUser());
    })
    .catch(err => {
      dispatch(returnErrors(err.data, err.status, "LOGIN_FAIL"));

      dispatch({
        type: LOGIN_FAIL
      });
    });
};

//fetch data//
export const fetchCurrentUserRequest = () => {
  return {
    type: FETCH_CURRENT_USER_REQUEST
  };
};

export const fetchCurrentUserSuccess = currentUser => {
  return {
    type: FETCH_CURRENT_USER_SUCCESS,
    payload: currentUser
  };
};

export const fetchCurrentUserFailure = error => {
  return {
    type: FETCH_CURRENT_USER_FAILURE,
    payload: error
  };
};

export const fetchCurrentUser = () => {
  return dispatch => {
    dispatch(fetchCurrentUserRequest());

    return fetch("http://localhost:5000/currentuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-auth-token": localStorage.getItem("token")
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const currentUser = data;
        // console.log(data);

        dispatch(fetchCurrentUserSuccess(currentUser));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(fetchCurrentUserFailure(errorMessage));
      });
  };
};

//Send user token
export const sendUserToken = () => dispatch => {
  //headers
  // console.log("sendusertoken exectued, line 203");
  let headers = {
    // "Content-Type": "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    "x-auth-token": localStorage.getItem("token")
  };
  // console.log(headers);
  // JSON.stringify(token);

  // console.log(body);

  axios
    .post("http://localhost:5000/currentuser", {}, { headers })
    .then(res => {
      // console.log("line 220");
      dispatch({
        type: SEND_USER_TOKEN_SUCCESS,
        payload: res.data
      });
    })

    .catch(err => {
      dispatch({
        type: SEND_USER_TOKEN_FAILURE
      });

      console.log(err.response);
    });
};
// console.log(res);
