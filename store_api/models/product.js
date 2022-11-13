const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Product must have a name.']
    },
    price:{
        type: Number,
        required: [true, 'Product must have a price.']
    },
    featured: {
        type: Boolean, 
        default: false
    },
    rating:{
        type: Number, 
        default: 0
    },
    createdAt: {
        type: Date, 
        default: Date.now()
    },
    company:{
        type: String,
        enum: {
            values: ['ikea', "liddy", "caressa", "marcos"],
            message: '{VALUE} is not a valid company.'
        }
    }
})

module.exports = mongoose.model('Product', productSchema)