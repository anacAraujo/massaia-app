import React, { useState, useEffect } from "react";

export const ViewAlbumsMenu = React.createContext();

//TODO change name of context CurrentStateProvider

export function ViewAlbumsMenuProvider({ children }) {
  const [isViewingAlbumsMenu, setIsViewingAlbumsMenu] = useState(false);
  const [currentSong, setCurrentSong] = useState("1");

  useEffect(() => {
    setIsViewingAlbumsMenu(false);
  }, []);

  return (
    <ViewAlbumsMenu.Provider
      value={{
        isViewingAlbumsMenu,
        setIsViewingAlbumsMenu,
        currentSong,
        setCurrentSong,
      }}
    >
      {children}
    </ViewAlbumsMenu.Provider>
  );
}
