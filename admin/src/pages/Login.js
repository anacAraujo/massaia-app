import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import Joi from "joi";

const validTlds = ["com", "pt", "org", "gov"];

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      tlds: { allow: validTlds },
    })
    .required()
    .label("email"),
  password: Joi.string().min(8).required().label("password"),
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const HandleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const HandlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const ValidateForm = () => {
    const body = {
      email,
      password,
    };

    const { error } = loginSchema.validate(body, { abortEarly: false });
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

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!ValidateForm()) {
      return;
    }

    const body = {
      email,
      password,
    };

    try {
      await login(body);
      navigate("/");
    } catch (error) {
      setError(error.response);
      console.error(error);
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Entra na tua conta!</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="email"
                        type="text"
                        placeholder="Email"
                        onChange={HandleEmailInput}
                        required
                      />
                    </CInputGroup>
                    {validation.email && <p>Este email não é válido.</p>}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={HandlePasswordInput}
                        required
                      />
                    </CInputGroup>
                    {validation.password && <p>A password não está correta.</p>}
                    <CRow>
                      <CCol xs={6}>
                        {error && (
                          <p>
                            O email ou a password não estão corretos. Por favor
                            volte a tentar!
                          </p>
                        )}
                        <CButton
                          onClick={handleLogin}
                          color="primary"
                          className="px-4"
                        >
                          Entrar
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
