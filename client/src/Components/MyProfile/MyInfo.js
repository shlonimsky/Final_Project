import { Box, Button, Fab, FormControl, FormLabel, TextField, Typography, } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../../Redux/actions";


const MyInfo = ({ user }) => {
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const [info, setInfo] = useState(user.info || "")

    const saveData = (e) => {
        setIsEdit(false)
        dispatch(updateUserInfo(user.user_id, user.email, {
            first_name: user.first_name,
            last_name: user.last_name,
            city: user.city,
            birth_date: user.birth_date,
            gender: user.gender,
            info
        }))
    }

    return (
        <Box sx={{marginBottom:"10px"}}>
            {isEdit
                ? <FormControl sx={{width:"100%"}}>
                        <Typography variant="h6"> About you: </Typography>
                    <TextField sx={{ m: 1, width: '100%', bgcolor: 'white' }} id='info'
                    fullWidth
                        maxRows={4}
                        variant="standard"
                        defaultValue={info ? info : "About you"}
                        onChange={(e) => setInfo(e.target.value)} />
                        <Box sx={{display:"flex"}}>
                        <Button onClick={() => {
                        setIsEdit(false);
                        setInfo(user.info)
                    }}>Cancel</Button>
                        <Button onClick={(e) => saveData(e)}>Save</Button>
                        </Box>
                
                </FormControl>

                : 
                    <Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }} >
                        <Typography variant="h6"> About you: </Typography>
                            {user.user_id && (
                                <Fab size="small" color="secondary" aria-label="edit" onClick={() => setIsEdit(true)}>
                                    <EditIcon color="textColor" />
                                </Fab>
                            )}
                        </Box>
                        <Typography variant="subtitle1"> {info} </Typography>
                    </Box>

                }
        </Box>
        
    )
}

export default MyInfo