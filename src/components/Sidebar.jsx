import React, { useState } from 'react';
import { BrowserRouter as Switch, Route, Link  } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
// import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import SwitchAccountOutlinedIcon from '@mui/icons-material/SwitchAccountOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

import logo from '../assets/images/book.png'; 


const drawerWidth = 290;

const Root = styled('div')({
  display: 'flex',
  
});

const DrawerContainer = styled('div')({
  width: drawerWidth,
  position: 'relative', 
  zIndex: 1, 
  borderRight: 'none', 
  boxShadow: '4px 0px 8px rgba(0, 0, 0, 0.1)', 

});

const LogoContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2px',
});

const BackButtonContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '16px',
  cursor: 'pointer', 
});

const Content = styled('div')({
  flexGrow: 1,
  padding: '16px', 
  
});

function Sidebar() {
  // const history = useHistory();
  const theme = createTheme(); 
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const [open, setOpen] = useState(isLargeScreen); 
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
    if (subMenuOpen) {
      setSubMenuOpen(false); 
    }
  };

  // const handleLogoutClick = () => {
  //   handleLogout();
  //   history.push('/Auth');
  // }

  const handleBackButton = () => {
    setOpen(false); 
  };

  const handleSubMenuToggle = () => {
    setSubMenuOpen(!subMenuOpen);
  };
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const sidebarWidth = isSmallScreen ? "w-64" : "w-72";

  return (
    <div
    className={`h-screen overflow-y-auto px-4 pt-5 pb-4 flex justify-between flex-col ${sidebarWidth} transition-all duration-300`}
    >
      <ThemeProvider theme={theme} >
      <Root >
        <Drawer
          variant={isLargeScreen ? 'persistent' : 'temporary'}
          anchor="left"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, //  open on mobile.
          }}
        >
          <DrawerContainer  style={{ backgroundColor: '#0288d1',height: '100%' }}>
            <BackButtonContainer onClick={handleDrawerToggle}>
              <KeyboardDoubleArrowLeftOutlinedIcon style={{color:'white'}}/>          
            <LogoContainer style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
              <img src={logo} alt="Logo" style={{ maxWidth: '100%', height: '50px',width:'40px' }} />
              <Typography variant="h6" style={{ marginLeft: '8px',color:'white' }}>
              Simpan Pinjam
            </Typography>
            </LogoContainer>
            <div style={{ height: '30px' }} />
            </BackButtonContainer>
            <List>

            <ListItem button component={Link} to="/dashboard">
                <ListItemIcon style={{color:'white'}}>
                  <HomeOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" style={{color:'white'}} />
              </ListItem>

              <ListItem button component={Link} to="/pinjam/peminjaman">
                <ListItemIcon style={{color:'white'}}>
                  <LibraryBooksOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Pinjam/Kembali" style={{color:'white'}} />
              </ListItem>

              <ListItem button component={Link} to="/pinjam/history">
                <ListItemIcon style={{color:'white'}}>
                  <HistoryOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="History" style={{color:'white'}} />
              </ListItem>

              {
                localStorage.getItem('role') !== 'admin' ?
                <></>
                :
                <ListItem button component={Link} to="/pegawai/petugas">
                <ListItemIcon style={{color:'white'}}>
                  <SwitchAccountOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Manajemen Petugas" style={{color:'white'}} />
              </ListItem>
              }
              

            </List>
            {/* <List style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <ListItem button onClick={handleLogoutClick}>
              <ListItemIcon style={{ color: 'white' }}>
                <ExitToAppOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" style={{ color: 'white' }} />
            </ListItem>
          </List> */}
          </DrawerContainer>
        </Drawer>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '30px' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            style={{ zIndex: 2, color: '#ffae00' }}
          >
            {open ? <KeyboardDoubleArrowLeftOutlinedIcon /> : <MenuIcon />}
          </IconButton>
        </div>
        <Content>
        <Switch>
              <Route path="/dashboard"> 
            </Route>
        </Switch>
        </Content>
      </Root>
    </ThemeProvider>

    </div>
  );
};

export default Sidebar;
