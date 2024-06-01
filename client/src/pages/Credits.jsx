import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "../lib/axiosConfig.js";

import "../styles/credits.css";

export default function Credits() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/credits`);
        const albumsData = res.data.reverse();
        setAlbums(albumsData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="credits-eyes"></div>

      <div className="credits-info">
        <img className="img-eyes" src="../assets/images/olhos.png" alt="eyes" />
        <h2>credits</h2>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ullamcorper interdum justo id placerat. Vestibulum quis tincidunt
          quam. Phasellus sed sapien nisi. Cras sed luctus purus. Morbi aliquet
          cursus facilisis. Nulla vulputate lectus vitae est tristique, sed
          placerat nisl efficitur. Suspendisse porttitor semper ligula nec
          rutrum. Integer ut pellentesque odio, vitae aliquet massa. Donec
          congue volutpat pretium. In hac habitasse platea dictumst. Morbi non
          enim nec nulla faucibus venenatis id ac nibh. Suspendisse laoreet
          rhoncus tortor a elementum. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas. Cras pharetra
          purus id facilisis feugiat. In hac habitasse platea dictumst.
        </p>
      </div>
      <div className="credits-exit">
        <Link to="/">
          {" "}
          <img src="../assets/icons/exit.svg" alt="exit" />
        </Link>
      </div>
    </div>
  );
}
