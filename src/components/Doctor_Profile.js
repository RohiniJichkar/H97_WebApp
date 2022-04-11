import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Avatar, Typography, IconButton, Button, Grid, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import DoctorNavbar from './Doctor_Navbar';
import DateRangeIcon from '@material-ui/icons/DateRange';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import axios from 'axios';
import ip from '../ipaddress/ip';
import moment from 'moment';
import { Change_Password } from './Profile/Change_Password/index';


const drawerWidth = 240;

export default function DoctorProfile() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [openChangePassDialog, setOpenChangePassDialog] = React.useState(false);
    const [doctordata, setdoctordata] = useState({});
    const [Clinicdetails, setClinicdetails] = useState([]);
    const [openchangepassmodal, setopenchangepassmodal] = useState(false);

    console.log(Clinicdetails)
    useEffect(() => {
        fetchDoctorProfile();
        fetchClinicDetails();
    }, [])

    const fetchDoctorProfile = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let userid = parsed.userid;
        const doctorInfo = await axios.post(ip + 'ShowDoctorDetailUsingId', { DoctorId: userid });
        setdoctordata(doctorInfo?.data?.Doctor);

    }

    const fetchClinicDetails = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let ClinicId = parsed.ClinicId;
        const doctorInfo = await axios.post(ip + 'ShowClinicDetailsUsingId', { ClinicId: ClinicId });
        setClinicdetails(doctorInfo?.data?.Doctor);
    }


    return (
        <div className={classes.root} style={{ backgroundColor: '#ffffff' }}>
            <DoctorNavbar />
            {openchangepassmodal ? <Change_Password show={openchangepassmodal} data={doctordata} handlemodal={() => setopenchangepassmodal(false)} /> : null}

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
                        Profile
                    </Typography>
                </Grid>
                <Grid xs={12} style={{ marginTop: 5 }}>
                    <Paper elevation={6} className={classes.paper} style={{ marginLeft: 10, marginRight: 25, marginBottom: 10, borderRadius: 20 }}>
                        <Grid container style={{ marginTop: 10 }}>
                            <Grid item xs={12} sm={6}>
                                <center>
                                    <div>
                                        <Button onClick={() => navigate("/DoctorEditProfile", {
                                            state: { details: doctordata }
                                        })} style={{ textTransform: 'capitalize', textDecoration: "underline", float: 'left', fontSize: '14px', fontWeight: 400, color: '#2C7FB2' }}>Edit Profile</Button>
                                        <Button onClick={() => setopenchangepassmodal(true)} style={{ textTransform: 'capitalize', textDecoration: "underline", float: 'right', fontSize: '14px', fontWeight: 400, color: '#2C7FB2', marginRight: 10 }}>Change Password</Button>
                                    </div>
                                    <Grid container>
                                        <Grid item xs={12} style={{ marginTop: '-20px' }}>
                                            <center>
                                                {doctordata.ProfileImage ?
                                                    <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} src={doctordata.ProfileImage} /> :
                                                    <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} />}
                                            </center>
                                        </Grid>
                                    </Grid>
                                    <div style={{ paddingBottom: 20 }}>
                                    </div>

                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Dr. {doctordata.FirstName} {doctordata.LastName}
                                    </Typography>

                                    <Grid item xs={12} >
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                            }}>
                                                DID - {doctordata.DoctorId}
                                            </Typography>
                                        </center>
                                    </Grid>

                                    <Grid container style={{ marginTop: 10, borderTop: '1px solid lightgray' }}>
                                        <Grid item xs={6} style={{ borderRight: '1px solid lightgray', }}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 16, color: '#707070', fontFamily: 'Poppins',
                                                fontStyle: 'normal', fontWeight: 600,
                                                marginTop: 10,
                                            }}>
                                                Category
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 16, color: '#707070', fontFamily: 'Poppins',
                                                fontStyle: 'normal', fontWeight: 600, marginTop: 10
                                            }}>
                                                Education
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{ borderRight: '1px solid lightgray', }}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                fontStyle: 'normal', fontWeight: 400, marginTop: 5
                                            }}>
                                                {doctordata.Category}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                fontStyle: 'normal', fontWeight: 400, marginTop: 5
                                            }}>
                                                {doctordata.Education}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={6} style={{ borderRight: '1px solid lightgray', }}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 16, color: '#707070', fontFamily: 'Poppins',
                                                fontStyle: 'normal', fontWeight: 600, marginTop: 15,
                                            }}>
                                                Email
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 16, color: '#707070', fontFamily: 'Poppins',
                                                fontStyle: 'normal', fontWeight: 600, marginTop: 15
                                            }}>
                                                Date Of Birth
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{ borderRight: '1px solid lightgray', }}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                fontStyle: 'normal', fontWeight: 400, marginTop: 5
                                            }}>
                                                {doctordata.Email ? doctordata.Email : 'Not Provided'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                fontStyle: 'normal', fontWeight: 400, marginTop: 5
                                            }}>
                                                {doctordata.DOB ? moment(doctordata.DOB).format("DD/MM/YYYY")  : 'Not Provided'}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={6} style={{ borderRight: '1px solid lightgray', }}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 16, color: '#707070', fontFamily: 'Poppins',
                                                fontStyle: 'normal', fontWeight: 600, marginTop: 15,
                                            }}>
                                                Mobile No
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 16, color: '#707070', fontFamily: 'Poppins',
                                                fontStyle: 'normal', fontWeight: 600, marginTop: 15,
                                            }}>
                                                Experience
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{ borderRight: '1px solid lightgray', }}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                fontStyle: 'normal', fontWeight: 400, marginTop: 5, paddingBottom: 5
                                            }}>
                                                {doctordata.MobileNo}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                fontStyle: 'normal', fontWeight: 400, marginTop: 5, paddingBottom: 5
                                            }}>
                                                {doctordata.Experience ? doctordata.Experience : 'Not Provided'} years
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </center>
                            </Grid>

                            <Grid item xs={12} sm={6} style={{ borderLeft: '1px solid lightgray' }}>
                                <center>
                                    <div>
                                        <Button
                                            onClick={() => navigate("/DoctorEditClinicDetails", {
                                                state: { details: Clinicdetails }
                                            })}
                                            style={{
                                                fontSize: 14,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                textTransform: 'capitalize',
                                                textDecoration: 'underline',
                                                color: '#2C7FB2',
                                                float: 'right'
                                            }}>Edit Clinic Details</Button>
                                    </div>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            {Clinicdetails.Logo ? <img src={Clinicdetails.Logo} style={{ height: '130px', width: '240px' }} /> : <img src="default-image.png" style={{ height: '130px', width: '240px' }} />}
                                        </Grid>
                                        <Grid item xs={6} >
                                            <center>
                                                <LocalHospitalIcon style={{ fontSize: 40, color: '#2C7FB2',  marginTop: 10 }} />
                                                <Typography variant="h6" noWrap={true} style={{
                                                    fontSize: 18,
                                                    fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    color: '#707070',
                                                    fontWeight: 600,                                                  

                                                }}>
                                                    {doctordata.ClinicName}
                                                </Typography>
                                                <Typography variant="h6" noWrap={true} style={{
                                                    fontSize: 14,
                                                    fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    color: '#707070',
                                                    fontWeight: 600

                                                }}>
                                                    REGNO:- {doctordata.ClinicRegistrationNumber ? doctordata.ClinicRegistrationNumber : 'Not Provided'}
                                                </Typography>
                                                <Typography variant="h6" noWrap={true} style={{
                                                    fontSize: 14,
                                                    fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    color: '#707070',
                                                    fontWeight: 600

                                                }}>
                                                    GSTIN:- {doctordata.ClinicGstNumber ? doctordata.ClinicGstNumber : 'Not Provided'}
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
                                                {Clinicdetails.ClinicEmail ? Clinicdetails.ClinicEmail : 'Not Provided'}
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
                                                {Clinicdetails.ClinicMobileNo ? Clinicdetails.ClinicMobileNo : 'Not Provided'}
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
                                                {doctordata.ClinicAddress ? `${doctordata.ClinicAddress}`  : 'Not Provided'} <br /> {doctordata.ClinicCity ? `${doctordata.ClinicCity}` : ''} {doctordata.ClinicState ? `, ${doctordata.ClinicState}` : ''} {doctordata.ClinicCountry != '' ?  `, ${doctordata.ClinicCountry}`: ''} {doctordata.ClinicPincode ? `, ${doctordata.ClinicPincode}` : ''}
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
                                                Morning Shift
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
                                                Evening Shift
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
                                                {doctordata.MorningStartTime != null ? doctordata.MorningStartTime : 'Not Provided'} - {doctordata.MorningEndTime != null ? doctordata.MorningEndTime : 'Not Provided'}
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
                                                {doctordata.EveningStartTime != null ? doctordata.EveningStartTime : 'Not Provided'} - {doctordata.EveningEndTime != null ? doctordata.EveningEndTime : 'Not Provided'}
                                            </Typography>
                                        </Grid>
                                    </Grid>


                                    {/* <Grid item xs={12} style={{ paddingTop: 10 }}>
                                        <center>
                                            <Button variant="contained" onClick={handleClickOpen} className={classes.changepass}  >
                                                Change Password
                                            </Button>
                                            <Dialog
                                                open={openChangePassDialog}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">{"Do you want to Change Password?"}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        <center>
                                                            <TextField className={classes.inputFields} id="outlined-basic" label="Current Password" variant="outlined" size="small" />
                                                            <TextField className={classes.inputFields} id="outlined-basic" label="New Password" variant="outlined" size="small" />
                                                            <TextField className={classes.inputFields} id="outlined-basic" label="Confirm Password" variant="outlined" size="small" />
                                                        </center>
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button className={classes.btnCancle} onClick={handleClose}>
                                                        Cancle
                                                    </Button>
                                                    <Button className={classes.btnSubmit} onClick={handleClose} autoFocus>
                                                        Submit
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </center>
                                    </Grid> */}
                                </center>
                            </Grid>
                        </Grid>
                        <Grid xs={12} style={{ borderTop: '1px solid lightgray' }}>
                            <center>
                                <Typography variant="h6" noWrap={true} style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal', fontSize: 14, color: '#707070', fontWeight: 400, marginTop: 15, paddingBottom: 0, marginBottom: '-10px'
                                }}>
                                    Help : In the case of any issues please mail us at info@Health97.com
                                </Typography>
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
    changepass: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 160,
        marginTop: 30,
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
    inputFields: {
        // [`& fieldset`]: {
        //     borderRadius: 25,
        // },
        width: 300,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 200,
        marginTop: 15
    },
    btnSubmit: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
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
    },
}));