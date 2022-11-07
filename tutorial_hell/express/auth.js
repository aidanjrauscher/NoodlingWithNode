const auth = (req, res, next)=>{
    const {user} = req.query
    if(user == 'john'){
        req.user = {name: "john", id: 3}
        next()
    }
    else{
        res.status(404)
        res.send('<h1>Unauthorized</h1>')
        next()
    }
}

module.exports = auth