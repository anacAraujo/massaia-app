import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CurrentState } from "../context/currentState.js";
import { USER_STATES } from "../context/currentState.js";
import { AlbumsMenu } from "../components/AlbumsMenu.jsx";
import { LandingPage } from "../components/LandingPage.jsx";
import { Loading } from "../pages/Loading.jsx";
import { CacheApi } from "../context/cacheApi.js";
import "../styles/homeMenus.css";

export default function Home() {
  const {
    currentSong,
    setCurrentSongById,
    setCurrentSongByAlbum,
    userState,
    handleUserStateChange,
  } = React.useContext(CurrentState);

  const { songsByAlbum } = React.useContext(CacheApi);

  const { songId } = useParams();

  const [menuAlbumId, setMenuAlbumId] = useState(1);

  const [muted, setMuted] = useState(true);

  const [timeoutId, setTimeoutId] = useState(null);

  function handleAlbumMenuId(albumId) {
    setMenuAlbumId(albumId);
  }
  function handleMute() {
    setMuted(true);
  }

  function handleUnmute() {
    setMuted(false);
  }

  function handleAlbumChange(currentAlbumId) {
    let newAlbumId = null;
    if (currentAlbumId === 1) {
      newAlbumId = 2;
    }

    if (currentAlbumId === 2) {
      newAlbumId = 1;
    }
    setCurrentSongByAlbum(newAlbumId);
  }

  useEffect(() => {
    if (userState === USER_STATES.LOADING_PAGE) {
      if (songId) {
        setCurrentSongById(songId);
      } else {
        setCurrentSongByAlbum(1);
      }
    }

    //TODO handleMouseMove
    if (userState === USER_STATES.SONG_MENU) {
      const id = setTimeout(() => {
        handleUserStateChange(USER_STATES.VIEWING_SONG);
      }, 5000);

      // TODO check timeout usage
      setTimeoutId(id);

      const handleMouseMove = () => {
        clearTimeout(id);
        handleUserStateChange(USER_STATES.SONG_MENU);
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        clearTimeout(id);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [userState]);

  return (
    <>
      {userState === USER_STATES.LOADING_PAGE ? (
        <Loading></Loading>
      ) : (
        <div
          className="videoPlayer"
          onClick={() => handleUserStateChange(USER_STATES.SONG_MENU)}
        >
          <div className="overlay"></div>
          {currentSong.video != null ? (
            <video
              className="menu-albums-song"
              src={`${process.env.REACT_APP_UPLOAD_FOLDER}${currentSong.video}`}
              autoPlay
              loop
              muted={muted}
            />
          ) : (
            <img
              className="menu-albums-song"
              src={`${process.env.REACT_APP_UPLOAD_FOLDER}${currentSong.image}`}
              alt="song cover"
            />
          )}
          {userState === USER_STATES.LANDING_PAGE && <LandingPage />}
          {userState === USER_STATES.SONG_MENU && (
            <div>
              <div className="massaia">
                <p>MASSAIÁ</p>
              </div>
              <Link className="menu" to="/menu">
                <img src="../assets/icons/menu-white.svg" alt="menu" />
              </Link>
              <div className="album-cover">
                <p>vol. I</p>
                <img
                  src={`${process.env.REACT_APP_UPLOAD_FOLDER}/${songsByAlbum[1][0]?.album_cover}`}
                  alt="album cover"
                  onClick={
                    (() => handleAlbumMenuId(songsByAlbum[1][0]?.album_id),
                    () => handleUserStateChange(USER_STATES.ALBUMS_MENU))
                  }
                />
                <img
                  src={`${process.env.REACT_APP_UPLOAD_FOLDER}/${songsByAlbum[2][0]?.album_cover}`}
                  alt="album cover"
                  onClick={
                    (() => handleAlbumMenuId(songsByAlbum[2][0]?.album_id),
                    () => handleUserStateChange(USER_STATES.ALBUMS_MENU))
                  }
                />
                <p>vol. II</p>
              </div>
              <Link className="credits" to="/creditos">
                <p>créditos</p>
              </Link>
              <div className="song-info">
                <div>
                  {muted ? (
                    <img
                      className="sound"
                      src="../assets/icons/sound-off.svg"
                      alt="sound off"
                      onClick={() => handleUnmute()}
                    />
                  ) : (
                    <img
                      className="sound"
                      src="../assets/icons/sound-on.svg"
                      alt="sound on"
                      onClick={() => handleMute()}
                    />
                  )}
                  <p
                    onClick={() => handleAlbumChange(currentSong.album_id)}
                    className="vol"
                  >
                    vol. {currentSong.album_id}
                  </p>
                  1:30 {"  "}
                  {currentSong.name}
                </div>
              </div>
            </div>
          )}
          {userState === USER_STATES.ALBUMS_MENU && (
            <AlbumsMenu songsInfo={songsByAlbum[menuAlbumId]} />
          )}
        </div>
      )}
    </>
  );
}
