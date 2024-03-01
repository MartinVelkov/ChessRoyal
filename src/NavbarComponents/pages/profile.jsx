import React from "react";
import "./CssForThePages/Profile.css";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';


export const Profile = () => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogOut = async () => {
   const keyLocalStorage = Object.keys(localStorage).filter((obj) =>
     obj.startsWith("firebase:authUser")
   );
   localStorage.removeItem(keyLocalStorage[0]);
 };


 const handleMenu = (event) => {
   setAnchorEl(event.currentTarget);
 };

 const handleClose = () => {
   setAnchorEl(null);
 };
  return (
   auth && (
      <div>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="false"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Профил</MenuItem>
          <MenuItem onClick={handleLogOut}>Излез от акаунта</MenuItem>
        </Menu>
      </div>
    )
  );
};
