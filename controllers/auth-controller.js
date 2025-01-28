const User = require('../models/user-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class AuthController {
    async registration(req, res, next) {
        const emailExist = await User.findOne({ email: req.body.email })
        if (emailExist) return res.status(500).json({ code: 1, message: "Email already exists" })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user = new User({
            ...req.body,
            password: hashedPassword
        })

        try {
            await user.save()
            res.status(200).json({
                data: user,
                code: 0,
                massage: "User created"
            })
        } catch (error) {
            res.status(500).json({ code: 1, massage: "User registration failed. Try again later" })
        }
    }
    async login(req, res, next) {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).json({ code: 1, message: "You enter wrong login or password" })

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) return res.status(400).json({ code: 1, message: "You enter wrong login or password" })

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
        res.header('authtoken', token).json({
            token: token,
            code: 0,
            message: "Login success",
            data: user,
        })
    }
    async authme(req, res, next) {
        const token = req.headers.authtoken

        if (token) {
            let tokenPayload = token.split('.')[1]
            let decoded = JSON.parse(Buffer.from(tokenPayload, 'base64').toString('ascii'))
            const user = await User.findById(decoded._id)
            res.json({
                code: 0,
                data: user
            })
        } else {
            res.status(400).json({ code: 1, massage: "Not authorized" })
        }
    }
    async refresh(req, res, next) {
        try {

        } catch (error) {

        }
    }
}

module.exports = new AuthController()