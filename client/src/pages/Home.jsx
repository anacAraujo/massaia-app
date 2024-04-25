import React from "react";
import "../styles/global.css";
import videoUrl from "../videos/massaia.mp4";

export function Home() {
  return (
    <div className="videoPlayer">
      <div className="overlay"></div>
      <video src={videoUrl} autoPlay loop muted />
      <div className="content">
        <h1>MASSAIÁ</h1>
        <p>espaços da voz, do som e do olhar</p>
      </div>
    </div>
  );
}
