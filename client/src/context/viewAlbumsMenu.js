import React, { useState, useEffect } from "react";

export const ViewAlbumsMenu = React.createContext();

export function ViewAlbumsMenuProvider({ children }) {
  const [isViewingAlbumsMenu, setIsViewingAlbumsMenu] = useState(false);

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
