const express = require('express')

const router = express.Router()

router.post('/', (req,res)=>{
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

module.exports = router