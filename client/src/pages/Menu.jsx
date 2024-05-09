import "../styles/menu.css";

export function Menu() {
  return (
    <div className="menu">
      <div className="menu-header">
        <h1 className="menu-massaia">MASSAIÁ</h1>
        <img className="menu-exit" src="../assets/icons/exit.svg" alt="exit" />
      </div>

      <div>
        <div className="menu-options">
          <div className="menu-option">
            <p>vídeos</p>
          </div>
          <div className="menu-option">
            <p>galeria</p>
          </div>
          <div className="menu-option">
            <p>sobre</p>
          </div>
          <div className="menu-option">
            <p>momentos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
