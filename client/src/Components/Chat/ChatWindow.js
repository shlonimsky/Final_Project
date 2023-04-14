import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {io} from 'socket.io-client'

import dayjs from "dayjs";
import relativeTime  from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
// import Messages from "./Mesages";


const ChatWindow = ({ chat, user }) => {

    console.log("RERENDER in start of Func");
    const socket = useRef()
    const scrollRef = useRef();
    const { id, receiver_id, receiver_name, sender_id, sender_name } = chat
    // const user = useSelector(state => state.user);
    console.log(chat);
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState(null)
    const [arrivalMessage, setArrivalMessage] = useState(null)
    console.log(arrivalMessage,"====> arival messages");

    useEffect(() => {
        socket.current = io("ws://localhost:5050")
    },[])

    useEffect(() => {
        user.user_id &&
            fetch(`/api/messages`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ sender_id, receiver_id })
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    setMessages(res)
                })
                .catch(err => console.log(err))
        // setArrivalMessage(null)
    }, [user, chat])

    useEffect(() => {
        console.log("in UseEffect get mesaage",messages);
        socket.current.on("getMessage", data => {
            console.log("ENTERED TO SOCKET GETMESSAGE", messages);
            console.log("*******",data);
            setArrivalMessage({
                sender_id : data.senderId,
                sender_name : sender_name===user.first_name ? receiver_name : sender_name,
                message : data.text,
                post_date : Date()
            })
            console.log("messages from socket get-----",messages);
            // setMessages([...messages,arrivalMessage])
            console.log("messages from socket get-----",messages);
        })
    },[])
    useEffect(() => {
        arrivalMessage &&
          setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage, chat]);

    useEffect(() => {
        user.user_id && socket.current.emit('addUser', user.user_id);
        socket.current.on('getUsers', users => {
            console.log(users);
        })
    },[user])

    // useEffect(() => {
    //     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    //   }, [messages]);

    // useEffect(( ) => {
    //     arrivalMessage && 
    // },[arrivalMessage])


    const handleSubmit = () => {
        const mess = {
            conversation_id: id,
            message : newMessage,
            sender_id : user.user_id,
            sender_name : user.first_name
        }
        socket.current.emit("sendMessage",{
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
            console.log(res);
            console.log("messages---- from server",messages);

            setMessages([...messages, res])
            console.log("messages---- from server",messages);
        })
        .catch(err=>console.log(err))
    setNewMessage(null)
    }

console.log(messages.length);
console.log("RERENDER", messages);
    return (
        <Box>
            <Box sx={{ width: "100%", height: "50vh", marginBottom: "1rem" }}>

                <Paper ref={scrollRef} sx={{overflow: "auto", height: "50vh", overflowY : "visible" }}>
                    { !messages[0] ? "No messages ":
                        messages.map(message =>
                            <Box key={message.id} sx={{textAlign: message.sender_id === user.user_id ? "end" : "start"}}>
                                <Typography >{message.sender_name}</Typography>
                                <Typography variant="caption" >{dayjs(message.post_date).fromNow()}</Typography>
                                <Typography>{message.message}</Typography>
                            </Box>)
                    }
                </Paper>
            </Box>
            <Box  sx={{ display: "flex", flexDirection: "column", alignItems: "end", gap: "10px" }}>
                        <TextField type={"text"} fullWidth rows={2} placeholder="You can leave your comment here" multiline 
                        onChange={(e) => setNewMessage(e.target.value) }></TextField>
                        <Button variant="outlined" onClick={handleSubmit}>Send</Button>
            </Box>
        </Box>

    )
}

export default ChatWindow