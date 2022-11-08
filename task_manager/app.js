const connectDB = require('./db/connect')
const express = require('express')
const taskRoutes = require('./routes/tasks')
require('dotenv').config()



const app = express()
const port = 3000

//middleware
app.use(express.json())
app.use(express.static('./public'))
app.use('/api/v1/tasks', taskRoutes)

/*
app.get('/api/v1/tasks')
app.post('/api/v1/tasks')
app.get('/api/v1/tasks/:id')
app.patch('/api/v1/tasks/:id')
app.delete('/api/v1/tasks/:id')
*/
const start = async()=>{
    try{
        await connectDB(process.env.MONGODB_CONNECTION)
        app.listen(3000,()=>{
            console.log(`Server listening on http://localhost:${port}`)
        })
    }
    catch(error){
        console.log(`Failed to connect to DB: ${error}`)
    }
}

start()