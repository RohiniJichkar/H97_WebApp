import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Grid, Slide } from "@material-ui/core";
import DoctorNavbar from './Doctor_Navbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import Show_pdf_data from './Pdf_Viewer/Modal/index';
import { HVDoctors } from '../Apis/Book_Appointment/index';
import { HV_Appointments_by_date } from '../Apis/Home_Visitors/Home_Visitor_History/index'

const drawerWidth = 240;

var columns = [
    {
        field: 'UserId',
        headerName: 'Patient ID',
        width: 140,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        sortable: false,
        width: 150,
        valueGetter: (params) =>
            `${params.getValue(params.id, 'FirstName') || ''} ${params.getValue(params.id, 'LastName') || ''
            }`,
    },
    {
        field: 'AppointmentDate',
        headerName: 'Date',
        width: 140,
        editable: true,
    },
    {
        field: 'AppointmentTime',
        headerName: 'Time',
        width: 120,
        editable: true,
    },
    {
        field: 'AppointmentStatus',
        headerName: 'Status',
        width: 130,
        editable: true,
    },
    {
        field: 'HomeVisitReason',
        headerName: 'Reason',
        width: 150,
        editable: true,
    },
    {
        field: 'Address',
        headerName: 'Address',
        width: 180,
        editable: true,
    },
    {
        field: 'PaymentMode',
        headerName: 'Mode',
        width: 130,
        editable: true,
    },
    {
        field: 'TotalAmount',
        headerName: 'Total',
        width: 100,
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
    const [startdate, setstartdate] = useState('');
    const [endDate, setendDate] = useState('');
    const [doctorData, setdoctorData] = useState([]);
    const [doctor, setdoctor] = useState('');
    const [norecords, setnorecords] = useState('15');
    const [view, setview] = useState(false);

    
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
        try {
            const request = await HV_Appointments_by_date(startdate, endDate, doctor);
            if (request.success === "200") {
                setappointmentlist(request.Report)
                console.log(request.Report)
            }
            else {
                alert(request.message);
            }
        }catch(e){
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
                                fontWeight: 500,
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
                            </div>
                            <div className='col-3'>
                                <label style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#707070' }}>To</label>
                                <input id="fromdate" type="date" value={endDate} onChange={(e) => {
                                    setendDate(e.target.value)
                                }} style={{ border: '1px solid #F0F0F0', height: 30, fontFamily: 'Poppins', color: '#707070', paddingLeft: 15 }} />
                            </div>
                            <div className='col-2'>
                                <label style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#707070' }}>Doctor</label>
                                <select id="dropdown" value={doctor} onChange={(e) => setdoctor(e.target.value)} style={{ height: 30, border: '1px solid #F0F0F0', fontFamily: 'Poppins', paddingLeft: 15, width: '100%' }}>
                                    <option value="" >Select Doctor</option>
                                    {doctorData.map(v => (<option value={v.UserId}>Dr. {v.FirstName} {v.LastName}</option>))}
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
                                        marginLeft: 40
                                    }}
                                    onClick={() => Show_appointmentsbydate(startdate, endDate, doctor)}
                                >
                                    Show
                                </Button>
                            </div>
                            <div className='col-1'>
                                <select id="dropdown" value={norecords} onChange={(e) => setnorecords(e.target.value)} style={{ width: 80, height: 30, border: '1px solid #F0F0F0', fontFamily: 'Poppins', paddingLeft: 15, marginLeft: 30 }}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                    <option value="25">25</option>
                                    <option value="30">30</option>
                                    <option value="35">35</option>
                                    <option value="40">40</option>
                                </select>
                            </div>
                        </div>
                        <Grid item xs={12} >
                            <DataGrid
                                style={{ height: 350, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2', marginTop: 20, marginRight: 20 }}
                                rows={appointmentlist}
                                rowHeight={30}
                                columns={columns}
                                columnWidth={5}
                                pageSize={norecords}
                            />
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
