import { useTable } from 'react-table'
import { useMemo, useState } from 'react'
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "../components/DeleteModal";
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPlus, cilPencil } from '@coreui/icons'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CTooltip } from '@coreui/react'

const ArtistTable = ({ authors }) => {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedAuthorId, setSelectedAuthorId] = useState(null);

    const idAdd = "Add";
    const idTable = 'table';
    const idEdit = 'Edit';
    const idAddButton = "Button";

    const OpenAddModal = () => {
        setAddModalVisible(true);
    };
    
    const CloseAddModal = () => {
        setAddModalVisible(false);
    };

    const OpenEditModal = (authorId) => {
        console.log("Opening edit modal for authorId:", authorId);
        setSelectedAuthorId(authorId);
        setEditModalVisible(true);
    }

    const CloseEditModal = () => {
        setEditModalVisible(false);
    }

    const OpenDeleteModal = (authorId) => {
        if (authorId === 1 || authorId === 2) {
            alert('Este artista não pode ser apagado, por ser um dos autores principais do projeto!');
        } else {
           console.log("Opening delete modal for artPieceId:", authorId);
            setSelectedAuthorId(authorId);
            setDeleteModalVisible(true); 
        }
    };

    const CloseDeleteModal = () => {
        setDeleteModalVisible(false);
        setSelectedAuthorId(null);
    };

    const authorsData = authors.map(author => {
        const image = author.image || "Sem dados!";
        return {
            id: author.id,
            name: author.name,
            image: image,
            title: author.title,
            button: (
                <div>
                    <CTooltip content="Editar" placement="bottom">
                        <CButton onClick={() => OpenEditModal(author.id)} variant='outline' color='warning'>
                            <CIcon icon={cilPencil}></CIcon>
                        </CButton>
                    </CTooltip>
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
            Header: "Imagem",
            accessor: "image"
        },
        {
            Header: "Contribuição",
            accessor: "title"
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
                type="artists"
            />
            <EditModal
                visible={editModalVisible}
                CloseModal={CloseEditModal}
                idTable={idTable}
                idEdit={idEdit}
                idButton={idAddButton}
                itemId={selectedAuthorId}
                type='artists'
            />
            <DeleteModal
                visible={deleteModalVisible}
                CloseModal={CloseDeleteModal}
                itemId={selectedAuthorId}
                type="artists"
            />
        </div>
    )
}


export default ArtistTable