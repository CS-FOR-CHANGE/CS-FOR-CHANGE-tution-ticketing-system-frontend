// ticketsActions.js
import {
    FETCH_TICKETS_REQUEST,
    FETCH_TICKETS_SUCCESS,
    FETCH_TICKETS_FAILURE,
    FETCH_APPEND_TICKETS_SUCCESS,
    SET_TICKETS,
} from "./ticketsTypes";

export const fetchTicketsRequest = () => ({
    type: FETCH_TICKETS_REQUEST,
});

export const fetchTicketsSuccess = (tickets) => ({
    type: FETCH_TICKETS_SUCCESS,
    payload: tickets,
});

export const fetchAppendTicketsSuccess = (ticket) => ({
    type: FETCH_APPEND_TICKETS_SUCCESS,
    payload: ticket,
});

export const fetchTicketsFailure = (error) => ({
    type: FETCH_TICKETS_FAILURE,
    payload: error,
});

export const setTickets = (tickets) => ({
    type: SET_TICKETS,
    payload: tickets,
});
