import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getUserBookingsThunk } from "../../store/bookings"
import "./UserBookings.css"
import { formatDateForDisplay } from "../Bookings"

// once dates are formatted, get their abbreviations, then decide if the abbr is the same, if so, can shorten the display of the dates
const monthAbbreviations = {
    "January": "Jan",
    "February": "Feb",
    "March": "Mar",
    "April": "Apr",
    "May": "May",
    "June": "Jun",
    "July": "Jul",
    "August": "Aug",
    "September": "Sep",
    "October": "Oct",
    "November": "Nov",
    "December": "Dec"
};

export const UserBookings = () => {

    const dispatch = useDispatch()
    const userBookings = useSelector((state) => Object.values(state.bookings.userBookings))
    const history = useHistory()

    useEffect(() => {
        dispatch(getUserBookingsThunk())
    }, [dispatch])

    if( userBookings.length === 0 ) return null // if this is the first render, return null

    return (
        <div id="user-bookings-main-container">
            <h2>Trips</h2>
            {userBookings.map((booking) => {

                const offsetStartDate = new Date(booking.startDate)
                const startMonthDisplayed = formatDateForDisplay(offsetStartDate.setDate(offsetStartDate.getDate() + 1))

                const offsetEndDate = new Date(booking.endDate)
                const endMonthDisplayed = formatDateForDisplay(offsetEndDate.setDate(offsetEndDate.getDate() + 1))

                const startMonthAbbr = monthAbbreviations[startMonthDisplayed.split(" ")[0]]
                const endMonthAbbr = monthAbbreviations[endMonthDisplayed.split(" ")[0]]

                return <div className="user-booking-single-component" onClick={() => history.push(`/bookings/manage/${booking.id}/${booking.Spot.id}`)}>
                    <div id="user-booking-image-container">
                        <img src={booking?.Spot?.previewImage} alt={booking.id} />
                    </div>
                    <div>
                        <h3>{booking?.Spot?.name}</h3>
                        <div>
                            <p>{booking?.Spot?.address}</p>
                            <p>{booking?.Spot?.country}</p>
                        </div>
                        <div id="reservation-details-box">
                            <img src="https://www.nicepng.com/png/detail/131-1310865_school-supply-list-school-book-icon-png.png" alt="reservation-details-img" height="20px" />
                            <p>Check Reservation Details</p>
                        </div>
                    </div>
                    <div id="date-container-user-booking">
                        {startMonthAbbr === endMonthAbbr ? <p>{startMonthAbbr} {startMonthDisplayed.split(" ")[1]} - {endMonthDisplayed.split(" ")[1]}</p>
                        :<p>{startMonthAbbr} {startMonthDisplayed.split(" ")[1]} - {endMonthAbbr} {endMonthDisplayed.split(" ")[1]}</p>}
                        <p>({new Date(booking.startDate).getFullYear()})</p>
                    </div>
                </div>
            })}
        </div>
    )
}
