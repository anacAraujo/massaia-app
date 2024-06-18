import React, { useEffect, useContext, useState } from "react";

import { CacheApi } from "../context/cacheApi.js";
import Header from "../components/Header";
import "../styles/moments.css";

export default function Moments() {
  const { moments, initMoments } = useContext(CacheApi);
  const [scroll, setScroll] = useState(false);
  const [toggleHeader, setToggleHeader] = useState(true);
  console.log(moments);
  
  useEffect(() => {
    initMoments();
    if (moments.length > 3) {
      setScroll(true);
    }
  }, [moments]);

  useEffect(() => {
    const handleScroll = () => {
      const momentsContainer = document.querySelector('.moments-grid-container');
      if (momentsContainer.scrollTop > 0) {
        setToggleHeader(false);
      } else {
        setToggleHeader(true);
      }
    };

    const momentsContainer = document.querySelector('.moments-grid-container');
    if (momentsContainer) {
      momentsContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (momentsContainer) {
        momentsContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="moments-container">
      <div className={`header-container ${toggleHeader ? 'show' : 'hide'}`}>
        <Header />
      </div>
      <div className={`moments-grid-container ${scroll === true ? 'scrollable' : ''}`}>
        <div className="moments-grid">
          {Array.isArray(moments) && moments.length > 0 ? (
            moments.map((moment) => (
              moment.image !== null ? (
                <img
                  key={moment.id}
                  src={`${process.env.REACT_APP_UPLOAD_FOLDER}${moment.image}`}
                  alt={moment.name}
                />
              ) : (
                <video 
                  controls
                  key={moment.id}
                  src={`${process.env.REACT_APP_UPLOAD_FOLDER}${moment.video}`}
                  alt={moment.name}
                />
              )
            ))
          ) : (
            <p>Ainda não há momentos disponíveis.</p>
          )}
        </div>
      </div>
    </div>
  );
}
