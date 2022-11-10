const connectDB = require('./db/connect')
const express = require('express')
const taskRoutes = require('./routes/tasks')
const notFound = require('./middleware/404')
const errorHandler = require('./middleware/error')
require('dotenv').config()



const app = express()
const port = process.env.PORT || 3000

//middleware
app.use(express.json())
app.use(express.static('./public'))
app.use('/api/v1/tasks', taskRoutes)
app.use(notFound)
app.use(errorHandler)

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