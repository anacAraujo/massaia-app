import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import "../styles/notFound.css";

function NotFound({ safariAgent }) {
  let screenWidth = window.innerWidth;
  console.log("page safariAgent: ", safariAgent);

  return (
    <div>
      <Header></Header>

      {safariAgent && screenWidth >= 769 ? (
        <div>
          <div className="notfound-container">
            <h1>Ops! Parece que está a utilizar o Safari.</h1>
            <p>Para uma melhor experiência, abra este site noutro browser.</p>
            <a href="googlechrome://navigate?url=massaia.pt">
              <Button variant="outline-dark">abrir no Chrome</Button>
            </a>
          </div>
        </div>
      ) : (
        <div className="notfound-container">
          <h1>404 - PÁGINA NÃO ENCONTRADA</h1>
          <p>
            Lamentamos, esta página não se encontra disponível no nosso site.
          </p>
          <Link to="/">
            <Button variant="outline-dark">regressar à página principal</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default NotFound;
