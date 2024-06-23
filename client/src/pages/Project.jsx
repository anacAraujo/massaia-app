import Header from "../components/Header";
import "../styles/project.css";

export default function Project() {
  return (
    <>
      <Header></Header>
      <div className="project-container">
        <div>
          <video
            className="project-video"
            src="../upload/massaia.mp4"
            autoPlay
            loop
            muted
          />
        </div>
        <div className="project-scroll-bar">
          <p>Objetivos</p>
          <p>Massaiá -Volume I</p>
          <p>Massaiá -Volume II</p>
          <p>O Livro</p>
          <p>Filosofia</p>
        </div>
        <div className="project-info">
          <p>
            Lorem ipsum dolor sit amet. Aut sint fugiat rem minima voluptas aut
            galisum temporibus ex dolorem assumenda ut consequatur aperiam. Qui
            sunt neque quo sint cumque non voluptatem consequatur rem quia totam
            non eius ipsam ad dolorem itaque non neque deserunt. Sit repudiandae
            amet et perferendis quibusdam est repudiandae quidem non dolores
            accusantium vel corrupti adipisci qui fuga nostrum. Et error
            asperiores ut dicta veritatis et quaerat quis aut quos esse a itaque
            inventore.
          </p>
        </div>
      </div>
    </>
  );
}
