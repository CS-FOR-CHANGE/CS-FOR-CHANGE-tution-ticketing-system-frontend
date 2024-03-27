// reducer.js
import {
    FETCH_SUBJECTS_REQUEST,
    FETCH_SUBJECTS_SUCCESS,
    FETCH_SUBJECTS_FAILURE,
    SET_SUBJECTS,
} from "./subjectsTypes";

const initialState = {
    loading: false,
    subjects: [],
    error: null,
};

const subjectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SUBJECTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_SUBJECTS_SUCCESS:
            return {
                ...state,
                loading: false,
                subjects: action.payload,
            };
        case FETCH_SUBJECTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case SET_SUBJECTS:
            return {
                ...state,
                subjects: action.payload,
            };
        default:
            return state;
    }
};
export default subjectsReducer