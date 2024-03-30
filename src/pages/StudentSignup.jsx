import * as React from "react";
import Box from "@mui/material/Box";
import CommonForm from "../components/SignComponents/CommonForm";
import { BG_COLOR_THIRD } from "../utilities/Colors";
import postData from "../utilities/data/PostData";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const StudentSignup = () => {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = React.useState(false);
    const [EmailExistsError, setEmailExistsError] = React.useState(false);
    const [OtherError, setOtherError] = React.useState(false);
    const [userCredential, setUserCredential] = React.useState({
        full_name: "",
        email: "",
        pronouns: "",
        password: "",
        confirm_password: "",
    });

    const signUpClipHandler = () => {
        setEmailExistsError(false);
        setOtherError(false);
        setisLoading(true);

        postData("/api/users/register/", userCredential).then((data) => {
            if (data.success) {
                setisLoading(false);
                navigate("/student/signin");
            } else if (data.status === 400) {
                setEmailExistsError(true);
                setisLoading(false);
            } else {
                setOtherError(true);
                setisLoading(false);
            }
        });
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "calc(100vh - 64px)",
                backgroundColor: BG_COLOR_THIRD,
            }}
        >
            <div style={{ width: "100%" }}>
                <CommonForm
                    isLoading={isLoading}
                    Page="signup"
                    clickHandler={signUpClipHandler}
                    userCredential={userCredential}
                    setUserCredential={setUserCredential}
                />

                <Box
                    sx={{
                        width: ["100%", "70%", "500px", "500px"],
                        display: "block",
                        margin: "0 auto",
                        borderRadius: "5px",
                        paddingBottom: "30px",
                    }}
                >
                    {EmailExistsError ? (
                        <Alert sx={{ marginTop: "10px" }} severity="error">
                            A user with this email already exists!
                        </Alert>
                    ) : (
                        <div></div>
                    )}

                    {OtherError ? (
                        <Alert sx={{ marginTop: "10px" }} severity="error">
                            Some Error happned please try again!
                        </Alert>
                    ) : (
                        <div></div>
                    )}
                </Box>
            </div>
        </Box>
    );
};

export default StudentSignup;
