import { Box, Typography } from "@mui/material";
import { getMyJobs } from "../Redux/actions";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

const AllMyJobs = (props) => {
    const dispatch = useDispatch();
    const {user, jobs} = useSelector(state => state);
    const {id} = useParams();
    useEffect(() => {
            if (!jobs) dispatch(getMyJobs(id))

    },[])

    return(
        <Box>
             { !jobs ? <p>No results</p> : 
            jobs.map(job => 
            <div key={job.id}>
                <Box  sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography 
                    variant="h3" component={Link} 
                    to={`/task/${job.id}`} 
                    sx={{textDecoration:"none", color:"black", "&:hover": {
                        color: "#44B6C6",
                      },}} 
                      >{job.title}</Typography>
                    <div>
                        <Typography > PRICE: {job.salary}</Typography>
                        <Typography>STATUS: {job.status}</Typography>
                    </div>
                </Box>
                <Box>
                    {job.description}
                </Box>
            </div>)
            }
        </Box>
    )
}

export default AllMyJobs