import logo from '../logo.png';
import { useNavigate, Link } from 'react-router-dom';
import NavUserBar from './NavUserBar';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {useSelector} from 'react-redux';



const pages = ['Products', 'Pricing', 'Blog'];

const NavBar = (props) => {    
    const navigate = useNavigate()
    // const [auth,setAuth] = useState(false);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const auth = useSelector(state => state.authenticated)
      const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };

      const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };

  return (
    <>
    <AppBar position="static" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Typography variant="h6" noWrap component="a" href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            <img src={logo} alt='logo' className='logo' />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" color="inherit"
              onClick={handleOpenNavMenu}>
                <MenuIcon />
            </IconButton>

            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}}
              keepMounted transformOrigin={{vertical: 'top', horizontal: 'left'}}
              open={Boolean(anchorElNav)} sx={{ display: { xs: 'block', md: 'none' }}}
              onClose={handleCloseNavMenu}>

              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography variant="h5" noWrap component="a" href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }} >
            <img src={logo} alt='logo' className='logo' onClick={() => navigate("/")} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', '&:hover': { borderBottom: 1, borderColor: 'secondary.main'}}}>
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!auth ? (<Button color='textColor' sx={{'&:hover': { borderBottom: 1, borderColor: 'secondary.main'}}} component={Link} to='/login'>Log In</Button>) : <NavUserBar />}
          </Box>


        </Toolbar>
      </Container>
    </AppBar>


   
    </>
  );

    // return(
    //     <nav>
    //         <div>
    //             <img src={logo} alt='logo' className='logo' onClick={() => navigate("/")}/>

    //             <Stack direction='row'>
    //             <img src={logo} alt='logo' className='logo' onClick={() => navigate("/")}/>

    //                 <Button variant="contained" component={Link} to='/login'>Log In</Button>
    //             </Stack>

    //         </div>
    //     </nav>
    // )
}

export default NavBar

