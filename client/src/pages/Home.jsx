import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import AudioPlayer from "react-h5-audio-player";

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

  const [showingDropdownOptions, setShowingDropdownOptions] = useState(false);

  function handleAlbumCoverClick(albumId) {
    setMenuAlbumId(albumId);
    handleUserStateChange(USER_STATES.ALBUMS_MENU);
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

  function handleSongChange(newSongId) {
    setCurrentSongById(newSongId);
    setShowingDropdownOptions(false);
  }

  function handleDropdownClick() {
    setShowingDropdownOptions(!showingDropdownOptions);
    console.log("inside handleDropdownClick", showingDropdownOptions);
  }

  useEffect(() => {
    if (userState === USER_STATES.LOADING_PAGE) {
      if (songId) {
        setCurrentSongById(songId);
      } else {
        setCurrentSongByAlbum(1);
      }
    }

    let timeoutId;

    const handleMouseMove = () => {
      clearTimeout(timeoutId);
      if (userState === USER_STATES.VIEWING_SONG) {
        handleUserStateChange(USER_STATES.SONG_MENU);
      } else {
        handleUserStateChange(USER_STATES.SONG_MENU);
      }
      console.log("Mouse is moving");
    };

    const handleMouseStop = () => {
      console.log("Mouse stopped moving");
      timeoutId = setTimeout(() => {
        handleUserStateChange(USER_STATES.VIEWING_SONG);
        console.log("setTimeout: Timer viewing song after stop");
      }, 2000);
    };

    if (
      userState === USER_STATES.SONG_MENU ||
      userState === USER_STATES.VIEWING_SONG
    ) {
      console.log("inside useEffect SONG_MENU or VIEWING_SONG");
      timeoutId = setTimeout(() => {
        setShowingDropdownOptions(false);
        handleUserStateChange(USER_STATES.VIEWING_SONG);
        console.log("setTimeout: Timer viewing song");
      }, 2000);

      let mouseStopTimeout;
      const debouncedMouseStop = () => {
        clearTimeout(mouseStopTimeout);
        mouseStopTimeout = setTimeout(handleMouseStop, 100);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mousemove", debouncedMouseStop);

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(mouseStopTimeout);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mousemove", debouncedMouseStop);
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
            <>
              <img
                className="menu-albums-song"
                src={`${process.env.REACT_APP_UPLOAD_FOLDER}${currentSong.image}`}
                alt="song cover"
              />

              <audio
                src={`${process.env.REACT_APP_UPLOAD_FOLDER}${currentSong.audio}`}
                autoPlay
                loop
                muted={muted}
              />
            </>
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
                  onClick={() => handleAlbumCoverClick(1)}
                />
                <img
                  src={`${process.env.REACT_APP_UPLOAD_FOLDER}/${songsByAlbum[2][0]?.album_cover}`}
                  alt="album cover"
                  onClick={() => handleAlbumCoverClick(2)}
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

                  <DropdownButton
                    key={"up"}
                    id={`dropdown-button-drop-up-centered`}
                    drop={"up"}
                    variant="secondary"
                    title={currentSong.name}
                    show={showingDropdownOptions}
                    onClick={() => handleDropdownClick()}
                    className="custom-dropdown"
                  >
                    {showingDropdownOptions &&
                      (songsByAlbum[currentSong.album_id]?.length > 0 ? (
                        songsByAlbum[currentSong.album_id].map((song) => (
                          <Dropdown.Item
                            key={song.id}
                            onClick={() => handleSongChange(song.id)}
                            className="custom-dropdown-item"
                          >
                            {song.name}
                          </Dropdown.Item>
                        ))
                      ) : (
                        <Dropdown.Item disabled>
                          No songs available
                        </Dropdown.Item>
                      ))}
                  </DropdownButton>
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
