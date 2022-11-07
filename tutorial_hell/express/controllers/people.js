let {people} = require('../data')


const getPeople = (req,res)=>{
    res.status(200)
    res.json({success: true, data: people})
}

const getPerson = (req,res)=>{
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
}

const createPerson = (req,res)=>{
    const { name } = req.body
    if (!name) {
        return res
        .status(400)
        .json({ success: false, msg: 'please provide name value' })
    }
    res.status(201).json({ success: true, person: name })
}

const updatePerson = (req,res)=>{
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
}

const deletePerson = (req,res)=>{
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
}

module.exports = {
    getPerson,
    getPeople,
    createPerson,
    updatePerson,
    deletePerson
}