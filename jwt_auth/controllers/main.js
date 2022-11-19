const  errors = require("../errors/errors")
const jwt = require("jsonwebtoken")

const login = async(req, res)=>{
    const {username, password} = req.body
    if(!username || !password){
        throw new errors.BadRequestError("Username and password must be included")
    }
    else{
        const id = new Date().getDate()
        const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'})
        res.status(200)
        res.json({msg: "user signed in", token})
    }
}

const dashboard = async(req,res)=>{
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200)
    res.json({
        msg: `Hi, ${req.user.username}!`,
        secret: `Lucky number is ${luckyNumber}`
    })
}

module.exports = {
    login,
    dashboard
}