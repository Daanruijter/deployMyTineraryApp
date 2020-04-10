import { SEND_COMMENTS_PATH } from "../actions/commentTypes";

const initialState = {
  commentsPath: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEND_COMMENTS_PATH:
      return {
        commentsPath: action.payload,
      };

    default:
      return state;
  }
}
