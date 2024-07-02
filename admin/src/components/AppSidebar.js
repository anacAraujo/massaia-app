import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  CCloseButton,
  CSidebar,
  CSidebarHeader,
  CSidebarNav,
  CNavTitle,
  CNavGroup,
  CNavItem
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilMusicNote,
  cilAlbum,
  cilHistory,
  cilWallpaper,
  cilPeople,
  cilClipboard,
  cilFolderOpen
} from "@coreui/icons";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const [contentVisible, setContentVisible] = useState(false);

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: "set", sidebarShow: false })}
        />
      </CSidebarHeader>
      <CSidebarNav>
        <CNavTitle>Tabelas</CNavTitle>
        <div className="nav-item">
          <Link className="nav-link" to="/albuns">
            <CIcon className="nav-icon" icon={cilAlbum}></CIcon>
            Álbuns
          </Link>
          <Link className="nav-link" to="/musicas">
            <CIcon className="nav-icon" icon={cilMusicNote}></CIcon>
            Músicas
          </Link>
          <Link className="nav-link" to="/obras">
            <CIcon className="nav-icon" icon={cilWallpaper}></CIcon>
            Obras
          </Link>
          <Link className="nav-link" to="/momentos">
            <CIcon className="nav-icon" icon={cilHistory}></CIcon>
            Momentos
          </Link>
          <Link className="nav-link" to="/artistas">
            <CIcon className="nav-icon" icon={cilPeople}></CIcon>
            Artistas
          </Link>
          <Link className="nav-link" to="/cargos">
            <CIcon className="nav-icon" icon={cilClipboard}></CIcon>
            Cargos
          </Link>
          <CNavGroup
            toggler={
              <div className="d-flex align-items-center" onClick={() => setContentVisible(!contentVisible)}>
                <CIcon className="nav-icon" icon={cilFolderOpen} />
                <span className="ml-2">Conteúdos</span>
              </div>
            }
            visible={contentVisible}
          >
            <CNavItem>
              <Link className="nav-link" to="/conteudos/autores">
                Autores
              </Link>
            </CNavItem>
            <CNavItem>
              <Link className="nav-link" to="/conteudos/sobre">
                Sobre Projeto
              </Link>
            </CNavItem>
          </CNavGroup>
        </div>
      </CSidebarNav>
    </CSidebar>
  );
};

export default AppSidebar;


