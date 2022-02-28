import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormControlLabel, Switch, Select, TextField, Typography, Button, Avatar, InputBase, Divider, ListItem, ListItemText, Grid, Paper } from "@material-ui/core";
import DoctorNavbar from './Doctor_Navbar';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import { Time, App_Channels, App_Types, Doctors, Book_Appointment, Note_for_Doctor } from '../Apis/Book_Appointment/index';

const getClinicPatients = 'http://13.233.217.107:8080/api/Web_GetPatients';
const getPatientDetails = 'http://13.233.217.107:8080/api/ShowPatientDetailUsingId';
const getDoctor = 'http://13.233.217.107:8080/api/GetAllDoctorsUsingIdForWeb';
const getMedicalHistory = 'http://13.233.217.107:8080/api/MedicalHistoryforDoctor';
const bookAppointment = 'http://13.233.217.107:8080/api/AddAppointment';
const getPatientSearchApi = 'http://13.233.217.107:8080/api/Web_SearchPatients';

const drawerWidth = 240;

const columns = [
    {
        field: 'fullName',
        headerName: 'Full name',
        sortable: false,
        width: 200,
        valueGetter: (params) =>
            `${params.getValue(params.id, 'FirstName') || ''} ${params.getValue(params.id, 'LastName') || ''
            }`,
    },
    {
        field: 'MobileNo',
        headerName: 'Contact No',
        width: 160,
        editable: true,
    },
];


export default function DoctorBookAppointment() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [patientData, setpatientData] = useState([]);
    const [patientDetails, setpatientDetails] = useState('');
    const [doctorData, setdoctorData] = useState([]);
    const [appChannel, setappChannel] = useState([]);
    const [doctor, setDoctor] = React.useState('');
    const [appselected, setAppSelected] = React.useState("");
    const [time, settime] = useState([]);
    const [appType, setappType] = useState([]);
    const [timeselected, setTimeSelected] = React.useState("");
    const [apptypeselected, setapptypeSelected] = useState('');
    const [appchannelselected, setappchannelSelected] = useState('');
    const [walkIn, setwalkIn] = useState(false);
    const [medicalHistory, setmedicalHistory] = useState([]);
    const [title, setTitle] = useState('');
    const [reason, setReason] = useState('');
    const [doctorNote, setdoctorNote] = useState('');
    const [bp, setBp] = useState('');
    const [temp, setTemp] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [plus, setPlus] = useState('');
    const [spo2, setSpo2] = useState('');
    const [appDate, setappDate] = useState('');
    const [notefordoctor, setnotefordoctor] = useState([]);
    const [patientsearch, setpatientsearch] = useState([]);

    const fetchclinicpatientsdata = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        const clinicpatientInfo = await axios.post(getClinicPatients, { ClinicId: clinicid })
        setpatientData(clinicpatientInfo?.data?.Patients);
    }

    const fetchdoctorsdata = async () => {
        const doctorInfo = await Doctors()
        setdoctorData(doctorInfo);
    }

    const fetchappchannels = async () => {
        const appchannelInfo = await App_Channels()
        setappChannel(appchannelInfo);
    }

    const fetchapptypes = async () => {
        const apptypeInfo = await App_Types()
        setappType(apptypeInfo);
    }

    const fetchtimings = async () => {
        const timingInfo = await Time()
        settime(timingInfo);
    }

    const fetchNotefordoctor = async () => {
        const doctorsNoteInfo = await Note_for_Doctor()
        setnotefordoctor(doctorsNoteInfo);
    }

    const searchPatient = async (patientsearch) => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        try {
            const patientsInfo = await axios.post(getPatientSearchApi, { ClinicId: clinicid, Name: patientsearch });
            setpatientData(patientsInfo?.data?.Patients);
        }
        catch (e) {
            console.log(e)
        }
    }


    const fetchmedicalhistory = async (UserId) => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        try {
            const medicalhistoryInfo = await axios.post(getMedicalHistory, { ClinicId: clinicid, UserId: UserId })
            setmedicalHistory(medicalhistoryInfo?.data?.Appointment);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchclinicpatientsdata();
        fetchdoctorsdata();
        fetchappchannels();
        fetchapptypes();
        fetchtimings();
        fetchNotefordoctor();

    }, [])

    const handleRowClick = async (UserId) => {
        const patientDetailedInfo = await axios.post(getPatientDetails, { UserId: UserId });
        setpatientDetails(patientDetailedInfo?.data?.PatientDetails);
        fetchmedicalhistory(UserId);
    }

    const handleBookAppointment = async () => {
        const currentTime = new Date();
        let systemTime = currentTime.toTimeString();
        let tdate = currentTime.toISOString().split('T')[0];

        if (patientDetails == '') {
            alert("Please select patient from list")
            return;
        }
        else if (doctor.trim() == '') {
            alert("Please select Doctor")
            return;
        }
        else if (doctor.trim() == '') {
            alert("Please select Doctor")
            return;
        }
        else if (appchannelselected.trim() == '') {
            alert("Please select appointment Channel")
            return;
        }
        else if (title.trim() == '') {
            alert("Please enter title")
            return;
        }
        else if (appDate < tdate) {
            alert("You cannot set appointment for previous date");
            return
        }
        else if (appDate <= tdate) {
            if (timeselected < systemTime) {
                alert(`You can't not set Appointment at ${timeselected}`);
                return
            }
        }
        else if (apptypeselected.trim() == '') {
            alert("Please select appointment type");
            return
        }

        var data = localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        let doctorid = parsed.userid;
        const now = new Date();
        const date = now.toISOString().split('T')[0];

        const obj = {
            Title: title,
            UserId: patientDetails.UserId,
            FirstName: patientDetails.FirstName,
            LastName: patientDetails.LastName,
            DoctorId: doctor,
            ClinicId: clinicid,
            AppointmentDate: appDate,
            BookedDate: date,
            AppointmentTime: timeselected,
            AppointmentType: apptypeselected,
            AppointmentChannel: appchannelselected,
            AppointmentStatus: 'Booked',
            Patient_BP: bp,
            Patient_Weight: weight,
            Patient_Height: height,
            Patient_SPO2: spo2,
            Patient_Plus: plus,
            Patient_Temp: temp,
            ShortNote: doctorNote,
            AppointmentReason: reason,
            createdBy: doctorid,
            updatedBy: doctorid,
        }
        const addAppointment = await Book_Appointment(obj);

        let parse = JSON.parse(addAppointment);
        if (parse.success === "200") {
            alert(parse.message);
            window.location.reload()
        }
    }

    // function disableBtn() {
    //     document.getElementById("mybtn").hidden = true;
    // }
    // function enableBtn() {
    //     document.getElementById("mybtn").hidden = false;
    // }


    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const handleGoBack = () => {
        navigate("/DoctorHome");
    };

    function renderRow(props) {
        const { index, style } = props;

        return (
            // <List>
            <ListItem button style={style} key={index} >
                <ListItem >
                    <ListItemText
                        style={{ borderBottom: '1px solid #F0F0F0' }}
                        primary={`Title : Regular Checkup`}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component={'span'}
                                    variant={"body2"}
                                    color="textPrimary"
                                >
                                    {`Date : 2021-09-11`}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider />
            </ListItem>
            // </List>
        );
    }

    renderRow.propTypes = {
        index: PropTypes.number.isRequired,
        style: PropTypes.object.isRequired,
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
                        Book Appointment
                    </Typography>
                </Grid>

                <Grid item xs={12} container style={{ marginTop: '-10px' }}>
                    <Grid item xs={12} sm={4}>
                        <Paper elevation={6} className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <center> <SearchIcon className={classes.searchIcon} />
                                        <InputBase
                                            placeholder="Search by Name"

                                            onChange={(e) => setpatientsearch(e.target.value)}
                                            value={patientsearch}
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,

                                            }}
                                            variant='outlined'
                                            inputProps={{ 'aria-label': 'search' }}
                                            style={{ borderRadius: 15, }}
                                        > </InputBase> </center>
                                </Grid>

                                <Grid item xs={6} style={{ alignSelf: 'center' }}>
                                    <Button className={classes.btnview} onClick={() => searchPatient(patientsearch)} size="small" style={{ float: 'right', fontSize: 11, textAlign: 'center' }}>View Profile</Button>
                                </Grid>

                            </Grid>


                            <DataGrid
                                style={{ height: 250, marginTop: 20, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2', cursor: 'pointer' }}
                                rows={patientData}
                                rowHeight={30}
                                columns={columns}
                                columnWidth={10}
                                pageSize={5}
                                onRowClick={(newSelection) => {
                                    handleRowClick(newSelection.row.UserId);
                                }}
                            />

                            <Divider style={{ padding: '5px', borderTop: '1px solid #F0F0F0', backgroundColor: '#fff', paddingBottom: 10 }} />

                            <Typography variant="h7" noWrap={true} style={{
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                color: '#2C7FB2',
                                textDecoration: 'underline',
                                textUnderlineOffset: '1px',
                                textDecorationThickness: '1px',
                                marginLeft: 4

                            }} >
                                Profile Details
                            </Typography>

                            <Grid container spacing={3} style={{ paddingTop: theme.spacing(2) }}>
                                <Grid container item xs={12} sm={4} >
                                    <Grid itexm xs={12} >
                                        <center>
                                            {patientDetails.ProfileImage ?
                                                <Avatar style={{ borderRadius: 50, height: 50, width: 50 }} src={patientDetails.ProfileImage} /> :
                                                <Avatar style={{ borderRadius: 50, height: 50, width: 50 }} />}
                                        </center>
                                    </Grid>
                                    <Divider style={{ paddingTop: '15px', backgroundColor: '#fff' }} />
                                    <Grid itexm xs={12} style={{ paddingTop: 10 }}>
                                        <center>
                                            <Typography variant="h7" noWrap={true} style={{
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                color: 'gray',
                                            }}
                                            >
                                                {patientDetails.FirstName} {patientDetails.LastName}
                                            </Typography>
                                        </center>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Paper elevation={0} style={{
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        color: 'gray',
                                    }}>
                                        Location: <Typography variant="h7" noWrap={true} style={{
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            padding: theme.spacing(2),
                                            color: 'gray',
                                            fontSize: 12,
                                        }}
                                        >
                                            {patientDetails.Address !== null ? patientDetails.Address : 'Not Provided'} {patientDetails.City} {patientDetails.State} {patientDetails.Pincode} {patientDetails.Country}
                                        </Typography>
                                        <Divider style={{ paddingTop: '10px', backgroundColor: '#fff' }} />
                                        Contact: <Typography variant="h7" noWrap={true} style={{
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            padding: theme.spacing(2),
                                            color: 'gray',
                                            fontSize: 12,
                                        }}
                                        >
                                            {patientDetails.MobileNo !== null ? patientDetails.MobileNo : 'Not Provided'}
                                        </Typography>
                                        <Divider style={{ paddingTop: '10px', backgroundColor: '#fff' }} />
                                        Email Id: <Typography variant="h7" noWrap={true} style={{
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            padding: theme.spacing(2),
                                            color: 'gray',
                                            fontSize: 12,
                                        }}
                                        >
                                            {patientDetails.Email != '' ? patientDetails.Email : 'Not Provided'}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>


                    <Grid item xs={12} sm={8} >
                        <Paper className={classes.paper} elevation={6} style={{ marginLeft: 25, marginRight: 20, padding: theme.spacing(2.5) }}>
                            <Grid container spacing={3} style={{ backgroundColor: '#fff', borderBlockEnd: '1px solid #F0F0F0' }}>
                                <Grid item xs={12} sm={6} style={{ borderRight: '1px solid #F0F0F0' }}>
                                    <Typography variant="h7" noWrap={true} style={{
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        padding: theme.spacing(2),
                                        color: '#2C7FB2',
                                        textDecoration: 'underline',
                                        textUnderlineOffset: '1px',
                                        textDecorationThickness: '1px'
                                    }}
                                    >
                                        Details
                                    </Typography>

                                    <div style={{ paddingTop: 10 }}>
                                        <FormControl variant="outlined" size="small" className={classes.formControl} >
                                            <Select
                                                className={classes.textField}
                                                native
                                                value={doctor}
                                                onChange={(e) => setDoctor(e.target.value)}
                                                label="doctor"
                                                inputProps={{
                                                    name: 'doctor',
                                                    id: 'outlined-doctor-native-simple',
                                                }}
                                                style={{ width: '148%', position: 'relative', color: '#707070', fontSize: 14, fontWeight: 400, fontFamily: 'Poppins' }}
                                            >
                                                <option aria-label="None" value="" >Select Doctor</option>
                                                {doctorData.map(v => (<option value={v.DoctorId}>Dr. {v.FirstName} {v.LastName}</option>))}

                                            </Select>
                                        </FormControl>

                                        <Divider style={{ opacity: 0 }} />
                                        {!walkIn ? <FormControl variant="outlined" size="small" className={classes.formControl} >
                                            <Select
                                                className={classes.textField}
                                                native
                                                value={appchannelselected}
                                                onChange={(e) => setappchannelSelected(e.target.value)}
                                                label="appointment"
                                                inputProps={{
                                                    name: 'appointmentchannel',
                                                    id: 'outlined-appointment-native-simple',
                                                }}
                                                style={{ width: '130%', color: '#707070', fontSize: 14, position: 'relative', top: 4, fontWeight: 400, fontFamily: 'Poppins' }}
                                            >
                                                <option aria-label="None" value="">Select Appointment Channel</option>
                                                {appChannel.map(v => (<option value={v.AppointmentChannel}>{v.AppointmentChannel}</option>))}

                                            </Select>
                                        </FormControl>
                                            :
                                            <FormControl variant="outlined" size="small" className={classes.formControl} disabled>
                                                <Select
                                                    className={classes.textField}
                                                    native
                                                    value={appchannelselected}
                                                    onChange={(e) => setappchannelSelected(e.target.value)}
                                                    label="appointment"
                                                    inputProps={{
                                                        name: 'appointmentchannel',
                                                        id: 'outlined-appointment-native-simple',
                                                    }}
                                                    style={{ width: '130%', color: '#707070', fontSize: 14, position: 'relative', top: 4, fontWeight: 400, fontFamily: 'Poppins' }}
                                                >
                                                    <option aria-label="None" value="">Select Appointment Channel</option>
                                                    {appChannel.map(v => (<option value={v.AppointmentChannel}>{v.AppointmentChannel}</option>))}

                                                </Select>
                                            </FormControl>
                                        }
                                        <Divider style={{ opacity: 0 }} />
                                        <FormControl variant="outlined" className={classes.formControl} >
                                            <TextField

                                                id="outlined-basic" size="small" label="Appointment Title" variant="outlined" onChange={(e) => setTitle(e.target.value)} style={{ width: '146%', color: '#707070', position: 'relative', top: 8, fontSize: 14, fontWeight: 400, fontFamily: 'Poppins' }} />
                                        </FormControl>
                                    </div>
                                </Grid>


                                <Grid item xs={12} sm={6} >
                                    <Typography variant="h7" noWrap={true} style={{
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        padding: theme.spacing(1),
                                        color: '#2C7FB2',
                                        textDecoration: 'underline',
                                        textUnderlineOffset: '1px',
                                        textDecorationThickness: '1px'

                                    }}
                                    >
                                        Appointment Details
                                    </Typography>
                                    <Grid container style={{ paddingTop: 10 }}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 14, fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                color: '#707070',
                                                marginLeft: 9
                                            }}>
                                                {patientDetails.FirstName ? patientDetails.FirstName : 'NA'} {patientDetails.LastName}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <Typography variant="h6" noWrap={true} style={{
                                                float: 'right', fontSize: 14, fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                color: '#707070',
                                                float: 'left'

                                            }}>
                                                PID- {patientDetails.PatientId ? patientDetails.PatientId : "NA"}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container style={{ paddingTop: 10 }}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 15, fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                color: '#707070',
                                                marginLeft: 8
                                            }}>
                                                Walk-In Appointment
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={walkIn}
                                                        // onClick= {disableBtn}
                                                        onChange={(e) => setwalkIn(e.target.checked)}
                                                        name="checkedB"
                                                        color='primary'
                                                        style={{ color: '#2C7FB2', float: 'right' }}
                                                    />
                                                }
                                                style={{ position: 'relative', right: 90, color: '#2C7FB2', float: 'right', marginTop: '-10px', paddingRight: 20 }}
                                            />
                                            {/* <FormControlLabel
                                                control={
                                                    <Switch 
                                                        checked={walkIn.checkedB } onClick= {enableBtn}
                                                        onChange={(e) => setwalkIn({ ...state, [e.target.name]: e.target.checked })}
                                                        name="checkedB"
                                                        color='primary'
                                                        style={{ color: '#2C7FB2', float: 'right' }}
                                                    />
                                                }
                                                style={{ position:'relative', right:8, color: '#2C7FB2', float: 'right', marginTop: '-10px', paddingRight: 20 }}
                                            /> */}

                                        </Grid>
                                    </Grid>
                                    <Grid container style={{ paddingTop: 2 }}>
                                        <Grid item xs={12} sm={6} id='mybtn' >
                                            {!walkIn ? <FormControl variant="outlined" size="small" className={classes.formControl}>
                                                <Select
                                                    className={classes.textField}
                                                    native
                                                    value={timeselected}
                                                    onChange={(e) => setTimeSelected(e.target.value)}
                                                    label="time"
                                                    inputProps={{
                                                        name: 'time',
                                                        id: 'outlined-appointment-native-simple',
                                                    }}

                                                    style={{ width: '70%', color: '#707070', fontSize: 14, fontWeight: 400, fontFamily: 'Poppins' }}

                                                >
                                                    <option aria-label="None" value="" >Time</option>
                                                    {time.map(v => (<option value={v.ActualTime}>{v.DisplayTime}</option>))}
                                                </Select>
                                            </FormControl>

                                                :
                                                <FormControl variant="outlined" size="small" className={classes.formControl} disabled>
                                                    <Select
                                                        className={classes.textField}
                                                        native
                                                        value={timeselected}
                                                        onChange={(e) => setTimeSelected(e.target.value)}
                                                        label="time"
                                                        inputProps={{
                                                            name: 'time',
                                                            id: 'outlined-appointment-native-simple',
                                                        }}

                                                        style={{ width: '70%', color: '#707070', fontSize: 14, fontWeight: 400, fontFamily: 'Poppins' }}

                                                    >
                                                        <option aria-label="None" value="" >Time</option>
                                                        {time.map(v => (<option value={v.ActualTime}>{v.DisplayTime}</option>))}
                                                    </Select>

                                                </FormControl>
                                            }
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <FormControl variant="outlined" size="small" className={classes.formControl} style={{ paddingRight: 20, position: 'relative', bottom: 3 }}>
                                                <TextField
                                                    variant="outlined"
                                                    onChange={(e) => setappDate(e.target.value)}
                                                    id="date"
                                                    label=""
                                                    type="date"
                                                    size="small"
                                                    style={{ width: '85%', fontSize: 12 }}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} >
                                        <FormControl variant="outlined" size="small" className={classes.formControl} >

                                            <Select
                                                className={classes.textField}
                                                native
                                                value={apptypeselected}
                                                onChange={(e) => setapptypeSelected(e.target.value)}
                                                label="appointment type"
                                                inputProps={{
                                                    name: 'appointmenttype',
                                                    id: 'outlined-appointment-type-native-simple',
                                                }}
                                                style={{ width: '158%', color: '#707070', fontSize: 14, fontWeight: 400, fontFamily: 'Poppins' }}
                                            >
                                                <option aria-label="None" >Select Appointment Type</option>
                                                {appType.map(v => (<option value={v.AppointmentType}>{v.AppointmentType}</option>))}

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    {/* <Grid item xs={12}>
                                        <div>
                                            <FixedSizeList height={90} width={300} itemSize={60} itemCount={6} style={{ color: '#00318B' }} >
                                                {renderRow}
                                            </FixedSizeList>
                                        </div>
                                    </Grid> */}

                                </Grid>

                            </Grid>


                            <Grid item xs={12} sm={8} style={{ paddingTop: 25, }}>
                                <Typography variant="h7" noWrap={true} style={{

                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    padding: theme.spacing(2),
                                    color: '#2C7FB2',
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '1px',
                                    textDecorationThickness: '1px'
                                }}
                                >
                                    Vital Information
                                </Typography>

                            </Grid>

                            <Grid container spacing={2} style={{ padding: 10 }}>
                                <Grid item xs={12} style={{ justifyContent: 'center' }}>
                                    <Grid container spacing={2} style={{ padding: 10 }}>
                                        <Grid item xs={2} style={{ marginLeft: -10 }}>
                                            <TextField
                                                label="BP"
                                                id="outlined-size-small"
                                                variant="outlined"
                                                size="small"
                                                value={bp}
                                                onChange={(e) => {
                                                    const re = /^[0-9\b]+$/;
                                                    if (e.target.value === '' || re.test(e.target.value)) {
                                                        setBp(e.target.value)
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={2} style={{ position: 'relative', right: -4 }} >
                                            <TextField
                                                label="Temp"
                                                id="outlined-size-small"
                                                variant="outlined"
                                                size="small"
                                                value={temp}
                                                onChange={(e) => {
                                                    const re = /^[0-9\b]+$/;
                                                    if (e.target.value === '' || re.test(e.target.value)) {
                                                        setTemp(e.target.value)
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={2} style={{ position: 'relative', right: -10 }}>
                                            <TextField
                                                label="Height"
                                                id="outlined-size-small"
                                                variant="outlined"
                                                size="small"
                                                value={height}
                                                onChange={(e) => {
                                                    const re = /^[0-9\b]+$/;
                                                    if (e.target.value === '' || re.test(e.target.value)) {
                                                        setHeight(e.target.value)
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={2} style={{ position: 'relative', right: -15 }} >

                                            <TextField
                                                label="Weight"
                                                id="outlined-size-small"
                                                variant="outlined"
                                                size="small"
                                                value={weight}
                                                onChange={(e) => {
                                                    const re = /^[0-9\b]+$/;
                                                    if (e.target.value === '' || re.test(e.target.value)) {
                                                        setWeight(e.target.value)
                                                    }
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={2} style={{ position: 'relative', right: -18 }}>
                                            <TextField

                                                label="SPO2"
                                                id="outlined-size-small"
                                                variant="outlined"
                                                size="small"
                                                value={spo2}
                                                onChange={(e) => {
                                                    const re = /^[0-9\b]+$/;
                                                    if (e.target.value === '' || re.test(e.target.value)) {
                                                        setSpo2(e.target.value)
                                                    }
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={2} style={{ position: 'relative', right: -22 }} >
                                            <TextField
                                                label="Pulse Rate"
                                                id="outlined-size-small"
                                                variant="outlined"
                                                size="small"
                                                value={plus}
                                                onChange={(e) => {
                                                    const re = /^[0-9\b]+$/;
                                                    if (e.target.value === '' || re.test(e.target.value)) {
                                                        setPlus(e.target.value)
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} style={{ marginTop: 5 }}>
                                        <TextField size='small' onChange={(e) => setReason(e.target.value)} id="outlined-basic" label="Reason" variant="outlined" style={{ marginLeft: 8, width: '98%' }} />
                                    </Grid>

                                    <Grid item xs={12} sm={6} >
                                        <FormControl variant="outlined" size="small" className={classes.formControl}>
                                            <Select
                                                className={classes.textField}
                                                native
                                                value={doctorNote}
                                                onChange={(e) => setdoctorNote(e.target.value)}
                                                label="time"
                                                inputProps={{
                                                    name: 'time',
                                                    id: 'outlined-appointment-native-simple',
                                                }}
                                                style={{ width: '161%', height: 42, marginTop: -4, color: '#707070', fontSize: 14, fontWeight: 400, fontFamily: 'Poppins' }}
                                            >
                                                <option aria-label="None" value="" >Note For Doctor</option>
                                                {notefordoctor.map(v => (<option value={v.NoteForDoctor}>{v.NoteForDoctor}</option>))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>


                                <Grid container xs={12} style={{ paddingTop: 15 }}>
                                    <Grid item xs={12} sm={6}>
                                        <center>
                                            <Button className={classes.btnregister} href={'/DoctorBookAppointment'} style={{ float: 'right', marginRight: 20 }}>Reset</Button>
                                        </center>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <center>
                                            <Button onClick={handleBookAppointment} className={classes.btnregister} style={{ float: 'left', marginLeft: 20 }}>Submit</Button>
                                        </center>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Paper>

                    </Grid>


                </Grid>
            </Grid > {/* main grid */}

        </div >
    );
}



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        backgroundColor: 'white',
    },
    input: {
        height: 35
    },
    vitalinputs: {
        height: 10
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
        padding: theme.spacing(2),
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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 800,

    },
    searchIcon: {
        paddingTop: 10,
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "gray",
    },
    inputRoot: {
        color: 'inherit',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 200,
    },
    inputInput: {
        padding: theme.spacing(0, 0, 0, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '32ch',
            height: '30px'
        },
        border: '1px solid lightgray',
        borderRadius: 20,
        color: '#707070',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 11
    },

    btnview: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
    },
    headingAddMedicine: {
        paddingTop: 20,
        alignItems: 'center',
        color: '#2C7FB2 !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    inputFields: {
        [`& fieldset`]: {
            borderRadius: 25,
        },
        width: 300,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 200,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 220,

    },
    groupreports: {
        height: 120,
        width: 100,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#00318B',
        paddingTop: 50,
        borderRadius: 20,
        marginLeft: 20
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
        marginBottom: 10,
        marginTop: 10
    },
    textField: {
        // [`& fieldset`]: {
        //     borderRadius: 25,
        // },
        // padding: 8,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 11,
        textAlign: 'center',
        width: '100%'
    },
    vitaltextField: {
        // [`& fieldset`]: {
        //     borderRadius: 25,
        // },
        // padding: 8,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 11,
        textAlign: 'center',
        width: '100%'
    },
    btnbookappointment: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 25,
        fontSize: 11

    },
    btnreset: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 25,
        width: 130,
        fontSize: 11

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
        marginBottom: -5,
        fontSize: 12
    },

}));
