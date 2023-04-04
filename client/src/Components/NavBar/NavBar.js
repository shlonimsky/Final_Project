import logo from '../../logo.png';
import NavUserBar from './NavUserBar';
import DropDownMenu from './DropDownMenu';
import LinksBar from './LinksBar';
import { AppBar, Box, Button, Container, Toolbar, } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const NavBar = (props) => {
  const auth = useSelector(state => state.authenticated);

  return (
    <>
      <AppBar position="static" >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <DropDownMenu />

            <Button component={Link} to='/'>
              <img src={logo} alt='logo' className='logo' />
            </Button>

            <LinksBar />

            <Box sx={{ flexGrow: 0 }}>
              {!auth
                ? (<Button color='textColor' sx={{ '&:hover': { borderBottom: 1, borderColor: 'secondary.main' } }} component={Link} to='/login'>Log In</Button>)
                : <NavUserBar />}
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

