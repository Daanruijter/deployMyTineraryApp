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
} from "../actions/favouriteTypes";

const initialState = {
  favouriteData: "",
  postError: "",
  deleteError: "",
  loading: true,
  favouritesArray: [],
  fetchFavouritesError: "",
  getFavouritesPageError: "",
  favouritesPage: []
};

const reducer = (state = initialState, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case POST_FAVOURITES_SUCCESS:
      return {
        ...state,
        favouriteData: action.payload
      };
    case POST_FAVOURITES_FAILURE:
      return {
        postError: ""
      };
    case DELETE_FAVOURITES_SUCCESS:
      return {
        ...state,
        favouriteData: action.payload
      };
    case DELETE_FAVOURITES_FAILURE:
      return {
        ...state,
        deleteError: ""
      };

    case FETCH_FAVOURITES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_FAVOURITES_SUCCESS:
      return {
        ...state,
        favouritesArray: action.payload,
        fetchFavouritesError: ""
      };
    case FETCH_FAVOURITES_FAILURE:
      return {
        ...state,
        favouritesArray: [],
        fetchFavouritesError: action.payload
      };
    case FETCH_FAVOURITES_PAGE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_FAVOURITES_PAGE_SUCCESS:
      return {
        ...state,
        favouritesPage: action.payload,
        getFavouritesPageError: ""
      };
    case FETCH_FAVOURITES_PAGE_FAILURE:
      return {
        ...state,
        favouritesPage: [],
        getFavouritesPageError: action.payload
      };
    default:
      return state;
  }
};
export default reducer;
