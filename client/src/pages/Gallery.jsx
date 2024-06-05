import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "../lib/axiosConfig.js";
import Carousel from "react-bootstrap/Carousel";

import Header from "../components/Header";
import MusicControllers from "../components/MusicControllers";
import { CacheApi } from "../context/cacheApi.js";
import "../styles/gallery.css";

export default function Gallery() {
  const { volume } = useParams();
  const [artPieces, setArtPieces] = useState([]);

  const { artPiecesByAlbum, setArtPiecesByAlbum } = React.useContext(CacheApi);

  useEffect(() => {
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

        if (volume) {
          setArtPieces(artPiecesByAlbumObj[volume] || []);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (Object.keys(artPiecesByAlbum).length <= 0) {
      fetchData();
    } else if (volume) {
      setArtPieces(artPiecesByAlbum[volume] || []);
    }
  }, [volume, artPiecesByAlbum, setArtPiecesByAlbum]);

  return (
    <div className="gallery-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="carousel-container">
        <Carousel className="display_art_pieces">
          {artPieces && artPieces.length > 0 ? (
            artPieces.map((artPiece) => (
              <Carousel.Item className="art_piece" key={artPiece.id}>
                <img
                  src={`${process.env.REACT_APP_UPLOAD_FOLDER}/${artPiece.image}`}
                  alt={artPiece.song_name}
                />
                <Carousel.Caption>
                  <h3>{artPiece.song_name}</h3>
                  <p>{artPiece.author_name}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))
          ) : (
            <Carousel.Item>
              <img src="placeholder.jpg" alt="placeholder" />
              <Carousel.Caption>
                <h3>No Art Pieces Available</h3>
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>
      </div>
      <div className="grid-container">
        {artPieces && artPieces.length > 0 ? (
          artPieces.map((artPiece) => (
            <div className="grid-item" key={artPiece.id}>
              <img
                src={`${process.env.REACT_APP_UPLOAD_FOLDER}/${artPiece.image}`}
                alt={artPiece.song_name}
              />
              <div className="art_info">
                <h3>{artPiece.song_name}</h3>
                <p>{artPiece.author_name}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="grid-item">
            <img src="placeholder.jpg" alt="placeholder" />
            <div className="art_info">
              <h3>No Art Pieces Available</h3>
            </div>
          </div>
        )}
      </div>
      <div className="music-controllers-container">
        <MusicControllers />
      </div>
    </div>
  );
}
