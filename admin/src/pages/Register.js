import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
import axios from '../lib/AxiosConfig'

const Register = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleInputs = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/");
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
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      name='email'
                      type="text"
                      placeholder="Email" 
                      onChange={handleInputs}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name='password'
                      type="password"
                      placeholder="Password"
                      onChange={handleInputs}
                      required
                    />
                  </CInputGroup>
                  <div className="d-grid">
                  {error && <p>Não foi possível efetuar o registo. Por favor volte a tentar!</p>}
                    <CButton onClick={handleRegister} color="primary">Create Account</CButton>
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