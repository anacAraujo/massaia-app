import React, { useState } from "react";
import { HomeMenu } from "../components/HomeMenu";
import "../styles/indexBuild.css";

export function Home() {
  const [isLandingCompVisible, setLandingCompVisible] = useState(true);

  const handleVideoPlayerClick = () => {
    setLandingCompVisible(false);
  };

  return (
    <div className="videoPlayer" onClick={handleVideoPlayerClick}>
      <div className="overlay"></div>
      <video src="../upload/massaiaBuild.mp4" autoPlay loop muted />
      <>
        <img className="img-eyes" src="../assets/images/olhos.png" alt="eyes" />
        <div className="content">
          <p>MASSAIÁ</p>
          {/* <p>espaços da voz, do som e do olhar</p> */}
        </div>
        <div className="construction-notice">
          <p>em construção</p>
        </div>
      </>
      {/* {isLandingCompVisible && (
       
      )}
      {!isLandingCompVisible && <HomeMenu />} */}
    </div>
  );
}
