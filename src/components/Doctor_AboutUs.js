import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Typography, IconButton, Button, Grid, Paper, List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import DoctorNavbar from './Doctor_Navbar';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import { Get_Subscription } from '../Apis/Settings/index';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const drawerWidth = 240;

export default function DoctorAboutUs() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [subscriptionData, setsubscriptionData] = useState({});


    const fetchSubscriptionData = async () => {
        try {
            const subcriptionInfo = await Get_Subscription();
            setsubscriptionData(subcriptionInfo);
        } catch (e) {
            console.log(e);
        }
    }

    const handleRenewPlans = () => {
        navigate('/DoctorRenewSubscription');
    }


    useEffect(() => {
        fetchSubscriptionData();
    }, [])

    const handleGoBack = () => {
        navigate('/DoctorHome');
    };

    return (
        <div className={classes.root} style={{ backgroundColor: '#ffffff' }}>
            <DoctorNavbar />

            {/* main grid */}
            <Grid container spacing={2}
                className={clsx(classes.grid, {
                    [classes.gridShift]: open,
                })}
                direction="row"
            >
                <Grid item xs={12} >
                    <Typography variant="h5" noWrap={true}
                        style={{
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',

                        }}>
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', borderRadius: 105, fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        About Us
                    </Typography>
                </Grid>
                <Grid xs={12} style={{ marginTop: 5 }}>
                    <Paper elevation={6} className={classes.paper} style={{ marginLeft: 10, marginRight: 25, marginBottom: 10, borderRadius: 20 }}>
                        <Grid container>
                            <Typography variant="h5" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    fontSize: 20,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#2C7FB2',

                                }}>
                                Our Mission
                            </Typography>
                            <Typography variant="h5" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    fontSize: 16,
                                    overflow: 'hidden',
                                    whiteSpace: 'pre-wrap',
                                    overflowWrap: 'break-word',
                                    color: '#707070',
                                    marginTop: 15

                                }}>
                                It is the mission of Health97 to make quality healthcare affordable and accessible to a billion plus Indians. Providing users with accurate, comprehensive, and curated health information gives them the power to make informed healthcare decisions.
                                Health 97 app revolutionizes the way doctors acquire Patients consult and scientific treatment and reveal their scientific situations.
                            </Typography>
                            {/* <Typography variant="h5" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    fontSize: 20,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#2C7FB2',
                                    marginTop: 20

                                }}>
                                Our approach to healthcare
                            </Typography>
                            <Grid item xs={12}>
                                <Typography variant="h5" noWrap={true}
                                    style={{
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        fontSize: 16,
                                        overflow: 'hidden',
                                        whiteSpace: 'pre-wrap',
                                        overflowWrap: 'break-word',
                                        color: '#707070',

                                    }}>
                                    We offer more than many services out of those below are some most popular services.
                                </Typography>
                            </Grid>

                            <Grid container>
                                <Grid item xs={3}>
                                    <img src='ambulance.PNG' height='80%' width='100%' />
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 17, color: '#2C7FB2', fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        textAlign: 'center',
                                        fontWeight: 600
                                    }}>
                                        24/7 Ambulance Booking Service
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <img src='Appointment.png' height='80%' width='100%' />
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 17, color: '#2C7FB2', fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        textAlign: 'center',
                                        fontWeight: 600
                                    }}>
                                        Online Appointment Booking
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <img src='home visit.PNG' height='80%' width='100%' />
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 17, color: '#2C7FB2', fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        textAlign: 'center',
                                        fontWeight: 600
                                    }}>
                                        Doctor Home Visit
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <img src='patienthistory1.PNG' height='80%' width='100%' />
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 17, color: '#2C7FB2', fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        textAlign: 'center',
                                        fontWeight: 600
                                    }}>
                                        Online Patient History Lifetime
                                    </Typography>
                                </Grid>
                            </Grid> */}


                            <Typography variant="h5" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    fontSize: 20,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#2C7FB2',
                                    marginTop: 20

                                }}>
                                Contact Us
                            </Typography>


                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography variant="h5" noWrap={true}
                                        style={{
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            fontWeight: 600,
                                            fontSize: 16,
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            color: '#707070',
                                            marginTop: 15

                                        }}>
                                        Office Address
                                    </Typography>
                                    <List>
                                        <ListItem >
                                            <ListItemIcon style={{ color: '#2C7FB2' }}>
                                                <LocationOnIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Office 812, City Avenue, Hinjewadi, Pune, Maharashtra" style={{ color: '#707070', fontFamily: 'Poppins', fontWeight: 500 }} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon style={{ color: '#2C7FB2' }}>
                                                <PhoneIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="+912046009797, +91 84 1100 9797" style={{ color: '#707070', fontFamily: 'Poppins', fontWeight: 500 }} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon style={{ color: '#2C7FB2' }}>
                                                <EmailIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="info@Health97.com" style={{ color: '#707070', fontFamily: 'Poppins', fontWeight: 500 }} />
                                        </ListItem>
                                    </List>
                                </Grid>
                                <Grid item xs={6}>
                                    <FacebookIcon onClick={event => window.location.href = "https://www.facebook.com/health97/"} style={{ fontSize: 40, color: '#707070', cursor: 'pointer' }} />
                                    <InstagramIcon onClick={event => window.location.href = "https://www.instagram.com/health_97_/"} style={{ fontSize: 40, color: '#707070', cursor: 'pointer', marginLeft: 10, }} />
                                    <TwitterIcon onClick={event => window.location.href = 'https://twitter.com/97Health'} style={{ fontSize: 40, color: '#707070', marginLeft: 10, cursor: 'pointer' }} />
                                    <LinkedInIcon onClick={event => window.location.href = "https://www.linkedin.com/company/health97/"} style={{ fontSize: 40, color: '#707070', cursor: 'pointer', marginLeft: 10, }} />
                                    <Grid item xs={12}>
                                        <a href="https://play.google.com/store/apps/details?id=com.usersmygynic">

                                            <div style={{ marginTop: '20px' }}>
                                                <img src="googleplay.png" alt="" class="img-responsive" height="50px"
                                                />
                                            </div>
                                        </a>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
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
        fontWeight: 600,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    grid: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginTop: 70,
        marginLeft: 25,
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
    formControl: {
        paddingBottom: theme.spacing(2.5),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnregister: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 500,
        textAlign: 'center',
        borderRadius: 28,
        width: 150,
        fontSize: 12,
        marginTop: 10,
        marginBottom: -10
    },
}));