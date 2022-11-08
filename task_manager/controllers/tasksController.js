const getAllTasks = (req, res)=>{
    res.send('get all tasks')
}

const addTask = (req,res)=>{
    const body = req.body
    res.send('add task')
}

const getSingleTask = (req, res)=>{
    const taskID = req.params.taskID
    res.send('get single task')
}

const editTask = (req, res)=>{
    const taskID = req.params.taskID
    res.send('edit task')
}

const deleteTask = (req, res)=>{
    const taskID = req.params.taskID
    res.send('delete task')
}

module.exports = {
    getAllTasks,
    addTask,
    getSingleTask,
    editTask,
    deleteTask
}