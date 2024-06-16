import { useTable } from 'react-table'
import { useMemo, useState } from 'react'
import EditModal from './EditModal'
import CIcon from '@coreui/icons-react'
import { cilPencil } from '@coreui/icons'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CTooltip } from '@coreui/react'

const AlbumsTable = ({ albums }) => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);

    const idTable = 'table'
    const idEdit = 'Edit';

    const OpenEditModal = (albumId) => {
        console.log("Opening edit modal for albumId:", albumId);
        setSelectedAlbumId(albumId);
        setEditModalVisible(true);
    }

    const CloseEditModal = () => {
        setEditModalVisible(false);
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
                <CTableHeaderCell className='tableAlbums' {...column.getHeaderProps()}>
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
                    <CTableDataCell className='tableAlbums' {...cell.getCellProps()}>
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
            <EditModal
                visible={editModalVisible}
                CloseModal={CloseEditModal}
                idTable={idTable}
                idEdit={idEdit}
                itemId={selectedAlbumId}
                type='albums'
            />
        </div>
    )
}


export default AlbumsTable