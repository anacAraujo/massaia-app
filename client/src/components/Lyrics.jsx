import React from "react";
import { CurrentState } from "../context/currentState.js";
import DOMPurify from "dompurify";
import "../styles/homeMenus.css";

export default function Lyrics() {
  const { currentSong } = React.useContext(CurrentState);

  const sanitizedLyrics = DOMPurify.sanitize(currentSong.lyrics);

  return (
    <div className="lyrics-container">
      <div
        className="lyrics-content"
        dangerouslySetInnerHTML={{ __html: sanitizedLyrics }}
      />

      <div className="lyrics-exit">
        <img src="../assets/icons/exit.svg" alt="exit" />
      </div>
    </div>
  );
}
