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
            const res = await axios.post("https://sesl1-challenge-2-production.up.railway.app/user/register", {
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
        <div className="register w-3/12 my-[calc(4%)] mx-auto rounded-lg text-md border-4 border-purple-600 border-double font-mono bg-purple-100 p-8">
            <h3 className="flex items-center justify-center mb-4 text-xl font-medium text-gray-900">Register</h3>
            <form onSubmit={register} className="space-y-6">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input id="name" type="text" placeholder="name" onChange={e => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-0"/>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input id="password" type="password" placeholder="password" onChange={e => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-0"/>
                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <input id="confirm_password" type="password" placeholder="confirm password" onChange={e => setConfirmPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-0"/>
                <p className="text-center">Already registered? <br/><a href="/login" className="font-semibold">Login here</a></p>
                <button type="submit" className="flex focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-auto mt-5">Register</button>
                <span>{error}</span>
            </form>
        </div>
    )
}

export default Register;