import { useState, useEffect } from "react";
import Header from "../components/Header";
import "../styles/project.css";

export default function Project() {
  const [selectedKey, setSelectedKey] = useState("Objetivos");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const projectInfo = {
    Objetivos:
      "Aut sint fugiat rem minima voluptas aut galisum temporibus ex dolorem assumenda ut consequatur aperiam. Qui sunt neque quo sint cumque non voluptatem consequatur rem quia totam non eius ipsam ad dolorem itaque non neque deserunt. Sit repudiandae amet et perferendis quibusdam est repudiandae quidem non dolores accusantium vel corrupti adipisci qui fuga nostrum. Et erro asperiores ut dicta veritatis et quaerat quis aut quos esse a itaque inventore.",
    "Massaiá Volume I":
      "Lorem ipsum dolor sit amet. Aut sint fugiat rem minima voluptas aut galisum temporibus ex dolorem assumenda ut consequatur aperiam. Qui sunt neque quo sint cumque non voluptatem consequatur rem quia totam non eius ipsam ad dolorem itaque non neque deserunt. Sit repudiandae amet et perferendis quibusdam est repudiandae quidem non dolores accusantium vel corrupti adipisci qui fuga nostrum.",
    "Massaiá Volume II":
      "Lorem ipsum dolor sit amet. Aut sint fugiat rem minima voluptas aut galisum temporibus ex dolorem assumenda ut consequatur aperiam. Qui sunt neque quo sint cumque non voluptatem consequatur rem quia totam non eius ipsam ad dolorem itaque non neque deserunt. Et erro asperiores ut dicta veritatis et quaerat quis aut quos esse a itaque inventore.",
    "O Livro":
      "Lorem ipsum dolor sit amet. Aut sint fugiat rem minima voluptas aut galisum temporibus ex dolorem assumenda ut consequatur aperiam. Sit repudiandae amet et perferendis quibusdam est repudiandae quidem non dolores accusantium vel corrupti adipisci qui fuga nostrum. Et erro asperiores ut dicta veritatis et quaerat quis aut quos esse a itaque inventore.",
    Filosofia:
      "Qui sunt neque quo sint cumque non voluptatem consequatur rem quia totam non eius ipsam ad dolorem itaque non neque deserunt. Sit repudiandae amet et perferendis quibusdam est repudiandae quidem non dolores accusantium vel corrupti adipisci qui fuga nostrum. Et erro asperiores ut dicta veritatis et quaerat quis aut quos esse a itaque inventore.",
  };

  const keys = Object.keys(projectInfo);

  const handlePrev = () => {
    const currentIndex = keys.indexOf(selectedKey);
    const prevIndex = (currentIndex - 1 + keys.length) % keys.length;
    setSelectedKey(keys[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = keys.indexOf(selectedKey);
    const nextIndex = (currentIndex + 1) % keys.length;
    setSelectedKey(keys[nextIndex]);
  };

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header />
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
        {screenWidth >= 880 ? (
          <div className="project-scroll-bar">
            {keys.map((key) => (
              <div
                key={key}
                className={`project-key ${
                  key === selectedKey ? "selected" : ""
                }`}
                onClick={() => setSelectedKey(key)}
              >
                <p>{key}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="project-scroll-bar">
            <img
              src="../assets/icons/project-next-topic.svg"
              onClick={handlePrev}
              alt="Previous"
              className="nav-arrow nav-arrow-prev"
            />
            <div className="project-key selected">
              <p>{selectedKey}</p>
            </div>
            <img
              src="../assets/icons/project-next-topic.svg"
              onClick={handleNext}
              alt="Next"
              className="nav-arrow"
            />
          </div>
        )}
        <div className="project-info">
          <p>{projectInfo[selectedKey]}</p>
        </div>
      </div>
    </>
  );
}
