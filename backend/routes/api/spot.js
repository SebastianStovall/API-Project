const express = require('express')
const { Op } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth, getCurrentUser } = require('../../utils/auth'); //import for auth functions
const { Spot, sequelize, Review, SpotImage, User } = require('../../db/models');

const { check } = require('express-validator'); //imports for validator
const { handleValidationErrors } = require('../../utils/validation'); //this function is written in utils/validation.js
const spot = require('../../db/models/spot');

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
            'ownerId',
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
        group: ['Spot.id', 'Reviews.id']
    })


    // need to use Promise.all for the array of promises
    const modifiedSpots = await Promise.all( allSpots.map(async spot => {
        spot = spot.toJSON()
        let previewImg = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                preview: true,
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
        res.status(201)
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


router.post('/:spotId/images', requireAuth, getCurrentUser, async(req,res) => {
    // req.user ---> gives you user info back
    const spot = await Spot.findByPk(req.params.spotId)
    const ownerId = spot.ownerId

    if(ownerId !== req.currentUser.data.id) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found"
        })
    }

    const { url, preview } = req.body
    const newImage = await SpotImage.create({
        spotId: spot.id,
        url,
        preview
    })

    console.log(newImage.toJSON())
    res.json({
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
    })
})


router.get('/current', requireAuth, async(req,res) => {

    const spotsOwnedByUser = await req.user.getSpots({
        attributes: [
            'id',
            'ownerId',
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
        group: ['Spot.id', 'Reviews.id']
    });


    const modifiedSpots = await Promise.all( spotsOwnedByUser.map(async spot => {
        spot = spot.toJSON()
        let previewImg = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                preview: true,
                spotId: spot.id
            }
        })

        if(previewImg !== null) previewImg = previewImg.url // if its not null, we cant key into its property, so check its value before assigning the KVP
        spot.previewImage = previewImg
        return spot
    }) )

    res.json({Spots: modifiedSpots})

})


router.get('/:spotId', async(req,res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        attributes: [
            'id',
            'ownerId',
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
            [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating']
        ],
        include: [{model: Review, attributes: []}, {model: User, attributes: ['id', 'firstName', 'lastName']}],
        group: ['Spot.id', 'Reviews.id', 'User.id']
    })

    if(!spot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found"
        })
    }

    // use for numReviews KVP
    const spotReviews = await spot.countReviews()
    // use for SpotImages KVP
    const spotImages = await spot.getSpotImages({
        attributes: {
            exclude: ['spotId', 'createdAt', 'updatedAt']
        }
    })
    // use for Owner KVP
    // const spotOwner = await spot.getUser()
    // res.json(spotOwner)

    let spotPOJO = spot.toJSON()
    spotPOJO.numReviews = spotReviews
    spotPOJO.SpotImages = spotImages

    // for aliasing User key as Owner key
    spotPOJO.Owner = spotPOJO.User
    delete spotPOJO.User

    res.json(spotPOJO)

})


router.put('/:spotId', requireAuth, validateSpot, async(req,res) => {

    const spot = await Spot.findByPk(req.params.spotId)
    const ownerId = spot.ownerId

    if(ownerId !== req.user.id) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found"
        })
    }

    const {address, city, state, country, lat, lng, name, description, price} = req.body
    if(spot) {
        spot.set({
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

        await spot.save()
        return res.json(spot)

    } else {
        res.status(404)
        res.json({
            message: "Spot couldn't be found"
        })
    }

})


router.delete('/:spotId', requireAuth, async(req,res) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if(!spot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found"
        })
    } else if (spot.ownerId !== req.user.id) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found"
        })
    }

    if(spot) {
        await spot.destroy()
        res.json({
            message: "Successfully deleted"
        })
    }

})


module.exports = router;
