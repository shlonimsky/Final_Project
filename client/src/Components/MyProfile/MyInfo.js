import { Box, Button, Fab, FormControl, FormLabel, TextField,  } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../../Redux/actions";


const MyInfo = ({user}) => {
    const dispatch = useDispatch()
    const [isEdit,setIsEdit] = useState(false)
    const [info, setInfo] = useState(user.info || "")

    const saveData = (e) => {
        setIsEdit(false)
        dispatch(updateUserInfo(user.user_id, user.email,{
            first_name:user.first_name,
            last_name:user.last_name,
            city : user.city,
            birth_date : user.birth_date,
            gender: user.gender,
            info
        }))
    }

    return(
        <Box >
             <FormControl>
                { isEdit 
                ? ( <>
                    <TextField sx={{ m: 1, width: '25ch', bgcolor: 'white' }} id='info' 
                    maxRows={4}
                    variant="standard"
                    defaultValue={info ? info : "About you"}
                    onChange={(e) => setInfo(e.target.value)} />
                    <Button onClick={() => {
                        setIsEdit(false);
                        setInfo(user.info)
                        }}>Cancel</Button>

                    <Button onClick={(e) => saveData(e)}>Save</Button>
                </>) 
                : (<FormLabel >About you: 
                    { user.first_name 
                    ? <Fab color="secondary" aria-label="edit" onClick={() => setIsEdit(true)}>
                        <EditIcon color="textColor"/>
                    </Fab>
                    : <></>}
                    {info}
                    </FormLabel>
                )}
            </FormControl>
        </Box>
    )
}

export default MyInfo