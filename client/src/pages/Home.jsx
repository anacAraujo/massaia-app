import React from "react";

export function Home() {
  return (
    <div className="videoPlayer">
      <div className="overlay"></div>
      <video src="../upload/massaiaBuild.mp4" autoPlay loop muted />
      <img className="img-eyes" src="../assets/images/olhos.png" />
      <div className="content">
        <h1>MASSAIÁ</h1>
        {/*<p>espaços da voz, do som e do olhar</p>*/}
      </div>
      <div className="construction-notice">
        <p>em costrução</p>
      </div>
    </div>
  );
}
