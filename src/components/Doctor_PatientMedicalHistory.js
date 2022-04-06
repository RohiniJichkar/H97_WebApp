import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Container, Avatar, Typography, Button, Divider, ListItem, ListItemIcon, ListItemText, List, IconButton, Grid, Paper, Link } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import DoctorNavbar from './Doctor_Navbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Pdf from '../Prescription_VinayH7B8_38 (1).pdf';
import { DataGrid } from '@material-ui/data-grid';
import ip from '../ipaddress/ip';
import axios from 'axios';
import { Todays } from '../Apis/Todays_Appointments/index';

const drawerWidth = 240;

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
        [`& fieldset`]: {
            borderRadius: 25,
        },
        width: 300,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 200,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
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
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
    },
}));


function createData(title, date, treatedby) {
    return { title, date, treatedby };
}

const rows = [
    createData('Fever', '07/11/2021', 'Dr. Pradeep Musale'),
    createData('Regular Checkup', '11/12/2021', 'Dr. Pradeep Musale'),
    createData('Sonography', '09/10/2021', 'Dr. Kirti Virnak'),
    createData('Flu', '07/12/2021', 'Dr. Akshaya Joshi'),
    createData('Headache', '07/12/2021', 'Dr. Komal Mhetre'),
];


const columns = [
    {
        field: 'Title',
        headerName: 'Appointment Title',
        width: 220,
        editable: true,
    },
    {
        field: 'AppointmentDate',
        headerName: 'Date',
        width: 150,
        editable: true,
        align: 'center'
    },
    {
        field: "fullName",
        headerName: 'Treated By',
        width: 150,
        editable: true,
        valueGetter: (params) =>
            `${params.getValue(params.id, 'DFName') || params.getValue(params.id, 'HFName')} ${params.getValue(params.id, 'DLName') || params.getValue(params.id, 'HLName')
            }`,
    },
    {
        field: 'PrescriptionURL',
        headerName: 'View Prescription',
        width: 200,
        // valueGetter: (params) =>
        // `${params.getValue(params.id, 'PrescriptionURL') || params.getValue(params.id, 'PdfPrescription')} 
        // }`,
        renderCell: (params) => (
            params.row.PrescriptionURL ?
                <>
                    <Button
                        onClick={() => {
                            window.open(params.getValue(params.row.id, 'PrescriptionURL'), '_blank')
                            console.log(params.row)
                        }}
                        size="small"
                        style={{ color: '#2C7FB2', fontSize: '12px', fontFamily: 'Poppins', fontWeight: 600 }}
                    >
                        View Prescription
                    </Button>
                </>
                :
                <Button
                    onClick={() => {
                        window.open(params.getValue(params.id, 'PdfPrescription'), '_blank')
                        console.log(params.row)
                    }}
                    size="small"
                    style={{ color: '#2C7FB2', fontSize: '12px', fontFamily: 'Poppins', fontWeight: 600 }}
                >
                    View Prescription
                </Button>
        ),
    },
];


export default function DoctorPatientMedicalHistory() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [counterbtn, setCounterBtn] = React.useState(0);
    const [details, setdetails] = useState([location.state.Details]);
    const [medicalhistory, setmedicalhistory] = useState([]);
    const [fromdt, setfromdt] = useState('');
    const [todt, settodt] = useState('');
    const [StartDate, setStartDate] = useState();
    const [EndDate, setEndDate] = useState();

    const fetchMedicalHistory = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        const medicalhistoryInfo = await axios.post(ip + 'Web_PatientMedicalHistory', { ClinicId: clinicid, UserId: details[0].UserId });
        setmedicalhistory(medicalhistoryInfo?.data?.Appointment);
    }

    console.log(details);

    const handleView = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        const medicalhistoryInfo = await axios.post(ip + 'Web_MedicalHistoryforDoctor', { ClinicId: clinicid, UserId: details[0].UserId, StartDate: fromdt, EndDate: todt });
        // setmedicalhistory(medicalhistoryInfo?.data?.Appointment);
    }

    const handlehistory = async (StartDate, EndDate) => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let Clinicid = parsed.ClinicId;

        try {
            let request = await Todays(Clinicid, StartDate, EndDate, details[0].UserId)
            setmedicalhistory(request)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchMedicalHistory();
    }, [])

    const handleIncrement = (event) => {
        setCounterBtn(counterbtn + 1);
    };

    const handleDecrement = (event) => {
        setCounterBtn(counterbtn - 1);
    };

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const viewprescription = () => {
        window.open(Pdf);
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
                <Grid item xs={12}>
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
                        Patient Medical History
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4} style={{ marginTop: 10 }}>
                    <Paper elevation={6} className={classes.paper} style={{ padding: 30 }}>
                        <Grid item sm={12} >
                            <center>
                                <div style={{ paddingBottom: 10 }}>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#2C7FB2', fontFamily: 'Poppins', fontWeight: 600 }}>
                                        Profile
                                    </Typography>
                                    {details[0].ProfileImage ?
                                        <Avatar style={{ borderRadius: 50, height: 80, width: 80 }} src={details[0].ProfileImage} /> :
                                        <Avatar style={{ borderRadius: 50, height: 80, width: 80 }} />}
                                </div>

                                <Typography variant="h6" noWrap={true} style={{
                                    fontSize: 15,
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    color: 'gray',
                                    fontWeight: 400
                                }}>
                                    {details[0].FirstName} {details[0].LastName}
                                </Typography>
                                <Grid container style={{ marginTop: 15 }}>
                                    <Grid item xs={6} style={{ borderRight: '1px solid #F0F0F0' }}>
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                                Patient ID
                                            </Typography>
                                        </center>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                                Age
                                            </Typography>
                                        </center>
                                    </Grid>
                                    <Grid item xs={6} style={{ borderRight: '1px solid #F0F0F0' }}>
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{ fontSize: 15, color: '#707070', fontFamily: 'Poppins', fontWeight: 600 }}>
                                                {details[0].PatientId}
                                            </Typography>
                                        </center>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{ fontSize: 15, color: '#707070', fontFamily: 'Poppins', fontWeight: 600 }}>
                                                {details[0].Age ? details[0].Age : 'NA'}
                                            </Typography>
                                        </center>
                                    </Grid>
                                </Grid>


                                <Grid container style={{ marginTop: 25 }}>
                                    <Grid item xs={6} >
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                                Address :
                                            </Typography>
                                        </center>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                            {details[0].Address ? details[0].Address : 'NA'} {details[0].City}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} style={{ marginTop: 20 }}>
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                                Mobile No :
                                            </Typography>
                                        </center>
                                    </Grid>
                                    <Grid item xs={6} style={{ marginTop: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                            {details[0].MobileNo}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} style={{ marginTop: 20 }}>
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                                Email :
                                            </Typography>
                                        </center>
                                    </Grid>
                                    <Grid item xs={6} style={{ marginTop: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                            {details[0].Email ? details[0].Email : 'NA'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </center>
                        </Grid>
                    </Paper>
                </Grid>


                <Grid item xs={8} style={{ marginTop: 10 }} >
                    <Paper elevation={6} className={classes.paper} style={{ padding: theme.spacing(2), paddingRight: 0, marginRight: 20 }}>
                        <Grid container xs spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h6" noWrap={true} style={{
                                    fontSize: 16, color: '#2C7FB2', fontWeight: 600,
                                    textDecorationLine: 'underline', textUnderlineOffset: '1px', textDecorationThickness: '1px',
                                    fontFamily: 'Poppins'
                                }}>
                                    Details
                                </Typography>
                            </Grid>

                            <Grid item xs={1.5}>

                                <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                    From :
                                </Typography>

                            </Grid>
                            <Grid item xs={3} style={{ float: 'left' }}>
                                <input id="fromdate" value={StartDate} onChange={(e) => setStartDate(e.target.value)} type="date" style={{ border: '1px solid #F0F0F0', height: 35, fontFamily: 'Poppins', color: '#707070' }} />
                            </Grid>
                            <Grid item xs={1.5}>
                                <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                    To :
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <input id="todate" value={EndDate} onChange={(e) => setEndDate(e.target.value)} type="date" style={{ border: '1px solid #F0F0F0', height: 35, color: '#707070' }} />
                            </Grid>
                            <Grid item xs={4}>
                                <Button onClick={() => handlehistory(StartDate, EndDate)} className={classes.btnview}>View</Button>
                            </Grid>

                            <Grid item sm={12} style={{ marginTop: '-10px' }}>
                                <DataGrid
                                    style={{ height: 258, fontSize: 12, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2' }}
                                    rows={medicalhistory}
                                    rowHeight={40}
                                    columns={columns}
                                    columnWidth={10}
                                    pageSize={10}

                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

            </Grid> {/* main grid */}

        </div >
    );
}
