import { Avatar, Box, Button, Fab, FormControl, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import dayjs from "dayjs";
import FormControlLabel from '@mui/material/FormControlLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import EditIcon from '@mui/icons-material/Edit';

import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { postNewUser, updateUserInfo } from "../Redux/actions";
// import MyProfileInput from "./MyProfileInput";



const MyProfile = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [city, setCity] = useState("")
    const [birth_date, setBirth] = useState("")
    const [gender, setGender] = useState("")
    const [info, setInfo] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const [isNewUser, setIsNewUser] = useState(false)


    useEffect(() => {
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setCity(user.city);
        setBirth(user.birth_date);
        setGender(user.gender);
        setInfo(user.info);
        first_name !== "" || first_name ? setIsEdit(false) : setIsEdit(true)
        last_name !== "" || last_name ? setIsNewUser(false) : setIsNewUser(true)

        // if(!first_name || first_name === "" ){
        //     setIsEdit(true)
        //     setIsNewUser(true)
        // }
        console.log(first_name, last_name, city, birth_date)
        console.log(dayjs(birth_date).format('DD-MM-YYYY'));
    }, [user])



    const changeAvatar = () => {
        console.log("change avatar");
    }

    const saveData = (e) => {
        if ( first_name ==="" || last_name==="" || city==="" || birth_date==="Invalid Date" || gender==="" ) return e.preventDefault()
        setIsEdit(!isEdit)
        console.log({first_name,last_name,city,birth_date,gender,info});
        if (isNewUser) dispatch(postNewUser(user.user_id, user.email,{first_name,last_name,city,birth_date,gender,info}))
        else dispatch(updateUserInfo(user.user_id, user.email,{first_name,last_name,city,birth_date,gender,info}))
    }

    return (
        <Box sx={{ flexGrow: 1, width: "95vw" }}>

            <Box sx={{ width: { xs: "100%", md: "30%", lg: "50%" }, }}>
                <Avatar alt={user.first_name ? "Unknown" : user.first_name} src="" onClick={changeAvatar} />

                {/* {isEdit ? <></> :
                    <Fab color="secondary" aria-label="edit" onClick={() => setIsEdit(!isEdit)}>
                        <EditIcon />
                    </Fab>
                } */}

                <FormControl>

                {isEdit ? <></> :
                    <Fab color="secondary" aria-label="edit" onClick={() => setIsEdit(!isEdit)}>
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
                    ? <TextField sx={{ m: 1, width: '25ch', bgcolor: 'white' }} id='info' 
                        maxRows={4}
                        variant="standard"
                        defaultValue={info ? info : "About you"}
                        onChange={(e) => setInfo(e.target.value)} />
                    : <FormLabel >About you: {info}</FormLabel>
                    }

                    {isEdit
                    ? <Button onClick={(e) => saveData(e)}>Save</Button>
                    : <></>
                    }
                </FormControl>
            </Box>

            <Box sx={{ width: { xs: "100%", md: "70%", lg: "70%" }, }}>

            </Box>

        </Box>
    )
}

export default MyProfile