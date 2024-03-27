import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SubjectSelect({ Subjects }) {
    const [subject, setsubject] = React.useState("");

    const handleChange = (event) => {
        setsubject(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                <Select
                    sx={{ textAlign: "left" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={subject}
                    label="Subject"
                    onChange={handleChange}
                >
                    {Subjects.map((subject) => {
                        return (
                            <MenuItem key={subject.id} value={subject.id}>
                                {subject.title}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Box>
    );
}
