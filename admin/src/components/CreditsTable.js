import { useTable } from 'react-table'
import { useMemo, useState, useEffect } from 'react'
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import CIcon from '@coreui/icons-react'
import axios from '../lib/AxiosConfig';
import { cilTrash, cilPlus } from '@coreui/icons'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CTooltip } from '@coreui/react'

const CreditsTable = ({ songId }) => {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [selectedSongId, setSelectedSongId] = useState(null);
    const [selectedAuthorId, setSelectedAuthorId] = useState(null);
    const [credits, setCredits] = useState([]);
    const [error, setError] = useState(null);

    const idAdd = "Add-Credits";
    const idTable = 'table-Credits';
    const idAddButton = "Button-Credits";

    useEffect(() => {
        console.log("Fetching credits for song with itemId:", songId);
        if (songId) {
            getCredits(songId);
        }
    }, [songId]);

    const getCredits = async (songId) => {
        try {
            const response = await axios.get(`/songs/${songId}/credits`);
            setCredits(response.data);
        } catch (error) {
            setError(error.response);
            console.error(error);
        }
    }

    const OpenAddModal = () => {
        setAddModalVisible(true);
    };
    
    const CloseAddModal = () => {
        setAddModalVisible(false);
    };

    const OpenDeleteModal = (roleId, songId, authorId) => {
        console.log("Opening delete modal for credits:", roleId, songId, authorId);
        setSelectedRoleId(roleId);
        setSelectedSongId(songId);
        setSelectedAuthorId(authorId);
        setDeleteModalVisible(true);
    };

    const CloseDeleteModal = () => {
        setDeleteModalVisible(false);
        setSelectedRoleId(null);
        setSelectedSongId(null);
        setSelectedAuthorId(null);
    };

    const creditsData = credits.flatMap((item) => {
        const { role, roles_id, songs_id, authors } = item;
    
        return authors.map((author) => ({
            role: role,
            roles_id: roles_id,
            songs_id: songs_id,
            author: author.authors_name,
            authors_id: author.authors_id,
            button: (
                <div>
                    <CTooltip content="Apagar" placement="bottom">
                        <CButton
                            onClick={() => OpenDeleteModal(roles_id, songs_id, author.authors_id)}
                            className="tableButtons"
                            variant="outline"
                            color="danger"
                        >
                            <CIcon icon={cilTrash}></CIcon>
                        </CButton>
                    </CTooltip>
                </div>
            )
        }));
    });
    
    console.log(creditsData);
    
    const data = useMemo(() => creditsData, [creditsData]);
    const columns = useMemo(() => [
        {
            Header: "Cargo",
            accessor: "role",
        },
        {
            Header: "Autor",
            accessor: "author",
        },
        {
            Header: "",
            accessor: "button",
        }
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

    let Rows = rows.length > 0 ? rows.map((row) => {
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
    }) : (
        <CTableRow>
            {columns.map((column, index) => (
                <CTableDataCell key={column.accessor}>
                    {index < columns.length - 1 ? 'Sem dados!' : ''}
                </CTableDataCell>
            ))}
        </CTableRow>
    );

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
                    captionTop="Créditos"
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
                songId={songId}
                type="credits"
            />
            <DeleteModal
               visible={deleteModalVisible}
               CloseModal={CloseDeleteModal}
               roleId={selectedRoleId}
               songId={selectedSongId}
               authorId={selectedAuthorId}
               type="credits"
            />
        </div>
    )
}

export default CreditsTable