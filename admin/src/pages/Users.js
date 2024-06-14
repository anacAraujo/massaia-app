import { useState, useEffect } from 'react';
import AppHeader from "../components/AppHeader";
import AppSidebar from "../components/AppSidebar";
import UserCards from "../components/UserCards";
import axios from '../lib/AxiosConfig';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

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
                <div className='body flex-grow-1'>
                    <div className='container-lg px-4'>
                        <div className='row'>
                            <div className="col-12">
                                <UserCards users={users} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;