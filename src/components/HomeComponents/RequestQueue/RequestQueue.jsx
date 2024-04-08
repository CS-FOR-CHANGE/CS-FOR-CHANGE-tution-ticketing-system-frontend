import React from "react";
import { Box } from "@mui/material";
import Subject from "./Subject";
import Typography from "@mui/material/Typography";

const RequestQueue = ({ Subjects }) => {
    return (
        <Box className="request-queue" sx={{ textAlign: "left" }}>
            <Typography variant="h5" gutterBottom textAlign="left" mb="15px">
                Select a tutor to get in the queue
            </Typography>

            {Subjects ? (
                Subjects.map((subject) => {
                    if (subject.tutors && subject.tutors.length !== 0) {
                        return (
                            <Subject
                                key={subject.id}
                                SubjectID={subject.id}
                                SubjectName={subject.title}
                                Description={subject.description}
                                Tutors={subject.tutors}
                            />
                        );
                    }
                })
            ) : (
                <Typography
                    variant="overline"
                    gutterBottom
                    textAlign="left"
                    mb="15px"
                >
                    None of the tutors are avalable
                </Typography>
            )}
        </Box>
    );
};

export default RequestQueue;
