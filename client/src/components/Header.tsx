import { faSignInAlt, faSignOutAlt, faUser, faCalendarCheck} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const [user, setUser] = useState("");
    const [error, setError] = useState("");

    const logout = async () => {
        try {
            await axios.get("/user/logout",
                { headers: { "Authorization": 'Bearer ' + localStorage.getItem("user_token") } });
            localStorage.removeItem("user_token");
            window.location.replace("/");
        } catch (err: any) {
            setError(err.response.data.error);
        }
    }

    const fetchUser = async () => {
        const res = await axios.get("/user",
            { headers: { "Authorization": 'Bearer ' + localStorage.getItem("user_token") } });
        setUser(res.data.name);
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-900 via-purple-600 to-purple-500 text-white border-b font-mono">
            <div className="flex items-center pr-0 ml-2">
                <Link to="/">
                    <h1 className="text-2xl"><FontAwesomeIcon icon={faCalendarCheck} />     Task Manager</h1>
                </Link>
            </div>
            {user ? <span className="mr-2 text-serif text-white">Welcome {user}</span> : null }
            <div className="">
                <ul className="items-center mx-5 justify-between text-white">
                    {!user ?
                        <li>
                            <Link to="/login">
                                <FontAwesomeIcon icon={faSignInAlt} /> Login
                            </Link>
                        </li>
                    : null }
                    {!user ?
                    <li>
                        <Link to="/register">
                            <FontAwesomeIcon icon={faUser} /> Register
                        </Link>
                    </li>
                    : null }
                    {user ?
                    <li>
                        <Link to="/login" onClick={logout}>
                            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                        </Link>
                    </li>
                    : null }
                </ul>
            </div>
        </div>
    )
}

export default Header;