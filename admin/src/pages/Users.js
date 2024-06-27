import { useState, useEffect } from "react";
import AppHeader from "../components/AppHeader";
import AppSidebar from "../components/AppSidebar";
import UserCards from "../components/UserCards";
import axios from "../lib/AxiosConfig";
import CIcon from "@coreui/icons-react";
import { cilPlus } from "@coreui/icons";
import { CButton } from "@coreui/react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const idAddButton = 'Button';

  const handleRegisterUser = () => {
    navigate("/register");
  };

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
  };

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <div className="container-lg px-4">
            <div className="row">
              <div className="col-12">
                <UserCards users={users} idButton={idAddButton} />
                <div className="buttons gap-2 justify-content-md-end">
                  <CButton
                    id={idAddButton}
                    onClick={() => handleRegisterUser()}
                    variant="outline"
                    color="success"
                    className="me md-2"
                  >
                    <CIcon icon={cilPlus} className="me-1"></CIcon>
                    Adicionar
                  </CButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
