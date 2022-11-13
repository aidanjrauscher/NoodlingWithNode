const Product = require("../models/product")

const getAllProductsStatic = async(req, res)=>{
    const queries = req.query
    const {featured, name, company, price, rating, sort}= queries
    const products = await Product.find()
    res.status(200)
    res.json({
        numResults: products.length,
        products: products
    })
}

const getAllProducts = async(req, res)=>{
    const queries = req.query
    const {featured, name, company, price, rating, sort, fields, limit, page, numericFilters}= queries
    const queryProducts = {}
    if(featured){
        queryProducts.featured = featured === "true" ? true : false
    }
    if(company){
        queryProducts.company = company
    }
    if(name){
        queryProducts.name = {$regex:name, $options:'i'}
    }
    if(numericFilters){
        const operatorMap = {
            ">":"$gt",
            ">=":"$gte", 
            "=":"$eq",
            "<":"$lt",
            "<=":"$lte"
        }
        const regEx = /\b(<|>|=|>=|<=)\b/g
        let filters = numericFilters.replace(
            regEx, 
            (match)=>`-${operatorMap[match]}-`
        )
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item)=>{
            const [field, operator, value] = item.split('-')
            if(options.includes(field)){
                queryProducts[field] = {[operator]: Number(value)}
            }
        })
    }
    let result = Product.find(queryProducts)
    if(sort){
        const sortParams = sort.split(',').join(' ')
        result = result.sort(sortParams)
    }
    else{
        result = result.sort("createdAt")
    }
    if(fields){
        const fieldParams = fields.split(',').join(' ')
        result = result.select(fieldParams)
    }
    let limitNum = parseInt(limit) || 10
    let pageNum = parseInt(page) || 1
    const pageOffset = (pageNum - 1) * limitNum
    result = result.skip(pageOffset).limit(limitNum)

    const products = await result
    res.status(200)
    res.json({
        numResults: products.length,
        products: products
    })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}