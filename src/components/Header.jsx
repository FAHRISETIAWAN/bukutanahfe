import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';



const Header = ({ handleLogout  }) => {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const history = useHistory();

  const handleOpenLogoutDialog = () => {
    setOpenLogoutDialog(true);
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    handleLogout();
    history.push('/Auth');
    setOpenLogoutDialog(false);
  }


  return (
    <>
    <AppBar position="static"  color="info">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
   
        <IconButton color="inherit" onClick={handleOpenLogoutDialog}>
          <AccountCircleIcon />
        </IconButton>
    
      </Toolbar>
    </AppBar>

    <Dialog open={openLogoutDialog} onClose={handleCloseLogoutDialog}>
      <DialogTitle>Logout</DialogTitle>
      <DialogContent>
          <Typography variant="body1">Apakah Anda yakin ingin keluar?</Typography>
        </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseLogoutDialog} color="primary">Cancel</Button>
        <Button onClick={handleLogoutClick} color="primary">Logout</Button>
      </DialogActions>
    </Dialog>
  </>

  );
};

export default Header;
