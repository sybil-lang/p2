import React from 'react';
import { useState, useContext } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import axios from "../Axios/axios.js"
import TokenContext from '../context/TokenContext.js';
function Register() {
    const [formData, setFormData] = useState({})
    const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
    const [error, setError] = useState();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("/user/register", formData)
            tokenDispatch({ type: "SET_TOKEN", payload: result.data.token })
            userDispatch({ type: "SET_USER", payload: result.data.user })
            localStorage.setItem("authToken", JSON.stringify(result.data.token))
        } catch (error) {
            console.log(error);
            setError({ message: error.response.data.message })
        }
    }
    return (
        <div>
            {userToken && <Navigate to="/" />}
            <div className="bg-gray-200 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="bg-white shadow-md rounded-md p-6">
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://www.svgrepo.com/show/499664/user-happy.svg"
                            alt=""
                        />
                        <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign up for an account
                        </h2>
                        <form className="space-y-6" method='post' onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="new-password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Username
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name='name'
                                        onChange={handleChange}
                                        required=""
                                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name='email'
                                        autoComplete="email-address"
                                        onChange={handleChange}
                                        required=""
                                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        name="password"
                                        type="password"
                                        autoComplete="password"
                                        onChange={handleChange}
                                        required=""
                                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                                >
                                    Register Account
                                </button>
                            </div>
                            <p className="text-center text-sm text-gray-500">
                               Already  have an account ? 
                                <NavLink
                                    to="/login"
                                    className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
                                >
                                  Login
                                </NavLink>
                                .
                            </p>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Register;