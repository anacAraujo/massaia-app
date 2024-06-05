import "../styles/musicControllers.css";

export default function MusicControllers() {
  return (
    <div className="musicControllers">
      <div className="left-group">
        <button className="musicControllers-vol">vol. 1</button>
        <p className="musicControllers-song-name">nome da música</p>
        <img
          className="musicControllers-more-songs"
          src="../assets/icons/arrow-up.png"
          alt="view all songs"
        />
      </div>

      <div className="center-group">
        <button className="control-button">Prev</button>
        <button className="control-button">Play</button>
        <button className="control-button">Next</button>
      </div>

      <div className="right-group">
        <button className="mute-button">Mute</button>
        <input type="range" className="volume-slider" />
      </div>
    </div>
  );
}
