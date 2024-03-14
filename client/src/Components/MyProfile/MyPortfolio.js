import { useEffect, useState, } from "react"
import { useDispatch } from "react-redux"
import UploadImage from "../Images/UploadImage"
import ImageList from "../Images/ImageList"
import { Box, Fab, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import { updateUserInfo } from "../../Redux/actions"
import axios from "axios"

const MyPortfolio = ({user}) => {
    const dispatch = useDispatch()
    // const [img, setImg] = useState(user.img || [])
    const [img, setImg] = useState(['https://ik.imagekit.io/helperapp/portfolio/portfolio_Q5CJ2ilwB?updatedAt=1710364223433'])

    // const [isEdit, setIsEdit] = useState(user.first_name === "" ? true : false)

    useEffect(() => {
        console.log("USE EFFECT IMG");
        if (user.img !== img) {
           upddateImg()
        }
    },[img])

    const upddateImg = () => {
        try {
            fetch('/cabinet/img',{
                method: "PUT",
                mode: "cors", // no-cors, *cors, same-origin
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({img, user_id: user.user_id})
            })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))

        } catch (err) {
            console.log(err);
        }
    }


return (
    <Box sx={{display: "flex", marginBottom:"5%", marginTop:"10px", flexDirection: "column"}} m={1}>
        <Typography variant="h4" component="h4">My Portfolio</Typography>
            {/* <Fab size="small" color="secondary" aria-label="edit" 
            sx={{position: "absolute", right: 50}}
            onClick={() => upddateImg()}>
                <EditIcon color="textColor" />
            </Fab> */}


        <Typography sx={{width: "110px"}}>Upload photos</Typography>
        <UploadImage title={"portfolio"} img={img} stateChanger={setImg}/>

        <ImageList imgs={img} stateChanger={setImg} editing={true}/>
    </Box>
)
}

export default MyPortfolio