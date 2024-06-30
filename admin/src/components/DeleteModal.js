import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'
import { useState } from 'react'
import axios from '../lib/AxiosConfig'
import { useNavigate } from 'react-router-dom';

const DeleteModal = ({ visible, CloseModal, itemId, type, roleId, songId, authorId }) => {
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
            case 'artists':
                endpoint = `/artists/${itemId}`;
                break
            case 'roles':
                endpoint = `/roles/${itemId}`;
                break
            case 'credits':
                endpoint = `songs/${songId}/credits/${authorId}/${roleId}`;
                break
            default:
                return;
        }

        try {
            if (itemId || (songId && authorId && roleId)) {
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
                <CModalBody>
                    <p className='m-0'>Pressione o botão de continuar, se pretende apagar esta linha da tabela!</p>
                    <p>
                        <span className='text-danger'>Nota: </span>
                        <span>Confirmar sempre se o elemento que pretende eliminar não está a ser utilizado noutra tabela, pois se estiver não será possível de apagar enquanto estiver a ser utilizado nessa mesma tabela!</span>
                    </p>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={CloseModal}>Fechar</CButton>
                    <CButton onClick={deleteItem} color="danger" style={{ color: 'white' }}>Continuar</CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}

export default DeleteModal