import "../CSS/materialize.min.css";
import React from "react";
// import DSC_0265 from "../Pictures/DSC_0265.JPG";
// import Cities from "./Cities";
// import Itinerary from "./Itinerary";
import "../CSS/CityCard.css";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import { sendCityName } from "../store/actions/cityActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { sendCommentsPath } from "../store/actions/commentActions";

const CityCard = (props) => {
  const handleClick = (e) => {
    let cityName = props.cityname;

    props.sendCityName(cityName);
    let itineraryPathName = `/itinerary/${props.id}/${props.cityname}`;
    props.sendCommentsPath(itineraryPathName);
  };

  return (
    <div className="citycard-wrapper">
      <div className="card">
        <div className="card-image">
          <img className="city-image" src={props.image} alt="DSC_0265" />
        </div>
        <div className="card-content">
          <span className="card-title">
            {props.cityname}, {props.country}{" "}
          </span>
          <p></p>
        </div>
        <div className="card-action">
          <Link
            onClick={() => {
              handleClick();
            }}
            to={`/itinerary/${props.id}/${props.cityname}`}
          >
            Show {props.cityname} Itineraries{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

//fires actions to Redux
const mapDispatchToProps = (dispatch) => {
  return {
    sendCityName: (cityName) => dispatch(sendCityName(cityName)),
    sendCommentsPath: (itineraryPathName) =>
      dispatch(sendCommentsPath(itineraryPathName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityCard);
