const mongoose = require('mongoose')

const connectDB = (url)=>{
    mongoose.connect(url, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    })
    
    return mongoose.connection
}

module.exports = connectDB
