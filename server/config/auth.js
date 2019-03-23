var express = require('express')
var router = express.Router()
const jwt = require('jsonwebtoken')

const auth = router.use((req, res, next) => {
    // CORS preflight request
    if (req.method === 'OPTIONS') {
        next()
    } else {
                    
        if (!req.headers.cookie) {
            return res.status(403).send('No token provided.')
        }
        let token = req.headers.cookie.replace('_sim-ad=', '')
        jwt.verify(token, process.env.AUTHSECRET, function (err, decoded) {            
            if (err) {
                console.log('token expired!!!!')
                return res.status(403).send(err)          
            } else {
                req.decoded = decoded                
                next()
            }
        })
    }
})

module.exports = { auth }