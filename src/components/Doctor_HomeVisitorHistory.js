import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Grid, FormControl, Select, Box } from "@material-ui/core";
import DoctorNavbar from './Doctor_Navbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import Show_pdf_data from './Pdf_Viewer/Modal/index';
import { HVDoctors } from '../Apis/Book_Appointment/index';
import { HV_Appointments_by_date } from '../Apis/Home_Visitors/Home_Visitor_History/index'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const defaultMaterialTheme = createTheme({
    palette: {
        primary: {
            main: '#1769aa',
        },
    },
});

const drawerWidth = 240;

var columns = [
    {
        field: 'UserId',
        headerName: 'Patient ID',
        width: 140,
        headerClassName: 'super-app-theme--header',
        editable: true,
        align: 'center'
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        sortable: false,
        width: 150,
        headerClassName: 'super-app-theme--header',
        align: 'center',
        valueGetter: (params) =>
            `${params.getValue(params.id, 'FirstName') || ''} ${params.getValue(params.id, 'LastName') || ''
            }`,
    },
    {
        field: 'AppointmentDate',
        headerName: 'Date',
        width: 140,
        headerClassName: 'super-app-theme--header',
        editable: true,
        align: 'center'
    },
    {
        field: 'AppointmentTime',
        headerName: 'Time',
        width: 120,
        headerClassName: 'super-app-theme--header',
        editable: true,
        align: 'center'
    },
    {
        field: 'AppointmentStatus',
        headerName: 'Status',
        width: 130,
        headerClassName: 'super-app-theme--header',
        editable: true,
        align: 'center',

    },
    {
        field: 'HomeVisitReason',
        headerName: 'Reason',
        width: 150,
        headerClassName: 'super-app-theme--header',
        align: 'center'
    },
    {
        field: 'Address',
        headerName: 'Address',
        width: 180,
        headerClassName: 'super-app-theme--header',
        editable: true,
        align: 'right'
    },
    {
        field: 'PaymentMode',
        headerName: 'Mode',
        width: 130,
        headerClassName: 'super-app-theme--header',
        editable: true,
        align: 'center'
    },
    {
        field: 'TotalAmount',
        headerName: 'Total',
        width: 120,
        headerClassName: 'super-app-theme--header',
        editable: true,
        align: 'center'
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
    {
        headerName: 'Status',
    },
    {
        headerName: 'Reason',
    },
    {
        headerName: 'Mode',
    },
    {
        headerName: 'Payment',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 0.5,
        backgroundColor: 'white',
    },
    root2: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: 'white',
        marginTop: 70
    },
    grid: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginTop: 20,
        marginLeft: 25,
        marginRight: 1
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
        fontSize: '11px'
    },

    gridShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));


export default function DoctorHomeVisitHistory() {

    const navigate = useNavigate();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [appointmentlist, setappointmentlist] = useState([]);
    const [startdate, setstartdate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());
    const [doctorData, setdoctorData] = useState([]);
    const [doctor, setdoctor] = useState('');
    const [norecords, setnorecords] = useState('15');
    const [view, setview] = useState(false);

    console.log(appointmentlist)

    const handleGoBack = () => {
        navigate("/DoctorHomeVisitors");
    };


    const fetchdoctorsdata = async () => {
        const doctorInfo = await HVDoctors()
        setdoctorData(doctorInfo);
    }

    useEffect(() => {
        fetchdoctorsdata();
    }, [])


    const Show_appointmentsbydate = async (startdate, endDate, doctor) => {
        let startDate = startdate.toISOString().split('T')[0];
        let enddate = endDate.toISOString().split('T')[0];

        try {
            const request = await HV_Appointments_by_date(startDate, enddate, doctor);
            if (request.success === "200") {
                setappointmentlist(request.Report)
                console.log(request.Report)
            }
            else {
                alert(request.message);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className={classes.root} style={{ backgroundColor: '#ffffff' }}>
                <DoctorNavbar />
                <Grid container spacing={2}
                    className={clsx(classes.grid, {
                        [classes.gridShift]: open,
                    })}
                    direction="row"
                >
                    <div className={classes.root2}>
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
                            <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', borderRadius: 105, fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                            Home Visitor History
                        </Typography>


                        <div className='row' style={{ display: 'flex', marginTop: 20 }}>
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
                                <label style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#707070', marginLeft: '-20px' }}>To</label>
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
                                <label style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#707070', marginLeft: '-50px' }}>Doctor</label>
                                <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '65%', marginLeft: '20px', marginTop: -2 }} >
                                    <Select
                                        className={classes.textFieldForm}
                                        size='large'
                                        native
                                        value={doctor}
                                        onChange={(e) => setdoctor(e.target.value)}
                                        inputProps={{
                                            name: 'doctor',
                                            id: 'outlined-doctor-native-simple',
                                        }}
                                        style={{ width: '150%', fontSize: 14, marginTop: -3 }}
                                    >
                                        <option aria-label="None" value="" >Select Doctor</option>
                                        {doctorData.map(v => (<option value={v.UserId}>Dr. {v.FirstName} {v.LastName}</option>))}
                                    </Select>
                                </FormControl>
                                {/* <select id="dropdown" value={doctor} onChange={(e) => setdoctor(e.target.value)} style={{ height: 30, border: '1px solid #F0F0F0', fontFamily: 'Poppins', paddingLeft: 15, width: '100%' }}>
                                    <option value="" >Select Doctor</option>
                                    {doctorData.map(v => (<option value={v.UserId}>Dr. {v.FirstName} {v.LastName}</option>))}
                                </select> */}
                            </div>

                            <div className='col-2'>
                                <label style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#707070', marginLeft: 70, }}>Pages</label>
                                <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '25%', marginLeft: 30, }} >
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
                                        style={{ width: '200%', fontSize: 14, marginTop: -3, marginLeft: -10 }}
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
                                {/* <select id="dropdown" value={norecords} onChange={(e) => setnorecords(e.target.value)} style={{ width: 80, height: 30, border: '1px solid #F0F0F0', fontFamily: 'Poppins', paddingLeft: 15, marginLeft: 30 }}>
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
                                        marginLeft: 80
                                    }}
                                    onClick={() => Show_appointmentsbydate(startdate, endDate, doctor)}
                                >
                                    Show
                                </Button>
                            </div>
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
                                    style={{ height: 350, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2', marginTop: 20, marginRight: 20 }}
                                    rows={appointmentlist}
                                    rowHeight={30}
                                    columns={columns}
                                    columnWidth={5}
                                    pageSize={norecords}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} style={{ marginRight: 20 }} >
                            {/* <Button
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
                            </Button> */}
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
                                    setdoctor('');
                                }}
                            >
                                Reset
                            </Button>
                        </Grid>
                        {view ? <Show_pdf_data show={view} data={appointmentlist} column={columnsforpdf} handleclose={() => setview(false)} /> : null}

                    </div>
                </Grid>
            </div>

        </>
    );
}
