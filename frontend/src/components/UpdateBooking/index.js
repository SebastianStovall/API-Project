import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState, useMemo } from "react"
import { deleteBookingThunk, editBookingThunk, getBookingsForSpotThunk, getUserBookingsThunk } from "../../store/bookings"
import { getSpotById } from "../../store/spots"
import DatePicker from "react-datepicker";
import { formatDateForDisplay } from "../Bookings"
import { calculateDaysPassed } from "../Bookings"
import { formatForDispatch } from "../Bookings"
import "./UpdateBooking.css"

export const UpdateBooking = () => {

    const dispatch = useDispatch()
    const {bookingId, spotId} = useParams()
    const history = useHistory()
    const currUser = useSelector((state) => state.session.user)

    const userBookings = useSelector((state) => Object.values(state.bookings.userBookings))
    const bookingsForSpot = useSelector((state) => Object.values(state.bookings.bookingsForSpot))
    const spotDetails = useSelector((state) => state.spots.spotDetails)

    const [editing, setEditing] = useState(false);
    const [editingGuest, setEditingGuest] = useState(false)

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [guestCountAdult, setGuestCountAdult] = useState(1)
    const [guestCountChild, setGuestCountChild] = useState(0)

    // need this peice of useState since guests is seperated into 2 peices of useState
    const [guestTouched, setGuestTouched] = useState(false)

    const [daysStaying, setDaysStaying] = useState(0)
    const [formErrors, setFormErrors] = useState({})


    useEffect(() => {
        dispatch(getUserBookingsThunk())
        dispatch(getBookingsForSpotThunk(spotId))
        dispatch(getSpotById(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        async function once () {
            if(userBookings.length) {
                const targetBooking = userBookings.find((booking) => booking.id === Number(bookingId))
                const daysPassed = calculateDaysPassed(targetBooking?.startDate, targetBooking?.endDate)

                // only set the date if the user hasnt modified the dates yet
                // will need to offset the days by one due to time zones, so that they first initially appear with the correct set date
                if(startDate === null) {
                    const offsetStartDate = new Date(targetBooking?.startDate)
                    const formattedStartDate = formatDateForDisplay(offsetStartDate.setDate(offsetStartDate.getDate() + 1))
                    setStartDate(formattedStartDate)
                }

                if(endDate === null) {
                    const offsetEndDate = new Date(targetBooking?.endDate)
                    const formattedEndDate = formatDateForDisplay(offsetEndDate.setDate(offsetEndDate.getDate() + 1))
                    setEndDate(formattedEndDate)
                }

                setDaysStaying(daysPassed)
            }
        }
        once()
    }, [dispatch, spotId, bookingId, userBookings, endDate, startDate])

    // this code block would cause infinite re-renders without useMemo hook (used to avoid unncessary re-renders when dependencies (in this case bookings) change)
    const excludedDates = useMemo(() => {
        const takenDatesArray = [];

        if (bookingsForSpot) {
            const spotsNotTiedToUser = bookingsForSpot.filter((booking) => booking.id !== Number(bookingId))
            spotsNotTiedToUser.forEach((booking) => {

                const { startDate, endDate } = booking;

                const start = new Date(startDate);
                // offset the start by one to account for discrepencies that happen when converting string back to date object
                start.setDate(start.getDate() + 1);

                const end = new Date(endDate);
                // offset offset the end by one to account for discrepencies that happen when converting string back to date object
                end.setDate(end.getDate() + 1);

                const datesInRange = [];
                let currentDate = start;

                while (currentDate <= end) {
                    datesInRange.push(new Date(currentDate));
                    currentDate.setDate(currentDate.getDate() + 1);
                }

                takenDatesArray.push(...datesInRange);
            });
        }

        return takenDatesArray;
    }, [bookingsForSpot, bookingId]);

    if(userBookings.length === 0) return null
    const targetBooking = userBookings.find((booking) => booking.id === Number(bookingId))

    const handleEditBooking = async (e) => {
        e.preventDefault()
        const errors = {}

        const startDay = startDate.split(" ")[1]
        const endDay = endDate.split(" ")[1]

        if(startDay === endDay) {
            errors.date = "You must stay at least one night"
            setFormErrors(errors)
            return
        }

        if(currUser.id === spotDetails.ownerId) {
            errors.user = "You may not make a booking for a spot that you own"
            setFormErrors(errors)
            return
        }

        const daysStaying = calculateDaysPassed(startDate, endDate);
        if(daysStaying > 28) {
            errors.date = "You can only stay a maximum of 28 nights for this spot"
            setFormErrors(errors)
            return
        }

        // set up proper formats of date strings so it can be properly read by backend validations
        const formattedStartDate = formatForDispatch(startDate)
        const formattedEndDate = formatForDispatch(endDate)

        console.log(formattedStartDate, formattedEndDate)

        let totalGuests;
        if(guestTouched) {
            totalGuests = guestCountAdult + guestCountChild
        } else {
            totalGuests = targetBooking?.guests
        }

        const bookingObj = {startDate: formattedStartDate, endDate: formattedEndDate, guests: totalGuests}
        let response = await dispatch(editBookingThunk(bookingId, bookingObj))

        // response will be undefined if no errors guests
        if(response === undefined) {
            history.push(`/bookings/current`)
        } else {
            if(response.errors) {
                errors.endDate = response.errors["endDate"]
            }
            if(response.message) {
                errors.pastBookings = response.message
            }
            setFormErrors(errors)
            return
        }

    }

    const handleDeleteBooking = async (e) => {
        e.preventDefault()
        await dispatch(deleteBookingThunk(bookingId))
        history.push('/bookings/current')
    }


    return (
        <div id="booking-component-main-container">

            <form id="booking-form" onSubmit={handleEditBooking}>
                <h2>Reservation Details</h2>
                <h3>Your Trip</h3>

                <div id="date-container">
                    <p>Dates:</p>
                    <button onClick={() => setEditing(true)} className={editing ? "hide-edit-button" : ""} type="button">{startDate === null ? "Select" : "Change"}</button>
                    {editing ? <div className="react-picker-container">
                        <DatePicker
                            selected={startDate !== null ? new Date(`${new Date().getFullYear()}-${startDate}`) : null}
                            onChange={(e) => {
                                const date = formatDateForDisplay(e);
                                setStartDate(date)
                            }}
                            startDate={startDate}
                            placeholderText={startDate ? startDate : "Start Date"}
                            excludeDates={excludedDates}
                        />
                        <DatePicker
                            selected={endDate !== null ? new Date(`${new Date().getFullYear()}-${endDate}`) : null}
                            onChange={(e) => {
                                const date = formatDateForDisplay(e);
                                setEndDate(date)
                                const response = calculateDaysPassed(startDate, date)
                                if(response !== "error") {
                                    setDaysStaying(response)
                                } else {
                                    setDaysStaying(0)
                                }
                            }}
                            endDate={endDate}
                            placeholderText={endDate ? endDate : "End Date"}
                            excludeDates={excludedDates}
                        />
                        <button onClick={() => setEditing(false)} type="button">Save</button>
                    </div> : null}
                </div>
                <div>
                    {startDate === null || endDate === null ? <p id="no-date-selected-text">No Dates Selected...</p> : <p>{startDate} - {endDate}</p>}
                    {formErrors.date && <span className="form-errors">{formErrors.date}</span>}
                    {formErrors.user && <span className="form-errors">{formErrors.user}</span>}
                    {formErrors.pastBookings && <p className="form-errors">{formErrors.pastBookings}</p>}
                    {formErrors.endDate && <p className="form-errors">{formErrors.endDate}</p>}
                </div>

                <div>
                    <div id="guests-container">
                        <p>Guests:</p>
                        <button onClick={() => {setEditingGuest(true); setGuestTouched(true)}} className={editingGuest ? "hide-edit-button" : ""} type="button">Change</button>
                        {editingGuest ? <div id="guest-dropdown-container">
                            <div>
                                <label>Adults:</label>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    if(guestCountAdult <= 4) {
                                        setGuestCountAdult(guestCountAdult + 1);
                                    }
                                }}>+</button>

                                <span>{guestCountAdult}</span>

                                <button onClick={(e) => {
                                    e.preventDefault();
                                    if(guestCountAdult >= 2) {
                                        setGuestCountAdult(guestCountAdult - 1);
                                    }
                                }}>-</button>
                            </div>

                            <div>
                                <label>Children:</label>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    if(guestCountChild <= 4) {
                                        setGuestCountChild(guestCountChild + 1);
                                    }
                                }}>+</button>

                                <span>{guestCountChild}</span>

                                <button onClick={(e) => {
                                    e.preventDefault();
                                    if(guestCountChild >= 1) {
                                        setGuestCountChild(guestCountChild - 1);
                                    }
                                }}>-</button>
                            </div>
                            <button onClick={() => setEditingGuest(false)}>Save</button>
                        </div> : null}
                    </div>
                    <div>
                        { !guestTouched ? <p>{targetBooking?.guests} guests</p> : <p>{guestCountAdult + guestCountChild} {guestCountAdult + guestCountChild === 1 ? "guest" : "guests"}</p> }
                    </div>
                </div>

                <div id="ground-rules-container-update">
                    <button type="submit">Request Changes</button>
                </div>

                <div id="cancel-booking-button">
                    <button type="button" onClick={handleDeleteBooking}>Cancel Reservation</button>
                </div>

            </form>

            <div id="spot-details-side-panel-container">
                <div id="spot-details-img-container">
                    <img src={targetBooking?.Spot?.previewImage} className="booking-spot-img" alt="spot-img-preview" />
                    <div>
                        <p>{targetBooking?.Spot?.name}</p>
                        <p>★{spotDetails.avgStarRating} ({spotDetails.numReviews} reviews)</p>
                    </div>
                </div>
                <div id="booking-spot-details-pricing-container">
                    <h3>Price Details</h3>
                    <div>
                        <p>${targetBooking?.Spot?.price} x {daysStaying} nights</p>
                        <p>${(targetBooking?.Spot?.price * daysStaying).toFixed(2)}</p>
                    </div>
                    <div>
                        <p>AirStay Service Fee</p>
                        {daysStaying === 0 ? <p>$0</p> : <p>$54.07</p>}
                    </div>
                    <div>
                        <p>Taxes</p>
                        {daysStaying === 0 ? <p>$0</p> : <p>$24.04</p>}
                    </div>
                    <div>
                        <p>Total (USD)</p>
                        {daysStaying === 0 ? <p>$0</p> : <p>${ (54.07 + 24.04 + targetBooking?.Spot?.price * daysStaying).toFixed(2) }</p>}
                    </div>
                </div>
            </div>

        </div>
    )
}
