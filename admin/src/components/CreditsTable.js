import { useTable } from 'react-table'
import { useMemo, useState } from 'react'
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPlus } from '@coreui/icons'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CTooltip } from '@coreui/react'

const CreditsTable = ({ credits, songId, idTable, idButton, idCredits }) => {
    const ChangeVisibility = (showEdit) => {
        document.getElementById(idTable).style.display = showEdit ? 'none' : 'block';
        document.getElementById(idButton).style.display = showEdit ? 'none' : 'block';
        document.getElementById(idCredits).style.display = showEdit ? 'block' : 'none';
    }
    return (
        <h1 id={idCredits}></h1>
    )
}

export default CreditsTable