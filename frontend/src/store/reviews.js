// CRUD
const LOAD_USER_REVIEWS = '/reviews/LOAD_USER_REVIEWS'



//ACTION CREATORS
export const loadUserReviews = (reviews) => ({
    type: LOAD_USER_REVIEWS,
    reviews
})



//THUNKS
export const getUserReviews = () => async (dispatch) => {
    const response = await fetch('/api/reviews/current')

    if(response.ok) {
        const reviews = await response.json()
        dispatch(loadUserReviews(reviews))
    }
}


//REDUCER
const initialState = { userReviews: {} } // userReviews slice of state grabs all current user reviews --> want to add reviewEntries key which tracks all single spot reviews (can manipulate reviewEntries for ADD EDIT and DELETE)

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER_REVIEWS: {
            const reviewsForUser = {}
            action.reviews.Reviews.forEach((review) => {
                return reviewsForUser[review.id] = review
            })
            return {...state, userReviews: reviewsForUser }
        }
        default:
            return state
    }
}


export default reviewsReducer
