const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: true},
    userName: {type: String, required: true},
    date: {type: Date, default: Date.now},
    role: {type: String, default: "user"},
    position: {type: String, required: true},
    department: {type: Array, required: true},
    company: {type: Object, requred: true},
    image: {type: String, default: "https://i.pinimg.com/564x/3f/9f/5b/3f9f5b8c9f31ce16c79d48b9eeda4de0.jpg"},
    tasks: {type: Array}
})

module.exports = model('User', UserSchema)