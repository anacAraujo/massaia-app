import { CButton } from "@coreui/react"
import CIcon from '@coreui/icons-react'
import { cilArrowLeft}  from '@coreui/icons'
import { useState, useEffect } from "react"
import axios from '../lib/AxiosConfig'
import { useNavigate } from "react-router-dom"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditAlbums = ({ albumId }) => {
    const [album, setAlbum] = useState([]);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [cover, setCover] = useState('');
    const [date, setDate] = useState(null);

    useEffect(() => {
        console.log("Edit album:", albumId);
        if (albumId) {
            getAlbum(albumId);
        }
    }, [albumId])

    const getAlbum = async (albumId) => {
        try {
            const response = await axios.get(`/albums/${albumId}`);
            setAlbum(response.data);
        } catch (error) {
            setError(error.response);
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
        setCover(event.target.value);
    }

    const HandleDateInput = (date) => {
        setDate(date);
    }

    const handleEditAlbum = () => {
        window.location.reload();
    }

    

    return (
        <div>
            <CButton onClick={CloseForm} style={{ padding: '0rem' }}>
                <CIcon icon={cilArrowLeft} size="lg"></CIcon>
            </CButton>
            <h2 className="mx-5">Editar álbum</h2>
            {/*<form 
                action="#"
                method="post"
                className="row g-3 mx-5 formMargin mt-3"

            >
                <div className="mx-5">
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        className="form-control mt-2"
                        id="name"
                        name="name"
                        onChange={HandleNameInput}
                        required
                    />
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
                </div>
                <div className="mx-5">
                    <label htmlFor="date">Data:</label>
                    <DatePicker
                        id="date"
                        name="date"
                        selected={date}
                        onChange={HandleDateInput}
                        className="form-control mt-2 inputDisplay"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="d-flex justify-content-end mx-5 mt-4">
                    <CButton onClick={handleEditAlbum} type="submit" color="warning" style={{color: 'white'}}>Editar</CButton>
                </div>
    </form>*/}
        </div>
    )
}

export default EditAlbums