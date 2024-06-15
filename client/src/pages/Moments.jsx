import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../lib/axiosConfig.js";

import { CacheApi } from "../context/cacheApi.js";
import "../index.css";

export default function Moments() {
  const { moments, setMoments } = useContext(CacheApi);
  const [localMoments, setLocalMoments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO use from cacheAPI
        const res = await axios.get(`moments`);
        if (Array.isArray(res.data)) {
          setMoments(res.data);
          setLocalMoments(res.data);
        } else {
          console.error("Data fetched is not an array:", res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    // TODO use from cacheAPI
    if (moments.length <= 0) {
      fetchData();
    } else {
      setLocalMoments(moments);
    }
  }, [moments, setMoments]);

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
        {Array.isArray(localMoments) ? (
          localMoments.map((moment) => (
            <img
              key={moment.id}
              src={`${process.env.REACT_APP_UPLOAD_FOLDER}/${moment.image}`}
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
