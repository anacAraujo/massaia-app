import React, { useState, useEffect } from "react";

import { CurrentState } from "../context/currentState";
import { CacheApi } from "../context/cacheApi";
import Header from "../components/Header";
import "../styles/project.css";

export default function Project() {
  const [selectedKey, setSelectedKey] = useState("Massaiá");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { setPrevPage } = React.useContext(CurrentState);
  const { songsByAlbum, initSongsInfo, projectContent, initContent } =
    React.useContext(CacheApi);

  const keys = Object.keys(projectContent);

  const handlePrev = () => {
    const currentIndex = keys.indexOf(selectedKey);
    const prevIndex = (currentIndex - 1 + keys.length) % keys.length;
    setSelectedKey(keys[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = keys.indexOf(selectedKey);
    const nextIndex = (currentIndex + 1) % keys.length;
    setSelectedKey(keys[nextIndex]);
  };

  useEffect(() => {
    setPrevPage("/projeto");
    initSongsInfo();
    initContent();

    console.log("projectContent: ", projectContent);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log("projectContent: ", projectContent);
  console.log("songsByAlbum: ", songsByAlbum);
  return (
    <>
      <Header />
      <div className="project-container">
        {screenWidth >= 880 && (
          <div>
            <video
              className="project-video"
              src={`../upload/${songsByAlbum[1][0]?.video}`}
              autoPlay
              loop
              muted
            />
          </div>
        )}

        {screenWidth >= 880 ? (
          <div className="project-scroll-bar">
            {keys.map((key) => (
              <div
                key={key}
                className={`project-key ${
                  key === selectedKey ? "selected" : ""
                }`}
                onClick={() => setSelectedKey(key)}
              >
                <p>{key}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="project-scroll-bar">
            <img
              src="../assets/icons/project-next-topic.svg"
              onClick={handlePrev}
              alt="Previous"
              className="nav-arrow nav-arrow-prev"
            />
            <div className="project-key selected">
              <p>{selectedKey}</p>
            </div>
            <img
              src="../assets/icons/project-next-topic.svg"
              onClick={handleNext}
              alt="Next"
              className="nav-arrow"
            />
          </div>
        )}
        <div className="project-info">
          {projectContent[selectedKey]}
          <br />
          <br />
          <br />
          <div className="logos">
            <img src="../assets/images/inet.png" alt="INET-md" />
            <img src="../assets/images/deca.png" alt="deca" />
            <img src="../assets/images/UA.png" alt="UA" />
          </div>
          <div className="logos">
            <img src="../assets/images/idmais.png" alt="id+" />

            <img src="../assets/images/FCT.png" alt="FCT" />
            <img src="../assets/images/pt.png" alt="republica portuguesa" />
            <img
              src="../assets/images/Mulher-Avestruz.png"
              alt="Mulher-Avestruz"
            />
          </div>
          <div className="logos">
            <img
              src="../assets/images/infante.png"
              alt="Escritório do Infante"
            />
            <img src="../assets/images/a-cca.png" alt="cinecultura de avanca" />
          </div>
        </div>
      </div>
    </>
  );
}
