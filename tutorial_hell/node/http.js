const http = require('http')

const server = http.createServer((req, res)=>{
    if(req.url == '/' ){
        res.write("hello world")
        res.end()
    }
    else if(req.url == '/hi'){
        res.write("hi")
        res.end()
    }
    else{
        res.write("404")
        res.end()
    }
})

server.listen(4080)