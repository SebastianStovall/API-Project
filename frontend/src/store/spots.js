import { csrfFetch } from "./csrf"

//CRUD
const LOAD_SPOTS = '/spots/LOAD_SPOTS'
const RETRIEVE_SPOT = '/spots/RETRIEVE_SPOT'
const UPLOAD_SPOT = '/spots/UPLOAD_SPOT'


//ACTION CREATORS
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

export const getSingleSpot = (spot) => ({
    type: RETRIEVE_SPOT,
    spot
})

export const uploadSpot = (spotInfo) => ({
    type: UPLOAD_SPOT,
    spotInfo
})

//THUNKS

//LOAD_SPOTS
export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/')

    if(response.ok) {
        const spots = await response.json();
        dispatch(loadSpots(spots));
    }

}

//RETRIEVE_SPOT
export const getSpotById = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if(response.ok) {
        const spotDetails = await response.json();
        dispatch(getSingleSpot(spotDetails))
    }
}

// UPLOAD_SPOT
export const createSpot = (formData) => async (dispatch) => {

    try {
        const response = await csrfFetch('/api/spots', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })

        if(response.ok) {
            const spotInfo = await response.json()
            dispatch(uploadSpot(spotInfo))
            return spotInfo.id
        } else {
            const errors = await response.json()
            return errors
        }
    } catch(err) {
        return await err.json()
    }
}


//REDUCER
const initialState = { spots: {}, spotDetails: {} } // spots key = GET /api/spots (get all spots) ---> can overwrite this key for POST, PUT, and DELETE        spotDetails key = GET /api/spots/:spotId (get details of a spot by id)

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            const newState = {...state}
            action.spots.Spots.forEach((spot) => {
                return newState.spots[spot.id] = spot
            })
            return newState
        case RETRIEVE_SPOT:
            return {...state, spotDetails: action.spot }
        case UPLOAD_SPOT:
            return {...state, spots: {...state.spots, [action.spotInfo.id]: action.spotInfo} }
        default:
            return state
    }
}


export default spotsReducer




export const displayAsFloat = (avgRating) => {
    if(Number.isInteger(avgRating)) { // determine if avgRating is a whole number
        return avgRating.toFixed(1);
    }
    return avgRating
}
