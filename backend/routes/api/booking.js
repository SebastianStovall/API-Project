const express = require('express')
const { Op } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth, getCurrentUser } = require('../../utils/auth'); //import for auth functions
const { Spot, sequelize, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');

const { check } = require('express-validator'); //imports for validator
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


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


router.put('/:bookingId', requireAuth, validateBooking, async(req,res) => {
    const bookingToEdit = await Booking.findByPk(req.params.bookingId)

    if(!bookingToEdit) {
        res.status(404)
        return res.json({message: "Booking couldn't be found"})
    }

    if(bookingToEdit.userId !== req.user.id) {
        res.status(401)
        return res.json({message: "Booking does not belong to current user"})
    }

    const {startDate, endDate} = req.body

    let requestStartDate = new Date(startDate)
    let requestEndDate = new Date(endDate)
    const requestStartTime = requestStartDate.getTime()
    const requestEndTime = requestEndDate.getTime()

    let currentDate = new Date()
    let currentTime = currentDate.getTime()

    let currentBookingED = bookingToEdit.endDate
    let currentBookingEDDate = new Date(currentBookingED)
    let currentBookingEDTime = currentBookingEDDate.getTime()

    if( currentTime >= currentBookingEDTime ) {
        res.status(403)
        return res.json({message: "Past bookings can't be modified"})
    }

    if( requestStartTime <= currentTime ) {
        res.status(403)
        return res.json({message: "Booking must be placed for sometime in the future"})
    }

    const spot = await bookingToEdit.getSpot()
    const allBookingsForSpot = await spot.getBookings()

    let conflict = []
    await Promise.all(allBookingsForSpot.map( async(booking) =>{
        booking = booking.toJSON()
        let currentBookingSD = booking.startDate
        let currentBookingSDDate = new Date(currentBookingSD)

        let currentBookingED = booking.endDate
        let currentBookingEDDate = new Date(currentBookingED)

        const currentBookSDTime = currentBookingSDDate.getTime()
        const currentBookEDTime = currentBookingEDDate.getTime()

        if(
            (
                ( currentBookSDTime >= requestStartTime && currentBookSDTime <= requestEndTime) ||
                (currentBookEDTime >= requestStartTime && currentBookEDTime <= requestEndTime) ||
                (requestStartTime >= currentBookSDTime && requestEndTime <= currentBookEDTime)
            )
            &&
            ( booking.userId !== req.user.id )
            ) {
            conflict.push("true")
        }

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


    bookingToEdit.set({
        startDate,
        endDate
    })

    await bookingToEdit.save()

    return res.json(bookingToEdit)
})


router.delete('/:bookingId', requireAuth, async(req,res) => {
    const bookingToDelete = await Booking.findByPk(req.params.bookingId)
    // return res.json(bookingToDelete)

    if(!bookingToDelete) {
        res.status(404)
        return res.json({message: "Booking couldn't be found"})
    }

    if ( req.user.id !== bookingToDelete.userId ) {

        const findSpot = await bookingToDelete.getSpot()
        if (findSpot.ownerId !== req.user.id) {
            res.status(401)
            return res.json({message: 'You do not have permission to delete this booking'})
        }

    }

    const startDateOfBooking = bookingToDelete.startDate
    const dateOfBooking = new Date(startDateOfBooking)
    const timeOfBooking = dateOfBooking.getTime()

    const currentDate = new Date()
    const currentTime = currentDate.getTime()

    if (currentTime >= timeOfBooking) {
        res.status(403)
        return res.json({message: "Bookings that have been started can't be deleted"})
    }

    await bookingToDelete.destroy()
    return res.json({message: "Successfully deleted"})

})


module.exports = router;
