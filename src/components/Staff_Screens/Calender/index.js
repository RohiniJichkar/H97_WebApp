import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, IconButton, Grid, Paper, FormControl, Select } from "@material-ui/core";
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { GetMorningSlots, GetEveningSlots, Todays_Appointment, Todays_Appointment_By_Date } from '../../../Apis/Todays_Appointments/index';
import { DataGrid } from '@material-ui/data-grid';
import { Edit_Appointment_From_TodaysApp } from '../../Todays_Appointments/Slots/Edit_Appointment/index';
import Delete_Appointment from '../../Todays_Appointments/Slots/Delete_Appointment/index';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from 'axios';
import { BookedAppointments } from '../../../Apis/PatientInQueue';
import ip from '../../../ipaddress/ip';
import { Show_Appointment_details } from './Show_Appointment_Details/index';

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
    // {
    //     field: 'MobileNo',
    //     headerName: 'Contact No',
    //     width: 160,
    //     editable: true,
    // },
    {
        field: 'AppointmentReason',
        headerName: 'Appointment Reason',
        width: 220,
        editable: true,
    },
    {
        field: 'AppointmentDate',
        headerName: 'Date',
        width: 160,
        editable: true,
    },
    {
        field: 'AppointmentTime',
        headerName: 'Time',
        width: 160,
        editable: true,
    },
    {
        field: 'AppointmentType',
        headerName: 'Type',
        width: 160,
        editable: true,
    },
    {
        field: 'AppointmentChannel',
        headerName: 'Channel',
        width: 180,
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

        RenderCell: (params) => {
            const onClickDelete = async () => {
                return alert("Are you Sure!! Do you want to delete medicine");
            };
            const onClickEdit = async () => {
                return alert(JSON.stringify(params.row, null, 4));
            };
            const [openeditmodal, setopeneditmodal] = useState(false);
            const [opendeletemodal, setOpenDeletemodal] = useState(false);

            return (
                <>
                    {openeditmodal ? <Edit_Appointment_From_TodaysApp show={openeditmodal} data={params.row} handlemodal={() => setopeneditmodal(false)} /> : null}
                    <IconButton onClick={() => setopeneditmodal(true)} style={{ color: '#2C7FB2' }}>
                        <EditIcon />
                    </IconButton>
                    {opendeletemodal ? <Delete_Appointment show={opendeletemodal} data={params.row.id} handleclose={() => setOpenDeletemodal(false)} /> : null}
                    <IconButton color="secondary" onClick={() => setOpenDeletemodal(true)} style={{ color: '#ef5350' }}>
                        <DeleteIcon />
                    </IconButton>

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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 220,

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
        height: 40
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
        width: 100,
        marginLeft: 20,
        alignSelf: 'center'
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

const localizer = momentLocalizer(moment);

export default function Appointments_On_Calender() {
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
    const [SelectedMonths, setSelectedMonths] = useState('');
    const [SelectedYear, setSelectedYear] = useState('');
    const [morningcount, setmorningcount] = useState([]);
    const [eveningcount, seteveningcount] = useState([]);
    const [allYears, setallYears] = useState([]);
    const [apoointmentdetails, setapoointmentdetails] = useState([]);
    const [dayscount, setdayscount] = useState([]);
    const [openmodal, setopenmodal] = useState(false);

    useEffect(() => {
        fetchMorningCount();
        fetchEveningCount();
        fetchAppointments();

    }, []);

    const now = new Date();
    const events = appointmentlist.map((items) => {
        return {
            id: items.id,
            title: items.FirstName + ' ' + items.LastName,
            allDay: true,
            startDate: items.AppointmentDate + ' ' + items.AppointmentTime,
            endDate: items.AppointmentDate + ' ' + items.AppointmentTime,
            doctor: items.DFName + ' ' + items.DLName,
            data: { items }
            //description: "sdsdsdsdsdsdsdsd"
        }
    })

    console.log(appointmentlist)

    const fetchAppointments = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        // let UserId = parsed.userid;
        let ClinicId = parsed.ClinicId;
        try {
            const request = await axios.post(ip + 'Web_GetMonthlyAppoints_Recp', {
                // DoctorId: UserId,
                ClinicId: ClinicId
            })
            setappointmentlist(request?.data?.Appointment)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchMorningCount = async () => {
        const count = await GetMorningSlots();
        setmorningcount(count);
    }

    const fetchEveningCount = async () => {
        const count = await GetEveningSlots();
        seteveningcount(count);
    }

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const Appointmentbydate = async (startdate, endDate) => {
        var data = localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let Clinicid = parsed.ClinicId;
        try {
            let request = await Todays_Appointment_By_Date(Clinicid, startdate, endDate)
            setappointmentlist(request)
        } catch (e) {
            console.log(e)
        }
    }

    var months = [{ month: "January", InNum: "01" }, { month: "February", InNum: "02" }, { month: "March", InNum: "03" }, { month: "April", InNum: "04" }, { month: "May", InNum: "05" }, { month: "June", InNum: "06" }, { month: "July", InNum: "07" }, { month: "August", InNum: '08' }, { month: "September", InNum: '09' }, { month: "October", InNum: '10' }, { month: "November", InNum: '11' }, { month: "December", InNum: '12' }];

    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(50), (val, index) => year - index);

    const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15']

    const showbyDate = async (SelectedMonths, SelectedYear) => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let UserId = parsed.userid;
        let ClinicId = parsed.ClinicId;
        try {
            const request = await axios.post(ip + 'Web_GetMonthlyAppointCount', {
                Month: SelectedMonths,
                Year: SelectedYear,
                DoctorId: UserId,
                ClinicId: ClinicId
            })
            setdayscount(request?.data?.Appointment)
        } catch (error) {
            console.log(error)
        }
    }

    const showappointmentbyfulldate = async (SelectedMonths, SelectedYear, day) => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let UserId = parsed.userid;
        let ClinicId = parsed.ClinicId;

        console.log(day);
        console.log(SelectedMonths);
        console.log(SelectedYear + '/' + SelectedMonths + '/' + day)
        try {
            const request = await axios.post(ip + 'Web_GetMonthlyAppointByDate', {
                DoctorId: UserId,
                ClinicId: ClinicId,
                AppointmentDate: SelectedYear + '-' + SelectedMonths + '-' + day
            })
            setappointmentlist(request?.data?.Appointment)
        } catch (error) {
            console.log(error)
        }
    }

    const CURRENT_DATE = moment().toDate();

    // example implementation of a wrapper
    const ColoredDateCellWrapper = ({ children, value }) =>
        React.cloneElement(children.only(children), {
            style: {
                ...children.style,
                backgroundColor: value < CURRENT_DATE ? 'lightgreen' : 'lightblue',
            },
        });

    return (
        <div className={classes.root} style={{ backgroundColor: '#ffffff', flexDirection: 'column' }}>
            {/* <div style={{ height: "400pt" }}>
                <Calendar
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultDate={moment().toDate()}
                    localizer={localizer}
                    views={['month', 'week', 'day']}
                />
            </div> */}
            {/* main grid */}
            {/* <Grid container spacing={2}
                className={clsx(classes.grid, {
                    [classes.gridShift]: open,
                })}
                direction="row"
            >
                <Grid item xs={12} style={{ paddingTop: 15 }}>
                    <FormControl variant="outlined" size="small" className={classes.formControl} >
                        <Select
                            className={classes.textField}
                            native
                            value={SelectedMonths}
                            onChange={(e) => setSelectedMonths(e.target.value)}
                            label="doctor"
                            inputProps={{
                                name: 'months',
                                id: 'outlined-doctor-native-simple',
                            }}
                            style={{ width: '100%', position: 'relative', color: '#707070', fontSize: 14, fontWeight: 400, fontFamily: 'Poppins' }}
                        >
                            <option aria-label="None" value="" >Select Month</option>
                            {months.map(v => (<option value={v.InNum}>{v.month}</option>))}

                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" size="small" className={classes.formControl} >
                        <Select
                            className={classes.textField}
                            native
                            value={SelectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            label="doctor"
                            inputProps={{
                                name: 'months',
                                id: 'outlined-doctor-native-simple',
                            }}
                            style={{ width: '100%', position: 'relative', color: '#707070', fontSize: 14, fontWeight: 400, fontFamily: 'Poppins' }}
                        >
                            <option aria-label="None" value="" >Select Year</option>
                            {years.map(v => (<option value={v}>{v}</option>))}

                        </Select>
                    </FormControl>
                    <Button className={classes.btnview} onClick={() => showbyDate(SelectedMonths, SelectedYear)}>View</Button>
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

                    {days.map((item) => {
                        return (<>
                            <IconButton size='small'  >
                                <div className='row'>
                                    {dayscount.map((items) => {
                                        return (
                                            <>
                                                {item == items.Days ?
                                                    items.Count > 0 ?
                                                        <div style={{ color: '#2C7FB2' }} >
                                                            {items.Count}
                                                        </div> :
                                                        '0'
                                                    : null
                                                }
                                            </>
                                        );
                                    })}
                                    <div>
                                        <Button variant="contained" onClick={() => showappointmentbyfulldate(SelectedMonths, SelectedYear, item)} className={classes.btn} style={{ marginTop: '-8px' }}>
                                            {item}
                                        </Button>
                                    </div>
                                </div>
                            </IconButton>
                        </>);
                    })}
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
            </Grid> */}
            <div style={{ height: "500pt" }}>
                <Calendar
                    events={events}
                    startAccessor="startDate"
                    endAccessor="endDate"
                    defaultDate={moment().toDate()}
                    localizer={localizer}
                    dateFormat="h t"
                    components={{
                        month: {
                          dateHeader: ({ date, label }) => {
                            let highlightDate =
                              events.find(event =>
                                moment(date).isBetween(
                                  moment(event.startDate),
                                  moment(event.endDate),
                                  null,
                                  "[]"
                                )
                              ) != undefined;
                            return (
                              <h1 style={highlightDate ? { color: "red" } : null}>{label}</h1>
                            );
                          }
                        }
                      }}
                    min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
                    max={new Date(2008, 0, 1, 17, 0)}
                    onSelectEvent={(val) => {
                        setapoointmentdetails(val.data);
                        setopenmodal(true);
                        console.log(val)
                    }}
                    views={['month', 'week', 'day']}
                />
                {openmodal ? <Show_Appointment_details show={openmodal} data={apoointmentdetails} handlemodal={() => setopenmodal(false)} /> : null}
            </div>
        </div>
    );
}
