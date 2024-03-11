import React, { useState } from 'react';
import { useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import axios from "../../Axios/axios.js";
// import "./createTask.css";

function CreateTask() {
    const { dispatch } = useContext(TaskContext);
    const { userToken } = useContext(TokenContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/task/addTask", { title, description }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
        } catch (error) {
            console.log(error);
        }
        dispatch({
            type: "ADD_TASK",
            title,
            description
        });
        setTitle("");
        setDescription("");
    };

    return (
        <div className="addContainer md:w-1/3 md:mx-auto mx-3 mt-3 flex justify-center">
            <div className="w-full  bg-gray-300 rounded p-6 h-1/2">
                <form onSubmit={handleAdd}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            className="border-b-2 border-gray-400 py-2 px-3 placeholder-gray-300 outline-none focus:border-gray-700 w-full"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            className="border-b-2 border-gray-400 py-2 px-3 placeholder-gray-300 outline-none focus:border-gray-700 w-full"
                        />
                    </div>
                    <div className="text-right">
                        <button type="submit" className="border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline">
                            ADD
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateTask;
