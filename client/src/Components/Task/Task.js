import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Breadcrumbs, Button, CircularProgress, Divider, FormControl, TextField, Typography } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { DateTimePicker } from '@mui/x-date-pickers';

import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Offer from "./Offer";

const Task = (props) => {
    const {id} = useParams();
    const user = useSelector(state => state.user)

    const [task,setTask] = useState(null);
    const [caregory,setCategory] = useState('')
    const [posted,setPosted] = useState(null)
    const [userTask,setUserTask] = useState(null)
    const [helper, setHelper] = useState(null)
    useEffect(() => {
        fetch(`/task/${id}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setTask(res);
            getCategory(res.category_id)
            getUser(res.user_id)
            getHelper(res.helper_id)
            setPosted(dayjs().diff(dayjs(task.post_date),'day'))
        }) 
        .catch(err => console.log(err))
    },[])

    const getCategory = (category_id) => {
        fetch(`/category/${category_id}`)
        .then(res => res.json())
        .then(res => {
            setCategory(res.title)
        }) 
        .catch(err => console.log(err))
    }
    const getUser =  (user_id) => {
            fetch(`/user/${user_id}`)
            .then(res => res.json())
            .then(res => {
                setUserTask(res)
            }) 
    }

    const getHelper =  (helper_id) => {
        helper_id && ( fetch(`/helper/${helper_id}`)
            .then(res => res.json())
            .then(res => {
                setHelper(res)
            }) 
            .catch(err => console.log(err))
        )
    }


    return(
            !task  
            ? <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "70vh" }}> <CircularProgress></CircularProgress> </Box>
            :   <Box >
                    <Box sx={{display: "flex", justifyContent: "space-between", xs: { flexDirection:"column"}, md: {flexDirection:"row"}}} p={2}>
                        <div>
                        <Typography variant="h3" component="h3">{task.title}</Typography>
                        <Breadcrumbs separator=" / " aria-label="breadcrumb">
                            <Typography  variant="p" component={Link} to={'/categories'}>Categories</Typography>
                            <Typography variant="p" component={Link} to={`/category/${task.category_id}`}>{caregory}</Typography>
                        </Breadcrumbs>
                        </div>
                        <div>
                        <Typography variant="h6" component="h6">price: {task.salary}</Typography>
                        <Typography variant="p" component="p">{task.is_bargain ? "Price is negotiable" : "" }</Typography>
                        <Typography variant="h6" component="h6">status: {task.status}</Typography>
                        <Typography variant="p" component="p">posted: {posted>0 ? `${posted} days ago` : 'today'}</Typography>
                        </div>
                    </Box>

                <Box>
                    {!userTask ? <p>loading</p> : (
                        <Typography variant="h6" m={2}
                        sx={{textDecoration:"none", color:"black", "&:hover": {color: "#44B6C6",},}}  component={Link} to={task.user_id==userTask.user_id ? `/cabinet/${user.user_id}` : `/user/${userTask.user_id}`}>
                            Posted by {userTask.first_name}
                        </Typography>
                    )}
                </Box>

                <Typography m={2} sx={{border: "solid 0.5px"}} variant="h5" component="h5">{task.description}</Typography>
                <Divider > <LocationOnOutlinedIcon /> </Divider>
                <Typography m={2} variant="h5" component="h5">{task.city}</Typography>
                <Typography m={2} variant="h5" component="h5">{
                task.user_id === user.user_id || task.helper_id === user.id 
                ? task.address : "hidden"
                }</Typography>

                <Divider > <AccessTimeIcon></AccessTimeIcon> </Divider>

                <Box sx={{width:"100%"}} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box m={2} sx={{xs:{width: "100%"}, s: {width: "50%"}}}>
                        <DateTimePicker sx={{width:"100%"}}  label="Start date" defaultValue={dayjs(task.start_date)} readOnly/>
                    </Box>
                    <Box m={2} sx={{xs:{width: "100%"}, md: {with: "50%"}}}>
                        <DateTimePicker m={2} sx={{width:"100%"}} label="Finish date" defaultValue={dayjs(task.finish_date)} readOnly/>
                    </Box>
                </LocalizationProvider>
                </Box>
                
                <Offer task={task} user={user}/>

            </Box>
              
    )
}

export default Task



// helper_id
// : 
// null


// user_id
// : 
// 8