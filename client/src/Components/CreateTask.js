import { Box, FormControl, FormLabel, MenuItem, Switch, TextField } from "@mui/material";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {useState,useEffect} from 'react';
import { useSelector } from "react-redux";


const CreateTask = (props) => {
    const {user, categories, allCities} = useSelector(state => state)
    const [address, setEddress] = useState(null);
    const [city, setCity] = useState(null);
    const [description, setDescription] = useState(null);
    const [title, setTitle] = useState(null);
    const [finish_date, setFinishDate] = useState(null);
    const [start_date, setStartDate] = useState(dayjs());
    const [is_bargain, setIsBargein] = useState(false);
    const [salary, setSalary] = useState(null)
    const [status, setStatus] = useState("open")
    const [categoryId, setCategoryId] = useState(null)
    console.log(salary, typeof salary);
    console.log(start_date);

    return(
        <Box m={1} sx={{position: "relative", position: "static"}}>
            <FormControl sx={{width: "100%"}}>
                <Box sx={{display: "flex", }} m={1}>
                    <FormLabel sx={{width: "110px"}}>Title *</FormLabel>
                    <TextField fullWidth helperText="Please, enter the title" onChange={(e) => setTitle(e.target.value)}></TextField>
                </Box>
                <Box sx={{display: "flex", }} m={1}>
                    <FormLabel sx={{width: "110px"}}>Description*</FormLabel>
                    <TextField fullWidth helperText="Please, discribe the work should be done" onChange={(e) => setDescription(e.target.value)}></TextField>
                </Box>

                <Box sx={{display: "flex", }} m={1}>
                    <FormLabel sx={{width: "110px"}}>Category *</FormLabel>
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
                <FormLabel sx={{width: "110px"}}>City *</FormLabel>
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
                <FormLabel sx={{width: "110px"}}>Address *</FormLabel>
                    <TextField fullWidth helperText="The address will be shown to you and to helper"></TextField>
                </Box>

                <Box sx={{display: "flex",}} m={1}>
                    <FormLabel sx={{width: "110px"}}>Payment *</FormLabel>
                    <TextField fullWidth type={"number"} helperText="Pleace, enter the amount you ready to pay" onChange={(e) => setSalary(e.target.value)}></TextField>
                </Box>
                <Box sx={{display: "flex",}} >
                    <FormLabel sx={{width: "110px"}}>Open to negotiations</FormLabel>
                    <Switch checked={is_bargain} onChange={(e) => setIsBargein(e.target.checked)} />
                </Box>
                
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker    
                        value={start_date}
                        onChange={(e) => setStartDate(e)} />
                    </LocalizationProvider>
                </Box>


            </FormControl>
        </Box>
    )
}

export default CreateTask