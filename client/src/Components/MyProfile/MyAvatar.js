import { Avatar } from "@mui/material"

const MyAvatar = ({user}) => {

    const changeAvatar = () =>{
        console.log("edit avatar");
    }

    return(
        <Avatar alt={user.first_name || user.email} src="#" onClick={changeAvatar} />
        )
}

export default MyAvatar