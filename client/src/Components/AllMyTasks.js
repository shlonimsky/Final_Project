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
        <Box>
            <Button component={Link} to='/create_task' variant="outlined">Create a new task</Button>
            { !tasks ? <p>No results</p> : 
            tasks.map(task => 
            <div key={task.id}>
                <Box  sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography 
                    variant="h3" component={Link} 
                    to={`/task/${task.id}`} 
                    sx={{textDecoration:"none", color:"black", "&:hover": {
                        color: "#44B6C6",
                      },}} 
                      >{task.title}</Typography>
                    <div>
                        <Typography > PRICE: {task.salary}</Typography>
                        <Typography>STATUS: {task.status}</Typography>
                    </div>
                </Box>
                <Box>
                    {task.description}
                </Box>
            </div>)
            }
        </Box>
    )
}

export default AllMyTasks