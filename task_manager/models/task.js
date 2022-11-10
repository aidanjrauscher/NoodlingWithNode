const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Task must have a name."],
        trim: true,
        max: [128, "Task name cannot be longer than 128 characters."]
    },
    completed: {
        type: Boolean,
        default: false
    }


})

module.exports = mongoose.model('Task', TaskSchema)