import React, { useEffect } from "react";

import { CurrentState } from "../context/currentState";
import Header from "../components/Header";
import "../styles/aboutSite.css";

export default function Site() {
  const { setPrevPage } = React.useContext(CurrentState);

  const siteCreatorsInfo = {
    "Ana Araújo": {
      image: "../assets/images/ana-araujo.jpeg",
      title: "web developer",
    },
    "João Oliveira": {
      image: "../assets/images/joao-oliveira.jpeg",
      title: "ui/ux designer",
    },
    "Leonardo Bastos": {
      image: "../assets/images/leonardo-bastos.jpg",
      title: "web developer",
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
        Multimédia e Tecnologias da Comunicação, da Universidade de Aveiro.
        Durante a realização deste projeto, foram aplicadas e aprimoradas
        diversas competências adquiridas ao longo do percurso académico. Entre
        estas competências, destacam-se o desenvolvimento de websites dinâmicos
        utilizando frameworks modernas, a implementação de design responsivo
        para garantir a acessibilidade em múltiplos dispositivos, e a integração
        de sistemas de gestão de bases de dados. Este projeto consolidou o
        conhecimento técnico e promoveu o trabalho em equipa e a capacidade de
        resolução de problemas complexos.
      </p>
    </>
  );
}
