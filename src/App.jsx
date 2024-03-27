import "./App.css";
import { Routes, Route } from "react-router-dom";
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
