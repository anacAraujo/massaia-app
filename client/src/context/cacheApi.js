import React, { useState } from "react";

export const CacheApi = React.createContext();

// TODO change name to cacheApi
export function CacheApiProvider({ children }) {
  const [songsByAlbum, setSongsByAlbum] = useState({});
  const [artPiecesByAlbum, setArtPiecesByAlbum] = useState({});

  return (
    <CacheApi.Provider
      value={{
        songsByAlbum,
        setSongsByAlbum,
        artPiecesByAlbum,
        setArtPiecesByAlbum,
      }}
    >
      {children}
    </CacheApi.Provider>
  );
}
