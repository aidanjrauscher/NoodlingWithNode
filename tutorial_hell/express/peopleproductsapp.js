const express = require('express')
const {products, people} = require('./data')

const app = express()

app.get('/',(req,res)=>{
    res.send(
        '<h1>Home</h1><br><a href="/api/products">products</a><br><a href="/api/people">people</a>')
})

app.get('/api/products', (req, res)=>{
    const basicProdInfo = products.map((product)=>{
        const {id, name, image} = product 
        return {id,name,image}
    })
    res.json(basicProdInfo)
})

app.get('/api/products/:prodID', (req, res)=>{
    const prodID = req.params.prodID
    const singleProdInfo = products.find((product)=>{
        return product.id == prodID
    })
    if(!singleProdInfo){
        res.status(404)
        res.send("<h1>404 Product Not Found</h1>")
    }
    else{
        res.json(singleProdInfo)
    }
})

app.get('/api/people', (req,res)=>{
    res.json(people)
})

app.get('/api/people/:personID', (req, res)=>{
    const personID = req.params.personID
    const person = people.find((person)=>{
        return person.id == personID
    })
    if(!person){
        res.status(404)
        res.send("<h1>404 Person Not Found</h1>")
    }
    else{
        res.json(person)
    }
})

app.get('/api/products/v1/query', (req, res)=>{
    const {search, limit} = req.query
    let queriedProducts = [...products]
    if(search){
        queriedProducts = queriedProducts.filter((product)=>{
            return product.name.startsWith(search)
        })
    }
    if(limit){
        queriedProducts = queriedProducts.slice(0, Number(limit))
    }
    if(queriedProducts.length<1){
        res.status(200)
        res.json({success:true, data:[]})
    }
    else{
        res.status(200)
        res.json(queriedProducts)
    }
})

app.all('*', (req, res)=>{
    res.send("<h1>404 Page Not Found</h1>")
})

app.listen(4080, ()=>{
    console.log('server listening on http://localhost:4080')
})