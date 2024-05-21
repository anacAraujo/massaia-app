import { CButton } from "@coreui/react"
import CIcon from '@coreui/icons-react'
import { cilArrowLeft } from '@coreui/icons'

const DeleteSongs = () => {
    const CloseForm = () => {
        window.location.reload();
    }

    return (
        <CButton onClick={CloseForm} style={{padding: '0'}}>
            <CIcon icon={cilArrowLeft} size="lg"></CIcon>
        </CButton>
    )
}

export default DeleteSongs