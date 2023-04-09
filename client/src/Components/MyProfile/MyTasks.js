import { Box, Typography } from "@mui/material";
import axios from 'axios'
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { getMyTasks } from "../../Redux/actions";
import {useNavigate, Link} from 'react-router-dom'

const MyTasks = ({id}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate
    const tasks = useSelector(state => state.tasks)
    console.log(tasks);

useEffect( () => {
    dispatch(getMyTasks(id))
},[])

    return(
        <Box>
            <Typography variant="h4" component="h4">My tasks</Typography>
            {tasks ? (
                tasks.map((task,i) =>{
                    if (i>3) return;
                    return (
                    <div key={i}>
                        <Typography variant="h5" component={Link} to={`/task/${task.id}`}>{task.title}</Typography>
                    </div>
                )})
            ) : <Typography variant="p" component="p"> You steel don't have any tasks</Typography>}
        </Box>
    )
}
export default MyTasks