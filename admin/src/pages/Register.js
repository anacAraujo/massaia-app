import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
import axios from '../lib/AxiosConfig'
import Joi from 'joi';

const validTlds = ['com', 'pt', 'org', 'gov'];

const registerSchema = Joi.object({
  email: Joi.string().email({
    tlds: { allow: validTlds }
  }).required().label('email'),
  password: Joi.string().min(8).required().label('password'),
  confirmPassword: Joi.any().equal(Joi.ref('password')).required().label('confirmPassword').messages({ 'any.only': 'As passwords não são iguais.' }) 
});

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validation, setValidation] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const HandleEmailInput = (event) => {
    setEmail(event.target.value);
  }

  const HandlePasswordInput = (event) => {
    setPassword(event.target.value);
  }

  const HandleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  }

  const ValidateForm = () => {
    const body = {
      email,
      password,
      confirmPassword
    }

    const { error } = registerSchema.validate(body, { abortEarly: false });
    if (error) {
      const errors = {};
      error.details.forEach(err => {
        errors[err.path[0]] = err.message;
      })
      setValidation(errors);
      return false;
    }
    setValidation({});
    return true;
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!ValidateForm()) {
      return
    }

    const body = {
      email,
      password,
      confirmPassword
    }

    try {
      await axios.post("/auth/register", body);
      navigate("/login");
      alert('Sucesso! Faça login com as novas credenciais para entrar.');
    } catch (error) {
      setError(error.response);
      console.error(error);
      
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Registo</h1>
                  <p className="text-body-secondary">Cria a tua conta</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      name='email'
                      type="text"
                      placeholder="Email" 
                      onChange={HandleEmailInput}
                      required
                    />
                  </CInputGroup>
                  {validation.email && <p>Este email não é válido.</p>}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name='password'
                      type="password"
                      placeholder="Password"
                      onChange={HandlePasswordInput}
                      required
                    />
                  </CInputGroup>
                  {validation.password && <p>Tem que ter no mínimo 8 caracteres.</p>}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name='confirmPassword'
                      type="password"
                      placeholder="Confirma a password"
                      onChange={HandleConfirmPassword}
                      required
                    />
                  </CInputGroup>
                  {validation.confirmPassword && <p>{validation.confirmPassword}</p>}
                  <div className="d-grid">
                  {error && <p>Não foi possível efetuar o registo. Por favor volte a tentar!</p>}
                    <CButton onClick={handleRegister} color="primary">Criar conta</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register