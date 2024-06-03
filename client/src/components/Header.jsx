import "../styles/menu.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <h1 className="menu-massaia">MASSAIÁ</h1>
      <Link to="/">
        {" "}
        <img
          className="menu-exit"
          src="../assets/icons/menu-black.svg"
          alt="menu"
        />
      </Link>
    </div>
  );
}
