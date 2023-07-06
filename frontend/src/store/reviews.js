import { csrfFetch } from "./csrf"

// CRUD
const LOAD_USER_REVIEWS = '/reviews/LOAD_USER_REVIEWS'
const LOAD_SPOT_REVIEWS = '/spots/LOAD_SPOT_REVIEWS'
const ADD_SPOT_REVIEW = '/spots/ADD_SPOT_REVIEW'
const REMOVE_SPOT_REVIEW = '/reviews/REMOVE_SPOT_REVIEW'


//ACTION CREATORS
export const loadUserReviews = (reviews) => ({
    type: LOAD_USER_REVIEWS,
    reviews
})

export const loadSpotReviews = (reviews) => ({
    type: LOAD_SPOT_REVIEWS,
    reviews
})

export const addSpotReview = (reviewData) => ({
    type: ADD_SPOT_REVIEW,
    reviewData
})

export const removeSpotReview = (reviewId) => ({
    type: REMOVE_SPOT_REVIEW,
    reviewId
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

//POST SPOT REVIEW
export const postSpotReview = (spotId, reviewInfo) => async (dispatch, getState) => {

    try {

        const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(reviewInfo)
        })

        if(response.ok) {
            const reviewData = await response.json()

            const currentState = getState();
            const userInfo = currentState.session

            console.log("LOOK HERE FOR USER", userInfo)

            reviewData.User = userInfo.user

            dispatch(addSpotReview(reviewData))
        }

    } catch(err) {
        return await err.json()
    }

}

//REMOVE_SPOT_REVIEW
export const deleteSpotReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })

    if(response.ok) { // res.json({message: "successfully deleted"})
        const message = await response.json()
        dispatch(removeSpotReview(reviewId))
        return message
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
            // if(action.reviews.Reviews.length > 0) {
                action.reviews.Reviews.forEach((review) => {
                    return reviewsForSpot[review.id] = review;
                })
            // }
            return {...state, reviews: reviewsForSpot}
        case ADD_SPOT_REVIEW:
            return {...state, reviews: {...state.reviews, [action.reviewData.id]: action.reviewData}} // think its correct, check back
        case REMOVE_SPOT_REVIEW:
            const newState = {...state}
            delete newState.reviews[action.reviewId]
            return newState
        default:
            return state
    }
}


export default reviewsReducer
