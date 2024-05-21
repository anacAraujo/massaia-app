import React, { useState, useEffect } from "react";
import axios from "../lib/axiosConfig.js";
import "../styles/homeMenus.css";

export function AlbumsMenu() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/songs?album_id=1`);
        const songsData = res.data;
        setSongs(songsData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="menu-albuns-line">
        <img src="../assets/images/line.png" />
      </div>

      {songs.length > 0 && (
        <div className="menu-albums scrollmenu" key={songs[0].id}>
          <img
            className="menu-albums-cover"
            src={`${process.env.REACT_APP_UPLOAD_FOLDER}${songs[0].album_cover}`}
            alt="album cover"
          />
          {songs.map((song) => (
            <div key={song.id}>
              <img
                className="menu-albums-song"
                src={`${process.env.REACT_APP_UPLOAD_FOLDER}${song.image}`}
                alt="song cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
