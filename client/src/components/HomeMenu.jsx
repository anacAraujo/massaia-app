import "../styles/homeMenu.css";

export function HomeMenu() {
  return (
    <div>
      <div className="massaia">
        <p>MASSAIÁ</p>
      </div>
      <div className="album-cover">
        <img src="../assets/images/olhos.png" alt="album cover" />
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
