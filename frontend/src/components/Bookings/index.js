import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState, useMemo } from "react"
import { getBookingsForSpotThunk } from "../../store/bookings"
// import OpenModalButton from "../OpenModalButton"

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

    const [editing, setEditing] = useState(false);
    const [editingGuest, setEditingGuest] = useState(false)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [guests, setGuests] = useState(1)

    useEffect(() => {
        dispatch(getBookingsForSpotThunk(spotId))
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

    return (
        <div id="booking-component-main-container">
            <form id="booking-form">

                <h2>Request to book</h2>
                <h3>Your Trip</h3>

                <div>
                    <p>Dates:</p>
                    <button onClick={() => setEditing(true)} className={editing ? "hide-edit-button" : ""} type="button">{startDate === null ? "Select" : "Change"}</button>
                    {editing ? <div className="test-target">
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
                    {startDate === null || endDate === null ? <p>No Dates Selected...</p> : <p>{startDate} - {endDate}</p>}
                </div>

                <div>
                    <div>
                        <p>Guests:</p>
                        {/* <OpenModalButton buttonText={'Change'} modalComponent={<ChangeGuests guests={guests} setGuests={setGuests}/>} /> */}
                        {/* <button onClick={() => setEditingGuest(true)} className={editingGuest ? "hide-edit-button" : ""} type="button">Change</button> */}
                    </div>
                    <div>
                        <p>{guests} guest(s)</p>
                    </div>
                </div>

            </form>
        </div>
    )
}
