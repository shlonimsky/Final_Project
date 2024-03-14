import { Box, Typography, Button, TextField } from "@mui/material"
import { useState } from "react";
import bgImg from '../home.png';
import iconRepair from '../iconRepair.png'
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import FormatPaintOutlinedIcon from '@mui/icons-material/FormatPaintOutlined';
import { Link } from 'react-router-dom';


const Home = (props) => {
    // const [search,setSearch] = useState(null)

    return (
        <div>

        <div className="homeImg" style={{backgroundImage: `url(${bgImg})`}}>
    
            <Typography variant="h2" sx={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.3)", 
            width:"100%", height: "50vh", textAlign: "center", paddingTop: "2vh"}}>A helping hand for every household task</Typography>
        
            </div>

      

        <Box sx={{display: "flex", justifyContent: "space-around", flexWrap: "wrap"}}>

            <Box m={2} sx={{display: "flex", flexDirection: "column", alignItems: "center"}} >
                <Button component={Link} to='/search/task?search=&category=3'>
                {/* <BuildOutlinedIcon sx={{fontSize: "3em"}} /> */}
                <img className="iconImg" src={"https://images.kabanchik.ua/966d51a2-d80f-41cb-ae35-07655cb4777f.png"} alt="icon" />
                </Button>
                <Button component={Link} to='/search/task?search=&category=3'>
                <Typography sx={{textAlign: "center", marginTop: "1em"}} variant="overline" >Repairment works</Typography>
                </Button>
            </Box>

            <Box m={2} sx={{display: "flex", flexDirection: "column", alignItems: "center", width: "10rem" }} >
                {/* <LocalShippingOutlinedIcon sx={{fontSize: "3em"}} /> */}
                <Button component={Link} to='/search/task?search=&category=1'>
                <img className="iconImg" src="https://images.kabanchik.ua/abe03f5c-8534-4707-9b4b-034e000466d6.png" alt="icon" />
                </Button>
                <Button component={Link} to='/search/task?search=&category=1'>
                <Typography sx={{textAlign: "center", marginTop: "1em"}} variant="overline">Courier and deliver services</Typography>
                </Button>

            </Box>

            <Box m={2} sx={{display: "flex", flexDirection: "column", alignItems: "center"}} >
                {/* <FormatPaintOutlinedIcon sx={{fontSize: "3em"}} /> */}
                <Button component={Link} to='/search/task?search=&category=7'>

                <img className="iconImg" src="https://images.kabanchik.ua/4d4b1d4c-4785-4569-8549-e862b93427fe.png" alt="icon" />
                </Button>
                <Button component={Link} to='/search/task?search=&category=7'>

                <Typography sx={{textAlign: "center", marginTop: "1em"}} variant="overline">Finishing works</Typography>
                </Button>
            </Box>

            <Box m={2} sx={{display: "flex", flexDirection: "column", alignItems: "center"}} >
                {/* <FormatPaintOutlinedIcon sx={{fontSize: "3em"}} /> */}
                <Button component={Link} to='/search/task'>

                <img className="iconImg" src="https://kabanchik.ua/cloud-cgi/static/hoggy/static/build/site/images/squares-Ahr08.png" alt="icon" />
                </Button>
                <Button component={Link} to='/search/task'>

                <Typography sx={{textAlign: "center", marginTop: "1em"}} variant="overline">See all categories</Typography>
                </Button>
            </Box>
           
        </Box>
        </div>

    )
}

export default Home