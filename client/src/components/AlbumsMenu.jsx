import React, { useState, useEffect } from "react";
import axios from "../lib/axiosConfig.js";

export function AlbumsMenu() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/albums`);
        const albumsData = res.data;
        for (let album of albumsData) {
          const res = await axios.get(`/albums/${album.id}/songs`);
          album.songs = res.data;
        }
        setAlbums(albumsData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Albums</h1>
      <div>
        {albums.map((album) => (
          <div key={album.id} className="menu-albums scrollmenu">
            <img
              className="menu-albums-cover"
              src={`../upload/${album.cover}`}
              alt="album cover"
            />
            {album.songs.map((song) => (
              <div key={song.id}>
                <img
                  className="menu-albums-song"
                  src={`../upload/${song.cover}`}
                  alt="song cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
