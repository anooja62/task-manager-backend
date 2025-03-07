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

// Edit (Update) Task
export const updateTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Ensure the logged-in user owns the task
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Update task details
        task.title = title || task.title;
        task.description = description || task.description;
        await task.save();

        res.json({ message: "Task updated successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete Task
export const deleteTask = async (req, res) => {
    try {
       
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

     

       
        if (!task.user || task.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: Task does not belong to user" });
        }

 
        await Task.deleteOne({ _id: req.params.id });

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

