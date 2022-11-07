const http = require('http')

const server = http.createServer()

server.on('request', (req, res)=>{
    res.end("hello world")
})

server.listen(4080, ()=>{
    console.log("server listening on http://localhost:4080")
})