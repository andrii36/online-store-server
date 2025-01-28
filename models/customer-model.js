const {Schema, model} = require('mongoose')

const CustomerSchema = new Schema({
    name: {type: String, required: true, unique: true},
    isActive: {type: Boolean, default: true},
    customerSince: {type: Date, default: Date.now},
    businessType: {type: Array, required: true},
    users: {type: Array},
    departments: {type: Array},
    services: {type: Array},
})

module.exports = model('Customer', CustomerSchema)