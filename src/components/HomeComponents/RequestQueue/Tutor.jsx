import React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { BackendLink } from "../../../utilities/BackendLink";

const Tutor = ({ Tutor }) => {
    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                    alt="Remy Sharp"
                    src={BackendLink + Tutor.photo}
                    sx={{ width: 46, height: 46 }}
                />

                <Typography variant="h6" gutterBottom margin="0px" ml="13px">
                    {Tutor.name} / ({Tutor.pronouns})
                </Typography>
            </Box>

            <Typography
                variant="overline"
                gutterBottom
                textAlign="left"
                ml="62px"
            >
                {Tutor.tickets.length} students on queue.
            </Typography>
        </Box>
    );
};

export default Tutor;
