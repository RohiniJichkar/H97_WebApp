import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, IconButton, Grid, Paper, Box } from "@material-ui/core";
import DoctorNavbar from './Doctor_Navbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { GetMorningSlots, GetEveningSlots, Todays_Appointment, Todays_Appointment_By_Date, GetAppByTimeWise } from '../Apis/Todays_Appointments/index';
import { DataGrid, GridColDef, GridApi, GridCellValue, GridCellParams } from '@material-ui/data-grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import { Edit_Appointment_From_TodaysApp } from './Todays_Appointments/Slots/Edit_Appointment/index';
import Delete_Appointment from './Todays_Appointments/Slots/Delete_Appointment/index';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const defaultMaterialTheme = createTheme({
    palette: {
        primary: {
            main: '#1769aa',
        },
    },
});

const drawerWidth = 240;

const columns = [
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
        field: 'MobileNo',
        headerName: 'Contact No',
        width: 160,
        headerClassName: 'super-app-theme--header',
        editable: true,
    },
    {
        field: 'AppointmentReason',
        headerName: 'Appointment Reason',
        width: 210,
        headerClassName: 'super-app-theme--header',
        editable: true,
    },
    {
        field: 'AppointmentDate',
        headerName: 'Date',
        width: 120,
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
        field: 'AppointmentType',
        headerName: 'Type',
        width: 120,
        headerClassName: 'super-app-theme--header',
        editable: true,
    },
    {
        field: 'AppointmentChannel',
        headerName: 'Channel',
        width: 140,
        headerClassName: 'super-app-theme--header',
        editable: true,
    },
    {
        field: 'AppointmentTime',
        headerName: 'Time',
        width: 160,
        headerClassName: 'super-app-theme--header',
        editable: true,
    },
    {
        field: "Action",
        width: 130,
        sortable: false,

        // renderCell: () => {
        //     return (
        //         <Button variant="contained" color="primary" startIcon={<EditIcon />}>
        //             Edit
        //         </Button>
        //     );
        // }
        renderCell: (params) => {
            const onClickDelete = async () => {
                return alert("Are you Sure!! Do you want to delete medicine");
            };
            // const onClickEdit = async () => {;
            //    navigate('/Doctor_EditAppointment')
            // };

            let currentDate = new Date();
            let t_date = currentDate.toISOString().split('T')[0];
            return (
                <>
                    <Button size='small' href='/DoctorEditAppointment' style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 14, color: '#2C7FB2', cursor: 'pointer' }}>Edit</Button>
                    {/* {params.row.AppointmentDate >= t_date ? <IconButton onClick={() => setopeneditmodal(true)} style={{ color: '#2C7FB2' }}>
                        <EditIcon />
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
        marginLeft: 26,
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
        minWidth: 180,
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
        padding: 8,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        textAlign: 'center',
        width: '100%'
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


export default function DoctorTodaysAppointment() {
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
    const [openeditmodal, setopeneditmodal] = useState(false);
    const [opendeletemodal, setOpenDeletemodal] = useState(false);

    let currentDate = new Date();
    let t_date = currentDate.toISOString().split('T')[0];

    const fetchAppointments = async () => {
        const appointments = await Todays_Appointment();
        setappointmentlist(appointments);
    }

    const fetchMorningCount = async () => {
        const count = await GetMorningSlots();
        setmorningcount(count);
    }

    const fetchEveningCount = async () => {
        const count = await GetEveningSlots();
        seteveningcount(count);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchMorningCount();
            fetchEveningCount();
        }, 10000);
        fetchMorningCount();
        fetchEveningCount();
        fetchAppointments();
        return () => clearInterval(interval);

    }, []);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const fetchAppTimeWise = async (val) => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        let docid = parsed.userid;

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

    return (
        <div className={classes.root} style={{ backgroundColor: '#ffffff' }}>

            {/* main grid */}
            <Grid container spacing={2}
                className={clsx(classes.grid, {
                    [classes.gridShift]: open,
                })}
                direction="row"
            >
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
                                            <Button variant="contained" onClick={(val) => fetchAppTimeWise(item.ActualTime)} className={classes.btn} style={{ marginTop: '-8px', backgroundColor: '#2C7FB2', color: '#fff' }}>
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
                    {/* <SearchIcon className={classes.searchIcon} />
                    <InputBase
                        label="Search by Name/Email"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,

                        }}
                        variant='outlined'
                        inputProps={{ 'aria-label': 'search' }}
                        style={{ borderRadius: 15 }}
                    > </InputBase> */}

                    <Typography variant="h8" noWrap={true} style={{ paddingLeft: 5, paddingRight: 20 }}>
                        From
                    </Typography>
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
                    {/* <input id="fromdate" type="date" value={startdate} onChange={(e) => {
                        setstartdate(e.target.value)
                    }} style={{ border: '1px solid #F0F0F0', height: 35 }} /> */}

                    <Typography variant="h8" noWrap={true} style={{ paddingLeft: 40, paddingRight: 20 }}>
                        To
                    </Typography>
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
                    }} style={{ border: '1px solid #F0F0F0', height: 35 }} /> */}

                    <Button className={classes.btnview} onClick={() => Appointmentbydate(startdate, endDate)} >View</Button>

                </Grid>

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
                            style={{ height: 300, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2' }}
                            rows={appointmentlist}
                            rowHeight={30}
                            columns={columns}
                            columnWidth={5}
                            pageSize={10}
                        // onCellClick={currentlySelected}
                        />
                    </Box>
                </Grid>
            </Grid> {/* main grid */}

        </div >
    );
}
