import { Avatar, Badge, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { ifUserAuthorized, cleanReduxState } from '../../Redux/actions'

const NavUserBar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, notifications, messages} = useSelector(state => state);
  // console.log("user in nav", user, notifications)

  const menuId = 'primary-search-account-menu';

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);


  const handleProfileMenuOpen = (e) => setAnchorEl(e.currentTarget);

  const handleOpenUserMenu = (e) => setAnchorElUser(e.currentTarget);

  const handleCloseUserMenu = () => setAnchorElUser(null);


  const logOut = async () => {
    try {
      const res = await axios.delete('/logout')
      if (res.status === 200 || res.status === 204) {
        dispatch(ifUserAuthorized(false))
        dispatch(cleanReduxState())
        navigate('/login')
      }
    } catch (err) {
      console.log("err in logout", err)
      navigate("/login")

    }
  }

  return (
    <Box sx={{display: "flex"}}>
      <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={() => navigate('/chat')}>
        <Badge badgeContent={messages} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton size="large" aria-label="show 17 new notifications" color="inherit" onClick={() => navigate('/notifications')}>

        <Badge badgeContent={notifications} color="error" >
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
          <Avatar alt={user.first_name || user.email} src={user.avatar || "#"} />
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

        <MenuItem onClick={handleCloseUserMenu} >
          <Typography textAlign="center" onClick={() => navigate(`/cabinet/${user.user_id}`)}  >My profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu} >
          <Typography textAlign="center" onClick={() => navigate(`/my_tasks/${user.user_id}`)}>My tasks</Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}  >
          <Typography textAlign="center" onClick={() => navigate(`/my_jobs/${user.user_id}`)}>My jobs</Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu} >
          <Typography textAlign="center" onClick={logOut}>Log Out</Typography>
        </MenuItem>

      </Menu>
    </Box>
  )
}
export default NavUserBar
