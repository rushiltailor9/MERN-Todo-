const express = require("express");
const { createTask,fetchAllTasks,updateTaskById,deleteTaskById } = require("../Controllers/TaskController");
const router = express.Router();

//Get All Task
router.get('/',fetchAllTasks);

//Create All Task
router.post('/',createTask);

//Create All Task
router.put('/:id',updateTaskById);

//Create All Task
router.delete('/:id',deleteTaskById);

module.exports = router;

/* (req, res) => {
    res.send('Task Router is Working');
}*/