import { Avatar, Box } from "@mui/material"

const MyAvatar = ({user}) => {

    const changeAvatar = () =>{
        console.log("edit avatar");
    }

    return(
        <Box sx={{ display:"flex", justifyContent:"center", marginBottom:"15%"}}>
        <Avatar alt={user.first_name || user.email} src="#" onClick={changeAvatar} sx={{width:"100px", height: "100px"}}/>
        </Box>
        )
}

export default MyAvatar