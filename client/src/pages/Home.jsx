import React, { useState, useEffect } from "react";
import { ViewLandingContext } from "../context/viewLandingContext";
import { HomeMenu } from "../components/HomeMenu";
import "../styles/landingPage.css";
import "../styles/homeMenu.css";
import axios from "../lib/axiosConfig.js";

export function Home() {
  const [song, setSong] = useState([]);

  const viewLandingContext = React.useContext(ViewLandingContext);

  const handleVideoPlayerClick = () => {
    viewLandingContext.setHasViewedLandingPage(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/songs/1`);
        setSong(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="videoPlayer" onClick={handleVideoPlayerClick}>
      <div className="overlay"></div>
      <video src={`../upload/${song.video}`} autoPlay loop muted />

      {!viewLandingContext.hasViewedLandingPage && (
        <>
          <div className="eyes">
            <img
              className="img-eyes"
              src="../assets/images/olhos.png"
              alt="eyes"
            />
          </div>
          <div className="content">
            <h1>MASSAIÁ</h1>
            <p>espaços da voz, do som e do olhar</p>
          </div>
          <div className="construction-notice">
            <p>em construção</p>
          </div>
        </>
      )}
      {viewLandingContext.hasViewedLandingPage && <HomeMenu songId={song.id} />}
    </div>
  );
}
