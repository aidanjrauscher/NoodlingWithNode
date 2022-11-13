require('dotenv').config()
require('express-async-errors')

const express = require('express')
const connectDB = require("./db/connect")
const productRouter = require("./routes/products")

const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')


const port = process.env.PORT || 3000
const app = express()

//middleware
app.use(express.json())

//routes
app.get('/', (req,res)=>{
    res.status(200)
    res.send("<h1>Store</h1><a href='/api/v1/products'>Store API</a>")
})

app.use('/api/v1/products', productRouter)

//error middleware
app.use(errorHandler)
app.use(notFound)



const startApp = async()=>{
    try{
        await connectDB(process.env.MONGODB_URI)
        app.listen(port,()=>{
            console.log(`server listening on http://localhost:${port}`)

        })
    }
    catch(error){
        console.log(`server failed to start: ${error}`)
    }
}

startApp()