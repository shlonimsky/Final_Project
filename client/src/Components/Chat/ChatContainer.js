import { Avatar, BottomNavigation, BottomNavigationAction, Box, Button, CssBaseline, Paper, TextField, Typography } from "@mui/material";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { useState, useEffect,useRef } from "react";
import { useSelector } from "react-redux";
// import {io} from 'socket.io-client'
import ChatWindow from "./ChatWindow";


const ChatContainer = (props) => {
    // const socket = useRef()
    const user = useSelector(state => state.user)
    const [allChats, setAllChats] = useState(null)
    const [userChat, setUserChat] = useState(null)

    // useEffect(() => {
    //     socket.current = io("ws://localhost:5050")
    // },[])

    // useEffect(() => {
    //     user.user_id && socket.current.emit('addUser', user.user_id);
    //     socket.current.on('getUsers', users => {
    //         console.log(users);
    //     })
    // },[user])

  


    useEffect(() => {
        user.user_id && fetch('/api/conversations', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id: user.user_id })
        })
            .then(res => res.json())
            .then(res => setAllChats(res))
            .catch(err => console.log(err))
    }, [user])


    return (
        <Box m={2} sx={{ border: "solid 0.5px grey", borderRadius: "5px", height: "75vh", display: "flex",  justifyContent: "center"}}>

                <Box m={2} sx={{ display: { xs: "none", md: "block"}, width: "25%"}}>
                    {!allChats ? <div>Loading</div> :
                        <Box>
                            {
                                allChats.map(chat => 
                                <Box key={chat.id}>
                                    <Avatar src="#" alt={
                                        chat.sender_id === user.user_id ? chat.receiver_name : chat.sender_name
                                    } onClick={() => setUserChat(chat)} />
                                    <Typography>{chat.sender_id === user.user_id ? chat.receiver_name : chat.sender_name}</Typography>
                                </Box>)
                            }
                        </Box>}
                </Box>

                <Box m={2} sx={{border: "solid 0.5px grey", borderRadius: "5px", width: "100%", height:"50vh"}}>
                    {!userChat ? <Box>Open chat to start </Box> : <ChatWindow chat={userChat}  user={user}/>}
                </Box>

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0,  display: { xs: "block", md: "none"} }} elevation={5}>
        <BottomNavigation
                    sx={{ overflowY: "visible"}}
                    showlabel={"hello"}
                      value={user}
        //   onChange={""}
        >
            <Paper>

            { allChats && allChats.map(chat => 
            <BottomNavigationAction
            key={chat.id}
            onClick={() => setUserChat(chat)} 
            label={chat.sender_id === user.user_id ? chat.receiver_name : chat.sender_name}
            icon={<Avatar src="#" alt={ chat.sender_id === user.user_id ? chat.receiver_name : chat.sender_name } /> }/>
            )}
            </Paper>

        </BottomNavigation>
      </Paper>
        </Box>
    )
}

export default ChatContainer