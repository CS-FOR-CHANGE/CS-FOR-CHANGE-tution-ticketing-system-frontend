import "./App.css";
import { useEffect } from "react";
import { BackendLinkWS } from "./utilities/BackendLink";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { fetchAppendTicketsSuccess, deleteTicketSuccess } from "./redux/ticket/ticketsActions";
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
            } else if (action === "deleted") {
                dispatch(deleteTicketSuccess(ticket_json.id));            }
        };

        ws.onerror = (error) => {
            console.error("WebSocket Error:", error);
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
