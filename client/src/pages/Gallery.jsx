import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Spinner from "react-bootstrap/Spinner";

import Header from "../components/Header";
import MusicControllers from "../components/MusicControllers";
import { CacheApi } from "../context/cacheApi.js";
import { CurrentState } from "../context/currentState.js";
import { USER_STATES } from "../context/currentState.js";
import "../styles/gallery.css";

export default function Gallery() {
  const { songId } = useParams();

  const { userState, currentSong, setCurrentSongById } =
    React.useContext(CurrentState);

  const { artPiecesBySong, initArtPieces } = React.useContext(CacheApi);

  let screenWidth = window.innerWidth;

  useEffect(() => {
    setCurrentSongById(songId);
    initArtPieces();
  }, [songId, screenWidth]);

  const [activeArt, setActiveArt] = useState(null);

  useEffect(() => {
    if (artPiecesBySong[currentSong.id]?.length > 0) {
      setActiveArt(artPiecesBySong[currentSong.id][0].id);
    }
  }, [artPiecesBySong, currentSong.id]);

  const handleImageClick = (id) => {
    setActiveArt(id);
  };

  return (
    <div className="gallery-container">
      <div className="header-container">
        <Header />
      </div>
      {userState === USER_STATES.LOADING_PAGE && (
        <div className="carousel-container">
          <div className="spinner-container">
            <Spinner animation="grow" variant="dark" />
          </div>
        </div>
      )}
      {userState !== USER_STATES.LOADING_PAGE && screenWidth >= 769 ? (
        <div className="carousel-container">
          <Carousel className="display_art_pieces">
            {artPiecesBySong[currentSong.id]?.length > 0 ? (
              artPiecesBySong[currentSong.id].map((artPiece) => (
                <Carousel.Item className="art_piece" key={artPiece.id}>
                  <img
                    src={`${process.env.REACT_APP_UPLOAD_FOLDER}/${artPiece.image}`}
                    alt={artPiece.song_name}
                  />
                  <Carousel.Caption>
                    <h3>{artPiece.author_name}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))
            ) : (
              <h3 style={{ margin: "2rem" }}>
                Esta Música ainda não tem obras disponíveis.
              </h3>
            )}
          </Carousel>
        </div>
      ) : (
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
      )}

      <MusicControllers />
    </div>
  );
}
