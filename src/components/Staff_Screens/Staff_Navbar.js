import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, CssBaseline, Typography, Drawer, Tooltip, Divider, MenuItem, Menu, ListItem, ListItemIcon, ListItemText, List, IconButton, Avatar } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Footer from '../Footer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentIcon from '@material-ui/icons/Assignment';
import TvIcon from '@material-ui/icons/Tv';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ChatIcon from '@material-ui/icons/Chat';
import SettingsIcon from '@material-ui/icons/Settings';
import ip from '../../ipaddress/ip';
import axios from 'axios';

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


export default function DoctorNavbar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const [doctordata, setdoctordata] = useState([]);
  const [ClinicDetails, setClinicDetails] = useState([]);
  const [authProfile, setAuthProfile] = React.useState(true);
  const [anchorElProfile, setAnchorElProfile] = React.useState(false);
  const [Subscriptiondata, setSubscriptiondata] = React.useState('');
  const [feescount, setfeescount] = React.useState('');
  // const openprofile = Boolean(anchorElProfile);
  const navigate = useNavigate();


  const fetchDoctorProfile = async () => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let userid = parsed.userid;
    let Role = parsed.Role;
    try {
      const doctorInfo = await axios.post(ip + 'ShowUserDetailUsingId', { UserId: userid, Role: Role });
      let dato = doctorInfo?.data?.NewUser[0];
      setdoctordata(dato);
    }
    catch (e) {
      console.log(e)
    }
  }

  const fetchClinicDetails = async () => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let ClinicId = parsed.ClinicId;

    try {
      const ClinicInfo = await axios.post(ip + 'ShowClinicDetailsUsingId', { ClinicId: ClinicId });
      console.log(ClinicInfo?.data?.NewUser);
      let dato = ClinicInfo?.data?.Doctor;
      setClinicDetails(dato);
    }
    catch (e) {
      console.log(e)
    }
  }

  const fetch_Subscription_Profile = async () => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let ClinicId = parsed.ClinicId;
    try {
      const ClinicInfo = await axios.post(ip + 'GetSubscription', { ClinicId: ClinicId, });
      setSubscriptiondata(ClinicInfo?.data?.Subscription);
      testing(ClinicInfo?.data?.Subscription);
    } catch (error) {
      console.log(error)
    }
  }

  const testing = async (subcription) => {
    const now = new Date();
    const current = now.toISOString().split('T')[0];
    if (subcription <= current) {
      console.log('subcription expired')
      try {
        localStorage.removeItem('userdata');
        navigate("/");
      } catch (e) {
        console.log(e);
      }
    }
    else {
      console.log('still have subcription')
    }
  }


  const fetchFeesCount = async () => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    const fees = await axios.post(ip + 'Web_FeesCount', { ClinicId: clinicid });
    setfeescount(fees?.data?.Fees);
  }


  useEffect(() => {
    const interval = setInterval(() => {
      fetchDoctorProfile();
      fetchClinicDetails();
      fetchFeesCount();
    }, 10000);
    fetchFeesCount();
    fetchDoctorProfile();
    fetchClinicDetails();
    fetch_Subscription_Profile();
    return () => clearInterval(interval);
  }, [])


  const handleChange = (event) => {
    setAuthProfile(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElProfile(true);
    navigate("/Staff_Profile");
  };

  const handlelogout = () => {
    setAnchorElProfile(true);
    localStorage.removeItem('userdata');
    navigate("/");
  };


  const handleAppointment = () => {
    navigate("/Staff_payment");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const menuItems = [
    {
      text: 'Home',
      icon: HomeIcon,
      onClick: () => navigate("/Staff_Home"),
    },
    {
      text: 'Dashboard',
      icon: DashboardIcon,
      onClick: () => navigate("/Staff_Dashboard"),
    },
    {
      text: "Appointments On TV",
      icon: TvIcon,
      onClick: () => window.open('/Staff_TV_TodaysAppointments', '_blank'),
    },
    {
      text: 'Book Appointment',
      icon: AssignmentTurnedInIcon,
      onClick: () => navigate("/Staff_Book_Appointment"),
    },
    {
      text: 'Clinic Patients',
      icon: PeopleOutlineIcon,
      onClick: () => navigate("/Staff_ClinicPatients"),
    },
    {
      text: "Upload Reports",
      icon: AssignmentIcon,
      onClick: () => navigate("/Staff_Reports"),
    },
    {
      text: 'Home Visitor Requests',
      icon: ChatIcon,
      onClick: () => navigate('/Staff_Home_Visit_Request'),
    },
    // {
    //   text: 'Clinic Staff',
    //   icon: SupervisorAccountIcon,
    //   onClick: () => navigate('/DoctorClinicStaff'),
    // },
    {
      text: "Home Visitors",
      icon: DirectionsWalkIcon,
      onClick: () => navigate("/Staff_Home_Visitors"),
    },
    // {
    //   text: "Medicines",
    //   icon: LocalHospitalIcon,
    //   onClick: () => navigate("/DoctorAddMedicine"),
    // },
    // {
    //   text: "Clinic Services",
    //   icon: SettingsIcon,
    //   onClick: () => navigate("/DoctorClinicServices"),
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
              {ClinicDetails.ClinicName}
            </Typography>
          </div>
          <div className={classes.drname}>
            <Typography variant="h8" noWrap={true} style={{ color: '#2C7FB2' }}   >
            {doctordata.NmTitle} {doctordata.FirstName} {doctordata.LastName}
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
                {doctordata.ProfileImage ?
                  <Avatar style={{ borderRadius: 50, height: 40, width: 40 }} src={doctordata.ProfileImage} /> :
                  <Avatar style={{ borderRadius: 50, height: 40, width: 40 }} />}
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

          <div>
            <center>
              <p style={{ color: '#fff', backgroundColor: 'red', position: 'absolute', top: 0, marginLeft: 28, marginTop: 5, border: '1px solid red', borderRadius: 45, width: '20px', fontSize: 12, fontWeight: 600, fontFamily: 'Poppins', cursor: 'pointer' }}> {feescount[0] ? feescount[0].count : '0'} </p>
            </center>
            <Tooltip title="Pending Appointment Fees" arrow>
              <IconButton onClick={handleAppointment} class="fa fa-inr" style={{ color: '#2C7FB2', backgroundColor: '#fff', cursor: 'pointer', border: '0px solid white', borderRadius: 25, fontSize: 14, fontWeight: 600 }} >
                Fees
              </IconButton>
            </Tooltip>
          </div>

        </Toolbar>
      </AppBar>
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

      <Footer />
    </div>
  );
}
