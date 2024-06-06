import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CurrentState } from "../context/currentState.js";
import { USER_STATES } from "../context/currentState.js";
import { AlbumsMenu } from "../components/AlbumsMenu.jsx";
import { LandingPage } from "../components/LandingPage.jsx";
import { CacheApi } from "../context/cacheApi.js";
import { useParams } from "react-router-dom";
import "../styles/homeMenus.css";
import axios from "../lib/axiosConfig.js";

export default function Home() {
  const { volume } = useParams();
  const [songId, setSongId] = useState(1);

  const handleSongChange = (id) => {
    setSongId(id);
  };

  const { currentSong, setCurrentSong, userState, handleUserStateChange } =
    React.useContext(CurrentState);

  const { songsByAlbum, setSongsByAlbum } = React.useContext(CacheApi);

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
          setCurrentSong(res.data[0]);
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();
    } else if (volume != null) {
      let currentSong = songsByAlbum[volume][songId - 1];
      setCurrentSong(currentSong);
    }
  }, [userState]);

  return (
    <div
      className="videoPlayer"
      onClick={() => handleUserStateChange(USER_STATES.SONG_MENU)}
    >
      <div className="overlay"></div>
      <video
        src={process.env.REACT_APP_UPLOAD_FOLDER + currentSong.video}
        autoPlay
        loop
        muted
      />

      {userState === USER_STATES.LANDING_PAGE && <LandingPage></LandingPage>}
      {userState === USER_STATES.SONG_MENU && (
        <div>
          <div className="massaia">
            <p>MASSAIÁ</p>
          </div>
          <Link className="menu" to="/menu">
            <img src="../assets/icons/menu-white.svg" alt="menu" />
          </Link>
          <div className="album-cover">
            <img
              src={`${process.env.REACT_APP_UPLOAD_FOLDER}/${currentSong.album_cover}`}
              alt="album cover"
              onClick={() => handleUserStateChange(USER_STATES.ALBUMS_MENU)}
            />
          </div>
          <Link className="credits" to="/credits">
            <p>créditos</p>
          </Link>
          <div className="song-info">
            <p>1:30 {currentSong.name}</p>
          </div>
        </div>
      )}
      {userState === USER_STATES.ALBUMS_MENU && (
        <AlbumsMenu
          onSongChange={handleSongChange}
          songsInfo={songsByAlbum[1]}
        />
      )}
    </div>
  );
}
