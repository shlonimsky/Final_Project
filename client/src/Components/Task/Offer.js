import { Box, Button, TextField, Typography} from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Offer = ({task,user}) => {
    const [comment, setComment] = useState(null);
    const [price, setPrice] = useState(null);
    const [offers, setOffers] = useState([])
    const [helper, setHelper] = useState([])

    useEffect(() => {
        fetch(`/offers/${task.id}`)
        .then(res => res.json())
        .then(res => setOffers(res))
        .catch(err => console.log(err))
    },[])

    const handleSusmit = () => {
        console.log({  task_id : task.id,
            helper_id : user.id,
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
                    helper_id : user.id,
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
                    <Box key={offer.id}>
                        <Box>
                        <Typography variant="h6" component={Link} to={`/user/${offer.helper_id}`}>{offer.first_name}</Typography>
                        {offer.helper_id===user.id ? <DeleteOutlinedIcon onClick={() => handleDelete(offer.id)}></DeleteOutlinedIcon> : <></> }
                        </Box>
                        <Typography variant="caption">{offer.post_date}</Typography>
                        <Typography variant="subtitle1">{offer.price ? `Offered price: ${offer.price}` : ""}</Typography>
                        <Typography variant="subtitle1">{offer.comment}</Typography>
                    </Box>
                    )}
            </Box>
        </Box>
    )
}

export default Offer