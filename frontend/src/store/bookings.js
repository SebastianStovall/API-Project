import { csrfFetch } from "./csrf"

// CRUD
const LOAD_ALL_USER_BOOKINGS = "/bookings/LOAD_ALL_USER_BOOKINGS"
const LOAD_ALL_BOOKINGS_FOR_SPOT = "/bookings/LOAD_ALL_BOOKINGS_FOR_SPOT"
const CREATE_BOOKING = "/bookings/CREATE_BOOKING"
const EDIT_BOOKING = "/bookings/EDIT_BOOKING"


//ACTION CREATORS

export const loadUserBookings = (bookings) => ({
    type: LOAD_ALL_USER_BOOKINGS,
    payload: bookings
})

export const loadBookingsSpotId = (bookings) => ({
    type: LOAD_ALL_BOOKINGS_FOR_SPOT,
    payload: bookings
})

export const createBooking = (bookingObj) => ({
    type: CREATE_BOOKING,
    payload: bookingObj
})

export const editBooking = (bookingObj) => ({
    type: EDIT_BOOKING,
    payload: bookingObj
})


//THUNKS

export const getUserBookingsThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/current`)

    if(response.ok) {
        const bookings = await response.json()
        dispatch(loadUserBookings(bookings))
    }
}

export const getBookingsForSpotThunk = (spotId) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spotId}/bookings`)

    if(response.ok) {
        const bookings = await response.json()
        dispatch(loadBookingsSpotId(bookings))
    }
}

export const createBookingThunk = (bookingObj, spotId) => async (dispatch) => {
    try {

    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(bookingObj)
    })

    if(response.ok) {
        const bookingData = await response.json()
        dispatch(createBooking(bookingData))
    }

    } catch(err) {
        return await err.json()
    }
}

export const editBookingThunk = (bookingId, bookingObj) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/bookings/${bookingId}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bookingObj)
        })

        if(response.ok) {
            const newBookingData = await response.json()
            dispatch(editBooking(newBookingData))
        }
    } catch(err) {
        return await err.json()
    }
}


//REDUCER
const initialState = { userBookings: {}, bookingsForSpot: {} } // userBookings slice of state = GET /api/bookings/current (get all bookings of current user)    bookingsForSpot slice of state = GET /api/spots/:spotId/bookings (get bookings by spotId) --> overwrite this key for POST DELETE and PUT

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_BOOKINGS_FOR_SPOT:
            const bookingsForSpot = {}
            action.payload.Bookings.forEach((booking) => {
                bookingsForSpot[booking.id] = booking;
            })
            return {...state, bookingsForSpot: bookingsForSpot}
        case CREATE_BOOKING:
            return {...state, bookingsForSpot: {...state.bookingsForSpot, [action.payload.id]: action.payload}}
        case LOAD_ALL_USER_BOOKINGS:
            const userBookings = {}
            action.payload.Booking.forEach((booking) => {
                userBookings[booking.id] = booking
            })
            return {...state, userBookings: userBookings}
        case EDIT_BOOKING:
            return {
                ...state,
                userBookings: {...state.userBookings, [action.payload.id]: action.payload}
            }
        default:
            return state
    }
}


export default bookingsReducer
