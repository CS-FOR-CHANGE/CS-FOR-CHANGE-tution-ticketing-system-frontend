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

export default function QueueStudents({ Status, Tickets }) {
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Tickets.map((ticket) => (
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
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
