import React, { useState, useEffect } from "react";
import { CurrentState } from "../context/currentState.js";
import { USER_STATES } from "../context/currentState.js";
import "../styles/homeMenus.css";

export function AlbumsMenu({ songsInfo }) {
  const { setCurrentSongById, handleUserStateChange } =
    React.useContext(CurrentState);

  const handleIsViewingAlbumsMenu = () => {
    handleUserStateChange(USER_STATES.SONG_MENU);
  };

  function handleChangeCurrentSong(id) {
    let selectedSong = {};
    songsInfo.forEach((song) => {
      if (song.id === id) {
        selectedSong = song;
      }
    });

    setCurrentSongById(selectedSong.id);
  }

  return (
    <div className="menu-albuns">
      {songsInfo.length > 0 && (
        <div
          className="menu-albums scrollmenu"
          key={songsInfo[0].id}
          onClick={() => handleIsViewingAlbumsMenu}
        >
          <img
            className="menu-albums-cover"
            src={`${process.env.REACT_APP_UPLOAD_FOLDER}${songsInfo[0].album_cover}`}
            alt="album cover"
          />
          {songsInfo.map((song) => (
            <div key={song.id}>
              <img
                className="menu-albums-song"
                src={`${process.env.REACT_APP_UPLOAD_FOLDER}${song.image}`}
                alt="song cover"
                onClick={() => {
                  handleIsViewingAlbumsMenu();
                  handleChangeCurrentSong(song.id);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
