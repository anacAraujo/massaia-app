import { useTable } from 'react-table'
import { useMemo, useState } from 'react'
import AddModal from "../components/AddModal"
import EditModal from '../components/EditModal'
import DeleteModal from '../components/DeleteModal'
import { cilPencil, cilTrash, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CTooltip, CButton } from '@coreui/react'

const MomentsTable = ({ moments }) => {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedMomentId, setSelectedMomentId] = useState(null);

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

    const OpenEditModal = (momentId) => {
        console.log("Opening edit modal for momentId:", momentId);
        setSelectedMomentId(momentId);
        setEditModalVisible(true);
    }

    const CloseEditModal = () => {
        setEditModalVisible(false);
    }

    const OpenDeleteModal = (momentId) => {
        console.log("Opening delete modal for momentId:", momentId);
        setSelectedMomentId(momentId);
        setDeleteModalVisible(true);
    }

    const CloseDeleteModal = () => {
        setDeleteModalVisible(false);
    }

    const momentsData = moments.map(moment => {
        const date = moment.date ? moment.date.substring(0, 10) : "Sem dados!";
        const name = moment.name || "Sem dados!";
        const image = moment.image || "Sem dados!";
        const video = moment.video || "Sem dados!";
        return {
            id: moment.id,
            name: name,
            image: image,
            video: video,
            date: date,
            button: (
                <div>
                    <CTooltip content="Editar" placement="bottom">
                        <CButton onClick={() => OpenEditModal(moment.id)} variant='outline' color='warning'>
                            <CIcon icon={cilPencil}></CIcon>
                        </CButton>
                    </CTooltip>
                    <CTooltip content="Apagar" placement="bottom">
                        <CButton onClick={() => OpenDeleteModal(moment.id)} className='tableButtons' variant='outline' color='danger'>
                            <CIcon icon={cilTrash}></CIcon>
                        </CButton>
                    </CTooltip>
                </div>
            )
        }
    })

    const data = useMemo(() => momentsData, [momentsData]);
    const columns = useMemo(() => [
        {
            Header: "Nome",
            accessor: "name"
        },
        {
            Header: "Imagem",
            accessor: "image"
        },
        {
            Header: "Vídeo",
            accessor: "video"
        },
        {
            Header: "Data",
            accessor: "date"
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
                <CTable id={idTable} {...getTableProps} align='middle' responsive captionTop='Tabelas dos Momentos'>
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
                type='moments'
            />
            <EditModal
                visible={editModalVisible}
                CloseModal={CloseEditModal}
                idTable={idTable}
                idEdit={idEdit}
                idButton={idAddButton}
                itemId={selectedMomentId}
                type='moments'
            />
            <DeleteModal
                visible={deleteModalVisible}
                CloseModal={CloseDeleteModal}
                itemId={selectedMomentId}
                type='moments'
            />
        </div>
    )
}

export default MomentsTable