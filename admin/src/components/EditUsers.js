import { CButton } from "@coreui/react"
import CIcon from '@coreui/icons-react'
import { cilArrowLeft } from '@coreui/icons'
import { useEffect, useState } from "react"
import Joi from "joi";
import axios from '../lib/AxiosConfig'
import { useNavigate } from "react-router-dom"

const validTlds = ['com', 'pt', 'org', 'gov'];

const userSchema = Joi.object({
    email: Joi.string().email({
        tlds: { allow: validTlds }
    }).required().label('email'),
    password: Joi.string().min(8).required().label('password'),
    newPassword: Joi.string().min(8).required().label('newPassword'),
    confirmNewPassword: Joi.any().equal(Joi.ref('newPassword')).required().label('confirmNewPassword').messages({ 'any.only': 'As passwords não são iguais.' })
})

const EditUsers = ({ userId, userData }) => {
    const [email, setEmail] = useState(userData.email);
    console.log(email);
    const [password, setPassword] = useState('');
    console.log(password);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [validation, setValidation] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setEmail(userData.email);
        setPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    }, [userData]);

    const CloseForm = () => {
        window.location.reload();
    }

    const HandleEmailInput = (event) => {
        setEmail(event.target.value);
    }

    const HandlePasswordInput = (event) => {
        setPassword(event.target.value);
    }

    const HandleNewPassword = (event) => {
        setNewPassword(event.target.value);
    }

    const HandleConfirmNewPassword = (event) => {
        setConfirmNewPassword(event.target.value);
    }

    const ValidateForm = () => {
        const body = {
            email,
            password,
            newPassword,
            confirmNewPassword
        }

        const { error } = userSchema.validate(body, { abortEarly: false });
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

    const handleEditUser = async (event) => {
        event.preventDefault();
        if (!ValidateForm()) {
            return
        }

        const body = {
            email,
            password,
            newPassword,
            confirmNewPassword
        }

        try {
            if (userId) {
                await axios.put(`/users/${userId}`, body);
                console.log('Sucesso!!!');
                navigate('/');
            }
        } catch (error) {
            setError(error.response);
            console.error(error); 
        }
    }

    return (
        <div>
            <CButton onClick={CloseForm} style={{ padding: '0rem' }}>
                <CIcon icon={cilArrowLeft} size="lg"></CIcon>
            </CButton>
            <h2 className="mx-5">Editar utilizador</h2>
            <form
                onSubmit={handleEditUser}
                className="row g-3 mx-5 formMargin mt-3"
            >
                <div className="mx-5">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        className="form-control mt-2"
                        id="email"
                        name="email"
                        value={email}
                        onChange={HandleEmailInput}
                        required
                    />
                    {validation.email && <p>Este email não é válido.</p>}
                </div>
                <div className="mx-5">
                    <label htmlFor="password">Password atual:</label>
                    <input
                        type="password"
                        className="form-control mt-2"
                        id="password"
                        name="password"
                        value={password}
                        onChange={HandlePasswordInput}
                        required
                    />
                    {validation.password && <p>Tem que ter no mínimo 8 caracteres.</p>}
                </div>
                <div className="mx-5">
                    <label htmlFor="newPassword">Nova Password:</label>
                    <input
                        type="password"
                        className="form-control mt-2"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={HandleNewPassword}
                        required
                    />
                    {validation.newPassword && <p>Tem que ter no mínimo 8 caracteres.</p>}
                </div>
                <div className="mx-5">
                    <label htmlFor="confirmNewPassword">Confirma Nova Password:</label>
                    <input
                        type="password"
                        className="form-control mt-2"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        onChange={HandleConfirmNewPassword}
                        required
                    />
                    {validation.confirmNewPassword && <p>Tem que ter no mínimo 8 caracteres.</p>}
                </div>
                <div className="d-flex justify-content-end mx-5 mt-4">
                    <CButton type="submit" color="warning" style={{ color: 'white' }}>Editar</CButton>
                </div>
            </form>
            {error && <p className=" text-danger mt-2" style={{marginLeft: '6.5rem'}}>Não foi possível efetuar esta operação, volte a carregar a página e tente novamente!</p>}
        </div>
    )
}

export default EditUsers