const TaskModel = require('../Modules/TaskModel');

//Create A Tasks
const createTask = async (req, res) => {
    const data = req.body;
    try {
        const model = new TaskModel(req.body);
        await model.save();
        res.status(200)
            .json({ message: 'Task is Created...', success: true });

    } catch (err) {
        res.status(500).json({ message: 'Failed To Create Task', success: false });
    }
}
//Fetch Tasks
const fetchAllTasks = async (req, res) => {
    try {
        const data = await TaskModel.find({});
        res.status(200)
            .json({ message: 'Task Fetched Successfully...', success: true, data });

    } catch (err) {
        res.status(500).json({ message: 'Task Is Not Fetched... ', success: false });
    }
}
//Update Task
const updateTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const obj = { $set: { ...body } };
        await TaskModel.findByIdAndUpdate(id, obj);
        res.status(200)
            .json({ message: 'Task Updated Successfully...', success: true });

    } catch (err) {
        res.status(500).json({ message: 'Failed To Updated The Task', success: false });
    }
}
//Delete Task
const deleteTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        await TaskModel.findByIdAndDelete(id);
        res.status(200)
            .json({ message: 'Task Is Deleted...', success: true });

    } catch (err) {
        res.status(500).json({ message: 'Failed To Delete Task', success: false });
    }
}

module.exports = {
    createTask,
    fetchAllTasks,
    updateTaskById,
    deleteTaskById
};