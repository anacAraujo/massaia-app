import React from "react";
import { Link } from "react-router-dom";

import "../index.css";

export function Moments() {
  return (
    <div>
      <div className="navbar">
        <h1 className="navbar-massaia">MASSAIÁ</h1>
        <Link to="/menu">
          {" "}
          <img
            className="navbar-menu"
            src="../assets/icons/menu-black.svg"
            alt="exit"
          />
        </Link>
      </div>
    </div>
  );
}
