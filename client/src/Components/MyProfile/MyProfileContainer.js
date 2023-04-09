import { Avatar, Box, Button, Fab, FormControl, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";

import MyProfile from "./MyProfile";
import MyTasks from "./MyTasks";
import MyAvatar from "./MyAvatar";
import MyInfo from "./MyInfo";
import MyJobs from "./MyJobs";

const MyProfileContainer = (props) => {
    const user = useSelector(state => state.user)


    return (
        <Box sx={{ flexGrow: 1, width: "95vw", display: "flex", flexDirection:{xs:"column", md:"row"} }}>
            { !user.user_id ? <p>Loading</p> : <>
            <Box sx={{ width: { xs: "100%", md: "30%", lg: "30%" }, }}>
                <MyAvatar user={user} />
                <MyProfile user={user} />
            </Box>

            <Box sx={{ width: { xs: "100%", md: "70%", lg: "70%" }, }}>
                <MyInfo user={user} />
                <MyTasks id={user.user_id}/>
                <MyJobs id = {user.id} />
            </Box>
            </>}

        </Box>
    )
}

export default MyProfileContainer