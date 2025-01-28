const Announcement = require('../models/announcement-model')

class AnnouncementController {
    async getAllAnnouncementsByCompany(req, res) {
        try {
            const announcements = await Announcement.find({ companyId: req.query.companyId })
            res.status(200).json(announcements)
        } catch (error) {
            res.status(400).json({ code: 1, message: "Bad request" })
        }
    }

    async createAnnouncement(req, res) {
        try {
            const announcement = await Announcement.create(req.body)
            res.status(200).json(announcement)
        } catch (error) {
            res.status(400).json({ code: 1, message: error.message })
        }
    }

    async updateAnnouncement(req, res) {
        try {
            const announcement = await Announcement.findOneAndUpdate(
                { _id: req.query.id },
                req.body,
                { new: true }
            )
            res.status(200).json(announcement)
        } catch (error) {
            res.status(400).json({ code: 1, message: error.message })
        }
    }

    async removeAnnouncement(req, res) {
        try {
            await Announcement.findOneAndDelete({_id: req.query.id})
            res.status(200).send('Item successfully removed')
        } catch (error) {
            res.status(400).json({ code: 1, message: error.message })
        }
    }
}

module.exports = new AnnouncementController()