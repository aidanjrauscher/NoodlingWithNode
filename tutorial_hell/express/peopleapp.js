const express = require('express')
const morgan = require('morgan')
let {products, people} = require('./data')

const app = express()

app.use(express.static('./methods-public'), morgan('tiny'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.post('/login', (req,res)=>{
    const {name} = req.body 
    if(name){
        res.status(200)
        res.send(`Welcome ${name}`)
    }
    else{
        res.status(404)
        res.send('Please Provide Valid Credentials')
    }

})

app.get('/api/people', (req,res)=>{
    res.status(200)
    res.json({success:true, data:people})
})

app.post('/api/people', (req,res)=>{
    const {name} = req.body
    let sortedPeople = people.slice()
    sortedPeople = sortedPeople.sort((person1, person2)=>{
        return person2.id-person1.id
    })
    const maxID = sortedPeople[0].id
    if(name){
        res.status(200)
        res.json({success:true, data: [...people, {id: maxID+1, name: name,}]})
    }
    else{
        res.status(400)
        res.json({success:false, msg: 'Please provide a name.'})
    }
})

app.get('/api/people/:personID', (req,res)=>{
    const personID = req.params.personID
    const person = people.find((person)=> person.id == personID)
    if(person){
        res.status(200)
        res.json({success:true, data:person})
    }
    else{
        res.status(404)
        res.json({success:false, data:[]})
    }
})

app.put('/api/people/:personID', (req,res)=>{
    const {personID} = req.params
    const {name} = req.body
    const person = people.find((person)=> person.id == personID)
    if(person){
        const updatedPeople = people.map((person)=>{
            if(person.id == personID){
                person.name = name
            }
            return person
        })
        res.status(200)
        res.json({success: true, data: updatedPeople})
    }
    else{
        res.status(404)
        res.json({success:false, msg: `no person with id ${personID}`})
    }
})

app.delete('/api/people/:personID', (req,res)=>{
    const {personID} = req.params
    const person = people.find((person)=> person.id == personID)
    if(person){
        const updatedPeople = people.filter((person)=>{
            if(person.id == personID){
                return false
            }
            else{
                return true
            }
        })
        res.status(200)
        res.json({success: true, data: updatedPeople})
    }
    else{
        res.status(404)
        res.json({success: false, msg: `person with id ${personID} does not exist`})
    }

})


app.all('*', (req, res)=>{
    res.send("<h1>404 Page Not Found</h1>")
})

app.listen(4080, ()=>{
    console.log('server listening on http://localhost:4080')
})