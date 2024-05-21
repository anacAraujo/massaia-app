import React, { useState, useEffect } from "react";
import axios from "../lib/axiosConfig.js";

export function AlbumsMenu() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/songs?album_id=1`);
        const songsData = res.data;
        // for (let album of albumsData) {
        //   const res = await axios.get(`/albums/${album.id}/songs`);
        //   album.songs = res.data;
        // }
        setSongs(songsData);
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
      {songs.length > 0 && (
        <div key={songs[0].id}>
          <img
            className="menu-albums-cover"
            src={`../upload/${songs[0].album_cover}`}
            alt="album cover"
          />
          {songs.map((song) => (
            <div key={song.id}>
              <img
                className="menu-albums-song"
                src={`../upload/${song.image}`}
                alt="song cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
