//CRUD
const LOAD_SPOTS = '/spots/LOAD_SPOTS'
const RETRIEVE_SPOT = '/spots/RETRIEVE_SPOT'


//ACTION CREATORS
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

export const getSingleSpot = (spot) => ({
    type: RETRIEVE_SPOT,
    spot
})


//THUNKS
export const getSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots/')

    if(response.ok) {
        const spots = await response.json();
        dispatch(loadSpots(spots));
    }

}

export const getSpotById = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`)

    if(response.ok) {
        const spotDetails = await response.json();
        dispatch(getSingleSpot(spotDetails))
    }
}


//REDUCER
const initialState = { spots: {}, spotDetails: {} }

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
        default:
            return state
    }
}


export default spotsReducer
