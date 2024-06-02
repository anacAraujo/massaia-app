import React, { useState } from "react";

export const CacheApi = React.createContext();

// TODO change name to cacheApi
export function CacheApiProvider({ children }) {
  const [songsByAlbum, setSongsByAlbum] = useState({});

  return (
    <CacheApi.Provider value={{ songsByAlbum, setSongsByAlbum }}>
      {children}
    </CacheApi.Provider>
  );
}
