import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Grid, Paper, Avatar } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import DoctorNavbar from './Staff_Navbar';
import axios from 'axios';
import ip from '../../ipaddress/ip';
import { PatientInQueue, BookedAppointments, SendIn } from '../../Apis/PatientInQueue/Staff_Apis/index';
import { PatientInueue_List } from './components/Dasboard_Component/Staff/PatientInQueue';
import { BookedAppointment_List } from './components/Dasboard_Component/Staff/BookedAppointment';
import Skeleton from '@material-ui/lab/Skeleton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const drawerWidth = 240;

export default function Staff_Dashboard() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [todaysregistration, settodaysregistration] = useState([]);
    const [appointments, setappointments] = useState('');
    const [patientInQueue, setPatientInQueue] = useState([]);
    const [bookedAppointments, setbookedAppointments] = useState([]);
    const [sendIn, setsendIn] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchPatientInQueue();
            fetchBookedAppointments();
            fetchRegistrationData();
            fetchDailyAppointments();
        }, 10000);
        fetchPatientInQueue();
        fetchBookedAppointments();
        fetchRegistrationData();
        fetchDailyAppointments();
        return () => clearInterval(interval);
    }, [])

    const fetchRegistrationData = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        try {
            const todayregistrationInfo = await axios.post(ip + 'Web_NewRegistrationReport', { ClinicId: clinicid })
            settodaysregistration(todayregistrationInfo?.data);
            // window.location.reload(10000);
            setInterval(settodaysregistration(todayregistrationInfo?.data), 1)
        }
        catch (e) {
            console.log(e);
        }
    }

    const fetchDailyAppointments = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        try {
            const appInfo = await axios.post(ip + 'Web_Staff_AppointmentReport', { ClinicId: clinicid })
            setappointments(appInfo?.data);
        }
        catch (e) {
            console.log(e);
        }

    }

    const fetchPatientInQueue = async () => {
        try {
            const data = await PatientInQueue();
            setPatientInQueue(data);
        }
        catch (error) {
            console.log(error)
        }
    }

    const fetchBookedAppointments = async () => {
        try {
            const data = await BookedAppointments();
            setbookedAppointments(data);
        } catch (error) {
            console.log(error)
        }
    }


    const handleRegisterClick = () => {
        navigate("/Staff_ClinicPatients");
    };

    const handleBookAppointmentClick = () => {
        navigate("/Staff_Book_Appointment");
    };

    const handleTodaysAppointmentClick = () => {
        navigate("/Staff_Todays_Appointment");
    };

    const handleMonthlyAppointmentClick = () => {
        navigate("/Staff_Monthly_Appointment");
    };

    const handleGoBack = () => {
        navigate("/Staff_Home");
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
                alignItems="center"
                justify="center"
            >

                {/* Reports Grid Start */}
                <Grid item className={classes.griditem} xs={12} sm={3} style={{ borderRight: '1px solid gray' }}>
                    <Paper className={classes.paper} elevation={0} >
                        <div className="row" style={{ padding: theme.spacing(0), color: '#78B088' }}>
                            <Typography variant="h7" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#78B088',
                                    fontSize: 16
                                }}
                            >
                                <Button style={{ marginLeft: '-30px', backgroundColor: 'white', color: '#2C7FB2', borderRadius: 105, fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                                TODAY'S APPOINTMENTS
                            </Typography>
                        </div>
                        <div className="row" style={{ padding: theme.spacing(0), color: '#00318B' }}>
                            {
                                <Typography variant="h5" noWrap={true} style={{marginLeft: 35}}>
                                    {(appointments.DailyAppointment !== null || appointments.DailyAppointment != 0) ? appointments.DailyAppointment : 0}
                                </Typography>
                            }
                        </div>
                    </Paper>
                </Grid>
                <Grid item className={classes.griditem} xs={12} sm={3} style={{ borderRight: '1px solid gray' }}>
                    <Paper className={classes.paper} elevation={0} >
                        <div className="row" style={{ padding: theme.spacing(0), color: '#78B088' }}>
                            <Typography variant="h7" noWrap={true}
                                style={{
                                    fontFamily: '"Poppins", san-serif;',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#78B088',
                                    fontSize: 16
                                }}>
                                PATIENT IN QUEUE
                            </Typography>
                        </div>
                        <div className="row" style={{ padding: theme.spacing(0), color: '#00318B' }}>
                            <Typography variant="h5" noWrap={true}>
                                {(appointments.PatientInQueueAppointments !== null || appointments.PatientInQueueAppointments != 0) ? (appointments.PatientInQueueAppointments) : (0)}
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
                <Grid item className={classes.griditem} xs={12} sm={3} style={{ borderRight: '1px solid gray' }}>
                    <Paper className={classes.paper} elevation={0} style={{}}>
                        <div className="row" style={{ padding: theme.spacing(0), color: '#78B088', }}>
                            <Typography variant="h7" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#78B088',
                                    fontSize: 16
                                }}
                            >
                                TODAY'S REGISTRATION
                            </Typography>
                        </div>
                        <div className="row" style={{ padding: theme.spacing(0), color: '#00318B' }}>
                            <Typography variant="h5" noWrap={true}>
                                {todaysregistration.DailyRecord ? todaysregistration.DailyRecord[0].DailyReport : 0}
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
                <Grid item className={classes.griditem} xs={12} sm={3} >
                    <Paper className={classes.paper} elevation={0} >
                        <div className="row" style={{ padding: theme.spacing(0), color: '#78B088' }}>
                            <Typography variant="h7" noWrap={true}
                                style={{
                                    fontFamily: '"Poppins", san-serif;',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#78B088',
                                    fontSize: 16

                                }}>
                                MONTHLY COMPLETED APPOINTMENTS
                            </Typography>
                        </div>
                        <div className="row" style={{ padding: theme.spacing(0), color: '#00318B' }}>
                            <Typography variant="h5" noWrap={true}>
                                {(appointments.MonthlyAppintments !== null || appointments.MonthlyAppintments != 0) ? (appointments.MonthlyAppintments) : (0)}
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
                {/* Reports grid end */}


                <Grid item xs={12} sm={3} onClick={handleRegisterClick} style={{ cursor: 'pointer' }}>
                    {/* <Button className={classes.btn} size="small" style={{ fontSize: 20 }}>Register Patients</Button> */}

                    <Paper className={classes.paperServices} elevation={4} style={{ borderRadius: '25px' }}>
                        <Typography variant="h7" noWrap={true} style={{ color: '#2C7FB2', fontSize: 15 }}>
                            REGISTER PATIENTS
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3} onClick={handleBookAppointmentClick} style={{ cursor: 'pointer' }}>
                    <Paper className={classes.paperServices} elevation={4} style={{ borderRadius: '25px' }} >
                        <Typography variant="h7" noWrap={true} style={{ color: '#2C7FB2', fontSize: 15 }}>
                            BOOK APPOINTMENT
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3} onClick={handleTodaysAppointmentClick} style={{ cursor: 'pointer' }}>
                    <Paper className={classes.paperServices} elevation={4} style={{ borderRadius: '25px' }}>
                        <Typography variant="h7" noWrap={true} style={{ color: '#2C7FB2', fontSize: 15 }}>
                            TODAY'S APPOINTMENTS
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3} onClick={handleMonthlyAppointmentClick} style={{ cursor: 'pointer' }}>
                    <Paper className={classes.paperServices} elevation={4} style={{ borderRadius: '25px' }}>
                        <Typography variant="h7" noWrap={true} style={{ color: '#2C7FB2', fontSize: 15 }}>
                            MONTHLY APPOINTMENTS
                        </Typography>
                    </Paper>
                </Grid>
                {/* service grid end */}


                {/* Booked Appointments queue grid start */}
                <Grid container direction="row" >
                    <Grid item xs={12}>
                        <Paper elevation={0}>
                            <div className="row" >
                                <Typography variant="h5" noWrap={true}
                                    style={{
                                        fontFamily: '"Poppins", san-serif;',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        color: '#78B088',
                                        fontSize: 19,

                                    }}>
                                    Booked Appointments
                                </Typography>
                            </div>
                        </Paper>
                    </Grid>

                    <Container style={{ paddingBottom: 20, }}>
                        <Grid container spacing={2} direction="row" wrap="nowrap" style={{ overflowX: 'scroll' }}>
                            {bookedAppointments ? <BookedAppointment_List data={bookedAppointments} /> :
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
                </Grid>

                {/* Patient In queue grid start */}
                <Grid container direction="row" >
                    <Grid item xs={12}>
                        <Paper elevation={0}>
                            <div className="row" >
                                <Typography variant="h5" noWrap={true}
                                    style={{
                                        fontFamily: '"Poppins", san-serif;',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        color: '#78B088',
                                        fontSize: 19,
                                    }}>
                                    Patient In Queue
                                </Typography>
                            </div>
                        </Paper>
                    </Grid>

                    <Container style={{ paddingBottom: 50, }}>
                        <Grid container spacing={2} direction="row" wrap="nowrap" style={{ overflowX: 'scroll' }}>
                            {patientInQueue ? <PatientInueue_List data={patientInQueue} /> :
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

                </Grid>
            </Grid> {/* main grid */}

        </div>
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
        padding: theme.spacing(1),
        color: '#78B088',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 800,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    grid: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginTop: 70,
        marginLeft: 30,
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
    paperServices: {
        padding: theme.spacing(1),
        color: '#00318B',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 800,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        textAlign: 'center',

    },
    gridServices: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 800,
        textAlign: 'center',

    },
    btn: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 600,
        textAlign: 'center',

        fontSize: '10px'
    },
}));



