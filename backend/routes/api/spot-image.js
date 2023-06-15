const express = require('express')
const { Op } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth'); //import for auth functions
const { Spot, sequelize, Review, SpotImage, User, ReviewImage } = require('../../db/models');

const router = express.Router();


router.delete('/:imageId', requireAuth, async(req,res) => {
    const targetSpotImg = await SpotImage.findByPk(req.params.imageId)
    // return res.json(targetSpotImg)

    if(!targetSpotImg) {
        res.status(404)
        return res.json({message: "Spot Image couldn't be found"})
    }

    const getAssociatedSpot = await targetSpotImg.getSpot()
    if(req.user.id !== getAssociatedSpot.ownerId) {
        res.status(404)
        return res.json({message: "Spot Image couldn't be found"})
    }

    await targetSpotImg.destroy()
    return res.json({message: "Successfully deleted"})

})



module.exports = router;
