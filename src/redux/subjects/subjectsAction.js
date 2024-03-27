import {
    FETCH_SUBJECTS_REQUEST,
    FETCH_SUBJECTS_SUCCESS,
    FETCH_SUBJECTS_FAILURE,
    SET_SUBJECTS,
} from "./subjectsTypes";

export const fetchSubjectsRequest = () => ({
    type: FETCH_SUBJECTS_REQUEST,
});

export const fetchSubjectsSuccess = (subjects) => ({
    type: FETCH_SUBJECTS_SUCCESS,
    payload: subjects,
});

export const fetchSubjectsFailure = (error) => ({
    type: FETCH_SUBJECTS_FAILURE,
    payload: error,
});

export const setSubjects = (subjects) => ({
    type: SET_SUBJECTS,
    payload: subjects,
});
