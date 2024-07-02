import { useTable } from 'react-table'
import { useMemo, useState } from 'react'
import AddModal from "../components/AddModal"
import EditModal from '../components/EditModal'
import DeleteModal from '../components/DeleteModal';
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus } from '@coreui/icons'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CTooltip } from '@coreui/react'

const ContentAboutTable = ({ contentAbout }) => {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedContentId, setSelectedContentId] = useState(null);

    const idAdd = 'Add';
    const idTable = 'table'
    const idEdit = 'Edit';
    const idAddButton = 'Button';

    const OpenAddModal = () => {
        setAddModalVisible(true);
    }

    const CloseAddModal = () => {
        setAddModalVisible(false);
    }

    const OpenEditModal = (contentId) => {
        console.log("Opening edit modal for contentId:", contentId);
        setSelectedContentId(contentId);
        setEditModalVisible(true);
    }

    const CloseEditModal = () => {
        setEditModalVisible(false);
    }

    const OpenDeleteModal = (contentId) => {
        console.log("Opening delete modal for contentId:", contentId);
        setSelectedContentId(contentId);
        setDeleteModalVisible(true);
    }

    const CloseDeleteModal = () => {
        setDeleteModalVisible(false);
    }

    const RemoveTags = (string) => {
        if (!string) return "";
        return string.replace(/<[^>]*>/g, ' ');
    };

    const contentAboutData = contentAbout.map(content => {
        const text = content.text;
        const cleanedText = RemoveTags(text);
        const displayedText = cleanedText.split(' ').slice(0, 5).join(' ');
        const finalText = cleanedText.split(' ').length > 5 ? displayedText + '...' : displayedText;

        return {
            id: content.id,
            topic: content.topic,
            text: finalText,
            button: (
                <div>
                    <CTooltip content="Editar" placement="bottom">
                        <CButton onClick={() => OpenEditModal(content.id)} className='tableButtons' variant='outline' color='warning'>
                            <CIcon icon={cilPencil}></CIcon>
                        </CButton>
                    </CTooltip>
                    <CTooltip content="Apagar" placement="bottom">
                        <CButton onClick={() => OpenDeleteModal(content.id)} className='tableButtons' variant='outline' color='danger'>
                            <CIcon icon={cilTrash}></CIcon>
                        </CButton>
                    </CTooltip>
                </div>
            )
        }
    })

    const data = useMemo(() => contentAboutData, [contentAboutData]);
    const columns = useMemo(() => [
        {
            Header: "Tópico",
            accessor: "topic"
        },
        {
            Header: "Texto",
            accessor: "text"
        },
        {
            Header: "",
            accessor: "button"
        },
    ], []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    let HeaderGroups = headerGroups.map((headerGroup) => (
        <CTableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
                <CTableHeaderCell className='tableFormat' {...column.getHeaderProps()}>
                    {column.render("Header")}
                </CTableHeaderCell>
            ))}
        </CTableRow>
    ))

    let Rows = rows.map((row) => {
        prepareRow(row);
        return (
            <CTableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                    <CTableDataCell className='tableFormat' {...cell.getCellProps()}>
                        {cell.render("Cell")}
                    </CTableDataCell>
                ))}
            </CTableRow>
        )
    })

    return (
        <div>
            <div style={{ maxHeight: rows.length > 5 ? '30rem' : 'auto', overflowY: rows.length > 5 ? 'scroll' : 'auto' }}>
                <CTable id={idTable} {...getTableProps} align='middle' responsive captionTop='Tabelas dos Conteúdos-Sobre Projeto'>
                    <CTableHead>
                        {HeaderGroups}
                    </CTableHead>
                    <CTableBody {...getTableBodyProps()}>
                        {Rows}
                    </CTableBody>
                </CTable>
            </div> 
            <div id={idAddButton} className='buttons gap-2 justify-content-md-end'>
                <CButton onClick={OpenAddModal} variant='outline' color='success' className='me md-2'>
                    <CIcon icon={cilPlus} className='me-1'></CIcon>
                    Adicionar
                </CButton>
            </div>
            <AddModal
                visible={addModalVisible}
                CloseModal={CloseAddModal}
                idTable={idTable}
                idAdd={idAdd}
                idButton={idAddButton}
                type='contentsAbout'
            />
            <EditModal
                visible={editModalVisible}
                CloseModal={CloseEditModal}
                idTable={idTable}
                idEdit={idEdit}
                idButton={idAddButton}
                itemId={selectedContentId}
                type='contentsAbout'
            />
            <DeleteModal
                visible={deleteModalVisible}
                CloseModal={CloseDeleteModal}
                itemId={selectedContentId}
                type='contentsAbout'
            />
        </div>
    )
}

export default ContentAboutTable