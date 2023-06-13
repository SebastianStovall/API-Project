const express = require('express')
const { Op } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth, getCurrentUser } = require('../../utils/auth'); //import for auth functions
const { Spot, sequelize, Review, SpotImage } = require('../../db/models');

const { check } = require('express-validator'); //imports for validator
const { handleValidationErrors } = require('../../utils/validation'); //this function is written in utils/validation.js

const router = express.Router();

const validateSpot = [
    check('address')
    .exists({checkFalsy: true})
    .withMessage('Street address is required')
    .custom(async (value) => {
        const doesAddressExist = await Spot.findOne({
            where: {
                address: value
            }
        })
        if(doesAddressExist) {
            throw new Error('Address must be unique');
        }
    }),
    check('city')
    .exists({checkFalsy: true})
    .withMessage('City is required'),
    check('state')
    .exists({checkFalsy: true})
    .withMessage('State is required')
    .custom(async (value) => {
        if(value.length !== 2 || value !== value.toUpperCase()) throw new Error('State must be in the format of two uppercase letters (e.g., NY)')
    }),
    check('country')
    .exists({checkFalsy: true})
    .withMessage('Country is required'),
    check('lat')
    .exists({checkFalsy: true})
    .withMessage('Latitude is not valid'),
    check('lng')
    .exists({checkFalsy: true})
    .withMessage('Longitude is not valid'),
    check('name')
    .exists({checkFalsy: true})
    .withMessage('please provide a name for the location'),
    check('description')
    .exists({checkFalsy: true})
    .withMessage('Description is required'),
    check('price')
    .exists({checkFalsy: true})
    .withMessage('Price per day is required')
    .custom(async (value) => {
        if(typeof value !== 'number') throw new Error('price must be a decimal value (e.g., 58.00)')
    }),
    handleValidationErrors
];


router.get('/', async(req, res) => {
    const allSpots = await Spot.findAll({
        attributes: [
            'id',
            'address',
            'city',
            'state',
            'country',
            'lat',
            'lng',
            'name',
            'description',
            'price',
            'createdAt',
            'updatedAt',
            [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
        ],
        include: [{model: Review, attributes: []}],
        group: 'Reviews.id'
    })


    // need to use Promise.all for the array of promises
    const modifiedSpots = await Promise.all( allSpots.map(async spot => {
        spot = spot.toJSON()
        let previewImg = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                spotId: spot.id
            }
        })

        if(previewImg !== null) previewImg = previewImg.url // if its not null, we cant key into its property, so check its value before assigning the KVP
        spot.previewImage = previewImg
        return spot
    }) )

    res.json({ Spots: modifiedSpots })

})

router.post('/', requireAuth, getCurrentUser, validateSpot, async(req,res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body

    try {
        const newSpot = await Spot.create({
            ownerId: req.currentUser.data.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
        res.json(newSpot)
    }

    catch (e) {
        const errors = {}
        e.errors.forEach(error => {
            const path = error.path
            console.log(error.message)
            errors[path] = error.message
        })
        res.status(400)
        res.json({
            message: 'Bad Request',
            errors: errors
        })
    }

})

module.exports = router;
