import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Avatar, Box, CircularProgress, Divider, FormLabel, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';

import dayjs from 'dayjs';
import { minHeight } from '@mui/system';

const UserContainer = (props) => {
    const id = useParams().id
    const [helper, setHelper] = useState(null)
    const [reviews, setReviews] = useState(null)
    const [jobs, setJobs] = useState(null)
    const [rating, setRating] = useState(null)

    useEffect(() => {
        const getHelper = async () => {
            try {
                const { data } = await axios.get(`/user/${id}`)
                setHelper(data)
                getJobs(data.id)
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        }
        const getReviews = async () => {
            try {
                const { data } = await axios.get(`/api/reviews/${id}`)
                setRating(+data.average)
                setReviews(data.reviews)
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        }

        const getJobs = async (helper_id) => {
            try {
                const res = await axios.get(`/my_jobs/${helper_id}`)
                // console.log((res));
                if (res.status === 200) setJobs(res.data)
            } catch (err) {
                console.log(err);
            }
        }
        getReviews()

        getHelper()
    }, [id])
console.log(rating);
    return (!helper ? <CircularProgress /> :

        <Box m={2} sx={{minHeight: "70vh"}}>
            <Box sx={{
                flexGrow: 1, width: "95vw", display: "flex", flexDirection: { xs: "column", md: "row" },
                 minHeight: "100%",
                width: "100%"
            }}>

                <Box sx={{ width: { xs: "100%", md: "40%", lg: "40%" }, marginLeft: {xs:"0", md: "5%"}}} className="flex_column">
                    <Box sx={{display: "flex", justifyContent:"center",marginLeft: "-5%" }}> 
                    <Avatar src='#' alt={helper.first_name} sx={{width:"100px", height:"100px", marginBottom:"10%px"}}/>

                    </Box>
                    <Box sx={{marginBottom:"15%"}}>
                        <Typography variant='h6'>{helper.first_name} {helper.last_name}</Typography>
                        <Typography variant='body1'>{helper.city}</Typography>
                        <Typography variant='body1'>{dayjs().diff(helper.birth_date, 'year')} years old</Typography>
                    </Box>
                    <Divider/>
                    {reviews && (<Box sx={{marginBottom:"5%"}}>
                        <Typography variant='h6'>Rating</Typography>
                        <Rating name="read-only" value={rating} readOnly />
                    </Box>)
                    }

                    <Divider />

                    <Box m={2} sx={{marginBottom:"15%"}}>
                        <Typography variant='h6'>About {helper.first_name}</Typography>
                        <Typography variant='body1'>{helper.info}</Typography>
                    </Box>
                </Box>
                <Divider orientation="vertical" flexItem />

                <Box m={2} className="flex_column" sx={{ width: { xs: "100%", md: "60%", lg: "60%" },
                marginLeft: {xs:"0", md: "3rem"}}}
                    >
                    <Box sx={{marginBottom:"15%"}}>
                        <Typography variant='h6'>{helper.first_name}'s Jobs</Typography>
                        {jobs ? (
                            jobs.map((job, i) => {
                                // if (i>3) return;
                                return (
                                    <Box key={i} className="flex_row">
                                        <Typography variant="h5" component={Link} to={`/task/${job.id}`}>{job.title}</Typography>
                                    
                                    </Box>
                                )
                            })
                        ) : <Typography variant="subtitle1" >{helper.first_name} haven't helped anyone yet =( </Typography>}
                    </Box>
                            <Divider />
                    <Box>
                    <Typography variant='h5'>Reviews</Typography>
                        { !reviews ? <Typography variant='subtitle1'>{helper.first_name} doesn't have any reviews yet</Typography> 
                        : reviews.map(review => 
                        <Box key={review.id} m={2} sx={{display: "flex"}}>
                            <Box >
                            <Typography variant='subtitle1'>{review.sender_name}</Typography>
                            {/* <Typography variant='caption'>{dayjs(review.post_date)}</Typography> */}
                            <Typography variant='subtitle1'>{review.review}</Typography>
                            </Box>
                            <Box>
                                <Rating value={review.rating} readOnly />
                                </Box>
                        </Box>)}
                    </Box>

                </Box>
            </Box>




        </Box>

    )
}

export default UserContainer