import { useTable } from 'react-table'
import { useMemo, useState } from 'react'
import AddModal from "../components/AddModal"
import EditModal from '../components/EditModal'
import DeleteModal from '../components/DeleteModal';
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus, cilDescription } from '@coreui/icons'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CTooltip  } from '@coreui/react'
import axios from '../lib/AxiosConfig'
import CreditsModal from './CreditsModal';

const SongsTable = ({ songs }) => {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [creditsModalVisible, setCreditsModalVisible] = useState(false);
    const [selectedSongId, setSelectedSongId] = useState(null);
    const [credits, setCredits] = useState([]);
    const [error, setError] = useState(null);

    const idAdd = 'Add';
    const idTable = 'table'
    const idEdit = 'Edit';
    const idAddButton = 'Button';
    const idCredits = 'Credits';

    const OpenAddModal = () => {
        setAddModalVisible(true);
    }

    const CloseAddModal = () => {
        setAddModalVisible(false);
    }

    const OpenEditModal = (songId) => {
        console.log("Opening edit modal for songId:", songId);
        setSelectedSongId(songId);
        setEditModalVisible(true);
    }

    const CloseEditModal = () => {
        setEditModalVisible(false);
    }

    const OpenDeleteModal = (songId) => {
        console.log("Opening delete modal for songId:", songId);
        setSelectedSongId(songId);
        setDeleteModalVisible(true);
    }

    const CloseDeleteModal = () => {
        setDeleteModalVisible(false);
        setSelectedSongId(null);
    }

    const OpenCreditsModal = (songId) => {
        console.log("Opening credits for songId:", songId);
        setSelectedSongId(songId);
        setCreditsModalVisible(true);
    }

    const CloseCreditsModal = () => {
        setCreditsModalVisible(false);
    }

    const RemoveTags = (string) => {
        if (!string) return "";
        return string.replace(/<[^>]*>/g, ' ');
    };

    const songsData = songs.map(song => {
        const date = song.date ? song.date.substring(0, 10) : "Sem dados!";
        const lyrics = song.lyrics || "Sem dados!";
        const cleanedLyrics = RemoveTags(lyrics);
        const displayedLyrics = cleanedLyrics.split(' ').slice(0, 5).join(' ');
        const finalLyrics = cleanedLyrics.split(' ').length > 5 ? displayedLyrics + '...' : displayedLyrics;
        const audio = song.audio || "Sem dados!";
        const video = song.video || "Sem dados!";
        const image = song.image || "Sem dados!";
        return {
            id: song.id,
            albumId: song.album_id,
            albumName: song.album_name,
            name: song.name,
            position: song.position,
            lyrics: finalLyrics,
            audio: audio,
            video: video,
            image: image,
            date: date,
            button: (
                <div>
                    <CTooltip content="Ver créditos" placement="bottom">
                        <CButton onClick={() => OpenCreditsModal(song.id)} variant='outline' color='info'>
                            <CIcon icon={cilDescription}></CIcon>
                        </CButton>
                    </CTooltip>
                    <CTooltip content="Editar" placement="bottom">
                        <CButton onClick={() => OpenEditModal(song.id)}  className='tableButtons' variant='outline' color='warning'>
                            <CIcon icon={cilPencil}></CIcon>
                        </CButton>
                    </CTooltip>
                    <CTooltip content="Apagar" placement="bottom">
                        <CButton onClick={() => OpenDeleteModal(song.id)} className='tableButtons' variant='outline' color='danger'>
                            <CIcon icon={cilTrash}></CIcon>
                        </CButton>
                    </CTooltip>
                </div>
            )       
        }
    })

    const data = useMemo(() => songsData, [songsData]);
    const columns = useMemo(() => [
        {
            Header: "Nome",
            accessor: "name"
        },
        {
            Header: "Álbum",
            accessor: "albumName"
        },
        {
            Header: "Posição",
            accessor: "position"
        },
        {
            Header: "Letra",
            accessor: "lyrics"
        },
        {
            Header: "Audio",
            accessor: "audio"
        },
        {
            Header: "Vídeo",
            accessor: "video"
        },
        {
            Header: "Imagem",
            accessor: "image"
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
                <CTableHeaderCell className='tableSongs' {...column.getHeaderProps()}>
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
                    <CTableDataCell className='tableSongs' {...cell.getCellProps()}>
                        {cell.render("Cell")}
                    </CTableDataCell>
                ))}
            </CTableRow>
        )
    })

    return (
        <div>
            <div style={{ maxHeight: rows.length > 5 ? '30rem' : 'auto', overflowY: rows.length > 5 ? 'scroll' : 'auto', overflowX: columns.length > 5 ? 'scroll' : 'auto' }}>
                <CTable id={idTable} {...getTableProps} align='middle' responsive captionTop='Tabelas dos Músicas'>
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
                type='songs'
            />
            <EditModal
                visible={editModalVisible}
                CloseModal={CloseEditModal}
                idTable={idTable}
                idEdit={idEdit}
                idButton={idAddButton}
                itemId={selectedSongId}
                type='songs'
            />
            <DeleteModal
                visible={deleteModalVisible}
                CloseModal={CloseDeleteModal}
                itemId={selectedSongId}
                type='songs'
            />
            <CreditsModal 
                visible={creditsModalVisible}
                CloseModal={CloseCreditsModal}
                songId={selectedSongId}
                idTable={idTable}
                idCredits={idCredits}
                idButton={idAddButton}
            />
        </div>
        
    )
}

export default SongsTable