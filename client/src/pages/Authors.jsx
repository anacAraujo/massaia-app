import { useState } from "react";
import Header from "../components/Header";
import "../styles/authors.css";

export default function Authors() {
  const [showHelenaInfo, setShowHelenaInfo] = useState(false);
  const [showPedroInfo, setShowPedroInfo] = useState(false);

  const toggleHelenaInfo = () => {
    setShowHelenaInfo(!showHelenaInfo);
    setShowPedroInfo(false);
  };

  const togglePedroInfo = () => {
    setShowPedroInfo(!showPedroInfo);
    setShowHelenaInfo(false);
  };

  return (
    <div>
      <Header></Header>
      <div className="container">
        <div className="column">
          <div style={{ position: "relative" }}>
            <img
              src="../../upload/helena_caspurro.jpg"
              className="author-image"
            />
            <div className={`author-info ${showHelenaInfo ? "active" : ""}`}>
              <h3 className="author-name">Helena Caspurro</h3>
              <button onClick={toggleHelenaInfo}>+</button>
            </div>
          </div>
          {showHelenaInfo && (
            <div>
              <h3>Helena Caspurro</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                quae possimus accusantium aspernatur maiores? Cum neque, cumque
                magnam porro sint expedita eum aliquid, saepe maiores numquam
                magni ipsum in dolor?
              </p>
            </div>
          )}
        </div>
        <div className="column">
          <div style={{ position: "relative" }}>
            <img
              src="../../upload/pedro_almeida.jpg"
              className="author-image"
            />
            <div className={`author-info ${showPedroInfo ? "active" : ""}`}>
              <h3 className="author-name">Pedro Carvalho de Almeida</h3>
              <button onClick={togglePedroInfo}>+</button>
            </div>
          </div>
          {showPedroInfo && (
            <div>
              <h3>Pedro Carvalho de Almeida</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                quae possimus accusantium aspernatur maiores? Cum neque, cumque
                magnam porro sint expedita eum aliquid, saepe maiores numquam
                magni ipsum in dolor?
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
