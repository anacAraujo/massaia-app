import { CButton } from "@coreui/react"
import CIcon from '@coreui/icons-react'
import { cilArrowLeft}  from '@coreui/icons'
import { useState } from "react"
import axios from '../lib/AxiosConfig'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddAlbums = () => {
    const [name, setName] = useState('');
    const [cover, setCover] = useState('');
    const [date, setDate] = useState(null);
    const [error, setError] = useState(null);
 
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

    const addAlbum = async (event) => {
        event.preventDefault();
        try {
           await axios.post("/albums/", {name, cover, date});
           window.location.reload();
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
            <h2 className="mx-5">Adicionar um álbum</h2>
            <form 
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
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
                <div className="d-flex justify-content-end mx-5 mt-4">
                    <CButton onClick={addAlbum} type="submit" color="success" style={{color: 'white'}}>Adicionar</CButton>
                </div>
            </form>
        </div>
    )
}

export default AddAlbums