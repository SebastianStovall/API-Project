const express = require('express')
const { Op } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth'); //import for auth functions
const { Spot, sequelize, Review, SpotImage, User, ReviewImage } = require('../../db/models');

const { check } = require('express-validator'); //imports for validator
const { handleValidationErrors } = require('../../utils/validation'); //this function is written in utils/validation.js

const router = express.Router();


router.get('/current', requireAuth, async(req,res) => {
    const allUserReviews = await req.user.getReviews({
    attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],
    include: [
        {
            model: User,
            attributes: ['id', 'firstName', 'lastName'],
        },
        {
            model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
        },
    ],
})

const reviewPOJO = await Promise.all(allUserReviews.map(async (review) => {
    review = review.toJSON()
    const reviewImgArr = await ReviewImage.findAll({
        attributes: ['id', 'url'],
        where: {
            reviewId: review.id
        }
    })

    let spotImg = await SpotImage.findOne({
        attributes: ['url'],
        where: {
            preview: true,
            spotId: review.Spot.id
        }
    })

    if(spotImg !== null) spotImg = spotImg.url
    review.Spot.previewImage = spotImg

    review.ReviewImages = reviewImgArr
    return review

}))


    res.json({Reviews: reviewPOJO})

})





module.exports = router;
