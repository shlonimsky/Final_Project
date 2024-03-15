import { Box, Button, Divider, FormControl, FormLabel, Input, MenuItem, TextField, Typography } from "@mui/material"
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchResult from "./SearchResult";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchHelper = (props) => {
    const title = useParams().title;
    const categories = useSelector(state => state.categories);
    const allCities = useSelector(state => state.allCities)


    const searchParams = window.location.search;
    const queryParameters = new URLSearchParams(searchParams)
    const search = queryParameters.get("search")
    const categoryId = queryParameters.get("category")
    const city = queryParameters.get("city")
    // const defCategory = categories[categoryId].title
    // console.log("categories: ", categories[categoryId].title);
    // const [search,setSearch] = useState(searchReq ? searchReq : null)
    // const [categoryId, setCategoryId] = useState(categoryReq ? categoryReq : null)
    const [helpers, setHelpers] = useState([])
    const [tasks, setTasks] = useState([])
    const [description, setDescription] = useState("")

    // console.log(categories[categoryId]["description"]);
    // console.log("categoryId::: ", categoryId, typeof categoryId);
    // console.log("search::: ", search);

    // useEffect(() => {
    //  console.log("IN USE EFFFECT REGULAR");

    //     title==="task" ? findTasks() : findHelpers()

    // },[])

    useEffect(() => {
        setHelpers([]);
        setTasks([]);
        title === "task" ? findTasks() : findHelpers()
    }, [title])

    useEffect(() => {
        console.log("USE EFFECT IN CATEGORIES");
        if (categoryId && categories) setDescription(categories[categoryId - 1]["description"])
        // (categories && categoryId) ? console.log(true) : console.log(false)
        console.log("categories: ", categories);
        // (categories && categoryId) ?? setDescription(categories[categoryId]["description"])

    }, [categories])

    const findHelpers = async () => {
        try {
            const { data } = await axios.get(`/api/search/helpers${searchParams}`)
            setHelpers(data.foundUsers)
            // console.log("findHelpers: ", data);

        } catch (err) {
            console.log(err);
        }
    }

    const findTasks = async () => {
        try {
            const { data } = await axios.get(`/api/search/tasks${searchParams}`)
            setTasks(data.foundTasks)
            //   console.log("getTasksByDescriptiom: ", data);
            //   console.log(tasks);

        } catch (err) {
            console.log(err);
        }
        // (categories && categoryId) ?? setDescription(categories[categoryId]["description"])
    }


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

    return (
        <Box m={2} >
            <Typography variant="h3" sx={{ textAlign: "center", color: "#390050" }}>Let's find a {title}</Typography>
            <Typography variant="h6" sx={{ textAlign: "center", color: "#390050" }}>{description}</Typography>

            <FormControl component={"form"} sx={{ display: "flex" }} >

                <Box m={2} sx={{ display: "flex" }}>
                    <TextField type="search" id="search" name="search" placeholder={search || "enter a keywords"} fullWidth
                    //  onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button type="submit"> search</Button>
                </Box>

                <Box m={2} sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{}}>
                        <FormLabel sx={{ width: "110px" }}> Category:  </FormLabel>
                        <TextField defaultValue={`${categoryId}` || ''} name="category" select id="category" helperText="Search by the category"
                            // onChange={(e) => setCategoryId(e.target.value)} 
                            sx={{ width: "fit-content" }} >
                            {categories && categories.map(item => (
                                <MenuItem key={item.id} value={item.id}
                                    onClick={() => setDescription(item.description)}
                                >
                                    {item.title}
                                </MenuItem>
                            ))
                            }
                        </TextField>
                    </Box>
                    <Box>

                        <FormLabel sx={{ width: "110px" }}> City:  </FormLabel>
                        <TextField defaultValue={city || ""} name="city" select id="city" helperText="Search by the city"
                            // onChange={(e) => setCategoryId(e.target.value)} 
                            sx={{ width: "fit-content" }} >
                            {allCities && allCities.map(item => (
                                <MenuItem key={item.id} value={item.title}
                                >
                                    {item.title}
                                </MenuItem>
                            ))
                            }
                        </TextField>
                    </Box>

                </Box>
            </FormControl>
            <Divider sx={{color: "blue"}} />
            {helpers.length > 0 && <SearchResult helpers={helpers} />}
            {tasks.length > 0 && <SearchResult tasks={tasks} />}
            {tasks.length == 0 && helpers.length == 0 && <FormLabel> No results</FormLabel>}


        </Box>
    )
}

export default SearchHelper