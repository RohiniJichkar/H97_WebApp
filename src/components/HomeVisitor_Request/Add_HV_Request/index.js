import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField, Select, FormControl, Button, IconButton, Grid, Paper, Link } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import { Time } from '../../../Apis/Dashboard/Edit_Appointment_From_PatientIn/index';
import { AddHomeVisitorRequest } from '../../../Apis/HomeVisitorRequest/AddHVRequest/index';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';


import axios from 'axios';
const drawerWidth = 240;

const Add_HV_Request = ({ show, data, handleclose }) => {
    const getClinicPatients = 'http://13.233.217.107:8080/api/Web_GetPatients';
    const getHomevisitors = 'http://13.233.217.107:8080/api/GetHomeVisitorDoctorsforClinic';

    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [firstnm, setfirstnm] = useState('');
    const [mobile, setmobile] = useState('');
    const [slots, setslots] = useState([]);
    const [requestfor, setrequestfor] = useState('');
    const [MobileNo, setMobileNo] = useState('');
    const [date, setdate] = useState(new Date());
    const [time, setTime] = useState('');
    const [Address, setAddress] = useState('');
    const [text, settext] = useState('');
    const [PatientUserid, setPatientUserid] = useState('')
    const [hvuserid, sethvuserid] = useState('');
    const [homevisitorsearch, sethomevisitorsearch] = useState([]);
    var arr = [];
    const [patient, setpatient] = useState(arr);
    useEffect(() => {
        fetchtimings();
        fetchclinicpatientsdata();
        fetchHomeVisitorData();
    }, [])

    const fetchtimings = async () => {
        try {
            const timingInfo = await Time()
            setslots(timingInfo);
        }
        catch (e) {
            console.log(e);
        }
    }
    const fetchHomeVisitorData = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        try {
            const homevisitorInfo = await axios.post(getHomevisitors, { ClinicId: clinicid });
            sethomevisitorsearch(homevisitorInfo?.data?.HomeVisitors);
        }
        catch (e) {
            console.log(e)
        }
    }
    const fetchclinicpatientsdata = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        try {
            const clinicpatientInfo = await axios.post(getClinicPatients, { ClinicId: clinicid })
            setpatient(clinicpatientInfo?.data?.Patients);
        }
        catch (error) {
            console.log(error)
        }
    }

    const addRequest = async (PatientUserid, hvuserid, MobileNo, Address, time, date, requestfor) => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let ClinicId = parsed.ClinicId;

        let Date = date.toISOString().split('T')[0];

        if (PatientUserid == '') {
            alert('Please Select Patient');
            return;
        }
        else if (hvuserid == '') {
            alert('Please Select Home Visitor Doctor');
            return;
        }
        else if (requestfor == '') {
            alert('Please Enter Request For');
            return;
        }
        else if (MobileNo == '') {
            alert('Please Enter Mobile Number');
            return;
        }
        else if (date == '') {
            alert('Please Select Date');
            return;
        }
        else if (time == '') {
            alert('Please Select Time');
            return;
        }

        try {
            const registration = await AddHomeVisitorRequest(PatientUserid, hvuserid, ClinicId, "Pending", MobileNo, Address, time, Date, requestfor);
            let parse = JSON.parse(registration);
            if (parse.success === "200") {
                alert(parse.message);
                handleclose();
                window.location.reload()
            }
            else {
                alert(parse.message);
            }
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <>
            <Dialog
                open={show}
                maxWidth={maxWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Home Visitor Request"}
                    <IconButton edge="start" color="inherit" onClick={handleclose} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>

                    <Grid container>
                        <Grid item xs={6}>
                            <FormControl variant="outlined" size="small" className={classes.formControl}>
                                {/* <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={patient}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Movie" />}
                                /> */}
                                <Select
                                    className={classes.textField}
                                    onChange={(e) => setPatientUserid(e.target.value)}
                                    native
                                    label="select doctor"
                                    inputProps={{
                                        name: 'select doctor',
                                        id: 'outlined-appointment-native-simple',
                                    }}

                                    style={{ width: '400px', color: '#707070', fontSize: 14, fontWeight: 400, fontFamily: 'Poppins' }}

                                >
                                    <option aria-label="None" value="" >Select Patient</option>
                                    {patient.map(v => (<option value={v.UserId}>{v.FirstName} {v.LastName}</option>))}
                                </Select>

                            </FormControl><span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span>
                            <TextField className={classes.inputFields}
                                value={requestfor}
                                onChange={(e) =>
                                    setrequestfor(e.target.value)
                                }
                                id="outlined-basic"
                                size="small"
                                placeholder="Requesting For*"
                                variant="outlined"
                                style={{ marginTop: '20px' }}
                            /> <span style={{ position: 'relative', top: 10, fontSize: 20, color: 'red' }}> *</span>

                            <TextField
                                className={classes.inputFields}
                                value={MobileNo}
                                onChange={(e) => {
                                    const re = /^[0-9\b]+$/;
                                    if (e.target.value === '' || re.test(e.target.value)) {
                                        setMobileNo(e.target.value)
                                    }
                                }}
                                id="outlined-basic"
                                type="number"
                                size="small"
                                placeholder="Mobile Number*"
                                variant="outlined"
                                onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                }}
                            /> <span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span>
                        </Grid>

                        <Grid item xs={6} >

                            <FormControl variant="outlined" size="small" className={classes.formControl}>
                                <Select
                                    className={classes.textField}
                                    native
                                    label="select doctor"
                                    value={hvuserid}
                                    onChange={(e) => sethvuserid(e.target.value)}
                                    inputProps={{
                                        name: 'select doctor',
                                        id: 'outlined-appointment-native-simple',
                                    }}

                                    style={{ width: '400px', color: '#707070', fontSize: 14, fontWeight: 400, fontFamily: 'Poppins' }}

                                >
                                    <option aria-label="None" value="" >Select Doctor</option>
                                    {homevisitorsearch.map(v => (<option value={v.UserId}>{v.FirstName} {v.LastName}</option>))}
                                    {/* {time.map(v => (<option value={v.ActualTime}>{v.DisplayTime}</option>))} */}
                                </Select>

                            </FormControl>  <span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span>

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                <KeyboardDatePicker
                                    autoOk
                                    className={classes.inputFields}
                                    size='small'
                                    value={date}
                                    onChange={setdate}
                                    inputVariant="outlined"
                                    label="Date"
                                    format='dd/MM/yyyy'
                                    style={{ marginTop: 20 }}
                                />
                            </MuiPickersUtilsProvider><span style={{ position: 'relative', top: 10, fontSize: 20, color: 'red' }}> *</span>

                            {/* <TextField
                                className={classes.inputFields}
                                id="outlined-basic"
                                size="small"
                                value={date}
                                onChange={(e) => setdate(e.target.value)}
                                type='date'
                                variant="outlined"
                                style={{ marginTop: '20px' }}
                            /> <span style={{ position: 'relative', top: 10, fontSize: 20, color: 'red' }}> *</span> */}
                            <FormControl variant="outlined" size="small" className={classes.formControl}>
                                <Select
                                    className={classes.textField}
                                    native
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    label="time"
                                    inputProps={{
                                        name: 'time',
                                        id: 'outlined-appointment-native-simple',
                                    }}

                                    style={{ width: '400px', color: '#707070', fontSize: 14, fontWeight: 400, fontFamily: 'Poppins' }}

                                >
                                    <option aria-label="None" value="" >Time</option>
                                    {slots.map(v => (<option value={v.ActualTime}>{v.DisplayTime}</option>))}
                                    {/* {time.map(v => (<option value={v.ActualTime}>{v.DisplayTime}</option>))} */}
                                </Select>

                            </FormControl> <span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField className={classes.inputFields} multiline
                                value={Address}
                                onChange={(e) => {
                                    setAddress(e.target.value)
                                }}
                                rows={2}
                                rowsMax={6} id="outlined-basic" size="small" label="Address" variant="outlined"
                                style={{ width: 855 }}
                            />
                        </Grid>
                        <Grid container>
                            <Grid xs={12} sm={6}>
                                <Button className={classes.btnCancle} onClick={handleclose} style={{ float: 'right', marginRight: 20 }}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <Button onClick={() => addRequest(PatientUserid, hvuserid, MobileNo, Address, time, date, requestfor)} className={classes.btnregister} style={{ float: 'left', marginLeft: 20 }}>
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </DialogContent>
            </Dialog>
        </>
    )
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
            width: '30ch',
            height: '30px'
        },
        border: '1px solid lightgray',
        borderRadius: 20,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 11,
        color: 'gray'
    },
    btnview: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 25,
        paddingLeft: 35,
        paddingRight: 35,
        float: 'right'
    },
    headingAddMedicine: {
        color: '#00318B !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    inputFields: {
        // [`& fieldset`]: {
        //     borderRadius: 25,
        // },
        width: 400,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 200,
        marginBottom: 20
    },
    formControl: {
        minWidth: 250,
    },
    btnAdd: {
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
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        marginTop: 10,
        fontSize: 12
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
        fontSize: 12
    },
}))

export default Add_HV_Request;
