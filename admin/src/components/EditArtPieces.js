import { CButton } from "@coreui/react"
import CIcon from '@coreui/icons-react'
import { cilArrowLeft } from '@coreui/icons'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Joi from "joi";
import axios from '../lib/AxiosConfig'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const artPieceSchema = Joi.object({
    image: Joi.any().required().label('image'),
    song_id: Joi.number().integer().positive().required().label('song_id'),
    author_id: Joi.number().integer().positive().required().label('author_id'),
    date: Joi.date().allow(null).label('date')
})

const EditArtPieces = ({ artPieceId, artPieceData }) => {
    const [image, setImage] = useState(artPieceData.image);
    console.log(image);
    const [imageName, setImageName] = useState(artPieceData.image.split('/').pop());
    const [song_id, setSong_id] = useState(artPieceData.song_id);
    console.log(song_id);
    const [songName, setSongName] = useState(artPieceData.song_name);
    console.log(songName);
    const [author_id, setAuthor_id] = useState(artPieceData.author_id);
    console.log(author_id);
    const [authorName, setAuthorName] = useState(artPieceData.author_name);
    console.log(authorName);
    const [date, setDate] = useState(artPieceData.date || null);
    console.log(date);
    const [validation, setValidation] = useState({});
    const [error, setError] = useState(null);
    const [songs, setSongs] = useState([]);
    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setImage(artPieceData.image);
        setImageName(artPieceData.image.split('/').pop());
        setSong_id(artPieceData.song_id);
        setSongName(artPieceData.song_name);
        setAuthor_id(artPieceData.author_id);
        setAuthorName(artPieceData.author_name);
        setDate(artPieceData.date || null);
    }, [artPieceData]);

    useEffect(() => {
        getSongs();
        getAuthors();
    }, []);

    const getSongs = async () => {
        try {
            const response = await axios.get(`/songs`);
            setSongs(response.data);
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

    const HandleImageInput = (event) => {
        setImage(event.target.files[0]);
        setImageName(event.target.files[0] ? event.target.files[0].name : 'Nenhum ficheiro selecionado.')
    }

    const HandleSongIdInput = (event) => {
        setSong_id(event.target.value);
    }

    const HandleAuthorIdInput = (event) => {
        setAuthor_id(event.target.value);
    }

    const HandleDateInput = (date) => {
        setDate(date);
    }

    const ValidateForm = () => {
        const body = {
            image,
            song_id,
            author_id,
            date
        }

        const { error } = artPieceSchema.validate(body, { abortEarly: false });
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

    const handleEditArtPiece = async (event) => {
        event.preventDefault();
        if (!ValidateForm()) {
            return
        }

        let imgUrl = image;

        if (image && typeof image === 'object') {
            imgUrl = await upload(image);
        }

        const body = {
            image: imgUrl,
            song_id,
            author_id,
            date
        }

        try {
            if (artPieceId) {
                await axios.put(`/art_pieces/${artPieceId}`, body);
                console.log('Sucesso!!!');
                alert('Operação completada com sucesso!');
                navigate('/');
            }
        } catch (error) {
            setError(error.response);
            console.error(error);
        } 
    }

    const displaySongName = songs.map(item => (
        <option key={item.id} value={item.id}>{item.name}</option>
    ))

    const displayAuthorName = authors.map(item => (
        <option key={item.id} value={item.id}>{item.name}</option>
    ))

    return (
        <div>
            <CButton onClick={CloseForm} style={{ padding: '0rem' }}>
                <CIcon icon={cilArrowLeft} size="lg"></CIcon>
            </CButton>
            <h2 className="mx-5">Editar obra</h2>
            <form
                onSubmit={handleEditArtPiece}
                className="row g-3 mx-5 formMargin mt-3"
            >
                <div className="mx-5">
                    <label htmlFor="image">Imagem:</label>
                    <input 
                        type="file"
                        className="form-control mt-2"
                        id="image"
                        name="image"
                        onChange={HandleImageInput}
                        required
                    />
                    <span>Imagem atual: {imageName}</span>
                    {validation.image && <p>{validation.image}</p>}
                </div>
                <div className="mx-5">
                    <label htmlFor="song">Música:</label>
                    <select
                        className="form-control mt-2"
                        id="album"
                        name="album"
                        onChange={HandleSongIdInput}
                        required
                    >
                        <option value={song_id}>{songName}</option>
                        {displaySongName}
                    </select>
                    {validation.song_id && <p>{validation.song_id}</p>}
                </div>
                <div className="mx-5">
                    <label htmlFor="album">Artista:</label>
                    <select 
                        className="form-control mt-2"
                        id="album"
                        name="album"
                        onChange={HandleAuthorIdInput}
                        required
                    >
                        <option value={author_id}>{authorName}</option>
                        {displayAuthorName}
                    </select>
                    {validation.author_id && <p>{validation.author_id}</p>}
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
                    <CButton type="submit" color="warning" style={{ color: 'white', marginBottom: '1rem' }}>Editar</CButton>
                </div>
            </form>
            {error && <p className=" text-danger mt-2" style={{marginLeft: '6.5rem'}}>Não foi possível efetuar esta operação, volte a carregar a página e tente novamente!</p>}
        </div>
    )
}

export default EditArtPieces