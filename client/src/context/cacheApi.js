import React, { useState } from "react";
import axios from "../lib/axiosConfig.js";

export const CacheApi = React.createContext();

export function CacheApiProvider({ children }) {
  const [songsByAlbum, setSongsByAlbum] = useState({});
  const [songsById, setSongsById] = useState({});

  const [artPiecesByAlbum, setArtPiecesByAlbum] = useState({});
  const [moments, setMoments] = useState([]);

  async function initSongsInfo() {
    if (Object.keys(songsByAlbum).length > 0) {
      return songsByAlbum;
    }
    try {
      const res = await axios.get(`/songs`);

      let songsByAlbumObj = {};
      let songsByIdObj = {};

      for (const song of res.data) {
        if (!Array.isArray(songsByAlbumObj[song.album_id])) {
          songsByAlbumObj[song.album_id] = [];
        }
        songsByAlbumObj[song.album_id].push(song);

        songsByIdObj[song.id] = song;
      }

      setSongsByAlbum(songsByAlbumObj);

      setSongsById(songsByIdObj);
      return songsByAlbumObj;
    } catch (err) {
      console.error("Error getting songsByAlbum ", err);
    }
  }

  return (
    <CacheApi.Provider
      value={{
        songsByAlbum,
        songsById,
        initSongsInfo,
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
