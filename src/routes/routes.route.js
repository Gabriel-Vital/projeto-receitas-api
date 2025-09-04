const express = require('express')
const authLoginRoutes = require('./login.route')
const recipes = require('./recipes.route')

const router = express.Router()

router.use(authLoginRoutes)
router.use(recipes)

module.exports = router
