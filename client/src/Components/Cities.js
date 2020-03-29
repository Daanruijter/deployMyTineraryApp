import React, { Component } from "react";
import FilterCities from "./FilterCities";
import CityCard from "./CityCard";
import Itinerary from "./Itinerary";
import homeIcon from "../Pictures/homeIcon.png";
import "../CSS/Cities.css";
// import DSC_0265 from "../Pictures/DSC_0265.JPG";
import { fetchCities } from "../store/actions/cityActions";
import { sendUserInput } from "../store/actions/cityActions";
import { connect } from "react-redux";
import { sendFilteredCities } from "../store/actions/cityActions";

// import '../CSS/materialize.min.css'

// const cityURL = "http://localhost:5000/cities/all";

class Cities extends Component {
  // handleClick = e => {
  //   // e.preventDefault()

  //   console.log("HERE", this.props.cities);
  // };

  handleChangeValue = e => {
    this.props.sendUserInput(e);

    this.filterCities();
  };

  filterCities = () => {
    let cityFilterExtracted = this.props.cities;

    if (
      (this.props.isLoading !== true) &
      (this.props.cityFilter !== undefined)
    ) {
      cityFilterExtracted = this.props.cityFilter;

      let filteredCities = this.props.cities;

      filteredCities = filteredCities.filter(city => {
        let cityName = city.name.toLowerCase();

        let country = city.country.toLowerCase();

        if (
          cityName.toLowerCase().includes(cityFilterExtracted.toLowerCase()) ||
          country.includes(cityFilterExtracted.toLowerCase())
        ) {
          return cityName;
        }
      });

      this.props.sendFilteredCities(filteredCities);
      // return filteredCities
    }
  };

  componentDidMount() {
    this.props.fetchCities();
  }

  render() {
    let listItemsMap = "";

    if (this.props.loading !== true && this.props.cityFilter !== "") {
      let filteredCities = this.props.filteredCitiesFiltered
        .filteredCitiesFiltered;

      listItemsMap = filteredCities.map(cityMapper => (
        <div className="citycard" key={cityMapper._id}>
          <CityCard
            click={this.handleClick}
            cityname={cityMapper.name}
            country={cityMapper.country}
            image={cityMapper.image}
            id={cityMapper._id}
          ></CityCard>
          <ul></ul>
        </div>
      ));
    }

    if (this.props.loading !== true && this.props.cityFilter === "") {
      let filteredCities = this.props.cities;

      listItemsMap = filteredCities.map(cityMapper => (
        <div className="citycard" key={cityMapper._id}>
          <CityCard
            click={this.handleClick}
            cityname={cityMapper.name}
            country={cityMapper.country}
            image={cityMapper.image}
            id={cityMapper._id}
          ></CityCard>
          <ul></ul>
        </div>
      ));
    }

    if (listItemsMap.length === 0) {
      return (
        <div className="no-cities-box">
          <div className="city-inputfield-container">
            <FilterCities
              cities={this.props.cities}
              onChangeValue={this.handleChangeValue}
            />
          </div>

          <p className="no-cities">No cities found!</p>
          <div className="homeicon-container-no-cities">
            <a href="/">
              <div className="home-flexer-no-cities">
                <img className="homeIcon" src={homeIcon} alt="homeIcon" />
              </div>
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className="city-container">
        <div className="city-inputfield-container">
          <FilterCities
            cities={this.props.cities}
            onChangeValue={this.handleChangeValue}
          />
        </div>

        <div className="citycards-container">{listItemsMap}</div>

        <div className="homeicon-container">
          <a href="/">
            <div className="home-flexer">
              <img className="homeIcon" src={homeIcon} alt="homeIcon" />
            </div>
          </a>
        </div>
      </div>
    );
  }
}

//get data from Redux//
const mapStateToProps = state => {
  return {
    cities: state.cities.cities,
    filteredCities: state.cities.cities,
    filteredCitiesFiltered: state.filteredCities,
    isLoading: state.cities.loading,
    cityFilter: state.filter.cityFilter
  };
};

//fires actions to Redux (in this case the fetchfunction)//
const mapDispatchToProps = dispatch => {
  return {
    fetchCities: () => dispatch(fetchCities()),
    sendUserInput: e => dispatch(sendUserInput(e)),
    sendFilteredCities: filteredCities =>
      dispatch(sendFilteredCities(filteredCities))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cities);
