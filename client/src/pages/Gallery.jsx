import { useParams } from "react-router-dom";

export default function Gallery() {
  const { volume } = useParams();
  console.log("volume: ", volume);

  return (
    <di>
      <div></div>
    </di>
  );
}
