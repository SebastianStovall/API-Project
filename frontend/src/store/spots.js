//CRUD
const LOAD_SPOTS = '/spots/LOAD_SPOTS'
const RETRIEVE_SPOT = '/spots/RETRIEVE_SPOT'
const LOAD_SPOT_REVIEWS = '/spots/LOAD_SPOT_REVIEWS'


//ACTION CREATORS
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

export const getSingleSpot = (spot) => ({
    type: RETRIEVE_SPOT,
    spot
})

export const loadSpotReviews = (reviews) => ({
    type: LOAD_SPOT_REVIEWS,
    reviews
})


//THUNKS

//LOAD_SPOTS
export const getSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots/')

    if(response.ok) {
        const spots = await response.json();
        dispatch(loadSpots(spots));
    }

}

//RETRIEVE_SPOT
export const getSpotById = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`)

    if(response.ok) {
        const spotDetails = await response.json();
        dispatch(getSingleSpot(spotDetails))
    }
}

//LOAD_SPOT_REVIEWS
export const getSpotReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)

    if(response.ok) {
        const reviews = await response.json();
        dispatch(loadSpotReviews(reviews))
    } else {
        dispatch(loadSpotReviews({Reviews: []}))
    }
}


//REDUCER
const initialState = { spots: {}, spotDetails: {}, reviews: {} }

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
        case LOAD_SPOT_REVIEWS:
            const reviewsForSpot = {}
            if(action.reviews.Reviews.length > 0) {
                action.reviews.Reviews.forEach((review) => {
                    return reviewsForSpot[review.id] = review;
                })
            }
            return {...state, reviews: reviewsForSpot}
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
