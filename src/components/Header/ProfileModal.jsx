import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { BackendLink } from "../../utilities/BackendLink";
import TextField from "@mui/material/TextField";
import { retrieveTokens } from "../../utilities/tokens/getToken";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function ProfileModal({ Open, setOpen, User }) {
    const fileInputRef = React.useRef(null);
    const [avatarUrl, setAvatarUrl] = React.useState("");
    const [errors, setErrors] = React.useState({ user_email: "" });
    const [user, setUser] = React.useState({
        name: "",
        user_email: "",
        pronouns: "",
    });
    const [isChanged, setIsChanged] = React.useState(false);
    const handleClose = () => setOpen(false);

    // fetching user data
    React.useEffect(() => {
        const User_obj = {
            name: User && User.name,
            user_email: User && User.user_email,
            pronouns: User && User.pronouns,
        };
        setUser(User_obj);
    }, [User]);

    const validateEmail = (email) => {
        const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Email validation
        if (name === "user_email") {
            if (!validateEmail(value)) {
                // Set an error message
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    user_email: "Please enter a valid email address.",
                }));
            } else {
                // Clear the error message if the email is valid
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    user_email: "",
                }));
            }
        }

        setIsChanged(true);
    };

    const handleChangeClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            // Create a URL for the selected file
            const imageUrl = URL.createObjectURL(file);
            setAvatarUrl(imageUrl);

            setIsChanged(true);
        }
    };

    const handleSave = async () => {
        const token = await retrieveTokens();
        const formData = new FormData();
        formData.append("user_id", User && User.id); // Assuming `User` contains the user's ID
        formData.append("name", user.name);
        formData.append("user_email", user.user_email);
        formData.append("pronouns", user.pronouns);

        if (avatarUrl) {
            formData.append("photo", fileInputRef.current.files[0]);
        }

        try {
            const response = await fetch(
                BackendLink + "/api/users/user/update-profile/",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`, // Adjust according to how retrieveTokens() provides the token
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                // Assuming the server response contains field-specific errors
                if (data.errors) {
                    // Update the errors state based on the errors received from the server
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        ...data.errors,
                    }));
                } else {
                    // Handle generic or other specific errors
                    throw new Error(data.message || "An error occurred");
                }
            } else {
                // Handle success here
                setIsChanged(false);
                // Optionally clear errors if the update is successful
                setErrors({ user_email: "" });

                window.location.reload();
            }
        } catch (error) {
            // Handle errors not related to the response here (e.g., network errors)
        }
    };

    return (
        <div>
            <Modal
                keepMounted
                open={Open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            alt={user.name}
                            src={
                                avatarUrl ||
                                (User !== null ? BackendLink + User.photo : "")
                            }
                            sx={{ width: 86, height: 86 }}
                        />
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            id="image-upload"
                            onChange={handleImageChange}
                        />
                        <Button
                            variant="text"
                            sx={{ mt: "5px" }}
                            onClick={handleChangeClick}
                        >
                            Change
                        </Button>
                    </Box>

                    <Box sx={{ marginTop: "20px" }}>
                        <TextField
                            name="name"
                            type="text"
                            id="filled-basic"
                            label="Name"
                            variant="filled"
                            fullWidth
                            value={user.name}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChange}
                        />

                        <TextField
                            name="user_email"
                            sx={{ mt: "15px" }}
                            type="email"
                            id="filled-basic"
                            label="Email"
                            variant="filled"
                            fullWidth
                            value={user.user_email}
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                            error={!!errors.user_email} // Converts the string to a boolean: true if there's an error message
                            helperText={errors.user_email} // Displays the error message, if any
                        />

                        <TextField
                            name="pronouns"
                            sx={{ mt: "15px" }}
                            type="text"
                            id="filled-basic"
                            label="Pronouns"
                            variant="filled"
                            fullWidth
                            value={user.pronouns}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChange}
                        />

                        <Button
                            disabled={!isChanged}
                            sx={{ marginTop: "15px" }}
                            variant="contained"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
