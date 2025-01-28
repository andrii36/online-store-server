const {Schema, model} = require('mongoose')

const AnnouncementSchema = new Schema({
    companyId: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: String, required: true},
    departments: {type: Array, required: true}
})

module.exports = model('Announcement', AnnouncementSchema)