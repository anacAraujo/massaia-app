import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import "../styles/notFound.css";

function NotFound() {
  return (
    <div>
      <Header></Header>
      <div className="notfound-container">
        <h1>404 - PÁGINA NÃO ENCONTRADA</h1>
        <p>Lamentamos, esta página não se encontra disponível no nosso site.</p>
        <Link to="/">
          <Button variant="outline-dark">regressar à página principal</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
