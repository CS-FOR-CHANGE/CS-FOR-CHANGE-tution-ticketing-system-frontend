import * as React from 'react';
import Box from '@mui/material/Box';
import CommonForm from '../components/SignComponents/CommonForm';
import { BG_COLOR_THIRD } from '../utilities/Colors';
import postData from '../utilities/data/PostData';
import { useNavigate } from 'react-router-dom';

const StudentSignup = () => {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = React.useState(false)
    const [userCredential, setUserCredential] = React.useState({
        full_name: "",
        email: "",
        pronouns: "",
        password: "",
        confirm_password: "",
    });

    const signUpClipHandler = () => {
        setisLoading(true)
        postData("/api/users/register/", userCredential).then((data) => {

            if (data) {
                setisLoading(false);
                navigate('/student/signin');
            } else {
                setisLoading(false);
            }
        })
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "calc(100vh - 64px)",
                backgroundColor: BG_COLOR_THIRD
            }}
        >
            <CommonForm
                isLoading={isLoading}
                Page="signup"
                clickHandler={signUpClipHandler}
                userCredential={userCredential}
                setUserCredential={setUserCredential}
            />
        </Box>
    );
};

export default StudentSignup;
