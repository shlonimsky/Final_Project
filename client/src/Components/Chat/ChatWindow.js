import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {io} from 'socket.io-client'

import dayjs from "dayjs";
import relativeTime  from 'dayjs/plugin/relativeTime'
import { Link } from "react-router-dom";
dayjs.extend(relativeTime)
// import Messages from "./Mesages";


const ChatWindow = ({ chat }) => {

    const socket = useRef()
    const scrollRef = useRef();
    const { id, receiver_id, receiver_name, sender_id, sender_name } = chat
    const user = useSelector(state => state.user);
    const [online, setOnline] = useState([])
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState(null)
    const [arrivalMessage, setArrivalMessage] = useState(null)

    useEffect(() => {
        user.user_id &&
            fetch(`/api/messages`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ conversation_id : chat.id, user_id: user.user_id })
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    setMessages(res)
                })
                .catch(err => console.log(err))
    }, [user, chat])

    useEffect(() => {
        socket.current = io("ws://localhost:5050")
        console.log(socket.current);
        socket.current.on("getMessage", data => {
            console.log("data *******",data);
            setArrivalMessage({
                sender_id : data.senderId,
                sender_name : sender_name===user.first_name ? receiver_name : sender_name,
                message : data.text,
                post_date : Date()
            })
        })
    },[])

    useEffect(() => {
        arrivalMessage &&
          setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage, chat]);

    useEffect(() => {
        user.user_id && socket.current.emit('addUser', user.user_id);
        socket.current.on('getUsers', users => {
            setOnline( users)
            console.log(users);
        })
    },[user])



    // useEffect(() => {
    //     // console.log("in UseEffect get mesaage",messages);
    //     socket.current.on("getMessage", data => {
    //         // console.log("ENTERED TO SOCKET GETMESSAGE", messages);
    //         // console.log("*******",data);
    //         setArrivalMessage({
    //             sender_id : data.senderId,
    //             sender_name : sender_name===user.first_name ? receiver_name : sender_name,
    //             message : data.text,
    //             post_date : Date()
    //         })
    //         // console.log("messages from socket get-----",messages);
    //         // setMessages([...messages,arrivalMessage])
    //         // console.log("messages from socket get-----",messages);
    //     })
    // },[])
  

    useEffect(() => {
        scrollRef.current && scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end"})
        // scrollRef.current.scrollIntoViewOptions({ behavior: "smooth", block: "end", inline: "nearest"});
        // console.log(scrollRef.current.scrollIntoView);
      }, [messages]);

      const isUserOnline = (id) => {
       const isOnline =  online.some(user => user.userId==id)
       console.log(isOnline);
       return isOnline
      }

    const handleSubmit = () => {
        // console.log("In HANDLE SUBMIT")
        const mess = {
            conversation_id: id,
            message : newMessage,
            sender_id : user.user_id,
            sender_name : user.first_name
        }

        
        isUserOnline(receiver_id) && isUserOnline(sender_id) && socket.current.emit("sendMessage",{
            senderId : user.user_id,
            receiverId : receiver_id === user.user_id ? sender_id  : receiver_id,
            text : newMessage
        });

        fetch('/api/messages',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mess)
        })
        .then(res => res.json())
        .then(res => {
            setMessages([...messages, res])
            // setNewMessage(null)
        })
        .catch(err=>console.log("ERROR in POST request",err))
    }

console.log(online);

    return (
        <Box>
            <Box sx={{ width: "100%", height: "50vh", marginBottom: "1rem" }}>

                <Box sx={{overflow: "auto", height: "50vh", overflowY : "visible", behavior: "smooth" }}>
                    { !messages[0] 
                    ? <Box sx={{display: "flex", alignItems:"center", justifyContent: "center"}}>
                        <Typography variant="h6">No messages</Typography>
                    </Box>
                    :
                        messages.map(message =>
                            <Box m={3} ref={scrollRef} key={message.id || message.message} sx={{textAlign: message.sender_id === user.user_id ? "end" : "start"}}>
                                <Typography component={Link} to={`/user/${message.sender_id}`} sx={{color:"#390050", textDecoration:"none"}}>{message.sender_name}</Typography><br/>
                                <Typography variant="caption" >{dayjs(message.post_date).fromNow()}</Typography>
                                <Box p={2} >
                                {/* <Typography > */}
                                    <span className={message.sender_id === user.user_id ? 'message grey' : 'message pink' }>
                                   {message.message}
                                        </span>
                                {/* </Typography> */}

                                </Box>
                            </Box>)
                    }
                </Box>
            </Box>
            <Box  sx={{ display: "flex", flexDirection: "column", alignItems: "end", gap: "10px" }}>
                        <TextField value={newMessage} type={"text"} fullWidth rows={2} placeholder="You can leave your comment here" multiline 
                        onChange={(e) => setNewMessage(e.target.value) }></TextField>
                        <Button variant="outlined" onClick={handleSubmit}>Send</Button>
            </Box>
        </Box>

    )
}

export default ChatWindow

// useEffect(() => {
//     socket.current = io("ws://localhost:8900");
//     socket.current.on("getMessage", (data) => {
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         createdAt: Date.now(),
//       });
//     });
//   }, []);

//   useEffect(() => {
//     arrivalMessage &&
//       currentChat?.members.includes(arrivalMessage.sender) &&
//       setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage, currentChat]);

//   useEffect(() => {
//     socket.current.emit("addUser", user._id);
//     socket.current.on("getUsers", (users) => {
//       setOnlineUsers(
//         user.followings.filter((f) => users.some((u) => u.userId === f))
//       );
//     });
//   }, [user]);

//   useEffect(() => {
//     const getConversations = async () => {
//       try {
//         const res = await axios.get("/conversations/" + user._id);
//         setConversations(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getConversations();
//   }, [user._id]);

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get("/messages/" + currentChat?._id);
//         setMessages(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getMessages();
//   }, [currentChat]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const message = {
//       sender: user._id,
//       text: newMessage,
//       conversationId: currentChat._id,
//     };

//     const receiverId = currentChat.members.find(
//       (member) => member !== user._id
//     );

//     socket.current.emit("sendMessage", {
//       senderId: user._id,
//       receiverId,
//       text: newMessage,
//     });
//   };

  