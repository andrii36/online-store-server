const {Schema, model} = require('mongoose')

const FleetSchema = new Schema({
    company: {type: Object, requred: true},
    make: {type: String, required: true},
    model: {type: String, required: true},
    year: {type: String, required: true},
    type: {type: String, required: true},
    unitNumber: {type: String},
    image: {type: String, default: "https://t4.ftcdn.net/jpg/04/96/47/13/360_F_496471319_DbtjoUvKqyy2e9OfgBnK5mm2AXhKpa9m.jpg"},
    serviceHistory: {type: Array},
})

module.exports = model('Fleet', FleetSchema)