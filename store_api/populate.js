require('dotenv').config()

const connectDB = require("./db/connect")
const Product = require("./models/product")
const products = require("./products.json")


const populate = async()=>{
    try{
        await connectDB(process.env.MONGODB_URI)
        await Product.deleteMany()
        await Product.create(products)
        process.exit(0)
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}

populate()