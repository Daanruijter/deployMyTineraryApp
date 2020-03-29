import {
  FETCH_ITINERARIES_REQUEST,
  FETCH_ITINERARIES_SUCCESS,
  FETCH_ITINERARIES_FAILURE,
  DECREASE_ITINERARIES_COUNT_REQUEST,
  DECREASE_ITINERARIES_COUNT_SUCCESS,
  DECREASE_ITINERARIES_COUNT_FAILURE,
  INCREASE_ITINERARIES_COUNT_REQUEST,
  INCREASE_ITINERARIES_COUNT_SUCCESS,
  INCREASE_ITINERARIES_COUNT_FAILURE
} from "../actions/itineraryTypes";

const initialState = {
  loadingItineraries: true,
  itineraries: [],
  puttingIncrease: false,
  puttingIncreaseSuccess: false,
  puttingIncreaseError: "",
  puttingDecrease: false,
  puttingDecreaseSuccess: false,
  puttingDecreaseError: "",
  error: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITINERARIES_REQUEST:
      return {
        ...state,
        loadingItineraries: true
      };
    case FETCH_ITINERARIES_SUCCESS:
      return {
        ...state,
        loadingItineraries: false,
        itineraries: action.payload,
        error: ""
      };
    case FETCH_ITINERARIES_FAILURE:
      return {
        ...state,
        loadingItineraries: false,
        itineraries: [],
        error: action.payload
      };
    case DECREASE_ITINERARIES_COUNT_REQUEST:
      return {
        ...state,
        puttingDecrease: true,
        error: action.payload
      };
    case DECREASE_ITINERARIES_COUNT_SUCCESS:
      return {
        ...state,
        puttingDecrease: false,
        puttingDecreaseSuccess: true,

        error: action.payload
      };
    case DECREASE_ITINERARIES_COUNT_FAILURE:
      return {
        ...state,
        puttingDecrease: false,
        puttingDecreaseError: true,
        error: action.payload
      };
    case INCREASE_ITINERARIES_COUNT_REQUEST:
      return {
        ...state,
        puttingIncrease: true,
        error: action.payload
      };
    case INCREASE_ITINERARIES_COUNT_SUCCESS:
      return {
        ...state,
        puttingIncrease: false,
        puttingIncreaseSuccess: true,

        error: action.payload
      };
    case INCREASE_ITINERARIES_COUNT_FAILURE:
      return {
        ...state,
        puttingIncrease: false,
        puttingIncreaseError: true,
        error: action.payload
      };
    default:
      return state;
  }
};
export default reducer;
