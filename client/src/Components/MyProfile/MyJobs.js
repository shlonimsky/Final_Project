import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyJobs } from "../../Redux/actions";


const MyJobs = ({id}) => {
    const dispatch = useDispatch()
    const jobs = useSelector(state => state.jobs)
    console.log(id);
    useEffect(() => {
        if (id) dispatch(getMyJobs(id))
    },[])

    console.log((id));
    return(
        <Box sx={{marginBottom:"5%", marginTop:"10px"}}>
            <Typography variant="h4" component="h4">My Jobs</Typography>
            {jobs ? (
                jobs.map((job,i) =>{
                    if (i>3) return;
                    return (
                    <div key={i}>
                        <Typography variant="h5" component="h5">{job.title}</Typography>
                    </div>
                )})
            ) : <Typography variant="p" component="p"> You steel don't have any tasks</Typography>}        
        </Box>
    )
}

export default MyJobs