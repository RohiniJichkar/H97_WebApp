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
    //     field: 'PaymentMode',
    //     headerName: 'PaymentMode',
    //     width: 180,
    //     textAlign: "center",
    //     headerAlign: 'center',
    //     editable: true,
    //     align: "center",
    //     headerClassName: 'super-app-theme--header',
    // },
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
        width: 495,
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
                    AppointmentId: params.row.id
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
                    AppointmentId: params.row.id
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

                    {params.row.Action = <Button size='small' onClick={() => handleCashPayment()} style={{ backgroundColor: '#2C7FB2', color: '#fff', borderRadius: 25, width: 150 }}>
                        Cash Payment
                    </Button>}
                    {params.row.Action = <Button size='small' color="secondary" onClick={() => handleOnlinePayment()} style={{ backgroundColor: '#2C7FB2', color: '#fff', borderRadius: 25, marginLeft: 20, width: 150 }}>
                        Online Payment
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
    const [appointmentlist, setappointmentlist] = useState([]);
    const [morningcount, setmorningcount] = useState([]);
    const [eveningcount, seteveningcount] = useState([]);
    const [paymenthistory, setpaymenthistory] = useState([]);
    const [appTime, setappTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            fetchpaymentHistory();
        }, 10000);
        fetchpaymentHistory();
        return () => clearInterval(interval);
    }, []);

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

                <Grid item xs={12} style={{ paddingTop: 65 }}>
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
