import { Box, Button, Typography } from "@mui/material";
import { getMyTasks } from "../Redux/actions";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

const AllMyTasks = (props) => {
    const dispatch = useDispatch()
    const {user, tasks} = useSelector(state => state);
    const {id} = useParams()

useEffect(() => {
    if ( ! tasks)dispatch(getMyTasks(id))
},[])

    return(
        <Box m={3}>
            <Typography variant="h4" sx={{textAlign:"center", color:"#390050", paddingBottom: 4}}>YOUR TASKS</Typography> 
            <Box  sx={{display:"flex", justifyContent:"center", paddingBottom: 6}}>
                <Button size="large" component={Link} to='/create_task' variant="outlined">Create a new task</Button>
            </Box>
            <Box p={2} sx={{border:"solid 0.5px #44B6C6", borderRadius:"5px", marginTop:"5%"}}>
            { !tasks ? <Typography variant="h5">No results</Typography> : 
            tasks.map(task => 
            <Box m={2} key={task.id} sx={{paddingBottom: 5}}>
                <Box  sx={{display: "flex", gap:10, paddingBottom: 2}}>
                    <Box sx={{width: '70%'}}>
                    <Typography 
                    variant="h5" component={Link} 
                    to={`/task/${task.id}`} 
                    sx={{textDecoration:"none", color:"primary", "&:hover": {
                        color: "#44B6C6",
                      },}} 
                      >{task.title}</Typography>
                    </Box>
                    <Box sx={{width: "30%"}}>
                        <Typography > PRICE: {task.salary}</Typography>
                        <Typography>STATUS: {task.status}</Typography>
                    </Box>
                </Box>
                <Box>
                    {task.description}
                </Box>
            </Box>)
            }
            </Box>
        </Box>
    )
}

export default AllMyTasks