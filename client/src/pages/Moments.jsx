import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../lib/axiosConfig.js";

import { CacheApi } from "../context/cacheApi.js";
import "../index.css";

export default function Moments() {
  const { moments, initMoments } = useContext(CacheApi);

  useEffect(() => {
    initMoments();
  }, [moments]);

  return (
    <div>
      <div className="navbar">
        <h1 className="navbar-massaia">MASSAIÁ</h1>
        <Link to="/menu">
          <img
            className="navbar-menu"
            src="../assets/icons/menu-black.svg"
            alt="menu"
          />
        </Link>
      </div>
      <div>
        {Array.isArray(moments) ? (
          moments.map((moment) => (
            <img
              key={moment.id}
              src={`${process.env.REACT_APP_UPLOAD_FOLDER}${moment.image}`}
              alt={moment.name}
            />
          ))
        ) : (
          <p>No moments available</p>
        )}
      </div>
    </div>
  );
}
