import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import { useSelector } from "react-redux";
import fetchDataAuth from "../../../utilities/data/FetchdataAuth";
import CountdownTimer from "./CountdownTimer";
import UserTurnCountdown from "./UserTurnCountdown";
import Tooltip from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const leaveQueue = (ticketID) => {
    fetchDataAuth(`/api/ticketing/tickets/${ticketID}/delete/`, "DELETE").then(
        (data) => {}
    );
};

const statusMessages = {
    ready: "Tutor is ready for the student",
    waiting: "Waiting for the tutor",
    helping: "Tutor is currently helping the student",
    completed: "Session has been completed", // Example of another possible status
    // Add other statuses as necessary
};

export default function QueueStudents({ Status, Tickets }) {
    const User = useSelector((state) => state.User.user);

    //Filter out which tutor is queued for
    let tutorIdsForLoggedInStudent = new Set();

    if (User) {
        // Only proceed to collect tutor IDs if User is not null
        tutorIdsForLoggedInStudent = Tickets.reduce((acc, ticket) => {
            if (ticket.student.id === User.id) {
                acc.add(ticket.tutor.id);
            }
            return acc;
        }, new Set());
    }

    // Proceed to filter tickets only if we have any tutor IDs identified
    // If User is null, this will effectively skip filtering based on tutors
    const filteredTickets = User
        ? Tickets.filter((ticket) =>
              tutorIdsForLoggedInStudent.has(ticket.tutor.id)
          )
        : [];

    return (
        <Box className="Queues">
            {/* <Typography variant="h5" gutterBottom textAlign="left" mb="15px">
                <UserTurnCountdown sessions={Tickets} userId={User.id} />
            </Typography> */}

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: "100%" }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Student</StyledTableCell>
                            <StyledTableCell align="left">
                                Tutor
                            </StyledTableCell>

                            {/* <StyledTableCell align="left">
                                Session Time
                            </StyledTableCell> */}
                            <StyledTableCell align="left"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTickets.map((ticket, index) => {
                            return (
                                <StyledTableRow key={ticket.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {ticket.student.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {ticket.tutor.name} (
                                        {ticket.subject.title})
                                    </StyledTableCell>
                                    {/* <StyledTableCell align="left">
                                    <CountdownTimer
                                        startTime={ticket.start_time}
                                        endTime={ticket.end_time}
                                    />
                                </StyledTableCell> */}
                                    <StyledTableCell
                                        align="left"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        {index === 0 ? (
                                            <Alert
                                                severity="error"
                                                color={
                                                    ticket.status === "waiting"
                                                        ? "warning"
                                                        : ticket.status ===
                                                          "ready"
                                                        ? "info"
                                                        : ticket.status ===
                                                          "helping"
                                                        ? "success"
                                                        : "warning"
                                                }
                                            >
                                                {statusMessages[
                                                    ticket.status
                                                ] || "Status unknown"}
                                            </Alert>
                                        ) : (
                                            <Box></Box>
                                        )}

                                        {User &&
                                        User.id === ticket.student.id ? (
                                            <Tooltip title="Leave from queue">
                                                <IconButton
                                                    color="secondary"
                                                    aria-label="remove from queue"
                                                    onClick={() => {
                                                        leaveQueue(ticket.id);
                                                    }}
                                                >
                                                    <PersonRemoveAlt1Icon />
                                                </IconButton>
                                            </Tooltip>
                                        ) : (
                                            <Box></Box>
                                        )}
                                    </StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
