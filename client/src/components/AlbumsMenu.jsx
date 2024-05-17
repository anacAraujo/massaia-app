import React, { useState, useEffect } from "react";
import axios from "../lib/axiosConfig.js";

export function AlbumsMenu() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/albums`);
        const albumsData = res.data.reverse();
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

  // useEffect(() => {
  //   const scrollMenu = document.querySelector(".scrollmenu");
  //   if (scrollMenu) {
  //     const scrollMenuWidth = scrollMenu.offsetWidth;
  //     const firstImage = document.querySelector(".menu-albums-cover");
  //     if (firstImage) {
  //       firstImage.style.marginLeft = `${
  //         scrollMenuWidth + scrollMenuWidth / 2 - 125
  //       }px`;
  //     }
  //   }
  // }, [albums]);

  return (
    <div className="menu-albums scrollmenu">
      {albums.map((album) => (
        <div key={album.id}>
          <img
            className="menu-albums-cover"
            src={`../upload/${album.cover}`}
            alt="album cover"
          />
          <div className="menu-albums-songs">
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
        </div>
      ))}
    </div>
  );
}
