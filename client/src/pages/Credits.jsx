import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "../lib/axiosConfig.js";

import "../styles/credits.css";

export default function Credits({ songId }) {
  const [credits, setCredits] = useState([]);
  console.log("songId: ", songId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/songs/${songId}/credits`);
        const creditsData = res.data;
        setCredits(creditsData);
      } catch (err) {
        console.error("Error getting credits: ", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="credits-eyes"></div>

      <div className="credits-info">
        <img className="img-eyes" src="../assets/images/olhos.png" alt="eyes" />
        <h2>créditos</h2>

        <div className="credits-roles-authors">
          {credits.map((credit, index) => {
            const { role, authors } = credit;

            return (
              <span key={index}>
                <span className="role"> {role} </span>
                {authors.map((author) => author.authors_name).join(", ")}
              </span>
            );
          })}
        </div>
      </div>
      <div className="credits-exit">
        <Link to="/">
          <img src="../assets/icons/exit.svg" alt="exit" />
        </Link>
      </div>
    </div>
  );
}
