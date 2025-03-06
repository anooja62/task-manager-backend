import Task from "../models/Task.js";

// Create Task
export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = new Task({ user: req.user.id, title, description });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get User Tasks
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete Task
export const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
