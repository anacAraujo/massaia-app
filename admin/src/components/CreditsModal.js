import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';
import CreditsTable from "./CreditsTable";

const EditModal = ({ visible, CloseModal, idTable, idButton, idCredits, songId }) => {
    
    const ChangeVisibility = (showEdit) => {
            document.getElementById(idCredits).style.display = showEdit ? 'block' : 'none';
            document.getElementById(idTable).style.display = showEdit ? 'none' : 'block';
            document.getElementById(idButton).style.display = showEdit ? 'none' : 'block';
    }

    const handleDestination = () => {
        ChangeVisibility(true);
        CloseModal();
    }

    const CreditsComponent = () => {
        return (
            <CreditsTable songId={songId} />
        )
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
                    <CModalTitle>Ver os créditos de uma música</CModalTitle>
                </CModalHeader>
                <CModalBody>Pressione o botão de continuar, se pretende ver os créditos desta música!</CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={CloseModal}>Fechar</CButton>
                    <CButton onClick={handleDestination} color="info" style={{ color: 'white' }}>Continuar</CButton>
                </CModalFooter>
            </CModal>
            <div id={idCredits} style={{ display: 'none' }}>
                {CreditsComponent()}
            </div>
        </div>
    )
}

export default EditModal