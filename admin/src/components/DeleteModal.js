import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'
import { useState } from 'react'
import axios from '../lib/AxiosConfig'
import { useNavigate } from 'react-router-dom';

const DeleteModal = ({ visible, CloseModal, itemId, type }) => {
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    console.log("type: ", type, "id into deleteModal: ", itemId);

    const deleteItem = async () => {
        let endpoint;
        switch (type) {
            case 'albums':
                endpoint = `/albums/${itemId}`;
                break;
            case 'moments':
                endpoint = `/moments/${itemId}`;
                break;
            case 'songs':
                endpoint = `/songs/${itemId}`;
                break;
            case 'art_pieces':
                endpoint = `/art_pieces/${itemId}`;
                break;
            case 'users':
                endpoint = `/users/${itemId}`;
                break
            default:
                return;
        }

        try {
            if (itemId) {
              await axios.delete(endpoint);  
              navigate('/');
            }
        } catch (error) {
            setError(error.response);
            console.error(error);
        }
    }

    return (
        <div>
            <CModal
                alignment="center"
                visible={visible}
                onClose={CloseModal}
                aria-labelledby="VerticallyCenteredExample"
            >
                <CModalHeader>
                    <CModalTitle id="AddModal">Apagar dados a uma tabela</CModalTitle>
                </CModalHeader>
                <CModalBody>Pressione o botão de continuar, se pretende apagar esta linha da tabela!</CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={CloseModal}>Fechar</CButton>
                    <CButton onClick={deleteItem} color="danger" style={{ color: 'white' }}>Continuar</CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}

export default DeleteModal