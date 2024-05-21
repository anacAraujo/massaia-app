import { useTable } from 'react-table'
import { useMemo, useState } from 'react'
import AddModal from "../components/AddModal"
import EditModal from '../components/EditModal'
import DeleteModal from '../components/DeleteModal';
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus } from '@coreui/icons'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CTooltip } from '@coreui/react'

const AlbumsTable = ({ albums }) => {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);

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

    const OpenEditModal = (albumId) => {
        console.log("Opening edit modal for albumId:", albumId);
        setSelectedAlbumId(albumId);
        setEditModalVisible(true);
    }

    const CloseEditModal = () => {
        setEditModalVisible(false);
    }

    const OpenDeleteModal = (albumId) => {
        console.log("Opening delete modal for albumId:", albumId);
        setSelectedAlbumId(albumId);
        setDeleteModalVisible(true);
    }

    const CloseDeleteModal = () => {
        setDeleteModalVisible(false);
        setSelectedAlbumId(null);
    }

    const albumsData = albums.map(album => {
        const date = album.date ? album.date.substring(0, 10) : "Sem dados!";
        const cover = album.cover || "Sem dados!";
        return {
            id: album.id,
            name: album.name,
            cover: cover,
            date: date,
            button: (
                <div>
                    <CTooltip content="Editar" placement="bottom">
                        <CButton onClick={() => OpenEditModal(album.id)} variant='outline' color='warning'>
                            <CIcon icon={cilPencil}></CIcon>
                        </CButton>
                    </CTooltip>
                    <CTooltip content="Delete" placement="bottom">
                        <CButton onClick={() => OpenDeleteModal(album.id)} className='tableButtons' variant='outline' color='danger'>
                            <CIcon icon={cilTrash}></CIcon>
                        </CButton>
                    </CTooltip>
                </div>
            )       
        }
    })

    const data = useMemo(() => albumsData, [albumsData]);
    const columns = useMemo(() => [
        {
            Header: "Nome",
            accessor: "name"
        },
        {
            Header: "Capa",
            accessor: "cover"
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
            <CTable id={idTable} {...getTableProps} align='middle' responsive captionTop='Tabelas dos Álbuns'>
                <CTableHead>
                    {HeaderGroups}
                </CTableHead>
                <CTableBody {...getTableBodyProps()}>
                    {Rows}
                </CTableBody>
            </CTable>
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
                type='album'
            />
            <EditModal
                visible={editModalVisible}
                CloseModal={CloseEditModal}
                idTable={idTable}
                idEdit={idEdit}
                idButton={idAddButton}
                itemId={selectedAlbumId}
                type='album'
            />
            <DeleteModal
                visible={deleteModalVisible}
                CloseModal={CloseDeleteModal}
                itemId={selectedAlbumId}
                type='album'
            />
        </div>
    )
}


export default AlbumsTable