import * as React from "react";
import Box from "@mui/material/Box";
import CommonForm from "../components/SignComponents/CommonForm";
import { BG_COLOR_THIRD } from "../utilities/Colors";
import postData from "../utilities/data/PostData";
import { useNavigate } from "react-router-dom";
import { storeTokens } from "../utilities/tokens/setToken";

const StudentSignin = () => {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = React.useState(false);
    const [userCredential, setUserCredential] = React.useState({
        email: "",
        password: "",
        organization: "",
    });

    const signInClipHandler = () => {
        setisLoading(true);
        postData("/api/users/token/student/", userCredential).then((data) => {
            if (data) {
                storeTokens(data).then(() => {
                    navigate("/student");
                });
                setisLoading(false);
            } else {
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
            <CommonForm
                isLoading={isLoading}
                Page="signin"
                clickHandler={signInClipHandler}
                userCredential={userCredential}
                setUserCredential={setUserCredential}
            />
        </Box>
    );
};

export default StudentSignin;
