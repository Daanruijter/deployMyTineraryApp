import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchFavouritesPage } from "../store/actions/favouriteActions";
import Activities from "./Activities";
import Login from "./Login";
import "../CSS/Favourites.css";
import { Link } from "react-router-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import homeIcon from "../Pictures/homeIcon.png";

class Favourites extends Component {
  state = {
    cityNameId: "",
    Amsterdam: [
      {
        activity: "Herengracht",
        image:
          "https://cdn.pixabay.com/photo/2018/09/26/15/33/historical-3704889_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/Attraction_Review-g188590-d266270-Reviews-Herengracht-Amsterdam_North_Holland_Province.html",
        id: "1"
      },
      {
        activity: "Museum Quarter",
        image:
          "https://cdn.pixabay.com/photo/2017/03/08/19/32/rijksmuseum-2127625_960_720.jpg",
        id: "2",
        url:
          "https://www.tripadvisor.co.uk/Attraction_Review-g188590-d1174891-Reviews-Museum_Quarter-Amsterdam_North_Holland_Province.html"
      },
      {
        activity: "Ziggodome",
        image:
          "https://cdn.pixabay.com/photo/2017/10/01/13/28/music-2805506_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/Attraction_Review-g188590-d3724408-Reviews-Ziggo_Dome-Amsterdam_North_Holland_Province.html",
        id: "3"
      },
      {
        activity: "Red light district",
        image:
          "https://cdn.pixabay.com/photo/2020/01/28/14/26/district-4799912_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/Attraction_Review-g188590-d190584-Reviews-Red_Light_District-Amsterdam_North_Holland_Province.html",
        id: "4"
      },
      {
        activity: "De Poezenboot",
        image:
          "https://cdn.pixabay.com/photo/2019/08/03/14/34/dancing-house-4381840_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/Attraction_Review-g188590-d1484592-Reviews-De_Poezenboot-Amsterdam_North_Holland_Province.html",
        id: "5"
      },
      {
        activity: "Rembrandtplein",
        image:
          "https://cdn.pixabay.com/photo/2016/08/29/22/58/amsterdam-1629424_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/Attraction_Review-g188590-d259562-Reviews-Rembrandtplein-Amsterdam_North_Holland_Province.html",
        id: "6"
      }
    ],
    Barcelone: [
      {
        activity: "Tapas and wine",
        image:
          "https://cdn.pixabay.com/photo/2017/08/25/14/15/ketering-2680316_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/AttractionProductReview-g187497-d11461438-Tapas_and_Wine_Experience_Small_Group_Walking_Tour-Barcelona_Catalonia.html",
        id: "1"
      },
      {
        activity: "Flamenco",
        image:
          "https://cdn.pixabay.com/photo/2015/01/09/11/38/flamenco-594272_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/AttractionProductReview-g187497-d11991298-Flamenco_Show_Ticket_at_THEATRE_Barcelona_City_Hall-Barcelona_Catalonia.html",
        id: "2"
      },
      {
        activity: "Montserrat tour",
        image:
          "https://cdn.pixabay.com/photo/2018/07/08/19/35/landscape-3524568_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/AttractionProductReview-g187497-d11452580-Montserrat_Tour_from_Barcelona_Including_Lunch_and_Gourmet_Wine_Tasting-Barcelona_.html",
        id: "3"
      },
      {
        activity: "Picasso Museum",
        image:
          "https://cdn.pixabay.com/photo/2017/05/28/13/37/toro-2351052_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/AttractionProductReview-g187497-d19807605-Skip_the_Line_Picasso_Museum_Entrance_Ticket-Barcelona_Catalonia.html",
        id: "4"
      },
      {
        activity: "Brewery",
        image:
          "https://cdn.pixabay.com/photo/2017/06/24/23/41/beer-2439237_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/AttractionProductReview-g911483-d12923643-Skip_the_Line_Estrella_Damm_Brewery_Guided_Tour_Ticket_with_Tasting-El_Prat_de_Llo.html",
        id: "5"
      },
      {
        activity: "Evening tour",
        image:
          "https://cdn.pixabay.com/photo/2014/04/26/10/02/parc-guell-332390_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/AttractionProductReview-g187497-d12577598-Barcelona_Highlights_Evening_Tour_Magical_Fountain_Show-Barcelona_Catalonia.html",
        id: "6"
      }
    ],
    Malaga: [
      {
        activity: "Arabian baths",
        image:
          "https://cdn.pixabay.com/photo/2019/01/15/15/19/the-real-alcazar-3934244_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/AttractionProductReview-g187438-d12202288-Arabian_Baths_Experience_at_Malaga_s_Hammam_Al_Andalus-Malaga_Costa_del_Sol_Provin.html",
        id: "1"
      },
      {
        activity: "E-bike tour",
        image:
          "https://cdn.pixabay.com/photo/2019/08/17/20/29/bike-4412897_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/AttractionProductReview-g187438-d11481716-2h_E_bike_tour_Best_thing_to_do_in_Malaga-Malaga_Costa_del_Sol_Province_of_Malaga_.html",
        id: "2"
      },
      {
        activity: "Guided tour",
        image:
          "https://cdn.pixabay.com/photo/2020/01/17/16/59/malaga-4773445_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/AttractionProductReview-g187438-d14916878-Guided_Tour_Caminito_del_Rey_from_Malaga-Malaga_Costa_del_Sol_Province_of_Malaga_A.html",
        id: "3"
      },
      {
        activity: "Central market",
        image:
          "https://cdn.pixabay.com/photo/2014/10/21/16/00/market-496571_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/Attraction_Review-g187438-d2441445-Reviews-Mercado_Central_de_Atarazanas-Malaga_Costa_del_Sol_Province_of_Malaga_Andalucia.html",
        id: "4"
      },
      {
        activity: "Museo de Malaga",
        image:
          "https://cdn.pixabay.com/photo/2018/08/20/16/11/malaga-3619271_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/Attraction_Review-g187438-d11914853-Reviews-Museo_de_Malaga-Malaga_Costa_del_Sol_Province_of_Malaga_Andalucia.html",
        id: "5"
      },
      {
        activity: "Auto and fashion museum",
        image:
          "https://cdn.pixabay.com/photo/2017/01/23/19/40/woman-2003647_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/Attraction_Review-g187438-d2049739-Reviews-Museo_Automovilistico_y_de_la_Moda-Malaga_Costa_del_Sol_Province_of_Malaga_Andalu.html",
        id: "6"
      }
    ],
    Paris: [
      {
        activity: "Saint Germain des Pres",
        image:
          "https://cdn.pixabay.com/photo/2014/11/18/08/54/paris-535835_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/Attraction_Review-g187147-d191240-Reviews-Saint_Germain_des_Pres_Quarter-Paris_Ile_de_France.html",
        id: "1"
      },
      {
        activity: "Arc de triopmhe",
        image:
          "https://cdn.pixabay.com/photo/2017/11/24/18/42/arc-de-triomphe-2975433_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/Attraction_Review-g187147-d188709-Reviews-Arc_de_Triomphe-Paris_Ile_de_France.html",
        id: "2"
      },
      {
        activity: "Paris boats",
        image:
          "https://cdn.pixabay.com/photo/2019/03/26/18/02/ship-4083294_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/AttractionProductReview-g187147-d11979678-Bateaux_Parisiens_Seine_River_Dinner_Cruise-Paris_Ile_de_France.html",
        id: "3"
      },
      {
        activity: "Bus tour",
        image:
          "https://cdn.pixabay.com/photo/2016/03/16/23/58/pub-1262041_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/AttractionProductReview-g187147-d11454297-Big_Bus_Paris_Hop_On_Hop_Off_Tour-Paris_Ile_de_France.html",
        id: "4"
      },
      {
        activity: "Eiffel tower tour",
        image:
          "https://cdn.pixabay.com/photo/2017/08/31/05/59/sunset-2699553_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/AttractionProductReview-g187147-d12467083-Skip_the_Line_Eiffel_Tower_Tour_and_Summit_Access_by_elevator-Paris_Ile_de_France.html",
        id: "5"
      },
      {
        activity: "Seine sightseeing",
        image:
          "https://cdn.pixabay.com/photo/2018/05/07/17/39/paris-3381276_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/AttractionProductReview-g187147-d11453295-Seine_River_Hop_On_Hop_Off_Sightseeing_Cruise_in_Paris-Paris_Ile_de_France.html",
        id: "6"
      }
    ],
    Valencia: [
      {
        activity: "Historical center",
        image:
          "https://cdn.pixabay.com/photo/2015/08/16/13/26/fallas-890947_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/AttractionProductReview-g187529-d15665397-Tuk_Tuk_Valencia_Historical_Center_City_of_Arts_and_Sciences-Valencia_Province_of_.html",
        id: "1"
      },
      {
        activity: "World heritage",
        image:
          "https://cdn.pixabay.com/photo/2019/10/31/18/59/spain-4592585_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/AttractionProductReview-g187529-d15615869-Essentials_of_Valencia_and_its_World_Heritage_sites-Valencia_Province_of_Valencia_.html",
        id: "2"
      },
      {
        activity: "Valencia Cathedral",
        image:
          "https://cdn.pixabay.com/photo/2017/06/29/00/19/spain-2452682_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/Attraction_Review-g187529-d244244-Reviews-Valencia_Cathedral-Valencia_Province_of_Valencia_Valencian_Country.html",
        id: "3"
      },
      {
        activity: "Arts and sciences",
        image:
          "https://cdn.pixabay.com/photo/2015/11/18/16/03/valencia-1049389_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/AttractionProductReview-g187529-d19770835-City_of_Arts_and_Sciences_Prince_Felipe_Museum_of_Science_Entrance-Valencia_Provin.html",
        id: "4"
      },
      {
        activity: "Private walking tour",
        image:
          "https://cdn.pixabay.com/photo/2015/04/30/01/18/valencia-746396_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/AttractionProductReview-g187529-d12921030-Old_City_of_Valencia_Private_Walking_Tour-Valencia_Province_of_Valencia_Valencian_.html",
        id: "5"
      },
      {
        activity: "Natural hot springs",
        image:
          "https://cdn.pixabay.com/photo/2018/06/13/05/34/terrace-hot-springs-3472087_960_720.jpg",
        url:
          "https://www.tripadvisor.co.uk/AttractionProductReview-g187529-d17829470-Natural_Hot_Springs_Day_Tour-Valencia_Province_of_Valencia_Valencian_Country.html",
        id: "6"
      }
    ]
  };

  componentDidMount() {
    // console.log(this.props.state.auth.isAuthenticated);

    if (this.props.state.auth.token !== null) {
      this.props.fetchFavouritesPage();
    }

    let cityName = this.props.match.params.cityName;
    fetch(
      `http://localhost:5000/favourites/getCityName/${cityName}`,

      {
        method: "GET",

        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({ cityNameId: data });
      })

      .catch(error => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }
  render() {
    let favourites = this.props.state.favourites.favouritesPage;
    let favouritesToShow = favourites.map((favouriteItinerary, index) => (
      <div
        className="favourite-itinerary-cards-container"
        key={favouriteItinerary._id}
      >
        <div className="favourite-itinerary-cards-gridmaker">
          <div className="profile-picture">
            <img
              className="profile-picture"
              alt=""
              src={favouriteItinerary.profilePicture}
            />
          </div>

          <div className="favourite-itinenary-title">
            {favouriteItinerary.title}
          </div>
          <div className="favourite-itinenary-rating">
            <b>Likes</b>: {favouriteItinerary.rating}
          </div>
          <div className="favourite-itinenary-duration">
            <b>Duration</b>: {favouriteItinerary.duration}
          </div>

          <div className="favourite-itinenary-price">
            <b>Price</b>: {favouriteItinerary.price}
          </div>
          <div className="favourite-itinenary-hashtags">
            {favouriteItinerary.hashtags}
          </div>

          <div className="favourite-itinerary-image">
            <a href={favouriteItinerary.moreInformation}>
              <img
                alt=""
                className="favourite-itinerary-image-height"
                src={favouriteItinerary.image}
              />
            </a>
          </div>
          <div className="favourite-itinenary-more-information">
            <Activities
              activities={this.state[this.props.match.params.cityName]}
              index={index}
              itinerary={favouriteItinerary}
            ></Activities>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        {this.props.state.auth.isAuthenticated ? (
          <div className="back-to-itinerary-page">
            <Link
              to={`/itinerary/${this.state.cityNameId._id}/${this.props.match.params.cityName}`}
            >
              Go to back to the MYtineraries page
            </Link>
            <div>{favouritesToShow}</div>
            <div className="homeicon-container">
              <a href="/">
                <div className="home-flexer">
                  <img className="homeIcon" src={homeIcon} alt="homeIcon" />
                </div>
              </a>
            </div>{" "}
          </div>
        ) : (
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
      </div>
    );
  }
}

//get data from Redux//
const mapStateToProps = state => {
  return { state: state };
};

//fires actions to Redux (in this case the fetchfunction)//
const mapDispatchToProps = dispatch => {
  return { fetchFavouritesPage: () => dispatch(fetchFavouritesPage()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
