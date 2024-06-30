import { useTable } from 'react-table'
import { useMemo, useState } from 'react'
import AddModal from "./AddModal";
import DeleteModal from "../components/DeleteModal";
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPlus } from '@coreui/icons'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CTooltip } from '@coreui/react'

const RolesTable = ({ roles }) => {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedRoleId, setSelectedRoleId] = useState(null);

    const idAdd = "Add";
    const idTable = 'table';
    const idAddButton = "Button";

    const OpenAddModal = () => {
        setAddModalVisible(true);
    };
    
    const CloseAddModal = () => {
        setAddModalVisible(false);
    };

    const OpenDeleteModal = (roleId) => {
        console.log("Opening delete modal for artPieceId:", roleId);
        setSelectedRoleId(roleId);
        setDeleteModalVisible(true);
    };

    const CloseDeleteModal = () => {
        setDeleteModalVisible(false);
        setSelectedRoleId(null);
    };

    const rolesData = roles.map(role => {
        return {
            id: role.id,
            name: role.name,
            button: (
                <div>
                    <CTooltip content="Apagar" placement="bottom">
                        <CButton
                            onClick={() => OpenDeleteModal(role.id)}
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

    const data = useMemo(() => rolesData, [rolesData]);
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
                    captionTop="Tabelas dos Cargos"
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
                type="roles"
            />
            <DeleteModal
                visible={deleteModalVisible}
                CloseModal={CloseDeleteModal}
                itemId={selectedRoleId}
                type="roles"
            />
        </div>
    )
}


export default RolesTable