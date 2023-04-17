import { Box, Rating, Typography } from "@mui/material"
import { useState , useEffect} from "react";
import axios from "axios";

const MyRating = ({user}) => {
    const [rating, setRating] = useState(null);

    useEffect(() => {
        const getRating = async () => {
            try {
                const { data } = await axios.get(`/api/reviews/${user.user_id}`)
                setRating(+data.average)
            } catch (err) {
                console.log(err);
            }
        }
        getRating()
    },[user])
    return(
        <Box sx={{marginBottom: {xs: "0", md:"15%"}, marginTop:"15%"}}>
            <Typography variant="h6">Rating</Typography>
            { rating && (
                <Rating value={rating} readOnly/>
            )}
        </Box>
    )
}

export default MyRating