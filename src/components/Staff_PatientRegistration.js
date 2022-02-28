import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
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
    IconButton,
    Grid,
    Paper,
    Link,
    TextField,
    FormControl

} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Footer from './Footer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import TodayIcon from '@material-ui/icons/Today';
import ListIcon from '@material-ui/icons/List';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PeopleIcon from '@material-ui/icons/People';
import SearchIcon from '@material-ui/icons/Search';



const drawerWidth = 240;

const columns = [
    { id: 'name', label: 'NAME', minWidth: 100 },

];

function createData(name) {
    return { name };
}

const rows = [
    createData('Pallavi Kale'),
    createData('Rudrayani Tidake'),
    createData('Kajal Bhagavat'),
    createData('Shweta Wankhade'),
    createData('Rutuja Pingle'),
    createData('Sharayu Shende'),
    createData('Gunjun Kale'),
    createData('Pallavi Kale'),
    createData('Rudrayani Tidake'),
    createData('Kajal Bhagavat'),
    createData('Shweta Wankhade'),
    createData('Rutuja Pingle'),
    createData('Sharayu Shende'),
    createData('Gunjun Kale'),
];

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
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

        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: '#2C7FB2',
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
        padding: theme.spacing(2),
        // textAlign: 'center',
        color: '#78B088',
        // fontFamily: '"San Francisco", Helvetica, Arial, san-serif;',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 800,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        borderRadius: 10
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
        paddingLeft: 100,
        paddingTop:15,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    gridShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    griditem: {
        textAlign: 'center',
        color: '#2C7FB2'
    },
    headings: {
        color: '#78B088',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 800,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 200,
        color: '#2C7FB2'
    },
    searchIcon: {
        // paddingTop: '10px',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "gray",

        // marginLeft: 70
    },
    inputRoot: {
        color: 'inherit',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 200,
    },
    inputInput: {
        padding: theme.spacing(0, 0, 0, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '24ch',
            height: '30px'
        },

        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 200,
        color: '#00318B'
    },
    btnsearch: {
        // padding: theme.spacing(2),
        // alignItems:'right'

    },
    tbl: {
        overflow: 'scroll',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    btnviewprofile: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 150,
    },
    btnregister: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 150,
    },
    headingPatientRegistration: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        color: '#00318B !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 600,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },

    headingPatientRegistrationShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    headingNewRegistration: {
        paddingTop: 10,
        color: '#00318B !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    inputFields: {
        [`& fieldset`]: {
            borderRadius: 25,
        },
        width: 300,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 200,
    },
   
}));

export default function BookAppointment() {
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

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


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
            </Drawer>


            <Typography className={clsx(classes.headingPatientRegistration, {
                [classes.headingPatientRegistrationShift]: open,
            })} variant="h5" noWrap={true} style={{ paddingTop: 80, paddingLeft: '100px' }}>
                Patient Registration
            </Typography>

            <Grid className={clsx(classes.grid, {
                [classes.gridShift]: open,
            })} container spacing={2} style={{ backgroundColor: '#fff' }}>

                <Grid item xs={12} sm={4}>
                    <Paper elevation={6} className={classes.paper}>
                        <Typography className={classes.headingNewRegistration} variant="h6" noWrap={true} style={{ paddingTop: 0 }}>
                            New Registration
                        </Typography>

                        <center>
                            <FormControl variant="outlined" className={classes.formControl}  >
                                <TextField className={classes.inputFields} id="outlined-basic" label="First Name" variant="outlined" size="small" />
                            </FormControl>
                        </center>
                        <center>
                            <FormControl variant="outlined" className={classes.formControl}  >
                                <TextField className={classes.inputFields} id="outlined-basic" label="Last Name" variant="outlined" size="small" />
                            </FormControl>
                        </center>
                        <center>
                            <FormControl variant="outlined" className={classes.formControl}  >
                                <TextField className={classes.inputFields} id="outlined-basic" type='number' label="Mobile Number" variant="outlined" size="small" />
                            </FormControl>
                        </center>
                        <center>
                            <FormControl variant="outlined" className={classes.formControl}  >
                                <TextField className={classes.inputFields} id="outlined-basic" type='email' label="Email ID" variant="outlined" size="small" />
                            </FormControl>
                        </center>
                        <center>
                            <FormControl variant="outlined" className={classes.formControl}  >
                                <TextField className={classes.inputFields} id="outlined-basic" type="date" label="DOB" variant="outlined" size="small" />
                            </FormControl>
                        </center>
                        <center>
                            <FormControl variant="outlined" className={classes.formControl}  >
                                <TextField className={classes.inputFields} id="outlined-basic" type='password' label="Password" variant="outlined" size="small" />
                            </FormControl>
                        </center>
                        <Divider />
                        <center><Button className={classes.btnregister}>Register</Button></center>
                    </Paper>
                </Grid>


                <Grid item xs={12} sm={2} >
                    <Paper elevation={0} className={classes.paper} >
                    </Paper>
                </Grid>


                <Grid item xs={12} sm={4} >
                    <Paper className={classes.paper} elevation={6} >
                        <center>
                            <div style={{ paddingBottom: 20 }}>
                                <img src="Pallavi Kale.jpg" style={{ borderRadius: 50, height: 100 }}></img>
                            </div>
                            <Typography variant="h6" noWrap={true} style={{ fontSize: 18, color: '#00318B' }}>
                                Details:
                            </Typography>
                            <Typography variant="h6" noWrap={true} style={{
                                fontSize: 14,
                                fontFamily: '"Poppins", san-serif;',
                                fontStyle: 'normal',
                                color: 'gray'

                            }}>
                                Pallavi Kale
                            </Typography>
                            <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 18, color: '#00318B' }}>
                                Address
                            </Typography>
                            <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: 'gray' }}>
                                Pimple Saudagar, Pune
                            </Typography>
                            <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 18, color: '#00318B' }}>
                                Email ID:
                            </Typography>
                            <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: 'gray' }}>
                                pallavi.kale@rajyugsolution.com
                            </Typography>
                            <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 18, color: '#00318B' }}>
                                Mobile No:
                            </Typography>
                            <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: 'gray' }}>
                                9095009797
                            </Typography>
                            <Divider />
                            <Grid container xs={12} style={{paddingTop:10}}>
                                <Grid item sm={6} >
                                    <center><Button className={classes.btnregister}>Cancle</Button></center>

                                </Grid>
                                <Grid item sm={6} >
                                    <center><Button className={classes.btnregister}>Edit</Button></center>

                                </Grid>
                            </Grid>

                        </center>
                    </Paper>

                </Grid>

            </Grid>

            <Footer />

        </div>
    );
}
