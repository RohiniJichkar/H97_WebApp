import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent, Box, Typography, Button, IconButton, Grid, Paper, InputBase, Avatar, TextField, FormControl, Select, Slide } from "@material-ui/core";
import DoctorNavbar from './Doctor_Navbar';
import SearchIcon from '@material-ui/icons/Search';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckIcon from '@material-ui/icons/Check';
import { DataGrid } from '@material-ui/data-grid';
import { HomeVisitorRequest } from '../Apis/HomeVisitorRequest/GetHomeVisitorRequest/index';
import { ApprovedHomeVisitorRequest } from '../Apis/HomeVisitorRequest/ApprovedRequest/index';
import CircularProgress from '@material-ui/core/CircularProgress';
import Delete_HV_Request from './HomeVisitor_Request/Delete_Request/index';
import Add_HV_Request from './HomeVisitor_Request/Add_HV_Request/index';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import moment from 'moment';

const getHomeVisitorRequestSearchApi = 'http://13.233.217.107:8080/api/Web_SearchHomeVisitorRequest';

const drawerWidth = 240;

const columns = [
    {
        field: 'fullName',
        headerName: 'Full name',
        headerClassName: 'super-app-theme--header',
        sortable: false,
        width: 200,
        valueGetter: (params) =>
            `${params.getValue(params.id, 'FirstName') || ''} ${params.getValue(params.id, 'LastName') || ''
            }`,
    },
    {
        field: 'MobileNo',
        headerName: 'Contact No',
        headerClassName: 'super-app-theme--header',
        width: 160,
        editable: true,
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
    griditem: {
        color: '#2C7FB2',
    },
    paperServices: {
        padding: theme.spacing(1),
        color: '#00318B',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        textAlign: 'center',

    },
    gridServices: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,
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
        fontFamily: 'Poppins',
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
    inputFields: {
        [`& fieldset`]: {
            borderRadius: 25,
        },
        width: 300,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 200,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    groupreports: {
        height: 140,
        width: 250,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#00318B',
        paddingTop: 50,
        borderRadius: 20,
        float: 'right'
    },
    btnUpload: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
        marginBottom: 10,
        marginTop: 20
    },
    textField: {
        // [`& fieldset`]: {
        //     borderRadius: 25,
        // },
        padding: 8,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        textAlign: 'center',
        width: '100%'
    },
    facilitiesInput: {
        fontSize: 16,
        color: '#00318B !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,
        padding: 2
    },
    description: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        height: 145,
        color: 'gray',
        border: '1px solid #F0F0F0',
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
    buttonProgress: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 350
    },

}));


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DoctorHomeVisitRequest() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const [selectedValue, setSelectedValue] = useState('');
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [requestData, setrequestData] = useState([]);
    const [requestorDetails, setrequestorDetails] = useState([]);
    const [openapprovedmodal, setOpenApprovedmodal] = React.useState(false);
    const [approvedRequest, setapprovedRequest] = useState([]);
    const [loading, setLoading] = React.useState(false);
    const [openDeleteModal, setopenDeleteModal] = useState(false);
    const [homevisitorrequestsearch, sethomevisitorrequestsearch] = useState('');
    const [openhvmodal, setopenhvmodal] = useState(false);

    const fetchRequestData = async () => {
        const requestInfo = await HomeVisitorRequest();
        setrequestData(requestInfo);
    }

    const searchHomeVisitorsRequest = async (homevisitorrequestsearch) => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        try {
            const requestInfo = await axios.post(getHomeVisitorRequestSearchApi, { ClinicId: clinicid, Name: homevisitorrequestsearch });
            setrequestData(requestInfo?.data?.HomeVisitorRequest);
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleRowClick = async (id) => {
        setrequestorDetails(id);
    }

    useEffect(() => {
        fetchRequestData();
    }, []);


    const handleClickOpenApprovedmodal = async (obj) => {
        setLoading(true);
        const res = await ApprovedHomeVisitorRequest(obj)

        if (res) {
            setapprovedRequest(obj)
            setOpenApprovedmodal(true);
            setLoading(false);
        }
    };


    const handleContinue = () => {
        if (requestorDetails == '') {
            alert('Please select request from list');
            return;
        }
        navigate('/DoctorAssignHomeVisitor', {
            state: { details: requestorDetails }
        })
    };

    const handlesContinue = () => {
        if (requestorDetails == '') {
            alert('Please select request from list');
            return;
        }
        else { (setopenDeleteModal(true)) }
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleGoBack = () => {
        navigate("/DoctorHomeVisitors");
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
                            fontWeight: 600,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',

                        }}>
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', borderRadius: 105, fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Home Visitor Requests
                        <Button onClick={() => setopenhvmodal(true)} className={classes.btnregister} style={{ float: 'right', marginRight: 20, fontFamily: 'Poppins', fontSize: 12, width: 190 }}>Add Home Visitor Request</Button>
                    </Typography>
                </Grid>

                <Grid item xs={12} container style={{ marginTop: 10 }}>
                    <Grid item xs={12} sm={4}>
                        <Paper elevation={6} className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <center> <SearchIcon className={classes.searchIcon} />
                                        <InputBase
                                            label="Search by Name"
                                            placeholder='Search by Patient Name'
                                            onChange={(e) => sethomevisitorrequestsearch(e.target.value)}
                                            value={homevisitorrequestsearch}
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            variant='outlined'
                                            inputProps={{ 'aria-label': 'search' }}
                                            style={{ borderRadius: 15 }}
                                        > </InputBase> </center>
                                </Grid>

                                <Grid item xs={6} style={{ alignSelf: 'center' }}>
                                    <Button className={classes.btnview} onClick={() => searchHomeVisitorsRequest(homevisitorrequestsearch)} size="small" style={{ float: 'right', fontSize: 11, textAlign: 'center' }}>Search</Button>
                                </Grid>

                            </Grid>

                            <Box
                                sx={{
                                    '& .super-app-theme--header': {
                                        // backgroundColor: '#78B088',
                                        // color: '#fff
                                        fontSize: 15,
                                        marginLeft: 10
                                    },
                                }}
                            >
                                <DataGrid
                                    style={{ height: 350, marginTop: 20, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2', cursor: 'pointer' }}
                                    rows={requestData}
                                    rowHeight={30}
                                    columns={columns}
                                    columnWidth={10}
                                    pageSize={5}
                                    onRowClick={(newSelection) => {
                                        handleRowClick(newSelection.row);
                                    }}
                                />
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={8} >
                        <Paper className={classes.paper} elevation={6} style={{ marginLeft: 25, marginRight: 20 }}>
                            <Typography variant="h6" noWrap={true} style={{
                                fontSize: 18, color: '#2C7FB2', fontFamily: 'Poppins', textDecorationLine: 'underline', textUnderlineOffset: '1px', textDecorationThickness: '1px',
                                fontStyle: 'normal',

                            }}>
                                Profile
                            </Typography>
                            <div><Button style={{ position: 'relative', marginTop: -55, left: 700, fontWeight: 'normal', color: '#707070' }} onClick={handlesContinue}><DeleteIcon /></Button> </div>
                            <center>
                                <div style={{ paddingBottom: 10, height: 50, position: 'relative', bottom: 15 }}>
                                    {requestorDetails.ProfileImage ?
                                        <Avatar style={{ borderRadius: 50, height: 80, width: 80, position: 'relative', bottom: 12 }} src={requestorDetails.ProfileImage} /> :
                                        <Avatar style={{ borderRadius: 50, height: 80, width: 80, position: 'relative', bottom: 12 }} />}
                                </div>

                                <Typography variant="h6" noWrap={true} style={{
                                    fontSize: 16,
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    color: '#707070',
                                    fontWeight: 600
                                }}>
                                    {requestorDetails.NmTitle ? requestorDetails.NmTitle : ""} {requestorDetails.FirstName ? requestorDetails.FirstName : "NA"} {requestorDetails.LastName ? requestorDetails.LastName : ""}
                                </Typography>
                                <Typography variant="h6" noWrap={true} style={{
                                    fontSize: 14,
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    color: '#707070',
                                    fontWeight: 400
                                }}>
                                    Requester Id: {requestorDetails.RequesterId ? requestorDetails.RequesterId : "NA"}
                                    <div><span style={{ position: 'relative', left: 3 }}>Request for Dr. </span> <span> {requestorDetails.HFName ? requestorDetails.HFName : 'NA'} {requestorDetails.HLName}</span>
                                    </div>
                                </Typography>
                                <Grid container xs={12} style={{ paddingTop: 15 }}>
                                    <Grid item xs={3} style={{ border: '1px solid #F0F0F0', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: "Poppins" }}>
                                            Mobile Number
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                            {requestorDetails.MobileNo ? requestorDetails.MobileNo : "NA"}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                            Prefered Date
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                            {requestorDetails.PreferedTime ? `${moment((requestorDetails.PreferedTime).split(' ')[0]).format("DD/MM/YYYY")}` : "NA"}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                            Prefered Time
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                            {requestorDetails.PreferedTime ? requestorDetails.PreferedTime && `${(requestorDetails.PreferedTime).split(' ')[1]}` : "NA"}
                                        </Typography>

                                    </Grid>
                                    <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                            Email Id
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', marginLeft: 10, marginRight: 10 }}>
                                            {requestorDetails.Email ? requestorDetails.Email : "NA"}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid container xs={12}>
                                    <Grid item xs={6} style={{ border: '1px solid #F0F0F0', borderTop: '0px', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                            Address
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', marginLeft: 10, marginRight: 10 }}>
                                            {requestorDetails.address ? requestorDetails.address : "NA"}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', borderTop: '0px', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                            Home Visit Reason
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                            {requestorDetails.HomeVisitReason ? requestorDetails.HomeVisitReason : "NA"}
                                        </Typography>
                                    </Grid>
                                </Grid>



                                <Grid container xs={12} style={{ marginTop: 20 }}>
                                    {!loading ? <>
                                        <Grid item sm={6} >
                                            <Button className={classes.btnregister} onClick={handleGoBack} style={{ float: 'right', marginRight: 20 }}>Cancel</Button>
                                        </Grid>
                                        <Grid item sm={6} >
                                            <Button className={classes.btnregister} disabled={loading} onClick={() => handleContinue(requestorDetails)} style={{ float: 'left', marginLeft: 20 }}>Continue</Button>
                                            {/* <Button className={classes.btnregister} disabled={loading} onClick={() => handleClickOpenApprovedmodal(requestorDetails)} style={{ float: 'left', marginLeft: 20 }}>Continue</Button> */}
                                        </Grid>
                                    </> :
                                        <CircularProgress size={20} className={classes.buttonProgress} />
                                    }
                                </Grid>

                            </center>
                        </Paper>

                    </Grid>
                </Grid>

                {openDeleteModal ? <Delete_HV_Request show={openDeleteModal} data={requestorDetails} handleclose={() => setopenDeleteModal(false)} /> : null}

                {openhvmodal ? <Add_HV_Request show={openhvmodal} handleclose={() => setopenhvmodal(false)} /> : null}

                {/* for Approve Request*/}

                <Dialog
                    open={openapprovedmodal}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title" style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#78B088' }}>
                        <center>
                            <IconButton edge="start" color="inherit" aria-label="close" style={{ color: '#fff', backgroundColor: '#78B088' }}>
                                <CheckIcon style={{ fontSize: 35, fontWeight: 600 }} />
                            </IconButton>
                        </center>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description" style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#78B088', fontSize: 20 }}>
                            Home Visitor Request Has Been Approved!
                        </DialogContentText>
                        <Grid item xs={12} style={{ marginTop: 40 }}>
                            <center>
                                <Button className={classes.btnregister} onClick={handleContinue} style={{ width: 100, fontSize: 14, fontFamily: 'Poppins' }}>
                                    OK
                                </Button>
                            </center>
                        </Grid>
                    </DialogContent>
                    <DialogActions >

                    </DialogActions>
                </Dialog>



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
                                    <TextField id="outlined-basic" type='date' variant="outlined" size="small" />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#2C7FB2', fontWeight: 600, fontFamily: 'Poppins', marginLeft: 50, marginTop: 15 }}>
                                        Time
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" size="small" style={{ width: '100%', marginTop: 20 }} >
                                        <Select
                                            size='large'
                                            native
                                            inputProps={{
                                                name: 'start time',
                                                id: 'outlined-start-time-native-simple',
                                            }}
                                            style={{ width: '90%', fontSize: 12 }}
                                        >
                                            <option aria-label="None" value="">Select Time</option>
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
                                Cancel
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
