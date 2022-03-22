import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { TextField, Typography, Button, Avatar, Grid, Paper, Link } from "@material-ui/core";
import DoctorNavbar from './Staff_Navbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { UpdateAppointmentDetails } from '../../Apis/PatientInQueue/Generate_Prescription/Medicines_Table/index';
import Cancel_Appointment from './components/SendIn_Patient_details/Cancel_Appointment/index';
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
        fontFamily: '"Poppins", san-serif;',
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
    btnTreat: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
        marginTop: 30,
        fontSize: '12px'

    },
    textField: {
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 11,
        textAlign: 'center',
        width: '80%',
        height: 30,
    },
    reason: {
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        height: 50,
        color: 'gray',
        border: '1px solid #F0F0F0',
    },
    btnCancle: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
        marginTop: 30,
        fontSize: '12px'
    },


}));


export default function Staff_Patient_Details_SendIn() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);
    const [details, setdetails] = useState([location.state.details]);
    const obj = JSON.stringify(details);

    useEffect(() => {
        setdetails(location.state.details);
    }, []);


    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleTreat = () => {
        navigate('/DoctorTreatPatient', {
            state: { detail: location.state.details }
        })
    };

    const handleGoBack = () => {
        navigate(-1);
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
                            fontFamily: '"Poppins", san-serif;',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',

                        }}>
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', borderRadius: 105, fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Patient Details
                    </Typography>
                </Grid>
                <Grid item xs={12} container style={{ marginTop: 10 }}>

                    <Grid item xs={12} sm={4} >
                        <Paper className={classes.paper} elevation={6} style={{ marginRight: 20 }} >
                            <center>
                                <div style={{ paddingBottom: 20 }}>
                                    {details.ProfileImage ?
                                        <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} src={details.ProfileImage} /> :
                                        <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} />}
                                </div>

                                <Typography variant="h6" noWrap={true} style={{
                                    fontSize: 16,
                                    fontFamily: '"Poppins", san-serif;',
                                    fontStyle: 'normal',
                                    color: '#707070',
                                    fontWeight: 600
                                }}>
                                    {details.FirstName} {details.LastName}
                                </Typography>

                                <Grid container xs={12} style={{ paddingTop: 20 }}>
                                    <Grid item xs={6} style={{ borderRight: '1px solid #F0F0F0' }}>
                                        <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontWeight: 600 }}>
                                            Status
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070' }}>
                                            {details.AppointmentStatus}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontWeight: 600 }}>
                                            Channel
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070' }}>
                                            {details.AppointmentChannel}
                                        </Typography>
                                    </Grid>
                                </Grid>


                                <Grid container xs={12} style={{ paddingTop: 30 }}>
                                    <Grid item sm={6} >
                                        <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', marginBottom: 15, fontWeight: 600 }}>
                                            Age :
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', marginBottom: 15, fontWeight: 600 }}>
                                            Contact :
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', marginBottom: 15, fontWeight: 600 }}>
                                            Email Id :
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={6} >
                                        <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', marginBottom: 15 }}>
                                            {details.Age ? details.Age : 'NA'}
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', marginBottom: 15 }}>
                                            {details.MobileNo ? details.MobileNo : 'NA'}
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', marginBottom: 15 }}>
                                            {details.Email ? details.Email : 'NA'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </center>
                        </Paper>

                    </Grid>

                    <Grid xs={12} sm={8}>
                        <Paper className={classes.paper} elevation={6} style={{ marginRight: 50, marginLeft: 40 }}>
                            <Typography variant="h6" noWrap={true} style={{ fontSize: 17, fontWeight: '600', color: '#2C7FB2', marginBottom: 15, textDecoration: 'underline', textUnderlineOffset: '1px' }}>
                                Details
                                {/* <Button onClick={() => navigate('/DoctorPatientMedicalHistory', {
                                    state: { Details: details }
                                })}
                                    style={{ float: 'right', color: 'white', fontSize: '11px', fontWeight: 600, fontFamily: 'Poppins', backgroundColor: '#2C7FB2' }}  >
                                    Previous Medical History
                                </Button> */}
                            </Typography>

                            <Grid container>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 15, color: '#707070', fontWeight: 600 }}>
                                        Appointment Date :
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 15, color: '#707070', fontWeight: '400' }}>
                                        {details.AppointmentDate}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 15, color: '#707070', fontWeight: 600 }}>
                                        Appointment Time:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 15, color: '#707070', fontWeight: 400 }}>
                                        {details.AppointmentTime}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container style={{ marginTop: '10px' }}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 15, color: '#707070', fontWeight: 600 }}>
                                        Appointment Reason :
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 15, color: '#707070', fontWeight: 600 }}>
                                        Note For Doctor:
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container style={{ marginTop: '10px' }}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 15, color: '#707070', fontWeight: '400' }}>
                                        {details.AppointmentReason ? details.AppointmentReason : 'NA'}
                                    </Typography>
                                    {/* <TextField className={classes.textField} value={appointmentreason} onChange={(e)=> setappointmentreason(e.target.value)} id="outlined-basic" size="small" variant="outlined" label='Reason' /> */}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 15, color: '#707070', fontWeight: '400' }}>
                                        {details.ShortNote ? details.ShortNote : 'NA'}
                                    </Typography>
                                    {/* <TextField className={classes.textField} value={noteforDoctor} onChange={(e) => setnoteforDoctor(e.target.value)} id="outlined-basic" size="small" variant="outlined" label='Note For Doctor' /> */}
                                </Grid>
                            </Grid>

                            {/* <p className={classes.reason}>Regular Checkup</p> */}

                            <Typography variant="h6" noWrap={true} style={{ fontSize: 16, marginBottom: 15, color: '#2C7FB2', marginTop: 30, fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '1px' }}>
                                Vitals
                            </Typography>

                            <Grid container xs={12} style={{ color: '#707070', marginTop: 20 }}>
                                <Grid item xs={12} sm={2}>
                                    Blood Pressure:
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 15, color: '#707070', fontWeight: '400' }}>
                                        {details.Patient_BP ? details.Patient_BP : 'NA'} mmHg
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    Pulse Rate:
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 15, color: '#707070', fontWeight: '400' }}>
                                        {details.Patient_Plus ? details.Patient_Plus : 'NA'} bpm
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    SpO2:
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 15, color: '#707070', fontWeight: '400' }}>
                                        {details.Patient_SPO2 ? details.Patient_SPO2 : 'NA'} %
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container xs={12} style={{ marginTop: 30, color: '#707070' }}>
                                <Grid item xs={12} sm={2}>
                                    Temperature:
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 15, color: '#707070', fontWeight: '400' }}>
                                        {details.Patient_Temp ? details.Patient_Temp : 'NA'} c
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    Weight:
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 15, color: '#707070', fontWeight: '400' }}>
                                        {details.Patient_Weight ? details.Patient_Weight : 'NA'} kg
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    Height:
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 15, color: '#707070', fontWeight: '400' }}>
                                        {details.Patient_Height ? details.Patient_Height : 'NA'} cm
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container xs={12} style={{ color: '#707070',height:65 }}>
                                <Grid item xs={12} >
                                    {/* <center>
                                        <Button variant="contained" onClick={handleGoBack} className={classes.btnCancle} style={{ marginRight: 40 }}  >
                                            Cancel
                                        </Button>
                                        <Button variant="contained" onClick={() => handleTreat()} className={classes.btnTreat}  >
                                            Treat
                                        </Button>
                                    </center> */}
                                </Grid>
                            </Grid>

                        </Paper>
                    </Grid>
                    {deleteModal ? <Cancel_Appointment show={deleteModal} data={details} handleclose={()=>setDeleteModal(false)} /> : null}
                </Grid>

            </Grid > {/* main grid */}

        </div >
    );
}
