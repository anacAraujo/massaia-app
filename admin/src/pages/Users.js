import { useState, useEffect, useContext } from "react"
import AppHeader from "../components/AppHeader"
import AppFooter from "../components/AppFooter"
import AppSidebar from "../components/AppSidebar"
import EditModal from "../components/EditModal"
import DeleteModal from "../components/DeleteModal"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { CCard, CCardBody, CCardTitle, CCardText, CRow, CCol, CCardHeader } from "@coreui/react"
import axios from '../lib/AxiosConfig'

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    
    const { currentUser } = useContext(AuthContext);
    const idCard = 'card';
    const idEdit = 'Edit';

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get(`/users`);
            setUsers(response.data);
        } catch (error) {
            setError(error.response);
            console.error(error);
        }
    }
    //console.log(users);

    const OpenEditModal = (userId) => {
        console.log("Opening edit modal for userId:", userId);
        setSelectedUserId(userId);
        setEditModalVisible(true);
    }

    const CloseEditModal = () => {
        setEditModalVisible(false);
    }

    const OpenDeleteModal = (userId, userEmail) => {
        if (currentUser.email === userEmail) {
            alert('Não pode apagar este utilizador!');
        } else {
            console.log("Opening delete modal for userId:", userId);
        setSelectedUserId(userId);
        setDeleteModalVisible(true);
        } 
    }

    const CloseDeleteModal = () => {
        setDeleteModalVisible(false);
        setSelectedUserId(null);
    }

    const displayUsers = users.map((user, index) => {
        return (
            <CCard id={idCard} key={index} className="border-top-light" style={{ width: '18rem' }}>
                <CCardHeader>Utilizador {user.id}</CCardHeader>
                <CCardBody>
                    <CCardTitle>{user.email}</CCardTitle>
                    <CCardText>
                        Se pretende alterar o email ou a password deste utilizador, clique para editar ou então se o quiser apagar, clique em apagar.
                    </CCardText>
                    <div className="d-flex justify-content-end">
                        <Link onClick={() => OpenEditModal(user.id)} className="mx-3">Editar</Link>
                        <Link onClick={() => OpenDeleteModal(user.id, user.email)}>Apagar</Link>
                    </div>
                </CCardBody>
            </CCard>
        )
    })

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className='body flex-grow-1'>
                    <div className='container-lg px-4'>
                        <div className='row'>
                            <div className="col-12">
                                <CRow xs={{ cols: 1, gutter: 1 }} md={{ cols: 3 }}>
                                    <CCol xs>
                                        {displayUsers}
                                        <EditModal
                                            visible={editModalVisible}
                                            CloseModal={CloseEditModal}
                                            idCard={idCard}
                                            idEdit={idEdit}
                                            itemId={selectedUserId}
                                            type='user'
                                        />
                                        <DeleteModal
                                            visible={deleteModalVisible}
                                            CloseModal={CloseDeleteModal}
                                            itemId={selectedUserId}
                                            type='user'
                                        />
                                    </CCol>
                                </CRow>
                            </div>
                        </div>
                    </div>
                </div>
                <AppFooter />
            </div>
        </div>
    )

}

export default Users