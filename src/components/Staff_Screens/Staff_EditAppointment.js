import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Container, Avatar, Slide, Select, FormControl, InputLabel, Typography, Button, Table, TableContainer, TableBody, TableCell, TableHead, InputBase, TableRow, TablePagination, Drawer, Divider, MenuItem, Menu, ListItem, ListItemIcon, ListItemText, List, IconButton, Grid, Paper, Link } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import DoctorNavbar from './Staff_Navbar';
import SearchIcon from '@material-ui/icons/Search';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import { Edit_Appointment_From_TodaysApp } from './components/Todays_Appointments/Slots/Edit_Appointment/index';
import Delete_Appointment from './components/Todays_Appointments/Slots/Delete_Appointment/index';
import { Todays_Appointment_ForEdit } from '../../Apis/Staff/Todays_Appointments/index';

const getAppDetailsApi = 'http://13.233.217.107:8080/api/Web_GetAppointmentById';
const getPatientSearchApi = 'http://13.233.217.107:8080/api/Web_SearchPatients';


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
        field: 'AppointmentDate',
        headerName: 'Appointment Date',
        width: 160,
        editable: true,
    },
];


function renderRow(props) {
    const { index, style } = props;

    return (
        // <List>
        <ListItem button style={style} key={index} >
            <ListItem >
                <ListItemText
                    style={{ borderBottom: '1px solid #F0F0F0' }}
                    primary={`Title : Regular Checkup`}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component={'span'}
                                variant={"body2"}
                                color="textPrimary"
                            >
                                {`Date : 2021-09-11`}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider />
        </ListItem>
        // </List>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Staff_EditAppointment() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [patientsearch, setpatientsearch] = useState([]);
    const [appointmentlist, setappointmentlist] = useState([]);
    const [appDetails, setappDetails] = useState('');
    const [openeditmodal, setopeneditmodal] = useState(false);
    const [opendeletemodal, setOpenDeletemodal] = React.useState(false);


    const fetchAppointments = async () => {
        try {
            const appointments = await Todays_Appointment_ForEdit();
            setappointmentlist(appointments);
        } catch (e) {
            console.log(e);
        }
    }

    const handleCellClick = async (id) => {
        try {
            const appDetailedInfo = await axios.post(getAppDetailsApi, { id: id });
            setappDetails(appDetailedInfo?.data?.Appointment);
        } catch (e) {
            console.log(e);
        }
    }

    const searchPatient = async (patientsearch) => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        try {
            const patientsInfo = await axios.post(getPatientSearchApi, { ClinicId: clinicid, Name: patientsearch });
            setappointmentlist(patientsInfo?.data?.Patients);
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchAppointments();
        }, 10000);
        fetchAppointments();
        return () => clearInterval(interval);

    }, [])


    const handleGoBack = () => {
        navigate("/Staff_Todays_Appointment");
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
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Appointments
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4} >
                    <Paper elevation={6} className={classes.paper} style={{ padding: theme.spacing(2) }}>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <SearchIcon className={classes.searchIcon} />
                                <InputBase
                                    placeholder="Search by Name"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,

                                    }}
                                    value={patientsearch}
                                    onChange={(e) => setpatientsearch(e.target.value)}
                                    variant='outlined'
                                    inputProps={{ 'aria-label': 'search' }}
                                    style={{ borderRadius: 15 }}
                                > </InputBase>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Button className={classes.btnview} onClick={() => searchPatient(patientsearch)} size="small" style={{ fontSize: 12 }}>View</Button>
                            </Grid>

                        </Grid>


                        <DataGrid
                            style={{ height: 370, marginTop: 20, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2', cursor: 'pointer' }}
                            rows={appointmentlist}
                            rowHeight={30}
                            columns={columns}
                            columnWidth={10}
                            pageSize={10}
                            onRowClick={(newSelection) => {
                                handleCellClick(newSelection.row.id);
                            }}
                        />

                    </Paper>

                </Grid>


                <Grid item xs={12} sm={8} >
                    <Paper className={classes.paper} elevation={6} style={{ marginLeft: 25, marginRight: 20, padding: theme.spacing(2) }}>
                        <Typography variant="h6" noWrap={true} style={{
                            fontSize: 18, color: '#2C7FB2', fontFamily: 'Poppins', textDecorationLine: 'underline', textUnderlineOffset: '1px', textDecorationThickness: '1px',
                            fontStyle: 'normal',

                        }}>
                            Details
                        </Typography>
                        <center>
                            <div style={{ paddingBottom: 10 }}>

                                <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} />

                            </div>

                            <Typography variant="h6" noWrap={true} style={{
                                fontSize: 16,
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                color: '#707070',
                                fontWeight: 600
                            }}>
                                {appDetails.FirstName ? appDetails.FirstName : "NA"}   {appDetails.LastName ? appDetails.LastName : ""}

                            </Typography>
                            <Typography variant="h6" noWrap={true} style={{
                                fontSize: 14,
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                color: '#707070',
                                fontWeight: 400
                            }}>
                                Appointment Title- {appDetails.Title}
                            </Typography>
                            <Grid container xs={12} style={{ paddingTop: 15 }}>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Appointment Date
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {appDetails.AppointmentDate ? appDetails.AppointmentDate : "NA"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Appointment Time
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', marginLeft: 10, marginRight: 10, fontFamily: 'Poppins', }}>
                                        {appDetails.AppointmentTime ? appDetails.AppointmentTime : 'NA'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Appointment Channel
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {appDetails.AppointmentChannel ? appDetails.AppointmentChannel : 'NA'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Appointment Type
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {appDetails.AppointmentType ? appDetails.AppointmentType : 'NA'}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container xs={12}>
                                <Grid item xs={6} style={{ border: '1px solid #F0F0F0', borderTop: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Appointment Reason
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {appDetails.AppointmentReason ? appDetails.AppointmentReason : 'NA'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', borderTop: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Short Note
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', marginLeft: 10, marginRight: 10 }}>
                                        {appDetails.ShortNote ? appDetails.ShortNote : 'NA'}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container xs={12} style={{ marginTop: 15 }}>
                                <Grid item sm={6} >
                                    <Button className={classes.btnregister} onClick={() => {
                                        if (appDetails == '') {
                                            alert('Please Select Appointment from List');
                                            return;
                                        }
                                        setOpenDeletemodal(true);
                                    }} style={{ float: 'right', marginRight: 20 }}>Delete</Button>

                                </Grid>
                                <Grid item sm={6} >
                                    <Button className={classes.btnregister} onClick={() => {
                                        if (appDetails == '') {
                                            alert('Please Select Appointment from List');
                                            return;
                                        }
                                        console.log(appDetails.id);

                                        setopeneditmodal(true);
                                    }} style={{ float: 'left', marginLeft: 20 }}>Edit</Button>
                                </Grid>
                            </Grid>

                        </center>
                    </Paper>

                </Grid>



                {/* Edit Appointment */}
                {openeditmodal ? <Edit_Appointment_From_TodaysApp show={openeditmodal} data={appDetails} handlemodal={() => setopeneditmodal(false)} /> : null}

                {/* Delete Appointment */}
                {opendeletemodal ? <Delete_Appointment show={opendeletemodal} data={appDetails.id} handleclose={() => setOpenDeletemodal(false)} /> : null}

            </Grid> {/* main grid */}

        </div >
    );
}



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
        // [`& fieldset`]: {
        //     borderRadius: 25,
        // },
        width: 300,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 200,
        marginBottom: 20
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
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        marginTop: 10,
        fontSize: 12
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
        marginTop: 10,
        fontSize: 12
    },
}));