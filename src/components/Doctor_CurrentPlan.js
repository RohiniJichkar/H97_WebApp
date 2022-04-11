import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Typography, IconButton, Button, Grid, Paper } from "@material-ui/core";
import DoctorNavbar from './Doctor_Navbar';
import DateRangeIcon from '@material-ui/icons/DateRange';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Get_Subscription } from '../Apis/Settings/index';

const drawerWidth = 240;

export default function DoctorCurrentPlan() {
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
                        Current Subscription Plan
                    </Typography>
                </Grid>
                <Grid xs={12} style={{ marginTop: 5 }}>
                    <Paper elevation={6} className={classes.paper} style={{ marginLeft: 10, marginRight: 25, marginBottom: 10, borderRadius: 20 }}>
                        <Grid container style={{ marginTop: 10 }}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" noWrap={true} style={{
                                    fontSize: 18, color: '#2C7FB2', fontFamily: 'Poppins', textDecorationLine: 'underline', textUnderlineOffset: '1px', textDecorationThickness: '1px',
                                    fontStyle: 'normal',

                                }}>

                                    Clinic Details
                                </Typography>
                                <center>

                                    <Grid container>
                                        <Grid item xs={6}>
                                            {subscriptionData[0] ? <img src={subscriptionData[0].Logo} style={{ height: '130px', width: '240px' }} /> : <img src="default-image.png" style={{ height: '130px', width: '240px' }} />}
                                        </Grid>
                                        <Grid item xs={6} >
                                            <center>
                                                <LocalHospitalIcon style={{ fontSize: 40, color: '#2C7FB2', marginTop: 10 }} />
                                                <Typography variant="h6" noWrap={true} style={{
                                                    fontSize: 18,
                                                    fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    color: '#707070',
                                                    fontWeight: 600,

                                                }}>
                                                    {subscriptionData[0] ? subscriptionData[0].ClinicName : 'NA'}
                                                </Typography>
                                                <Typography variant="h6" noWrap={true} style={{
                                                    fontSize: 14,
                                                    fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    color: '#707070',
                                                    fontWeight: 600

                                                }}>
                                                    REGNO:- {subscriptionData[0] ? subscriptionData[0].ClinicRegistrationNumber ? subscriptionData[0].ClinicRegistrationNumber : 'NA' : 'Not Provided'}
                                                </Typography>
                                                <Typography variant="h6" noWrap={true} style={{
                                                    fontSize: 14,
                                                    fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    color: '#707070',
                                                    fontWeight: 600

                                                }}>
                                                    GSTIN:- {subscriptionData[0] ? subscriptionData[0].ClinicGstNumber ? subscriptionData[0].ClinicGstNumber : 'NA' : 'Not Provided'}
                                                </Typography>

                                            </center>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600,
                                                marginTop: 10
                                            }}>
                                                Email
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600,
                                                marginTop: 10
                                            }}>
                                                Mobile
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 400
                                            }}>
                                                {subscriptionData[0] ? subscriptionData[0].ClinicEmail : 'Not Provided'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 400

                                            }}>
                                                {subscriptionData[0] ? subscriptionData[0].ClinicMobileNo : 'Not Provided'}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} style={{ marginTop: 15 }}>
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 400,
                                                marginLeft: 20,
                                                marginRight: 20
                                            }}>
                                                {subscriptionData[0] ? subscriptionData[0].ClinicAddress : 'Not Provided'} <br /> {subscriptionData[0] ? subscriptionData[0].ClinicCity : 'Not Provided'} {subscriptionData[0] ? subscriptionData[0].ClinicState : 'Not Provided'} {subscriptionData[0] ? subscriptionData[0].ClinicCountry : 'Not Provided'} {subscriptionData[0] ? subscriptionData[0].ClinicPincode : 'NA'}
                                            </Typography>
                                        </center>
                                    </Grid>

                                    <Grid container style={{ marginTop: 20 }}>
                                        <Grid item xs={6}>
                                            <DateRangeIcon style={{ fontSize: 30, color: '#2C7FB2' }} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <DateRangeIcon style={{ fontSize: 30, color: '#2C7FB2' }} />
                                        </Grid>
                                        <Grid item xs={6} style={{ marginTop: 10 }}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 16,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600
                                            }}>
                                                Opening Time
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{ marginTop: 10 }}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 16,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600
                                            }}>
                                                Closing Time
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{ marginTop: 10 }}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600
                                            }}>
                                                {subscriptionData[0] ? subscriptionData[0].ClinicStartTime ? subscriptionData[0].ClinicStartTime : 'NA' : 'Not Provided'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{ marginTop: 10 }}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600
                                            }}>
                                                {subscriptionData[0] ? subscriptionData[0].ClinicEndTime ? subscriptionData[0].ClinicEndTime : 'NA' : 'Not Provided'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </center>

                            </Grid>


                            <Grid item xs={12} sm={6} style={{ borderLeft: '1px solid lightgray' }}>
                                <Typography variant="h6" noWrap={true} style={{
                                    fontSize: 18, color: '#2C7FB2', fontFamily: 'Poppins', textDecorationLine: 'underline', textUnderlineOffset: '1px', textDecorationThickness: '1px',
                                    fontStyle: 'normal', marginLeft: 20

                                }}>
                                    Subscription Details
                                </Typography>
                                <center>

                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600,
                                                marginTop: 10
                                            }}>
                                                Start Date
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600,
                                                marginTop: 10
                                            }}>
                                                Expiry Date
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 18,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600
                                            }}>
                                                01/04/2022
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 18,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600

                                            }}>
                                                01/06/2022
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} style={{ marginTop: 25 }}>
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 16,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600,
                                                marginLeft: 20,
                                                marginRight: 20
                                            }}>
                                                Subscription Type
                                            </Typography>
                                        </center>
                                    </Grid>

                                    <Grid item xs={12} style={{ marginTop: 10 }}>
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 24,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600,
                                                marginLeft: 20,
                                                marginRight: 20
                                            }}>
                                                Free Trial
                                            </Typography>
                                        </center>
                                    </Grid>

                                    <Grid container style={{ marginTop: 30 }}>

                                        <Grid item xs={6} >
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 16,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600
                                            }}>
                                                Subscription Amount
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 16,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600
                                            }}>
                                                Other Fees
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{ marginTop: 10 }}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600
                                            }}>
                                                400 /-
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{ marginTop: 10 }}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600
                                            }}>
                                                100 /-
                                            </Typography>
                                        </Grid>
                                    </Grid>


                                    <Grid container style={{ marginTop: 30 }}>

                                        <Grid item xs={6} >
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 16,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600
                                            }}>
                                                Payment Mode
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 16,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600
                                            }}>
                                                Total Fees
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{ marginTop: 10 }}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600
                                            }}>
                                                Cash
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{ marginTop: 10 }}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600
                                            }}>
                                                500 /-
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </center>
                            </Grid>
                        </Grid>
                        <Grid xs={12} style={{ borderTop: '1px solid lightgray' }}>
                            <center>
                                <Button className={classes.btnregister} onClick={handleRenewPlans}>Renew Subscription</Button>
                                {/* <Typography variant="h6" noWrap={true} style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal', fontSize: 14, color: '#707070', fontWeight: 400, marginTop: 15, paddingBottom: 0, marginBottom: '-10px'
                                }}>
                                    Help : In the case of any issues please mail us at info@Health97.com
                                </Typography> */}
                            </center>
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