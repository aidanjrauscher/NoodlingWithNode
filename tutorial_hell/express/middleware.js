const express = require('express')
const logReqInfo = require('./logger')
const auth = require('./auth')
const morgan = require('morgan')

const app = express()

//app.use([auth, logReqInfo])

app.use(morgan('tiny'))

app.get('/',(req,res)=>{
    res.send('<h1>Home Page</h1><a href="/about">About</a>')
})

app.get('/about',(req,res)=>{
    res.send('<h1>About Page</h1>')
})

app.all('*', (req, res)=>{
    res.send("<h1>404 Page Not Found</h1>")
})

app.listen(4080, ()=>{
    console.log('server listening on http://localhost:4080')
})