import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Avatar, Grid, Paper, } from "@material-ui/core";
import { PatientIn, SendIn } from '../../../Apis/PatientInQueue/index';

const drawerWidth = 240;

export function PatientInueue_List({ data }) {
    const classes = useStyles();
    const navigate = useNavigate();
    const theme = useTheme();
    const [sendIn, setsendIn] = useState([]);
    const [patientIn, setpatientIn] = useState([]);

    const fetchSendIn = async (id, UserId, FirstName) => {
        const data = await SendIn(id, UserId, FirstName);
        setsendIn(data);
        window.location.reload();
    }


    const fetchTreatNow = async (item) => {
        navigate('/DoctorPatientDetails_SendIn', { state: { details: item } })
    }

    if (data.length !== 0) {
        return (
            <>
                {data.map((item) => {

                    if (item.AppointmentStatus == 'Patient In') {
                        return (
                            <>
                                {item.ShortNote == 'Emergency' ? <>
                                    <Grid item xs={2} style={{ paddingTop: 10, marginLeft: '-30px' }}>
                                        <div>
                                            <center>
                                                {item.ProfileImage ?
                                                    <Avatar style={{ borderRadius: 50, height: 55, width: 55 }} src={item.ProfileImage} /> :
                                                    <Avatar style={{ borderRadius: 50, height: 55, width: 55 }} />}
                                            </center>
                                        </div>
                                        <Paper className={classes.paper2} elevation={4} style={{ marginRight: 25, marginLeft: 25, justifyContent: 'center', alignItems: 'center', marginTop: '-40px', borderRadius: 20, fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 400, }}>
                                            <Grid item xs={12} style={{
                                                color: '#2C7FB2', textAlign: 'center', paddingTop: 40, fontWeight: 600, fontSize: '13px', overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis', width: 120,
                                                marginTop: '-5px'
                                            }}>
                                                {item.FirstName} {item.LastName}
                                            </Grid>
                                            <Grid item xs={12} style={{ textAlign: 'center', color: '#2C7FB2' }}>
                                                {item.AppointmentTime}
                                            </Grid>
                                            <Grid item xs={12} style={{ textAlign: 'center', color: '#2C7FB2', paddingBottom: 10 }}>
                                                {item.AppointmentStatus}
                                                
                                            </Grid>
                                        </Paper>
                                        <div>
                                            <center>
                                                <Button size='small' onClick={() => fetchSendIn(item.id, item.UserId, item.FirstName)}
                                                    style={{ fontSize: '10px', color: 'white', marginTop: '-15px', backgroundColor: '#e50000', borderRadius: 5, paddingLeft: 20, paddingRight: 20, }}>Send In</Button>
                                            </center>
                                        </div>
                                    </Grid>
                                </> :
                                    <>
                                        <Grid item xs={2} style={{ paddingTop: 10, marginLeft: '-30px' }}>
                                            <div>
                                                <center>
                                                    {item.ProfileImage ?
                                                        <Avatar style={{ borderRadius: 50, height: 55, width: 55 }} src={item.ProfileImage} /> :
                                                        <Avatar style={{ borderRadius: 50, height: 55, width: 55 }} />}
                                                </center>
                                            </div>
                                            <Paper className={classes.paper} elevation={4} style={{ marginRight: 25, marginLeft: 25, justifyContent: 'center', alignItems: 'center', marginTop: '-40px', borderRadius: 20, fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 400, }}>
                                                <Grid item xs={12} style={{
                                                    color: '#2C7FB2', textAlign: 'center', paddingTop: 40, fontWeight: 600, fontSize: '13px', overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis', width: 120,
                                                    marginTop: '-5px'
                                                }}>
                                                    {item.FirstName} {item.LastName}
                                                </Grid>
                                                <Grid item xs={12} style={{ textAlign: 'center', color: '#2C7FB2' }}>
                                                    {item.AppointmentTime}
                                                </Grid>
                                                <Grid item xs={12} style={{ textAlign: 'center', color: '#2C7FB2', paddingBottom: 10 }}>
                                                    {item.AppointmentStatus}
                                                </Grid>
                                            </Paper>
                                            <div>
                                                <center>
                                                    <Button size='small' onClick={() => fetchSendIn(item.id, item.UserId, item.FirstName)}
                                                        style={{ fontSize: '10px', color: 'white', marginTop: '-15px', backgroundColor: '#78B088', borderRadius: 5, paddingLeft: 20, paddingRight: 20, }}>Send In</Button>
                                                </center>
                                            </div>
                                        </Grid>
                                    </>}
                            </>
                        ); //return close

                    } //if close
                    else if (item.AppointmentStatus == 'Send In') {
                        return (
                            <>
                                <Grid item xs={2} style={{ marginTop: 5, marginLeft: '-30px', cursor: 'pointer', marginBottom: 0, paddingBottom: 0 }} onClick={() => fetchTreatNow(item)}>
                                    <Grid item xs={6} sm={12} style={{ flex: 1, justifyContent: 'center', textAlign: 'center' }}>
                                        <center> {item.ProfileImage ?
                                            <Avatar style={{ borderRadius: 50, height: 55, width: 55 }} src={item.ProfileImage} /> :
                                            <Avatar style={{ borderRadius: 50, height: 55, width: 55 }} />} </center>
                                    </Grid>
                                    <Paper className={classes.paper} elevation={4} style={{ marginRight: 25, marginLeft: 25, flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '-40px', borderRadius: 20, fontFamily: '"Poppins", san-serif;', fontStyle: 'normal', fontWeight: 400, backgroundColor: '#78B088' }}>
                                        <Grid item xs={12} style={{
                                            color: '#fff', textAlign: 'center', paddingTop: 40, overflow: 'hidden', fontSize: '13px',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis', width: 120,
                                            marginTop: '-5px'
                                        }}>
                                            {item.FirstName} {item.LastName}
                                        </Grid>
                                        <Grid item xs={12} style={{ textAlign: 'center', color: '#fff' }}>
                                            {item.AppointmentTime}
                                        </Grid>
                                        <Grid item xs={12} style={{ textAlign: 'center', color: '#fff', paddingBottom: 10 }}>
                                            {/* {item.AppointmentStatus} */}<br/>
                                        </Grid>
                                        {/* <Grid item xs={12} style={{ marginTop: 5 }}>
                                            <Typography style={{ textAlign: 'center', color: '#fff', fontWeight: 600, fontSize: 18 }}> Treat Now </Typography>
                                        </Grid> */}

                                    </Paper>
                                    <div>
                                        <center>
                                            <Button size='small' onClick={() => fetchTreatNow(item)}
                                                style={{ fontSize: '10px', color: 'white', marginTop: '-15px', backgroundColor: '#2C7FB2', borderRadius: 5, paddingLeft: 20, paddingRight: 20, }}>Treat Now</Button>
                                        </center>
                                    </div>
                                </Grid>
                            </>
                        ); //return close
                    }
                    // else if (item.ShortNote == 'Emergency') {
                    //     return (
                    //         <>

                    //         </>
                    //     );
                    // }
                    else {
                        return (
                            <>
                                <Grid item xs={2} style={{ paddingTop: 30, marginLeft: '-30px' }}>
                                    <Grid item xs={6} sm={12} style={{ flex: 1, justifyContent: 'center', textAlign: 'center' }}>
                                        <center>
                                            <Avatar style={{ borderRadius: 50, height: 60, width: 60 }} /> </center>
                                    </Grid>
                                    <Paper className={classes.paper} elevation={4} style={{ marginRight: 25, marginLeft: 25, flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '-40px', borderRadius: 20, fontFamily: '"Poppins", san-serif;', fontStyle: 'normal', fontWeight: 400, backgroundColor: '#fff' }}>
                                        <Grid item xs={12} style={{ textAlign: 'center', paddingTop: 40, paddingBottom: 40, fontSize: 14, fontFamily: 'Poppins', color: '#000' }}>
                                            No Patients
                                        </Grid>

                                    </Paper>
                                </Grid>
                            </>
                        );
                    }
                }
                )}
            </>
        );
    }
    else {
        return (
            <>
                <Grid item xs={2} style={{ paddingTop: 10, marginLeft: '-30px' }}>
                    <Grid item xs={6} sm={12} style={{ flex: 1, justifyContent: 'center', textAlign: 'center' }}>
                        <center>
                            <Avatar style={{ borderRadius: 50, height: 60, width: 60 }} /> </center>
                    </Grid>
                    <Paper className={classes.paper} elevation={4} style={{ marginRight: 25, marginLeft: 25, flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '-40px', borderRadius: 20, fontFamily: '"Poppins", san-serif;', fontStyle: 'normal', fontWeight: 400, backgroundColor: '#fff' }}>
                        <Grid item xs={12} style={{ textAlign: 'center', paddingTop: 40, paddingBottom: 40, fontSize: 14, fontFamily: 'Poppins', color: '#000' }}>
                            No Patients
                        </Grid>
                    </Paper>
                </Grid>
            </>
        );
    }
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
    paper2: {
        padding: theme.spacing(1),
        color: '#2C7FB2',
        fontFamily: 'Poppins',
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
        marginLeft: 30,
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
}));