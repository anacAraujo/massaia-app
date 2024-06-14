import { useTable } from "react-table";
import { useMemo, useState } from "react";
import AddModal from "./AddModal";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
import CIcon from "@coreui/icons-react";
import { cilPencil, cilTrash, cilPlus } from "@coreui/icons";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTooltip,
  CButton,
} from "@coreui/react";

const ArtPiecesTable = ({ artPieces }) => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedArtPieceId, setSelectedArtPieceId] = useState(null);

  const idAdd = "Add";
  const idTable = "table";
  const idEdit = "Edit";
  const idAddButton = "Button";

  const OpenAddModal = () => {
    setAddModalVisible(true);
  };

  const CloseAddModal = () => {
    setAddModalVisible(false);
  };

  const OpenEditModal = (artPieceId) => {
    console.log("Opening edit modal for artPieceId:", artPieceId);
    setSelectedArtPieceId(artPieceId);
    setEditModalVisible(true);
  };

  const CloseEditModal = () => {
    setEditModalVisible(false);
  };

  const OpenDeleteModal = (artPieceId) => {
    console.log("Opening delete modal for artPieceId:", artPieceId);
    setSelectedArtPieceId(artPieceId);
    setDeleteModalVisible(true);
  };

  const CloseDeleteModal = () => {
    setDeleteModalVisible(false);
    setSelectedArtPieceId(null);
  };

  const artPiecesData = artPieces.map((artPiece) => {
    const date = artPiece.date ? artPiece.date.substring(0, 10) : "Sem dados!";
    return {
      id: artPiece.id,
      songId: artPiece.song_id,
      songName: artPiece.song_name,
      authorId: artPiece.author_id,
      authorName: artPiece.author_name,
      image: artPiece.image,
      date: date,
      button: (
        <div>
          <CTooltip content="Editar" placement="bottom">
            <CButton
              onClick={() => OpenEditModal(artPiece.id)}
              variant="outline"
              color="warning"
            >
              <CIcon icon={cilPencil}></CIcon>
            </CButton>
          </CTooltip>
          <CTooltip content="Apagar" placement="bottom">
            <CButton
              onClick={() => OpenDeleteModal(artPiece.id)}
              className="tableButtons"
              variant="outline"
              color="danger"
            >
              <CIcon icon={cilTrash}></CIcon>
            </CButton>
          </CTooltip>
        </div>
      ),
    };
  });

  const data = useMemo(() => artPiecesData, [artPiecesData]);
  const columns = useMemo(
    () => [
      {
        Header: "Imagem",
        accessor: "image",
      },
      {
        Header: "Autor",
        accessor: "authorName",
      },
      {
        Header: "Música",
        accessor: "songName",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "",
        accessor: "button",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  let HeaderGroups = headerGroups.map((headerGroup) => (
    <CTableRow {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column) => (
        <CTableHeaderCell className="tableFormat" {...column.getHeaderProps()}>
          {column.render("Header")}
        </CTableHeaderCell>
      ))}
    </CTableRow>
  ));

  let Rows = rows.map((row) => {
    prepareRow(row);
    return (
      <CTableRow {...row.getRowProps()}>
        {row.cells.map((cell) => (
          <CTableDataCell className="tableFormat" {...cell.getCellProps()}>
            {cell.render("Cell")}
          </CTableDataCell>
        ))}
      </CTableRow>
    );
  });

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
          captionTop="Tabelas das Obras"
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
        type="art_pieces"
      />
      <EditModal
        visible={editModalVisible}
        CloseModal={CloseEditModal}
        idTable={idTable}
        idEdit={idEdit}
        idButton={idAddButton}
        itemId={selectedArtPieceId}
        type="art_pieces"
      />
      <DeleteModal
        visible={deleteModalVisible}
        CloseModal={CloseDeleteModal}
        itemId={selectedArtPieceId}
        type="art_pieces"
      />
    </div>
  );
};

export default ArtPiecesTable;
