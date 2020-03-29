import React from "react";
import "../CSS/HamburgerMenuList.css";
import { withRouter } from "react-router-dom";

const HamburgerMenuList = props => {
  return (
    <nav className="hamburger-menu-list-open">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>

        <li>
          {" "}
          <a href="/Cities">Cities</a>
        </li>
      </ul>
    </nav>
  );
};

export default withRouter(HamburgerMenuList);
