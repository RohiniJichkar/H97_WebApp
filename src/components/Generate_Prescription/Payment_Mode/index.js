import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogContentText, Typography, Grid, TextField, Button, InputLabel, Radio } from "@material-ui/core";
import { transparent } from 'material-ui/styles/colors';
import { generatePrescription, UpdateAppointmentDetails, paymentDetails } from '../../../Apis/PatientInQueue/Generate_Prescription/Medicines_Table/index';
import { useDispatch, connect, useSelector } from 'react-redux';

const drawerWidth = 240;

const PaymentMode = ({ show, data, handlemodal }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [maxWidth, setMaxWidth] = useState('sm');
    const [fullWidth, setFullWidth] = React.useState(true);
    const [title, settitle] = React.useState('');
    const [description, setdescription] = React.useState('');
    const [paymentmode, setpaymentmode] = React.useState('');
    const [fees, setfees] = React.useState('');

    const dispatch = useDispatch();

    const Edit_Appointment = async () => {
        const obj = {
            AppointmentStatus: 'Completed',
            id: data[0].id
        }
        const editAppointment = await UpdateAppointmentDetails(obj);
    }


    const handleGeneratePDF = async () => {
        const obj = {
            UserId: data[0].UserId,
            id: data[0].id,
        }
        const request = await generatePrescription(obj);
        if (request.success === "200") {
            dispatch({ type: 'RESET_MEDICINE_ITEM' });
        }

    }


    const handlePaymentDetails = async () => {
        var sessiondata = localStorage.getItem("userdata");
        let parsed = JSON.parse(sessiondata);
        let clinicid = parsed.ClinicId;
        let doctorid = parsed.userid;
        const obj = {
            ClinicId: clinicid,
            DoctorId: doctorid,
            PatientId: data[0].UserId,
            AppointmentId: data[0].id,
            PaymentAmount: fees,
            PaymentMode: paymentmode,
        }
        const request = await paymentDetails(obj);
        if (request.success === "200") {
            alert(request.message);
            dispatch({ type: 'RESET_MEDICINE_ITEM' });
        }
    }


    const handleFunctions = () => {
        Edit_Appointment().then(data => {
            handleGeneratePDF().then(data => {
                handlePaymentDetails();
                navigate('/DoctorDashboard')
            })

        })
    }



    return (
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={show}
                aria-labelledby="max-width-dialog-title"
            >

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container>
                            <Grid item xs={12} sm={4} style={{ border: '1px solid lightgray', borderLeft: '0px', borderTop: '0px' }}>
                                <center>
                                    <img src={data[0].ProfileImage} style={{ borderRadius: 200, height: 100, width: 100, marginTop: 20 }}></img>
                                </center>
                            </Grid>
                            <Grid container item xs={12} sm={8} style={{ border: '1px solid lightgray', borderLeft: '0px', borderTop: '0px', borderRight: 0 }}>
                                <Grid item xs={12} style={{ borderBottom: '1px solid lightgray' }}>
                                    <center>
                                        <Typography variant="h6" noWrap={true} style={{
                                            fontSize: 20,
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            color: '#707070',
                                            fontWeight: 600
                                        }}>
                                            {data[0].FirstName} {data[0].LastName}
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{
                                            fontSize: 16,
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            color: '#707070',
                                            marginTop: 10,
                                            marginBottom: 10,
                                        }}>
                                            PID- {data[0].UserId}
                                        </Typography>
                                    </center>
                                </Grid>
                                <Grid item xs={12} container >
                                    <Grid item xs={12} sm={6}>
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 18,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                borderRight: '1px solid lightgray',
                                                paddingTop: 10,
                                                paddingBottom: 10,
                                            }}>
                                                Mobile No
                                            </Typography>
                                        </center>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 18,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                borderRight: '0px',
                                                paddingTop: 10,
                                                paddingBottom: 10,
                                            }}>
                                                Date
                                            </Typography>
                                        </center>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 16,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600,
                                                borderRight: '1px solid lightgray',
                                                paddingBottom: 10,


                                            }}>
                                                {data[0].MobileNo}
                                            </Typography>
                                        </center>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 16,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600,
                                                borderRight: '0px',
                                                paddingBottom: 10,


                                            }}>
                                                {data[0].AppointmentDate}
                                            </Typography>
                                        </center>
                                    </Grid>
                                </Grid>
                            </Grid>


                            <Grid item xs={12}>
                                <center>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600,
                                        paddingTop: 10,
                                        paddingBottom: 10,

                                    }}>
                                        Title
                                    </Typography>
                                </center>
                                <center>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600,
                                        borderBottom: '1px solid lightgray',
                                        paddingBottom: 10,
                                    }}>
                                        {data[0].Title}
                                    </Typography>
                                </center>
                            </Grid>


                            <Grid item xs={12} container >
                                <Grid item xs={12} sm={6}>
                                    <center>
                                        <Typography variant="h6" noWrap={true} style={{
                                            fontSize: 18,
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            color: '#707070',
                                            borderRight: '1px solid lightgray',
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                        }}>
                                            Payment Mode
                                        </Typography>
                                    </center>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <center>
                                        <Typography variant="h6" noWrap={true} style={{
                                            fontSize: 18,
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            color: '#707070',
                                            borderRight: '0px',
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                        }}>
                                            Total Fee
                                        </Typography>
                                    </center>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <center>
                                        <Grid item xs={12} container style={{ borderRight: '1px solid lightgray' }}>
                                            <Grid item xs={6}>
                                                <InputLabel htmlFor="outlined-age-native-simple" >
                                                    <Radio
                                                        checked={paymentmode === 'Cash'}
                                                        color='primary'
                                                        onChange={(e) => setpaymentmode(e.target.value)}
                                                        value="Cash"
                                                        name="radio-button-demo"
                                                        inputProps={{ 'aria-label': 'Cash' }}

                                                    />Cash</InputLabel>
                                            </Grid>
                                            <Grid item xs={6}>

                                                <InputLabel htmlFor="outlined-age-native-simple">
                                                    <Radio
                                                        checked={paymentmode === 'Online'}
                                                        color='primary'
                                                        onChange={(e) => setpaymentmode(e.target.value)}
                                                        value="Online"
                                                        name="radio-button-demo"
                                                        inputProps={{ 'aria-label': 'Online' }}

                                                    />Online</InputLabel>
                                            </Grid>
                                        </Grid>
                                    </center>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <center>
                                        <TextField className={classes.inputFields} type='number' onChange={(e) => setfees(e.target.value)} id="outlined-basic" size="small" label="Fees" variant="outlined" />
                                    </center>
                                </Grid>
                            </Grid>


                            <Grid container xs={12} style={{ marginTop: 5 }}>
                                <Grid item sm={6} >
                                    <Button className={classes.btnregister} onClick={handlemodal} style={{ float: 'right', marginRight: 20 }}>Cancel</Button>
                                </Grid>
                                <Grid item sm={6} >
                                    <Button className={classes.btnregister} onClick={handleFunctions} style={{ float: 'left', marginLeft: 20 }}>Finish</Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </DialogContentText>
                </DialogContent>
            </Dialog>

        </>
    );
};



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        backgroundColor: 'white',
    },
    appBar: {
        position: 'relative',
        backgroundColor: transparent
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    inputFields: {
        width: 180,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 200,
        marginBottom: 20
    },
    btnregister: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        marginTop: 10,
        fontSize: 12,
        position: 'relative'
    },
}));


export default connect()(PaymentMode);
