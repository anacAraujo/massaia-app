import { useState, useEffect } from "react";
import Header from "../components/Header";
import "../styles/project.css";

export default function Project() {
  const [selectedKey, setSelectedKey] = useState("Massaiá");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const projectInfo = {
    Massaiá: (
      <>
        <>
          Massaiá, uma palavra inventada por Helena Caspurro para simbolizar um
          canto de prece à vida, intitula o álbum musical, duplo, em
          desenvolvimento, da cantautora e pianista. O tema foi originalmente
          composto e interpretado para piano por Orange Sandalwood, que o editou
          com o mesmo nome, em{" "}
          <a
            href="https://open.spotify.com/album/1Yxe6EkDsQ40NKxQQ9Dht8?si=7zAu86gMTTa0I14pZElx7A&nd=1&dlsi=75c6c1fd60f446c1"
            target="_blank"
          >
            The Mirror Inside
          </a>{" "}
          (2021), no formato piano solo que deu origem à canção deste projeto. A
          versão cantada pela voz da autora do seu poema, estreando-se no Vol. 1
          do disco, foi gravada com o seu compositor e pianista. Massaiá dá
          continuidade ao estudo criativo, interpretativo e editorial que tem
          desenvolvido como pianista e cantautora em torno da Canção, e que se
          materializou em três obras editadas: Mulher Avestruz (2003),{" "}
          <a
            href="https://open.spotify.com/track/1skHsuprVHYHWQhzi17VRm?si=180b85176d604e6c&nd=1"
            target="_blank"
          >
            Colapsopira
          </a>{" "}
          (2009) e{" "}
          <a
            href="https://open.spotify.com/album/2c9OGIIcD0NrTRW1rT3wnG"
            target="_blank"
          >
            Paluí
          </a>{" "}
          (2013).
        </>
        <br />
        <br></br>
        <>
          Esta obra une-se às anteriores pelas formas e sonoridades jazzísticas,
          onde são exploradas técnicas e caminhos musicais, entre os quais, as
          fusões estilísticas, sugerindo um jazzy como parte da procura de
          inovação e desenvolvimento da canção enquanto género e forma. Uma
          intenção que a autora e candidata estende ao tratamento da própria
          língua portuguesa, através de um cuidado literário depositado na
          criação das letras, fonemas e palavras, seu conteúdo e mensagem
          simbólicos, metafóricos, em intrínseca relação com a composição do som
          e da música. O formato a solo, voz e piano, interpretado pela própria
          cantautora, bem como a improvisação, constituem o centro da sua
          exploração interpretativa e tímbrica, num jogo de influências que
          testemunham a sua formação “clássica” e a passagem pela Escola de Jazz
          do Porto.
        </>
        <br />
        <>
          Massaiá nasce associado ao projeto Espaços do Som, que visa estender a
          entidade substantiva da obra através da sua exploração interpretativa
          e expressiva para além da música e sua escuta: as artes visuais, o
          desenho, a escultura, a fotografia, o vídeo.
        </>
        <br />
        <br />
        <>
          Participa nesta obra e projeto um grupo largo de músicos e artistas
          com quem a autora tem cruzado a sua vida profissional e afetiva.
        </>
        <br />
        <br />
        <>
          O projeto Massaiá é financiado pelo INET-md, FCT e Universidade de
          Aveiro.
        </>
        <br />
        <div className="logos">
          <img src="../assets/images/inet.png" alt="INET-md" />
          <img src="../assets/images/deca.png" alt="deca" />
          <img src="../assets/images/UA.png" alt="UA" />
        </div>
        <div className="logos">
          <img src="../assets/images/idmais.png" alt="id+" />

          <img src="../assets/images/FCT.png" alt="FCT" />
          <img src="../assets/images/pt.png" alt="republica portuguesa" />
          <img
            src="../assets/images/Mulher-Avestruz.png"
            alt="Mulher-Avestruz"
          />
        </div>
        <div className="logos">
          <img src="../assets/images/infante.png" alt="Escritório do Infante" />
          <img src="../assets/images/a-cca.png" alt="cinecultura de avanca" />
        </div>
      </>
    ),
    "Espaços do Som": (
      <>
        <strong>Massaiá na recriação de polifonias de sentido</strong>
        <br></br>
        <br></br>
        <>
          Num mundo desafiado pela força da imagem e do próprio processo
          inventivo, a partir de Massaiá, exploram-se possibilidades de diálogo
          entre música, artes visuais e plásticas, vídeo e multimédia. São
          objetivos deste projeto de criação artística a procura de trajetórias
          holísticas de contemplação e intensificação de sentidos, e, deste
          modo, da própria identidade (i)material daquela obra musical em
          construção. O estudo da metodologia criativa e colaborativa, onde
          participam artistas, docentes e alunos de design e de comunicação do
          DeCA, constitui, ainda, o alcance pedagógico do projeto. Vídeos,
          livro, site, espetáculo e exposição, materializando e cruzando as
          dimensões digital e física, visual e sonora, em exploração, são os
          resultados artísticos que se esperam editar e divulgar. Através
          destes, viabilizar experiências multissensoriais e imersivas de
          significação estética.
        </>
      </>
    ),
    "O Livro":
      "Lorem ipsum dolor sit amet. Aut sint fugiat rem minima voluptas aut galisum temporibus ex dolorem assumenda ut consequatur aperiam. Sit repudiandae amet et perferendis quibusdam est repudiandae quidem non dolores accusantium vel corrupti adipisci qui fuga nostrum. Et erro asperiores ut dicta veritatis et quaerat quis aut quos esse a itaque inventore.",
  };

  const keys = Object.keys(projectInfo);

  const handlePrev = () => {
    const currentIndex = keys.indexOf(selectedKey);
    const prevIndex = (currentIndex - 1 + keys.length) % keys.length;
    setSelectedKey(keys[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = keys.indexOf(selectedKey);
    const nextIndex = (currentIndex + 1) % keys.length;
    setSelectedKey(keys[nextIndex]);
  };

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header />
      <div className="project-container">
        <div>
          <video
            className="project-video"
            src="../upload/massaia.mp4"
            autoPlay
            loop
            muted
          />
        </div>
        {screenWidth >= 880 ? (
          <div className="project-scroll-bar">
            {keys.map((key) => (
              <div
                key={key}
                className={`project-key ${
                  key === selectedKey ? "selected" : ""
                }`}
                onClick={() => setSelectedKey(key)}
              >
                <p>{key}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="project-scroll-bar">
            <img
              src="../assets/icons/project-next-topic.svg"
              onClick={handlePrev}
              alt="Previous"
              className="nav-arrow nav-arrow-prev"
            />
            <div className="project-key selected">
              <p>{selectedKey}</p>
            </div>
            <img
              src="../assets/icons/project-next-topic.svg"
              onClick={handleNext}
              alt="Next"
              className="nav-arrow"
            />
          </div>
        )}
        <div className="project-info">{projectInfo[selectedKey]}</div>
      </div>
    </>
  );
}
