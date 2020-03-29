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

const CityCard = props => {
  // console.log(props.id);
  // let cityname=props.cityname

  const handleClick = e => {
    // console.log("tetststst");
    // console.log(e);

    let cityName = props.cityname;

    props.sendCityName(cityName);
  };

  return (
    <div className="citycard-wrapper">
      <div className="card">
        <div className="card-image">
          <img className="city-image" src={props.image} alt="DSC_0265" />
          {/* let op: deze link is niet goed, maar puur om errors weg te werken */}
          {/* <a
            href="http://www.ns.nl"
            className="halfway-fab btn-floating pink pulse"
          >
            <i className="material-icons">favorite</i>
          </a> */}
        </div>
        <div className="card-content">
          <span className="card-title">
            {props.cityname}, {props.country}{" "}
          </span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis
            aliquam orci. Orci varius natoque penatibus et magnis dis parturient
            montes, nascetur ridiculus mus.
          </p>
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

const mapStateToProps = state => {
  return {};
};

//fires actions to Redux
const mapDispatchToProps = dispatch => {
  return {
    sendCityName: cityName => dispatch(sendCityName(cityName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityCard);
