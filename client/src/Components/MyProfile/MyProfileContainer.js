import { Avatar, Box, Button, CircularProgress, Divider, Fab, FormControl, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";

import MyProfile from "./MyProfile";
import MyTasks from "./MyTasks";
import MyAvatar from "./MyAvatar";
import MyInfo from "./MyInfo";
import MyJobs from "./MyJobs";
import MyRating from "./MyRating";

const MyProfileContainer = (props) => {
    const user = useSelector(state => state.user)


    return (
        <Box m={2} sx={{border: "solid 0.5px #44B6C6", borderRadius:"5px"}}>
            <Box sx={{ flexGrow: 1, width: "95vw", display: "flex", flexDirection:{xs:"column", md:"row"} }}>
            { !user.user_id ? <CircularProgress/> : <>
            <Box p={3} sx={{ width: { xs: "100%", md: "30%", lg: "30%" }}}>
                <MyAvatar user={user} />
                <Divider />
                <MyProfile user={user} />
                <Divider />
                <MyRating user={user}/>

            </Box>
            <Divider orientation="vertical" flexItem />

            <Box p={3} sx={{ width: { xs: "100%", md: "70%", lg: "70%" }}}>
                <MyInfo user={user} />
                <Divider />

                <MyTasks id={user.user_id}/>
                <Divider />

                <MyJobs id = {user.id} />
            </Box>
            </>}

        </Box>
        </Box>
    )
}

export default MyProfileContainer