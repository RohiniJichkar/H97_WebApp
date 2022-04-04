import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AdminNavbar from './Admin_Navbar';
import { DataGrid } from '@material-ui/data-grid';
import ip from '../ipaddress/ip';
import axios from 'axios';
import { Appointment_Details } from '../Admin_Apis/Dashboard/index';

import { Container, Typography, Button, Grid, Paper, Avatar, CssBaseline, Box } from "@material-ui/core";

const columns = [
    {
        field: 'fullName',
        headerName: 'PatientName',
        editable: true,
        headerAlign: 'center',
        align: 'center',
        width: 220,
        valueGetter: (params) =>
            `${params.getValue(params.id, 'FirstName') || ''} ${params.getValue(params.id, 'LastName') || ''
            }`,


    },
    {
        field: 'DoctorName',
        headerName: 'DoctorName',
        editable: true,
        headerAlign: 'center',
        align: 'center',
        width: 290,
        valueGetter: (params) =>
            `${params.getValue(params.id, 'DFName') || ''} ${params.getValue(params.id, 'DLName') || ''
            }`,
    },

    {
        field: 'AppointmentType',
        headerName: 'AppointmentType',
        headerAlign: 'center',
        align: 'center',
        width: 180,
        editable: true,

    },
    {
        field: 'AppointmentDate',
        headerName: 'Date',
        headerAlign: 'center',
        align: 'center',
        width: 220,
        editable: true,

    },
    {
        field: 'AppointmentTime',
        headerName: 'Time',
        width: 180,
        headerAlign: 'center',
        align: 'center',
        editable: true,

    },

    {
        field: 'AppointmentChannel',
        headerName: 'Channel',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        editable: true,

    },
];



export default function AdminDashboard() {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [startdate, setstartdate] = useState('');
    const [endDate, setendDate] = useState('');
    const [Clinic, setClinic] = useState([]);
    const [ClinicId, setClinicId] = useState('');
    const [appointments, setappointments] = useState('');

    const [records, setrecords] = useState('');
    const [details, setdetails] = useState([]);
    const [appointmentlist, setappointmentlist] = useState([]);
    const [norecords, setnorecords] = useState('15');


    const fetchDailyAppointments = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let userid = parsed.userid;
        const appInfo = await axios.post(ip + 'Web_Admin_DashboardReport', { DoctorId: userid })
        setappointments(appInfo?.data);
    }

    const fetchDefaultAppointments = async () => {
        try {
            const appInfo = await axios.post(ip + 'Web_Admin_DashboardTodaysAppointments');
            setdetails(appInfo?.data?.Appointment);
        } catch (e) {
            console.log(e);
        }
    }

    const fetchClinics = async () => {
        try {
            const appInfo = await axios.post(ip + 'GetAllClinic')
            setClinic(appInfo?.data?.Clinic);
        } catch (e) {
            console.log(e);
        }
    }

    const fetchAppointments = async (startdate, endDate, clinicid) => {
        const appInfo = await axios.post(ip + 'Web_Admin_DashboardAppointmentsByDate', { StartDate: startdate, EndDate: endDate, ClinicId: clinicid })
        setdetails(appInfo?.data?.Appointment);
        console.log(appInfo);

    }

    const Show_appointmentsbydate = async (startdate, endDate, clinicid) => {
        try {
            const request = await Appointment_Details(startdate, endDate, clinicid);
            setrecords(request)

        }
        catch (e) {
            console.log(e);
        }


    }

    useEffect(() => {
        fetchDailyAppointments();
        fetchDefaultAppointments();
        fetchClinics();
    }, [])


    return (


        <div style={{ backgroundColor: '#ffffff', marginLeft: '84px', overflow: 'hidden' }}>
            <AdminNavbar />


            {/* main grid */}
            <Grid container spacing={2} style={{ marginTop: '64px' }}
                className={clsx(classes.grid, {
                    [classes.gridShift]: open,
                })}

                direction="row"
                alignItems="center"
                justify="center"

            >

                {/* Reports Grid Start */}
                <Grid item className={classes.griditem} xs={12} sm={3} style={{ borderRight: '1px solid gray', height: 70 }}>
                    <Paper className={classes.paper} elevation={0} >
                        <div className="row" style={{ padding: theme.spacing(0), color: '#78B088' }}>
                            <Typography variant="h7" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#78B088',
                                    fontWeight: 600,
                                    fontSize: 17

                                }}
                            >
                                TODAY'S APPOINTMENTS
                            </Typography>
                        </div>
                        <div className="row" style={{ padding: theme.spacing(0), color: '#00318B' }}>
                            {
                                <Typography variant="h5" noWrap={true}>

                                    {appointments.TodaysAppRecord ? appointments.TodaysAppRecord[0].TodaysAppReport : 0}
                                </Typography>
                            }
                        </div>
                    </Paper>
                </Grid>
                <Grid item className={classes.griditem} xs={12} sm={3} style={{ borderRight: '1px solid gray', height: 70 }}>
                    <Paper className={classes.paper} elevation={0} >
                        <div className="row" style={{ padding: theme.spacing(0), color: '#78B088' }}>
                            <Typography variant="h7" noWrap={true}
                                style={{
                                    fontFamily: '"Poppins", san-serif;',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#78B088',
                                    fontWeight: 600,
                                    fontSize: 17
                                }}>
                                COMPLETED APPOINTMENTS
                            </Typography>
                        </div>
                        <div className="row" style={{ padding: theme.spacing(0), color: '#00318B' }}>
                            <Typography variant="h5" noWrap={true}>

                                {appointments.CompletedAppRecord ? appointments.CompletedAppRecord[0].CompletedAppReport : 0}
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
                <Grid item className={classes.griditem} xs={12} sm={3} style={{ borderRight: '1px solid gray', height: 70 }}>
                    <Paper className={classes.paper} elevation={0} style={{}}>
                        <div className="row" style={{ padding: theme.spacing(0), color: '#78B088', }}>
                            <Typography variant="h7" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#78B088',
                                    fontWeight: 600,
                                    fontSize: 17
                                }}
                            >
                                TODAY'S REGISTRATION
                            </Typography>
                        </div>
                        <div className="row" style={{ padding: theme.spacing(0), color: '#00318B' }}>
                            <Typography variant="h5" noWrap={true}>
                                {appointments.RegistrationRecord ? appointments.RegistrationRecord[0].DailyReport : 0}
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
                <Grid item className={classes.griditem} xs={12} sm={3} style={{ borderRight: '1px solid gray', height: 70 }} >
                    <Paper className={classes.paper} elevation={0} >
                        <div className="row" style={{ padding: theme.spacing(0), color: '#78B088' }}>
                            <Typography variant="h7" noWrap={true}
                                style={{
                                    fontFamily: '"Poppins", san-serif;',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#78B088',
                                    fontWeight: 600,
                                    fontSize: 17
                                }}>
                                MONTHLY APPOINTMENTS
                            </Typography>
                        </div>
                        <div className="row" style={{ padding: theme.spacing(0), color: '#00318B' }}>
                            <Typography variant="h5" noWrap={true}>
                                {appointments.MonthlyRecord ? appointments.MonthlyRecord[0].MonthlyReport : 0}
                            </Typography>
                        </div>

                    </Paper>

                </Grid>
            </Grid>
            <div class="flex-container" style={{ display: 'flex', boxShadow: '10px 5px 5px gray', marginLeft: '-35px' }}>
                <div style={{ margin: '10px', padding: '20px' }}></div>
            </div>
            <div className='row' style={{ marginTop: '30px', marginLeft: '-39px', }}>
                <Typography style={{ marginTop: '-3px', color: '#2C7FB2', fontWeight: 'bold', fontSize: '22px', marginLeft: '-3px', textAlign: 'center' }}>Clinic Appointments</Typography>
                <div className='col-3' style={{ marginLeft: '43px', marginBottom: '12px' }} >

                    <label style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#707070' }}>Startdate</label>

                    <input
                        id="fromdate"
                        type="date"
                        value={startdate}
                        onChange={(e) => {
                            setstartdate(e.target.value)
                        }}
                        style={
                            {
                                border: '1px solid #F0F0F0',
                                height: 30,
                                fontFamily: 'Poppins',
                                paddingLeft: 15,
                                color: '#707070',
                                marginLeft: '12px'

                            }
                        }
                    />
                </div>
                <div className='col-3'>
                    <label style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#707070' }}>Enddate</label>
                    <input id="fromdate" type="date" value={endDate} onChange={(e) => {
                        setendDate(e.target.value)
                    }} style={{ border: '1px solid #F0F0F0', marginLeft: '12px', marginRight: '34px', height: 30, fontFamily: 'Poppins', color: '#707070' }} />
                </div>
                <div className='col-4'>

                    <select id="dropdown" value={ClinicId} onChange={(e) => setClinicId(e.target.value)} style={{ height: 30, width: '193px', border: '1px solid #F0F0F0', fontFamily: 'Poppins', marginLeft: '35px', marginLeft: '1px' }}>
                        <option>SelectClinic</option>
                        {Clinic.map(v => (<option value={v.ClinicId}>{v.ClinicName}</option>))}
                    </select>
                </div>

                <div className='col-1'>
                    <Button
                        variant="contained"
                        color="#2C7FB2"
                        style={{
                            backgroundColor: '#2C7FB2',
                            color: '#fff',
                            fontFamily: 'Poppins',
                            height: 30,
                            marginLeft: 42
                        }}
                        onClick={() => { Show_appointmentsbydate(startdate, endDate, ClinicId); fetchAppointments(startdate, endDate, ClinicId) }}
                    >
                        view
                    </Button>
                </div>
            </div>
            <div >
                <CssBaseline />

                <Grid container spacing={2} style={{ marginTop: '-0' }}
                    className={clsx(classes.grid, {
                        [classes.gridShift]: open,
                    })}
                    direction="row"
                    alignItems="center"
                    justify="center"

                >

                    {/* Reports Grid Start */}
                    <Grid item className={classes.griditem} xs={12} sm={3} style={{ borderRight: '1px solid gray', height: 70 }}>
                        <Paper className={classes.paper} elevation={0} >
                            <div className="row" style={{ padding: theme.spacing(0), color: '#78B088' }}>
                                <Typography variant="h7" noWrap={true}
                                    style={{
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        color: '#78B088',
                                        fontWeight: 600,
                                        fontSize: 17
                                    }}
                                >
                                    TOTAL APPOINTMENTS
                                </Typography>
                            </div>
                            <div className="row" style={{ padding: theme.spacing(0), color: '#00318B' }}>
                                {
                                    <Typography variant="h5" noWrap={true}>
                                        {records.TodaysAppRecord ? records.TodaysAppRecord[0].TodaysAppReport : 0}
                                        {/* {(appointments.DailyAppointment !== null || appointments.DailyAppointment != 0) ? appointments.DailyAppointment : 0} */}
                                    </Typography>
                                }
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.griditem} xs={12} sm={3} style={{ borderRight: '1px solid gray', height: 70 }}>
                        <Paper className={classes.paper} elevation={0} >
                            <div className="row" style={{ padding: theme.spacing(0), color: '#78B088' }}>
                                <Typography variant="h7" noWrap={true}
                                    style={{
                                        fontFamily: '"Poppins", san-serif;',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        color: '#78B088',
                                        fontWeight: 600,
                                        fontSize: 17
                                    }}>
                                    COMPLETED APPOINTMENTS
                                </Typography>
                            </div>
                            <div className="row" style={{ padding: theme.spacing(0), color: '#00318B' }}>
                                <Typography variant="h5" noWrap={true}>
                                    {records.CompletedAppRecord ? records.CompletedAppRecord[0].CompletedAppReport : 0}
                                    {/* {(appointments.PatientInQueueAppointments !== null || appointments.PatientInQueueAppointments != 0) ? (appointments.PatientInQueueAppointments) : (0)} */}
                                </Typography>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.griditem} xs={12} sm={3} style={{ borderRight: '1px solid gray', height: 70 }}>
                        <Paper className={classes.paper} elevation={0} style={{}}>
                            <div className="row" style={{ padding: theme.spacing(0), color: '#78B088', }}>
                                <Typography variant="h7" noWrap={true}
                                    style={{
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        color: '#78B088',
                                        fontWeight: 600,
                                        fontSize: 17
                                    }}
                                >
                                    TOTAL REGISTRATIONS
                                </Typography>
                            </div>
                            <div className="row" style={{ padding: theme.spacing(0), color: '#00318B' }}>
                                <Typography variant="h5" noWrap={true}>
                                    {records.RegistrationRecord ? records.RegistrationRecord[0].DailyReport : 0}
                                    {/* {todaysregistration.DailyRecord ? todaysregistration.DailyRecord[0].DailyReport : 0} */}
                                </Typography>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.griditem} xs={12} sm={3} style={{ borderRight: '1px solid gray', height: 70 }} >
                        <Paper className={classes.paper} elevation={0} >
                            <div className="row" style={{ padding: theme.spacing(0), color: '#78B088' }}>
                                <Typography variant="h7" noWrap={true}
                                    style={{
                                        fontFamily: '"Poppins", san-serif;',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        color: '#78B088',
                                        fontWeight: 600,
                                        fontSize: 17

                                    }}>
                                    MONTHLY APPOINTMENTS
                                </Typography>
                            </div>
                            <div className="row" style={{ padding: theme.spacing(0), color: '#00318B' }}>
                                <Typography variant="h5" noWrap={true}>
                                    {records.MonthlyRecord ? records.MonthlyRecord[0].MonthlyReport : 0}
                                </Typography>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>

            </div>
            <Box
                sx={{

                    '& .super-app-theme--header': {
                        backgroundColor: '#78B088',
                        color: '#fff',

                        fontSize: 14
                    },
                }}
            >
                <DataGrid
                    style={{ height: 205, width: 1260, marginTop: 40, fontSize: 12, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2', cursor: 'pointer' }}
                    rows={details ? details : fetchAppointments}
                    rowHeight={20}
                    columns={columns}
                    columnWidth={5}
                    pageSize={10}


                />
            </Box>

        </div>





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
        marginTop: 20,
        marginLeft: 30,
        marginRight: 1,
        borderRight: '1px solid black'

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
    btn: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 600,
        textAlign: 'center',

        fontSize: '10px'
    },
}));



