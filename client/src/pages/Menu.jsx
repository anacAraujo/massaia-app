import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/menu.css";

export default function Menu() {
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
            <p>temas</p>
            <div
              className="menu-option"
              style={{ display: selectedMenu === "videos" ? "block" : "none" }}
            >
              <p>
                <Link>volume I</Link>
              </p>
              <p>
                <Link>volume II</Link>
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
                <Link>volume I</Link>
              </p>
              <p>
                <Link>volume II</Link>
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
                <Link>projetos</Link>
              </p>
              <p>
                <Link>autores</Link>
              </p>
              <p>
                <Link>artistas</Link>
              </p>
              <p>
                <Link>site</Link>
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
