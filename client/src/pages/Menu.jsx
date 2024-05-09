import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/menu.css";

export function Menu() {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setSelectedMenu(selectedMenu === menu ? null : menu);
  };

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
            <p>vídeos</p>
            <div
              className="menu-option"
              style={{ display: selectedMenu === "videos" ? "block" : "none" }}
            >
              <p>volume I</p>
              <p>volume II</p>
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
              <p>volume I</p>
              <p>volume II</p>
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
              <p>projetos</p>
              <p>autores</p>
              <p>artistas</p>
              <p>site</p>
            </div>
          </div>
          <div
            className="menu-main-option"
            onClick={() => handleMenuClick("momentos")}
          >
            <p>momentos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
