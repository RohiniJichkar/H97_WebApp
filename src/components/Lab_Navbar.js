import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, CssBaseline, Typography, Collapse, Drawer, Divider, MenuItem, Menu, ListItem, ListItemIcon, ListItemText, List, IconButton, Avatar } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Footer from './Footer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentIcon from '@material-ui/icons/Assignment';
import TvIcon from '@material-ui/icons/Tv';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ChatIcon from '@material-ui/icons/Chat';
import SettingsIcon from '@material-ui/icons/Settings';
import FeaturedVideoIcon from '@material-ui/icons/FeaturedVideo';
import ip from '../ipaddress/ip';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: 'white',
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: '#2C7FB2'
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    fontFamily: '"Poppins", san-serif;',
    fontStyle: 'normal',
    fontWeight: 400,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#2C7FB2',
    fontFamily: '"Poppins", san-serif;',
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#fff'
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
    backgroundColor: '#2C7FB2',
    color: '#fff'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    fontFamily: '"Poppins", san-serif;',
    fontStyle: 'normal',
    fontWeight: 400,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  clinicname: {
    // flexGrow: 1,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(0),
    },
    flex: 1,
    textAlign: 'center',
    color: '#00318B',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 800,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  drname: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    padding: theme.spacing(1),
    flex: 0.2,
    alignSelf: 'right',
    textAlign: 'right',
    color: '#00318B',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'

  },
  paper: {
    padding: theme.spacing(1),
    color: '#78B088',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 800,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  services: {
    color: '#78B088',
    fontFamily: '"San Francisco", Helvetica, Arial, san-serif;',
  },
  report: {
    justifyContent: 'center',
    color: '#78B088',
    fontFamily: '"San Francisco", Helvetica, Arial, san-serif;',
    fontWeight: 'bold'
  },
  grid: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }
}));


export default function LabNavbar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const [anchorElProfile, setAnchorElProfile] = React.useState(false);
  const [fname, setfname] = React.useState('');
  const [lname, setlname] = React.useState('');
  const [labname, setlabname] = React.useState('');
  const [authProfile, setAuthProfile] = React.useState(true);

  // const openprofile = Boolean(anchorElProfile);
  const navigate = useNavigate();


  const fetchUserProfile = async () => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let labnm = parsed.UserProfile.LabName;
    let fname = parsed.UserProfile.FirstName;
    let lname = parsed.UserProfile.LastName;
    setfname(fname);
    setlname(lname);
    setlabname(labnm);
  }

  useEffect(() => {
    fetchUserProfile();
  }, [])


  const handleChange = (event) => {
    setAuthProfile(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElProfile(true);
    navigate("/LabProfile");
  };

  const handlelogout = () => {
    setAnchorElProfile(true);
    localStorage.removeItem('userdata');
    navigate("/");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCurrentPlan = () => {
    navigate('/DoctorCurrentPlan');
  }

  const handleRenewPlans = () => {
    navigate('/DoctorRenewSubscription');
  }

  const handleAboutUs = () => {
    navigate('/DoctorAboutUs');
  }


  const handleTrainingVideo = () => {
    navigate('/DoctorTrainingVideo');
  }
  const handleClick = () => {
    setOpen(!open);
  };


  const menuItems = [
    {
      text: 'Home',
      icon: HomeIcon,
      onClick: () => navigate("/LabHome"),
    },
    {
      text: 'Lab Patients',
      icon: PeopleOutlineIcon,
      onClick: () => navigate("/LabClinicPatients"),
    },
    {
      text: "Upload Reports",
      icon: AssignmentIcon,
      onClick: () => navigate("/LabReports"),
    },
    // {
    //   text: 'Clinic Subscriptions',
    //   icon: VpnKeyIcon,
    //   onClick: () => navigate("/AdminClinicSubscription"),
    // },
    // {
    //   text: 'Referral Doctors',
    //   icon: SupervisorAccountIcon,
    //   onClick: () => navigate("/AdminReferralDoctors"),
    // },
    // {
    //   text: 'Tips',
    //   icon: EmojiObjectsIcon,
    //   onClick: () => navigate("/AdminTips"),
    // },

  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{ backgroundColor: 'white' }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
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
            open={open1}
            onClose={handleClose}
          >

          </Menu>
          <div>
            <img src="h97 logo horizontal-01.png" alt="logo" className={classes.logo} height='40px' style={{ flex: 1 }} />
          </div>
          <div className={classes.clinicname}>
            <Typography variant="h5" noWrap={true} style={{ color: '#2C7FB2', fontWeight: 600 }}>
              {labname}
            </Typography>
          </div>
          <div className={classes.drname}>
            <Typography variant="h8" noWrap={true} style={{ color: '#2C7FB2' }}   >
              {fname} {lname}
            </Typography>
          </div>
          {auth && (
            <div className={classes.profile}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="primary"
              >
                <Avatar style={{ borderRadius: 50, height: 40, width: 40 }} />
                {/* <AccountCircle style={{ height: 35, width: 35 }} /> */}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElProfile}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={anchorElProfile}
                onClick={() => setAnchorElProfile(false)}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handlelogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {/* <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar} style={{ color: '#fff' }}>
          <IconButton onClick={handleDrawerClose} style={{ color: '#fff' }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider /> */}
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar} style={{ color: '#fff' }}>
          <IconButton onClick={handleDrawerClose} style={{ color: '#fff' }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuItems.map(({ text, icon: Icon, onClick }, index) => (
            <ListItem button key={text} onClick={onClick}>
              <ListItemIcon style={{ color: '#fff' }}>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

      </Drawer>
      {/* <List>
          {menuItems.map(({ text, icon: Icon, onClick }, index) => (
            <ListItem button key={text} onClick={onClick}>
              <ListItemIcon style={{ color: '#fff' }}>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <ListItem button onClick={handleClick}>
            <ListItemIcon style={{ color: '#fff' }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Setting" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} onClick={handleCurrentPlan}>
                <ListItemIcon style={{ color: '#fff' }}>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Current Plan" />
              </ListItem>
              <ListItem button className={classes.nested} onClick={handleRenewPlans}>
                <ListItemIcon style={{ color: '#fff' }}>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Subscription Plan" />
              </ListItem>
              <ListItem button className={classes.nested} onClick={handleAboutUs}>
                <ListItemIcon style={{ color: '#fff' }}>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="About Us" />
              </ListItem>
              <ListItem button className={classes.nested} onClick={handleTrainingVideo}>
                <ListItemIcon style={{ color: '#fff' }}>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Training Video" />
              </ListItem>
            </List>
          </Collapse>
        </List> */}




      <Footer />
    </div>
  );
}
