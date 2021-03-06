const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

        if (!token) {
            return res.status(401).json({ message: 'No auth' })
        }

        const decoded = jwt.verify(token, process.env.jwtSecret)
        req.user = decoded
        next()

    } catch (e) {
        res.status(401).json({message: 'No auth'})
    }
}