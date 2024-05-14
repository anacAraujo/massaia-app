import "../styles/homeMenu.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../lib/axiosConfig.js";

export function HomeMenu({ songId }) {
  console.log("songId: ", songId);
  const [song, setSong] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/songs/${songId}`);
        setSong(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [songId]);

  return (
    <div>
      <div className="massaia">
        <p>MASSAIÁ</p>
      </div>
      <Link className="menu" to="/menu">
        <img src="../assets/icons/menu-white.svg" alt="menu" />
      </Link>
      <div className="album-cover">
        <img src="../upload/coverAlbum1.png" alt="album cover" />
      </div>
      <Link className="credits" to="/credits">
        <p>créditos</p>
      </Link>
      <div className="song-info">
        <p>1:30 {song.name}</p>
      </div>
    </div>
  );
}
