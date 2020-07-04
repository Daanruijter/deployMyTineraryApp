import React, { Component } from "react";

import "../CSS/App.css";
import Landing from "./Landing";
import Cities from "./Cities";

import CreateAccount from "./CreateAccount";
import Login from "./Login";
import Favourites from "./Favourites";
import HamburgerMenu from "./HamburgerMenu";
import { Route, Switch } from "react-router-dom";
import HamburgerMenuList from "./HamburgerMenuList";
import Itinerary from "./Itinerary";
import { loadUser } from "../store/actions/authActions";
import { connect } from "react-redux";

class App extends Component {
  componentDidUpdate() {
    if (localStorage.getItem("token")) {
      // console.log("token is there");
    }
    if (!localStorage.getItem("token")) {
      // console.log("token is NOT there");
    }
  }

  componentDidMount() {
    this.props.store.dispatch(loadUser());
  }

  state = {
    hamburgerMenuList: false,
  };

  drawerToggleClickHandler = (e) => {
    this.setState((prevState) => {
      return { hamburgerMenuList: !prevState.hamburgerMenuList };
    });
  };

  backdropClickHandler = () => {
    this.setState({ hamburgerMenuList: false });
  };

  routesGenerator() {
    return (
      <Switch>
        <Route exact path="/" render={(props) => <Landing {...props} />} />
        <Route exact path="/Cities" component={Cities} />
        <Route exact path="/Create-account" component={CreateAccount} />
        <Route exact path="/Login" render={(props) => <Login {...props} />} />
        <Route exact path="/Favourites/:cityName" component={Favourites} />
        <Route
          path="/itinerary/:name/:cityName"
          render={(props) => <Itinerary {...props} />}
        />
      </Switch>
    );
  }

  render() {
    return (
      <div className="App">
        <HamburgerMenu
          drawerToggleClickHandler={this.drawerToggleClickHandler}
        ></HamburgerMenu>

        {/* {localStorage.getItem("token") ? ( */}
        <main className="main-content">
          {/* <BrowserRouter> */}
          {this.state.hamburgerMenuList ? (
            <HamburgerMenuList />
          ) : (
            this.routesGenerator()
          )}
          {/* </BrowserRouter> */}
        </main>
        {/* ) : null} */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    state: state,
  };
};
export default connect(mapStateToProps)(App);
