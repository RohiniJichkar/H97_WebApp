import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Paper} from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import DoctorNavbar from './Doctor_Navbar';

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
        paddingBottom: 40

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


export default function AdminHome() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleDashboard = () => {
        navigate("/DoctorDashboard");
    };

    const handleAddClinic = () => {
        navigate("/AdminAddClinic");
    };

    const handleClinics = () => {
        navigate("/AdminClinicDetails");
    };

    const handleAppointmentsOnTV = () => {
        navigate("/Doctor_TV_TodaysAppointments");
    };

    const handleBookAppointment = () => {
        navigate("/DoctorBookAppointment");
    };

    const handleClinicPatients = () => {
        navigate("/DoctorClinicPatients");
    };

    const handleUploadReports = () => {
        navigate("/DoctorUploadReports");
    };

    const handleHomeVisitorRequest = () => {
        navigate("/DoctorHomeVisitRequest");
    };

    const handleClinicStaff = () => {
        navigate("/DoctorClinicStaff");
    };

    const handleAddMedicines = () => {
        navigate("/DoctorAddMedicine");
    };

    const handleHomeVisitor = () => {
        navigate("/DoctorHomeVisitors");
    };

    const handleFacilities = () => {
        navigate("/DoctorClinicServices");
    };

    const handleAddServices = () => {
        navigate("/DoctorAddServices");
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
                <Grid item xs={12}>
                    <Typography variant="h5" noWrap={true}
                        style={{
                            fontFamily: '"Poppins", san-serif;',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',
                            marginLeft: 10
                        }}>       
                        Home
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={2} onClick={handleDashboard} >
                    <Paper elevation={6} className={classes.paper} >
                        <center>
                            <img src="Dashboard-01.png" style={{ height: 60, width: 60 }}></img>
                            <Typography variant="h5" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#2C7FB2',
                                    marginTop: 10,
                                    fontSize: 18
                                }}>
                                Dashboard <br/><br/>
                            </Typography>
                        </center>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={2} onClick={handleAddClinic} >
                    <Paper elevation={6} className={classes.paper} >
                        <center>
                            <img src="clinicregisterations-01.png" style={{ height: 60, width: 60 }}></img>
                            <Typography variant="h5" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#2C7FB2',
                                    marginTop: 10,
                                    fontSize: 18
                                }}>
                                Clinic <br/>Registrations
                            </Typography>
                        </center>
                    </Paper>
                </Grid>
                
                <Grid item xs={12} sm={2} onClick={handleClinics} >
                    <Paper elevation={6} className={classes.paper} >
                        <center>
                            <img src="clinics-01.png" style={{ height: 60, width: 60 }}></img>
                            <Typography variant="h5" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#2C7FB2',
                                    marginTop: 10,
                                    fontSize: 18
                                }}>
                                Clinics <br/><br/>
                            </Typography>
                        </center>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={2} onClick={handleClinicPatients} >
                    <Paper elevation={6} className={classes.paper} >
                        <center>
                            <img src="activesubscription-01.png" style={{ height: 60, width: 60 }}></img>
                            <Typography variant="h5" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#2C7FB2',
                                    marginTop: 10,
                                    fontSize: 18
                                }}>
                                Active <br/> Subscriptions
                            </Typography>
                        </center>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={2} onClick={handleUploadReports}>
                    <Paper elevation={6} className={classes.paper} >
                        <center>
                            <img src="Due_expired_subscription-01.png" style={{ height: 60, width: 60 }}></img>
                            <Typography variant="h5" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#2C7FB2',
                                    marginTop: 10,
                                    fontSize: 18
                                }}>
                                Due/Expired <br/> Subscriptions
                            </Typography>
                        </center>
                    </Paper>
                </Grid>
               
                <Grid item xs={12} sm={2} onClick={handleUploadReports}>
                    <Paper elevation={6} className={classes.paper} >
                        <center>
                            <img src="ad-01.svg" style={{ height: 60, width: 60 }}></img>
                            <Typography variant="h5" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#2C7FB2',
                                    marginTop: 10,
                                    fontSize: 18
                                }}>
                                Advertisement <br/> <br/>
                            </Typography>
                        </center>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={2} onClick={handleClinicStaff} >
                    <Paper elevation={6} className={classes.paper} style={{marginTop: 20}}>
                        <center>
                            <img src="Valueaddedservices-01.png" style={{ height: 60, width: 60 }}></img>
                            <Typography variant="h5" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#2C7FB2',
                                    marginTop: 10,
                                    fontSize: 18

                                }}>
                                Value Added <br/> Services
                            </Typography>
                        </center>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={2} onClick={handleHomeVisitor}>
                    <Paper elevation={6} className={classes.paper} style={{marginTop: 20}}>
                        <center>  <img src="referdoc-01.png" style={{ height: 60, width: 60 }}></img>
                            <Typography variant="h5" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#2C7FB2',
                                    marginTop: 10,
                                    fontSize: 18

                                }}>
                                Referal <br/> Doctors
                            </Typography>
                        </center>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={2} onClick={handleAddMedicines} >
                    <Paper elevation={6} className={classes.paper} style={{marginTop: 20}}>
                        <center>
                            <img src="clinicpayments-01.png" style={{ height: 60, width: 60 }}></img>
                            <Typography variant="h5" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#2C7FB2',
                                    marginTop: 10,
                                    fontSize: 18

                                }}>
                                Clinic <br/> Payments
                            </Typography>
                        </center>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={2} onClick={handleAddServices}>
                    <Paper elevation={6} className={classes.paper} style={{marginTop: 20}}>
                        <center>
                            <img src="reports-01.png" style={{ height: 60, width: 60 }}></img>
                            <Typography variant="h5" noWrap={true}
                                style={{
                                    fontFamily: '"Poppins", san-serif;',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#2C7FB2',
                                    marginTop: 10,
                                    fontSize: 18

                                }}>
                                Reports <br/> <br/>
                            </Typography>
                        </center>
                    </Paper>
                </Grid>
                
                <Grid item xs={12} sm={2} onClick={handleFacilities}>
                    <Paper elevation={6} className={classes.paper} style={{marginTop: 20}}>
                        <center>
                            <img src="ambulanceservices-01.png" style={{ height: 60, width: 60 }}></img>
                            <Typography variant="h5" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#2C7FB2',
                                    marginTop: 10,
                                    fontSize: 18

                                }}>
                                Ambulance <br/> Services
                            </Typography>
                        </center>
                    </Paper>
                </Grid>
        
                <Grid item xs={12} sm={2} onClick={handleAppointmentsOnTV} >
                    <Paper elevation={6} className={classes.paper} style={{marginTop: 20}}>
                        <center>
                            <img src="tips-01.png" style={{ height: 60, width: 60 }}></img>
                            <Typography variant="h5" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#2C7FB2',
                                    marginTop: 10,
                                    fontSize: 18
                                }}>
                               Tips <br/><br/>
                            </Typography>
                        </center>
                    </Paper>
                </Grid>
            </Grid> {/* main grid */}

        </div >
    );
}
