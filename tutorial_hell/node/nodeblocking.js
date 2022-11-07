const http = require('http')

const server = http.createServer((req,res)=>{
    if(req.url === "/"){
        res.write("hello world")
        res.end()
    }
    else if(req.url === "/about"){
        for(let i=0; i<100001; i++){
            for(let j=0; j<100001; j++){
            }
        }
        res.end("about")
    }
    else{
        res.write("404")
        res.end()
    }
})

server.listen(4080, ()=>{
    console.log("Server listening on port 4080")
})