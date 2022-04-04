import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, IconButton, Grid, Paper, FormControl, Select } from "@material-ui/core";
import DoctorNavbar from './Staff_Navbar';
import { GetMorningSlots, GetEveningSlots, Todays_Appointment, Todays_Appointment_By_Date, GetAppByTimeWise } from '../../Apis/Staff/Todays_Appointments/index';
import { DataGrid } from '@material-ui/data-grid';
import { Doctors } from '../../Apis/Staff/Book_Appointment/index';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const drawerWidth = 240;

const columns = [
    {
        field: 'fullName',
        headerName: 'Full name',
        sortable: false,
        width: 200,
        valueGetter: (params) =>
            `${params.getValue(params.id, 'FirstName') || ''} ${params.getValue(params.id, 'LastName') || ''
            }`,
    },
    {
        field: 'MobileNo',
        headerName: 'Contact No',
        width: 160,
        editable: true,
    },
    {
        field: 'AppointmentReason',
        headerName: 'Appointment Reason',
        width: 210,
        editable: true,
    },
    {
        field: 'AppointmentDate',
        headerName: 'Date',
        width: 120,
        editable: true,
    },
    {
        field: 'AppointmentTime',
        headerName: 'Time',
        width: 120,
        editable: true,
    },
    {
        field: 'AppointmentType',
        headerName: 'Type',
        width: 140,
        editable: true,
    },
    {
        field: 'AppointmentChannel',
        headerName: 'Channel',
        width: 140,
        editable: true,
    },
    {
        field: 'AppointmentTime',
        headerName: 'Time',
        width: 160,
        editable: true,
    },
    {
        field: "Action",
        width: 130,
        sortable: false,

        renderCell: (params) => {
            const onClickDelete = async () => {
                return alert("Are you Sure!! Do you want to delete medicine");
            };
            const onClickEdit = async () => {
                return alert(JSON.stringify(params.row, null, 4));
            };
            // const [openeditmodal, setopeneditmodal] = useState(false);
            // const [opendeletemodal, setOpenDeletemodal] = useState(false);
            // let currentDate = new Date();
            // let t_date = currentDate.toISOString().split('T')[0];
            return (
                <>
                    <Button size='small' href='/Staff_EditAppointment' style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 14, color: '#2C7FB2', cursor: 'pointer' }}>Edit</Button>

                    {/* {openeditmodal ? <Edit_Appointment_From_TodaysApp show={openeditmodal} data={params.row} handlemodal={() => setopeneditmodal(false)} /> : null}
                    {params.row.AppointmentDate >= t_date ? <IconButton onClick={() => setopeneditmodal(true)} style={{ color: '#2C7FB2' }}>
                        <EditIcon />
                    </IconButton> : null}
                    {opendeletemodal ? <Delete_Appointment show={opendeletemodal} data={params.row.id} handleclose={() => setOpenDeletemodal(false)} /> : null}
                    {params.row.AppointmentDate >= t_date ? <IconButton color="secondary" onClick={() => setOpenDeletemodal(true)} style={{ color: '#BBB' }}>
                        <DeleteIcon />
                    </IconButton> : null} */}

                </>
            );
        }
    },
];


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


export default function Staff_Todays_Appointment() {
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
    const [startdate, setstartdate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());
    const [morningcount, setmorningcount] = useState([]);
    const [eveningcount, seteveningcount] = useState([]);
    const [docid, setdocid] = useState('');

    const [doctorData, setdoctorData] = useState([]);
    const [doctor, setDoctor] = React.useState('');


    const fetchdoctorsdata = async () => {
        try {
            const doctorInfo = await Doctors();
            setdoctorData(doctorInfo);
        }
        catch (e) {
            console.log(e)
        }
    }
    const callbackfunction = async (doctorid, currDate, endDate) => {
        setdocid(doctorid);
        // const interval = setInterval(() => {
        //     fetchAppointments(doctorid);
        //     fetchMorningCount(doctorid);
        //     fetchEveningCount(doctorid)
        // }, 10000);
        await fetchAppointments(doctorid);
        await fetchMorningCount(doctorid, currDate);
        await fetchEveningCount(doctorid, currDate);
        // return () => clearInterval(interval);
    }

    const fetchAppointments = async (doctorid) => {
        try {
            const appointments = await Todays_Appointment(doctorid);
            setappointmentlist(appointments);
        } catch (e) {
            console.log(e);
        }
    }

    const fetchMorningCount = async (doctorid, currDate) => {
        var currDate = moment().format('YYYY-MM-DD');
        try {

            const count = await GetMorningSlots(doctorid, currDate);
            setmorningcount(count);
        }
        catch (e) {
            console.log(e)
        }
    }

    const fetchEveningCount = async (doctorid, currDate) => {
        var currDate = moment().format('YYYY-MM-DD');
        try {
            const count = await GetEveningSlots(doctorid, currDate);
            seteveningcount(count);
        }
        catch (e) {
            console.log(e);
        }
    }

    const fetchAppTimeWise = async (val, doctorid) => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;

        const obj = {
            ClinicId: clinicid,
            Slot: val,
            DoctorId: docid
        }
        try {
            const appointmentInfo = await GetAppByTimeWise(obj);
            setappointmentlist(appointmentInfo);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchdoctorsdata();
    }, []);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const Appointmentbydate = async (startdate, endDate) => {
        var data = localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let Clinicid = parsed.ClinicId;
        let sDate = startdate.toISOString().split('T')[0];
        let eDate = endDate.toISOString().split('T')[0];
        try {
            let request = await Todays_Appointment_By_Date(Clinicid, sDate, eDate)
            setappointmentlist(request)
        } catch (e) {
            console.log(e)
        }
    }

    const handleGoBack = () => {
        navigate(-1);
    };


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
                    <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>

                    <FormControl variant="outlined" size="small" className={classes.formControl} >
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
                    </FormControl>

                    <Button className={classes.btnview} onClick={() => callbackfunction(doctor)} >View</Button>

                </Grid>
                <Grid item xs={12} >
                    <Typography variant="h5" noWrap={true}
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
                    </Typography>

                    {morningcount.map((item) => {
                        return (<>
                            <IconButton size='small'  >
                                <div className='row' style={{ marginLeft: '-30px', marginRight: '-30px' }}>
                                    <div style={{ marginTop: '-5px', color: '#2C7FB2' }} >
                                        {item.Count}
                                    </div>
                                    <div>
                                        {item.Count == '0' ? <Button variant="contained" onClick={(val) => fetchAppTimeWise(item.ActualTime)} className={classes.btn} style={{ marginTop: '-8px' }}>
                                            {item.ActualTime}
                                        </Button> :
                                            <Button variant="contained" className={classes.btn} onClick={(val) => fetchAppTimeWise(item.ActualTime)} style={{ marginTop: '-8px', backgroundColor: '#2C7FB2', color: '#fff' }}>
                                                {item.ActualTime}
                                            </Button>}
                                    </div>
                                </div>
                            </IconButton>
                        </>);
                    })}
                </Grid>

                <Grid item xs={12} >
                    <Typography variant="h5" noWrap={true}
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
                    </Typography>

                    {eveningcount.map((item) => {
                        return (<>
                            <IconButton size='small'  >
                                <div className='row' style={{ marginLeft: '-30px', marginRight: '-30px' }}>
                                    <div style={{ marginTop: '-5px', color: '#2C7FB2' }} >
                                        {item.Count}
                                    </div>
                                    <div>
                                        {item.Count == '0' ? <Button variant="contained" onClick={(val) => fetchAppTimeWise(item.ActualTime)} className={classes.btn} style={{ marginTop: '-8px' }}>
                                            {item.ActualTime}
                                        </Button> :
                                            <Button variant="contained" className={classes.btn} onClick={(val) => fetchAppTimeWise(item.ActualTime)} style={{ marginTop: '-8px', backgroundColor: '#2C7FB2', color: '#fff' }}>
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
                    <Typography variant="h8" noWrap={true} style={{ paddingLeft: 5, paddingRight: 20, fontSize: 15, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                        From
                    </Typography>

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

                    {/* <input id="fromdate" type="date" value={startdate} onChange={(e) => {
                        setstartdate(e.target.value)
                    }} style={{ border: '1px solid #F0F0F0', height: 35 }} /> */}

                    <Typography variant="h8" noWrap={true} style={{ paddingLeft: 40, paddingRight: 20, fontSize: 15, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                        To
                    </Typography>
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

                    <Button className={classes.btnview} onClick={() => Appointmentbydate(startdate, endDate)} >View</Button>

                </Grid>
                <Grid item xs={12} >

                    <DataGrid
                        style={{ height: 300, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2' }}
                        rows={appointmentlist}
                        rowHeight={30}
                        columns={columns}
                        columnWidth={5}
                        pageSize={10}

                    />

                </Grid>
            </Grid> {/* main grid */}

        </div >
    );
}
