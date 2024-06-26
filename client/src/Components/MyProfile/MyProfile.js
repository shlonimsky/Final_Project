import { Avatar, Box, Button, Fab, FormControl, FormLabel, Grid, MenuItem, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import FormControlLabel from '@mui/material/FormControlLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import EditIcon from '@mui/icons-material/Edit';

import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { setUserById,postNewUser, updateUserInfo } from "../../Redux/actions";


const MyProfile = ({ user , allCities}) => {
    console.log(user)
    const dispatch = useDispatch();
    // const user = useSelector(state => state.user)
    const [first_name, setFirstName] = useState(user.first_name || "")
    const [last_name, setLastName] = useState(user.last_name || "")
    const [city, setCity] = useState(user.city || "")
    const [birth_date, setBirth] = useState(user.birth_date || "")
    const [gender, setGender] = useState(user.gender || "female")
    const [info, setInfo] = useState(user.info || "")
    const [isEdit, setIsEdit] = useState(first_name === "" ? true : false)
    const [isNewUser, setIsNewUser] = useState(last_name === "" ? true : false)

    useEffect(() => {
// dispatch(setUserById(user.user_id, user.email))
    },[])


    const saveData = (e) => {
        // console.log(first_name, last_name, city,birth_date,"gender: ",gender,".");
        if (first_name === "" || last_name === "" || city === "" || birth_date === "Invalid Date" || gender === "") return e.preventDefault()
        setIsEdit(false)
        console.log({ first_name, last_name, city, birth_date, gender, info });
        if (isNewUser) dispatch(postNewUser(user.user_id, user.email, { first_name, last_name, city, birth_date, gender, info }))
        else dispatch(updateUserInfo(user.user_id, user.email, { first_name, last_name, city, birth_date, gender, info }))
    }

    return (
        <Box sx={{width:"100%"}}>

            {isEdit
                ? <Box sx={{marginBottom:"15%", display: "flex", flexDirection: "column"}}>
                    <TextField sx={{ m: 1, width: '25ch', bgcolor: 'white' }} id='first_name' variant="standard"
                        required
                        defaultValue={first_name}
                        // disabled={!isEdit}
                        size="small"
                        error={first_name === "" ? true : false}
                        helperText={first_name === "" ? "Enter your first name" : ""}
                        onChange={(e) => setFirstName(e.target.value.trim())} />
                    <TextField sx={{ m: 1, width: '25ch', bgcolor: 'white' }} id='last_name' variant="standard"
                        size="small"
                        defaultValue={last_name}
                        error={last_name === "" ? true : false}
                        helperText={last_name === "" ? "Enter your last name" : ""}
                        onChange={(e) => setLastName(e.target.value.trim())} />
                    <TextField sx={{ m: 1, width: '25ch', bgcolor: 'white' }} id='email' variant="standard"
                        disabled
                        defaultValue={user.email} />
                    <Box>
                        <FormLabel >Gender</FormLabel>
                        <RadioGroup defaultValue={gender} onChange={(e) => setGender(e.target.value)}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </Box>

                    <TextField defaultValue={user.city || ""} id="city"  helperText="Please, select the city" select onChange={(e) => setCity(e.target.value)}>
                    { allCities ? allCities.map(item => (
                            <MenuItem key={item.id} value={item.title}>
                            {item.title}
                            </MenuItem>
                        ))
                        : <MenuItem value={''}></MenuItem>}
                    </TextField>

                    {/* <TextField sx={{ m: 1, width: '25ch', bgcolor: 'white' }} id='city' variant="standard"
                        // disabled={!isEdit}
                        defaultValue={city ? city : "City"}
                        error={city === "" ? true : false}
                        helperText={city === "" ? "Enter your city" : ""}
                        onChange={(e) => setCity(e.target.value.trim())} /> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker value={dayjs(birth_date)}
                            variant="standard"
                            onChange={(date) => dayjs(date).isBefore() && setBirth(dayjs(date).format('YYYY-MM-DD'))}
                        />
                    </LocalizationProvider>
                    <Box>
                    <Button onClick={(e) => setIsEdit(false)}>Cancel</Button>
                    <Button onClick={(e) => saveData(e)}>Save</Button>
                    </Box>

                </Box>

                :
                <Box sx={{width:"100%"}}>
                    <Box sx={{display:"flex", justifyContent:"space-between", paddingTop:"15px"}}>
                    {/* <FormLabel >{first_name}  {last_name}    </FormLabel> */}
                    <Box>
                    <Typography variant="h6">{first_name}</Typography>
                    <Typography variant="h6">{last_name} </Typography>
                    </Box>
                    


                    <Fab size="small" color="secondary" aria-label="edit" onClick={() => setIsEdit(true)}>
                        <EditIcon color="textColor" />
                    </Fab>
                    </Box>
                    {/* <FormLabel >{last_name}</FormLabel> <br/> */}
                    <Typography variant="subtitle1">{user.email}</Typography>
                    <Typography variant="subtitle1">{gender}</Typography>
                    <Typography variant="subtitle1">{city}</Typography>
                    <Typography variant="subtitle1">{dayjs(birth_date).format('DD-MM-YYYY')} </Typography>
                </Box>

            }


        </Box>
    )
}

export default MyProfile

{/* <FormControl>

{isEdit ? <></> :
    <Fab color="secondary" aria-label="edit" onClick={() => setIsEdit(true)}>
        <EditIcon color="textColor"/>
    </Fab>
}

    {isEdit
        ? <TextField sx={{ m: 1, width: '25ch', bgcolor: 'white' }} id='first_name' variant="standard"
            required
            defaultValue={first_name}
            // disabled={!isEdit}
            size="small"
            error={first_name === "" ? true : false}
            helperText={first_name === "" ? "Enter your first name" : ""}
            onChange={(e) => setFirstName(e.target.value.trim())} />
        : <FormLabel>{first_name} </FormLabel>
    }

    {isEdit
        ? <TextField sx={{ m: 1, width: '25ch', bgcolor: 'white' }} id='last_name' variant="standard"
            size="small"
            defaultValue={last_name ? last_name : "Last name"}
            error={last_name === "" ? true : false}
            helperText={last_name === "" ? "Enter your last name" : ""}
            onChange={(e) => setLastName(e.target.value.trim())} />
        : <FormLabel >{last_name}</FormLabel>}

    {isEdit
        ? <TextField sx={{ m: 1, width: '25ch', bgcolor: 'white' }} id='email' variant="standard"
            disabled
            defaultValue={user.email} />
        : <FormLabel >{user.email} </FormLabel>
    }

    {isEdit
        ? <>
            <FormLabel >Gender</FormLabel>
            <RadioGroup defaultValue="female" onChange={(e) => setGender(e.target.value)}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
        </>
        : <FormLabel >{gender} </FormLabel>
    }
    {isEdit
        ? <TextField sx={{ m: 1, width: '25ch', bgcolor: 'white' }} id='city' variant="standard"
            // disabled={!isEdit}
            defaultValue={city ? city : "City"}
            error={city === "" ? true : false}
            helperText={city === "" ? "Enter your city" : ""}
            onChange={(e) => setCity(e.target.value.trim())} />
        : <FormLabel >{city}</FormLabel>
    }

    {isEdit
        ? <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker value={dayjs(birth_date)}
                variant="standard" 
                onChange={(date) => dayjs(date).isBefore() && setBirth(dayjs(date).format('YYYY-MM-DD'))}
                />
        </LocalizationProvider>
        : <FormLabel >{dayjs(birth_date).format('DD-MM-YYYY')} </FormLabel>
    }

    {isEdit
    ? <Button onClick={(e) => saveData(e)}>Save</Button>
    : <></>
    }
</FormControl> */}