//CRUD
const LOAD_SPOTS = '/spots/LOAD_SPOTS'


//ACTION CREATORS
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})


//THUNKS
export const getSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots/')

    if(response.ok) {
        const spots = await response.json();
        dispatch(loadSpots(spots));
    }

}


//REDUCER
const initialState = { spots: {} }

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            const newState = {...state}
            action.spots.Spots.forEach((spot) => {
                return newState.spots[spot.id] = spot
            })
            return newState

        default:
            return state
    }
}


export default spotsReducer
