import { Box, Button, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField, Typography} from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import HandshakeTwoToneIcon from '@mui/icons-material/HandshakeTwoTone';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AlertDialog from "./Alert";

const Offer = ({task,user, alertChanger, titleChanger, helperChanger}) => {
    const [comment, setComment] = useState(null);
    const [price, setPrice] = useState(null);
    const [offers, setOffers] = useState([])
    const me = useSelector((state) => state.user)
    
    // const [helper, setHelper] = useState([])
// console.log("TASK::: ", task);
    useEffect(() => {
        fetch(`/offers/${task.id}`)
        .then(res => res.json())
        .then(res => setOffers(res))
        .catch(err => console.log(err))
    },[])

    const handleSusmit = () => {
        console.log({  task_id : task.id,
            helper_id : user.user_id,
            price,
            comment, 
            first_name : user.first_name});
        if( price || comment){
            fetch(`/offers`,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    task_id : task.id,
                    helper_id : user.user_id,
                    price,
                    comment, 
                    first_name : user.first_name
                })
            })
        .then(res => res.json())
        .then(res => {
            const updatedOffers = [res, ...offers];
            setOffers(updatedOffers);
            setPrice(null);
            setComment(null);
        })
        .catch(err => console.log(err.msg))
        }
    }

    const handleDelete = (id) => {
        console.log("delete");
        fetch(`/offers/${id}`,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(res => {
            const ind = offers.findIndex(item => item.id===id)
            console.log(ind);
            offers.splice(ind,1)
            console.log(offers);
            setOffers([...offers])
        })
        .catch(err => console.log(err))
    }


    return (
        <Box  m={2} p={2} sx={{border: "solid 0.5px grey", borderRadius: "5px"}}>
            {task.status !=='open' ? <></> : <>
                { !task.is_bargain ? <></> : 
                <TextField placeholder="Enter your offered price" type={"number"}
                onChange={(e) => setPrice(e.target.value)}
                ></TextField>}
                <TextField value={comment || ''} fullWidth rows={2} placeholder="You can leave your comment here" multiline
                onChange={(e) => setComment(e.target.value)}
                > 
                </TextField>
                <Button onClick={() => {
                    setPrice(null); 
                    setComment(null)
                }} >Cansel</Button>

                <Button onClick={handleSusmit}>Send an offer</Button>
                </>}
            <Box>
                {offers.map((offer) =>
                    <Box key={offer.id} sx={{paddingTop: 5}}>
                            <Typography variant="h6" component={Link} to={`/user/${offer.helper_id}`}>{offer.first_name}</Typography>
                        {/* {offer.helper_id===user.id && <DeleteOutlinedIcon color="primary" onClick={() => handleDelete(offer.id)}></DeleteOutlinedIcon>} */}

                        {/* {task.user_id===me.user_id && <div>
                            <HandshakeTwoToneIcon color="primary"  onClick={() => {titleChanger('hire'); alertChanger(true); helperChanger({user_id: offer.helper_id, first_name: offer.first_name})}}></HandshakeTwoToneIcon>
                            <Typography variant="subtitle2">Accept for help</Typography>
                            
                        </div>} */}

<Box sx={{ display:'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:"top" }}>
    <Box sx={{paddingTop: 0}}> 
                        
                        <Typography variant="caption">{offer.post_date}</Typography>
                        <Typography variant="subtitle1">{offer.price ? `Offered price: ${offer.price}` : ""}</Typography>
                        <Typography variant="subtitle1">{offer.comment}</Typography>
                        </Box>

                            <SpeedDial
                                ariaLabel="SpeedDial basic example"
                                sx={{ height:40, margin:2, position: 'relative', bottom: 50,}}
                                icon={<MoreHorizIcon  />}
                            >
                                {offer.helper_id===user.user_id &&  <SpeedDialAction
                                    key={"Delete"}
                                    icon={<DeleteOutlinedIcon color="primary" onClick={() => handleDelete(offer.id)}/>}
                                    tooltipTitle={"Delete"}
                                />}
                                {task.user_id===me.user_id && <SpeedDialAction
                                    key={"Get Help"}
                                    icon={<HandshakeTwoToneIcon color="primary"  onClick={() => {titleChanger('hire'); alertChanger(true); helperChanger({user_id: offer.helper_id, first_name: offer.first_name})}}></HandshakeTwoToneIcon>}
                                    tooltipTitle={"Get Help"}
                                />}
                            </SpeedDial>

                        </Box>
                    </Box>
                    )}
            </Box>
        </Box>
    )
}

export default Offer