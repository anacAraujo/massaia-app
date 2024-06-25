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

  //TODO check scroll
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
                      <h3>
                        Maria Helena Ribeiro <br />
                        da Silva Caspurro
                      </h3>
                    )}
                    <p className={infoTextExcedingSize ? "overflow" : ""}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sed quae possimus accusantium aspernatur maiores? Cum
                      neque, cumque magnam porro sint expedita eum aliquid,
                      saepe maiores numquam magni ipsum in dolor? Lorem ipsum
                      dolor sit amet consectetur adipisicing elit. Sed quae
                      possimus accusantium aspernatur quae possimus accusantium
                      aspernatur maiores? Cum neque, cumque magnam porro sint
                      expedita eum aliquid, saepe maiores numquam magni ipsum in
                      dolor? Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Sed quae possimus accusantium aspernatur maiores?
                      Cum neque, cumque magnam porro sint expedita eum aliquid,
                      saepe maiores numquam magni ipsum in dolor? Lorem ipsum
                      dolor sit amet consectetur adipisicing elit. Sed quae
                      possimus accusantium aspernatur quae possimus accusantium
                      aspernatur maiores? Cum neque, cumque magnam porro sint
                      expedita eum aliquid, saepe maiores numquam magni ipsum in
                      dolor? Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Sed quae possimus accusantium aspernatur maiores?
                      Cum neque, cumque magnam porro sint expedita eum aliquid,
                      saepe maiores numquam magni ipsum in dolor? Lorem ipsum
                      dolor sit amet consectetur adipisicing elit. Sed quae
                      possimus accusantium aspernatur quae possimus accusantium
                      aspernatur maiores? Cum neque, cumque magnam porro sint
                      expedita eum aliquid, saepe maiores numquam magni ipsum in
                      dolor?
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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sed quae possimus accusantium aspernatur maiores? Cum
                      neque, cumque magnam porro sint expedita eum aliquid,
                      saepe maiores numquam magni ipsum in dolor? Lorem ipsum
                      dolor sit amet consectetur adipisicing elit. Sed quae
                      possimus accusantium aspernatur maiores? Cum neque, cumque
                      magnam porro sint expedita eum aliquid, saepe maiores
                      numquam magni ipsum in dolor? Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Sed quae possimus
                      accusantium aspernatur quae possimus accusantium
                      aspernatur maiores? Cum neque, cumque magnam porro sint
                      expedita eum aliquid, saepe maiores numquam magni ipsum in
                      dolor? Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Sed quae possimus accusantium aspernatur maiores?
                      Cum neque, cumque magnam porro sint expedita eum aliquid,
                      saepe maiores numquam magni ipsum in dolor? Lorem ipsum
                      dolor sit amet consectetur adipisicing elit. Sed quae
                      possimus accusantium aspernatur quae possimus accusantium
                      aspernatur maiores? Cum neque, cumque magnam porro sint
                      expedita eum aliquid, saepe maiores numquam magni ipsum in
                      dolor? Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Sed quae possimus accusantium aspernatur maiores?
                      Cum neque, cumque magnam porro sint expedita eum aliquid,
                      saepe maiores numquam magni ipsum in dolor? Lorem ipsum
                      dolor sit amet consectetur adipisicing elit. Sed quae
                      possimus accusantium aspernatur quae possimus accusantium
                      aspernatur maiores? Cum neque, cumque magnam porro sint
                      expedita eum aliquid, saepe maiores numquam magni ipsum in
                      dolor?
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
