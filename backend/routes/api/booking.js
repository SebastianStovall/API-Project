const express = require('express')
const { Op } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth, getCurrentUser } = require('../../utils/auth'); //import for auth functions
const { Spot, sequelize, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');

const { check } = require('express-validator'); //imports for validator
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get('/current', requireAuth, async(req,res) => {
    const allUserBookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                attributes: { exclude: ['description', 'createdAt', 'updatedAt'] }
            }
        ]
    })

    const bookingPOJO = await Promise.all(allUserBookings.map(async (booking)=> {
        booking = booking.toJSON()
        let previewImgForSpot = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                preview: true,
                spotId: booking.spotId
            }
        })

        if(previewImgForSpot !== null) previewImgForSpot = previewImgForSpot.url
        booking.Spot.previewImage = previewImgForSpot
        return booking

    }))

    return res.json({Booking: bookingPOJO})
})


module.exports = router;
