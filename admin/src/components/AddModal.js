import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'
import AddSongs from './AddSongs'
import AddMoments from './AddMoments'
import AddArtPieces from './AddArtPieces'
import AddAuthors from './AddAuthors'
import AddRoles from './AddRoles'
import AddCredits from './AddCredits'
import AddContent from './AddContents'

const AddModal = ({ visible, CloseModal, type, idAdd, idTable, idButton, songId}) => {

    const ChangeVisibility = (showEdit) => {
        document.getElementById(idAdd).style.display = showEdit ? 'block' : 'none';
        document.getElementById(idTable).style.display = showEdit ? 'none' : 'block';
        document.getElementById(idButton).style.display = showEdit ? 'none' : 'block';
    }

    const handleDestination = () => {
        ChangeVisibility(true);
        CloseModal();
    }

    const AddComponent = () => {
        switch (type) {
            case 'songs':
                return <AddSongs />;
            case 'art_pieces':
                return <AddArtPieces />;
            case 'moments':
                return <AddMoments />;
            case 'artists':
                return <AddAuthors />;
            case 'roles':
                return <AddRoles />
            case 'credits':
                return <AddCredits songId={songId} />
            case 'contentsAbout':
                return <AddContent />
            default:
                return null;
        }
    }

    return (
        <div>
            <CModal
                id="AddModal"
                alignment="center"
                visible={visible}
                onClose={CloseModal}
                aria-labelledby="VerticallyCenteredExample"
            >
                <CModalHeader>
                    <CModalTitle>Adicionar dados a uma tabela</CModalTitle>
                </CModalHeader>
                <CModalBody>Pressione o botão de continuar, se pretende adicionar mais informações a esta tabela! Para interromper o preenchimento do formulário, basta recarregar a página ou carregar na seta no topo do mesmo.</CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={CloseModal}>Fechar</CButton>
                    <CButton onClick={handleDestination} color="success" style={{color: 'white'}}>Continuar</CButton>
                </CModalFooter>
            </CModal>
            <div id={idAdd} style={{ display: 'none' }}>
                {AddComponent()}
            </div>
        </div>
    )
}

export default AddModal