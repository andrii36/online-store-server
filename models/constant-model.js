const {Schema, model} = require('mongoose')

const ConstantSchema = new Schema({
    name: {type: String, required: true, unique: true},
    list: {type: Array, required: true},
})

module.exports = model('Constant', ConstantSchema)