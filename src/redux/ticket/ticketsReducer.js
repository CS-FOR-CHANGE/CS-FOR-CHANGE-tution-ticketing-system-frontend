// ticketsReducer.js
import {
    FETCH_TICKETS_REQUEST,
    FETCH_TICKETS_SUCCESS,
    FETCH_TICKETS_FAILURE,
    FETCH_APPEND_TICKETS_SUCCESS,
    SET_TICKETS,
} from "./ticketsTypes";

const initialState = {
    loading: false,
    tickets: [],
    error: null,
};

const ticketsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TICKETS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_TICKETS_SUCCESS:
            return {
                ...state,
                loading: false,
                tickets: action.payload,
            };
        case FETCH_APPEND_TICKETS_SUCCESS:
            return {
                ...state,
                loading: false,
                tickets: [...state.tickets, action.payload], // Append new tickets
            };
        case FETCH_TICKETS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case SET_TICKETS:
            return {
                ...state,
                tickets: action.payload,
            };
        default:
            return state;
    }
};
export default ticketsReducer;
