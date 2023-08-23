import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState, useMemo } from "react"
import { getBookingsForSpotThunk } from "../../store/bookings"
import { getSpotById } from "../../store/spots"

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'; // default css for react-datepicker
import './custom-datepicker.css'
import "./Bookings.css"

function formatDateForDisplay(date) {
    const options = { month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export const Bookings = () => {

    const dispatch = useDispatch()
    const {spotId} = useParams()
    const bookingsForSpot = useSelector((state) => Object.values(state.bookings.bookingsForSpot))
    const spotDetails = useSelector((state) => state.spots.spotDetails)

    const [editing, setEditing] = useState(false);
    const [editingGuest, setEditingGuest] = useState(false)

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [guestCountAdult, setGuestCountAdult] = useState(1)
    const [guestCountChild, setGuestCountChild] = useState(0)

    const [daysStaying, setDaysStaying] = useState(0)
    const [formErrors, setFormErrors] = useState({})

    useEffect(() => {
        dispatch(getBookingsForSpotThunk(spotId))
        dispatch(getSpotById(spotId))
    }, [spotId, dispatch])

    // this code block would cause infinite re-renders without useMemo hook (used to avoid unncessary re-renders when dependencies (in this case bookings) change)
    const excludedDates = useMemo(() => {
        const takenDatesArray = [];

        if (bookingsForSpot) {
            bookingsForSpot.forEach((booking) => {
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
    }, [bookingsForSpot]);

    if( Object.values(spotDetails).length === 0 ) return null // if this is the first render, return null
    const previewImg = spotDetails.SpotImages.filter((img) => img.preview === true)[0]

    const handleCreateBooking = (e) => {
        e.preventDefault()
        const errors = {}

        const startDay = startDate.split(" ")[1]
        const endDay = endDate.split(" ")[1]

        if(startDay === endDay) {
            errors.date = "You must stay at least one night"
            setFormErrors(errors)
            return
        }

        function calculateDaysPassed(startDate, endDate) {
            const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
            const startDateObject = new Date(startDate);
            const endDateObject = new Date(endDate);
            // console.log(startDateObject, endDateObject)
            const timeDifference = endDateObject - startDateObject; // Difference in milliseconds
            const daysPassed = Math.floor(timeDifference / oneDay);
            return daysPassed;
        }

        const daysStaying = calculateDaysPassed(startDate, endDate);
        if(daysStaying > 28) {
            errors.date = "You can only stay a maximum of 28 nights for this spot"
            setFormErrors(errors)
            return
        }

        setDaysStaying(daysStaying);

        // dispatch here, firgure out what need to pass in, remember how to handle errors coming from backend route

    }

    return (
        <div id="booking-component-main-container">

            <form id="booking-form" onSubmit={handleCreateBooking}>
                <h2>Request to book</h2>
                <h3>Your Trip</h3>

                <div id="date-container">
                    <p>Dates:</p>
                    <button onClick={() => setEditing(true)} className={editing ? "hide-edit-button" : ""} type="button">{startDate === null ? "Select" : "Change"}</button>
                    {editing ? <div className="react-picker-container">
                        <DatePicker
                            // selected={startDate}
                            onChange={(e) => {
                                const date = formatDateForDisplay(e);
                                setStartDate(date)
                            }}
                            startDate={startDate}
                            placeholderText={startDate ? startDate : "Start Date"}
                            excludeDates={excludedDates}
                        />
                        <DatePicker
                            // selected={endDate}
                            onChange={(e) => {
                                const date = formatDateForDisplay(e);
                                setEndDate(date)
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
                </div>

                <div>
                    <div id="guests-container">
                        <p>Guests:</p>
                        <button onClick={() => setEditingGuest(true)} className={editingGuest ? "hide-edit-button" : ""} type="button">Change</button>
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
                        <p>{guestCountAdult + guestCountChild} {guestCountAdult + guestCountChild === 1 ? "guest" : "guests"}</p>
                    </div>
                </div>

                <div id="ground-rules-container">
                    <h3>Ground Rules</h3>
                    <p>We ask every guest to remember a few simple things about what makes a <br/> great guest.</p>
                    <p>-Follow the house rules</p>
                    <p>-Treat your Host's home like your own</p>
                    <button type="submit">Request to Book</button>
                </div>
            </form>

            <div id="spot-details-side-panel-container">
                <div id="spot-details-img-container">
                    <img src={previewImg.url} className="booking-spot-img" />
                    <div>
                        <p>{spotDetails.name}</p>
                        <p>★{spotDetails.avgStarRating} ({spotDetails.numReviews} reviews)</p>
                    </div>
                </div>
                <div id="booking-spot-details-pricing-container">
                    <h3>Price Details</h3>
                    <div>
                        <p>${spotDetails.price} x {daysStaying} nights</p>
                        <p>${spotDetails.price * daysStaying}</p>
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
                        {daysStaying === 0 ? <p>$0</p> : <p>${ 54.07 + 24.04 + (spotDetails.price * daysStaying) }</p>}
                    </div>
                </div>
            </div>

        </div>
    )
}
