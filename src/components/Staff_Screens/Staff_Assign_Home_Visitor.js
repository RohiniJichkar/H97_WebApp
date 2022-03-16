import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Slide, Typography, FormControl, Select, TextField, Button, InputBase, Grid, Paper, Dialog, DialogContent, DialogContentText, DialogTitle, Avatar } from "@material-ui/core";
import DoctorNavbar from './Staff_Navbar';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import { ApprovedHomeVisitorRequest } from '../../Apis/Staff/HomeVisitorRequest/ApprovedRequest/index';
import { GetHomeVisitorDoctors } from '../../Apis/Staff/HomeVisitorRequest/AssignHomeVisitor/GetHomeVisitors/index';


const getHomeVisitorSearchApi = 'http://13.233.217.107:8080/api/Web_SearchHomeVisitor';

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
];


function createData(name, mobile) {
    return { name, mobile };
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
        padding: theme.spacing(3),
        color: '#78B088',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,
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
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,

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
        fontFamily: 'Poppins',
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
            width: '25ch',
            height: '30px'
        },
        border: '1px solid lightgray',
        borderRadius: 20,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        color: '#707070'
    },
    btnview: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
    },
    btnregister: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        fontSize: '11px'
    },

}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Staff_Assign_Home_Visitor() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [approvedRequestInfo, setapprovedRequestInfo] = useState([location.state.details]);
    const [hvDoctorData, sethvDoctorData] = useState([]);
    const [hvDoctorDetails, sethvDoctorDetails] = useState([]);
    const [assignHomeVisitor, setassignHomeVisitor] = useState([]);
    const [homevisitorsearch, sethomevisitorsearch] = useState('');

    const fetchHV_Doctors_Data = async () => {
        const gethvdoctorsInfo = await GetHomeVisitorDoctors();
        sethvDoctorData(gethvdoctorsInfo);
    }

    const handleRowClick = async (id) => {
        sethvDoctorDetails(id);
    }
    const handleAssign=()=>{
        navigate('/Staff_Home_Visit_Request');
    }

    const handleAssignHomeVisitor = async (obj, hvid, time) => {
        if (hvDoctorDetails == '') {
            alert("Please select home visitor from list");
            return;
        }
        let ptime = approvedRequestInfo.PreferedTime.split(' ')[1];

        const res = await ApprovedHomeVisitorRequest(obj, hvid, ptime)

        if (res) {
            setassignHomeVisitor(obj, hvid, ptime)
            alert('Home Visitor Request Approved');
            navigate("/Staff_Home_Visit_Request");
        }
    };

    const searchHomeVisitor = async (homevisitorsearch) => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        try {
            const hvDoctorInfo = await axios.post(getHomeVisitorSearchApi, { ClinicId: clinicid, Name: homevisitorsearch });
            sethvDoctorData(hvDoctorInfo?.data?.HomeVisitor);
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setapprovedRequestInfo(location.state.details);
        fetchHV_Doctors_Data();
    }, []);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleGoBack = () => {
        navigate("/Staff_Home");
    };

    const [opendatemodal, setOpenDatemodal] = React.useState(false);

    const handleClickOpenDatemodal = () => {
        setOpenDatemodal(true);
    };

    const handleCloseDatemodal = () => {
        setOpenDatemodal(false);
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
                <Grid item xs={12} >
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
                        Assign Home Visitor
                    </Typography>
                </Grid>

                <Grid item xs={12} container style={{ marginTop: 10 }}>
                    <Grid item xs={12} sm={4}>
                        <Paper elevation={6} className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <center>
                                        <SearchIcon className={classes.searchIcon} />
                                        <InputBase
                                            placeholder='Search by Home Visitor'
                                            onChange={(e) => sethomevisitorsearch(e.target.value)}
                                            value={homevisitorsearch}
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            variant='outlined'
                                            inputProps={{ 'aria-label': 'search' }}
                                            style={{ borderRadius: 15 }}
                                        > </InputBase>
                                    </center>
                                </Grid>

                                <Grid item xs={6} style={{ alignSelf: 'center' }}>
                                    <Button onClick={() => searchHomeVisitor(homevisitorsearch)} className={classes.btnview} size="small" style={{ float: 'right', fontSize: 11, textAlign: 'center' }}>Search</Button>
                                </Grid>

                            </Grid>
                            <DataGrid
                                style={{ height: 350, marginTop: 20, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2' }}
                                rows={hvDoctorData}
                                rowHeight={30}
                                columns={columns}
                                columnWidth={10}
                                pageSize={5}
                                onRowClick={(data) => {
                                    handleRowClick(data.row);
                                }}
                            />

                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={8} >
                        <Paper className={classes.paper} elevation={6} style={{ marginLeft: 25, marginRight: 20 }}>
                            <Typography variant="h6" noWrap={true} style={{
                                fontSize: 17, color: '#2C7FB2', fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                textDecoration: 'underline',
                                textUnderlineOffset: '1px',
                                fontWeight: 600
                            }}>
                                Profile
                            </Typography>
                            <center>
                                <div style={{ paddingBottom: 5 }}>
                                    {hvDoctorDetails.ProfileImage ?
                                        <Avatar style={{ borderRadius: 50, height: 80, width: 80 }} src={hvDoctorDetails.ProfileImage} /> :
                                        <Avatar style={{ borderRadius: 50, height: 80, width: 80 }} />}
                                </div>

                                <Typography variant="h6" noWrap={true} style={{
                                    fontSize: 16,
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    color: '#707070',
                                    fontWeight: 600
                                }}>
                                    {hvDoctorDetails.FirstName ? hvDoctorDetails.FirstName : 'NA'} {hvDoctorDetails.LastName ? hvDoctorDetails.LastName : ''}
                                </Typography>
                                <Typography variant="h6" noWrap={true} style={{
                                    fontSize: 14,
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    color: '#707070',
                                    fontWeight: 400
                                }}>
                                    {hvDoctorDetails.Education} ( {hvDoctorDetails.Category ? hvDoctorDetails.Category : 'NA'} )
                                </Typography>
                                <Grid container xs={12} style={{ paddingTop: 15 }}>
                                    <Grid item xs={3} style={{ border: '1px solid #F0F0F0', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: "Poppins" }}>
                                            Mobile Number
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                            {hvDoctorDetails.MobileNo ? hvDoctorDetails.MobileNo : 'NA'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                            From
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                            {hvDoctorDetails.From_AvailabilityTime ? hvDoctorDetails.From_AvailabilityTime : 'NA'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                            To
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                            {hvDoctorDetails.To_AvailabilityTime ? hvDoctorDetails.To_AvailabilityTime : 'NA'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                            Email Id
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', marginLeft: 10, marginRight: 10 }}>
                                            {hvDoctorDetails.Email ? hvDoctorDetails.Email : 'NA'}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid container xs={12}>
                                    <Grid item xs={6} style={{ border: '1px solid #F0F0F0', borderTop: '0px', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                            Address
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', marginLeft: 10, marginRight: 10 }}>
                                            {hvDoctorDetails.Address ? hvDoctorDetails.Address : 'NA'} <br /> {hvDoctorDetails.City}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', borderTop: '0px', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                            Availability
                                        </Typography>
                                        <Grid container>
                                            <Grid item xs={1} style={{ marginLeft: 20, color: '#707070', fontFamily: 'Poppins' }}>
                                                Mon
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20, color: '#707070', fontFamily: 'Poppins' }}>
                                                Tue
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20, color: '#707070', fontFamily: 'Poppins' }}>
                                                Wed
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20, color: '#707070', fontFamily: 'Poppins' }}>
                                                Thu
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20, color: '#707070', fontFamily: 'Poppins' }}>
                                                Fri
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20, color: '#707070', fontFamily: 'Poppins' }}>
                                                Sat
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20, color: '#707070', fontFamily: 'Poppins' }}>
                                                Sun
                                            </Grid>
                                        </Grid>

                                        <Grid container>
                                            <Grid item xs={1} style={{ marginLeft: 20 }}>
                                                <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                                    {hvDoctorDetails.Monday == true ? 'Yes' : 'No'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20 }}>
                                                <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                                    {hvDoctorDetails.Tuesday == true ? 'Yes' : 'No'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20 }}>
                                                <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                                    {hvDoctorDetails.Wednesday == true ? 'Yes' : 'No'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20 }}>
                                                <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                                    {hvDoctorDetails.Thursday == true ? 'Yes' : 'No'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20 }}>
                                                <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                                    {hvDoctorDetails.Friday == true ? 'Yes' : 'No'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20 }}>
                                                <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                                    {hvDoctorDetails.Saturday == true ? 'Yes' : 'No'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20 }}>
                                                <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                                    {hvDoctorDetails.Sunday == true ? 'Yes' : 'No'}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Grid>


                                <Grid container xs={12} style={{ marginTop: 10 }}>
                                    <Grid item sm={6} >
                                        <Button className={classes.btnregister} onClick={handleAssign} style={{ float: 'right', marginRight: 20 }}>Cancel</Button>
                                    </Grid>
                                    <Grid item sm={6} >
                                        <Button className={classes.btnregister} onClick={() => handleAssignHomeVisitor(approvedRequestInfo, hvDoctorDetails.UserId, approvedRequestInfo.PreferedTime)} style={{ float: 'left', marginLeft: 20 }}>Assign</Button>
                                    </Grid>
                                </Grid>

                            </center>
                        </Paper>

                    </Grid>
                </Grid>


                {/* for Change Date Time */}

                <Dialog
                    open={opendatemodal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseDatemodal}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#00318B' }}>{"Edit Date/Time"}
                        <IconButton edge="start" color="inherit" onClick={handleCloseDatemodal} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description" style={{ fontFamily: 'Poppins', fontWeight: 400, color: '#707070' }}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#2C7FB2', fontWeight: 600, fontFamily: 'Poppins', marginLeft: 50 }}>
                                        Date
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className={classes.inputFields} id="outlined-basic" type='date' variant="outlined" size="small" />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#2C7FB2', fontWeight: 600, fontFamily: 'Poppins', marginLeft: 50, marginTop: 15 }}>
                                        Time
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" size="small" className={classes.formControlForm} style={{ width: '100%', marginTop: 20 }} >
                                        <Select
                                            className={classes.textFieldForm}
                                            size='large'
                                            native

                                            inputProps={{
                                                name: 'start time',
                                                id: 'outlined-start-time-native-simple',
                                            }}
                                            style={{ width: '90%', fontSize: 12 }}
                                        >
                                            <option aria-label="None" value="" />
                                            <option value={1}>08:00</option>
                                            <option value={2}>09:00</option>
                                            <option value={3}>10:00</option>
                                            <option value={4}>11:00</option>
                                            <option value={5}>12:00</option>

                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </DialogContent>
                    <Grid container style={{ paddingBottom: 20 }}>
                        <Grid xs={12} sm={6}>
                            <Button className={classes.btnregister} onClick={handleCloseDatemodal} style={{ float: 'right', marginRight: 20 }}>
                                Cancle
                            </Button>
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Button className={classes.btnregister} onClick={handleCloseDatemodal} autoFocus style={{ float: 'left', marginLeft: 20 }}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Dialog>


            </Grid> {/* main grid */}

        </div >
    );
}
