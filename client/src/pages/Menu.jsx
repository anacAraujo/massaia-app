//TODO make global component like header

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CurrentState } from "../context/currentState.js";
import { CacheApi } from "../context/cacheApi.js";
import "../styles/menu.css";

export default function Menu() {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setSelectedMenu(selectedMenu === menu ? null : menu);
  };

  const { setCurrentSong } = React.useContext(CurrentState);
  const { songsByAlbum, initSongsInfo } = React.useContext(CacheApi);

  const navigate = useNavigate();

  function handleChangeCurrentSong(album_id, destination) {
    // TODO use setCurrentSongByAlbum
    setCurrentSong(songsByAlbum[album_id][0]);
    navigate(destination);
  }

  useEffect(() => {
    initSongsInfo();
  }, []);

  return (
    <div>
      <div>
        <h1 className="menu-massaia">MASSAIÁ</h1>
        <Link to="/">
          {" "}
          <img
            className="menu-exit"
            src="../assets/icons/exit.svg"
            alt="exit"
          />
        </Link>
      </div>
      <div>
        <div className="menu-options">
          <div
            className="menu-main-option"
            onClick={() => handleMenuClick("videos")}
          >
            <p>temas</p>
            <div
              className="menu-option"
              style={{ display: selectedMenu === "videos" ? "block" : "none" }}
            >
              {/* TODO  change to  button - set current song to first song of each volume and then redirect*/}
              <p>
                <button
                  onClick={() => handleChangeCurrentSong("1", "/temas/1")}
                >
                  volume I
                </button>
              </p>

              <p>
                <button
                  onClick={() => handleChangeCurrentSong("2", "/temas/10")}
                >
                  volume II
                </button>
              </p>
            </div>
          </div>
          <div
            className="menu-main-option"
            onClick={() => handleMenuClick("galeria")}
          >
            <p>galeria</p>
            <div
              className="menu-option"
              style={{ display: selectedMenu === "galeria" ? "block" : "none" }}
            >
              <p>
                <button
                  onClick={() => handleChangeCurrentSong("1", "/galeria/1")}
                >
                  volume I
                </button>
              </p>
              <p>
                <button
                  onClick={() => handleChangeCurrentSong("2", "/galeria/10")}
                >
                  volume II
                </button>
              </p>
            </div>
          </div>
          <div
            className="menu-main-option"
            onClick={() => handleMenuClick("sobre")}
          >
            <p>sobre</p>
            <div
              className="menu-option"
              style={{ display: selectedMenu === "sobre" ? "block" : "none" }}
            >
              <p>
                <button
                  // TODO DO NOT RESET STATE, JUST LINK TO OTHER PAGE
                  onClick={() => handleChangeCurrentSong("1", "/projetos")}
                >
                  projetos
                </button>
              </p>
              <p>
                <button
                  onClick={() => handleChangeCurrentSong("1", "/autores")}
                >
                  autores
                </button>
              </p>
              <p>
                <button
                  onClick={() => handleChangeCurrentSong("1", "/artistas")}
                >
                  artistas
                </button>
              </p>
              <p>
                <button onClick={() => handleChangeCurrentSong("1", "/site")}>
                  site
                </button>
              </p>
            </div>
          </div>
          <div
            className="menu-main-option"
            onClick={() => handleMenuClick("momentos")}
          >
            <p>
              <Link to="/momentos">momentos</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
