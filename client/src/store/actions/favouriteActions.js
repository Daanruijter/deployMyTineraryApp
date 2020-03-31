import {
  POST_FAVOURITES_SUCCESS,
  POST_FAVOURITES_FAILURE,
  DELETE_FAVOURITES_SUCCESS,
  DELETE_FAVOURITES_FAILURE,
  FETCH_FAVOURITES_REQUEST,
  FETCH_FAVOURITES_SUCCESS,
  FETCH_FAVOURITES_FAILURE,
  FETCH_FAVOURITES_PAGE_REQUEST,
  FETCH_FAVOURITES_PAGE_SUCCESS,
  FETCH_FAVOURITES_PAGE_FAILURE
} from "./favouriteTypes";

import jwt_decode from "jwt-decode";
import axios from "axios";

//Post favourites
export const postFavourites = favouriteData => dispatch => {
  let headers = {};
  let favourites = favouriteData;

  var token = localStorage.getItem("token");
  var decoded = jwt_decode(token);

  let currentUserId = decoded.id;

  let body = { itineraryId: favourites.itineraryId };

  axios
    .post(
      `https://myitinerariestravelapp.herokuapp.com/favourites/${currentUserId}`,
      body,
      {
        headers
      }
    )
    .then(res => {
      dispatch({
        type: POST_FAVOURITES_SUCCESS,
        payload: res.data
      });

      dispatch(fetchFavourites(currentUserId));
    })
    .catch(err => {
      dispatch({
        type: POST_FAVOURITES_FAILURE,
        payload: err.response
      });
    });
};

//Delete favourites
export const deleteFavourites = favouriteData => dispatch => {
  let itineraryId = favouriteData.itineraryId;

  var token = localStorage.getItem("token");
  var decoded = jwt_decode(token);

  let currentUserId = decoded.id;

  let headers = {
    Authorization: localStorage.getItem("token")
  };
  let body = "test";

  axios
    .delete(
      `https://myitinerariestravelapp.herokuapp.com/favourites/delete/${currentUserId}/${itineraryId}`,
      body,
      {
        headers
      }
    )

    .then(res => {
      dispatch({
        type: DELETE_FAVOURITES_SUCCESS,
        payload: res.data
      });
      dispatch(fetchFavourites(currentUserId));

      let currentUserIdToFetch = currentUserId;
    })

    .catch(err => {
      dispatch({
        type: DELETE_FAVOURITES_FAILURE,
        payload: err.response
      });
    });
};

//FETCH THE FAVOURITES//

//fetch data//
export const fetchFavouritesRequest = () => {
  return {
    type: FETCH_FAVOURITES_REQUEST,
    favouritesloading: true
  };
};

export const fetchFavouritesSuccess = favourites => {
  return {
    type: FETCH_FAVOURITES_SUCCESS,
    payload: favourites
  };
};

export const fetchFavouritesFailure = error => {
  return {
    type: FETCH_FAVOURITES_FAILURE,
    payload: error
  };
};

export const fetchFavourites = currentUserIdToFetch => {
  var token = localStorage.getItem("token");
  var decoded = jwt_decode(token);

  let currentUserId = decoded.id;

  return dispatch => {
    dispatch(fetchFavouritesRequest());

    return fetch(
      `https://myitinerariestravelapp.herokuapp.com/favourites/getfavourites/${currentUserId}`,
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
        const favourites = data;

        localStorage.setItem(
          "favouritesArrayLocalStorage",
          JSON.stringify(data)
        );
        dispatch(fetchFavouritesSuccess(favourites));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(fetchFavouritesFailure(errorMessage));
      });
  };
};

//FETCH THE FAVOURITE PAGE//

//fetch data//
export const fetchFavouritesPageRequest = () => {
  return {
    type: FETCH_FAVOURITES_PAGE_REQUEST
  };
};

export const fetchFavouritesPageSuccess = favouritesPage => {
  // console.log(favourites);
  return {
    type: FETCH_FAVOURITES_PAGE_SUCCESS,
    //change//
    payload: favouritesPage
  };
};

export const fetchFavouritesPageFailure = error => {
  return {
    type: FETCH_FAVOURITES_PAGE_FAILURE,
    payload: error
  };
};

export const fetchFavouritesPage = favouritesArray => {
  var token = localStorage.getItem("token");
  var decoded = jwt_decode(token);
  let data = favouritesArray;

  let currentUserId = decoded.id;

  return dispatch => {
    dispatch(fetchFavouritesPageRequest());

    return fetch(
      `https://myitinerariestravelapp.herokuapp.com/favourites/getFavouritesPage/${currentUserId}`,

      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          favouritesarray: data
        }
      }
    )
      .then(response => {
        return response.json(data);
      })
      .then(data => {
        const favouritesPage = data;

        dispatch(fetchFavouritesPageSuccess(favouritesPage));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(fetchFavouritesPageFailure(errorMessage));
      });
  };
};
