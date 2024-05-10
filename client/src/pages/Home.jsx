import React, { useState } from "react";
import { ViewLandingContext } from "../context/viewLandingContext";
import { HomeMenu } from "../components/HomeMenu";
import "../styles/landingPage.css";
import "../styles/homeMenu.css";

export function Home() {
  const viewLandingContext = React.useContext(ViewLandingContext);

  const handleVideoPlayerClick = () => {
    viewLandingContext.setHasViewedLandingPage(true);
  };

  return (
    <div className="videoPlayer" onClick={handleVideoPlayerClick}>
      <div className="overlay"></div>
      <video src="../upload/massaiaBuild.mp4" autoPlay loop muted />

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
      {viewLandingContext.hasViewedLandingPage && <HomeMenu />}
    </div>
  );
}
