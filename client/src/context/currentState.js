import React, { useState, useEffect } from "react";

export const CurrentState = React.createContext();

export default function CurrentStateProvider({ children }) {
  const [isViewingAlbumsMenu, setIsViewingAlbumsMenu] = useState(false);
  const [currentSong, setCurrentSong] = useState("1");

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
