import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Breadcrumbs, Button, FormControl, TextField, Typography } from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { DateTimePicker } from '@mui/x-date-pickers';

import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


const Task = (props) => {
    const {id} = useParams();
    const [task,setTask] = useState(null);
    const [caregory,setCategory] = useState('')
    const [posted,setPosted] = useState(null)
    const [userTask,setUserTask] = useState(null)
    const [helper, setHelper] = useState(null)
    const user = useSelector(state => state.user)
    useEffect(() => {
        fetch(`/task/${id}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setTask(res);
            getCategory(res.category_id)
            getUser(res.user_id)
            getHelper(task.helper_id)
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
        if (task.user_id == user.user_id) return setUserTask(user)
        fetch(`/user/${user_id}`)
        .then(res => res.json())
        .then(res => {
            console.log("user from detUser====>",res);
            setUserTask(res)
        }) 
        .catch(err => console.log(err))
    }

    const getHelper =  (user_id) => {
        task.helper_id && ( task.helper_id == user.user_id 
            ?  setHelper(user) 
            : ( fetch(`/helper/${user_id}`)
            .then(res => res.json())
            .then(res => {
                setHelper(res)
            }) 
            .catch(err => console.log(err))
        )) 
    }


    return(
        <Box >
            { !task  ? <p>Loading</p>  :  (
                <>
                  <Box sx={{display: "flex", justifyContent: "space-between"}} p={2}>
                    <div>
                    <Typography variant="h3" component="h3">{task.title}</Typography>
                    <Breadcrumbs separator=" / " aria-label="breadcrumb">
                    <Typography  variant="p" component={Link} to={'/categories'}>Categories</Typography>
                    <Typography variant="p" component={Link} to={`/category/${task.category_id}`}>{caregory}</Typography>

                    </Breadcrumbs>

                    </div>
                    <div>
                    <Typography variant="h6" component="h6">Price: {task.salary}</Typography>
                    <Typography variant="p" component="p">{task.is_bargain ? "Price is negotiable" : "" }</Typography>
                    <Typography variant="h6" component="h6">Status: {task.status}</Typography>
                    <Typography variant="p" component="p">posted: {posted>0 ? `${posted} days ago` : 'today'}</Typography>

                    </div>
                </Box>
                <Box>
                    {!userTask ? <p>loading</p> : (
                        <Typography variant="h6" component={Link} to={task.user_id==userTask.user_id ? `/cabinet/${user.user_id}` : `/user/${userTask.user_id}`}>
                            Posted by {userTask.first_name}
                        </Typography>
                    )}
                </Box>
                <Typography sx={{border: "solid 0.5px"}} variant="h5" component="h5">{task.description}</Typography>
                <Typography variant="h5" component="h5">{task.city}</Typography>
                <Typography variant="h5" component="h5">{
                task.user_id===user.user_id || task.helper_id===user.id 
                ? task.address : "hidden"
                }</Typography>


                <div>
                <LocalizationProvider sx={{width:"fit-content"}} dateAdapter={AdapterDayjs}>
                    <DateTimePicker sx={{width:"fit-content"}} label="Start date" defaultValue={dayjs(task.start_date)} readOnly/>
                    <DateTimePicker label="Finish date" defaultValue={dayjs(task.finish_date)} readOnly/>
                </LocalizationProvider>
                </div>
                
                <FormControl>
                    {task.status !=='open' ? <></> : <>
                        <TextField>
                        rows={4}
                        placeholder="You can leave your comment here"
                        multiline
                        </TextField>
                        <Button>Make an offer</Button>
                    </>}
                </FormControl>


                </>
              


            )}
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