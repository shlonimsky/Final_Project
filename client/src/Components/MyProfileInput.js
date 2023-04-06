import { useState } from "react";
import { TextField } from "@mui/material";

const MyProfileInput = ({title,value}) => {
    // const title = props.title
    // const [value, setValue] = useState('')
    console.log("title and value in input",title,value)
    const handleChange = (e) => {
        // console.log({`${title}`:value});
    }
    return(
        <TextField sx={{ m: 1, width: '25ch', bgcolor: 'white' }} id='first_name' label="First Name" variant="outlined"
        // error={email === "" ? false : ("")}
        // helperText={email === "" || regex.test(email) ? "" : "Incorrect entry."}
        onChange={(e) => handleChange(e)} />
    )
}

export default MyProfileInput