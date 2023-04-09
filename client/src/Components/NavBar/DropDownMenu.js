import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const DropDownMenu = (props) => {
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {

    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>

      <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" color="inherit"
        onClick={handleOpenNavMenu}>
        <MenuIcon />
      </IconButton>
      <div>
      <Menu id="menu-appbar" anchorEl={anchorElNav}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
        keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={Boolean(anchorElNav)} sx={{ display: { xs: 'block', md: 'none' } }}
        onClose={handleCloseNavMenu}>

        <MenuItem key={1} onClick={handleCloseNavMenu} >
          <Typography textAlign="center" onClick={() => navigate('/search_helper')}>Find a helper</Typography>
        </MenuItem>

        <MenuItem key={2} onClick={handleCloseNavMenu} >
          <Typography textAlign="center" onClick={() => navigate('/search_task')}>Become a helper</Typography>
        </MenuItem>

      </Menu>
      </div>
     

    </Box>
  )
}

export default DropDownMenu;