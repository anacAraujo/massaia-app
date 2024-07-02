import { CButton } from "@coreui/react"
import CIcon from '@coreui/icons-react'
import { cilArrowLeft } from '@coreui/icons'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Joi from "joi";
import axios from '../lib/AxiosConfig'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const contentSchema = Joi.object({
    topic: Joi.string().required().label('topic'),
    text: Joi.string().required().label('text'),
})

const EditContents = ({ contentId, contentData }) => {
    const [topic, setTopic] = useState(contentData.topic);
    console.log(topic);
    const [text, setText] = useState(contentData.text);
    console.log(text);
    const [error, setError] = useState(null);
    const [validation, setValidation] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setTopic(contentData.topic);
        setText(contentData.text);
    }, [contentData])

    const CloseForm = () => {
        window.location.reload();
    };

    const HandleTopicInput = (event) => {
        setTopic(event.target.value);
    }

    const ValidateForm = () => {
        const body = {
            topic,
            text
        }

        const { error } = contentSchema.validate(body, { abortEarly: false });
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

    const handleEditContent = async (event) => {
        event.preventDefault();
        if (!ValidateForm()) {
            return
        } 

        const body = {
            topic,
            text
        }

        try {
            await axios.put(`/contents/${contentId}`, body);
            console.log("Sucesso!!!");
            alert('Operação completada com sucesso!');
            navigate("/");
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
             <h2 className="mx-5">Editar conteúdo</h2>
             <form
                 onSubmit={handleEditContent}
                 className="row g-3 mx-5 formMargin mt-3"
             >
                 <div className="mx-5">
                     <label htmlFor="topic">Tópico:</label>
                     <input
                         type="text"
                         className="form-control mt-2"
                         id="topic"
                         name="topic"
                         value={topic}
                         onChange={HandleTopicInput}
                         required
                     />
                     {validation.topic && <p>{validation.topic}</p>}
                 </div>
                 <div className="editorContainer mx-5">
                     <label htmlFor="text">Letra:</label>
                     <ReactQuill
                         className="editor form-control mt-2 ql-container ql-snow"
                         id="text"
                         name="text"
                         theme="snow"
                         value={text}
                         onChange={setText}
                         required
                     />
                     {validation.text && <p>{validation.text}</p>}
                 </div>
                 <div className="d-flex justify-content-end mx-5 mt-4">
                     <CButton type="submit" color="success" style={{ color: 'white', marginBottom: '1rem' }}>Adicionar</CButton>
                 </div>
                 {error && <p className=" text-danger mt-2" style={{marginLeft: '6.5rem'}}>Não foi possível efetuar esta operação, volte a carregar a página e tente novamente!</p>}
             </form>
        </div> 
     )
}

export default EditContents