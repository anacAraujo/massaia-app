import { useEffect, useState, useContext, useRef } from "react";
import { CacheApi } from "../context/cacheApi.js";
import Header from "../components/Header";
import "../styles/authors.css";

export default function Authors() {
  const { authors, initAuthors } = useContext(CacheApi);
  const [showHelenaInfo, setShowHelenaInfo] = useState(false);
  const [showPedroInfo, setShowPedroInfo] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth <= 649);
  const [infoTextExcedingSize, setInfoTextExcedingSize] = useState(false);
  const infoTextRef = useRef(null);

  useEffect(() => {
    initAuthors();

    const handleMobile = () => {
      setMobile(window.innerWidth <= 649);
    };

    window.addEventListener("resize", handleMobile);
    return () => window.removeEventListener("resize", handleMobile);
  }, [authors]);

  useEffect(() => {
    if (infoTextRef.current) {
      setInfoTextExcedingSize(
        infoTextRef.current.scrollHeight > infoTextRef.current.clientHeight
      );
    }
  }, [showHelenaInfo, showPedroInfo]);

  const toggleHelenaInfo = () => {
    setShowHelenaInfo((prev) => !prev);
    setShowPedroInfo(false);
  };

  const togglePedroInfo = () => {
    setShowPedroInfo((prev) => !prev);
    setShowHelenaInfo(false);
  };

  const getAuthors = authors.slice(0, 2);

  return (
    <div className="authors-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="authors-grid-container">
        <div className="authors-grid">
          {getAuthors.length > 0 ? (
            getAuthors.map((author) => (
              <div key={author.id}>
                <img
                  src={`${process.env.REACT_APP_UPLOAD_FOLDER}${author.image}`}
                  className={`authors-image ${
                    (showHelenaInfo && author.name !== "Helena Caspurro") ||
                    (showPedroInfo &&
                      author.name !== "Pedro Carvalho de Almeida")
                      ? "hidden"
                      : ""
                  }`}
                  alt={author.name}
                />
                {author.name === "Helena Caspurro" && showHelenaInfo ? (
                  <div
                    className={`authors-info ${showHelenaInfo ? "helena" : ""}`}
                    ref={showHelenaInfo ? infoTextRef : null}
                  >
                    {mobile ? (
                      <h3>Maria Helena Ribeiro da Silva Caspurro</h3>
                    ) : (
                      <h3>Helena Caspurro</h3>
                    )}
                    <p className={infoTextExcedingSize ? "overflow" : ""}>
                      Natural do Porto, onde reside, é Professora Auxiliar da
                      Universidade de Aveiro (UA), investigadora integrada do
                      Instituto de Etnomusicologia - Centro de Estudos em Música
                      e Dança (INET-md) e colaboradora do Centro de Estudos de
                      Sociologia Estética e Musical (CESEM) da FCSH-Universidade
                      Nova de Lisboa, onde também leccionou. A improvisação e a
                      compreensão na aprendizagem, a que dedicou a sua tese de
                      doutoramento, estão entre os seus temas preferidos como
                      professora e musicista, a par da educação colaborativa, da
                      criatividade e da arte participativa em contexto
                      educativo. Lecciona Didática da Música nos Mestrados em
                      Ensino da Música e Ensino Básico do Departamento de
                      Comunicação e Arte e do Departamento de Educação e
                      Psicologia (UA). Ministra regularmente seminários em
                      várias escolas e universidades, em Portugal e no
                      estrangeiro, e tem dirigido e apresentado espectáculos de
                      música cénica para crianças, jovens e professores de
                      música, como "Um sonho americano" (2011) e "Em canto se
                      conta o Natal (2013), a convite do Serviço Educativo da
                      Casa da Música (Porto). Como pianista, cantora,
                      compositora e letrista nos géneros jazz e fusion, publicou
                      quatro álbuns/CDs originais, Mulher Avestruz (2003),
                      Colapsopira (2009), Paluí (2013) e Massaiá (2023); este
                      último como primeiro volume de um álbum duplo a ser
                      concluído em 2024/25 e o seu mais recente projeto de
                      criação e publicação musical, artística, literária e
                      videográfica. A obra de Paluí constitui a génese musical
                      de projectos transdisciplinares de investigação e criação
                      artística que tem desenvolvido em escolas e comunidades
                      portuguesas e que tem apresentado em inúmeras conferências
                      internacionais, também como oradora principal.
                      Destacam-se: "Se queres saber o que é Paluí põe o teu dedo
                      aqui!!! Viagens sonoras que a Língua Portuguesa Conta",
                      que envolveu cerca de 600 crianças e respetivos
                      professores das escolas básicas de Santa Maria da Feira e
                      resultou na cocriação e publicação de um livro (2017);
                      "Paluí, está aqui? Histórias sonoras para cantos
                      interiores", que, tendo sido orientado por objectivos
                      inclusivos/sociais, nomeadamente o combate ao estigma da
                      doença mental, se consumou num espetáculo musical e
                      dramático, germinado de uma construção colectiva entre
                      utentes do Hospital Magalhães Lemos (Porto), alunos e
                      professores da Universidade de Aveiro, do Instituto
                      Politécnico do Porto, do Centro de Infância, Artes e
                      Qualidade de Aveiro e artistas da Casa da Música;
                      publicado em Documentário e Filme-Concerto (2020), a
                      criação foi apresentada no festival Ao Alcance de Todos na
                      Casa da Música (2019). A sua atividade musical e artística
                      inclui a colaboração com músicos como Brendan Hemsworth,
                      Elizabeth Davis, António Aguiar, Arnaldo Fonseca, Pedro
                      Almeida, Carlos Mendes, Andrés Tarabbia, Mário Santos,
                      Filipe Lopes, Paulo Neto, entre outros, em gravações e
                      concertos; participação em programas de rádio como os
                      Cinco Minutos de Jazz, Paixões Cruzadas e bandas sonoras
                      de telenovelas; como artista convidado no Tedx-Aveiro
                      (2013) e como cantor em concertos com a orquestra
                      Filarmonia das Beiras; edição de vários videoclips,
                      documentários e filmes de concertos, em colaboração com
                      Pedro Carvalho de Almeida, Carlos Silva e o Cine Clube de
                      Avanca - apresentado em inúmeros festivais de cinema nos
                      cinco continentes, alguns dos quais foram também
                      seleccionados, como é o caso de Navegar, nomeado em 2014
                      para o International Children's Film Festival em Lucknow
                      (Índia) e premiado, entre outros, no Festival de Cinema de
                      Avanca. Estudou com vários investigadores e pedagogos
                      musicais, como E. Gordon, C. Azzara, B. Bolton e J.
                      Paynter, entre outros. Concluiu o Doutoramento em Ensino
                      da Música na Universidade de Aveiro (2006), o Mestrado em
                      Ciências Musicais na Universidade de Coimbra (1992), a
                      Licenciatura em Filosofia na Universidade do Porto (1989)
                      e o Curso Superior de Piano em 1987 no Conservatório de
                      Música do Porto.
                    </p>
                    <button onClick={toggleHelenaInfo}>
                      <img src="../assets/icons/exit.svg" alt="exit" />
                    </button>
                  </div>
                ) : author.name === "Pedro Carvalho de Almeida" &&
                  showPedroInfo ? (
                  <div
                    className={`authors-info ${showPedroInfo ? "pedro" : ""}`}
                    ref={showPedroInfo ? infoTextRef : null}
                  >
                    {mobile ? (
                      <h3>Pedro Carvalho de Almeida</h3>
                    ) : (
                      <h3>
                        Pedro Carvalho de <br />
                        Almeida
                      </h3>
                    )}
                    <p className={infoTextExcedingSize ? "overflow" : ""}>
                      Pedro Carvalho de Almeida (Ph.D, FRSA) é Designer de
                      comunicação, Professor Auxiliar no Departamento de
                      Comunicação e Arte da Universidade de Aveiro, investigador
                      no Instituto de Investigação em Design, Media e Cultura
                      (ID+), e Fellow da Royal Society of Arts no Reino Unido.
                      Doutorado em Design pela Central Saint Martins, University
                      of the Arts London, com bolsa da FCT, realizou estudos de
                      pós-doutoramento na mesma instituição com bolsas do Arts
                      and Humanities Research Council (AHRC) e da FCT. A sua
                      investigação ajudou a definir a Arqueologia de Marcas como
                      um campo de estudo e abordagem metodológica, tendo sido
                      apresentada e publicada em Portugal e internacionalmente
                      em livros, revistas científicas, conferências, seminários,
                      masterclasses, workshops e exposições. Licenciado em
                      Design de Comunicação (Arte Gráfica) pela Faculdade de
                      Belas Artes da Universidade do Porto, é Mestre em Design,
                      Materiais e Gestão de Produto pela Universidade de Aveiro,
                      focando-se desde então na valorização do significado
                      cultural e histórico de marcas portuguesas tradicionais,
                      sobretudo na área do calçado. É curador da exposição
                      'Sapatilhas: Marcas Portuguesas do Estado Novo ao virar do
                      milénio', na Casa do Design em Matosinhos. Presentemente,
                      colabora com o Centro Tecnológico do Calçado e o Museu do
                      Calçado em S. João da Madeira, incluindo nas áreas de
                      formação e produção de calçado com base em materiais
                      naturais e técnicas de produção artesanais tradicionais.
                      Como designer de comunicação, colabora com Helena Caspurro
                      desde o seu primeiro álbum nas áreas da direção de Design,
                      coordenação artística, formação, cenografia, curadoria e
                      realização de vídeos de animação. Trabalhou ainda para um
                      conjunto alargado de organizações em Portugal e no Reino
                      Unido, sendo da sua autoria, por exemplo, o desenho da
                      marca Metro do Porto e a identidade visual de capas de
                      discos de vinil para editoras de música de dança
                      independentes (Phonica White e Resista Records).
                    </p>
                    <button onClick={togglePedroInfo}>
                      <img src="../assets/icons/exit.svg" alt="exit" />
                    </button>
                  </div>
                ) : (
                  <div
                    className={`authors-controllers ${
                      (showHelenaInfo && author.name !== "Helena Caspurro") ||
                      (showPedroInfo &&
                        author.name !== "Pedro Carvalho de Almeida")
                        ? "hidden"
                        : ""
                    }`}
                  >
                    <h3 className="author-name">{author.name}</h3>
                    <button
                      onClick={
                        author.name === "Helena Caspurro"
                          ? toggleHelenaInfo
                          : togglePedroInfo
                      }
                    >
                      <img
                        src="../assets/icons/more-info.svg"
                        alt="more info"
                      />
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </div>
  );
}
