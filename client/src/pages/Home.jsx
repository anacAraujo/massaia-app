import React, { useState, useEffect } from "react";
import { ViewAlbumsMenu } from "../context/viewAlbumsMenu.js";
import { HomeMenu } from "../components/HomeMenu";
import { AlbumsMenu } from "../components/AlbumsMenu.jsx";
import "../styles/landingPage.css";
import "../styles/homeMenus.css";
import axios from "../lib/axiosConfig.js";

export function Home() {
  const [song, setSong] = useState({});
  const [hasViewedLandingPage, setHasViewedLandingPage] = useState(false);

  const viewAlbumsMenu = React.useContext(ViewAlbumsMenu);

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

      {!hasViewedLandingPage && (
        <>
          {/* TODO - create component */}
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
      {hasViewedLandingPage && !viewAlbumsMenu.isViewingAlbumsMenu && (
        // TODO remove compnent and add here the code
        <HomeMenu songId={song.id} />
      )}
      {hasViewedLandingPage && viewAlbumsMenu.isViewingAlbumsMenu && (
        <AlbumsMenu />
      )}
    </div>
  );
}
