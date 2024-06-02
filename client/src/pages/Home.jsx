import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CurrentState } from "../context/currentState.js";
import { AlbumsMenu } from "../components/AlbumsMenu.jsx";
import { LandingPage } from "../components/LandingPage.jsx";
import { CacheApi } from "../context/cacheApi.js";

import "../styles/homeMenus.css";
import axios from "../lib/axiosConfig.js";

export default function Home() {
  const [song, setSong] = useState({});
  const [hasViewedLandingPage, setHasViewedLandingPage] = useState(false);

  const [songId, setSongId] = useState(1);
  const handleSongChange = (id) => {
    setSongId(id);
  };

  const { isViewingAlbumsMenu, setIsViewingAlbumsMenu } =
    React.useContext(CurrentState);

  const { songsByAlbum, setSongsByAlbum } = React.useContext(CacheApi);

  const handleIsViewingAlbumsMenu = () => {
    setIsViewingAlbumsMenu(true);
  };

  const handleVideoPlayerClick = () => {
    handleHasViewedLandingPage(true);
  };

  function handleHasViewedLandingPage(hasViewedLandingPage) {
    setHasViewedLandingPage(hasViewedLandingPage);
  }

  useEffect(() => {
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
          setSong(res.data[0]);
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();
    }
  }, []);

  return (
    <div className="videoPlayer" onClick={handleVideoPlayerClick}>
      <div className="overlay"></div>
      <video
        src={process.env.REACT_APP_UPLOAD_FOLDER + song.video}
        autoPlay
        loop
        muted
      />

      {!hasViewedLandingPage && <LandingPage></LandingPage>}
      {hasViewedLandingPage && !isViewingAlbumsMenu && (
        <div>
          <div className="massaia">
            <p>MASSAIÁ</p>
          </div>
          <Link className="menu" to="/menu">
            <img src="../assets/icons/menu-white.svg" alt="menu" />
          </Link>
          <div className="album-cover">
            <img
              src={`${process.env.REACT_APP_UPLOAD_FOLDER}/${song.album_cover}`}
              alt="album cover"
              onClick={handleIsViewingAlbumsMenu}
            />
          </div>
          <Link className="credits" to="/credits">
            <p>créditos</p>
          </Link>
          <div className="song-info">
            <p>1:30 {song.name}</p>
          </div>
        </div>
      )}
      {hasViewedLandingPage && isViewingAlbumsMenu && (
        <AlbumsMenu
          onSongChange={handleSongChange}
          songsInfo={songsByAlbum[1]}
        />
      )}
    </div>
  );
}
