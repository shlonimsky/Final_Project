import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {getNewNotifications} from '../Redux/actions';
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const NotificationsComponent = (props) => {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state)
    const [allNotifications, setAllNotifications] = useState([])
    const a=[
        {
            "id": 2,
            "task_id": 1,
            "helper_id": 8,
            "first_name": "Lise",
            "price": null,
            "comment": "ready to take",
            "is_read": false,
            "post_date": "2023-04-12"
        },
        {
            "id": 4,
            "task_id": 3,
            "helper_id": 8,
            "first_name": "Bruno",
            "price": 100,
            "comment": "Suuuuuck",
            "is_read": false,
            "post_date": "2023-04-12"
        },
        {
            "id": 5,
            "task_id": 4,
            "helper_id": 1,
            "first_name": "Bruno",
            "price": 100,
            "comment": "Suuuuuck",
            "is_read": false,
            "post_date": "2023-04-12"
        }
    ]

    useEffect(() => {
        // setAllNotifications(a)
        const getNotifications = async () => {
          if (user.user_id) {
            try {
                const {data} = await axios.get(`/offers/unread/getall/${user.user_id}`)
                setAllNotifications(data)
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        }}
        getNotifications()

    },[user])
console.log(allNotifications);
return(
    <Box m={2}>
        { allNotifications.length===0 ? <div>You don't have new notifications</div> : 
        allNotifications.map(notif => 
            <Box key={notif.id} m={2}>
                <Typography variant="h5" >You received a new offer </Typography>
                <Typography variant="caption" >{dayjs(notif.post_date).fromNow()} </Typography>
                <br/>
                <Typography variant="h6" component={Link} to={`/user/${notif.helper_id}`}> {notif.first_name} </Typography>
                <Typography variant="subtitle1" >Offered payment is {notif.price} </Typography>
                <Typography variant="subtitle1" >{notif.comment} </Typography>
                <Typography variant="subtitle1" component={Link} to={`/task/${notif.task_id}`}> To see more details click here</Typography>
                <Divider  />

            </Box>
        )
        }
    </Box>
)
}

export default NotificationsComponent