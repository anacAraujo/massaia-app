import React, { useState, useEffect } from "react";
import axios from "../lib/axiosConfig.js";
import "../styles/homeMenus.css";

export function AlbumsMenu() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/albums`);
        setAlbums(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  console.log("albums: ", albums);

  return (
    <div>
      {albums.map((album) => (
        <div key={album.id} className="menu-albums">
          <img src={`../upload/${album.cover}`} alt="album cover" />
          <img src="" />
        </div>
      ))}
    </div>
  );
}
