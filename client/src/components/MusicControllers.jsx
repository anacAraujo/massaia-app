import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "../styles/musicControllers.css";
import { CacheApi } from "../context/cacheApi.js";
import { CurrentState } from "../context/currentState.js";

export default function MusicControllers() {
  const {
    currentSong,
    setCurrentSongById,
    setCurrentSong,
    setCurrentSongByAlbum,
  } = React.useContext(CurrentState);

  const { songsById, songsByAlbum } = React.useContext(CacheApi);

  const [muted, setMuted] = useState(true);
  const [play, setPlay] = useState(false);
  const audio = document.getElementById("audio_tag");

  const [showingDropdownOptions, setShowingDropdownOptions] = useState(false);

  function handlePrevSong() {
    const keys = Object.keys(songsById);
    let newSongId = keys.at(keys.indexOf(currentSong.id.toString()) - 1);
    setCurrentSongById(newSongId);
  }

  function handleNextSong() {
    const keys = Object.keys(songsById);
    let newSongId = keys.at(keys.indexOf(currentSong.id.toString()) + 1);

    if (newSongId === undefined) {
      newSongId = keys[0];
    }

    setCurrentSongById(newSongId);
  }

  function handleMute() {
    setMuted(!muted);
  }

  function handlePlaySong() {
    play ? setPlay(false) : setPlay(true);
    play ? audio.pause() : audio.play();
    play ? setMuted(true) : setMuted(false);
  }

  function handleAlbumChange(currentAlbumId) {
    let newAlbumId = null;
    if (currentAlbumId === 1) {
      newAlbumId = 2;
    }

    if (currentAlbumId === 2) {
      newAlbumId = 1;
    }
    setCurrentSongByAlbum(newAlbumId);
  }

  function handleSongChange(newSongId) {
    setCurrentSongById(newSongId);
    setShowingDropdownOptions(false);
  }

  function handleDropdownClick() {
    setShowingDropdownOptions(!showingDropdownOptions);
  }

  return (
    <div className="musicControllers flex-container">
      <div className="left-group flex-item">
        {currentSong.album_id === 1 ? (
          <p
            onClick={() => handleAlbumChange(currentSong.album_id)}
            className="musicControllers-vol"
          >
            vol. I
          </p>
        ) : (
          <p
            onClick={() => handleAlbumChange(currentSong.album_id)}
            className="musicControllers-vol"
          >
            vol. II
          </p>
        )}

        <DropdownButton
          key={"up"}
          id={`dropdown-button-drop-up-centered`}
          drop={"up"}
          variant="secondary"
          title={currentSong.name}
          show={showingDropdownOptions}
          onClick={() => handleDropdownClick()}
          className="custom-dropdown"
        >
          {showingDropdownOptions &&
            (songsByAlbum[currentSong.album_id]?.length > 0 ? (
              songsByAlbum[currentSong.album_id].map((song) => (
                <Dropdown.Item
                  key={song.id}
                  onClick={() => handleSongChange(song.id)}
                  className="custom-dropdown-item"
                >
                  {song.name}
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item disabled>No songs available</Dropdown.Item>
            ))}
        </DropdownButton>
      </div>

      <div className="center-group flex-item">
        <img
          className="control-button"
          onClick={() => handlePrevSong()}
          src="../assets/icons/previous-song.svg"
        />

        {play ? (
          <img
            className="control-button"
            onClick={() => handlePlaySong()}
            src="../assets/icons/pause.svg"
          />
        ) : (
          <img
            className="control-button"
            onClick={() => handlePlaySong()}
            src="../assets/icons/play.svg"
          />
        )}

        <img
          className="control-button"
          onClick={() => handleNextSong()}
          src="../assets/icons/next-song.svg"
        />
      </div>

      <div className="right-group flex-item">
        {muted ? (
          <img
            className="control-button"
            src="../assets/icons/mute.svg"
            alt="sound off"
            onClick={() => handleMute()}
          />
        ) : (
          <img
            className="control-button"
            src="../assets/icons/unmute.svg"
            alt="sound on"
            onClick={() => handleMute()}
          />
        )}
      </div>

      <audio
        id="audio_tag"
        src={`${process.env.REACT_APP_UPLOAD_FOLDER}${currentSong.audio}`}
        autoPlay
        loop
        muted={muted}
      />
    </div>
  );
}
