import React, { useState } from "react";

import { CacheApi } from "./cacheApi.js";

export const CurrentState = React.createContext();

export const USER_STATES = {
  LOADING_PAGE: "LOADING_PAGE",
  LANDING_PAGE: "LANDING_PAGE",
  SONG_MENU: "SONG_MENU",
  ALBUMS_MENU: "ALBUMS_MENU",
  VIEWING_SONG: "VIEWING_SONG",
  SONG_VIDEO: "SONG_VIDEO",
};

export function CurrentStateProvider({ children }) {
  const [currentSong, setCurrentSong] = useState({});
  const [userState, setUserState] = useState(USER_STATES.LOADING_PAGE);

  const { initSongsInfo } = React.useContext(CacheApi);

  function handleUserStateChange(newUserState) {
    console.log(`Changing state to: ${newUserState}`);

    if (newUserState === userState) {
      return;
    }
    setUserState(newUserState);
  }

  async function setCurrentSongById(songId) {
    const songsInfo = await initSongsInfo();
    const resSongsById = songsInfo.songsById;
    const song = resSongsById[songId];

    console.log("Setting current song by ID to: ", song);
    setCurrentSong(song);

    if (userState === USER_STATES.LOADING_PAGE) {
      handleUserStateChange(USER_STATES.SONG_MENU);
    }
  }

  async function setCurrentSongByAlbum(albumId) {
    const songsInfo = await initSongsInfo();
    const resSongsByAlbum = songsInfo.songsByAlbum;
    const song = resSongsByAlbum[albumId][0];

    console.log("Setting current song by album to: ", song);
    setCurrentSong(song);

    if (userState === USER_STATES.LOADING_PAGE) {
      handleUserStateChange(USER_STATES.LANDING_PAGE);
    }
  }

  return (
    <CurrentState.Provider
      value={{
        currentSong,
        setCurrentSong,
        userState,
        handleUserStateChange,
        setCurrentSongById,
        setCurrentSongByAlbum,
      }}
    >
      {children}
    </CurrentState.Provider>
  );
}
