import { SET_USER, UPDATE_USER, REMOVE_USER } from "./types";

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

export const updateUser = (updates) => ({
    type: UPDATE_USER,
    payload: updates,
});

export const removeUser = () => ({
    type: REMOVE_USER,
});
