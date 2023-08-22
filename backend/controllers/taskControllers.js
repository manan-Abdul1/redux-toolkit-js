const taskModel = require("../models/todoListSchema");
const { verifyToken } = require("../utils/jwt")
const createNewTask = async (req, res) => {
    try {
        const isVerified = verifyToken(req)
        if (!isVerified) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const newTask = new taskModel(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while creating the task" });
    }
}

const deleteTask = async (req, res) => {
    try {
        const isVerified = verifyToken(req)
        if (!isVerified) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const taskId = req.query.taskId;
        if (!taskId) {
            return res.status(400).json({ error: "taskId is required" });
        }

        const deletedTask = await taskModel.findOneAndDelete({ taskId });

        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json(deletedTask);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while deleting the task" });
    }
}

const completedTask = async (req, res) => {
    try {
        const isVerified = verifyToken(req)
        if (!isVerified) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const taskId = req.query.taskId;
        if (!taskId) {
            return res.status(400).json({ error: "taskId is required" });
        }

        const task = await taskModel.findOne({ taskId });

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        // Toggle the completed status in the database
        const updatedTask = await taskModel.findOneAndUpdate(
            { taskId },
            { completed: !task.completed }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        // Fetch the updated task to ensure the response reflects the updated status
        const finalUpdatedTask = await taskModel.findOne({ taskId });

        res.status(200).json(finalUpdatedTask);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while marking the task as completed" });
    }
}


const editTask = async (req, res) => {
    try {
        const isVerified = verifyToken(req)
        if (!isVerified) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const { taskId, description } = req.body;
        if (!taskId) {
            return res.status(400).json({ error: "taskId is required" });
        }
        if (!description) {
            return res.status(400).json({ error: "description is required" });
        }

        const updatedTask = await taskModel.findOneAndUpdate({ taskId }, { description });

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        // Fetch the updated task to ensure the response reflects the updated status
        const finalUpdatedTask = await taskModel.findOne({ taskId });

        res.status(200).json(finalUpdatedTask);
        // res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while marking the task as edited" });
    }
}

const getTasksByUserId = async (req, res) => {
    try {
        const isVerified = verifyToken(req)
        if (!isVerified) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }

        const tasks = await taskModel.find({ userId });

        if (tasks.length === 0) {
            return res.status(404).json({ error: "No tasks found for the given userId" });
        }

        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while fetching tasks" });
    }
}

module.exports = {
    createNewTask,
    deleteTask,
    completedTask,
    editTask,
    getTasksByUserId
};
