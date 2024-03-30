import * as React from "react";
import Box from "@mui/material/Box";
import CommonForm from "../components/SignComponents/CommonForm";
import { BG_COLOR_THIRD } from "../utilities/Colors";
import postData from "../utilities/data/PostData";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { storeTokens } from "../utilities/tokens/setToken";

const TutorSignin = () => {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = React.useState(false);
    const [EmailExistsError, setEmailExistsError] = React.useState(false);
    const [OtherError, setOtherError] = React.useState(false);
    const [userCredential, setUserCredential] = React.useState({
        email: "",
        password: "",
    });

    const signInClipHandler = () => {
        setEmailExistsError(false);
        setOtherError(false);
        setisLoading(true);

        postData("/api/users/token/tutor/", userCredential).then((data) => {
            if (data.success) {
                storeTokens(data.data).then(() => {
                    navigate("/tutor");
                });
                setisLoading(false);
            } else if (data.status === 401) {
                setEmailExistsError(true);
                setisLoading(false);
            } else {
                setisLoading(false);
                setOtherError(true);
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
                    Page="tutor"
                    clickHandler={signInClipHandler}
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
                            No active account found with the given credentials!
                        </Alert>
                    ) : (
                        <div></div>
                    )}

                    {OtherError ? (
                        <Alert sx={{ marginTop: "10px" }} severity="error">
                            No active account found with the given Email!
                        </Alert>
                    ) : (
                        <div></div>
                    )}
                </Box>
            </div>
        </Box>
    );
};

export default TutorSignin;
