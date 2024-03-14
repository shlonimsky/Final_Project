import { Box, Button, FormControl, FormLabel, Input, MenuItem, TextField } from "@mui/material"
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchResult from "./SearchResult";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchHelper = (props) => {
    const title = useParams().title;

    // const queryParameters = new URLSearchParams(window.location.search)

    const searchParams = window.location.search;
    const queryParameters = new URLSearchParams(searchParams)

    // console.log("searchParams", searchParams);
    const search = queryParameters.get("search")
    const categoryId = queryParameters.get("category")
    const city = queryParameters.get("city")


    const categories = useSelector(state => state.categories)
    // const defCategory = categories[categoryId].title
    // console.log("categories: ", categories[categoryId].title);
    // const [search,setSearch] = useState(searchReq ? searchReq : null)
    // const [categoryId, setCategoryId] = useState(categoryReq ? categoryReq : null)
    const [helpers, setHelpers] = useState([])
    const [tasks, setTasks] = useState([]) 


// console.log("categoryId::: ", categoryId, typeof categoryId);
// console.log("search::: ", search);

    useEffect(() => {
     

        title==="task" ? findTasks() : findHelpers()

    },[])

    const findHelpers = async () => {
        try {
            const {data} = await axios.get(`/api/search/helpers${searchParams}`)
            setHelpers(data.foundUsers)
            // console.log("findHelpers: ", data);
           
        } catch (err) {
            console.log(err);
        }
    }

    const findTasks = async () => {
        try {
            const {data} = await axios.get(`/api/search/tasks${searchParams}`)
            setTasks(data.foundTasks)
        //   console.log("getTasksByDescriptiom: ", data);
        //   console.log(tasks);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        setHelpers([]);
        setTasks([]);
        title==="task" ? findTasks() : findHelpers()
    },[title])

    // useEffect(() => {
    //     const getAllHelpersByCetog = async () => {
    //         try {
    //             const {data} = await axios.get(`/api/helpers/${categoryId}`)
    //             setHelpers(data)
    // console.log("getAllHelpersByCetog: ", data);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     } 

    //     const getTaskByCategoryId = async () => {
    //         try {
    //             const {data} = await axios.get(`/api/tasks/${categoryId}`)
    //             setTasks(data)
    //             console.log("getTaskByCategoryId: ", data);
    //             console.log(tasks);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     title === "task" ? getTaskByCategoryId() : getAllHelpersByCetog()
    // },[categoryId])
// console.log("TASKS:", tasks);
return(
    <Box m={2} >

        <FormControl component={"form"}  sx={{display: "flex"}} >
            <Box m={2} sx={{display: "flex"}}> 
                <TextField   type="search" id="search" name="search" placeholder={search || "enter a keywords"}  fullWidth
                //  onChange={(e) => setSearch(e.target.value)}
                 />
                <Button type="submit"> search</Button>
            </Box>
            <Box m={2} sx={{display: "flex"}}>
                <TextField   defaultValue={`${categoryId}`} name="category" select id="category" helperText="Please select the category"
                // onChange={(e) => setCategoryId(e.target.value)} 
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
        {helpers.length>0 && <SearchResult helpers={helpers}/>}
        {tasks.length>0 && <SearchResult tasks={tasks}/>}
        {tasks.length==0 && helpers.length==0 &&  <FormLabel> No results</FormLabel>}


    </Box>
)
}

export default SearchHelper