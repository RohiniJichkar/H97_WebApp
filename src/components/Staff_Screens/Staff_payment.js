import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, IconButton, Grid, Paper, FormControl, Select, Box } from "@material-ui/core";
import DoctorNavbar from './Staff_Navbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { GetMorningSlots, GetEveningSlots, Todays_Appointment, Todays_Appointment_By_Date } from '../../Apis/Staff/Todays_Appointments/index';
import { DataGrid } from '@material-ui/data-grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ip from '../../ipaddress/ip';
import axios from 'axios';
import { handle_cashpayment } from '../../Apis/Payment_Details_Recp/index';
import { Edit_Appointment_From_TodaysApp } from './components/Todays_Appointments/Slots/Edit_Appointment/index';
import Delete_Appointment from './components/Todays_Appointments/Slots/Delete_Appointment/index';
import { Time, App_Channels, App_Types, Doctors, Book_Appointment, Note_for_Doctor } from '../../Apis/Staff/Book_Appointment/index';
const drawerWidth = 240;

const columns = [
    {

        field: 'UserId',
        headerName: 'PatientID',
        headerAlign: 'center',
        align: "center",
        // sortable: false,
        width: 150,
        fontSize: "20px",
        headerClassName: 'super-app-theme--header',



    }, {
        field: 'fullName',
        headerName: 'PatientName',
        headerAlign: 'center',
        sortable: false,
        width: 200,
        headerClassName: 'super-app-theme--header',
        valueGetter: (params) =>
            `${params.getValue(params.id, 'PFName') || ''} ${params.getValue(params.id, 'PLName') || ''
            }`,
    },
    {
        field: 'AppointmentDate',
        headerName: 'AppointmentDate',
        width: 240,
        editable: true,
        headerAlign: 'center',
        marginLeft: "25px",
        align: "center",
        headerClassName: 'super-app-theme--header'
    },

    // {
    //     field: 'MobileNo',
    //     headerName: 'Contact No',
    //     width: 160,
    //     editable: true,
    // },

    {
        field: 'PaymentMode',
        headerName: 'PaymentMode',
        width: 180,
        textAlign: "center",
        headerAlign: 'center',
        editable: true,
        align: "center",
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'PaymentAmount',
        headerName: 'Amount',
        headerAlign: 'center',
        width: 180,
        editable: true,
        align: "center",
        headerClassName: 'super-app-theme--header',

    },

    {
        field: "Action",
        headerAlign: 'center',
        headerName: "Action",
        width: 310,
        align: "center",
        headerClassName: 'super-app-theme--header',
        sortable: false,

        renderCell: (params) => {
           
           
            let currentDate = new Date();
            let t_date = currentDate.toISOString().split('T')[0];
            let t_time = currentDate.toISOString().split('T')[1];

            const handleCashPayment = async () => {
                var obj = {
                    PaymentMode: 'Cash',
                    PaymentDate: t_date,
                    PaymentTime: t_time,
                    AppointmentId : params.row.id
                }
                try {
                    var cash = await handle_cashpayment(obj);
                    let parsed = JSON.parse(cash);
                    if (parsed.success === "200") {
                        alert(parsed.message);
                        window.location.reload();
                    } else {
                        alert(parsed.message);
                    }
                } catch (e) {
                    console.log(e)
                }
            }


            const handleOnlinePayment = async () => {
                var obj = {
                    PaymentMode: 'Online',
                    PaymentDate: t_date,
                    PaymentTime: t_time,
                    AppointmentId : params.row.id
                }
                try {
                    var cash = await handle_cashpayment(obj);
                    let parsed = JSON.parse(cash);
                    if (parsed.success === "200") {
                        alert(parsed.message);
                        window.location.reload();
                    } else {
                        alert(parsed.message);
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            return (
                <>

                    {params.row.Action = <Button onClick={() => handleCashPayment()} style={{ color: '#2C7FB2',borderRadius:"26px" }}>
                        Cash
                    </Button>}
                    {params.row.Action = <Button color="secondary" onClick={() => handleOnlinePayment()} style={{ color: '#BBB' }}>
                        Online
                    </Button>}

                </>
            );
        }

    },
];

// const rows = [
//     {
//         id: 1,PatientID:1, PatientName: "Shubham", PaymentMode: "Cash", Amount: "12000", AppointmentDateTime: "2/2/2022",
//     }
// ]



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

        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 600,
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
        marginLeft: 50
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
        width: 400,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
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
        width: '100%',
        height: 20
    },
    btn: {
        color: '#78B088',
        backgroundColor: '#ffffff',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 14,
        textAlign: 'center',

    }

}));


export default function Staff_payment() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    const [selectedValue, setSelectedValue] = useState('');
    const [times, settimes] = useState([]);
    const [eveningtimes, seteveningtimes] = useState([]);
    const [appointmentlist, setappointmentlist] = useState([]);
    const [startdate, setstartdate] = useState('');
    const [endDate, setendDate] = useState('');
    const [morningcount, setmorningcount] = useState([]);
    const [eveningcount, seteveningcount] = useState([]);
    const [paymenthistory, setpaymenthistory] = useState([]);
    const [doctorData, setdoctorData] = useState([]);
    const [doctor, setDoctor] = React.useState('');

    useEffect(() => {
        fetchpaymentHistory();

    }, [])
    const handleGoBack = () => {
        navigate("/Staff_Home");
    };

    const fetchpaymentHistory = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        const medicalhistoryInfo = await axios.post(ip + 'Web_PaymentDetailsForRecp', { ClinicId: clinicid });
        setpaymenthistory(medicalhistoryInfo?.data?.Appointment);

    }


    const fetchAppointments = async (doctorid,) => {
        const appointments = await Todays_Appointment(doctorid);
        setappointmentlist(appointments);
    }


    const fetchEveningCount = async (doctorid) => {
        try {
            const count = await GetEveningSlots(doctorid);
            seteveningcount(count);
        }
        catch (e) {
            console.log(e);
        }
    }
    console.log(setpaymenthistory)


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
                <Grid item xs={12} style={{ paddingTop: 15 }}>
                    {/* <FormControl variant="outlined" size="small" className={classes.formControl} >
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
                            style={{ width: '100%', position: 'relative', color: '#707070', fontSize: 14, fontWeight: 400, fontFamily: 'Poppins' }}
                        >
                            <option aria-label="None" value="" >Select Doctor</option>
                            {doctorData.map(v => (<option value={v.DoctorId}>Dr. {v.FirstName} {v.LastName}</option>))}

                        </Select>
                    </FormControl> */}

                    {/* <Button className={classes.btnview} onClick={() => callbackfunction(doctor)} >View</Button> */}

                </Grid>
                <Grid item xs={12} >
                    {/* <Typography variant="h5" noWrap={true}
                        style={{
                            fontFamily: '"Poppins", san-serif;',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',

                        }}>
                        Morning Slots
                    </Typography> */}

                    {morningcount.map((item) => {
                        return (<>
                            <IconButton size='small'  >
                                <div className='row' style={{ marginLeft: '-30px', marginRight: '-30px' }}>
                                    <div style={{ marginTop: '-5px', color: '#2C7FB2' }} >
                                        {item.Count}
                                    </div>
                                    <div>
                                        {item.Count == '0' ? <Button variant="contained" className={classes.btn} style={{ marginTop: '-8px' }}>
                                            {item.ActualTime}
                                        </Button> :
                                            <Button variant="contained" className={classes.btn} style={{ marginTop: '-8px', backgroundColor: '#2C7FB2', color: '#fff' }}>
                                                {item.ActualTime}
                                            </Button>}
                                    </div>
                                </div>
                            </IconButton>
                        </>);
                    })}
                </Grid>

                <Grid item xs={12} >
                    {/* <Typography variant="h5" noWrap={true}
                        style={{
                            fontFamily: '"Poppins", san-serif;',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',
                            paddingTop: 20
                        }}>
                        Evening Slots
                    </Typography> */}

                    {eveningcount.map((item) => {
                        return (<>
                            <IconButton size='small'  >
                                <div className='row' style={{ marginLeft: '-30px', marginRight: '-30px' }}>
                                    <div style={{ marginTop: '-5px', color: '#2C7FB2' }} >
                                        {item.Count}
                                    </div>
                                    <div>
                                        {item.Count == '0' ? <Button variant="contained" className={classes.btn} style={{ marginTop: '-8px' }}>
                                            {item.ActualTime}
                                        </Button> :
                                            <Button variant="contained" className={classes.btn} style={{ marginTop: '-8px', backgroundColor: '#2C7FB2', color: '#fff' }}>
                                                {item.ActualTime}
                                            </Button>
                                        }
                                    </div>
                                </div>
                            </IconButton>

                        </>);

                    })}
                </Grid>
                <Grid item xs={12} style={{ paddingTop: 15 }}>
                    {/* <Typography variant="h8" noWrap={true} style={{ paddingLeft: 5, paddingRight: 20 }}>
                        From
                    </Typography>

                    <input id="fromdate" type="date" value={startdate} onChange={(e) => {
                        setstartdate(e.target.value)
                    }} style={{ border: '1px solid #F0F0F0', height: 35 }} />

                    <Typography variant="h8" noWrap={true} style={{ paddingLeft: 40, paddingRight: 20 }}>
                        To
                    </Typography>
                    <input id="fromdate" type="date" value={endDate} onChange={(e) => {
                        setendDate(e.target.value)
                    }} style={{ border: '1px solid #F0F0F0', height: 35 }} />

                  
                  <Button className={classes.btnview} onClick={() => Appointmentbydate(startdate, endDate)} >View</Button> */}
                    <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', borderRadius: 105, fontSize: '12px', bottom: '60px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                    <h4 style={{ color: '#2C7FB2', position: "relative", bottom: 25, marginTop: -68, left: 45 }}>Payment Details</h4>
                </Grid>
                <Grid item xs={12} >
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
                            style={{ height: 400, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2', bottom: 39 }}
                            rows={paymenthistory}
                            rowHeight={40}
                            columns={columns}
                            columnWidth={5}
                            pageSize={10}

                        />
                    </Box>
                </Grid>
            </Grid> {/* main grid */}

        </div >
    );
}