import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Drawer,
  Divider,
  MenuItem,
  Menu,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Button,
  Avatar,
  IconButton,
  Grid,
  Paper,
  Link
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Footer from './Footer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import TodayIcon from '@material-ui/icons/Today';
import ListIcon from '@material-ui/icons/List';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PeopleIcon from '@material-ui/icons/People';
import { Redirect } from 'react-router-dom';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: 'white',
  },
  //   menuButton: {
  //     marginRight: theme.spacing(2),
  //   },
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
    fontFamily: '"Poppins", san-serif;',
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
    fontFamily: '"Poppins", san-serif;',
    fontStyle: 'normal',
    fontWeight: 400,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'

  },
  paper: {
    padding: theme.spacing(1),
    // textAlign: 'center',
    color: '#78B088',
    fontFamily: '"Poppins", san-serif;',
    fontStyle: 'normal',
    fontWeight: 800,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  services: {
    // paddingTop: 100,
    // textAlign: 'center',
    color: '#78B088',
    fontFamily: '"San Francisco", Helvetica, Arial, san-serif;',
  },
  report: {
    // flex: 1,
    // border:'1px solid red',
    justifyContent: 'center',
    // textAlign: 'center',
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

export default function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);

  const [authProfile, setAuthProfile] = React.useState(true);
  const [anchorElProfile, setAnchorElProfile] = React.useState(null);
  const openprofile = Boolean(anchorElProfile);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setAuthProfile(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElProfile(null);
  };


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const handleRegisterClick = () => {
    navigate("/patientregistration");
  };

  const handleBookAppointmentClick = () => {
    navigate("/bookappointment");
  };

  const handleTodaysAppointmentClick = () => {
    navigate("/todaysappointment");
  };

  const handleClinicPatientsClick = () => {
    navigate("/clinicpatients");
  };

  const handleBeenTreated = () => {
    navigate("/patientDetails_sendIn");
  };

  const menuItems = [
    {
      text: 'Dashboard',
      icon: DashboardIcon,
      onClick: () => navigate("/dashboard"),
    },
    {
      text: 'Patient Registration',
      icon: GroupAddIcon,
      onClick: () => navigate('/patientregistration'),
    },
    {
      text: 'Book Appointment',
      icon: PermContactCalendarIcon,
      onClick: () => navigate("/bookappointment"),
    },
    {
      text: "Today's Appointments",
      icon: TodayIcon,
      onClick: () => navigate("/todaysappointment"),
    },
    {
      text: 'Clinic Patients',
      icon: PeopleIcon,
      onClick: () => navigate("/clinicpatients"),
    },
    {
      text: "Clinic Services",
      icon: ListIcon,
      onClick: () => navigate("/clinicservices"),
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
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem> */}
          </Menu>
          <div>
            <img src="h97 logo horizontal-01.png" alt="logo" className={classes.logo} height='40px' style={{ flex: 1 }} />
          </div>
          <div className={classes.clinicname}>
            <Typography variant="h5" noWrap={true}>
              AKSHAY NURSING HOME
            </Typography>
          </div>
          <div className={classes.drname}>
            <Typography variant="h8" noWrap={true}  >
              Dr. Pradeep Musale
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
                <AccountCircle style={{ height: 35, width: 35 }} />
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
                open={openprofile}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
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
        {/* <List>
                    {['Dashboard', 'Profile'].map((text, index) => (
                        <ListItem button key={text} style={{ fontFamily: '"San Francisco", Helvetica, Arial, san-serif;', }}>
                            <ListItemIcon style={{ color: '#fff', fontFamily: '"San Francisco", Helvetica, Arial, san-serif;', }}>{index % 2 === 0 ? (<><Link href='Footer' color="inherit"><DashboardIcon /></Link></>) : <AccountBoxIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Patient Registration', 'Appointments'].map((text, index) => (
                        <ListItem button key={text} >
                            <ListItemIcon onClick={onClick} style={{ color: '#fff', fontFamily: '"San Francisco", Helvetica, Arial, san-serif;', }}>{index % 2 === 0 ? <GroupAddIcon /> : <PermContactCalendarIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                    {['Todays Appointment', 'Services'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon style={{ color: '#fff', fontFamily: '"San Francisco", Helvetica, Arial, san-serif;', }}>{index % 2 === 0 ? <TodayIcon /> : <ListIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List> */}

      </Drawer>


      <div className='row'>
        <div className={classes.report}>
          <Grid container spacing={3}
            direction="row"
            alignItems="center"
            justify="center"
            position='fixed'
            style={{ padding: '75px', paddingBottom: 0 }}>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper} elevation={0} >
                <div className="column" style={{ borderRight: '1px solid gray' }}>
                  <div className="row" style={{ padding: theme.spacing(0), color: '#78B088', }}>
                    <Typography variant="h7" noWrap={true}
                      style={{
                        fontFamily: '"Poppins", san-serif;',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        color: '#78B088',

                      }}
                    >
                      TODAY'S REGISTRATION
                    </Typography>
                  </div>
                  <div className="row" style={{ padding: theme.spacing(0), color: '#00318B' }}>
                    <Typography variant="h4" noWrap={true}>
                      90
                    </Typography>
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper} elevation={0}>
                <div className="column" style={{ borderRight: '1px solid gray' }}>
                  <div className="row" style={{ padding: theme.spacing(0), color: '#78B088' }}>
                    <Typography variant="h7" noWrap={true}
                      style={{
                        fontFamily: '"Poppins", san-serif;',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        color: '#78B088',

                      }}
                    >
                      TODAY'S APPOINTMENTS
                    </Typography>
                  </div>
                  <div className="row" style={{ padding: theme.spacing(0), color: '#00318B' }}>
                    <Typography variant="h4" noWrap={true}>
                      20
                    </Typography>
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper} elevation={0}>
                <div className="column" style={{ borderRight: '1px solid gray' }}>
                  <div className="row" style={{ padding: theme.spacing(0), color: '#78B088' }}>
                    <Typography variant="h7" noWrap={true}
                      style={{
                        fontFamily: '"Poppins", san-serif;',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        color: '#78B088',

                      }}>
                      PATIENT IN QUEUE
                    </Typography>
                  </div>
                  <div className="row" style={{ padding: theme.spacing(0), color: '#00318B' }}>
                    <Typography variant="h4" noWrap={true}>
                      40
                    </Typography>
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper} elevation={0}>
                <div className="column">
                  <div className="row" style={{ padding: theme.spacing(0), color: '#78B088' }}>
                    <Typography variant="h7" noWrap={true}
                      style={{
                        fontFamily: '"Poppins", san-serif;',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        color: '#78B088',

                      }}>
                      MONTHLY APPOINTMENTS
                    </Typography>
                  </div>
                  <div className="row" style={{ padding: theme.spacing(0), color: '#00318B' }}>
                    <Typography variant="h4" noWrap={true}>
                      11190
                    </Typography>
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>

        <div className="row2" style={{ padding: theme.spacing(10), paddingTop: 30, paddingBottom: 0 }}>
          <Typography variant="h6" noWrap={true} style={{ paddingBottom: '10px', color: '#78B088', fontFamily: '"San Francisco", Helvetica, Arial, san-serif;', }}>
            SERVICES
          </Typography>
          <Grid container spacing={3}
            direction="row"
            alignItems="center"
            justify="center"
            position='fixed'
            style={{ paddingBottom: 0 }}
          >
            <Grid item xs={6} sm={3} style={{ paddingBottom: 0 }} onClick={handleRegisterClick}>
              <Paper className={classes.paper} elevation={3} style={{ borderRadius: 15 }} >
                <div className="column">
                  <div className="row" style={{ color: '#2C7FB2', textAlign: 'center', fontSize: 12 }}>
                    <Typography variant="h8" noWrap={true} >
                      REGISTER
                    </Typography>
                  </div>
                  <div className="row" style={{ color: '#2C7FB2', textAlign: 'center', fontSize: 12 }}>
                    <Typography variant="h8" noWrap={true}>
                      PATIENTS
                    </Typography>
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3} style={{ paddingBottom: 0 }} onClick={handleBookAppointmentClick}>
              <Paper className={classes.paper} elevation={3} style={{ borderRadius: 15 }}>
                <div className="column">
                  <div className="row" style={{ color: '#2C7FB2', textAlign: 'center', fontSize: 12 }}>
                    <Typography variant="h8" noWrap={true}>
                      BOOK
                    </Typography>
                  </div>
                  <div className="row" style={{ color: '#2C7FB2', textAlign: 'center', fontSize: 12 }}>
                    <Typography variant="h8" noWrap={true}>
                      APPOINTMENT
                    </Typography>
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3} style={{ paddingBottom: 0 }} onClick={handleTodaysAppointmentClick}>
              <Paper className={classes.paper} elevation={3} style={{ borderRadius: 15 }}>
                <div className="column">
                  <div className="row" style={{ color: '#2C7FB2', textAlign: 'center', fontSize: 12 }}>
                    <Typography variant="h8" noWrap={true}>
                      TODAY'S
                    </Typography>
                  </div>
                  <div className="row" style={{ color: '#2C7FB2', textAlign: 'center', fontSize: 12 }}>
                    <Typography variant="h8" noWrap={true}>
                      APPOINTMENTS
                    </Typography>
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3} style={{ paddingBottom: 0 }} onClick={handleClinicPatientsClick}>
              <Paper className={classes.paper} elevation={3} style={{ borderRadius: 15 }}>
                <div className="column">
                  <div className="row" style={{ color: '#2C7FB2', textAlign: 'center', fontSize: 12 }}>
                    <Typography variant="h8" noWrap={true}>
                      CLINIC
                    </Typography>
                  </div>
                  <div className="row" style={{ color: '#2C7FB2', textAlign: 'center', fontSize: 12 }}>
                    <Typography variant="h8" noWrap={true}>
                      PATIENTS
                    </Typography>
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>

        <div className="row3" style={{ padding: theme.spacing(10), paddingTop: '50px', }}>
          <Typography variant="h6" noWrap={true} style={{ color: '#78B088', fontFamily: '"San Francisco", Helvetica, Arial, san-serif;', paddingBottom: '10px' }}>
            PATIENT IN QUEUE
          </Typography>

          <Container style={{ marginTop: 0, paddingBottom: 0, paddingLeft: 0 }}>
            <Grid container spacing={2} direction="row" wrap="nowrap">
              <Grid item xs={2}>
                {/* <Grid item xs={6} sm={12} style={{ flex: 1, justifyContent: 'center', textAlign: 'center', marginBottom: 10, }}>
                  <center> <Avatar justify="center" style={{ marginTop: '0px', height: 60, width: 60 }} >PK</Avatar> </center>
                </Grid> */}
                <div style={{ padding: 10, paddingTop: 0 }}>
                  <center>
                    <img src="Pallavi Kale.jpg" style={{ height: '60px', borderRadius: 30 }}></img>
                  </center>
                </div>
                <Paper className={classes.paper} elevation={4} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '-40px', padding: 30, borderRadius: 20, fontFamily: '"Poppins", san-serif;', fontStyle: 'normal', fontWeight: 400 }}>
                  <Grid className={classes.grid} item xs={12} style={{ color: '#2C7FB2', textAlign: 'center' }}>
                    Pallavi Kale
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: 'center', color: '#2C7FB2' }}>
                    09:00
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Button style={{ color: '#2C7FB2' }}>Patient In</Button>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Grid item xs={6} sm={12} style={{ flex: 1, justifyContent: 'center', textAlign: 'center', marginBottom: 10, }}>
                  <center> <Avatar justify="center" style={{ marginTop: '0px', height: 60, width: 60 }} >RT</Avatar> </center>
                </Grid>
                <Paper className={classes.paper} elevation={4} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '-40px', padding: 30, borderRadius: 20, fontFamily: '"San Francisco", Helvetica, Arial, san-serif;', fontStyle: 'normal', fontWeight: 400, backgroundColor: '#78B088' }}>
                  <Grid className={classes.grid} item xs={12} style={{ fontFamily: '"San Francisco", Helvetica, Arial, san-serif;', fontWeight: 200, fontStyle: 'normal', color: '#fff', textAlign: 'center' }}>
                    Rudrayani Tidke
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: 'center', color: '#fff' }}>
                    09:00
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: 'center', alignSelf: 'center', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', }}>
                    <Button onClick={handleBeenTreated} style={{ color: '#fff', textAlign: 'center', alignSelf: 'center' }}>Been Treated</Button>
                  </Grid>
                </Paper>
              </Grid>
              {/* <Grid item xs={2}>
                                <Paper className={classes.paper}></Paper>
                            </Grid>
                            <Grid item xs={2}>
                                <Paper className={classes.paper}></Paper>
                            </Grid> */}
            </Grid>
          </Container>
          {/* <Grid container spacing={2}
                        direction="row"
                        alignItems="center"
                        position='static'
                        style={{ paddingBottom: 0 }}
                    >
                        <Grid item xs={6} sm={2} style={{ paddingBottom: 0 }}>
                            <Paper className={classes.paper} elevation={3}>
                                <div className="column">
                                    <div className="row" style={{ color: '#2C7FB2', textAlign: 'center', fontSize: 12 }}>
                                        <Typography variant="h8" noWrap={true}>
                                            Pallavi Kale
                                        </Typography>
                                    </div>
                                    <div className="row" style={{ color: '#2C7FB2', textAlign: 'center', fontSize: 12 }}>
                                        <Typography variant="h8" noWrap={true}>
                                            20-09-2021
                                        </Typography>
                                    </div>
                                    <div className="row" style={{ color: '#2C7FB2', textAlign: 'center', fontSize: 12 }}>
                                        <Typography variant="h8" noWrap={true}>
                                            Patient In
                                        </Typography>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sm={2} style={{ paddingBottom: 0 }}>
                            <Paper className={classes.paper} elevation={3} >
                                <div className="column">
                                <div className="row" style={{ color: '#2C7FB2', textAlign: 'center', fontSize: 12 }}>
                                        <Typography variant="h8" noWrap={true}>
                                            Radhika Joshi
                                        </Typography>
                                    </div>
                                    <div className="row" style={{ color: '#2C7FB2', textAlign: 'center', fontSize: 12 }}>
                                        <Typography variant="h8" noWrap={true}>
                                            20-09-2021
                                        </Typography>
                                    </div>
                                    <div className="row" style={{ color: '#2C7FB2', textAlign: 'center', fontSize: 12 }}>
                                        <Typography variant="h8" noWrap={true}>
                                            Patient In
                                        </Typography>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sm={2} style={{ paddingBottom: 0 }}>
                            <Paper className={classes.paper} elevation={3} >
                                <div className="column">
                                <div className="row" style={{ color: '#2C7FB2', textAlign: 'center', fontSize: 12 }}>
                                        <Typography variant="h8" noWrap={true}>
                                            Radha Pingle
                                        </Typography>
                                    </div>
                                    <div className="row" style={{ color: '#2C7FB2', textAlign: 'center', fontSize: 12 }}>
                                        <Typography variant="h8" noWrap={true}>
                                            20-09-2021
                                        </Typography>
                                    </div>
                                    <div className="row" style={{ color: '#2C7FB2', textAlign: 'center', fontSize: 12 }}>
                                        <Typography variant="h8" noWrap={true}>
                                            Patient In
                                        </Typography>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sm={2} style={{ paddingBottom: 0 }}>
                            <Paper className={classes.paper} elevation={3} >
                                <div className="column">
                                <div className="row" style={{ color: '#2C7FB2', textAlign: 'center', fontSize: 12 }}>
                                        <Typography variant="h8" noWrap={true}>
                                            Sayali Pawar
                                        </Typography>
                                    </div>
                                    <div className="row" style={{ color: '#2C7FB2', textAlign: 'center', fontSize: 12 }}>
                                        <Typography variant="h8" noWrap={true}>
                                            20-09-2021
                                        </Typography>
                                    </div>
                                    <div className="row" style={{ color: '#2C7FB2', textAlign: 'center', fontSize: 12 }}>
                                        <Typography variant="h8" noWrap={true}>
                                            Patient In
                                        </Typography>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid> */}
        </div>

      </div>

      <Footer />
    </div>
  );
}
