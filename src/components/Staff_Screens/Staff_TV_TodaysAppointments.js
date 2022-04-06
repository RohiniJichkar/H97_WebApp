import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Container, Avatar, CssBaseline, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Button, Grid, Paper } from "@material-ui/core";
import ip from '../../ipaddress/ip';
import axios from 'axios';
import Slider from 'react-slick';
import MenuIcon from '@material-ui/icons/Menu';
import TV_Slider_Component from './components/TV_Slider/SliderComponent';
import Patient_In_Queue_TV_Component from './components/TV_Slider/Patient_In_Queue_Component';
import { get_patientinqueue } from '../../Apis/Staff/TV_Advertisements/index';
import { Show_Send_In_Details } from './components/TV_Slider/Show_Send_In_Details/index';

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

export default function Staff_TV_TodaysAppointments() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open1 = Boolean(anchorEl);
    const [doctordata, setdoctordata] = useState({});
    const [authProfile, setAuthProfile] = React.useState(true);
    const [anchorElProfile, setAnchorElProfile] = React.useState(false);
    const [patientIn, setpatientIn] = useState([]);
    const [ClinicDetails, setClinicDetails] = useState([]);
    const [SendIn, setSendIn] = useState([]);
    const [SendInModal, setSendInModal] = useState(false);


    const FetchSend_In = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let ClinicId = parsed.ClinicId;
        try {
            const request = await axios.post(ip + 'Web_ShowSendInQueueForTV', { ClinicId: ClinicId });
            if (request) {
                let dato = request?.data?.Appointment;
                setSendIn(dato);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchClinicDetails();
            fetchPatientIn();
            FetchSend_In();
            setSendInModal(true);
        }, 10000);
        const secondinterval = setInterval(() => {
            setSendInModal(false);
        }, 20000);
        FetchSend_In();
        fetchClinicDetails();
        fetchPatientIn();
        return () => clearInterval(interval, secondinterval);

    }, [])

    const fetchPatientIn = async () => {
        try {
            const data = await get_patientinqueue();
            setpatientIn(data);
        }
        catch (error) {
            console.log(error)
        }
    }

    const fetchClinicDetails = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let ClinicId = parsed.ClinicId;

        try {
            const ClinicInfo = await axios.post(ip + 'ShowClinicDetailsUsingId', { ClinicId: ClinicId });
            let dato = ClinicInfo?.data?.Doctor;
            setClinicDetails(dato);
        }
        catch (e) {
            console.log(e)
        }
    }

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
        localStorage.clear();
        navigate("/");
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const handleGoBack = () => {
        navigate("/DoctorHome");
    };

    const handlenewregistration = () => {
        navigate("/DoctorPatientRegistration");
    };


    var settings = {
        dots: true,
        // infinite: true,
        // speed: 500,
        // slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        // autoplaySpeed: 2000,
        // slickNext: true,
        // slickPrevious: true,
        swipe: true
    };



    return (
        <div className={classes.root} style={{ backgroundColor: '#ffffff' }}>
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
                        className={classes.menuButton}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>

                    <div>
                        <img src="h97 logo horizontal-01.png" alt="logo" className={classes.logo} height='40px' style={{ flex: 1 }} />
                    </div>

                    <div className={classes.clinicname}>
                        <Typography variant="h5" noWrap={true} style={{ color: '#2C7FB2', fontWeight: 600 }}>
                            {ClinicDetails.ClinicName}
                        </Typography>
                    </div>
                    {/* <div className={classes.drname}>
                        <Typography variant="h8" noWrap={true} style={{ color: '#2C7FB2' }} >
                            Dr. {doctordata.FirstName} {doctordata.LastName}
                        </Typography>
                    </div> */}
                    {auth && (
                        <div className={classes.profile}>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="primary"

                            >
                                {ClinicDetails.Logo ?
                                    <img style={{ borderRadius: 50, height: 60, width: 140 }} src={ClinicDetails.Logo} /> :
                                    <img style={{ borderRadius: 50, height: 60, width: 140 }} src='default-image.png' />}

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


            {/* main grid */}
            <Grid container spacing={2} style={{ marginTop: 50 }}>

                <Grid item xs={12}>
                    <TV_Slider_Component />
                </Grid>

                <Container>
                    <Grid container spacing={2}>
                        {patientIn.length > 0 ? <Patient_In_Queue_TV_Component data={patientIn} /> :
                            <>
                                <Grid item xs={2} style={{ paddingTop: 10, marginLeft: '-30px' }}>
                                    <Grid item xs={6} sm={12} style={{ flex: 1, justifyContent: 'center', textAlign: 'center' }}>
                                        <center>
                                            <Avatar style={{ borderRadius: 50, height: 50, width: 50 }} /> </center>
                                    </Grid>
                                    <Paper className={classes.paper} elevation={4} style={{ marginRight: 25, marginLeft: 25, flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '-40px', borderRadius: 20, fontFamily: '"Poppins", san-serif;', fontStyle: 'normal', fontWeight: 400, backgroundColor: '#fff' }}>
                                        <Grid item xs={12} style={{ textAlign: 'center', paddingTop: 40, paddingBottom: 40, fontSize: 14, fontFamily: 'Poppins', color: '#000' }}>
                                            No Patients
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </>
                        }
                    </Grid>
                </Container>
                {SendInModal ? <Show_Send_In_Details show={SendInModal} data={SendIn} /> : null}
                {/* <Container>
                    <Grid container spacing={2} direction="row" wrap="nowrap">
                        <Grid item xs={2} style={{ marginLeft: '-90px', paddingRight: 0 }}>
                            <div>
                                <center>
                                    <img src="Pallavi Kale.jpg" style={{ height: '60px', borderRadius: 30 }}></img>
                                </center>
                            </div>
                            <Paper className={classes.paper} elevation={4} style={{ marginRight: 30, marginLeft: 30, justifyContent: 'center', alignItems: 'center', marginTop: '-40px', borderRadius: 20, fontFamily: '"Poppins", san-serif;', fontStyle: 'normal', fontWeight: 400, }}>
                                <Grid item xs={12} style={{ color: '#2C7FB2', textAlign: 'center', paddingTop: 40, fontWeight: 600, fontSize: '14px' }}>
                                    Pallavi Kale
                                </Grid>
                                <Grid item xs={12} style={{ textAlign: 'center', color: '#2C7FB2' }}>
                                    09:00
                                </Grid>
                                <Grid item xs={12} style={{ textAlign: 'center', color: '#2C7FB2', paddingBottom: 10 }}>
                                    Patient In
                                </Grid>

                            </Paper> */}
                {/* <div>
                                <center>
                                    <Button size='small' style={{ fontSize: '10px', color: 'white', marginTop: '-15px', backgroundColor: '#78B088', borderRadius: 5, paddingLeft: 20, paddingRight: 20, }}>Send In</Button>
                                </center>
                            </div> */}
                {/* </Grid>
                        <Grid item xs={2} style={{ marginLeft: '-40px' }}>
                            <div>
                                <center> <Avatar justify="center" style={{ height: 60, width: 60 }} >RT</Avatar> </center>
                            </div>
                            <Paper className={classes.paper} elevation={4} style={{ marginRight: 30, marginLeft: 30, justifyContent: 'center', alignItems: 'center', marginTop: '-40px', borderRadius: 20, fontFamily: '"Poppins", san-serif;', fontStyle: 'normal', fontWeight: 400, }}>
                                <Grid item xs={12} style={{ color: '#2C7FB2', textAlign: 'center', paddingTop: 40, fontWeight: 600, fontSize: '14px' }}>
                                    Rudrayani Tidke
                                </Grid>
                                <Grid item xs={12} style={{ textAlign: 'center', color: '#2C7FB2' }}>
                                    09:00
                                </Grid>
                                <Grid item xs={12} style={{ textAlign: 'center', color: '#2C7FB2', paddingBottom: 10 }}>
                                    Patient In
                                </Grid>

                            </Paper> */}
                {/* <div>
                                <center>
                                    <Button size='small' style={{ fontSize: '10px', color: 'white', marginTop: '-15px', backgroundColor: '#78B088', borderRadius: 5, paddingLeft: 20, paddingRight: 20, }}>Send In</Button>
                                </center>
                            </div> */}
                {/* </Grid>
                    </Grid>
                </Container> */}

            </Grid> {/* main grid */}

        </div >
    );
}
