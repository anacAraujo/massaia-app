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
    console.log("inside handleDropdownClick", showingDropdownOptions);
  }

  return (
    // TODO unmute song and pause song
    // TODO change buttons to correct icons
    // TODO use media queries
    <div className="musicControllers">
      <div className="left-group">
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

      <div className="center-group">
        <img
          className="control-button"
          onClick={() => handlePrevSong()}
          src="../assets/icons/previous-song.svg"
        />

        <img
          className="control-button"
          onClick={() => handleNextSong()}
          src="../assets/icons/play.svg"
        />

        <img
          className="control-button"
          onClick={() => handleNextSong()}
          src="../assets/icons/next-song.svg"
        />
      </div>

      <div className="right-group">
        <img
          className="control-button"
          onClick={() => handleNextSong()}
          src="../assets/icons/mute.svg"
        />
      </div>
    </div>
  );
}
