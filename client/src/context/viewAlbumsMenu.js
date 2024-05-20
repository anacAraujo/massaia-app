import React, { useState, useEffect } from "react";

export const ViewAlbumsMenu = React.createContext();

// TODO delete and use state instead of context
export function ViewAlbumsMenuProvider({ children }) {
  const [isViewingAlbumsMenu, setIsViewingAlbumsMenu] = useState(false);

  function handleIsViewingAlbumsMenu(isViewingAlbumsMenu) {
    setIsViewingAlbumsMenu(isViewingAlbumsMenu);
    localStorage.setItem(
      "isViewingAlbumsMenu",
      JSON.stringify(isViewingAlbumsMenu)
    );
  }

  useEffect(() => {
    setIsViewingAlbumsMenu(false);
  }, []);

  return (
    <ViewAlbumsMenu.Provider
      value={{ isViewingAlbumsMenu, setIsViewingAlbumsMenu }}
    >
      {children}
    </ViewAlbumsMenu.Provider>
  );
}
