import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'
import EditAlbums from './EditAlbums'
import EditSongs from './EditSongs'
import EditMoments from './EditMoments'
import EditArtPieces from './EditArtPieces'
import EditUsers from './EditUsers'

const EditModal = ({ visible, CloseModal, type, idEdit, idTable, idButton, idCard, itemId }) => {

    const ChangeVisibility = (showEdit) => {
        
        if (type === 'album' || type === 'moment' || type === 'song' || type === 'art-piece') {
            document.getElementById(idEdit).style.display = showEdit ? 'block' : 'none';
            document.getElementById(idTable).style.display = showEdit ? 'none' : 'block';
            document.getElementById(idButton).style.display = showEdit ? 'none' : 'block'; 

        } else if (type === 'user') {
            document.getElementById(idEdit).style.display = showEdit ? 'block' : 'none';
            document.getElementById(idCard).style.display = showEdit ? 'none' : 'block';
        }  
    }

    const handleDestination = () => {
        ChangeVisibility(true);
        CloseModal();
    }

    const EditComponent = () => {
        switch (type) {
            case 'album':
                return <EditAlbums albumId={itemId} />;
            case 'song':
                return <EditSongs songId={itemId} />;
            case 'art-piece':
                return <EditArtPieces artPieceId={itemId} />;
            case 'moment':
                return <EditMoments momentId={itemId} />;
            case 'user':
                return <EditUsers userId={itemId} />
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