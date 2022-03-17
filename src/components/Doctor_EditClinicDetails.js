import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
// import { useLocation, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Container, FormControlLabel, Select, InputLabel, FormControl, TextField, Typography, Button, Grid, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import DoctorNavbar from './Doctor_Navbar';
import CreateIcon from '@material-ui/icons/Create';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import ip from '../ipaddress/ip';
import { EditClinicdata } from '../Apis/Clinic_Details/index';
import { Times, Doctor_Category } from '../Apis/Home_Visitors/index';
import ClinicDetails from '../Apis/Clinicdetails/index';

const drawerWidth = 240;


export default function DoctorEditClinicDetails() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const Location = useLocation()
    const [doctordata, setdoctordata] = React.useState([Location.state.details]);

    //State
    const [ClinicName, setClinicName] = useState(doctordata[0].ClinicName);
    const [ClinicMobileNo, setClinicMobileNo] = useState(doctordata[0].ClinicMobileNo);
    const [ClinicEmail, setClinicEmail] = useState(doctordata[0].ClinicEmail);
    const [ClinicRegistrationNumber, setClinicRegistrationNumber] = useState(doctordata[0].ClinicRegistrationNumber);
    const [ClinicGstNumber, setClinicGstNumber] = useState(doctordata[0].ClinicGstNumber);
    const [ClinicCity, setClinicCity] = useState(doctordata[0].ClinicCity);
    const [ClinicState, setClinicState] = useState(doctordata[0].ClinicState);
    const [ClinicPincode, setClinicPincode] = useState(doctordata[0].ClinicPincode);
    const [ClinicCountry, setClinicCountry] = useState(doctordata[0].ClinicCountry);
    const [ClinicAddress, setClinicAddress] = useState(doctordata[0].ClinicAddress);
    const [ClinicStartTime, setClinicStartTime] = useState(doctordata[0].ClinicStartTime);
    const [ClinicEndTime, setClinicEndTime] = useState(doctordata[0].ClinicEndTime);
    const [NoOfStaff, setNoOfStaff] = useState(doctordata[0].NoOfStaff);
    const [Latitude, setLatitude] = useState(doctordata[0].Latitude);
    const [Longitude, setLongitude] = useState(doctordata[0].Longitude);
    const [morningendtimeselected, setMorningEndTimeSelected] = React.useState("");
    const [morningstarttimeselected, setMorningStartTimeSelected] = React.useState("");
    const [times, setTimes] = useState([]);
    const [editdetails, seteditdetails] = useState();
    useEffect(() => {
        fetchTimes();
    }, []);

    const fetchTimes = async () => {
        const times = await Times();
        setTimes(times);
    }
    const fetchclinicdetails = async () => {
        var cdata = await localStorage.getItem("userdata");
        let parsed = JSON.parse(cdata);

        let DoctorId = parsed.userid;
        let clinicid = parsed.ClinicId;

        const obj = {
            UserId: DoctorId,
            ClinicId: clinicid,
            ClinicName: ClinicName,
            ClinicMobileNo: ClinicMobileNo,
            ClinicEmail: ClinicEmail,
            ClinicAddress: ClinicAddress,
            ClinicCity: ClinicCity,
            ClinicState: ClinicState,
            ClinicPincode: ClinicPincode,
            ClinicCountry: ClinicCountry,
            ClinicGstNumber: ClinicGstNumber,
            ClinicStartTime: ClinicStartTime,
            ClinicEndTime: ClinicEndTime,
            ClinicRegistrationNumber: ClinicRegistrationNumber,
            Latitude: Latitude,
            Longitude: Longitude
        }
        try {
            const editClinicRequest = await EditClinicdata(obj);
            let response = JSON.parse(editClinicRequest);
            if (response.success == '200') {
                alert('Clinic Details Edited Successfully');
                navigate(-1)
            }
            else {
                alert(response.message);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handledetailOpenEditmodal = () => {
        seteditdetails(true);
    };

    const handleChangePass = () => {
        navigate("/DoctorTreatPatient");
    };

    const handleGoBack = () => {
        navigate("/DoctorProfile");
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
                            fontWeight: 500,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',

                        }}>
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', borderRadius: 105, fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Edit Clinic Details
                        <Button className={classes.btnregister} onClick={handledetailOpenEditmodal} style={{ float: 'right', marginRight: 20, fontFamily: 'Poppins', fontSize: 12, width: 180 }}>Change Clinic Logo</Button>

                    </Typography>
                  
                    {editdetails ? <ClinicDetails show={editdetails} handleCloseEditmodal={() => seteditdetails(false)} /> : null}
                </Grid>
                <Grid item xs={12} >
                    <Paper elevation={6} className={classes.paper} style={{ marginLeft: 5, marginRight: 20, borderRadius: 20 }}>
                        <Grid container >
                            <Grid item xs={12}>
                                <Typography variant="h6" noWrap={true} style={{
                                    fontSize: 16,
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    color: '#2C7FB2'

                                }}>
                                    Details

                                </Typography>
                            </Grid>
                            <Grid container style={{ marginTop: 20 }}>
                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        ClinicName
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField type="text" className={classes.textFieldForm} value={ClinicName} onChange={(e) =>
                                                setClinicName(e.target.value)
                                            } id="outlined-basic" size="small" placeholder="Clinic Name" variant="outlined" style={{ width: '150%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Timings:
                                    </Typography>

                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container style={{ marginTop: '-30px' }}>
                                        <Grid item xs={6}>
                                            <center>
                                                <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', fontWeight: 600 }}>
                                                    Start Time
                                                </Typography>
                                            </center>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <center>
                                                <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', fontWeight: 600 }}>
                                                    End Time
                                                </Typography>
                                            </center>
                                        </Grid>
                                    </Grid>
                                    <Grid container style={{ marginTop: 10 }}>
                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" size="small" value={ClinicStartTime} onChange={(e) => { setClinicStartTime(e.target.value) }} className={classes.formControl} style={{ width: '80%', fontWeight: 600 }} >
                                                    <Select
                                                        className={classes.textFieldForm}
                                                        size='large'
                                                        native
                                                        label='Start Time'

                                                        value={ClinicStartTime}
                                                        onChange={(e) => setClinicStartTime(e.target.value)}

                                                        inputProps={{
                                                            name: 'start time',
                                                            id: 'outlined-start-time-native-simple',
                                                        }}
                                                        style={{ width: '90%', fontSize: 14, fontWeight: 600 }}
                                                    >
                                                        {times.map((item, id) => {
                                                            return (
                                                                <option key={id} value={item.ActualTime}>{item.DisplayTime}</option>
                                                            )
                                                        })}

                                                    </Select>
                                                </FormControl>
                                            </center>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" size="small" value={ClinicEndTime} onChange={(e) => { setClinicEndTime(e.target.value) }} className={classes.formControl} style={{ width: '80%', fontWeight: 600 }} >
                                                    <Select
                                                        className={classes.textFieldForm}
                                                        size='large'
                                                        native
                                                        value={ClinicEndTime}
                                                        onChange={(e) => setClinicEndTime(e.target.value)}
                                                        inputProps={{
                                                            name: 'end time',
                                                            id: 'outlined-end-time-native-simple',
                                                        }}
                                                        style={{ width: '90%', fontSize: 14, fontWeight: 600 }}
                                                    >
                                                        {times.map((item, id) => {
                                                            return (
                                                                <option key={id} value={item.ActualTime}>{item.DisplayTime}</option>
                                                            )
                                                        })}
                                                    </Select>
                                                </FormControl>
                                            </center>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Contact Number:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm} value={ClinicMobileNo} onChange={(e) => {
                                                const re = /^[0-9\b]+$/;
                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    setClinicMobileNo(e.target.value)
                                                }
                                            }}
                                            onInput={(e) => {
                                                e.target.value = Math.max(0, parseInt(e.target.value)).toString(0,10).slice(0, 10)}}
                                                 id="outlined-basic" size="small" variant="outlined" style={{ width: '150%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        ClinicGstNumber:
                                    </Typography>

                                </Grid>
                                <Grid item xs={4}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm} value={ClinicGstNumber} onChange={(e) => setClinicGstNumber(e.target.value)} id="outlined-basic" size="small" variant="outlined" style={{ width: '150%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Email ID:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm} value={ClinicEmail} onChange={(e) => { setClinicEmail(e.target.value) }} id="outlined-basic" size="small" placeholder="Email Id" variant="outlined" style={{ width: '150%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Registration Number:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm} value={ClinicRegistrationNumber} onChange={(e) => { setClinicRegistrationNumber(e.target.value) }} id="outlined-basic" size="small" variant="outlined" style={{ width: '150%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600

                                    }}>
                                        Address:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm} value={ClinicAddress} onChange={(e) => { setClinicAddress(e.target.value) }} id="outlined-basic" size="small" placeholder="Address" variant="outlined" style={{ width: '150%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        No. of Staff:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm} value={NoOfStaff} onChange={(e) => setNoOfStaff(e.target.value)} id="outlined-basic" size="small" placeholder="Number of Staff" variant="outlined" style={{ width: '150%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>


                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        City:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" className={classes.formControlForm}  >
                                                    <TextField className={classes.textFieldForm} value={ClinicCity} onChange={(e) => {
                                                        const re = /^[A-Za-z]+$/;
                                                        if (e.target.value === '' || re.test(e.target.value)) {
                                                            setClinicCity(e.target.value)
                                                        }
                                                    }} id="outlined-basic" size="small" placeholder="City" variant="outlined" style={{ width: '70%' }} />
                                                </FormControl>
                                            </center>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" className={classes.formControlForm}  >
                                                    <TextField className={classes.textFieldForm} value={ClinicPincode} onChange={(e) => {
                                                        const re = /^[0-9\b]+$/;
                                                        if (e.target.value === '' || re.test(e.target.value)) {
                                                            setClinicPincode(e.target.value)
                                                        }
                                                    }} id="outlined-basic" size="small" placeholder="Pincode" variant="outlined" style={{ width: '70%' }} />
                                                </FormControl>
                                            </center>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Geographic Location:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" className={classes.formControlForm}  >
                                                    <TextField className={classes.textFieldForm} id="outlined-basic" value={Latitude} onChange={(e) => setLatitude(e.target.value)} size="small" placeholder="Latitude" variant="outlined" style={{ width: '70%' }} />
                                                </FormControl>
                                            </center>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" className={classes.formControlForm}  >
                                                    <TextField className={classes.textFieldForm} id="outlined-basic" size="small" placeholder="Longitude" value={Longitude} onChange={(e) => setLongitude(e.target.value)} variant="outlined" style={{ width: '70%' }} />
                                                </FormControl>
                                            </center>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        State:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" className={classes.formControlForm}  >
                                                    <TextField className={classes.textFieldForm} value={ClinicState} onChange={(e) => {
                                                        const re = /^[A-Za-z]+$/;
                                                        if (e.target.value === '' || re.test(e.target.value)) {
                                                            setClinicState(e.target.value)
                                                        }
                                                    }} id="outlined-basic" size="small" placeholder="State" variant="outlined" style={{ width: '70%' }} />
                                                </FormControl>
                                            </center>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" className={classes.formControlForm}  >
                                                    <TextField className={classes.textFieldForm} value={ClinicCountry} onChange={(e) => {
                                                        const re = /^[A-Za-z]+$/;
                                                        if (e.target.value === '' || re.test(e.target.value)) {
                                                            setClinicCountry(e.target.value)
                                                        }
                                                    }} id="outlined-basic" size="small" placeholder="Country" variant="outlined" style={{ width: '70%' }} />
                                                </FormControl>
                                            </center>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid container xs={6} >
                                    <Grid xs={12} sm={6}>
                                        <Button className={classes.btnCancle} onClick={handleGoBack} style={{ float: 'right', marginRight: 20 }}>
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid xs={12} sm={6}>
                                        <Button className={classes.btnCancle} onClick={fetchclinicdetails} style={{ float: 'left', marginLeft: 20 }}>
                                            Submit
                                        </Button>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    textField: {
        // [`& fieldset`]: {
        //     borderRadius: 25,
        // },

        fontFamily: 'Poppins;',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 11,
        textAlign: 'center',
        width: '80%',
        height: 30,
    },
    formControlForm: {
        paddingBottom: theme.spacing(3),
        alignItems: 'center',
        justifyContent: 'center',
    },
    textFieldForm: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 11,
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
        width: 120,
        marginTop: 10,
        fontSize: '11px'
    },
    inputFields: {
        // [`& fieldset`]: {
        //     borderRadius: 25,
        // },
        width: 300,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 200,
        marginTop: 15
    },
    btnSubmit: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
    },
    btnregister: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        fontSize: '11px'
    },
}));
