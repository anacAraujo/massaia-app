import React, { useState, useEffect } from "react";

import Header from "../components/Header";
import { CacheApi } from "../context/cacheApi";
import "../styles/artists.css";

export default function Artists() {
  const { initAuthors, authors } = React.useContext(CacheApi);

  const [activeAuthor, setActiveAuthor] = useState(3);

  const artists = authors.slice(2);

  const handleImageClick = (id) => {
    setActiveAuthor(id);
  };

  const handleMouseEnter = (id) => {
    if (window.innerWidth >= 769) {
      setActiveAuthor(id);
    }
  };

  useEffect(() => {
    initAuthors();
  }, [authors]);

  return (
    <div className="artists-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="grid-container">
        {artists?.length > 0 ? (
          artists.map((artist) => (
            <div
              className={`grid-item ${
                activeAuthor === artist.id ? "active" : ""
              }`}
              key={artist.id}
              onMouseEnter={() => handleMouseEnter(artist.id)}
            >
              {artist.image ? (
                <img
                  src={`${process.env.REACT_APP_UPLOAD_FOLDER}/${artist.image}`}
                  alt={artist.name}
                  onClick={() => handleImageClick(artist.id)}
                  className={activeAuthor === artist.id ? "active" : ""}
                />
              ) : (
                <img
                  src={`../assets/images/default-avatar.png`}
                  alt={artist.name}
                  onClick={() => handleImageClick(artist.id)}
                  className={activeAuthor === artist.id ? "active" : ""}
                />
              )}

              {activeAuthor === artist.id && (
                <div className="artists_info">
                  <p>{artist.name}</p>
                  <p className="artists-title">{artist.title}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="grid-item">
            <div className="artists_info">
              <h3>Esta Música ainda não tem obras disponíveis.</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
