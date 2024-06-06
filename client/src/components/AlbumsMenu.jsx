import React, { useState, useEffect } from "react";
import { CurrentState } from "../context/currentState.js";
import { USER_STATES } from "../context/currentState.js";
import "../styles/homeMenus.css";

export function AlbumsMenu({ onSongChange, songsInfo }) {
  const { handleUserStateChange } = React.useContext(CurrentState);

  const handleIsViewingAlbumsMenu = () => {
    handleUserStateChange(USER_STATES.SONG_MENU);
  };

  const handleSongClick = (id) => {
    handleIsViewingAlbumsMenu();
    onSongChange(id);
  };

  return (
    <div className="menu-albuns">
      <div className="menu-albums-line">
        <img src="../assets/images/line.png" />
      </div>

      {songsInfo.length > 0 && (
        <div
          className="menu-albums scrollmenu"
          key={songsInfo[0].id}
          onClick={() => handleSongClick(songsInfo[0].id)}
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
                onClick={() => handleSongClick(song.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
