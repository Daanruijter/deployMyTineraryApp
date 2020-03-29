import React from "react";
// import Itinerary from './Itinerary'

import "../CSS/index.css";

import "../CSS/Landing.css";
import MYtineraryLogo from "../Pictures/MYtineraryLogo.png";
import startBrowsing from "../Pictures/startBrowsing.png";

const Landing = props => {
  return (
    <div className="landing-page">
      <img className="logo" src={MYtineraryLogo} alt="MYtineraryLogo" />
      <p>
        Find your perfect trip, designed by insiders who know and love their
        cities.{" "}
      </p>

      <h1 className="start-browsing-header">Start browsing</h1>
      <div className="start-browsing-flexer">
        <a href="/Cities">
          <img
            className="startBrowsing"
            src={startBrowsing}
            alt="startBrowsing"
          />
        </a>
      </div>
      <p>Want to build your own MYtinerary?</p>
    </div>
  );
};

export default Landing;

// state = {
//     name:'Piet',
//     age: '223'
// }
