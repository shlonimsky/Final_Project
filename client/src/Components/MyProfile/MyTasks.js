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
        <Box sx={{marginBottom:"5%", marginTop:"10px"}}>
            <Typography variant="h4" component="h4">My tasks</Typography>
            {tasks ? (
                tasks.map((task,i) =>{
                    if (i>3) return;
                    return (
                    <Box key={i} m={2}>
                        <Typography variant="h6" component={Link} to={`/task/${task.id}` }
                        sx={{textDecoration:"none", color:"black", "&:hover": {color: "#44B6C6",},}}>{task.title}</Typography>
                    </Box>
                )})
            ) : <Typography variant="p" component="p"> You steel don't have any tasks</Typography>}
        </Box>
    )
}
export default MyTasks