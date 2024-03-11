import React, { useContext, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import TaskContext from '../../context/TaskContext';

function Task({ task, id }) {
    const { dispatch, userToken } = useContext(TaskContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);
    const token = localStorage.getItem('authToken')?.replace(/['"]+/g, '');

    const handleRemove = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete('http://localhost:8000/api/task/removeTask', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    id: task._id
                }
            });

            console.log(response.data.message);
            alert('Task deleted successfully');
            dispatch({
                type: "REMOVE_TASK",
                id
            });
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            try {
                const response = await axios.put(`http://localhost:8000/api/task/tasks/${task._id}`, {
                    title: editedTitle,
                    description: editedDescription,
                    completed: task.completed // Include other fields if needed
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                console.log(response.data.message);
                dispatch({
                    type: "EDIT_TASK",
                    id: task._id,
                    title: editedTitle,
                    description: editedDescription
                });
            
            } catch (error) {
                console.error('Error updating task:', error.response.data);
            }
        }
        setIsEditing(!isEditing);
    };

    const handleMarkDone = (e) => {
        e.preventDefault();
        dispatch({
            type: "MARK_DONE",
            id
        });
    };

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setEditedDescription(e.target.value);
    };

    return (
        <div className='task-card flex flex-col items-center bg-gray-100 rounded-lg shadow-md mb-4 p-4 w-1/4'>
            <div className="task-info text-base flex-1">
                {isEditing ? (
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={handleTitleChange}
                        className="task-title-edit text-lg capitalize font-medium mb-1 p-1 border rounded w-full"
                    />
                ) : (
                    <h4 className="task-title text-lg capitalize font-medium mb-1">{task.title}</h4>
                )}
                {isEditing ? (
                    <textarea
                        value={editedDescription}
                        onChange={handleDescriptionChange}
                        className="task-description-edit text-gray-800 mb-2 p-1 border rounded w-full"
                        rows="3"
                    />
                ) : (
                    <p className="task-description text-gray-800 mb-2">{task.description}</p>
                )}
                <div className='text-sm text-gray-500 italic'>
                    {task?.createdAt ? (
                        <p>{moment(task.createdAt).fromNow()}</p>
                    ) : (
                        <p>just now</p>
                    )}
                </div>
            </div>
            <div className="flex justify-between items-center w-full mt-4">
                <button
                    onClick={handleRemove}
                    className="rounded-md bg-red-500 px-3 py-2 text-white focus:bg-red-600 focus:outline-none"
                >
                    Delete
                </button>
                <button
                    onClick={handleEdit}
                    className={`rounded-md ${isEditing ? 'bg-green-500' : 'bg-blue-500'} px-3 py-2 text-white focus:outline-none`}
                >
                    {isEditing ? 'Save' : 'Edit'}
                </button>
            </div>
        </div>
    );
}

export default Task;
