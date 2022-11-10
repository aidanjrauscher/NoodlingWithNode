const Task = require('../models/task')
const asyncWrapper = require("../middleware/async.js")

const getAllTasks = asyncWrapper(async (req, res)=>{
        const tasks = await Task.find()
        res.status(200)
        res.json({tasks})

})

const addTask = asyncWrapper(async (req,res)=>{
    const task = await Task.create(req.body)
    res.status(201)
    res.json({task})
})

const getSingleTask = asyncWrapper(async (req, res, next)=>{
    const { taskID: taskID } = req.params
    const task = await Task.findOne({_id:taskID})
    if(!task){
        const error = new Error('Task Not Found')
        error.status = 404
        return next(error)
    }
    else{
        res.status(200)
        res.json({task})
    }
})

const editTask = asyncWrapper(async (req, res)=>{
    const {taskID:taskID} = req.params
    const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
        new: true, 
        runValidators: true
    })
    if(!task){
        const error = new Error('Task Not Found')
        error.status = 404
        return next(error)
    }
    else{
        res.status(200)
        res.send({task})
    }
})

const deleteTask = asyncWrapper( async (req, res)=>{
    const {taskID: taskID} = req.params
    const task = await Task.findOneAndDelete({_id:taskID}, {
        useFindAndModify: false
    })
    if(!task){
        const error = new Error('Task Not Found')
        error.status = 404
        return next(error)
    }
    else{
        res.status(200)
        res.json({task})
    }
})

module.exports = {
    getAllTasks,
    addTask,
    getSingleTask,
    editTask,
    deleteTask
}