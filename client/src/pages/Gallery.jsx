import { useParams } from "react-router-dom";

import Header from "../components/Header";
import MusicControllers from "../components/MusicControllers";

export default function Gallery() {
  const { volume } = useParams();
  console.log("volume: ", volume);

  return (
    <di>
      <Header></Header>
      <div></div>
      <MusicControllers></MusicControllers>
    </di>
  );
}
