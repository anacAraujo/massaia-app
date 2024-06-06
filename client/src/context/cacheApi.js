import React, { useState } from "react";

export const CacheApi = React.createContext();

// TODO change name to cacheApi
export function CacheApiProvider({ children }) {
  const [songsByAlbum, setSongsByAlbum] = useState({});
  const [artPiecesByAlbum, setArtPiecesByAlbum] = useState({});
  const [moments, setMoments] = useState([]);

  //TODO move request here - verify if state has info - initializeSongsByAlbum

  return (
    <CacheApi.Provider
      value={{
        songsByAlbum,
        setSongsByAlbum,
        artPiecesByAlbum,
        setArtPiecesByAlbum,
        moments,
        setMoments,
      }}
    >
      {children}
    </CacheApi.Provider>
  );
}
