import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { Typography, IconButton, Grid, Paper, FormControl, Select, Box } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Doctor_Pdf_Viewer from '../../Pdf_Viewer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, connect, useSelector } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
//apis
import { GetAppointmentStatus, Appointment_Details_by_date } from '../../../Apis/payment_reports_apis/index';
import Show_pdf_data from '../../Pdf_Viewer/Modal/index';
import { relativeTimeRounding } from 'moment';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const defaultMaterialTheme = createTheme({
    palette: {
        primary: {
            main: '#1769aa',
        },
    },
});

var columns = [
    {
        field: 'UserId',
        headerName: 'Patient ID',
        width: 140,
        headerClassName: 'super-app-theme--header',
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        sortable: false,
        width: 150,
        headerClassName: 'super-app-theme--header',
        valueGetter: (params) =>
            `${params.getValue(params.id, 'FirstName') || ''} ${params.getValue(params.id, 'LastName') || ''
            }`,
    },
    {
        field: 'doctorName',
        headerName: 'Doctor',
        width: 150,
        editable: false,
        headerClassName: 'super-app-theme--header',
        valueGetter: (params) =>
            params.row.DFName ?
                `${params.getValue(params.id, 'DFName') || ''} ${params.getValue(params.id, 'DLName') || ''
                }`
                :
                `${params.getValue(params.id, 'HFName') || ''} ${params.getValue(params.id, 'HLName') || ''
                }`
        ,
    },
    {
        field: 'AppointmentDate',
        headerName: 'Date',
        width: 160,
        headerClassName: 'super-app-theme--header',
        editable: true,
    },
    {
        field: 'AppointmentTime',
        headerName: 'Time',
        width: 120,
        headerClassName: 'super-app-theme--header',
        editable: true,
    },
    {
        field: 'AppointmentStatus',
        headerName: 'Status',
        width: 160,
        headerClassName: 'super-app-theme--header',
        editable: true,
    },
    {
        field: 'AppointmentChannel',
        headerName: 'Channel',
        width: 180,
        headerClassName: 'super-app-theme--header',
        editable: true,
    },
    {
        field: 'PaymentMode',
        headerName: 'Mode',
        width: 150,
        headerClassName: 'super-app-theme--header',
        editable: true,
    },
    {
        field: 'TotalAmount',
        headerName: 'Payment',
        width: 150,
        headerClassName: 'super-app-theme--header',
        editable: true,
    },
];

var columnsforpdf = [
    {
        headerName: 'Full name',
    },
    {
        headerName: 'Date',
    },
    {
        headerName: 'Time',
    },
    // {
    //     field: 'AppointmentReason',
    //     headerName: 'Appointment Reason',
    //     width: 220,
    //     editable: true,
    // },
    {
        headerName: 'Status',
    },
    {
        headerName: 'Channel',
    },
    {
        headerName: 'Mode',
    },
    {
        headerName: 'Payment',
    },
];

const AppointmentReports = () => {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate()
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();
    const [appointmentlist, setappointmentlist] = useState([]);
    const [startdate, setstartdate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());
    const [doctor, setDoctor] = React.useState('');
    const [status, setstatus] = useState('');
    const [appStatus, setappStatus] = useState([]);
    const [norecords, setnorecords] = useState('15');
    const [view, setview] = useState(false);


    useEffect(() => {
        fetch_AppointmentStatus()
    }, [])

    const fetch_AppointmentStatus = async () => {
        try {
            const request = await GetAppointmentStatus();
            if (request) {
                setappStatus(request)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const Show_appointmentsbydate = async (startdate, endDate, status) => {
        let sDate = startdate.toISOString().split('T')[0];
        let eDate = endDate.toISOString().split('T')[0];

        try {
            const request = await Appointment_Details_by_date(sDate, eDate, status);
            if (request.success === "200") {
                setappointmentlist(request.Report)
                console.log(request.Report)
            }
            else {
                alert(request.message);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className={classes.root} style={{ backgroundColor: '#ffffff' }}>
                {/* <Grid container >
                    <Grid item xs={1}>
                        <label style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#707070' }}>From</label>
                    </Grid>
                    <Grid item xs={2}>
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
                                    color: '#707070'
                                }
                            }
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <label style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#707070' }}>To</label>
                    </Grid>
                    <Grid item xs={2}>
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
                                    color: '#707070'
                                }
                            }
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <label style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#707070' }}>Appointment Status</label>
                    </Grid>
                    <Grid item xs={2}>
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
                                    color: '#707070'
                                }
                            }
                        />
                    </Grid>

                </Grid> */}
                <div className='row' style={{ display: 'flex' }}>
                    <div className='col-3'>
                        <label style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#707070' }}>From</label>
                        <ThemeProvider theme={defaultMaterialTheme}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    autoOk
                                    size='small'
                                    value={startdate}
                                    onChange={setstartdate}
                                    inputVariant="outlined"
                                    format='dd/MM/yyyy'
                                    style={{ marginTop: -5, marginLeft: 15, width: 190 }}
                                />
                            </MuiPickersUtilsProvider>
                        </ThemeProvider>
                        {/* <input
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
                                    color: '#707070'
                                }
                            }
                        /> */}
                    </div>
                    <div className='col-3'>
                        <label style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#707070', marginLeft: 20 }}>To</label>
                        <ThemeProvider theme={defaultMaterialTheme}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    autoOk
                                    size='small'
                                    value={endDate}
                                    onChange={setendDate}
                                    inputVariant="outlined"
                                    format='dd/MM/yyyy'
                                    style={{ marginTop: -5, marginLeft: 15, width: 190 }}
                                />
                            </MuiPickersUtilsProvider>
                        </ThemeProvider>
                        {/* <input id="fromdate" type="date" value={endDate} onChange={(e) => {
                            setendDate(e.target.value)
                        }} style={{ border: '1px solid #F0F0F0', height: 30, fontFamily: 'Poppins', color: '#707070', paddingLeft: 15 }} /> */}
                    </div>
                    <div className='col-2'>
                        <label style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#707070' }}>Status</label>
                        <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '65%', marginLeft: '20px', marginTop: -3 }} >
                            <Select
                                className={classes.textFieldForm}
                                size='large'
                                native
                                value={status}
                                onChange={(e) => setstatus(e.target.value)}
                                inputProps={{
                                    name: 'doctor',
                                    id: 'outlined-doctor-native-simple',
                                }}
                                style={{ width: '120%', fontSize: 14, marginTop: -25, marginLeft: 50 }}
                            >
                                <option value="N/A">Select</option>
                                {appStatus.map(v => (<option value={v.AppointmentStatus}>{v.AppointmentStatus}</option>))}
                            </Select>
                        </FormControl>
                        {/* <select id="dropdown" value={status} onChange={(e) => setstatus(e.target.value)} style={{ height: 30, border: '1px solid #F0F0F0', fontFamily: 'Poppins', paddingLeft: 15 }}>
                        <option value="N/A">Select</option>
                        {appStatus.map(v => (<option value={v.AppointmentStatus}>{v.AppointmentStatus}</option>))}
                    </select> */}
                    </div>
                    <div className='col-2'>
                        <label style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#707070', marginLeft: 55 }}>Pages</label>
                        <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '65%', marginLeft: '20px', marginTop: -3 }} >
                            <Select
                                className={classes.textFieldForm}
                                size='large'
                                native
                                value={norecords}
                                onChange={(e) => setnorecords(e.target.value)}
                                inputProps={{
                                    name: 'doctor',
                                    id: 'outlined-doctor-native-simple',
                                }}
                                style={{ width: '115%', fontSize: 14, marginTop: -25, marginLeft: 100 }}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                                <option value="35">35</option>
                                <option value="40">40</option>
                            </Select>
                        </FormControl>
                        {/* <select id="dropdown" value={norecords} onChange={(e) => setnorecords(e.target.value)} style={{ width: 80, height: 30, border: '1px solid #F0F0F0', fontFamily: 'Poppins', paddingLeft: 15 }}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                            <option value="35">35</option>
                            <option value="40">40</option>
                        </select> */}
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
                                marginLeft: 112
                            }}
                            onClick={() => Show_appointmentsbydate(startdate, endDate, status)}
                        >
                            Show
                        </Button>
                    </div>
                    {/* <div className='col-1'>
                        <select id="dropdown" value={norecords} onChange={(e) => setnorecords(e.target.value)} style={{ width: 80, height: 30, border: '1px solid #F0F0F0', fontFamily: 'Poppins', paddingLeft: 15,position:'relative', left:215 }}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                            <option value="35">35</option>
                            <option value="40">40</option>
                        </select>
                    </div> */}
                </div>
                <Grid item xs={12} >
                    <Box
                        sx={{
                            '& .super-app-theme--header': {
                                // backgroundColor: '#78B088',
                                // color: '#fff
                                fontSize: 14,

                            },
                        }}
                    >
                        <DataGrid
                            style={{ height: 350, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2', marginTop: 20 }}
                            rows={appointmentlist}
                            rowHeight={30}
                            columns={columns}
                            columnWidth={5}
                            pageSize={norecords}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} >
                    <Button
                        variant="contained"
                        color="#2C7FB2"
                        style={{
                            backgroundColor: '#2C7FB2',
                            color: '#fff',
                            fontFamily: 'Poppins',
                            height: 30,
                            float: 'right',
                            marginTop: 15,
                        }}
                        onClick={() => {
                            if (appointmentlist.length == 0) {
                                alert('Please find some record first')
                                return;
                            }
                            else {
                                setview(true)
                            }
                        }
                        }
                    >
                        Download as PDF
                    </Button>
                    <Button
                        variant="contained"
                        color="#2C7FB2"
                        style={{
                            backgroundColor: '#2C7FB2',
                            color: '#fff',
                            fontFamily: 'Poppins',
                            height: 30,
                            float: 'right',
                            marginTop: 15, marginRight: 15
                        }}
                        onClick={() => {
                            setappointmentlist([]);
                            setstartdate('');
                            setendDate('');
                            setstatus('');
                        }}
                    >
                        Reset
                    </Button>
                </Grid>
                {view ? <Show_pdf_data show={view} data={appointmentlist} column={columnsforpdf} handleclose={() => setview(false)} /> : null}
            </div>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: 'white',
    },
    root2: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginTop: 70
    },
    formControl: {
        margin: theme.spacing(0),

    },
}));


export default connect()(AppointmentReports);
