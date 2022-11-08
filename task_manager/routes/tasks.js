const express = require('express')
const tasksController = require('../controllers/tasksController')
const router = express.Router()

router.route('/')
    .get(tasksController.getAllTasks)
    .post(tasksController.addTask)

router.route('/:taskID')
    .get(tasksController.getSingleTask)
    .patch(tasksController.editTask)
    .delete(tasksController.deleteTask)



module.exports = router