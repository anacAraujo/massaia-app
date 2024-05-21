import React from 'react'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser} from '@coreui/icons'

const Login = () => {
  const { login } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleInputs = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(inputs);
      navigate('/');
    } catch (error) {
      setError(error.response);
      console.error(error);
    }
  }

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
                        name='email' 
                        type='text'
                        placeholder="Email" 
                        onChange={handleInputs} 
                        required
                      /> 
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder='Password'
                        onChange={handleInputs}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                      {error && <p>O email ou a password não estão corretos. Por favor volte a tentar!</p>}
                        <CButton onClick={handleLogin} color="primary" className="px-4">
                          Entrar
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Se ainda não tem uma conta, faça aqui o seu registo!
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Registar!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login