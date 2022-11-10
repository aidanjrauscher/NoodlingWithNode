const errorHandler = (err, req, res, next)=>{
    console.log(err)
    res.status(err.status)
    res.json({msg: err.message})
    return res


}


module.exports = errorHandler