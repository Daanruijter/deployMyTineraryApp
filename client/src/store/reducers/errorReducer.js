import { GET_ERRORS, CLEAR_ERRORS } from "../actions/userTypes";

const initialState = {
  msg: {},
  status: null,
  id: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
}

// USER_LOADING,
// USER_LOADED,
// AUTH_ERROR,
// LOGIN_SUCCESS,
// LOGIN_FAIL,
// LOGOUT_SUCCESS,
// REGISTER_SUCCESS,
// REGISTER_FAIL,
