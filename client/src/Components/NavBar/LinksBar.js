import { Button, Box, Link } from "@mui/material";


const LinksBar = (props) => {
return(
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Button color='textColor' sx={{'&:hover': { borderBottom: 1, borderColor: 'secondary.main'}}} href='/search_helper'>Find a helper</Button>
        <Button color='textColor' sx={{'&:hover': { borderBottom: 1, borderColor: 'secondary.main'}}} href='/search_task'>Become a helper</Button>
  </Box>
)
}
export default LinksBar