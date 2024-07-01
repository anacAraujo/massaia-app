import { CButton } from "@coreui/react"
import CIcon from '@coreui/icons-react'
import { cilArrowLeft } from '@coreui/icons'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Joi from "joi";
import axios from '../lib/AxiosConfig'

const creditsSchema = Joi.object({
    roles_id: Joi.number().integer().positive().required().label('roles_id'),
    songs_id: Joi.number().integer().positive().required().label('songs_id'),
    authors_id: Joi.number().integer().positive().required().label('authors_id')
})
const AddCredits = ({ songId }) => {
    console.log(songId);
    const [roles_id, setRoles_id] = useState(undefined);
    const [songs_id, setSongs_id] = useState(songId);
    const [authors_id, setAuthors_id] = useState(undefined);
    const [error, setError] = useState(null);
    const [validation, setValidation] = useState({});
    const [roles, setRoles] = useState([]);
    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getRoles();
        getAuthors();
    }, []);

    const getRoles = async () => {
        try {
            const response = await axios.get(`/roles`);
            setRoles(response.data);
        } catch (error) {
            setError(error.response);
            console.error(error);
        }
    }

    const getAuthors = async () => {
        try {
            const response = await axios.get(`/artists`);
            setAuthors(response.data);
        } catch (error) {
            setError(error.response);
            console.error(error);
        }
    }

     const CloseForm = () => {
        window.location.reload();
    }

    const HandleRolesIdInput = (event) => {
        setRoles_id(event.target.value);
    }

    const HandleAuthorsIdInput = (event) => {
        setAuthors_id(event.target.value);
    }

    const ValidateForm = () => {
        const body = {
            roles_id,
            songs_id,
            authors_id,
        }

        const { error } = creditsSchema.validate(body, { abortEarly: false });
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

    const handleAddCredits = async (event) => {
        event.preventDefault();
        if (ValidateForm()) {
            return
        }

        let songs_id = songId;

        const body = {
            roles_id,
            songs_id,
            authors_id,
        }

        try {
            await axios.post(`/songs/${songId}/credits/`, body);
            console.log('Sucesso!!!');
            alert('Operação completada com sucesso!');
            navigate('/');
        } catch (error) {
            setError(error.response);
            console.error(error);
        }
    }

    const displayRoleName = roles.map((item) => (
        <option key={item.id} value={item.id}>
            {item.name}
        </option>
    ));

    const displayAuthorName = authors.map((item) => (
        <option key={item.id} value={item.id}>
            {item.name}
        </option>
    ));
    
    return (
        <div>
            <CButton onClick={CloseForm} style={{ padding: '0rem' }}>
                <CIcon icon={cilArrowLeft} size="lg"></CIcon>
            </CButton>
            <h2 className="mx-5">Adicionar créditos</h2>
            <form
                onSubmit={handleAddCredits}
                className="row g-3 mx-5 formMargin mt-3"
            >
                <div className="mx-5">
                    <label htmlFor="roles">Cargo:</label>
                    <select 
                        className="form-control mt-2"
                        id="roles"
                        name="roles"
                        onChange={HandleRolesIdInput}
                        required
                    >
                        <option value=''>Escolha um cargo</option>
                        {displayRoleName}
                    </select>
                    {validation.roles_id && <p>{validation.roles_id}</p>}
                </div>
                <div className="mx-5">
                    <label htmlFor="author">Autor:</label>
                    <select 
                        className="form-control mt-2"
                        id="authors"
                        name="authors"
                        onChange={HandleAuthorsIdInput}
                        required
                    >
                        <option value=''>Escolha um autor</option>
                        {displayAuthorName}
                    </select>
                    {validation.authors_id && <p>{validation.authors_id}</p>}
                </div>
                <div className="d-flex justify-content-end mx-5 mt-4">
                    <CButton type="submit" color="success" style={{ color: 'white', marginBottom: '1rem' }}>Adicionar</CButton>
                </div>
            </form>
            {error && <p className=" text-danger mt-2" style={{marginLeft: '6.5rem'}}>Não foi possível efetuar esta operação, volte a carregar a página e tente novamente!</p>}
        </div>
    )
}

export default AddCredits