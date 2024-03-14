import { Avatar, BottomNavigation, BottomNavigationAction, Box, Button, CssBaseline, Paper, TextField, Typography } from "@mui/material";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
// import {io} from 'socket.io-client'
import ChatWindow from "./ChatWindow";
import {useLocation} from 'react-router-dom';


const ChatContainer = (props) => {
    const location = useLocation();
props = location.state
    console.log("PROPS: ", props);

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
const getNewMessagesForChat = async (chat_id, ) => {
    try {
        
    } catch (err) {
        
    }
}



    useEffect(() => {
        user.user_id && fetch('/api/conversations', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id: user.user_id })
        })
            .then(res => res.json())
            .then(res => {setAllChats(res)
                res.map( chat => {

                    if (chat.sender_id === props.sender_id && chat.receiver_id === props.receiver_id) {setUserChat(chat)}
                    else if (chat.sender_id === props.receiver_id && chat.receiver_id === props.sender_id) {setUserChat(chat)}
                })
            })
            .catch(err => console.log(err))
          
    }, [user])


    return (
        <Box m={2} sx={{ border: "solid 0.5px #44B6C6", borderRadius:"5px", height: "75vh", display: "flex", justifyContent: "center" }}>

            <Box m={2} sx={{ display: { xs: "none", md: "block" }, width: "25%" }}>
                {!allChats ? <Box>Loading</Box> :
                    <Box>
                        {
                            allChats.map(chat =>{

                                 return (<Box key={chat.id}>
                                    <Avatar src="#" alt={
                                        chat.sender_id === user.user_id ? chat.receiver_name : chat.sender_name
                                    } onClick={() => {setUserChat(chat); console.log("chat:",chat );}} />
                                    <Typography>{chat.sender_id === user.user_id ? chat.receiver_name : chat.sender_name}</Typography>
                                </Box>)})
                        }
                    </Box>}
            </Box>

            <Box m={2} sx={{ border: "solid 0.5px grey", borderRadius: "5px", width: "100%", height: "50vh" }}>
                {!userChat ? <Box>Open chat to start </Box> : <ChatWindow chat={userChat} user={user} />}
            </Box>

            <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { xs: "block", md: "none" } }} elevation={5}>
                {/* <BottomNavigation
                    sx={{ overflowY: "visible" }}
                    showlabel={"hello"}
                    value={user}
                //   onChange={""}
                > */}
                    <Paper 
                    sx={{display: "flex", flexDirection:"row", justifyContent: "space-around", flexWrap:"nowrap"}}
                    >

                        {/* {allChats && allChats.map(chat =>
                            <BottomNavigationAction
                                key={chat.id}
                                onClick={() => setUserChat(chat)}
                                // label={chat.sender_id === user.user_id ? chat.receiver_name : chat.sender_name}
                                label={"hello"}
                                icon={<Avatar src="#" alt={chat.sender_id === user.user_id ? chat.receiver_name : chat.sender_name} />}
                            />
                        )} */}

{allChats && allChats.map(chat =>
                            <Box key={chat.id} onClick={() => setUserChat(chat)} >
                                <Box sx={{display: "flex", flexDirection:"column", alignItems: "center", flexWrap:"wrap"}}>
                                <Avatar src="" alt={chat.sender_id === user.user_id ? chat.receiver_name : chat.sender_name} />
                                <Typography variant="button" >{chat.sender_id === user.user_id ? chat.receiver_name : chat.sender_name}</Typography>
                                </Box>
                            </Box>
                        )}
                    </Paper>

                {/* </BottomNavigation> */}
            </Box>
        </Box>
    )
}

export default ChatContainer