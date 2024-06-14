import { useContext, useState } from 'react';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { CCard, CCardBody, CCardHeader, CCardText, CCardTitle, CCol, CRow } from '@coreui/react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const UserCards = ({ users }) => {
    const { currentUser } = useContext(AuthContext);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const idCard = 'card';
    const idEdit = 'Edit';

    const OpenEditModal = (userId) => {
        console.log("Opening edit modal for userId:", userId);
        setSelectedUserId(userId);
        setEditModalVisible(true);
    };

    const CloseEditModal = () => {
        setEditModalVisible(false);
    };

    const OpenDeleteModal = (userId, userEmail) => {
        if (currentUser.email === userEmail) {
            alert('Este utilizador não pode ser apagado, uma vez que se encontra com o login iniciado. Para o apagar faça login com outras credenciais!');
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

    const usersData = users.map(user => ({
        id: user.id,
        email: user.email,
        links: (
            <div className="d-flex justify-content-end">
                <Link onClick={() => OpenEditModal(user.id)} className="mx-3">Editar</Link>
                <Link onClick={() => OpenDeleteModal(user.id, user.email)}>Apagar</Link>
            </div>
        )
    }));

    return (
        <div>
            <div id={idCard}>
                <CRow>
                    {usersData.map(user => (
                        <CCol key={user.id} xs={12} md={3} className="mb-4">
                            <CCard className="border-top-light" style={{ width: '18rem' }}>
                                <CCardHeader>Utilizador {user.id}</CCardHeader>
                                <CCardBody>
                                    <CCardTitle>{user.email}</CCardTitle>
                                    <CCardText>
                                        Se pretende alterar o email ou a password deste utilizador, clique para editar ou então se o quiser apagar, clique em apagar.
                                    </CCardText>
                                    {user.links}
                                </CCardBody>
                            </CCard>
                        </CCol>
                    ))}
                </CRow>
            </div>
            <EditModal
                visible={editModalVisible}
                CloseModal={CloseEditModal}
                idCard={idCard}
                idEdit={idEdit}
                itemId={selectedUserId}
                type='users'
            />
            <DeleteModal
                visible={deleteModalVisible}
                CloseModal={CloseDeleteModal}
                itemId={selectedUserId}
                type='users'
            />
        </div>
    );
};

export default UserCards;