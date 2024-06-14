import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CurrentState } from "../context/currentState.js";
import { USER_STATES } from "../context/currentState.js";
import { AlbumsMenu } from "../components/AlbumsMenu.jsx";
import { LandingPage } from "../components/LandingPage.jsx";
import { Loading } from "../pages/Loading.jsx";
import { CacheApi } from "../context/cacheApi.js";
import "../styles/homeMenus.css";

export default function Home() {
  const { currentSong, setCurrentSong, userState, handleUserStateChange } =
    React.useContext(CurrentState);

  const { songsByAlbum, initSongsInfo } = React.useContext(CacheApi);

  const { songId } = useParams();
  console.log("songId: ", songId);

  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    const init = async () => {
      let resSongsByAlbum = await initSongsInfo();

      if (userState === USER_STATES.LOADING_PAGE) {
        console.log("songsByAlbum ", resSongsByAlbum);
        setCurrentSong(resSongsByAlbum[1][0]);
        handleUserStateChange(USER_STATES.LANDING_PAGE);
      }
    };
    init();

    if (userState === USER_STATES.SONG_MENU) {
      const id = setTimeout(() => {
        handleUserStateChange(USER_STATES.VIEWING_SONG);
      }, 1000);
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

    if (songId) {
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
              muted
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
                <img
                  src={`${process.env.REACT_APP_UPLOAD_FOLDER}/${currentSong.album_cover}`}
                  alt="album cover"
                  onClick={() => handleUserStateChange(USER_STATES.ALBUMS_MENU)}
                />
              </div>
              <Link className="credits" to="/creditos">
                <p>créditos</p>
              </Link>
              <div className="song-info">
                <p>1:30 {currentSong.name}</p>
              </div>
            </div>
          )}
          {userState === USER_STATES.ALBUMS_MENU && (
            <AlbumsMenu songsInfo={songsByAlbum[1]} />
          )}
        </div>
      )}
    </>
  );
}
