import {
  USER_LOADING,
  USER_LOADED,
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
} from "../actions/userTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  userId: null,
  currentUser: null,
  currentUserloading: null,
  sendUsertoken: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        currentUser: ""
      };

    case FETCH_CURRENT_USER_REQUEST:
      return {
        ...state,
        currentUserloading: true
      };
    case FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUserloading: false,
        currentUser: action.payload,
        error: ""
      };
    case FETCH_CURRENT_USER_FAILURE:
      return {
        ...state,
        currentUserloading: false,
        currentUser: null,
        error: action.payload
      };

    case SEND_USER_TOKEN_SUCCESS:
      return {
        ...state,
        sendUsertoken: true
      };
    case SEND_USER_TOKEN_FAILURE:
      return {
        ...state,
        sendUsertoken: false
      };

    default:
      return state;
  }
}
