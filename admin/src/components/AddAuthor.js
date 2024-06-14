//TODO add option to add new role

import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import axios from "../lib/AxiosConfig";

const authorSchema = Joi.object({
  name: Joi.string().required().label("name"),
});

const AddAuthor = ({ visible, CloseModal }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();

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
    <CModal
      id="AddAuthor"
      alignment="center"
      visible={visible}
      onClose={CloseModal}
      aria-labelledby="VerticallyCenteredExample"
    >
      <CModalHeader>
        <CModalTitle>Adicionar autor</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <form className="row g-3 mx-5 formMargin" onSubmit={handleAddAuthor}>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            className="form-control mt-2"
            id="name"
            name="name"
            onChange={HandleNameInput}
            required
          />
          {validation.name && <p>{validation.name}</p>}
          <div className="d-flex mt-4">
            <CButton
              type="submit"
              color="success"
              style={{ color: "white", marginLeft: "20rem" }}
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
      </CModalBody>
    </CModal>
  );
};

export default AddAuthor;
