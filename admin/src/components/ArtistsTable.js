import { useTable } from 'react-table'
import { useMemo, useState } from 'react'
import AddModal from "./AddModal";
import DeleteModal from "../components/DeleteModal";
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPlus } from '@coreui/icons'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CTooltip } from '@coreui/react'

const ArtistTable = ({ authors }) => {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedAuthorId, setSelectedAuthorId] = useState(null);

    const idAdd = "Add";
    const idTable = 'table';
    const idAddButton = "Button";

    const OpenAddModal = () => {
        setAddModalVisible(true);
      };
    
      const CloseAddModal = () => {
        setAddModalVisible(false);
      };

    const OpenDeleteModal = (authorId) => {
        console.log("Opening delete modal for artPieceId:", authorId);
        setSelectedAuthorId(authorId);
        setDeleteModalVisible(true);
    };

    const CloseDeleteModal = () => {
        setDeleteModalVisible(false);
        setSelectedAuthorId(null);
    };

    const authorsData = authors.map(author => {
        return {
            id: author.id,
            name: author.name,
            button: (
                <div>
                    <CTooltip content="Apagar" placement="bottom">
                        <CButton
                            onClick={() => OpenDeleteModal(author.id)}
                            className="tableButtons"
                            variant="outline"
                            color="danger"
                        >
                            <CIcon icon={cilTrash}></CIcon>
                        </CButton>
                    </CTooltip>
                </div>
            )
        }
    })

    const data = useMemo(() => authorsData, [authorsData]);
    const columns = useMemo(() => [
        {
            Header: "Nome",
            accessor: "name"
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
            <div
                style={{
                    maxHeight: rows.length > 5 ? "30rem" : "auto",
                    overflowY: rows.length > 5 ? "scroll" : "auto",
                }}
            >
                <CTable
                    id={idTable}
                    {...getTableProps}
                    align="middle"
                    responsive
                    captionTop="Tabelas dos Artistas"
                >
                    <CTableHead>{HeaderGroups}</CTableHead>
                    <CTableBody {...getTableBodyProps()}>{Rows}</CTableBody>
                </CTable>
            </div>
            <div id={idAddButton} className="buttons gap-2 justify-content-md-end">
                <CButton
                    onClick={OpenAddModal}
                    variant="outline"
                    color="success"
                    className="me md-2"
                >
                    <CIcon icon={cilPlus} className="me-1"></CIcon>
                    Adicionar
                </CButton>
            </div>
            <AddModal
                visible={addModalVisible}
                CloseModal={CloseAddModal}
                idTable={idTable}
                idAdd={idAdd}
                idButton={idAddButton}
                type="authors"
            />
            <DeleteModal
                visible={deleteModalVisible}
                CloseModal={CloseDeleteModal}
                itemId={selectedAuthorId}
                type="authors"
            />
        </div>
    )
}


export default ArtistTable