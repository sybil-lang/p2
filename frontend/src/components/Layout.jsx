import React from 'react';
// import TaskIndicator from './TaskIndicator';
import CreateTask from './createTask/CreateTask';
import { Outlet } from 'react-router-dom';
function Layout() {
    return (
        <div>
            <div className='fex '>
                <CreateTask />
                <Outlet />
               
            </div>
        </div>
    );
}

export default Layout;