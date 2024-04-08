import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import fetchData from "../../utilities/data/Fetchdata";
import LoadingButton from "@mui/lab/LoadingButton";

const CommonForm = ({
    isLoading,
    Page,
    clickHandler,
    userCredential,
    setUserCredential,
}) => {
    const [Organizations, setOrganizations] = useState([]);
    const requiredFieldsForSignup = [
        "full_name",
        "email",
        "pronouns",
        "password",
        "confirm_password",
    ];
    const requiredFieldsForSignin = ["email", "password", "organization"];

    useEffect(() => {
        fetchData("/api/ticketing/organizations/").then((data) => {
            setOrganizations(data);
        });
    }, []);

    // Check if all the fields have been filled
    function areAllFieldsFilled(credential, requiredFields) {
        return Object.keys(credential).every((field) =>
            requiredFields.includes(field) ? credential[field].trim() : true
        );
    }

    //Change the Organization
    const handleOrganizationChange = (event) => {
        setUserCredential({
            ...userCredential,
            organization: event.target.value,
        });
    };

    return (
        <Card
            sx={{
                width: ["100%", "70%", "500px", "500px"],
                display: "block",
                margin: "0 auto",
                padding: ["10px 5px", "10px 5px", "10px 25px", "10px 25px"],
                borderRadius: "5px",
                paddingBottom: "30px",
            }}
        >
            <CardContent>
                <Box sx={{ marginBottom: "25px" }}>
                    <Avatar sx={{ textAlign: "center", margin: "0 auto" }}>
                        <LockIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {Page === "signin" || Page === "tutor"
                            ? "Sign In"
                            : "Sign Up"}
                    </Typography>
                </Box>
                {Page === "signup" ? (
                    <TextField
                        required={true}
                        sx={{ mt: "15px" }}
                        fullWidth
                        id="outlined-name"
                        label="Full Name"
                        variant="outlined"
                        onChange={(e) => {
                            setUserCredential({
                                ...userCredential,
                                full_name: e.target.value,
                            });
                        }}
                    />
                ) : (
                    <Box></Box>
                )}
                <TextField
                    required={true}
                    sx={{ mt: "15px" }}
                    fullWidth
                    id="outlined-email"
                    label="Email"
                    variant="outlined"
                    onChange={(e) => {
                        setUserCredential({
                            ...userCredential,
                            email: e.target.value,
                        });
                    }}
                />
                {Page === "signup" ? (
                    <TextField
                        required={true}
                        sx={{ mt: "15px" }}
                        fullWidth
                        id="outlined-name"
                        label="Pronouns"
                        variant="outlined"
                        onChange={(e) => {
                            setUserCredential({
                                ...userCredential,
                                pronouns: e.target.value,
                            });
                        }}
                    />
                ) : (
                    <Box></Box>
                )}
                <TextField
                    required={true}
                    sx={{ mt: "15px" }}
                    fullWidth
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => {
                        setUserCredential({
                            ...userCredential,
                            password: e.target.value,
                        });
                    }}
                />
                {Page === "signup" ? (
                    <TextField
                        required={true}
                        sx={{ mt: "15px" }}
                        fullWidth
                        id="outlined-password-again-input"
                        label="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => {
                            setUserCredential({
                                ...userCredential,
                                confirm_password: e.target.value,
                            });
                        }}
                    />
                ) : (
                    <Box></Box>
                )}

                <FormControl sx={{ textAlign: "left", mt: "20px" }}>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                        Organization
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleOrganizationChange}
                    >
                        {Organizations &&
                            Organizations.map((oranization, index) => {
                                return (
                                    <FormControlLabel
                                        key={index}
                                        value={oranization.name}
                                        control={<Radio />}
                                        label={oranization.name}
                                    />
                                );
                            })}
                    </RadioGroup>
                </FormControl>

                {!isLoading ? (
                    <Button
                        onClick={() => clickHandler()}
                        fullWidth
                        sx={{ mt: "25px" }}
                        variant="outlined"
                        disabled={
                            Page === "signup"
                                ? !areAllFieldsFilled(
                                      userCredential,
                                      requiredFieldsForSignup
                                  )
                                : !areAllFieldsFilled(
                                      userCredential,
                                      requiredFieldsForSignin
                                  )
                        }
                    >
                        {Page === "signin" || Page === "tutor"
                            ? "Sign In"
                            : "Sign Up"}
                    </Button>
                ) : (
                    <LoadingButton
                        sx={{ mt: "25px" }}
                        fullWidth
                        loading
                        variant="outlined"
                    >
                        Submit
                    </LoadingButton>
                )}

                {Page !== "tutor" ? (
                    <Box sx={{ mt: "20px" }}>
                        {Page === "signin" ? (
                            <Link to="/student/signup">
                                Don't have an account? Sign Up
                            </Link>
                        ) : (
                            <Link to="/student/signin">
                                Already have an account? Sign In
                            </Link>
                        )}
                    </Box>
                ) : (
                    <Box></Box>
                )}
            </CardContent>
        </Card>
    );
};

export default CommonForm;
