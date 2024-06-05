import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "../lib/axiosConfig.js";

import Header from "../components/Header";
import MusicControllers from "../components/MusicControllers";

import { CacheApi } from "../context/cacheApi.js";

export default function Gallery() {
  const { volume } = useParams();
  const { artPieces, setArtPieces } = useState("");

  console.log("volume: ", volume);

  const { artPiecesByAlbum, setArtPiecesByAlbum } = React.useContext(CacheApi);

  useEffect(() => {
    if (Object.keys(artPiecesByAlbum).length <= 0) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/art_pieces`);

          let artPiecesByAlbumObj = {};

          for (const art_piece of res.data) {
            if (!Array.isArray(artPiecesByAlbumObj[art_piece.album_id])) {
              artPiecesByAlbumObj[art_piece.album_id] = [];
            }
            artPiecesByAlbumObj[art_piece.album_id].push(art_piece);
          }

          setArtPiecesByAlbum(artPiecesByAlbumObj);
          if (volume === "1") {
            setArtPieces(res.data[0]);
          } else {
            setArtPieces(res.data[1]);
          }
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();
    } else if (volume != null) {
      let artPieces = artPiecesByAlbum[volume];
      setArtPieces(artPieces);
    }
  }, []);

  return (
    <di>
      <Header></Header>
      <div>
        <img src={artPieces} />
      </div>
      <MusicControllers></MusicControllers>
    </di>
  );
}
