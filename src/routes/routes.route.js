const express = require('express')
const authLoginRoutes = require('./login.route')

const router = express.Router()

router.use(authLoginRoutes)

module.exports = router
