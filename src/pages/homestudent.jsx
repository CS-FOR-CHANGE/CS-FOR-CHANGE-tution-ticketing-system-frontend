import { useEffect } from "react";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import RequestQueue from "../components/HomeComponents/RequestQueue/RequestQueue";
import QueueStudents from "../components/HomeComponents/Queues/QueueStudents";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubjectsSuccess } from "../redux/subjects/subjectsAction";
import { fetchTicketsSuccess } from "../redux/ticket/ticketsActions";
import fetchDataAuth from "../utilities/data/FetchdataAuth";
import { setUser } from "../redux/user/actions";
import { retrieveTokens } from "../utilities/tokens/getToken";

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
        // Redirect if a student tryes to access this page
        retrieveTokens().then((tokens) => {
            if (tokens.user_role !== "student") {
                window.location.replace("/");
            }
        });

        // Get the subjects and the tutors associates with the subject
        fetchDataAuth("/api/ticketing/subjects/").then(async (subjects) => {
            const token = await retrieveTokens();
            const organization = token.organization;
            console.log(organization);
            const filtered_subjects = subjects.filter(
                (subject) => subject.organization.name === organization
            );
            dispatch(fetchSubjectsSuccess(filtered_subjects));
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

    console.log(subjects);

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
