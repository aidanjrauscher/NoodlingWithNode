const http = require('http')
const {readFileSync} = require('fs')

const indexPage = readFileSync('./navbar-app/index.html')
const styles = readFileSync('./navbar-app/styles.css')
const logo = readFileSync('./navbar-app/logo.svg')
const browserApp = readFileSync('./navbar-app/browser-app.js')

const server = http.createServer((req, res)=>{
    const url = req.url
    if(url === '/'){
        res.writeHead(200, {'content-type':'text/html'})
        res.write(indexPage)
        res.end()
    }
    else if (url === '/about') {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write('<h1>about page</h1>')
        res.end()
    }
    else if (url === '/styles.css'){
        res.writeHead(200, { 'content-type': 'text/css' })
        res.write(styles)
        res.end()
    }
    else if (url === '/logo.svg'){
        res.writeHead(200, {'content-type':'image/svg+xml'})
        res.write(logo)
        res.end()
    }
    else if (url === '/browser-app.js'){
        res.writeHead(200, { 'content-type': 'text/javascript' })
        res.write(browserApp)
        res.end()
    }
    else{
        res.writeHead(404, {'content-type':'text/html'})
        res.write("<h1>page not found</h1>")
        res.end()
    }
})

server.listen(4080, ()=>{
    console.log("server is listening on http://localhost:4080")
})