const express = require('express')
const path = require('path')

const app = express()

app.use(express.static('./tutorial_hell/express/public'))

/*
app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './tutorial_hell/express/navbar-app/index.html'))
    TWO OPTIONS FOR HTML:
    1. serve as static asset
    2. SSR
})
*/ 

app.all('*', (req,res)=>{
    res.status(404)
    res.send("<h1>404 Page Not Found</h1>")
})

app.listen(4080, ()=>{
    console.log('server listening on http://localhost:4080')
})