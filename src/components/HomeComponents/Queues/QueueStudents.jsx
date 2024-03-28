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

export default function QueueStudents({ Status, Tickets }) {
    const User = useSelector((state) => state.User.user);
    // Initialize with 10 minutes and 0 seconds
    const [timeLeft, setTimeLeft] = React.useState({
        minutes: 10,
        seconds: 0,
    });

    // Format timeLeft to include leading zeros
    const formatTimeLeft = (time) => {
        return `${time.minutes}:${time.seconds
            .toString()
            .padStart(2, "0")} minute(s)`;
    };

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
            <Typography variant="h5" gutterBottom textAlign="left" mb="15px">
                Estimated wait time:{" "}
                {timeLeft.minutes === 0 && timeLeft.seconds === 0
                    ? "Countdown finished"
                    : formatTimeLeft(timeLeft)}
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: "100%" }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Student</StyledTableCell>
                            <StyledTableCell align="left">
                                Tutor
                            </StyledTableCell>

                            <StyledTableCell align="left">
                                Session Time
                            </StyledTableCell>
                            <StyledTableCell align="left"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTickets.map((ticket) => (
                            <StyledTableRow key={ticket.id}>
                                <StyledTableCell component="th" scope="row">
                                    {ticket.student.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {ticket.tutor.name} ({ticket.subject.title})
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {ticket.session_time} minutes
                                </StyledTableCell>
                                {User && User.id === ticket.student.id ? (
                                    <StyledTableCell align="left">
                                        <IconButton
                                            color="secondary"
                                            aria-label="remove from queue"
                                            onClick={() => {
                                                leaveQueue(ticket.id);
                                            }}
                                        >
                                            <PersonRemoveAlt1Icon />
                                        </IconButton>
                                    </StyledTableCell>
                                ) : (
                                    <StyledTableCell></StyledTableCell>
                                )}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
