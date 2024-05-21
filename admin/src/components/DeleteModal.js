import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'
import { useState } from 'react'
import axios from '../lib/AxiosConfig'

const DeleteModal = ({ visible, CloseModal, itemId, type }) => {
    const [error, setError] = useState(null);

    const deleteItem = async () => {
        let endpoint;
        switch (type) {
            case 'album':
                endpoint = `/albums/${itemId}`;
                break;
            case 'moment':
                endpoint = `/moments/${itemId}`;
                break;
            case 'song':
                endpoint = `/songs/${itemId}`;
                break;
            case 'art-piece':
                endpoint = `/art_pieces/${itemId}`;
                break;
            case 'user':
                endpoint = `/users/${itemId}`;
            default:
                return;
        }

        try {
            await axios.delete(endpoint);
            CloseModal();
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