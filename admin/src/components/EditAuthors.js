import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import axios from "../lib/AxiosConfig";

const authorSchema = Joi.object({
  name: Joi.string().required().label("name"),
  image: Joi.any().allow(null).label('image'),
  title: Joi.string().required().label('title')
});

const EditSongs = ({ authorId, authorData }) => {
  const [name, setName] = useState(authorData.name);
  console.log(name);
  const [image, setImage] = useState(authorData.image || null);
  console.log(image);
  const [imageName, setImageName] = useState(
    authorData.image
      ? authorData.image.split("/").pop()
      : "Nenhum ficheiro selecionado."
  );
  const [title, setTitle] = useState(authorData.title);
  console.log(title);
  const [error, setError] = useState(null);
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setName(authorData.name);
    setImage(authorData.image || null);
    setImageName(
      authorData.image
        ? authorData.image.split("/").pop()
        : "Nenhum ficheiro selecionado."
    );
    setTitle(authorData.title);
  }, [authorData]);

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

  const HandleImageInput = (event) => {
    setImage(event.target.files[0]);
    setImageName(
      event.target.files[0]
        ? event.target.files[0].name
        : "Nenhum ficheiro selecionado."
    );
  };

  const HandleTitleInput = (event) => {
    setTitle(event.target.value);
  };

  const ValidateForm = () => {
    const body = {
      name,
      image,
      title
    };

    const { error } = authorSchema.validate(body, { abortEarly: false });
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
      image: imgUrl,
      title,
    };

    try {
      if (authorId) {
        await axios.put(`/artists/${authorId}`, body);
        console.log("Sucesso!!!");
        alert('Operação completada com sucesso!');
        navigate("/");
      }
    } catch (error) {
      setError(error.response);
      console.log(error);
    }
  };

  return (
    <div>
      <CButton onClick={CloseForm} style={{ padding: "0rem" }}>
        <CIcon icon={cilArrowLeft} size="lg"></CIcon>
      </CButton>
      <h2 className="mx-5">Editar artista</h2>
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
          <label htmlFor="title">Contribuição:</label>
          <input
            type="text"
            className="form-control mt-2"
            id="title"
            name="title"
            value={title}
            onChange={HandleTitleInput}
            required
          />
          {validation.title && <p>{validation.title}</p>}
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