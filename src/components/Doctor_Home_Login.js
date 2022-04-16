import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Paper, Menu, menuButton, MenuItem, Drawer, Divider, Avatar, CssBaseline, IconButton, AppBar, Toolbar } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import DoctorNavbar from './Doctor_Navbar';
import axios from 'axios';
import ip from '../ipaddress/ip';

const drawerWidth = 240;

export default function DoctorHomeLogin() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const open1 = Boolean(anchorEl);
    const [sessionRole, setsessionRole] = React.useState('');
    const [doctordata, setdoctordata] = useState({});
    const [anchorElProfile, setAnchorElProfile] = React.useState(false);

    const fetchDoctorProfile = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let userid = parsed.userid;
        let role = parsed.Role;
        setsessionRole(role);
        const doctorInfo = await axios.post(ip + 'ShowDoctorDetailUsingId', { DoctorId: userid });
        setdoctordata(doctorInfo?.data?.Doctor);

    }

    useEffect(() => {
        fetchDoctorProfile();
    }, []);


    const handleOPDHome = () => {
        navigate("/DoctorHome");
    };

    const handleIPDHome = () => {
        navigate("/DoctorIPDHome");
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
                        // onClick={handleDrawerOpen}
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
                    <Grid container>
                        <Grid item xs={2}>
                            <img src="h97 logo horizontal-01.png" alt="logo" className={classes.logo} height='40px' style={{ flex: 1, }} />
                        </Grid>
                        <Grid item xs={8} className={classes.clinicname}>
                            <Typography variant="h5" noWrap={true} style={{ color: '#2C7FB2', fontWeight: 600, textAlign: 'center' }}>
                                {doctordata.ClinicName}
                            </Typography>

                        </Grid>
                        <Grid item xs={2} className={classes.drname}>
                            <center>
                                <Typography variant="h8" noWrap={true} style={{ color: '#2C7FB2', float: 'right', textAlign: 'center', marginTop: 10 }}   >
                                    Dr. {doctordata.FirstName} {doctordata.LastName}
                                </Typography>
                            </center>
                        </Grid>
                    </Grid>
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
            {/* <DoctorNavbar /> */}

            {/* main grid */}
            <Grid container spacing={2}
                className={clsx(classes.grid, {
                    [classes.gridShift]: open,
                })}
                direction="row"
                alignItems="center"
                justify="center"

            >
                <Grid item xs={12}>
                    <Typography variant="h5" noWrap={true}
                        style={{
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',
                            textAlign: 'center',
                            marginTop: 20

                        }}>
                        Welcome to Health97 OPD and IPD Management System

                    </Typography>

                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h5" noWrap={true}
                        style={{
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',
                            textAlign: 'center',
                            marginTop: 15,
                            fontSize: 17

                        }}>
                        Please Click on below System to Login

                    </Typography>

                </Grid>

                <Grid item xs={12} sm={2} onClick={handleOPDHome} style={{ marginRight: 60 }} >
                    <Paper elevation={6} className={classes.paper} style={{ marginTop: 20, backgroundColor: '#CFE6F7' }} >
                        <center>
                            <img src="OPD-icon.png" style={{ height: 90, width: 90 }}></img>
                            <Typography variant="h5" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#2C7FB2',
                                    marginTop: 20,
                                    fontSize: 18,
                                    cursor: 'pointer'
                                }}>
                                OPD <br />System<br />
                            </Typography>
                        </center>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={2} onClick={handleIPDHome} style={{ marginLeft: 60 }}>
                    <Paper elevation={6} className={classes.paper} style={{ marginTop: 20, backgroundColor: '#CBEDD5' }}>
                        <center>
                            <img src="IPD-icon.png" style={{ height: 90, width: 90 }}></img>
                            <Typography variant="h5" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#2C7FB2',
                                    marginTop: 20,
                                    fontSize: 18,
                                    cursor: 'pointer'
                                }}>
                                IPD <br /> System<br />
                            </Typography>
                        </center>
                    </Paper>
                </Grid>

            </Grid> {/* main grid */}

        </div >
    );
}



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        backgroundColor: 'white',
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(3),
        color: '#78B088',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 800,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        paddingTop: 40,
        paddingBottom: 40,
        cursor: 'pointer'
    },
    grid: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginTop: 70,
        marginLeft: 5,
        marginRight: 1
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
        color: '#2C7FB2',
    },
}));
