const express = require('express')
const { Op } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth'); //import for auth functions
const { Spot, sequelize, Review, SpotImage, User, ReviewImage } = require('../../db/models');

const { check } = require('express-validator'); //imports for validator
const { isURL } = require('validator');
const { handleValidationErrors } = require('../../utils/validation'); //this function is written in utils/validation.js

const router = express.Router();


const reviewImgValidator = [
    check('url')
    .isURL()
    .withMessage('Invalid URL'),
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


router.post('/:reviewId/images', requireAuth, reviewImgValidator, async(req,res) => {
    const targetReview = await Review.findByPk(req.params.reviewId)


    if( !targetReview ) {
        res.status(404)
        return res.json({message: "Review couldn't be found"})
    }

    if (targetReview.userId !== req.user.id) {
        res.status(404)
        return res.json({message: "Review couldn't be found"})
    }

    const reviews = await targetReview.getReviewImages()
    if(reviews.length > 9) {
        res.status(403)
        return res.json({message: "Maximum number of images for this resource was reached"})
    }

    const { url } = req.body
    const newReview = await ReviewImage.create({
        reviewId: targetReview.userId,
        url: url
    })

    return res.json({
        id: newReview.id,
        url: newReview.url
    })
})


router.put('/:reviewId', requireAuth, validateReview, async(req,res) => {
    const reviewToEdit = await Review.findByPk(req.params.reviewId)

    if( !reviewToEdit ) {
        res.status(404)
        return res.json({message: "Review couldn't be found"})
    }

    if (reviewToEdit.userId !== req.user.id) {
        res.status(404)
        return res.json({message: "Review couldn't be found"})
    }

    const {review, stars} = req.body

        reviewToEdit.set({
            userId: req.user.id,
            spotId: Number(req.params.reviewId),
            review,
            stars
        })

        res.status(200)
        await reviewToEdit.save()
        return res.json(reviewToEdit)

})


router.delete('/:reviewId', requireAuth, async(req,res) => {
    const reviewToDelete = await Review.findByPk(req.params.reviewId)

    if(!reviewToDelete) {
        res.status(404)
        return res.json({message: "Review couldn't be found" })
    }

    if (req.user.id !== reviewToDelete.userId) {
        res.status(404)
        return res.json({message: "Review couldn't be found" })
    }

    await reviewToDelete.destroy()

    return res.json({message: "Successfully deleted"})

})



module.exports = router;
