import React, { useState } from "react";

import Header from "../components/Header";
import { CurrentState } from "../context/currentState";
import { CacheApi } from "../context/cacheApi";
import "../styles/artists.css";

export default function Artists() {
  const { userState, currentSong, setCurrentSongById } =
    React.useContext(CurrentState);

  // só copiei da geleria é preciso mudar tudo
  const { artPiecesBySong, initArtPieces, initSongsInfo } =
    React.useContext(CacheApi);

  const [activeArt, setActiveArt] = useState(null);

  const handleImageClick = (id) => {
    setActiveArt(id);
  };

  return (
    <>
      <Header></Header>
      <div className="grid-container">
        {artPiecesBySong[currentSong.id]?.length > 0 ? (
          artPiecesBySong[currentSong.id].map((artPiece) => (
            <div className="grid-item" key={artPiece.id}>
              <img
                src={`${process.env.REACT_APP_UPLOAD_FOLDER}/${artPiece.image}`}
                alt={artPiece.song_name}
                onClick={() => handleImageClick(artPiece.id)}
                className={activeArt === artPiece.id ? "active" : ""}
              />
              {activeArt === artPiece.id && (
                <div className="art_info">
                  <h3>{artPiece.author_name}</h3>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="grid-item">
            <div className="art_info">
              <h3>Esta Música ainda não tem obras disponíveis.</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
