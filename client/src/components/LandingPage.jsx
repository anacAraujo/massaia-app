import "../styles/landingPage.css";

export function LandingPage() {
  return (
    <>
      <div className="eyes">
        <img className="img-eyes" src="../assets/images/olhos.png" alt="eyes" />
      </div>
      <div className="content">
        <h1>MASSAIÁ</h1>
        <p>espaços da voz, do som e do olhar</p>
        <div className="content">
          <img src="../assets/images/massaiaintro1.png" alt="Massaiá" />
          <img src="../assets/images/massaiaintro2.png" alt="Massaiá" />

          <img src="../assets/images/massaiaintro3.png" alt="Massaiá" />

          <img src="../assets/images/massaiaintro4.png" alt="Massaiá" />
        </div>
      </div>
      <div className="construction-notice">
        <p>em construção</p>
      </div>
    </>
  );
}
