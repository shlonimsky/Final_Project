import { Box, Button, FormControl, FormLabel, Input, MenuItem, TextField } from "@mui/material"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchTarget from "./SearchTarget";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchHelper = (props) => {
    const title = useParams().title;
    const categories = useSelector(state => state.categories)
    const [search,setSearch] = useState(null)
    const [categoryId, setCategoryId] = useState(null)
    const [helpers, setHelpers] = useState([])
    const [tasks, setTasks] = useState([]) 

    useEffect(() => {
        setSearch(null);
        setCategoryId(null);
    },[title])

    useEffect(() => {
        const getHelpersByInfo = async () => {
            try {
                const {data} = await axios.get(`/api/helpers/search?info=${search}`)
                setHelpers(data)
               
            } catch (err) {
                console.log(err);
            }
        }

        const getTasksByDescriptiom = async () => {
            try {
                const {data} = await axios.get(`/api/tasks/search?info=${search}`)
                setTasks(data)
              console.log(data);
              console.log(tasks);

            } catch (err) {
                console.log(err);
            }
        }

        title==="task" ? getTasksByDescriptiom() : getHelpersByInfo()

    },[search])

    useEffect(() => {
        const getAllHelpersByCetog = async () => {
            try {
                const {data} = await axios.get(`/api/helpers/${categoryId}`)
                setHelpers(data)
    
            } catch (err) {
                console.log(err);
            }
        } 

        const getTaskByCategoryId = async () => {
            try {
                const {data} = await axios.get(`/api/tasks/${categoryId}`)
                setTasks(data)
                console.log(data);
                console.log(tasks);
            } catch (err) {
                console.log(err);
            }
        }
        title === "task" ? getTaskByCategoryId() : getAllHelpersByCetog()
    },[categoryId])

return(
    <Box m={2} >

        <FormControl component={"form"}  sx={{display: "flex"}} >
            <Box m={2} sx={{display: "flex"}}> 
                <TextField   type="search" id="search" name="search" placeholder="enter a keywords" fullWidth
                 onChange={(e) => setSearch(e.target.value)}/>
                <Button type="submit"> search</Button>
            </Box>
            <Box m={2} sx={{display: "flex"}}>
                <TextField   defaultValue={''} name="category" select id="category" helperText="Please select the category"
                onChange={(e) => setCategoryId(e.target.value)} 
                sx={{width: "fit-content"}} >
                    { categories && categories.map(item => (
                            <MenuItem key={item.id} value={item.id}>
                            {item.title}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <FormLabel sx={{width: "110px"}}> Category </FormLabel>
            </Box>
        </FormControl>
        {helpers.length>0 && <SearchTarget helpers={helpers}/>}
        {tasks.length>0 && <SearchTarget tasks={tasks}/>}

    </Box>
)
}

export default SearchHelper