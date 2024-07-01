import React, { useEffect } from "react";

import { CurrentState } from "../context/currentState";
import Header from "../components/Header";
import "../styles/aboutSite.css";

export default function Site() {
  const { setPrevPage } = React.useContext(CurrentState);

  const siteCreatorsInfo = {
    "Ana Araújo": {
      image: "../assets/images/ana-araujo.jpeg",
      title: "full-stack developer",
    },
    "João Oliveira": {
      image: "../assets/images/joao-oliveira.jpeg",
      title: "ui/ux designer",
    },
    "Leonardo Bastos": {
      image: "../assets/images/leonardo-bastos.jpg",
      title: "full-stack developer",
    },
    "Pedro Soares": {
      image: "../assets/images/pedro-soares.jpeg",
      title: "3D modeler",
    },
  };

  useEffect(() => {
    setPrevPage("/site");
  }, []);

  return (
    <>
      <Header />
      <div className="site-container">
        {Object.entries(siteCreatorsInfo).map(([name, info]) => (
          <div key={name} className="site-creator">
            <img className="site-img" src={info.image} alt={name} />
            <p className="site-name">{name}</p>
            <p className="site-title">{info.title}</p>
          </div>
        ))}
      </div>
      <p className="site-description">
        Este site foi desenvolvido no contexto do projeto final da licenciatura
        em Multimédia e Tecnologias da Comunicação, da Universidade de Aveiro,
        no ano letivo 2023/2024. O trabalho foi orientado pela docente Maria
        João Antunes.
      </p>
    </>
  );
}
