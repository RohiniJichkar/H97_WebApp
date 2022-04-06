import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, IconButton, DialogContent, FormControl, Select, DialogTitle, DialogContentText, Typography, Grid, TextField, Button } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { transparent } from 'material-ui/styles/colors';
import { Time, Note_for_Doctor, Edit_App_for_Dashboard } from '../../../Apis/Dashboard/Edit_Appointment_From_PatientIn/index';
import Cancel_Appointment from './Alert';
import moment from 'moment';
const drawerWidth = 240;

export const Show_Appointment_details = ({ show, data, handlemodal }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [maxWidth, setMaxWidth] = useState('sm');
    const [fullWidth, setFullWidth] = React.useState(true);
    const [time, settime] = useState([]);
    const [doctorsNote, setdoctorsNote] = useState([]);
    const [reason, setReason] = useState(data.items.AppointmentReason ? data.items.AppointmentReason : '');
    const [notefordoctor, setnotefordoctor] = useState(data.items.ShortNote ? data.items.ShortNote : '');
    const [bp, setBp] = useState(data.items.Patient_BP ? data.items.Patient_BP : '');
    const [temp, setTemp] = useState(data.items.Patient_Temp ? data.items.Patient_Temp : '');
    const [height, setHeight] = useState(data.items.Patient_Height ? data.items.Patient_Height : '');
    const [weight, setWeight] = useState(data.items.Patient_Weight ? data.items.Patient_Weight : '');
    const [plus, setPlus] = useState(data.items.Patient_Plus ? data.items.Patient_Plus : '');
    const [spo2, setSpo2] = useState(data.items.Patient_SPO2 ? data.items.Patient_SPO2 : '');
    const [appDate, setappDate] = useState(data.items.AppointmentDate ? data.items.AppointmentDate : '');
    const [appTime, setappTime] = useState(data.items.AppointmentTime ? data.items.AppointmentTime : '');
    const [OpenModal, setOpenModal] = useState(false)

    console.log(data)
    useEffect(() => {
        fetchtimings();
        fetchNotefordoctor();
    }, [])

    const fetchtimings = async () => {
        const timingInfo = await Time()
        settime(timingInfo);
    }

    const fetchNotefordoctor = async () => {
        const doctorsNoteInfo = await Note_for_Doctor()
        setdoctorsNote(doctorsNoteInfo);
    }
    var datedata = new Date();
    var tdate = datedata.toISOString().split('T')[0];

    const EditAppointmentDetails = async () => {
        const currentTime = new Date();
        let systemTime = currentTime.toTimeString();
        let tdate = currentTime.toISOString().split('T')[0];
        if (appTime < systemTime) {
            alert(`You can't not set Appointment at ${appTime}`);
            return
        }
        else if (appDate < tdate) {
            alert(`You cannot set appointment for ${appDate}`);
            return
        }
        const obj = {
            AppointmentStatus: 'Patient In',
            AppointmentTime: appTime,
            AppointmentDate: appDate,
            Patient_BP: bp,
            Patient_Weight: weight,
            Patient_Height: height,
            Patient_SPO2: spo2,
            Patient_Plus: plus,
            Patient_Temp: temp,
            ShortNote: notefordoctor,
            AppointmentReason: reason,
            id: data.items.id
        }
        const editrequest = await Edit_App_for_Dashboard(obj);
        let parse = JSON.parse(editrequest);
        if (parse.success === "200") {
            alert(parse.message);
            handlemodal();
            window.location.reload()
        }
        else {
            alert(parse.message);
        }

    }

    return (
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={show}
                // BackdropProps={{ invisible: true }}
                // PaperProps={{
                //     style: {
                //       backgroundColor: 'transparent',
                //       boxShadow: 'none',
                //     },
                //   }}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Appointment Details"}
                    <IconButton edge="start" color="inherit" onClick={() => handlemodal(false)} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container>
                            <Grid item xs={12} sm={6}>

                                <Typography variant="h5" noWrap={true}
                                    style={{
                                        fontFamily: '"Poppins", san-serif;',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        color: '#707070',
                                        fontSize: 16,
                                        marginTop: -10
                                    }}>
                                    {data.items.FirstName} {data.items.LastName}
                                </Typography>

                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <Typography variant="h5" noWrap={true}
                                    style={{
                                        fontFamily: '"Poppins", san-serif;',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        color: '#707070',
                                        fontSize: 16,
                                        marginTop: -10
                                    }}>
                                    PID:- {data.items.UserId}
                                </Typography>

                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <Typography variant="h5" noWrap={true}
                                    style={{
                                        fontFamily: '"Poppins", san-serif;',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        color: '#707070',
                                        fontSize: 16,
                                        marginTop: 10
                                    }}>
                                    Mobile Number:
                                </Typography>

                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <Typography variant="h5" noWrap={true}
                                    style={{
                                        fontFamily: '"Poppins", san-serif;',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        color: '#707070',
                                        fontSize: 16,
                                        marginTop: 10
                                    }}>
                                    {data.items.MobileNo}
                                </Typography>

                            </Grid>
                            <Grid item xs={12} sm={6} style={{ marginTop: 10 }}>

                                <Typography variant="h5" noWrap={true}
                                    style={{
                                        fontFamily: '"Poppins", san-serif;',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        color: '#707070',
                                        fontSize: 16,
                                    }}>
                                    Appointment Time: {appTime ? appTime : 'NA'}
                                </Typography>

                            </Grid>
                            <Grid item xs={12} sm={6} style={{ marginTop: 10 }}>

                                <Typography variant="h5" noWrap={true}
                                    style={{
                                        fontFamily: '"Poppins", san-serif;',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        color: '#707070',
                                        fontSize: 16,
                                    }}>
                                    Appointment Date:  {appDate ? moment(appDate).format("DD/MM/YYYY") : 'NA'}
                                </Typography>

                            </Grid>
{/* 
                            <Grid item xs={12} sm={6} >

                                <Typography variant="h5" noWrap={true}
                                    style={{
                                        fontFamily: '"Poppins", san-serif;',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        color: '#707070',
                                        fontSize: 16,
                                    }}>
                                    {appTime ? appTime : 'NA'}
                                </Typography>

                            </Grid>
                            <Grid item xs={12} sm={6} >

                                <Typography variant="h5" noWrap={true}
                                    style={{
                                        fontFamily: '"Poppins", san-serif;',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        color: '#707070',
                                        fontSize: 16,
                                    }}>
                                    {appDate ? moment(appDate).format("DD/MM/YYYY") : 'NA'}
                                </Typography>

                            </Grid> */}

                            <Grid container>
                                <Grid item xs={12} sm={12} style={{ marginTop: 10 }}>
                                    <Typography variant="h5" noWrap={true}
                                        style={{
                                            fontFamily: '"Poppins", san-serif;',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            color: '#2C7FB2',
                                            fontSize: 18,
                                        }}>
                                        Vital Information
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container style={{ marginTop: 10 }}>
                                <Grid item xs={4}>

                                    <Typography variant="h5" noWrap={true}
                                        style={{
                                            fontFamily: '"Poppins", san-serif;',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            color: '#707070',
                                            fontSize: 18,
                                        }}>
                                        BP: {bp ? bp : 'NA'}
                                    </Typography>

                                    {/* <TextField
                                        InputProps={{
                                            className: classes.vitalinputs,
                                            className: classes.vitaltextField
                                        }}
                                        label="BP"
                                        value={bp}
                                        id="outlined-size-small"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setBp(e.target.value)
                                            }
                                        }}
                                        style={{ marginRight: 10 }}
                                    /> */}
                                </Grid>
                                <Grid item xs={4} >

                                    <Typography variant="h5" noWrap={true}
                                        style={{
                                            fontFamily: '"Poppins", san-serif;',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            color: '#707070',
                                            fontSize: 18,
                                        }}>
                                        temp: {temp ? temp : 'NA'}
                                    </Typography>

                                    {/* <TextField
                                        InputProps={{
                                            className: classes.vitalinputs,
                                            className: classes.vitaltextField
                                        }}
                                        label="Temp"
                                        value={temp}
                                        id="outlined-size-small"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setTemp(e.target.value)
                                            }
                                        }}
                                        style={{ marginRight: 10 }}
                                    /> */}
                                </Grid>
                                <Grid item xs={4}>

                                    <Typography variant="h5" noWrap={true}
                                        style={{
                                            fontFamily: '"Poppins", san-serif;',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            color: '#707070',
                                            fontSize: 18,
                                        }}>
                                        Height: {height ? height : 'NA'}
                                    </Typography>

                                    {/* <TextField
                                        InputProps={{
                                            className: classes.vitalinputs,
                                            className: classes.vitaltextField
                                        }}
                                        label="Height"
                                        value={height}
                                        id="outlined-size-small"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setHeight(e.target.value)
                                            }
                                        }}
                                    /> */}
                                </Grid>
                            </Grid>

                            <Grid container style={{ marginTop: 15 }}>
                                <Grid item xs={4} >

                                    <Typography variant="h5" noWrap={true}
                                        style={{
                                            fontFamily: '"Poppins", san-serif;',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            color: '#707070',
                                            fontSize: 18,
                                        }}>
                                        Weight: {weight ? weight : 'NA'}
                                    </Typography>

                                    {/* <TextField
                                        InputProps={{
                                            className: classes.vitalinputs,
                                            className: classes.vitaltextField
                                        }}

                                        label="Weight"
                                        value={weight}
                                        id="outlined-size-small"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setWeight(e.target.value)
                                            }
                                        }}
                                        style={{ marginRight: 10 }}
                                    /> */}
                                </Grid>
                                <Grid item xs={4}>

                                    <Typography variant="h5" noWrap={true}
                                        style={{
                                            fontFamily: '"Poppins", san-serif;',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            color: '#707070',
                                            fontSize: 18,
                                        }}>
                                        SPO2: {spo2 ? spo2 : 'NA'}
                                    </Typography>

                                    {/* <TextField
                                        InputProps={{
                                            className: classes.vitalinputs,
                                            className: classes.vitaltextField
                                        }}
                                        label="SPO2"
                                        value={spo2}
                                        id="outlined-size-small"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setSpo2(e.target.value)
                                            }
                                        }}
                                        style={{ marginRight: 10 }}
                                    /> */}
                                </Grid>
                                <Grid item xs={4} >

                                    <Typography variant="h5" noWrap={true}
                                        style={{
                                            fontFamily: '"Poppins", san-serif;',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            color: '#707070',
                                            fontSize: 18,
                                        }}>
                                        Pulse Rate: {plus ? plus : 'NA'}
                                    </Typography>

                                    {/* <TextField
                                        InputProps={{
                                            className: classes.vitalinputs,
                                            className: classes.vitaltextField
                                        }}

                                        label="Pulse Rate"
                                        value={plus}
                                        id="outlined-size-small"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setPlus(e.target.value)
                                            }
                                        }}
                                    /> */}
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={6} style={{ marginTop: 17 }}>
                                <Typography variant="h5" noWrap={true}
                                    style={{
                                        fontFamily: '"Poppins", san-serif;',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        color: '#707070',
                                        fontSize: 18,
                                    }}>
                                    Reason : {reason ? reason : 'NA'}
                                </Typography>
                                <Typography variant="h5" noWrap={true}
                                    style={{
                                        fontFamily: '"Poppins", san-serif;',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        color: '#707070',
                                        fontSize: 18,
                                        marginTop: 7
                                    }}>
                                    Note For Doctor : {notefordoctor ? notefordoctor : 'NA'}
                                </Typography>
                                {/* <TextField className={classes.inputFields} size='small' value={reason} onChange={(e) => setReason(e.target.value)} id="outlined-basic" label="Reason" variant="outlined" /> */}
                            </Grid>
                            {OpenModal ? <Cancel_Appointment show={OpenModal} data={data.items} handleclose={() => setOpenModal(false)} /> : null}
                            <Grid item xs={12} sm={6} style={{ marginTop: 12 }}>
                                {/* <FormControl variant="outlined" size="small" className={classes.formControl}>
                                    <Select
                                        className={classes.textField}
                                        native
                                        value={notefordoctor}
                                        onChange={(e) => setnotefordoctor(e.target.value)}
                                        label="time"
                                        inputProps={{
                                            name: 'time',
                                            id: 'outlined-appointment-native-simple',
                                        }}

                                        style={{ width: '150%', color: '#707070', fontSize: 14, fontWeight: 400, fontFamily: 'Poppins' }}

                                    >
                                        <option aria-label="None" value="" >Note For Doctor</option>
                                        {doctorsNote.map(v => (<option value={v.NoteForDoctor}>{v.NoteForDoctor}</option>))}
                                    </Select>
                                </FormControl> */}
                            </Grid>

                            {data.items.AppointmentDate > tdate ?
                                <Grid container xs={12} style={{ marginTop: 5 }}>
                                    <Grid item sm={12} >
                                        <Button className={classes.btnregister} onClick={() => setOpenModal(true)} style={{ float: 'right', marginRight: 20 }}>Cancel</Button>
                                    </Grid>
                                </Grid> : null}
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
    btnYes: {
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
    inputFields: {
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
        fontSize: 12
    },
}));