const express = require('express')

const { restaurants } = require('../controllers/Restaurant')

const router = express.Router()

router.get('/getRestaurants', restaurants)

module.exports = router