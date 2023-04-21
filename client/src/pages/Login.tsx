import React, { useState, useEffect } from 'react';
import axios from "axios";

const Login: React.FC = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/user/login", {
                name,
                password
            }, { headers: { "Authorization": 'Bearer ' + localStorage.getItem("user_token") } });
            localStorage.setItem("user_token", res.data.token);
            res.data && window.location.replace("/");
        } catch (err: any) {
            setError(err.response.data.error);
        }
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={login}>
                <input type="text" placeholder="name" onChange={e => setName(e.target.value)} />
                <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                <span>{error}</span>
            </form>
        </div>
    )
}

export default Login;