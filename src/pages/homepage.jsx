import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PiStudentBold } from "react-icons/pi";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import Tooltip from '@mui/material/Tooltip';
import { Link } from "react-router-dom";

const Homepage = () => {
    const Block = ({ Text, Icon, TooltipText, Url }) => {
        return (
            <Box
                sx={{ textAlign: "center", cursor: "pointer" }}
            >
                <Link to={Url}>
                    <Tooltip title={TooltipText}>
                        <Icon fontSize="80px" />
                        <Typography variant="h5" gutterBottom>
                            {Text}
                        </Typography>
                    </Tooltip>
                </Link>
            </Box>
        )
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "calc(100vh - 64px)",
                gap: "25px"
            }}
        >
            <Block
                Text="Student"
                Icon={PiStudentBold}
                TooltipText="Login as a student"
                Url="/student/signin"
            />

            <Block
                Text="Tutor"
                Icon={PiChalkboardTeacherBold}
                TooltipText="Login as a tutor"
                Url="/tutor/signin"
            />
        </Box>
    )
}

export default Homepage