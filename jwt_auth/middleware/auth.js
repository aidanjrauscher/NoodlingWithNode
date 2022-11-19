const  errors = require("../errors/errors")
const jwt = require("jsonwebtoken")

const authenticationMiddleware = async(req, res, next)=>{
    const authToken = req.headers.authorization
    if(!authToken || !authToken.startsWith("Bearer ")){
        throw new errors.UnauthorizedError("Request did not include valid token")
    }
    else{
        const token = authToken.split(' ')[1]
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const {id, username} = decoded
            req.user = {id, username}
        }
        catch(error){
            throw new errors.UnauthorizedError("Not authorized to access this route.")
        }
        
    }
    next()
}

module.exports = authenticationMiddleware