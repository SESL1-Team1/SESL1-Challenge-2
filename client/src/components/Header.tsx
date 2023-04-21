import { faSignInAlt, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const [user, setUser] = useState("");
    const [error, setError] = useState("");

    const logout = async () => {
        try {
            await axios.get("http://localhost:5000/user/logout",
                { headers: { "Authorization": 'Bearer ' + localStorage.getItem("user_token") } });
            localStorage.removeItem("user_token");
            window.location.replace("/");
        } catch (err: any) {
            setError(err.response.data.error);
        }
    }

    const fetchUser = async () => {
        const res = await axios.get("http://localhost:5000/user",
            { headers: { "Authorization": 'Bearer ' + localStorage.getItem("user_token") } });
        setUser(res.data.name);
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <div className="flex justify-between items-center p-4 border-b-2">
            <div className="flex items-center">
                <Link to="/">
                    <h1>Task Manager</h1>
                </Link>
                
            </div>
            <span className="mr-2">Welcome {user}</span>
            <div className="">
                <ul className="flex items-center ml-5 mr-5 justify-between">
                    <li>
                    <Link to="/login">
                        <FontAwesomeIcon icon={faSignInAlt} /> Login
                    </Link>
                    </li>
                    <li>
                    <Link to="/register">
                        <FontAwesomeIcon icon={faUser} /> Register
                    </Link>
                    </li>
                    <li>
                    <Link to="/login" onClick={logout}>
                        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header;