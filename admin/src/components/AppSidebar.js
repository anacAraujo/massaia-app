import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CNavTitle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilMusicNote,
  cilAlbum,
  cilHistory,
  cilWallpaper,
  cilPeople,
  cilClipboard
} from "@coreui/icons";
import { logo } from "../assets/brand/logo";
import { sygnet } from "../assets/brand/sygnet";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

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
        <CSidebarBrand to="/">
          {/* TODO delete icons */}
          <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />
          <CIcon
            customClassName="sidebar-brand-narrow"
            icon={sygnet}
            height={32}
          />
        </CSidebarBrand>
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
        </div>
      </CSidebarNav>
    </CSidebar>
  );
};

export default AppSidebar;
