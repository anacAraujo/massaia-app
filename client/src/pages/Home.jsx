import React, { useState } from "react";
import { HomeMenu } from "../components/HomeMenu";

export function Home() {
  const [isLandingCompVisible, setLandingCompVisible] = useState(true);

  const handleVideoPlayerClick = () => {
    setLandingCompVisible(false);
  };

  return (
    <div className="videoPlayer" onClick={handleVideoPlayerClick}>
      <div className="overlay"></div>
      <video src="../upload/massaiaBuild.mp4" autoPlay loop muted />
      {isLandingCompVisible && (
        <>
          <img className="img-eyes" src="../assets/images/olhos.png" />
          <div className="content">
            <h1>MASSAIÁ</h1>
            <p>espaços da voz, do som e do olhar</p>
          </div>
          {/* <div className="construction-notice">
            <p>em costrução</p>
          </div> */}
        </>
      )}
      {!isLandingCompVisible && <HomeMenu />}
    </div>
  );
}
