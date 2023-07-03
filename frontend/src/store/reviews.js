import { csrfFetch } from "./csrf"

// CRUD
const LOAD_USER_REVIEWS = '/reviews/LOAD_USER_REVIEWS'
const LOAD_SPOT_REVIEWS = '/spots/LOAD_SPOT_REVIEWS'



//ACTION CREATORS
export const loadUserReviews = (reviews) => ({
    type: LOAD_USER_REVIEWS,
    reviews
})

export const loadSpotReviews = (reviews) => ({
    type: LOAD_SPOT_REVIEWS,
    reviews
})



//THUNKS
export const getUserReviews = () => async (dispatch, getState) => {

    const currentState = getState();
    const userInfo = currentState.session
    if (userInfo.user === null) return null

    const response = await csrfFetch('/api/reviews/current')

    if(response.ok) {
        const reviews = await response.json()
        dispatch(loadUserReviews(reviews))
    }
}

//LOAD_SPOT_REVIEWS
export const getSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if(response.ok) {
        const reviews = await response.json();
        dispatch(loadSpotReviews(reviews))
    }
}


//REDUCER
const initialState = { userReviews: {}, reviews: {} } // userReviews slice of state = GET /api/reviews/current (get reviews of current user)    reviews slice of state = GET /api/spots/:spotId/reviews (get reviews by spotId) --> overwrite this key for POST DELETE and PUT

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER_REVIEWS:
            const reviewsForUser = {}
            action.reviews.Reviews.forEach((review) => {
                return reviewsForUser[review.id] = review
            })
            return {...state, userReviews: reviewsForUser }
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


export default reviewsReducer
