import React, { useState } from "react";

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

  function handleUserStateChange(newUserState) {
    console.log(`Changing state to ${newUserState}`);
    if (newUserState === userState) {
      return;
    }
    if (newUserState === "LOADING_PAGE") {
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
