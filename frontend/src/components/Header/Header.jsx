import React from 'react';
import { useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import TokenContext from '../../context/TokenContext.js';

function Header() {
    const token = localStorage.getItem("authToken");
    const { user } = useContext(TokenContext);
    console.log("user", user);
    const logout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    }

    return (
        <div>
            <nav className='header bg-gray-100 shadow-lg flex justify-between items-center'>
                <div className="logo w-1/4 text-center">
                    <NavLink to="/">Todo App</NavLink>
                </div>
                <div className='flex justify-between'>
                    {
                        token ? (
                            <div className='flex items-center justify-center'>
                                <p className='mr-5 text-sm font-medium text-slate-700'>
                                    Welcome, <span className='text-xl text-blue-800 capitalize'>{user.name}</span>
                                </p>
                                {/* <button onClick={logout} className="logout mr-4">Logout</button> */}
                                <button onClick={logout} className="border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline">
                                    Log Out
                                </button>
                            </div>
                        ) : (
                           
                              <>
                                    <NavLink to="/login">
                                        <button className="border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline">
                                            Login
                                        </button>
                                    </NavLink>
                               
                                    <NavLink to="/register"> <button className="border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline">
                                        Register
                                    </button></NavLink>
                              </>
                               
                        )
                    }
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default Header;