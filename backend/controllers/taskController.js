import Task from "../models/Task.js";


export const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, userId: req.userId });
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(400).json({ msg: "Could not create task", error: error.message });
  }
};


export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ msg: "Server error while fetching tasks" });
  }
};


export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { 
      new: true,
      runValidators: true
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(400).json({ msg: "Update failed", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.status(200).json({ msg: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ msg: "Delete failed" });
  }
};