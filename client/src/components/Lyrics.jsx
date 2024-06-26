import React from "react";

import { CurrentState } from "../context/currentState.js";
import "../styles/homeMenus.css";

export default function Lyrics() {
  const { currentSong } = React.useContext(CurrentState);

  return (
    <div className="lyrics-container">
      <p>{currentSong.lyrics}</p>

      <div>
        <img src="../assets/icons/exit.svg" />
      </div>
    </div>
  );
}
