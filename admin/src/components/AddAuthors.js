import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import axios from "../lib/AxiosConfig";

const authorSchema = Joi.object({
  name: Joi.string().required().label("name"),
});

const AddAuthors = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();

  const CloseForm = () => {
    window.location.reload();
  };

  const HandleNameInput = (event) => {
    setName(event.target.value);
  };

  const ValidateForm = () => {
    const body = {
      name,
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

  const handleAddAuthor = async (event) => {
    event.preventDefault();
    if (!ValidateForm()) {
      return;
    }

    const body = {
      name,
    };

    try {
      await axios.post(`/artists/`, body);
      console.log("Sucesso!!!");
      navigate("/");
    } catch (error) {
      setError(error.response);
      console.error(error);
    }
  };

  return (
    <div>
      <CButton onClick={CloseForm} style={{ padding: "0rem" }}>
        <CIcon icon={cilArrowLeft} size="lg"></CIcon>
      </CButton>
      <h2 className="mx-5">Adicionar artista</h2>
      <form
        onSubmit={handleAddAuthor}
        className="row g-3 mx-5 formMargin mt-3"
      >
        <div className="mx-5">
          <label htmlFor="image">Nome:</label>
          <input
            type="text"
            className="form-control mt-2"
            id="image"
            name="image"
            onChange={HandleNameInput}
            required
          />
          {validation.name && <p>{validation.name}</p>}
        </div>
        <div className="d-flex justify-content-end mx-5 mt-4">
          <CButton
            type="submit"
            color="success"
            style={{ color: "white", marginBottom: "1rem" }}
          >
            Adicionar
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

export default AddAuthors;
