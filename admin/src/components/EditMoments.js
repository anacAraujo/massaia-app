import { CButton } from "@coreui/react"
import CIcon from '@coreui/icons-react'
import { cilArrowLeft } from '@coreui/icons'
import { useEffect, useState } from "react"
import Joi from "joi";
import axios from '../lib/AxiosConfig'
import { useNavigate } from "react-router-dom"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const momentSchema = Joi.object({
    name: Joi.string().required().label('name'),
    image: Joi.any().allow(null).label('image'),
    video: Joi.any().allow(null).label('video'),
    date: Joi.date().allow(null).label('date')
})

const EditMoments = ({ momentId, momentData }) => {
    const [name, setName] = useState(momentData.name);
    console.log(name);
    const [image, setImage] = useState(momentData.image || null);
    console.log(image);
    const [imageName, setImageName] =useState(momentData.image ? momentData.image.split('/').pop() : 'Nenhum ficheiro selecionado.');
    const [video, setVideo] = useState(momentData.video || null);
    console.log(video);
    const [videoName, setVideoName] = useState(momentData.video ? momentData.video.split('/').pop() : 'Nenhum ficheiro selecionado.');
    const [date, setDate] = useState(momentData.date || null);
    console.log(date);
    const [error, setError] = useState(null);
    const [validation, setValidation] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setName(momentData.name);
        setImage(momentData.image || null);
        setImageName(momentData.image ? momentData.image.split('/').pop() : 'Nenhum ficheiro selecionado.');
        setVideo(momentData.video || null);
        setVideoName(momentData.video ? momentData.video.split('/').pop() : 'Nenhum ficheiro selecionado.');
        setDate(momentData.date || null);
    }, [momentData]);

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

    const HandleImageInput = (event) => {
        setImage(event.target.files[0]);
        setImageName(event.target.files[0] ? event.target.files[0].name : 'Nenhum ficheiro selecionado.')
    }

    const HandleVideoInput = (event) => {
        setVideo(event.target.files[0]);
        setVideoName(event.target.files[0] ? event.target.files[0].name : 'Nenhum ficheiro selecionado.')
    }

    const HandleDateInput = (date) => {
        setDate(date);
    }

    const ValidateForm = () => {
        const body = {
            name,
            image,
            video,
            date
        }

        const { error } = momentSchema.validate(body, { abortEarly: false });
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

    const handleEditMoment = async (event) => {
        event.preventDefault();
        if (!ValidateForm()) {
            return
        }

        let imgUrl = image;
        let videoUrl = video;

        if (image && typeof image === 'object') {
            imgUrl = await upload(image);
        }

        if (video && typeof video === 'object') {
            videoUrl = await upload(video);
        }

        const body = {
            name,
            cover: imgUrl,
            video: videoUrl,
            date,
        }

        try {
            if (momentId) {
                await axios.put(`/moments/${momentId}`, body);
                console.log('Sucesso!!!');
                navigate('/');
            }
        } catch (error) {
            setError(error.response);
            console.log(error);
        }
    }

    return (
        <div>
            <CButton onClick={CloseForm} style={{ padding: '0rem' }}>
                <CIcon icon={cilArrowLeft} size="lg"></CIcon>
            </CButton>
            <h2 className="mx-5">Editar momento</h2>
            <form
                onSubmit={handleEditMoment}
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
                    <label htmlFor="video">Vídeo:</label>
                    <input 
                        type="file"
                        className="form-control mt-2"
                        id="video"
                        name="video"
                        onChange={HandleVideoInput}
                    />
                    <span>Vídeo atual: {videoName}</span>
                    {validation.video && <p>{validation.video}</p>}
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

export default EditMoments