import { Button, Box } from "@mui/material";
import {Link} from 'react-router-dom'


const LinksBar = (props) => {
return(
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Button component={Link} color='textColor' sx={{'&:hover': { borderBottom: 1, borderColor: 'secondary.main'}}} to='/search_helper'>Find a helper</Button>
        <Button component={Link} color='textColor' sx={{'&:hover': { borderBottom: 1, borderColor: 'secondary.main'}}} to='/search_task'>Become a helper</Button>
        <Button component={Link} color='textColor' sx={{'&:hover': { borderBottom: 1, borderColor: 'secondary.main'}}} to='/create_task'>Create a new task</Button>
  </Box>
)
}
export default LinksBar