import "../styles/musicControllers.css";

export default function MusicControllers() {
  return (
    <div className="musicControllers">
      <div>
        <button className="musicControllers-vol">vol. 1</button>
        <p className="musicControllers-song-name">nome da música</p>
        <img
          className="musicControllers-more-songs"
          src="../assets/icons/arrow-up.png"
          alt="view all songs"
        />
      </div>

      <div>
        <img src="" />
      </div>

      <div></div>
    </div>
  );
}
