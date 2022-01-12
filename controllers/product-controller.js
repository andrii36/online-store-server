const Product = require('../models/product-model')

class ProductController {
    async addProduct(req, res, next){
        try {
            const result = await Product.create(req.body.formData)
            if(result){
                res.status(200).json({code: 0, message: "Product created"})
            }
        } catch (error) {
            res.status(500).json({code: 1, message: "Failed"})
        }
    }
    async updateProduct(req, res, next){
        try {
            const result = await Product.findOneAndUpdate(
                {_id: req.query.id},
                req.body.formData,
                {new: true}
            )
            if(result){
                res.status(200).json({code: 0, message: "Product updated"})
            }
        } catch (error) {
            res.status(500).json({code: 1, message: "Server error, please try again later"})
        }
    }
    async getAllProducts(req, res){
        const products = await Product.find({})
        res.status(200).json(products)
    }
    async getOneProduct(req, res){
        try{
            const product = await Product.findById(req.query.id)
            res.status(200).json(product)
        }catch(err){
            res.status(404).json({code: 1, message: "Not found"})
        }
    }
    async getSearchProducts(req, res){
        const title = req.body.config.title
        const regex = new RegExp(title)
        const config = {...req.body.config}
        let products = await Product.find({
            ...config,
            title: {$regex: regex, $options: 'i'
        }})
        if(config.priceFrom) products = products.filter(product => Number(product.price) >= priceFrom)
        if(config.priceTo) products = products.filter(product => Number(product.price) <= priceTo)
        res.status(200).json(products)
    }
    async getAdvancedSearchProducts(req, res){
        const priceFrom = req.body.formArr.priceFrom
        const priceTo = req.body.formArr.priceTo
        let products = await Product.find(req.body.formArr)
        if(priceFrom){
            products = products.filter(product => Number(product.price) >= priceFrom)
        }
        if(priceTo){
            products = products.filter(product => Number(product.price) <= priceTo)
        }
        res.status(200).json(products)
    }
    async deleteProduct(req, res){
        try{
            await Product.deleteOne({_id: req.body.id})
            res.status(200).json({code: 0, message: "Item deleted successfully"})
        }catch(error){
            res.status(500).json({code: 1, message: "Error on server, try again later"})
        }
    }
}

module.exports = new ProductController()