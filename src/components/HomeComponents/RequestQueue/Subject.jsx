import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionActions from "@mui/material/AccordionActions";
import Button from "@mui/material/Button";
import Tutor from "./Tutor";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import postDataAuth from "../../../utilities/data/PostDataAuth";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const TicketCreatedSnackBar = ({ open, setOpen, text }) => {
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={text}
                action={action}
            />
        </div>
    );
};

export default function Subject({
    SubjectID,
    SubjectName,
    Description,
    Tutors,
}) {
    const code_num_of_digits = 6;
    const [Code, setCode] = useState("");
    const [selectedTutor, setSelectedTutor] = useState("");
    const [CodeMissmatch, setCodeMissmatch] = useState(false);
    const [Tickexists, setTickexists] = useState(false);
    const [snackBarOpen, setsnackBarOpen] = useState(false);
    const User = useSelector((state) => state.User.user);

    // Function to update the state with the Tutors current value
    const handleTutorChange = (event) => {
        setSelectedTutor(event.target.value);
    };

    // Function to update the state with the input's current value
    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    //Send queue request to the backend and store in to the DB
    const addToQueueClickHandler = () => {
        setCodeMissmatch(false);
        setTickexists(false);

        const TicketObj = {
            student: User.id,
            tutor: selectedTutor,
            subject: SubjectID,
            ticketing_code: Code,
        };

        postDataAuth("/api/ticketing/tickets/create/", TicketObj).then(
            (data) => {
                if (data.success) {
                    setsnackBarOpen(true);
                } else if (
                    data.error === "The provided ticketing code does not match."
                ) {
                    setCodeMissmatch(true);
                } else if (data.error === "Ticket exists for the user") {
                    setTickexists(true);
                }
            }
        );

        // set selected tutor to emply
        setSelectedTutor("");
    };

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                {SubjectName}
            </AccordionSummary>
            <AccordionDetails>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="tutor"
                        name="tutor1"
                        value={selectedTutor}
                        onChange={handleTutorChange}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "20px",
                        }}
                    >
                        <Typography variant="body1" gutterBottom>
                            {Description}
                        </Typography>
                        {Tutors &&
                            Tutors.map((tutor) => {
                                return (
                                    <FormControlLabel
                                        key={tutor.id}
                                        value={tutor.id}
                                        control={<Radio />}
                                        label={<Tutor Tutor={tutor} />}
                                    />
                                );
                            })}
                    </RadioGroup>
                </FormControl>

                <Box sx={{ marginTop: "20px", marginLeft: "35px" }}>
                    <TextField
                        required={true}
                        id="filled-basic"
                        label="Six digit code"
                        variant="filled"
                        value={Code}
                        onChange={handleCodeChange}
                    />
                    {CodeMissmatch ? (
                        <Alert sx={{ marginTop: "10px" }} severity="error">
                            The provided ticketing code does not match.
                        </Alert>
                    ) : (
                        <Box></Box>
                    )}

                    {Tickexists ? (
                        <Alert sx={{ marginTop: "10px" }} severity="error">
                            Can not add another ticket while in queue
                        </Alert>
                    ) : (
                        <Box></Box>
                    )}
                </Box>
            </AccordionDetails>

            <AccordionActions>
                <Button
                    onClick={addToQueueClickHandler}
                    disabled={
                        selectedTutor === "" ||
                        Code.length !== code_num_of_digits
                    }
                >
                    Add to queue
                </Button>
            </AccordionActions>

            <TicketCreatedSnackBar
                open={snackBarOpen}
                setOpen={setsnackBarOpen}
                text="Ticket added"
            />
        </Accordion>
    );
}
