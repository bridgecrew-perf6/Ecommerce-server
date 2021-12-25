const jwt = require('jsonwebtoken')
require("dotenv").config()
const auth = (req, res, next) => {
    try {
   
        const header = req.header("Authorization")
        if (header === undefined) {
            return res.status(400).json({ success: false, message: "invalid Authentication " })
        }
        else {

            const [bearer, token] = header.split(" ")
            if (!token) return res.status(400).json({ success: false, message: "invalid Authentication " })
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ message: "invalid Authentication" })
                req.user = user
                next()
            })
        }

    
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

module.exports = { auth }