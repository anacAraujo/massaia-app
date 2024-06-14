import { useState, useEffect } from "react";
import axios from '../lib/AxiosConfig';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';
import EditAlbums from './EditAlbums';
import EditSongs from './EditSongs';
import EditMoments from './EditMoments';
import EditArtPieces from './EditArtPieces';
import EditUsers from './EditUsers';

const EditModal = ({ visible, CloseModal, type, idEdit, idTable, idButton, idCard, itemId }) => {
    const [info, setInfo] = useState(null);
    const [error, setError] = useState(null);

    const ChangeVisibility = (showEdit) => {
        if (type === 'moments' || type === 'songs' || type === 'art_pieces') {
            document.getElementById(idEdit).style.display = showEdit ? 'block' : 'none';
            document.getElementById(idTable).style.display = showEdit ? 'none' : 'block';
            document.getElementById(idButton).style.display = showEdit ? 'none' : 'block';
        } else if (type === 'users') {
            document.getElementById(idEdit).style.display = showEdit ? 'block' : 'none';
            document.getElementById(idCard).style.display = showEdit ? 'none' : 'block';
        } else if (type === 'albums') {
            document.getElementById(idEdit).style.display = showEdit ? 'block' : 'none';
            document.getElementById(idTable).style.display = showEdit ? 'none' : 'block';
        }
    }

    const handleDestination = () => {
        ChangeVisibility(true);
        CloseModal();
        console.log("info: ", info)
    }

    useEffect(() => {
        console.log("Fetching info for type:", type, "with itemId:", itemId);
        console.log("info: ", info);
        if (itemId) {
            getInfo(itemId);
        }
    }, [itemId]);

    const getInfo = async (itemId) => {
        try {
            const response = await axios.get(`/${type}/${itemId}`);
            setInfo(response.data);
        } catch (error) {
            setError(error.response);
            console.error(error);
        }
    }

    const EditComponent = () => {
        console.log("info in EditComponent: ", info)

        switch (type) {
            case 'albums':
                return info ? <EditAlbums albumId={itemId} albumData={info} /> : null;
            case 'songs':
                return info ? <EditSongs songId={itemId} songData={info} /> : null;
            case 'art_pieces':
                return info ? <EditArtPieces artPieceId={itemId} artPieceData={info} /> : null;
            case 'moments':
                return info ? <EditMoments momentId={itemId} momentData={info} /> : null;
            case 'users':
                return info ? <EditUsers userId={itemId} userData={info} /> : null;
            default:
                return null;
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
                    <CModalTitle id="EditModal">Editar dados a uma tabela</CModalTitle>
                </CModalHeader>
                <CModalBody>Pressione o botão de continuar, se pretende editar as informações desta linha da tabela!</CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={CloseModal}>Fechar</CButton>
                    <CButton onClick={handleDestination} color="warning" style={{ color: 'white' }}>Continuar</CButton>
                </CModalFooter>
            </CModal>
            <div id={idEdit} style={{ display: 'none' }}>
                {EditComponent()}
            </div>
        </div>
    )
}

export default EditModal