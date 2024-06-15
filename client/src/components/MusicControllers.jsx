import React, { useState } from "react";
import "../styles/musicControllers.css";
import { CacheApi } from "../context/cacheApi.js";
import { CurrentState } from "../context/currentState.js";

export default function MusicControllers() {
  const { currentSong, setCurrentSong } = React.useContext(CurrentState);

  const { songsById } = React.useContext(CacheApi);

  function handlePrevSong() {
    const keys = Object.keys(songsById);
    let newSongId = keys.at(keys.indexOf(currentSong.id.toString()) - 1);

    // TODO use setCurrentSongById
    setCurrentSong(songsById[newSongId]);
  }

  function handleNextSong() {
    const keys = Object.keys(songsById);
    let newSongId = keys.at(keys.indexOf(currentSong.id.toString()) + 1);

    if (newSongId === undefined) {
      newSongId = keys[0];
    }

    // TODO use setCurrentSongById
    setCurrentSong(songsById[newSongId]);
  }

  return (
    <div className="musicControllers">
      <div className="left-group">
        <button className="musicControllers-vol">
          vol. {currentSong.album_id}
        </button>
        <p className="musicControllers-song-name">{currentSong.name}</p>
        <img
          className="musicControllers-more-songs"
          src="../assets/icons/arrow-up.png"
          alt="view all songs"
        />
      </div>

      <div className="center-group">
        <button className="control-button" onClick={() => handlePrevSong()}>
          Prev
        </button>
        <button className="control-button">Play</button>
        <button className="control-button" onClick={() => handleNextSong()}>
          Next
        </button>
      </div>

      <div className="right-group">
        <button className="mute-button">Mute</button>
        <input type="range" className="volume-slider" />
      </div>
    </div>
  );
}
