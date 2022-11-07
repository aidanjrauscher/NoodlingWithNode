const express = require('express')
const morgan = require('morgan')
let {people} = require('./tutorial_hell/express/data')

const peopleRouter = require('./routes/people')
const authRouter = require('./routes/auth')


const app = express()

app.use(express.static('./tutorial_hell/express/methods-public'), morgan('tiny'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/api/people', peopleRouter)
app.use('/login', authRouter)


app.all('*', (req, res)=>{
    res.send("<h1>404 Page Not Found</h1>")
})

app.listen(4080, ()=>{
    console.log('server listening on http://localhost:4080')
})