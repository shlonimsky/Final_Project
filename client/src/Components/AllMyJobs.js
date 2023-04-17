import { Box, Typography } from "@mui/material";
import { getMyJobs } from "../Redux/actions";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

const AllMyJobs = (props) => {
    const dispatch = useDispatch();
    const { user, jobs } = useSelector(state => state);
    const { id } = useParams();
    useEffect(() => {
        if (!jobs) dispatch(getMyJobs(id))

    }, [])

    return (
        <Box m={3}>
            
            <Typography variant="h2" sx={{ textAlign: "center" }}>YOUR JOBS</Typography>

            <Box p={2} sx={{ border: "solid 0.5px #44B6C6", borderRadius: "5px", marginTop: "5%" }}>
            {!jobs
                ? <Typography variant="h5">No results</Typography>
                : jobs.map(job =>
                    <Box key={job.id}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography
                                variant="h3" component={Link}
                                to={`/task/${job.id}`}
                                sx={{
                                    textDecoration: "none", color: "black", "&:hover": {
                                        color: "#44B6C6",
                                    },
                                }}
                            >{job.title}</Typography>
                            <div>
                                <Typography > PRICE: {job.salary}</Typography>
                                <Typography>STATUS: {job.status}</Typography>
                            </div>
                        </Box>
                        <Box>
                            {job.description}
                        </Box>
                    </Box>)
            }
            </Box>
           
        </Box>
    )
}

export default AllMyJobs