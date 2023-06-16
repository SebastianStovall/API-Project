const express = require('express')
const { Op } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth, getCurrentUser } = require('../../utils/auth'); //import for auth functions
const { Spot, sequelize, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');

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


const validateSpotEditOnly = [
    check('address')
    .exists({checkFalsy: true})
    .withMessage('Street address is required'),
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


const validateReview = [
    check('review')
    .exists({checkFalsy: true})
    .withMessage('Review text is required')
    .custom((async (value) => {
        if(value.length > 500) throw new Error('Message must not exceed 500 characters')
    })),
    check('stars')
    .exists({checkFalsy: true})
    .withMessage('Please provide a star rating')
    .custom(async (value) => {

        if( isNaN(value) ) throw new Error('Star rating must be a number between 1 and 5')

        if (value !== 1 && value !== 2 && value !== 3 && value !== 4 && value !==5 ) {
            throw new Error('Star rating must be a number between 1 and 5')
        }
    }),
    handleValidationErrors
];

const validateBooking = [
    check('startDate')
    .exists({checkFalsy: true})
    .withMessage('Start Date is required')
    .custom(async (value) => {
        const valueArr = value.split('-')
        if(valueArr[0].length !== 4 || valueArr[1].length !== 2 || valueArr[2].length !== 2 ) throw new Error("Please enter the date in the format 'YYYY-MM-DD'")
    }),
    check('endDate')
    .exists({checkFalsy: true})
    .withMessage('End Date is required')
    .custom(async (value, {req}) => {
        const valueArr = value.split('-')
        if(valueArr[0].length !== 4 || valueArr[1].length !== 2 || valueArr[2].length !== 2 ) throw new Error("Please enter the date in the format 'YYYY-MM-DD'")

        let startDateValue = req.body.startDate
        // requie the start date information by including it in params, then convert the date to a number and compare it against the end date number value
        const startDateNumber = parseInt(startDateValue.split("-").join(""))
        const endDateNumber = parseInt(value.split("-").join(""))
        if( endDateNumber <= startDateNumber ) throw new Error("endDate cannot be on or before startDate")
    }),
    handleValidationErrors
];


router.get('/', async(req, res) => {

    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query
    const pagination = {}

    let errorObj = {message: 'Bad Request', errors: {}}

    if(page < 1) {
        errorObj.errors.page = "Page must be greater than or equal to 1"
    }
    if(size < 1) {
        errorObj.errors.size = "Size must be greater than or equal to 1"
    }

    if( page > 10 || isNaN(Number(page)) || !page ) page = 1
    if( size > 20 || isNaN(Number(size)) || !size ) size = 20

    pagination.limit = size
    pagination.offset = size * (page - 1)

    if(maxLat && isNaN(Number(maxLat)) )  {
        errorObj.errors.minLat = "Maximum latitude is invalid"
    }
    if(minLat && isNaN(Number(minLat)) )  {
        errorObj.errors.minLat = "Minimum latitude is invalid"
    }
    if(minLng && isNaN(Number(minLng)) ) {
        errorObj.errors.minLng = "Minimum longitude is invalid"
    }
    if(maxLng && isNaN(Number(maxLng)) ) {
        errorObj.errors.maxLng = "Maximum longitude is invalid"
    }
    if(minPrice && isNaN(Number(minPrice)) || ( Number(minPrice) < 0 ) ) {
        errorObj.errors.minPrice = "Minimum price must be greater than or equal to 0"
    }
    if(maxPrice && isNaN(Number(maxPrice)) || (Number(maxPrice) < 0) ) {
        errorObj.errors.maxPrice = "Maximum price must be greater than or equal to 0"
    }


    if(Object.keys(errorObj.errors).length >= 1) {
        res.status(400)
        return res.json(errorObj)
    }

    const where = {}

    if(maxLat) {
        where.lat = {
            [Op.lte]: Number(maxLat)
        }
    }
    if(minLat) {
        where.lat = {
            ...where.lat,
            [Op.gte]: Number(minLat)
        }
    }
    if(maxLng) {
        where.lng = {
            [Op.lte]: Number(maxLng)
        }
    }
    if(minLng) {
        where.lng = {
            ...where.lng,
            [Op.gte]: Number(minLng)
        }
    }
    if(maxPrice) {
        where.price = {
            [Op.lte]: Number(maxPrice)
        }
    }
    if(minPrice) {
        where.price = {
            ...where.price,
            [Op.gte]: Number(minPrice)
        }
    }

    const allSpots = await Spot.findAll({
        where,
        ...pagination
    })


    const modifiedSpots = await Promise.all( await allSpots.map(async(spot) => {
        let sum = 0
        const allReviewsForSpot = await spot.getReviews()
        const totalNumReviews = await spot.countReviews()
        allReviewsForSpot.map((review) => {
            sum = sum + review.stars
            return
        })

        let previewImg = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                preview: true,
                spotId: spot.id
            }
        })

        spot = spot.toJSON()

        const average = Number((sum / totalNumReviews).toFixed(1))
        spot.avgRating = average

        if(previewImg !== null) previewImg = previewImg.url // if its not null, we cant key into its property, so check its value before assigning the KVP
        spot.previewImage = previewImg

        return spot;
    }))

    res.json({ Spots: modifiedSpots, page: Number(page), size: Number(size) })

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
            price: Number(price)
            // postgres keeps saving price as a "string" ^
        })
        res.status(201)
        return res.json(newSpot)
    }

    catch (e) {
        const errors = {}
        e.errors.forEach(error => {
            const path = error.path
            console.log(error.message)
            errors[path] = error.message
        })
        res.status(400)
        return res.json({
            message: 'Bad Request',
            errors: errors
        })
    }

})


router.post('/:spotId/images', requireAuth, async(req,res) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if(!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    } else if (spot.ownerId !== req.user.id) {
        res.status(401)
        return res.json({
            message: "You do not have permission to add an image to this spot"
        })
    }

    const { url, preview } = req.body
    if(spot) {
        // const newImage = await SpotImage.create({
        //     spotId: spot.id,
        //     url,
        //     preview
        // })

        const newImage = SpotImage.build({
            spotId: spot.id,
            url,
            preview
        })

        const allCurrentPreviewImages = await spot.getSpotImages({
            where: {
                preview: true
            }
        })

        if(allCurrentPreviewImages.length > 0 && newImage.preview === true) {
            let currPreviewImg = allCurrentPreviewImages[0]
            await currPreviewImg.destroy()
        }

        await newImage.save()

        return res.json({
            id: newImage.id,
            url: newImage.url,
            preview: newImage.preview
        })
    }

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

    return res.json({Spots: modifiedSpots})

})



router.get('/:spotId/reviews', async(req, res, next) => {

    const targetSpotId = Number(req.params.spotId)
    const reviewsForSpot = await Review.findAll({
        attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],
        where: {
            spotId: targetSpotId
        },
        include: [ {model: User, attributes: ['id', 'firstName', 'lastName']} ]

    })

    const reviewPOJO = await Promise.all(reviewsForSpot.map(async (review) => {
        review = review.toJSON()
        const reviewImgArr = await ReviewImage.findAll({
            attributes: ['id', 'url'],
            where: {
                reviewId: review.id
            }
        })

        review.ReviewImages = reviewImgArr
        return review

    }))


    if(reviewsForSpot.length === 0) {
        res.status(404)
        return res.json({message: "Spot couldn't be found"})
    } else {
        return res.json({Reviews: reviewPOJO})
    }


})


router.get('/:spotId/bookings', requireAuth, async(req,res) => {
    const allSpotsForSpotId = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        }
    })

    if(allSpotsForSpotId.length === 0) {
        res.status(404)
        return res.json({message: "Spot couldn't be found"})
    }

    const bookingPOJO = await Promise.all(allSpotsForSpotId.map(async (booking) => {
        // if the spot belongs to you
        let spot = await booking.getSpot()
        if(spot.ownerId === req.user.id) {
            let user = await booking.getUser({
                attributes: ['id', 'firstName', 'lastName']
            })
            booking = booking.toJSON()
            booking.User = user
            return booking
        // if the spot DOES NOT belong to you
        } else {
            booking = {
                spotId: booking.spotId,
                startDate: booking.startDate,
                endDate: booking.endDate
            }
            return booking
        }
    }))

    return res.json({Bookings: bookingPOJO})

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

    return res.json(spotPOJO)

})


router.put('/:spotId', requireAuth, validateSpotEditOnly, async(req,res) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if(!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    } else if (spot.ownerId !== req.user.id) {
        res.status(401)
        return res.json({
            message: "You do not have permission to edit this spot"
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


        const doesAddExist = await Spot.findOne({
            where: {
                address: spot.address,
                id: {
                    [Op.ne]: req.params.spotId
                }
            }
        })

        if(doesAddExist) {
            res.status(401)
            return res.json({message: 'Address is already taken by another user'})
        }

        await spot.save()
        return res.json(spot)

    }

})


router.delete('/:spotId', requireAuth, async(req,res) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if(!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    } else if (spot.ownerId !== req.user.id) {
        res.status(401)
        return res.json({
            message: "You do not have permission to delete this spot"
        })
    }

    if(spot) {
        await spot.destroy()
        return res.json({
            message: "Successfully deleted"
        })
    }

})


router.post('/:spotId/reviews', requireAuth, validateReview, async(req,res) => {
    const {review, stars} = req.body
    let userHasReview = false

    const doesSpotExist = await Spot.findByPk(req.params.spotId)
        if (!doesSpotExist) {
            res.status(404)
            return res.json({message: "Spot couldn't be found"})
        }

    const allSpotReviews = await doesSpotExist.getReviews()
    await Promise.all(allSpotReviews.map(async (review) => {
        // will not let you return res.json in a Promise.all()
        if(req.user.id === review.userId) userHasReview = true
        return review // go to the next review
    }))

    if(userHasReview === true) {
        res.status(500)
        return res.json({message: "User already has a review for this spot"})
    }

    try {
        const newReview = await Review.create({
            userId: req.user.id,
            spotId: Number(req.params.spotId),
            review,
            stars
        })
        console.log(newReview.id)
        res.status(201)
        return res.json(newReview)
    }

    catch (e) {
        const errors = {}
        e.errors.forEach(error => {
            const path = error.path
            console.log(error.message)
            errors[path] = error.message
        })
        res.status(400)
        return res.json({
            message: 'Bad Request',
            errors: errors
        })
    }
})


router.post('/:spotId/bookings', requireAuth, validateBooking, async(req,res) => {
    const spotToBook = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    })

    if(!spotToBook) {
        res.status(404)
        return res.json({message: "Spot couldn't be found"})
    }

    if (spotToBook.ownerId === req.user.id) {
        res.status(401) //unauthorized
        return res.json({message: "You are not authorized to create bookings for spots you currently own"})
    }

    const {startDate, endDate} = req.body

    let currentDate = new Date()
    let currentTime = currentDate.getTime()

    let requestStartDate = new Date(startDate)
    const requestStartTime = requestStartDate.getTime()

    if( requestStartTime <= currentTime ) {
        res.status(403)
        return res.json({message: "Booking must be placed for sometime in the future"})
    }


    let conflict = [];
    const bookings = await spotToBook.getBookings()
        await Promise.all(bookings.map( async(booking) =>{
            booking = booking.toJSON()

            let existingBookSD = booking.startDate
            let existingBookSDDate = new Date(existingBookSD)
            const bookingStartTime = existingBookSDDate.getTime()

            let existingBookED = booking.endDate
            let existingBookEDDate = new Date(existingBookED)
            const bookingEndTime = existingBookEDDate.getTime()

            let date = new Date(startDate)
            const startDateTime = date.getTime()

            let date2 = new Date(endDate)
            const endDateTime = date2.getTime()

            if(
            (bookingStartTime >= startDateTime && bookingStartTime <= endDateTime) ||
            (bookingEndTime >= startDateTime && bookingEndTime <= endDateTime) ||
            (startDateTime >= bookingStartTime && endDateTime <= bookingEndTime)
            ) {
                conflict.push("true")
            }
            return booking
        }))


    if(conflict.length >= 1) {
        res.status(403)
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
    }


    const newBooking = await Booking.create({
        spotId: spotToBook.id,
        userId: req.user.id,
        startDate,
        endDate
    })

    return res.json(newBooking)

})


module.exports = router;
