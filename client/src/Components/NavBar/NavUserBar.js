import { Avatar, Badge, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {ifUserAuthorized} from '../../Redux/actions'

const NavUserBar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  console.log("user in nav",user)

  const menuId = 'primary-search-account-menu';
  
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleProfileMenuOpen = (e) => setAnchorEl(e.currentTarget);

  const handleOpenUserMenu = (e) => setAnchorElUser(e.currentTarget);

  const handleCloseUserMenu = () => setAnchorElUser(null);

  //for second
  const [anchorEl, setAnchorEl] = useState(null);




  const logOut = async () => {
    try{
      const res = await axios.delete('/logout')
      if (res.status === 200 || res.status === 204) {
        dispatch(ifUserAuthorized(false))
        navigate('/login')
      }
    } catch(err){
      console.log("err in logout",err)
      navigate("/login")

    }
  }

  return (
    <>
      <IconButton size="large" aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={4} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton size="large" aria-label="show 17 new notifications" color="inherit">

        <Badge badgeContent={17} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
      </IconButton>

      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center" onClick={() => navigate(`/cabinet/${user.userID}`)}>My profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center" onClick={() => navigate(`/my_tasks/${user.userID}`)}>My tasks</Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center" onClick={() => navigate(`/my_jobs/${user.userID}`)}>My jobs</Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center" onClick={logOut}>Log Out</Typography>
        </MenuItem>
        {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
      </Menu>
    </>
  )
}
export default NavUserBar
