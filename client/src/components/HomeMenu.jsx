import "../styles/homeMenu.css";
import { Link } from "react-router-dom";

export function HomeMenu() {
  return (
    <div>
      <div className="massaia">
        <p>MASSAIÁ</p>
      </div>
      <Link className="menu" to="/menu">
        <img src="../assets/icons/menu.svg" />
      </Link>
      <div className="album-cover">
        <img src="../upload/coverAlbum1.png" alt="album cover" />
      </div>
      <div className="credits">
        <p>créditos</p>
      </div>
      <div className="song-info">
        <p>1:30 nome</p>
      </div>
    </div>
  );
}
