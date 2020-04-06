import React, { Component } from "react";
import Comment from "./Comment";
import axios from "axios";
import { connect } from "react-redux";
import "../CSS/Activities.css";
import Login from "./Login";
import homeIcon from "../Pictures/homeIcon.png";

class Activities extends Component {
  state = {
    carousselOpen: false,
    commentLists: [],
    commentListsMongo: []
  };

  openCaroussel = function() {
    this.setState(prevState => ({
      carousselOpen: !prevState.carousselOpen
    }));
    if (this.state.carousselOpen == !true) {
      console.log("carousselopen");
      let url = "";
      let itineraryId = this.props.itineraryId;
      // let headers = { "Content-Type": "application/json" };
      let headers = {};
      let body = { itineraryId };
      // let body = { itineraryId: itineraryId };

      if (process.env.NODE_ENV === "development") {
        url = "http://localhost:5000/comments/getCommentsForASpecificItinerary";
      }
      if (process.env.NODE_ENV === "production") {
        url =
          "https://myitinerariestravelapp.herokuapp.com/comments/getCommentsForASpecificItinerary";
      }

      axios.post(url, body, headers).then(result => {
        this.setState({ commentListsMongo: result.data.result });
      });
    }
  };

  handleClick = () => {
    this.openCaroussel();
  };

  updateComment = newComment => {
    let commentLists = this.state.commentLists;
    commentLists.push(newComment);
    console.log("updatecomment");
    console.log(newComment);
    this.setState({ commentLists: commentLists });
  };

  render() {
    let activities = this.props.activities.map(item => (
      <div key={item.id} className="activity-box">
        <a href={item.url}>
          <div className="activities-image">
            <img alt="" src={item.image} />
          </div>
          <div className="activities-title">{item.activity}</div>
        </a>
      </div>
    ));

    return (
      <div className="itinerary-activities-main-container">
        <div className="itinenary-click-here-fore-more-information">
          Click <a href={this.props.itinerary.moreInformation}>here</a> for more
          information
        </div>
        <div
          className="activities-also-nice"
          key={this.props.index}
          matcher={this.props.itinerary._id}
          onClick={() => {
            this.handleClick();
          }}
        >
          ALSO NICE TO DO
        </div>

        {this.state.carousselOpen ? (
          <div className="activities-content">
            <div className="activities-flexer">{activities}</div>
            {this.props.state.auth.isAuthenticated ? (
              <Comment
                itineraryId={this.props.itinerary._id}
                refreshFunction={this.updateComment}
                commentLists={this.state.commentLists}
                commentListsMongo={this.state.commentListsMongo}
              ></Comment>
            ) : (
              //lead someone to the login page//
              <div>
                <Login></Login>
                <div className="homeicon-container">
                  <a href="/">
                    <div className="home-flexer">
                      <img className="homeIcon" src={homeIcon} alt="homeIcon" />
                    </div>
                  </a>
                </div>
              </div>
            )}
            <p
              className="activities-close"
              key={this.props.index}
              matcher={this.props.itinerary._id}
              onClick={() => {
                this.handleClick();
              }}
            >
              close
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}
//get data from Redux//
const mapStateToProps = state => {
  return { state: state };
};

export default connect(mapStateToProps, null)(Activities);
