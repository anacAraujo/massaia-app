import { useTable } from 'react-table'
import { useMemo, useState } from 'react'
import EditModal from '../components/EditModal'
import CIcon from '@coreui/icons-react'
import { cilPencil } from '@coreui/icons'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CTooltip } from '@coreui/react'

const ContentAuthorsTable = ({ contentAuthors }) => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedContentId, setSelectedContentId] = useState(null);

    const idTable = 'table'
    const idEdit = 'Edit';

    const OpenEditModal = (contentId) => {
        console.log("Opening edit modal for contentId:", contentId);
        setSelectedContentId(contentId);
        setEditModalVisible(true);
    }

    const CloseEditModal = () => {
        setEditModalVisible(false);
    }

    const RemoveTags = (string) => {
        if (!string) return "";
        return string.replace(/<[^>]*>/g, ' ');
    };

    const contentAuthorsData = contentAuthors.map(content => {
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
                </div>
            )
        }
    })

    const data = useMemo(() => contentAuthorsData, [contentAuthorsData]);
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
            <div style={{ maxHeight: rows.length > 5 ? '30rem' : 'auto', overflowY: rows.length > 5 ? 'scroll' : 'auto' }}>
                <CTable id={idTable} {...getTableProps} align='middle' responsive captionTop='Tabelas dos Conteúdos-Autores'>
                    <CTableHead>
                        {HeaderGroups}
                    </CTableHead>
                    <CTableBody {...getTableBodyProps()}>
                        {Rows}
                    </CTableBody>
                </CTable>
            </div> 
            <EditModal
                visible={editModalVisible}
                CloseModal={CloseEditModal}
                idTable={idTable}
                idEdit={idEdit}
                itemId={selectedContentId}
                type='contentsAuthors'
            />
        </div>
    )
}

export default ContentAuthorsTable