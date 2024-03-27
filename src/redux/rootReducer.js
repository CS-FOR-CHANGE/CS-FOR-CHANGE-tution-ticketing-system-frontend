import { combineReducers } from "redux";
import subjectsReducer from "./subjects/subjectsReducer";
import ticketsReducer from "./ticket/ticketsReducer";
import userReducer from "./user/reducer";

const rootReducer = combineReducers({
    Subjects: subjectsReducer,
    Tickets: ticketsReducer,
    User: userReducer,
});

export default rootReducer;
