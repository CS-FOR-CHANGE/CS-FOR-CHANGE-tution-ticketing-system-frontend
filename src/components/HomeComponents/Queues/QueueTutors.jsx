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
import Alert from "@mui/material/Alert";
import Tooltip from "@mui/material/Tooltip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import postDataAuth from "../../../utilities/data/PostDataAuth";

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

export default function QueueTutors({ Status, Tickets, Subjects }) {
    const User = useSelector((state) => state.User.user);
    const [StatusT, setStatusT] = React.useState({});

    // Initialize StatusT on component mount or when filteredTickets changes
    React.useEffect(() => {
        const initialStatuses = {};
        Tickets.forEach((ticket) => {
            initialStatuses[ticket.id] = ticket.status;
        });
        setStatusT(initialStatuses);
    }, [Tickets]);

    const handleChange = (newStatus, ticketId) => {
        setStatusT((prevStatuses) => ({
            ...prevStatuses,
            [ticketId]: newStatus,
        }));
        postDataAuth(
            `/api/ticketing/ticket/${ticketId}/status/`,
            {
                status: newStatus,
            },
            "PATCH"
        ).then((data) => {});
    };

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
                        {filteredTickets.map((ticket, index) => {
                            return (
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

                                        {index === 0 ? (
                                            <FormControl
                                                sx={{ m: 1, minWidth: 120 }}
                                            >
                                                <InputLabel id="demo-simple-select-autowidth-label">
                                                    Change status
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-autowidth-label"
                                                    id="demo-simple-select-autowidth"
                                                    value={
                                                        StatusT[ticket.id] || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleChange(
                                                            e.target.value,
                                                            ticket.id
                                                        )
                                                    }
                                                    autoWidth
                                                    label="Status"
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value="ready">
                                                        <em>Ready for Help</em>
                                                    </MenuItem>
                                                    <MenuItem value="helping">
                                                        <em>Helping</em>
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        ) : (
                                            <Box></Box>
                                        )}

                                        <Tooltip title="Remove from queue">
                                            <IconButton
                                                color="secondary"
                                                aria-label="add an alarm"
                                                onClick={() => {
                                                    leaveQueue(ticket.id);
                                                }}
                                            >
                                                <PersonRemoveAlt1Icon />
                                            </IconButton>
                                        </Tooltip>
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
