import { csrfFetch } from "./csrf"

// CRUD
const LOAD_ALL_BOOKINGS_FOR_SPOT = "/bookings/LOAD_ALL_BOOKINGS_FOR_SPOT"


//ACTION CREATORS
export const loadBookingsSpotId = (bookings) => ({
    type: LOAD_ALL_BOOKINGS_FOR_SPOT,
    payload: bookings
})


//THUNKS
export const getBookingsForSpotThunk = (spotId) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spotId}/bookings`)

    if(response.ok) {
        const bookings = await response.json()
        dispatch(loadBookingsSpotId(bookings))
    }
}



//REDUCER
const initialState = { userBookings: {}, bookingsForSpot: {} } // userBookings slice of state = GET /api/bookings/current (get all bookings of current user)    bookingsForSpot slice of state = GET /api/spots/:spotId/bookings (get bookings by spotId) --> overwrite this key for POST DELETE and PUT

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_BOOKINGS_FOR_SPOT:
            const bookingsForSpot = {}
            action.payload.Bookings.forEach((booking) => {
                return bookingsForSpot[booking.id] = booking;
            })
            return {...state, bookingsForSpot: bookingsForSpot}
        default:
            return state
    }
}


export default bookingsReducer
