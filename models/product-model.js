const {Schema, model} = require('mongoose')

const ProductSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    itemsSold: {type: String, required: true},
    available: {type: String, required: true},
    rating: {type: Number},
    gender: {type: String},
    price: {type: String, required: true},
    image: {type: String}
})

module.exports = model('Product', ProductSchema)