import { SET_USER, UPDATE_USER, REMOVE_USER } from "./types";

const initialState = {
    user: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload, // Set user object
            };
        case UPDATE_USER:
            return {
                ...state,
                user: { ...state.user, ...action.payload }, // Update user object
            };
        case REMOVE_USER:
            return {
                ...state,
                user: null, // Remove user object
            };
        default:
            return state;
    }
};

export default userReducer;
