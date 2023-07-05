import { csrfFetch } from "./csrf"

//CRUD
const LOAD_SPOTS = '/spots/LOAD_SPOTS'
const RETRIEVE_SPOT = '/spots/RETRIEVE_SPOT'
const UPLOAD_SPOT = '/spots/UPLOAD_SPOT'
const UPLOAD_SPOT_IMAGE = '/spots/UPLOAD_SPOT_IMAGE'
const RETRIEVE_ALL_USER_SPOTS = '/spots/RETRIEVE_ALL_USER_SPOTS'
const PATCH_SPOT = '/spots/PATCH_SPOT'
const REMOVE_SPOT = '/spots/REMOVE_SPOT'


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

export const uploadSpotImage = (spotImage) => ({
    type: UPLOAD_SPOT_IMAGE,
    spotImage
})

export const retrieveUserSpots = (spots) => ({
    type: RETRIEVE_ALL_USER_SPOTS,
    spots
})

export const patchSpot = (updatedSpotInfo) => ({
    type: PATCH_SPOT,
    updatedSpotInfo
})

export const removeSpot = (spotId) => ({
    type: REMOVE_SPOT,
    spotId
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

//UPLOAD_SPOT_IMAGE
export const createSpotImage = (spotId, isPreview, url) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            url,
            preview: isPreview
        })

    })

    if(response.ok) {
        const spotImage = await response.json()
        return spotImage
        // dispatch(uploadSpotImage(spotImage))
    } else {
        const errors = await response.json()
        return errors
    }

}

// RETREIVE_ALL_USER_SPOTS
export const getAllUserSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current')

    if(response.ok) {
        const spots = await response.json()
        dispatch(retrieveUserSpots(spots))
    }
}

// PATCH_SPOT
export const editSpot = (spotId, spotInfo) => async (dispatch) => {

    try {

        const response = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(spotInfo)
        })

        if(response.ok) {
            const updatedSpotInfo = await response.json()
            dispatch(patchSpot(updatedSpotInfo))
            return "successful" // needed for an undefined error when reading response
        }

    } catch(err) {
        return await err.json()
    }
}

//REMOVE_SPOT
export const deleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })

    if(response.ok) { // res.json({message: "successfully deleted"})
        const message = await response.json()
        dispatch(removeSpot(spotId))
        return message
    }
}


//REDUCER
const initialState = { spots: {}, spotDetails: {} } // spots key = GET /api/spots (get all spots) ---> can overwrite this key for POST, PUT, and DELETE AND FOR USER SPOTS       spotDetails key = GET /api/spots/:spotId (get details of a spot by id)

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
        case UPLOAD_SPOT_IMAGE:
            return {...state}
        case RETRIEVE_ALL_USER_SPOTS:
            const userSpotsState = {...state, spots: {}}
            action.spots.Spots.forEach((spot) => {
                return userSpotsState.spots[spot.id] = spot
            })
            return userSpotsState
        case PATCH_SPOT:
            return {...state, spots: {...state.spots, [action.updatedSpotInfo.id]: action.updatedSpotInfo} }
        case REMOVE_SPOT:
            const newStateDelete = {...state}
            delete newStateDelete.spots[action.spotId]
            return newStateDelete
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
