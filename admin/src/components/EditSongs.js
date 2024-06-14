import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import axios from "../lib/AxiosConfig";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const songSchema = Joi.object({
  name: Joi.string().required().label("name"),
  album_id: Joi.number().integer().positive().required().label("albumId"),
  position: Joi.number().integer().positive().required().label("position"),
  lyrics: Joi.string().allow(null).label("lyrics"),
  audio: Joi.string().allow(null).label("audio"),
  video: Joi.string().allow(null).label("video"),
  image: Joi.any().allow(null).label("image"),
  date: Joi.date().allow(null).label("date"),
});

const EditSongs = ({ songId, songData }) => {
  const [name, setName] = useState(songData.name);
  console.log(name);
  const [album_id, setAlbum_id] = useState(songData.album_id);
  console.log(album_id);
  const [albumName, setAlbumName] = useState(songData.album_name);
  console.log(albumName);
  const [position, setPosition] = useState(songData.position);
  console.log(position);
  const [lyrics, setLyrics] = useState(songData.lyrics || null);
  console.log(lyrics);
  const [audio, setAudio] = useState(songData.audio || null);
  console.log(audio);
  const [video, setVideo] = useState(songData.video || null);
  console.log(video);
  const [image, setImage] = useState(songData.image || null);
  console.log(image);
  const [imageName, setImageName] = useState(
    songData.image
      ? songData.image.split("/").pop()
      : "Nenhum ficheiro selecionado."
  );
  const [date, setDate] = useState(songData.date || null);
  console.log(date);
  const [error, setError] = useState(null);
  const [validation, setValidation] = useState({});
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setName(songData.name);
    setAlbum_id(songData.album_id);
    setAlbumName(songData.album_id);
    setPosition(songData.position);
    setLyrics(songData.lyrics || null);
    setAudio(songData.audio || null);
    setVideo(songData.video || null);
    setImage(songData.image || null);
    setImageName(
      songData.image
        ? songData.image.split("/").pop()
        : "Nenhum ficheiro selecionado."
    );
    setDate(songData.date || null);
  }, [songData]);

  useEffect(() => {
    getAlbums();
  }, []);

  const getAlbums = async () => {
    try {
      const response = await axios.get("/albums");
      setAlbums(response.data);
    } catch (error) {
      setError(error.response);
      console.error(error);
    }
  };

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post("/upload", formData);
      return response.data.filename;
    } catch (error) {
      console.error(error);
    }
  };

  const CloseForm = () => {
    window.location.reload();
  };

  const HandleNameInput = (event) => {
    setName(event.target.value);
  };

  const HandleAlbumIdInput = (event) => {
    setAlbum_id(event.target.value);
  };

  const HandlePositionInput = (event) => {
    setPosition(event.target.value);
  };

  const HandleAudioInput = (event) => {
    setAudio(event.target.value);
  };

  const HandleVideoInput = (event) => {
    setVideo(event.target.value);
  };

  const HandleImageInput = (event) => {
    setImage(event.target.files[0]);
    setImageName(
      event.target.files[0]
        ? event.target.files[0].name
        : "Nenhum ficheiro selecionado."
    );
  };

  const HandleDateInput = (date) => {
    setDate(date);
  };

  const ValidateForm = () => {
    const body = {
      name,
      album_id,
      position,
      lyrics,
      audio,
      video,
      image,
      date,
    };

    const { error } = songSchema.validate(body, { abortEarly: false });
    if (error) {
      const errors = {};
      error.details.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setValidation(errors);
      return false;
    }
    setValidation({});
    return true;
  };

  const handleEditSong = async (event) => {
    event.preventDefault();
    if (!ValidateForm()) {
      return;
    }

    let imgUrl = image;

    if (image && typeof image === "object") {
      imgUrl = await upload(image);
    }

    const body = {
      name,
      album_id,
      position,
      lyrics,
      audio,
      video,
      image: imgUrl,
      date,
    };

    try {
      if (songId) {
        await axios.put(`/songs/${songId}`, body);
        console.log("Sucesso!!!");
        navigate("/");
      }
    } catch (error) {
      setError(error.response);
      console.log(error);
    }
  };

  const displayAlbumName = albums.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ));

  return (
    <div>
      <CButton onClick={CloseForm} style={{ padding: "0rem" }}>
        <CIcon icon={cilArrowLeft} size="lg"></CIcon>
      </CButton>
      <h2 className="mx-5">Editar música</h2>
      <form onSubmit={handleEditSong} className="row g-3 mx-5 formMargin mt-3">
        <div className="mx-5">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            className="form-control mt-2"
            id="name"
            name="name"
            value={name}
            onChange={HandleNameInput}
            required
          />
          {validation.name && <p>{validation.name}</p>}
        </div>
        <div className="mx-5">
          <label htmlFor="album">Álbum:</label>
          <select
            className="form-control mt-2"
            id="album"
            name="album"
            onChange={HandleAlbumIdInput}
            required
          >
            <option value={album_id}>{albumName}</option>
            {displayAlbumName}
          </select>
          {validation.album_id && <p>{validation.album_id}</p>}
        </div>
        <div className="mx-5">
          <label htmlFor="position">Posição:</label>
          <input
            type="number"
            className="form-control mt-2"
            id="position"
            name="position"
            value={position}
            placeholder="Escolha a posição da música no álbum"
            onChange={HandlePositionInput}
            required
          />
          {validation.position && <p>{validation.position}</p>}
        </div>
        <div className="editorContainer mx-5">
          <label htmlFor="lyrics">Letra:</label>
          <ReactQuill
            className="editor form-control mt-2 ql-container ql-snow"
            id="lyrics"
            name="lyrics"
            theme="snow"
            value={lyrics}
            onChange={setLyrics}
          />
          {validation.lyrics && <p>{validation.lyrics}</p>}
        </div>
        <div className="mx-5">
          <label htmlFor="audio">Audio:</label>
          <input
            type="text"
            className="form-control mt-2"
            id="audio"
            name="audio"
            value={audio}
            onChange={HandleAudioInput}
          />
          {validation.audio && <p>{validation.audio}</p>}
        </div>
        <div className="mx-5">
          <label htmlFor="video">Vídeo:</label>
          <input
            type="text"
            className="form-control mt-2"
            id="video"
            name="video"
            value={video.toString()}
            onChange={HandleVideoInput}
          />
          {validation.video && <p>{validation.video}</p>}
        </div>
        <div className="mx-5">
          <label htmlFor="image">Imagem:</label>
          <input
            type="file"
            className="form-control mt-2"
            id="image"
            name="image"
            onChange={HandleImageInput}
          />
          <span>Imagem atual: {imageName}</span>
          {validation.image && <p>{validation.image}</p>}
        </div>
        <div className="mx-5">
          <label htmlFor="date">Data:</label>
          <DatePicker
            id="date"
            name="date"
            selected={date}
            onChange={HandleDateInput}
            className="form-control mt-2 inputDisplay"
            dateFormat="yyyy-MM-dd"
          />
          {validation.date && <p>{validation.date}</p>}
        </div>
        <div className="d-flex justify-content-end mx-5 mt-4">
          <CButton
            type="submit"
            color="warning"
            style={{ color: "white", marginBottom: "1rem" }}
          >
            Editar
          </CButton>
        </div>
      </form>
      {error && (
        <p className=" text-danger mt-2" style={{ marginLeft: "6.5rem" }}>
          Não foi possível efetuar esta operação, volte a carregar a página e
          tente novamente!
        </p>
      )}
    </div>
  );
};

export default EditSongs;
