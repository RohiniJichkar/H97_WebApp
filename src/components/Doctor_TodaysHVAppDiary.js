import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, IconButton, Grid, Paper } from "@material-ui/core";
import DoctorNavbar from './Doctor_Navbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { DataGrid, GridColDef, GridApi, GridCellValue, GridCellParams } from '@material-ui/data-grid';
import { GetMorningSlots, GetEveningSlots, Todays_Appointment } from '../Apis/Home_Visitors/Home_Visitor_History/index';
import { Edit_Appointment_From_TodaysApp } from './Todays_Appointments/Slots/Edit_Appointment/index';
import Delete_Appointment from './Todays_Appointments/Slots/Delete_Appointment/index';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const drawerWidth = 240;

const columns = [
    {
        field: 'fullName',
        headerName: 'Full name',
        sortable: false,
        width: 220,
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
        field: 'Title',
        headerName: 'Appointment Reason',
        width: 230,
        editable: true,
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
        width: 140,
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
        field: 'doctorName',
        headerName: 'Doctor name',
        sortable: false,
        width: 220,
        valueGetter: (params) =>
            `${params.getValue(params.id, 'HFName') || ''} ${params.getValue(params.id, 'HLName') || ''
            }`,
    },
    // {
    //     field: "Action",
    //     width: 130,
    //     sortable: false,

    //     // renderCell: () => {
    //     //     return (
    //     //         <Button variant="contained" color="primary" startIcon={<EditIcon />}>
    //     //             Edit
    //     //         </Button>
    //     //     );
    //     // }
    //     RenderCell: (params) => {
    //         const onClickDelete = async () => {
    //             return alert("Are you Sure!! Do you want to delete medicine");
    //         };
    //         const onClickEdit = async () => {
    //             return alert(JSON.stringify(params.row, null, 4));
    //         };

    //         const [openeditmodal, setopeneditmodal] = useState(false);
    //         const [opendeletemodal, setOpenDeletemodal] = useState(false);
    //         let currentDate = new Date();
    //         let t_date = currentDate.toISOString().split('T')[0];
    //         return (
    //             <>
    //                 {openeditmodal ? <Edit_Appointment_From_TodaysApp show={openeditmodal} data={params.row} handlemodal={() => setopeneditmodal(false)} /> : null}
    //                 {params.row.AppointmentDate >= t_date ? <IconButton onClick={() => setopeneditmodal(true)} style={{ color: '#2C7FB2' }}>
    //                     <EditIcon />
    //                 </IconButton> : null}
    //                 {opendeletemodal ? <Delete_Appointment show={opendeletemodal} data={params.row.id} handleclose={() => setOpenDeletemodal(false)} /> : null}
    //                 {params.row.AppointmentDate >= t_date ? < IconButton color="secondary" onClick={() => setOpenDeletemodal(true)} style={{ color: '#707070' }}>
    //                     <DeleteIcon />
    //                 </IconButton> : null}

    //             </>
    //         );
    //     }
    // },
];


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        backgroundColor: 'white',
        
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
        marginTop: 70,
        marginLeft: 20,
        marginRight: 1, 
        
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


export default function DoctorTodaysHVAppDiary() {
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
                <Grid item xs={12} style={{marginLeft: 20}}>
                    <Typography variant="h5" noWrap={true}
                        style={{
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',
                            paddingLeft: 40,
                            marginLeft: -40
                        }}>
                        Morning Slots
                        <Button style={{ marginLeft: '-210px', color: '#2C7FB2', borderRadius: 105, fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>

                    </Typography>

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

                <Grid item xs={12} style={{marginLeft: 20}}>
                    <Typography variant="h5" noWrap={true}
                        style={{
                            fontFamily: 'Poppins',
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


                <Grid item xs={12} style={{marginLeft: 20}}>

                    <DataGrid
                        style={{ height: 300, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2' }}
                        rows={appointmentlist}
                        rowHeight={30}
                        columns={columns}
                        columnWidth={5}
                        pageSize={10}
                    // onCellClick={currentlySelected}
                    />

                </Grid>
            </Grid> {/* main grid */}

        </div >
    );
}
