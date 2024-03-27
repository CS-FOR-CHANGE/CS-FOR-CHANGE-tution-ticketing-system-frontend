import { useEffect } from "react";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import QueueTutors from "../components/HomeComponents/Queues/QueueTutors";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubjectsSuccess } from "../redux/subjects/subjectsAction";
import { fetchTicketsSuccess } from "../redux/ticket/ticketsActions";
import fetchDataAuth from "../utilities/data/FetchdataAuth";
import { retrieveTokens } from "../utilities/tokens/getToken";

const Hometutor = ({ Status }) => {
    const dispatch = useDispatch();
    const {
        subjects,
        loading: subjectsLoading,
        error: subjectsError,
    } = useSelector((state) => state.Subjects);
    const {
        tickets,
        loading: ticketsLoading,
        error: ticketsError,
    } = useSelector((state) => state.Tickets);

    useEffect(() => {
        // Redirect if a student tryes to access this page
        retrieveTokens().then((tokens) => {
            if (tokens.user_role !== "tutor") {
                window.location.replace("/");
            }
        });

        // Get the subjects and the tutors associates with the subject
        fetchDataAuth("/api/ticketing/subjects/").then((data) => {
            dispatch(fetchSubjectsSuccess(data));
        });

        // Get all the tickets
        fetchDataAuth("/api/ticketing/tickets/").then((data) => {
            dispatch(fetchTicketsSuccess(data));
        });
    }, []);

    return (
        <Box className="Home-page">
            <Container
                maxWidth="xl"
                sx={{
                    display: ["block", "block", "flex", "flex"],
                    justifyContent: "center",
                    gap: "25px",
                    mt: "25px",
                }}
            >
                <Box
                    sx={{
                        width: ["100%", "100%", "80%", "80%"],
                        mt:
                            Status === "student"
                                ? ["60px", "60px", "0px", "0px"]
                                : "0px",
                        mb: "60px",
                    }}
                    className="queues-box"
                >
                    {tickets && tickets.length !== 0 ? (
                        <QueueTutors
                            Status={Status}
                            Tickets={tickets}
                            Subjects={subjects}
                        />
                    ) : (
                        <Typography
                            variant="overline"
                            gutterBottom
                            textAlign="left"
                            mb="15px"
                        >
                            No ticket been created.
                        </Typography>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default Hometutor;
