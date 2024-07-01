import { CButton } from "@coreui/react"
import CIcon from '@coreui/icons-react'
import { cilArrowLeft } from '@coreui/icons'
import { useEffect, useState } from "react"
import Joi from "joi";
import axios from '../lib/AxiosConfig'
import { useNavigate } from "react-router-dom"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const albumSchema = Joi.object({
    name: Joi.string().required().label('name'),
    cover: Joi.any().allow(null).label('cover'),
    date: Joi.date().allow(null).label('date')
})

const EditAlbums = ({ albumId, albumData }) => {
    const [name, setName] = useState(albumData.name);
    console.log(name);
    const [cover, setCover] = useState(albumData.cover || null);
    console.log(cover);
    const [coverName, setCoverName] = useState(albumData.cover ? albumData.cover.split('/').pop() : 'Nenhum ficheiro selecionado.');
    const [date, setDate] = useState(albumData.date || null);
    console.log(date);
    const [error, setError] = useState(null);
    const [validation, setValidation] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setName(albumData.name);
        setCover(albumData.cover || null);
        setCoverName(albumData.cover ? albumData.cover.split('/').pop() : 'Nenhum ficheiro selecionado.');
        setDate(albumData.date || null)
    }, [albumData]);

    const upload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.post("/upload", formData);
            return response.data.filename;
        } catch (error) {
            console.error(error);
        }
    }

    const CloseForm = () => {
       window.location.reload();
    }

    const HandleNameInput = (event) => {
        setName(event.target.value);
    }

    const HandleCoverInput = (event) => {
        setCover(event.target.files[0]);
        setCoverName(event.target.files[0] ? event.target.files[0].name : 'Nenhum ficheiro selecionado.');
    }

    const HandleDateInput = (date) => {
        setDate(date);
    }

    const ValidateForm = () => {
        const body = {
            name,
            cover,
            date
        }

        const { error } = albumSchema.validate(body, { abortEarly: false });
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

    const handleEditAlbum = async (event) => {
        event.preventDefault();
        if (!ValidateForm()) {
            return
        }

        let imgUrl = cover;

        if (cover && typeof cover === 'object') {
            imgUrl = await upload(cover);
        }

        const body = {
            name,
            cover: imgUrl,
            date,
        }

        try {
            if (albumId) {
                await axios.put(`/albums/${albumId}`, body); 
                console.log('Sucesso!!!');
                alert('Operação completada com sucesso!');
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
            <h2 className="mx-5">Editar álbum</h2>
            <form
                onSubmit={handleEditAlbum}
                className="row g-3 mx-5 formMargin mt-3"
            >
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
                    {validation.name && <p className="text-danger">Este campo não parece estar certo!</p>}
                </div>
                <div className="mx-5">
                    <label htmlFor="cover">Capa:</label>
                    <input
                        type="file"
                        className="form-control mt-2"
                        id="cover"
                        name="cover"
                        onChange={HandleCoverInput}
                    />
                    <span>Capa atual: {coverName}</span>
                    {validation.cover && <p>{validation.cover}</p>}
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
                    <CButton type="submit" color="warning" style={{ color: 'white' }}>Editar</CButton>
                </div>
            </form>
            {error && <p className=" text-danger mt-2" style={{marginLeft: '6.5rem'}}>Não foi possível efetuar esta operação, volte a carregar a página e tente novamente!</p>}
        </div>
    )
}

export default EditAlbums