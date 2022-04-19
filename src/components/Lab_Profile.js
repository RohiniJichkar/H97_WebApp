import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Avatar, Typography, Button, Grid, Paper, IconButton } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import LabNavbar from './Lab_Navbar';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import ip from '../ipaddress/ip';
import moment from 'moment';
import { Change_Password } from './Labs/Profile/Change_Password';
import Edit_Lab_Profile from './Labs/Profile/Edit_Profile';
import Edit_Lab_Logo from './Labs/Profile/Edit_Logo';


const drawerWidth = 240;

export default function LabProfile() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [labdata, setlabdata] = useState([]);
    const [openchangepassmodal, setopenchangepassmodal] = useState(false);
    const [oepneditmodal, setoepneditmodal] = useState(false);
    const [openeditlogo, setopeneditlogo] = useState(false);

    useEffect(() => {
        fetchLabDetails();
    }, [])

    const fetchLabDetails = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let labid = parsed.UserProfile.LabId;
        const labInfo = await axios.post(ip + 'Web_LabProfile', { LabId: labid });
        setlabdata(labInfo?.data?.Lab);

    }

    const handleGoBack = () => {
        navigate("/LabHome");
    };


    return (
        <div className={classes.root} style={{ backgroundColor: '#ffffff' }}>
            <LabNavbar />

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
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Profile
                    </Typography>
                </Grid>
                <Grid xs={12} style={{ marginTop: 5 }}>
                    <Paper elevation={6} className={classes.paper} style={{ marginLeft: 10, marginRight: 25, marginBottom: 10, borderRadius: 20 }}>
                        <Grid container style={{ marginTop: 10 }}>
                            <Grid item xs={12} sm={6}>
                                <center>
                                    <div>
                                        <Button onClick={() => setoepneditmodal(true)} style={{ textTransform: 'capitalize', textDecoration: "underline", float: 'left', fontSize: '14px', fontWeight: 400, color: '#2C7FB2' }}>Edit Profile</Button>
                                    </div>
                                    <Grid container>

                                        <Grid item xs={12} style={{ marginRight: 20 }}>
                                            <IconButton onClick={() => setopeneditlogo(true)} edge="start" size='small' color="inherit" aria-label="close" style={{ color: '#2C7FB2', backgroundColor: '#F0F0F0', marginLeft: '40%', }}>
                                                <EditIcon size='small' />
                                            </IconButton>
                                            <center>
                                                {labdata.Logo ? <img src={labdata.Logo} style={{ height: 230, width: 230, marginTop: -10, border: '1px solid lightgray' }} /> :
                                                    <img src="default-image.png" style={{ height: 230, width: 300, marginTop: -10 }} />
                                                }

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
                                        {labdata.LabName}
                                    </Typography>

                                    <Grid item xs={12} >
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                            }}>
                                                GST Number - {labdata.LabGstNumber}
                                            </Typography>
                                        </center>
                                    </Grid>

                                    <Grid item xs={12} >
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                fontStyle: 'normal', paddingBottom: 10
                                            }}>
                                                Registration Number - {labdata.LabRegistrationNumber}
                                            </Typography>
                                        </center>
                                    </Grid>

                                </center>
                            </Grid>

                            <Grid item xs={12} sm={6} style={{ borderLeft: '1px solid lightgray' }}>
                                <center>
                                    <div>
                                        <Button onClick={() => setopenchangepassmodal(true)} style={{ textTransform: 'capitalize', textDecoration: "underline", float: 'right', fontSize: '14px', fontWeight: 400, color: '#2C7FB2', marginRight: 10 }}>Change Password</Button>
                                        {/*   <Button
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
                                            }}>Change Password</Button> */}
                                    </div>
                                    <Grid container>

                                        <Grid item xs={12} >
                                            <center>

                                                <Typography variant="h6" noWrap={true} style={{
                                                    fontSize: 18,
                                                    fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    color: '#707070',
                                                    fontWeight: 600,

                                                }}>
                                                    {labdata.FirstName} {labdata.LastName}
                                                </Typography>

                                                <Typography variant="h6" noWrap={true} style={{
                                                    fontSize: 14,
                                                    fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    color: '#707070',
                                                    fontWeight: 600

                                                }}>
                                                    UID- {labdata.UserId}
                                                    {/* GSTIN:- {doctordata.ClinicGstNumber ? doctordata.ClinicGstNumber : 'Not Provided'} */}
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
                                                {labdata.LabEmail}
                                                {/* {Clinicdetails.ClinicEmail ? Clinicdetails.ClinicEmail : 'Not Provided'} */}
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
                                                {labdata.LabMobileNo}
                                                {/* {Clinicdetails.ClinicMobileNo ? Clinicdetails.ClinicMobileNo : 'Not Provided'} */}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} style={{ marginTop: 25 }}>
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
                                                {labdata.LabAddress ? `${labdata.LabAddress}` : 'Not Provided'} <br /> {labdata.LabCity ? `${labdata.LabCity}` : ''} {labdata.LabState ? `, ${labdata.LabState}` : ''} {labdata.LabCountry != '' ? `, ${labdata.LabCountry}` : ''} {labdata.LabPincode ? `, ${labdata.LabPincode}` : ''}
                                            </Typography>
                                        </center>
                                    </Grid>

                                    <Grid container style={{ marginTop: 35 }}>
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
                                                {labdata.LabMorningStartTime != null ? labdata.LabMorningStartTime : 'Not Provided'} - {labdata.LabMorningEndTime != null ? labdata.LabMorningEndTime : 'Not Provided'}
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
                                                {labdata.LabEveningStartTime != null ? labdata.LabEveningStartTime : 'Not Provided'} - {labdata.LabEveningEndTime != null ? labdata.LabEveningEndTime : 'Not Provided'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
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
                {openchangepassmodal ? <Change_Password show={openchangepassmodal} handlemodal={() => setopenchangepassmodal(false)} /> : null}
                {oepneditmodal ? <Edit_Lab_Profile show={oepneditmodal} data={labdata} handlemodal={() => setoepneditmodal(false)} /> : null}
                {openeditlogo ? <Edit_Lab_Logo show={openeditlogo} data={labdata} handlemodal={() => setopeneditlogo(false)} /> : null}

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