import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import { createTransport } from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();
const sendMail = (email, subject, title, description) => {
    var transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: 'charuprabha228@gmail.com',
        to: email,
        subject: subject,
        html: `<h1>Task added successfully</h1><h2>Title: ${title}</h2><h3>Description: ${description}</h3>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
const addTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;
    const user = await userModel.find({ _id: userId });
    const newTask = new taskModel({ title, description, completed: false, userId })
    newTask.save()
        .then(() => {
            sendMail(user[0].email, "Task Added", title, description)
            return (res.status(200).json({ message: "Task added successfully" }))
        })
        .catch((error) => {
            return (
                res.status(500).json({ message: error.message })
            )
        }
        )
}



/*
method  :GET
http://localhost:8000/api/task/removeTask
{
    "id":"65ed7a9b64e012dff27fd44a"
}
add header Authorization:Bearer eyJhdthrt
*/
const removeTask = (req, res) => {
    const { id } = req.body;
    console.log("id: ", id);
    taskModel.findByIdAndDelete(id)
        .then(() => res.status(200).json({ message: "Task deleted successfully" }))
        .catch((error) => res.status(501).json({ message: error.message }))
}

const getTask = (req, res) => {
    taskModel.find({ userId: req.user.id })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(501).json({ message: error.message }))
}

/*
METHOD:PUT
 http://localhost:8000/api/task/tasks/65ed7a9064e012dff27fd447
{
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "completed": true
}

add header Authorization:Bearer eyJhdthrt
*/
const updateTask = async (req, res) => {
    const id = req.params.id; // Get id from URL params
    const { title, description, completed } = req.body;
    const userId = req.user.id;
    console.log(id);

    try {
        // Find the task by ID and user ID
        const task = await taskModel.findOne({ _id: id, userId });

        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        // Update the task
        task.title = title;
        task.description = description;
        task.completed = completed;

        await task.save();

        return res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



export { addTask, getTask, removeTask, updateTask }
