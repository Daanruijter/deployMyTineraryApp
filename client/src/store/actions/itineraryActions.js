import jwt_decode from "jwt-decode";
import axios from "axios";

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
} from "./itineraryTypes";
import { fetchFavourites } from "./favouriteActions";

//fetch data//
export const fetchItinerariesRequest = () => {
  return {
    type: FETCH_ITINERARIES_REQUEST
  };
};

export const fetchItinerariesSuccess = cities => {
  return {
    type: FETCH_ITINERARIES_SUCCESS,
    payload: cities
  };
};

export const fetchItinerariesFailure = error => {
  return {
    type: FETCH_ITINERARIES_FAILURE,
    payload: error
  };
};

export const fetchItineraries = cityItinerariesToBeFetched => {
  return dispatch => {
    dispatch(fetchItinerariesRequest());

    //template literal string

    return fetch(
      `http://localhost:5000/itineraries/${cityItinerariesToBeFetched}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        const itineraries = data;

        dispatch(fetchItinerariesSuccess(itineraries));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(fetchItinerariesFailure(errorMessage));
      });
  };
};
//Increase like button with a put request//

export const increaseItinerariesCountRequest = () => {
  return {
    type: INCREASE_ITINERARIES_COUNT_REQUEST
  };
};

export const increaseItinerariesCountSuccess = () => {
  return {
    type: INCREASE_ITINERARIES_COUNT_SUCCESS,
    payload: "increase successfully"
  };
};

export const increaseItinerariesCountFailure = error => {
  return {
    type: INCREASE_ITINERARIES_COUNT_FAILURE,
    payload: error
  };
};

export const increaseItinerariesCount = itineraryId => dispatch => {
  let headers = {
    // "Content-Type": "application/x-www-form-urlencoded",
    // "x-auth-token": localStorage.getItem("token")
  };

  let currentItinerary = itineraryId;
  let body = "";

  axios
    .put(
      `http://localhost:5000/itineraries/increaseitinerariestocount/${currentItinerary}`,
      body,
      {
        headers
      }
    )

    .then(res => {
      dispatch({
        type: INCREASE_ITINERARIES_COUNT_REQUEST
      });
      // console.log("line 23");
      dispatch({
        type: INCREASE_ITINERARIES_COUNT_SUCCESS,
        payload: res.data
      });
      // dispatch(this.fetchFavourites());
      // console.log(res);
    })
    .catch(err => {
      dispatch({
        type: INCREASE_ITINERARIES_COUNT_FAILURE,
        payload: err.response
      });

      // console.log(err.response);
    });
};

//Decrease like button with a put request//

export const decreaseItinerariesCountRequest = () => {
  return {
    type: DECREASE_ITINERARIES_COUNT_REQUEST
  };
};

export const decreaseItinerariesCountSuccess = () => {
  return {
    type: DECREASE_ITINERARIES_COUNT_SUCCESS,
    payload: "decrease successfully"
  };
};

export const decreaseItinerariesCountFailure = error => {
  return {
    type: DECREASE_ITINERARIES_COUNT_FAILURE,
    payload: error
  };
};

export const decreaseItinerariesCount = itineraryId => dispatch => {
  let headers = {
    // "Content-Type": "application/x-www-form-urlencoded",
    // "x-auth-token": localStorage.getItem("token")
  };

  let currentItinerary = itineraryId;
  let body = "";

  axios
    .put(
      `http://localhost:5000/itineraries/decreaseitinerariestocount/${currentItinerary}`,
      body,
      {
        headers
      }
    )

    .then(res => {
      dispatch({
        type: DECREASE_ITINERARIES_COUNT_REQUEST
      });
      // console.log("line 23");
      dispatch({
        type: DECREASE_ITINERARIES_COUNT_SUCCESS,
        payload: res.data
      });
      // console.log(res);
    })
    .catch(err => {
      dispatch({
        type: DECREASE_ITINERARIES_COUNT_FAILURE,
        payload: err.response
      });

      // console.log(err.response);
    });
};
