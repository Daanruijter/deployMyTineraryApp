import { SEND_CITYNAME } from "../actions/cityTypes";

const initialState = {
  cityName: "s"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_CITYNAME:
      return {
        ...state,
        cityName: action.value
      };

    default:
      return state;
  }
};

export default reducer;
