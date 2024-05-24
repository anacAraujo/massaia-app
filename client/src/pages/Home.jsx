import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ViewAlbumsMenu } from "../context/viewAlbumsMenu.js";
import { AlbumsMenu } from "../components/AlbumsMenu.jsx";
import { LandingPage } from "../components/LandingPage.jsx";

import "../styles/homeMenus.css";
import axios from "../lib/axiosConfig.js";

export function Home() {
  const [song, setSong] = useState({});
  const [hasViewedLandingPage, setHasViewedLandingPage] = useState(false);

  const { isViewingAlbumsMenu, setIsViewingAlbumsMenu } =
    React.useContext(ViewAlbumsMenu);

  const handleIsViewingAlbumsMenu = () => {
    setIsViewingAlbumsMenu(true);
  };

  const handleVideoPlayerClick = () => {
    handleHasViewedLandingPage(true);
  };

  function handleHasViewedLandingPage(hasViewedLandingPage) {
    setHasViewedLandingPage(hasViewedLandingPage);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/songs/1`);
        setSong(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="videoPlayer" onClick={handleVideoPlayerClick}>
      <div className="overlay"></div>
      <video
        src={process.env.REACT_APP_UPLOAD_FOLDER + song.video}
        autoPlay
        loop
        muted
      />

      {!hasViewedLandingPage && <LandingPage></LandingPage>}
      {hasViewedLandingPage && !isViewingAlbumsMenu && (
        <div>
          <div className="massaia">
            <p>MASSAIÁ</p>
          </div>
          <Link className="menu" to="/menu">
            <img src="../assets/icons/menu-white.svg" alt="menu" />
          </Link>
          <div className="album-cover">
            <img
              src={`${process.env.REACT_APP_UPLOAD_FOLDER}/coverAlbum1.png`}
              alt="album cover"
              onClick={handleIsViewingAlbumsMenu}
            />
          </div>
          <Link className="credits" to="/credits">
            <p>créditos</p>
          </Link>
          <div className="song-info">
            <p>1:30 {song.name}</p>
          </div>
        </div>
      )}
      {hasViewedLandingPage && isViewingAlbumsMenu && <AlbumsMenu />}
    </div>
  );
}
