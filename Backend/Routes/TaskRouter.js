const express = require("express");
const { createTask,fetchAllTasks,updateTaskById,deleteTaskById } = require("../Controllers/TaskController");
const router = express.Router();

//Get(Display) All Task
router.get('/',fetchAllTasks);

//Create All Task
router.post('/',createTask);

//Update All Task
router.put('/:id',updateTaskById);

//Delete All Task
router.delete('/:id',deleteTaskById);

module.exports = router;

/* (req, res) => {
    res.send('Task Router is Working');
}*/