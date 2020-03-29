import React, { Component } from "react";
import { MdFavorite } from "react-icons/md";
import "../CSS/FavouriteIcon.css";
import { connect } from "react-redux";
import { postFavourites } from "../store/actions/favouriteActions";
import { deleteFavourites } from "../store/actions/favouriteActions";
import { fetchFavourites } from "../store/actions/favouriteActions";
import { decreaseItinerariesCount } from "../store/actions/itineraryActions";
import { increaseItinerariesCount } from "../store/actions/itineraryActions";

import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

class FavouriteIcon extends Component {
  state = {
    itineraryFavourite: false,
    favouritesArray: []
  };

  //dispatch an action that does this//

  componentDidMount() {
    console.log("componentdidmountfromfavcon");
    console.log(this.props.id);
    console.log(this.props.favouritesArrayItineraryComponentFromLocalStorage);

    //added extra condition to make the back to itineraries link work//
    if (
      this.props.favouritesArrayItineraryComponentFromLocalStorage
        .favourites === undefined ||
      this.props.favouritesArrayItineraryComponentFromLocalStorage.favourites.includes(
        this.props.id
      )
    ) {
      this.setState({ itineraryFavourite: true });
    }
  }
  loginAlert() {
    alert("Please login to add to favourites");
  }

  makeFavourite(e) {
    console.log(this.props.favouritesarray);

    let isAuthenticated = this.props.state.auth.isAuthenticated;

    let itineraryId = this.props.id;

    //title of the itinerary//
    let itineraryTitle = this.props.title;

    //currentUser-id//
    let currentUserId = this.props.state.auth.currentUser._id;

    //currentUser-name//
    let currentUserName =
      this.props.state.auth.currentUser.firstName +
      "" +
      this.props.state.auth.currentUser.lastName;

    //create an object with the data//
    let favouriteData = {
      itineraryId,
      itineraryTitle,
      currentUserId,
      currentUserName,
      isAuthenticated
    };

    if (this.props.favouritesarray.includes(this.props.id)) {
      this.props.deleteFavourites(favouriteData);
      this.props.decreaseItinerariesCount(itineraryId);
      this.setState({ itineraryFavourite: false });
      window.location.reload();

      console.log(this.props.id, "is in the array");
    }
    if (!this.props.favouritesarray.includes(this.props.id)) {
      this.props.postFavourites(favouriteData);
      this.props.increaseItinerariesCount(itineraryId);
      this.setState({ itineraryFavourite: true });
      console.log(this.props.id, "is not in the array");
      window.location.reload();
    }
  }

  render() {
    return (
      <div>
        {this.props.state.auth.isAuthenticated ? (
          <div onClick={e => this.makeFavourite(e)}>
            {this.state.itineraryFavourite ? (
              <div>
                <MdFavorite
                  size={36}
                  className="itinerary-favourite-icon itinerary-favourite-icon-red"
                />
              </div>
            ) : (
              <div>
                <MdFavorite
                  size={36}
                  className="itinerary-favourite-icon-white"
                />
              </div>
            )}
          </div>
        ) : (
          <div onClick={e => this.loginAlert(e)}>
            <Link to={"/Login"}>
              <MdFavorite
                size={36}
                className="itinerary-favourite-icon-white"
              />
            </Link>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postFavourites: favouriteData => dispatch(postFavourites(favouriteData)),
    decreaseItinerariesCount: itineraryId =>
      dispatch(decreaseItinerariesCount(itineraryId)),
    increaseItinerariesCount: itineraryId =>
      dispatch(increaseItinerariesCount(itineraryId)),
    deleteFavourites: favouriteData =>
      dispatch(deleteFavourites(favouriteData)),
    fetchFavourites: favouriteData => dispatch(fetchFavourites(favouriteData))
  };
};

const mapStateToProps = state => {
  return {
    state: state
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteIcon);
