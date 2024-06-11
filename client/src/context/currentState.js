import React, { useState, useEffect } from "react";

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
  const [userState, setUserState] = useState(USER_STATES.LANDING_PAGE);
  console.log("----userState ", userState);

  function handleUserStateChange(newUserState) {
    if (newUserState === userState) {
      return;
    }
    setUserState(newUserState);
  }

  return (
    <CurrentState.Provider
      value={{
        currentSong,
        setCurrentSong,
        userState,
        handleUserStateChange,
      }}
    >
      {children}
    </CurrentState.Provider>
  );
}
