import "./App.css";
import { useEffect } from "react";
import { BackendLinkWS } from "./utilities/BackendLink";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import {
    fetchAppendTicketsSuccess,
    deleteTicketSuccess,
    updateTicketSuccess,
} from "./redux/ticket/ticketsActions";
import fetchDataAuth from "./utilities/data/FetchdataAuth";
import { retrieveTokens } from "./utilities/tokens/getToken";
import { fetchSubjectsSuccess } from "./redux/subjects/subjectsAction";
// Component import
import ResponsiveAppBar from "./utilities/Header";

// Pages import
import Homepage from "./pages/homepage";
import StudentSignin from "./pages/StudentSignin";
import StudentSignup from "./pages/StudentSignup";
import TutorSignin from "./pages/TutorSignin";
import HomeStudent from "./pages/homestudent";
import Hometutor from "./pages/hometutor";

function App() {
    const dispatch = useDispatch();

    const fetchSubjects = () => {
        fetchDataAuth("/api/ticketing/subjects/").then(async (subjects) => {
            const token = await retrieveTokens();
            const organization = token.organization;
            const filtered_subjects = subjects.filter(
                (subject) => subject.organization.name === organization
            );
            dispatch(fetchSubjectsSuccess(filtered_subjects));
        });
    };

    //Connect with tutor update websocket
    useEffect(() => {
        // Assuming your Django app runs on localhost and port 8000
        // Adjust the URL to match your Django server's host and port
        const ws = new WebSocket(BackendLinkWS + "/ws/tickets/");

        ws.onopen = () => {};

        ws.onmessage = (e) => {
            const message = JSON.parse(e.data);

            const action = message.action;
            const ticket_json = JSON.parse(message.message);

            if (action === "added") {
                dispatch(fetchAppendTicketsSuccess(ticket_json));

                // Get the subjects and the tutors associates with the subject
                fetchSubjects();
            } else if (action === "deleted") {
                dispatch(deleteTicketSuccess(ticket_json.id));

                // Get the subjects and the tutors associates with the subject
                fetchSubjects();
            } else if (action === "update") {
                dispatch(updateTicketSuccess(ticket_json));

                // Get the subjects and the tutors associates with the subject
                fetchSubjects();
            }
        };

        ws.onerror = (error) => {
            //Error
        };

        ws.onclose = () => {};

        // Cleanup function to close the WebSocket connection when the component unmounts
        return () => {
            ws.close();
        };
    }, []);

    return (
        <div className="App">
            <ResponsiveAppBar />

            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/student/signup" element={<StudentSignup />} />
                <Route path="/student/signin" element={<StudentSignin />} />
                <Route path="/tutor/signin" element={<TutorSignin />} />
                <Route
                    path="/student"
                    element={<HomeStudent Status="student" />}
                />
                <Route path="/tutor" element={<Hometutor Status="tutor" />} />
            </Routes>
        </div>
    );
}

export default App;
