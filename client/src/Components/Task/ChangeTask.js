import { Avatar, Box, Button, CircularProgress, Divider, Rating, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import NotFound from "../Errors/NotFound";
import axios from 'axios';



const ChangeTask = (props) => {
    const navigate = useNavigate()
    const { id } = useParams();
    const user = useSelector(state => state.user)
    const [task, setTask] = useState(null);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0)
    const [salary, setSalary] = useState("")
    const [helper, setHelper] = useState({first_name : ""})
    const [load, setLoad] = useState(false)
    // console.log("task_id:", id);
    // const [error, setError] = useState(false)
    useEffect(() => {

        try {
            fetch(`/task/${id}`)
                .then(res => res.json())
                .then(res => {
                    // console.log(res);
                    // setPosted(dayjs().diff(dayjs(res.post_date),'day'))

                    setTask(res);
                  
                    fetch(`/helper/${res.helper_id}`)
                    .then(res => res.json())
                    .then(res => {
                        setHelper(res)
                        // console.log("HELPER", res);
                    })
                    .catch(err => console.log("ERROR in FETCH in getHelpe r", err))
                })
        } catch (err) {
            console.log(err);
            // setError(true)
        }
    }, [])



    const closeTask = () => {      
        rating!== 0 && saveReview()
        // setLoadz(true)
        changeTask()
    }

    const saveReview = async () => {
        try {
            const {data} = await axios.post('/api/reviews', {
                rating, review, sender_name: user.first_name, user_id: helper.user_id
              });
              console.log("DATA in AXIOS", data);
        } catch (err) {
            console.log("ERROR in AXIOS", err);
        }
    }

    const changeTask = async () => {
        console.log("IN CHANGE TASK", salary, id);
        try {
            const {data} = await axios.put("/close_task", {
               salary, id
            })
            console.log("response:::::", data);
            console.log("Success:", data.msg);
            console.log("saving is finished");
            navigate(`/task/${id}`)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Box m={2} sx={{ border: "solid 0.5px #44B6C6", borderRadius: "5px", padding: "15px" }}>

            {!task ? <CircularProgress /> : <>
                <Box sx={{ display: "flex", flexDirection: 'column', justifyContent: "center" }}>
                    <Typography color="primary" variant="h4" align="center">Closing the task: "{task.title}"</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Typography color="primary" variant="body1" width="150px">Location</Typography>
                        <TextField
                            id="outlined-multiline"
                            label="LOCATION"
                            defaultValue={"Israel, " + task.city + ", " + task.address}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Typography color="primary" variant="body1" width="150px">Description</Typography>
                        <TextField
                            id="outlined-read-only-input"
                            label="DESCRIPTION"
                            defaultValue={task.description}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                            multiline
                            fullWidth
                        />
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        {/* <Typography color="primary" variant="body1" width="150px">Price</Typography> */}
                        <Typography color="primary" variant="body1" width="150px">Price</Typography>

                        {task.is_bargain
                            ?
                            <TextField
                                id="outlined"
                                label="SALARY"
                                type="number"
                                defaultValue={task.salary}
                                helperText="Enter the finall price"
                                margin="normal"
                                fullWidth

                                // InputLabelProps={{
                                //     shrink: true,
                                // }}
                                onChange={(e) => setSalary(e.target.value==="" ? task.salary : e.target.value)}
                            />
                            :
                            <TextField
                                id="outlined-read-only-input"
                                label="SALARY"
                                margin="normal"
                                fullWidth
                                defaultValue={task.salary}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />}
                    </Box>


                    <Box sx={{ marginTop: "20px" }}>

                        <Typography color="primary" variant="h6">How good did your helper do a job? (from 1 to 5)</Typography>
                       <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: "15px"}}>
                            <Avatar alt={ helper.first_name} src={helper.avatar || ""} />
                         <Typography color="primary" variant="body2">{helper.first_name}</Typography>

                        </Box>
                         {/* : <CircularProgress/> } */}
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(e) => {
                                setRating(+e.target.value)
                            }}
                        />

                        <TextField value={review || ''} fullWidth rows={2} placeholder="You can leave your review about his job  here" multiline
                            onChange={(e) => setReview(e.target.value)}></TextField>
                        <Box sx={{ display: "flex", justifyContent: "center", gap: "25px" }}>
                            <Button
                                color="error"
                                onClick={() => {
                                    setRating(null);
                                    setReview(null)
                                }} >Cansel</Button>

                            <Button onClick={()=>closeTask()}>{load ? <CircularProgress /> : "Close this task"}</Button>

                        </Box>

                    </Box>


                </Box>
            </>}
        </Box>
    )
}
export default ChangeTask