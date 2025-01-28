const Fleet = require('../models/fleet-model');

class VehicleController {

    async getAllCompanyFleet(req, res) {
        // receives req.body {company: {id: '', name: ''}}
        try {
            const fleet = await Fleet.find({ company: req.body.company })
            res.status(200).json(fleet)
        } catch (error) {
            res.status(400).json({code: 1, message: "Bad request"})
        }
    }

    async updateVehicleData(req, res, next) {
        try {
            const result = await Fleet.findOneAndUpdate(
                { _id: req.query.id },
                {serviceHistory: req.body},
                { new: true }
            )
            if (result) {
                res.status(200).json({ code: 0, message: "Service history updated", updatedVehicle: result })
            }
        } catch (error) {
            res.status(500).json({ code: 1, message: "Server error, please try again later" })
        }
    }
}

module.exports = new VehicleController()