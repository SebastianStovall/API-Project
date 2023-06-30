// frontend/src/store/session.js
import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => { // LOGS USER IN
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => { // LOGS USER OUT
    return {
        type: REMOVE_USER,
    };
};

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({
        credential,
        password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case SET_USER:
        newState = Object.assign({}, state);
        newState.user = action.payload;
        return newState;
    case REMOVE_USER:
        newState = Object.assign({}, state);
        newState.user = null;
        return newState;
    default:
        return state;
    }
};

export default sessionReducer;