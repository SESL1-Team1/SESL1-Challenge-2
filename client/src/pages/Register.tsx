import React, { useState, useEffect } from 'react';
import axios from "axios";

const Register: React.FC = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const register = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/user/register", {
                name,
                password,
                confirmPassword,
            }, { headers: { "Authorization": 'Bearer ' + localStorage.getItem("user_token") } });
            localStorage.setItem("user_token", res.data.token);
            res.data && window.location.replace("/");
        } catch (err: any) {
            setError(err.response.data.error);
        }
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <form onSubmit={register}>
                <input type="text" placeholder="name" onChange={e => setName(e.target.value)} />
                <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
                <input type="password" placeholder="confirm password" onChange={e => setConfirmPassword(e.target.value)} />
                <button type="submit">Register</button>
                <span>{error}</span>
            </form>
        </div>
    )
}

export default Register;