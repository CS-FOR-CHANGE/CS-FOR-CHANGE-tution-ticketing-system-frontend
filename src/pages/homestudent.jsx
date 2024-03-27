import { useEffect } from "react";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import RequestQueue from "../components/HomeComponents/RequestQueue/RequestQueue";
import QueueStudents from "../components/HomeComponents/Queues/QueueStudents";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubjectsSuccess } from "../redux/subjects/subjectsAction";
import { fetchTicketsSuccess, fetchAppendTicketsSuccess } from "../redux/ticket/ticketsActions";
import fetchDataAuth from "../utilities/data/FetchdataAuth";
import { setUser } from "../redux/user/actions";
import { BackendLinkWS } from "../utilities/BackendLink";

const HomeStudent = ({ Status }) => {
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
        // Get the subjects and the tutors associates with the subject
        fetchDataAuth("/api/ticketing/subjects/").then((data) => {
            dispatch(fetchSubjectsSuccess(data));
        });

        // Get all the tickets
        fetchDataAuth("/api/ticketing/tickets/").then((data) => {
            dispatch(fetchTicketsSuccess(data));
        });

        // Get the user data
        fetchDataAuth("/api/users/user/").then((data) => {
            dispatch(setUser(data));
        });
    }, []);

    //Connect with tutor update websocket
    useEffect(() => {
        // Assuming your Django app runs on localhost and port 8000
        // Adjust the URL to match your Django server's host and port
        const ws = new WebSocket(BackendLinkWS + "/ws/tickets/");

        ws.onopen = () => {
            console.log("WebSocket Connected");
        };

        ws.onmessage = (e) => {
            const message = JSON.parse(e.data);
            const message_json = JSON.parse(message.message)

            dispatch(fetchAppendTicketsSuccess(message_json));
        };

        ws.onerror = (error) => {
            console.error("WebSocket Error:", error);
        };

        ws.onclose = () => {
            console.log("WebSocket Disconnected");
        };

        // Cleanup function to close the WebSocket connection when the component unmounts
        return () => {
            ws.close();
        };
    }, []);

    return (
        <Box className="Home-page">
            <Container
                maxWidth="xl"
                sx={{
                    display: ["block", "block", "flex", "flex"],
                    justifyContent: "space-between",
                    gap: "25px",
                    mt: "25px",
                }}
            >
                <Box
                    sx={{ width: ["100%", "100%", "50%", "50%"] }}
                    className="request-queue-box"
                >
                    <RequestQueue Subjects={subjects} />
                </Box>

                <Box
                    sx={{
                        width: ["100%", "100%", "50%", "50%"],
                        mt: ["60px", "60px", "0px", "0px"],
                        mb: "60px",
                    }}
                    className="queues-box"
                >
                    {tickets && tickets.length !== 0 ? (
                        <QueueStudents Status={Status} Tickets={tickets} />
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

export default HomeStudent;
