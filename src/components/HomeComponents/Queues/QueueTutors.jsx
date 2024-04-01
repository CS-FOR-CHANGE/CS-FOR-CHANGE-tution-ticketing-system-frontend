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
import TextField from "@mui/material/TextField";
import SubjectSelect from "./SubjectsSelect";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import fetchDataAuth from "../../../utilities/data/FetchdataAuth";
import CountdownTimer from "./CountdownTimer";

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

export default function QueueTutors({ Status, Tickets, Subjects }) {
    const User = useSelector((state) => state.User.user);

    // Filter tickets to include only those that have the logged-in user (tutor) as their tutor
    const filteredTickets = User
        ? Tickets.filter((ticket) => ticket.tutor.id === User.id)
        : [];

    return (
        <Box className="Queues">
            {/* <Box sx={{ mb: "40px", width: ["100%", "100%", "400px", "400px"] }}>
                <TextField
                    sx={{ mb: "10px" }}
                    fullWidth
                    id="outlined-basic"
                    label="Student name"
                    variant="outlined"
                />
                <SubjectSelect Subjects={Subjects} />
                <Button
                    sx={{ mt: "10px", display: "block" }}
                    variant="contained"
                >
                    Put to Queue
                </Button>
            </Box> */}

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: "100%" }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Student</StyledTableCell>
                            <StyledTableCell align="left">
                                Subject
                            </StyledTableCell>

                            {/* <StyledTableCell align="left">
                                Session Time
                            </StyledTableCell> */}

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
                                    {ticket.subject.title}
                                </StyledTableCell>
                                {/* <StyledTableCell align="left">
                                    <CountdownTimer
                                        startTime={ticket.start_time}
                                        endTime={ticket.end_time}
                                    />
                                </StyledTableCell> */}
                                <StyledTableCell align="left">
                                    <IconButton
                                        color="secondary"
                                        aria-label="add an alarm"
                                        onClick={() => {
                                            leaveQueue(ticket.id);
                                        }}
                                    >
                                        <PersonRemoveAlt1Icon />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
