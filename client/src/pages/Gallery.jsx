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

  const { artPiecesBySong, initArtPieces, initSongsInfo } =
    React.useContext(CacheApi);

  let screenWidth = window.innerWidth;
  console.log("screenWidth: ", screenWidth);

  useEffect(() => {
    setCurrentSongById(songId);
    initArtPieces();
  }, [songId, screenWidth]);

  //TODO add image in case song has no art pieces

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
      {userState != USER_STATES.LOADING_PAGE && screenWidth >= 769 ? (
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
                    <h3>{artPiece.song_name}</h3>
                    <p>{artPiece.author_name}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))
            ) : (
              <Carousel.Item>
                <img src="placeholder.jpg" alt="placeholder" />
                <Carousel.Caption>
                  <h3>No Art Pieces Available</h3>
                </Carousel.Caption>
              </Carousel.Item>
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
                />
                <div className="art_info">
                  <h3>{artPiece.song_name}</h3>
                  <p>{artPiece.author_name}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="grid-item">
              <img src="placeholder.jpg" alt="placeholder" />
              <div className="art_info">
                <h3>No Art Pieces Available</h3>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="music-controllers-container">
        <MusicControllers />
      </div>
    </div>
  );
}
