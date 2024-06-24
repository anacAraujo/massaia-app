import React, { useState } from "react";
import axios from "../lib/axiosConfig.js";

export const CacheApi = React.createContext();

export function CacheApiProvider({ children }) {
  const [songsByAlbum, setSongsByAlbum] = useState({});
  const [songsById, setSongsById] = useState({});

  const [artPiecesBySong, setArtPiecesBySong] = useState({});
  const [moments, setMoments] = useState([]);
  const [authors, setAuthors] = useState([]);

  async function initSongsInfo() {
    if (Object.keys(songsByAlbum).length > 0) {
      const songsInfo = {
        songsByAlbum: songsByAlbum,
        songsById: songsById,
      };

      return songsInfo;
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

      const songsInfo = {
        songsByAlbum: songsByAlbumObj,
        songsById: songsByIdObj,
      };

      return songsInfo;
    } catch (err) {
      console.error("Error getting songsByAlbum ", err);
    }
  }

  async function initArtPieces() {
    if (Object.keys(artPiecesBySong).length > 0) {
      return artPiecesBySong;
    }
    try {
      const res = await axios.get(`/art_pieces`);

      let artPiecesBySongObj = {};

      for (const artPiece of res.data) {
        if (!Array.isArray(artPiecesBySongObj[artPiece.song_id])) {
          artPiecesBySongObj[artPiece.song_id] = [];
        }
        artPiecesBySongObj[artPiece.song_id].push(artPiece);
      }

      setArtPiecesBySong(artPiecesBySongObj);
      return artPiecesBySongObj;
    } catch (err) {
      console.error("Error getting art pieces ", err);
    }
  }

  async function initMoments() {
    if (moments.length > 0) {
      return moments;
    }
    try {
      const res = await axios.get(`/moments`);
      setMoments(res.data);

      return res.data;
    } catch (err) {
      console.error("Error getting moments ", err);
    }
  }

  async function initAuthors() {
    if (authors.length > 0) {
      return authors;
    }
    try {
      const res = await axios.get(`/artists`);
      setAuthors(res.data);

      return res.data;
    } catch (err) {
      console.error("Error getting authors ", err);
    }
  }

  return (
    <CacheApi.Provider
      value={{
        songsByAlbum,
        songsById,
        initSongsInfo,
        artPiecesBySong,
        initArtPieces,
        moments,
        initMoments,
        authors,
        initAuthors
      }}
    >
      {children}
    </CacheApi.Provider>
  );
}
