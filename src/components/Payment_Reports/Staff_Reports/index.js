import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { Typography, IconButton, Grid, Paper, FormControl, Select } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import Show_pdf_data from '../../Pdf_Viewer/Modal';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
//apis
import { Staff_Analysis_Details_by_date } from '../../../Apis/payment_reports_apis/index';

const columns = [
    {
        field: 'DoctorfullName',
        headerName: 'Staff Name',
        sortable: false,
        headerClassName: 'super-app-theme--header',
        width: 200,
        valueGetter: (params) =>
            `${params.getValue(params.id, 'DFName') || ''} ${params.getValue(params.id, 'DLName') || ''
            }`,
    },
    {
        field: 'AppointmentDate',
        headerName: 'Date',
        headerClassName: 'super-app-theme--header',
        width: 160,
        editable: true,
    },
    // {
    //     field: 'AppointmentTime',
    //     headerName: 'Time',
    //     width: 160,
    //     editable: true,
    // },
    {
        field: 'AppointmentStatus',
        headerName: 'Status',
        headerClassName: 'super-app-theme--header',
        width: 160,
    },
    {
        field: 'cash',
        headerName: 'Cash',
        headerClassName: 'super-app-theme--header',
        width: 150,
    },
    {
        field: 'online',
        headerName: 'Online',
        headerClassName: 'super-app-theme--header',
        width: 150,
    },
];

const Staff_Analysis_reports = () => {
    const getStaffData = 'http://13.233.217.107:8080/api/GetAllUsers';
    const classes = useStyles();
    const theme = useTheme();

    const [value, setValue] = useState(0);
    const [appointmen, setappointlist] = useState([]);
    const [startdate, setstartdate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());
    const [doctor, setDoctor] = React.useState('');
    const [status, setstatus] = useState('');
    const [appStatus, setappStatus] = useState([]);
    const [norecords, setnorecords] = useState('15');
    const [catsKey, setCatsKey] = React.useState(0);
    const [Open, setOpen] = useState(false)
    useEffect(() => {
        fetchStaffData()
    }, [])


    const fetchStaffData = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        try {
            const staffInfo = await axios.post(getStaffData, { ClinicId: clinicid });
            setappStatus(staffInfo?.data?.NewUser);
        }
        catch (e) {
            console.log(e)
        }
    }

    const Show_appointmentsbydate = async (startdate, endDate, status) => {
        let sDate = startdate.toISOString().split('T')[0];
        let eDate = endDate.toISOString().split('T')[0];

        try {
            const request = await Staff_Analysis_Details_by_date(sDate, eDate, status);
            if (request.success === "200") {
                setappointlist(request.Report)
                console.log(request)
            }
            else {
                alert(request.message);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    var columnsforpdf = [
        {
            field: 'DoctorfullName',
            headerName: 'Staff Name',
            sortable: false,
            width: 200,
        },
        {
            field: 'AppointmentDate',
            headerName: 'Date',
            width: 160,
            editable: true,
        },
        {
            field: 'AppointmentStatus',
            headerName: 'Status',
            width: 160,
        },
        {
            field: 'cash',
            headerName: 'Cash',
            width: 150,
        },
        {
            field: 'online',
            headerName: 'Online',
            width: 150,
        },
    ];

    return (
        <>
            <div className={classes.root} style={{ backgroundColor: '#ffffff' }}>
                <div className='row' style={{ display: 'flex' }}>
                    <div className='col-3'>
                        <label style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#707070' }}>From</label>
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
                        <label style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#707070' }}>To</label>
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
                        {/* <input id="fromdate" type="date" value={endDate} onChange={(e) => {
                            setendDate(e.target.value)
                        }} style={{ border: '1px solid #F0F0F0', height: 30, fontFamily: 'Poppins', color: '#707070', paddingLeft: 15 }} /> */}
                    </div>
                    <div className='col-3'>
                        <label style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#707070' }}>Staff</label>
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
                                style={{ width: '120%', fontSize: 14, marginLeft: -10 }}
                            >
                                <option value="N/A">Select</option>
                                {appStatus.map(v => (<option value={v.DoctorId}>{v.FirstName} {v.LastName}</option>))}
                            </Select>
                        </FormControl>
                        {/* <select id="dropdown" value={status} onChange={(e) => setstatus(e.target.value)} style={{ height: 30, border: '1px solid #F0F0F0', fontFamily: 'Poppins', paddingLeft: 5 }}>
                            <option value="N/A">Select</option>
                            {appStatus.map(v => (<option value={v.UserId}>{v.FirstName} {v.LastName}</option>))}
                        </select> */}
                    </div>
                    <div className='col-2'>
                        <label style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#707070' }}>Pages</label>
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
                                style={{ width: '90%', fontSize: 14, marginTop: -25, marginLeft: 40 }}
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
                                marginLeft: 5
                            }}
                            onClick={() => Show_appointmentsbydate(startdate, endDate, status)}
                        >
                            Show
                        </Button>
                    </div>
                    {/* <div className='col-1'>
                        <select id="dropdown" value={norecords} onChange={(e) => setnorecords(e.target.value)} style={{ width: 80, height: 30, border: '1px solid #F0F0F0', fontFamily: 'Poppins', paddingLeft: 15,position:'relative', left:108 }}>
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
                        rows={appointmen}
                        rowHeight={30}
                        columns={columns}
                        columnWidth={5}
                        pageSize={20}
                    />
                    </Box>
                </Grid>
                <Grid item xs={12} >
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
                                if (appointmen.length == 0) {
                                    alert('Please find some record first')
                                    return;
                                }
                                else {
                                    setOpen(true)
                                }
                            }}
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
                                setappointlist([]);
                                setstartdate('');
                                setendDate('');
                                setstatus('');
                            }}
                        >
                            Reset
                        </Button>
                    </Grid>
                </Grid>
                {Open ? <Show_pdf_data show={Open} handleclose={() => setOpen(false)} Type="Staff" data={appointmen} column={columnsforpdf} /> : null}
            </div>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
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


export default Staff_Analysis_reports;
