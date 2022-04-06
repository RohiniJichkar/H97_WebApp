import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Avatar, TextField, Typography, Button, Grid, Paper } from "@material-ui/core";
import DoctorNavbar from './Doctor_Navbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { UpdateAppointmentDetails } from '../Apis/PatientInQueue/Generate_Prescription/Medicines_Table/index';


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
    btnGeneratePdf: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
        marginTop: 35,
        fontSize: '12px'
    },
    btnUpload: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
        marginTop: 35,
        fontSize: '12px'

    },
    textField: {
        // [`& fieldset`]: {
        //     borderRadius: 25,
        // },

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
        color: '#707070',
        border: '1px solid #F0F0F0',
    }


}));


export default function DoctorTreatPatient() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [details, setdetails] = useState([]);
    const [prescriptionnote, setprescriptionnote] = useState('');
    const [followupDate, setfollowupDate] = useState('');
    const [costcode, setcostcode] = useState('');

    useEffect(() => {
        setdetails(location.state.detail);
    }, [])

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleGeneratePdf = () => {
        navigate('/DoctorGeneratePrescription', {
            state: { detail: location.state.detail }
        })
    };

    const Edit_Appointment = async () => {
        const obj = {
            PrescriptionNote: prescriptionnote,
            FollowupDate: followupDate,
            CostCode: costcode,
            id: details.id
        }
        const editAppointment = await UpdateAppointmentDetails(obj);
    }

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
                            fontWeight: 600,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',

                        }}>
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', borderRadius: 105, fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Treat
                    </Typography>
                </Grid>
                <Grid item xs={12} container style={{ marginTop: 10 }}>

                    <Grid item xs={12} sm={4} >
                        <Paper className={classes.paper} elevation={6} style={{ marginRight: 20 }} >
                            <center>
                                <div style={{ paddingBottom: 20 }}>
                                    {details.ProfileImage ? <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} src={details.ProfileImage} /> : details.Gender == 'Female' ? <Avatar style={{ borderRadius: 50, height: 100, width: 100, }} src='femaleicon.png' /> :
                                        <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} src='maleicon.png' />}
                                    {/* {details.ProfileImage ?
                                        <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} src={details.ProfileImage} /> :
                                        <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} />} */}
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
                                            {details.MobileNo}
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
                        <Paper className={classes.paper} elevation={6} style={{ marginRight: 20, marginLeft: 25 }}>
                            <Typography variant="h6" noWrap={true} style={{ fontSize: 17, color: '#2C7FB2', marginBottom: 15, textDecoration: 'underline', fontWeight: 600, textUnderlineOffset: '1px' }}>
                                Follow Up
                                <a href="/DoctorReports" style={{ float: 'right', color: '#2C7FB2', fontSize: '12px', textUnderlineOffset: '1px' }}>
                                    Upload Prescription
                                </a>
                            </Typography>

                            <Grid container xs={12} >

                                <Grid item xs={12}>
                                    <TextField multiline
                                        rows={8}
                                        rowsMax={8} id="outlined-basic" onChange={(e) => setprescriptionnote(e.target.value)} label="Diagnosis/Prescription" variant="outlined"
                                        style={{ width: 750, height: 200 }}
                                    />
                                </Grid>

                            </Grid>
                            {/* <Grid item xs={12} sm={6} >
                                    <TextField className={classes.textField} onChange={(e) => setcostcode(e.target.value)} id="outlined-basic" label="Cost Code" type='number' size="small" variant="outlined" style={{ float: 'right' }} />
                                </Grid> */}
                            <Grid container style={{ marginTop: 15 }}>
                                <Grid item xs={2} >
                                    <Typography style={{ fontSize: 17, color: '#2C7FB2', textDecoration: 'underline', fontWeight: 600, textUnderlineOffset: '1px' }} >Followup Date</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className={classes.textField} onChange={(e) => setfollowupDate(e.target.value)}
                                        id="outlined-basic" type="date" size="small" variant="outlined"
                                        style={{}} />
                                </Grid>
                            </Grid>



                            <Grid container>
                                <Grid item xs={12} >
                                    <center>
                                        <Button variant="contained" className={classes.btnUpload} onClick={handleGoBack} style={{ marginRight: 40 }}  >
                                            Cancel
                                        </Button>
                                        <Button variant="contained" onClick={() => { handleGeneratePdf(); Edit_Appointment(); }} className={classes.btnGeneratePdf}  >
                                            Continue
                                        </Button>
                                    </center>
                                </Grid>
                            </Grid>

                        </Paper>
                    </Grid>

                </Grid>

            </Grid> {/* main grid */}

        </div >
    );
}
