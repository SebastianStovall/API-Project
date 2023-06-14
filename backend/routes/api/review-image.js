const express = require('express')
const { Op } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth'); //import for auth functions
const { Spot, sequelize, Review, SpotImage, User, ReviewImage } = require('../../db/models');

const router = express.Router();


router.delete('/:imageId', requireAuth, async(req,res) => {
    const targetReviewImg = await ReviewImage.findByPk(req.params.imageId)
    // return res.json(targetReviewImg)

    if(!targetReviewImg) {
        res.status(404)
        return res.json({message: "Review Image couldn't be found"})
    }


    const associatedReview = await targetReviewImg.getReview()
    if ( req.user.id !== associatedReview.userId ) {
        res.status(404)
        return res.json({message: "Review Image couldn't be found"})
    }

    await targetReviewImg.destroy()
    return res.json({message: "Successfully deleted"})

})



module.exports = router;
