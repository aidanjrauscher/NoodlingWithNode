const express = require('express')

const app = express()

app.get('/', (req, res)=>{
    res.status(200)
    res.send("<h1>Home Page</h1>")
})

app.get('/about', (req, res)=>{
    res.status(200)
    res.send("<h1>About Page</h1>")
})

app.all('*',(req, res)=>{
    res.status(404)
    res.send("<h1>404 Page Not Found</h1>")
})

app.listen(4080, ()=>{
    console.log('server listening on http://localhost:4080')
})