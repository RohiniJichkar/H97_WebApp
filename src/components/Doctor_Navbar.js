import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, CssBaseline, Typography, Button, TextField, FormControl, Grid, Drawer, Divider, MenuItem, Menu, Tooltip, Collapse, ListItem, ListItemIcon, ListItemText, List, IconButton, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Footer from './Footer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import HomeIcon from '@material-ui/icons/Home';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentIcon from '@material-ui/icons/Assignment';
import TvIcon from '@material-ui/icons/Tv';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ChatIcon from '@material-ui/icons/Chat';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import FeaturedVideoIcon from '@material-ui/icons/FeaturedVideo';
import ip from '../ipaddress/ip';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const drawerWidth = 250;

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
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none',
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
    '&::-webkit-scrollbar': {
      display: 'none',
    },
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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  btnAdd: {
    backgroundColor: '#2C7FB2 !important',
    color: '#fff !important',
    fontFamily: '"Poppins", san-serif;',
    fontStyle: 'normal',
    fontWeight: 400,
    textAlign: 'center',
    borderRadius: 28,
    width: 130,
  },
  btnCancle: {
    backgroundColor: '#2C7FB2 !important',
    color: '#fff !important',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    textAlign: 'center',
    borderRadius: 28,
    width: 120,
    marginTop: 10,
    fontSize: 12
  },
  btnregister: {
    backgroundColor: '#2C7FB2 !important',
    color: '#fff !important',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    textAlign: 'center',
    borderRadius: 28,
    width: 120,
    marginTop: 10,
    fontSize: 12
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));


export default function DoctorNavbar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [maxWidth, setMaxWidth] = React.useState('md');

  const open1 = Boolean(anchorEl);
  const [doctordata, setdoctordata] = useState({});
  const [staffdata, setstaffdata] = useState({});
  const [authProfile, setAuthProfile] = React.useState(true);
  const [anchorElProfile, setAnchorElProfile] = React.useState(false);
  const [sessionRole, setsessionRole] = React.useState('');
  const [hvreq, sethvreq] = useState([]);
  const [appointcount, setappointcount] = useState([]);
  const [openmodal, setopenmodal] = React.useState(false);
  const [Subscriptiondata, setSubscriptiondata] = React.useState('');
  const [file, setfile] = useState();
  const [Description, setDescription] = useState('');

  // const openprofile = Boolean(anchorElProfile);
  const navigate = useNavigate();


  const handleClick = () => {
    setOpen(!open);
  };

  const fetchDoctorProfile = async () => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let userid = parsed.userid;
    let role = parsed.Role;
    setsessionRole(role);
    const doctorInfo = await axios.post(ip + 'ShowDoctorDetailUsingId', { DoctorId: userid });
    setdoctordata(doctorInfo?.data?.Doctor);

  }

  const fetchStaffProfile = async () => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let userid = parsed.userid;
    let role = parsed.Role;
    setsessionRole(role);
    const staffInfo = await axios.post(ip + 'ShowUserDetailUsingId', { UserId: userid, Role: role });
    setstaffdata(staffInfo?.data?.NewUser);
  }

  const fetchHVRequestCount = async () => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;

    const hvInfo = await axios.post(ip + 'Web_HomeVisitorRequestCount', { ClinicId: clinicid });
    sethvreq(hvInfo?.data?.HVRequest);
  }

  const fetchAppointmentCount = async () => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    let doctorid = parsed.userid;

    const appointInfo = await axios.post(ip + 'Web_AppointmentCountForDoctor', { ClinicId: clinicid, DoctorId: doctorid });
    setappointcount(appointInfo?.data?.Appointment);
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



  const addAdvertisement = async () => {
    var cdata = await localStorage.getItem("userdata");
    let parsed = JSON.parse(cdata);
    let clinicid = parsed.ClinicId;
    let doctorid = parsed.userid;

    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("DoctorId", doctorid);
    formdata.append("ClinicId", clinicid);
    formdata.append("Category", 'TV');
    formdata.append("Discription", Description);

    try {
      const addAdvertisements = await axios.post(ip + 'Web_AddTVAdvertisement', formdata, { headers: { "Content-Type": "multipart/form-data" } })
      if (addAdvertisements) {
        alert('Advertisement Added Successfully');
        setopenmodal(false);
      }
    } catch (e) {
      console.log(e);
    }
  }


  useEffect(() => {
    fetchDoctorProfile();
    fetchHVRequestCount();
    fetchAppointmentCount();
    fetch_Subscription_Profile();
  }, [])


  const handleChange = (event) => {
    setAuthProfile(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElProfile(true);
    navigate("/DoctorProfile");
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

  const handleHVReq = () => {
    navigate('/DoctorHomeVisitRequest')
  };

  const handleAppoint = () => {
    navigate('/DoctorDashboard')
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

  const menuItems = [
    {
      text: 'Home',
      icon: HomeIcon,
      onClick: () => navigate("/DoctorHome"),
    },
    {
      text: 'Dashboard',
      icon: DashboardIcon,
      onClick: () => navigate("/DoctorDashboard"),
    },
    {
      text: "Appointments On TV",
      icon: TvIcon,
      onClick: () => window.open('/Doctor_TV_TodaysAppointments', '_blank'),
    },
    {
      text: 'Book Appointment',
      icon: AssignmentTurnedInIcon,
      onClick: () => navigate("/DoctorBookAppointment"),
    },
    {
      text: 'Clinic Patients',
      icon: PeopleOutlineIcon,
      onClick: () => navigate("/DoctorClinicPatients"),
    },
    {
      text: "Upload Reports",
      icon: AssignmentIcon,
      onClick: () => navigate("/DoctorReports"),
    },
    {
      text: 'Clinic Staff',
      icon: SupervisorAccountIcon,
      onClick: () => navigate('/DoctorClinicStaff'),
    },
    {
      text: "Home Visitors",
      icon: DirectionsWalkIcon,
      onClick: () => navigate("/DoctorHomeVisitors"),
    },
    {
      text: "Medicines",
      icon: LocalHospitalIcon,
      onClick: () => navigate("/DoctorMedicines"),
    },
    {
      text: "Clinic Services",
      icon: MedicalServicesIcon,
      onClick: () => navigate("/DoctorClinicServices"),
    },
    {
      text: 'Upload Advertisements',
      icon: FeaturedVideoIcon,
      onClick: () => navigate("/DoctorAdvertisements"),

    },

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
            {/* {sessionRole == 'Doctor' ? */}
            <Typography variant="h5" noWrap={true} style={{ color: '#2C7FB2', fontWeight: 600 }}>
              {doctordata.ClinicName}
            </Typography>
            {/* : <Typography variant="h5" noWrap={true} style={{ color: '#2C7FB2' }}>
                {staffdata[0].FirstName}
              </Typography>
            } */}

          </div>
          <div className={classes.drname}>
            {/* {sessionRole == 'Doctor' ?  */}
            <Typography variant="h8" noWrap={true} style={{ color: '#2C7FB2' }}   >
              Dr. {doctordata.FirstName} {doctordata.LastName}
            </Typography>

            {/* :
              <Typography variant="h5" noWrap={true} style={{ color: '#2C7FB2' }}>
                {staffdata[0].FirstName} {staffdata[0].LastName}
              </Typography>} */}
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
          <div style={{ marginRight: 10 }}>
            <center>
              <p style={{ color: '#fff', backgroundColor: 'red', position: 'absolute', top: 0, marginLeft: 14, marginTop: 5, border: '1px solid red', borderRadius: 45, width: '20px', fontSize: 12, fontWeight: 600, fontFamily: 'Poppins' }}> {appointcount[0] ? appointcount[0].count : '0'}  </p>
            </center>
            <Tooltip title="Clinic Appointments" arrow>
              <NotificationsNoneIcon onClick={() => handleAppoint()} style={{ color: '#2C7FB2', cursor: 'pointer' }} />
            </Tooltip>
          </div>
          <div>
            <center>
              <p style={{ color: '#fff', backgroundColor: 'red', position: 'absolute', top: 0, marginLeft: 14, marginTop: 5, border: '1px solid red', borderRadius: 45, width: '20px', fontSize: 12, fontWeight: 600, fontFamily: 'Poppins' }}> {hvreq[0] ? hvreq[0].count : '0'} </p>
            </center>
            <Tooltip title="Home Visitor Appointments" arrow>

              <DirectionsWalkIcon onClick={() => handleHVReq()} style={{ color: '#2C7FB2', cursor: 'pointer' }} />
            </Tooltip>
          </div>

          {/* <div>
            <SettingsIcon onClick={() => setopenmodal(true)} style={{ color: '#2C7FB2', cursor: 'pointer', marginLeft: 10 }} />
          </div> */}
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
        </List>

      </Drawer>

      <Footer />


      {/* Add Advertisement */}
      <Dialog
        open={openmodal}
        maxWidth={maxWidth}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Upload Advertisements"}
          <IconButton edge="start" color="inherit" onClick={() => setopenmodal(false)} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container xs={12}>
              <Grid item xs={6}>
                <center>
                  <Typography variant="h6" noWrap={true} style={{
                    fontSize: 16,
                    fontFamily: 'Poppins',
                    fontStyle: 'normal',
                    color: '#707070',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    alignItems: 'center',

                  }}>
                    Image:
                  </Typography>
                </center>

                <center>
                  <Typography variant="h6" noWrap={true} style={{
                    fontSize: 16,
                    fontFamily: 'Poppins',
                    fontStyle: 'normal',
                    color: '#707070',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    alignItems: 'center',
                    marginTop: 25

                  }}>
                    Description:
                  </Typography>
                </center>
              </Grid>
              <Grid item xs={6}>
                <center>
                  <FormControl variant="outlined"   >
                    <TextField id="outlined-basic" enctype="multipart/form-data" onChange={e => {
                      const file = e.target.files[0];
                      setfile(file)
                    }} type="file" size="small" label="" variant="outlined" />
                  </FormControl>
                </center>

                <TextField multiline
                  rows={2}
                  rowsMax={6} id="outlined-basic" size="small" label="" variant="outlined"
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ marginTop: 20, width: '94%', marginLeft: 10 }}
                />
              </Grid>

              <Grid container>
                <Grid xs={12} sm={6}>
                  <Button className={classes.btnCancle} onClick={() => setopenmodal(false)} style={{ float: 'right', marginRight: 20, marginTop: 40 }}>
                    Cancel
                  </Button>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Button className={classes.btnregister} onClick={() => addAdvertisement()} autoFocus style={{ float: 'left', marginLeft: 20, marginTop: 40 }}>
                    Submit
                  </Button>
                </Grid>
              </Grid>

            </Grid>
          </DialogContentText>
        </DialogContent>

      </Dialog>
    </div>
  );
}
