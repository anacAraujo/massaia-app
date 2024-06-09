import React, { useState } from "react";
import axios from "../lib/axiosConfig.js";
import { CurrentState } from "./currentState.js";

export const CacheApi = React.createContext();

export function CacheApiProvider({ children }) {
  const [songsByAlbum, setSongsByAlbum] = useState({});
  const [artPiecesByAlbum, setArtPiecesByAlbum] = useState({});
  const [moments, setMoments] = useState([]);
  const { setCurrentSong } = React.useContext(CurrentState);

  function initializeSongsByAlbum() {
    if (Object.keys(songsByAlbum).length <= 0) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/songs`);

          let songsByAlbumObj = {};

          for (const song of res.data) {
            if (!Array.isArray(songsByAlbumObj[song.album_id])) {
              songsByAlbumObj[song.album_id] = [];
            }
            songsByAlbumObj[song.album_id].push(song);
          }

          setSongsByAlbum(songsByAlbumObj);
          setCurrentSong(res.data[0]);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }
  }

  return (
    <CacheApi.Provider
      value={{
        songsByAlbum,
        initializeSongsByAlbum,
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
