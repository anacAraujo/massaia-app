import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CurrentState } from "../context/currentState.js";
import { USER_STATES } from "../context/currentState.js";
import { AlbumsMenu } from "../components/AlbumsMenu.jsx";
import { LandingPage } from "../components/LandingPage.jsx";
import { CacheApi } from "../context/cacheApi.js";
import "../styles/homeMenus.css";

export default function Home() {
  const { currentSong, userState, handleUserStateChange } =
    React.useContext(CurrentState);

  const { songsByAlbum, initializeSongsByAlbum } = React.useContext(CacheApi);

  useEffect(() => {
    initializeSongsByAlbum();
  }, [userState]);

  return (
    <div
      className="videoPlayer"
      onClick={() => handleUserStateChange(USER_STATES.SONG_MENU)}
    >
      <div className="overlay"></div>
      {currentSong.video != null ? (
        <video
          className="menu-albums-song"
          src={`${process.env.REACT_APP_UPLOAD_FOLDER}${currentSong.video}`}
          autoPlay
          loop
          muted
        />
      ) : (
        <img
          className="menu-albums-song"
          src={`${process.env.REACT_APP_UPLOAD_FOLDER}${currentSong.image}`}
          alt="song cover"
        />
      )}
      {userState === USER_STATES.LANDING_PAGE && <LandingPage></LandingPage>}
      {userState === USER_STATES.SONG_MENU && (
        <div>
          <div className="massaia">
            <p>MASSAIÁ</p>
          </div>
          <Link className="menu" to="/menu">
            <img src="../assets/icons/menu-white.svg" alt="menu" />
          </Link>
          <div className="album-cover">
            <img
              src={`${process.env.REACT_APP_UPLOAD_FOLDER}/${currentSong.album_cover}`}
              alt="album cover"
              onClick={() => handleUserStateChange(USER_STATES.ALBUMS_MENU)}
            />
          </div>
          <Link className="credits" to="/credits">
            <p>créditos</p>
          </Link>
          <div className="song-info">
            <p>1:30 {currentSong.name}</p>
          </div>
        </div>
      )}
      {userState === USER_STATES.ALBUMS_MENU && (
        <AlbumsMenu songsInfo={songsByAlbum[1]} />
      )}
    </div>
  );
}
