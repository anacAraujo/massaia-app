import React, { useState, useEffect } from "react";

export const CurrentState = React.createContext();

export function CurrentStateProvider({ children }) {
  const [isViewingAlbumsMenu, setIsViewingAlbumsMenu] = useState(false);
  const [currentSong, setCurrentSong] = useState({});

  useEffect(() => {
    setIsViewingAlbumsMenu(false);
  }, []);

  return (
    <CurrentState.Provider
      value={{
        isViewingAlbumsMenu,
        setIsViewingAlbumsMenu,
        currentSong,
        setCurrentSong,
      }}
    >
      {children}
    </CurrentState.Provider>
  );
}
