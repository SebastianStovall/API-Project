const express = require('express')
const { Op } = require('sequelize');

const { setTokenCookie, restoreUser } = require('../../utils/auth'); //import for auth functions
const { Spot } = require('../../db/models');

const { check } = require('express-validator'); //imports for validator
const { handleValidationErrors } = require('../../utils/validation'); //this function is written in utils/validation.js

const router = express.Router();

router.get('/', async(req, res) => {
    const allSpots = await Spot.findAll()
    res.json(allSpots)
})

module.exports = router;
