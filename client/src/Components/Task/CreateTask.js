import { Box, Button, FormControl, FormLabel, MenuItem, Switch, TextField, Card, CardMedia, Input } from "@mui/material";
import UploadImage from "../Images/UploadImage";
import ImageList from "../Images/ImageList";
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {useState,useEffect, useRef} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import {createNewTask} from '../Redux/actions'
dayjs.extend(isSameOrBefore)



const CreateTask = (props) => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const {user, categories, allCities} = useSelector(state => state)
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [description, setDescription] = useState(null);
    const [title, setTitle] = useState(null);
    const [start_date, setStartDate] = useState(null);
    const [finish_date, setFinishDate] = useState(null);
    const [is_bargain, setIsBargein] = useState(false);
    const [salary, setSalary] = useState(null)
    const [category_id, setCategoryId] = useState(null);
    const [img, setImg] = useState([])


    const handleSubmit = () => {
        if ( user.user_id && address && city && description && title && start_date && finish_date && salary && category_id && dayjs(start_date).isBefore(finish_date) ) {
                const newTask = {
                    user_id: user.user_id, title,description, city, address, start_date, finish_date, salary, is_bargain, category_id, img
                }
                console.log(newTask);
                // dispatch(createNewTask(newTask))
                fetch('/tasks',{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newTask)
                })
                .then(res => res.json())
                .then(res => {
                    // console.log(res);
                    // dispatch(createNewTask)
                    navigate(`/task/${res.id}`)
                })
                .catch(err => console.log(err))
            }
    }

    // const fileInputRef = useRef(null);



  

    return(
        <Box m={1} sx={{position: "relative", position: "static"}}>


            <FormControl sx={{width: "100%"}}>
                <Box sx={{display: "flex", }} m={1}>
                    <FormLabel sx={{width: "120px"}}>Title *</FormLabel>
                    <TextField fullWidth helperText="Please, enter the title" 
                    sx={{color: "secondary"}}
                    onChange={(e) => setTitle(e.target.value.trim()==="" ? null : e.target.value.trim())}></TextField>
                </Box>
                <Box sx={{display: "flex", }} m={1}>
                    <FormLabel sx={{width: "120px"}}>Description*</FormLabel>
                    <TextField fullWidth multiline helperText="Please, discribe the work should be done" 
                    onChange={(e) => setDescription(e.target.value)}></TextField>
                </Box>

                <Box sx={{display: "flex", }} m={1} >
                    <FormLabel sx={{width: "120px"}}>Category *</FormLabel>
                    <TextField  defaultValue={''} select id="category" helperText="Please select the category" fullWidth onChange={(e) => setCategoryId(e.target.value)}>
                        { categories ? categories.map(item => (
                            <MenuItem key={item.id} value={item.id}>
                            {item.title}
                            </MenuItem>
                        ))
                        : <MenuItem value={''}></MenuItem>}
                    </TextField>
                </Box>
            
                <Box sx={{display: "flex", }} m={1}>
                <FormLabel sx={{width: "120px"}}>City *</FormLabel>
                    <TextField defaultValue={''} id="city" fullWidth helperText="Please, select the city" select onChange={(e) => setCity(e.target.value)}>
                    { allCities ? allCities.map(item => (
                            <MenuItem key={item.id} value={item.title}>
                            {item.title}
                            </MenuItem>
                        ))
                        : <MenuItem value={''}></MenuItem>}
                    </TextField>
                </Box>

                <Box sx={{display: "flex",}} m={1}>
                <FormLabel sx={{width: "120px"}}>Address *</FormLabel>
                    <TextField fullWidth helperText="The address will be shown to you and to helper only"
                    onChange={(e) => setAddress(e.target.value.trim()==='' ? null : e.target.value.trim())}
                    ></TextField>
                </Box>

                <Box sx={{display: "flex",}} m={1}>
                    <FormLabel sx={{width: "120px"}}>Payment *</FormLabel>
                    <TextField fullWidth type={"number"} helperText="Pleace, enter the amount you ready to pay" 
                    onChange={(e) => {
                        /^[0-9]+$/.test(e.target.value) ? setSalary(+e.target.value) : setSalary(null)
                        }}></TextField>
                </Box>
                <Box sx={{display: "flex",}} >
                    <FormLabel sx={{width: "120px"}}>Open to negotiations</FormLabel>
                    <Switch  onChange={(e) => setIsBargein(e.target.checked)} />
                </Box>
                
                <Box sx={{display: "flex",}} m={1}>
                    <FormLabel sx={{width: "120px"}}>Start date</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker   
                        fullWidth 
                        value={dayjs(start_date)}
                        onChange={newDate => {
                            dayjs().isSameOrBefore(newDate,'day') ? setStartDate(dayjs(newDate).format()) : setStartDate(null)
                            }} />
                    </LocalizationProvider>
                </Box>

                <Box sx={{display: "flex",}} m={1}>
                    <FormLabel sx={{width: "110px"}}>Complete date</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                        <DateTimePicker 
                        fullWidth
                        value={dayjs(finish_date)}
                        onChange={(newDate) => dayjs(start_date).isSameOrBefore(newDate,'day') ? setFinishDate(newDate.format()) : setFinishDate(null) } />
                    </LocalizationProvider>
                </Box>

                
                <Box sx={{display: "flex",}} m={1}>
                    <FormLabel sx={{width: "110px"}}>Upload photos</FormLabel>
                    <UploadImage title={"task"} img={img} stateChanger={setImg}/>
                </Box>

                <ImageList imgs={img} stateChanger={setImg} editing={true}/>

                <Box sx={{display: "flex",}} m={1}>
                   <Button onClick={() => navigate('/')}>Cancel</Button>
                   <Button onClick={handleSubmit}>Submit</Button>
                </Box>


            </FormControl>
            
        </Box>
    )
}

export default CreateTask