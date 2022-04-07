import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Avatar, Typography, Button, InputBase, Grid, Paper, Slide, Box } from "@material-ui/core";
import AdminNavbar from './Admin_Navbar';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import moment from 'moment';
import { DataGrid } from '@material-ui/data-grid';
import Edit_Subscription from './Admin_components/Subscription/index';
import { Get_Subscription } from '../Admin_Apis/Clinic_Subscription/index';

const getSearchApi = 'http://13.233.217.107:8080/api/Web_Admin_SearchSubscription';

const drawerWidth = 240;

const columns = [
    {
        field: 'ClinicName',
        headerName: 'Clinic Name',
        sortable: false,
        width: 200,
        headerClassName: 'super-app-theme--header',

    },
    {
        field: 'ClinicMobileNo',
        headerName: 'Contact No',
        headerClassName: 'super-app-theme--header',
        width: 160,
        editable: true,
    },
];


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Admin_Clinic_Subscription() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [clinicData, setclinicData] = useState([]);
    const [clinicDetails, setclinicDetails] = useState('');
    const [openeditmodal, setopeneditmodal] = React.useState(false);
    const [searchterm, setsearchterm] = useState('');


    const fetchClinicData = async () => {
        try {
            const clinics = await Get_Subscription();
            setclinicData(clinics);
        } catch (e) {
            console.log(e);
        }
    }


    const searchSubscriptions = async (searchterm) => {
        try {
            const searchInfo = await axios.post(getSearchApi, { Name: searchterm });
            setclinicData(searchInfo?.data?.Subscription);
        }
        catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        const interval = setInterval(() => {
            fetchClinicData();
        }, 100);
        return () => clearInterval(interval);

    }, []);


    const handleCellClick = async (id) => {
        setclinicDetails(id);
    }


    const handleGoBack = () => {
        navigate("/AdminDashboard");
    };


    return (
        <div className={classes.root} style={{ backgroundColor: '#ffffff' }}>
            <AdminNavbar />

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
                        Subscription
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4} >
                    <Paper elevation={6} className={classes.paper} style={{ padding: 30, paddingBottom: 10, height: 450 }}>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <SearchIcon className={classes.searchIcon} />
                                <InputBase
                                    placeholder='Search by Name'
                                    value={searchterm}
                                    onChange={(e) => setsearchterm(e.target.value)}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    variant='outlined'
                                    inputProps={{ 'aria-label': 'search' }}
                                    style={{ borderRadius: 15 }}
                                > </InputBase>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Button className={classes.btnview} onClick={() => searchSubscriptions(searchterm)} size="small" style={{ fontSize: 12 }}>View</Button>
                            </Grid>

                        </Grid>

                        <Box
                            sx={{
                                '& .super-app-theme--header': {
                                    fontSize: 15,
                                    marginLeft: 10
                                },
                            }}
                        >
                            <DataGrid
                                style={{ height: 340, marginTop: 20, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2', cursor: 'pointer' }}
                                rows={clinicData}
                                rowHeight={30}
                                columns={columns}
                                columnWidth={10}
                                pageSize={10}
                                onRowClick={(newSelection) => {
                                    handleCellClick(newSelection.row)
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
                            Subscription Details
                        </Typography>
                        <center>
                            <div style={{ height: 84, }}>
                                {clinicDetails ? clinicDetails.Logo ?

                                    <img style={{ height: 120, width: 220, border: '1px solid lightgray', borderRadius: 10 }} src={clinicDetails.Logo} />

                                    : clinicDetails.Gender == 'Female' ? <Avatar style={{ height: 100, width: 100 }} src='recepicon.png' /> :
                                        <Avatar style={{ height: 100, width: 100 }} src='doctoricon.png' /> : <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} />
                                }

                            </div>

                            <Typography variant="h6" noWrap={true} style={{
                                fontSize: 16,
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                color: '#707070',
                                fontWeight: 600,
                                marginTop: 40
                            }}>
                                {clinicDetails ? clinicDetails.ClinicName : "NA"}
                            </Typography>
                            <Typography variant="h6" noWrap={true} style={{
                                fontSize: 14,
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                color: '#707070',
                                fontWeight: 400
                            }}>
                                CID- {clinicDetails ? clinicDetails.ClinicId : 'NA'}

                            </Typography>
                            <Grid container xs={12} style={{ paddingTop: 15 }}>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Mobile Number
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {clinicDetails ? clinicDetails.ClinicMobileNo : "NA"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Start Date
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', marginLeft: 10, marginRight: 10, fontFamily: 'Poppins', }}>
                                        {clinicDetails ? moment(clinicDetails.SubscriptionStartDate).format("DD/MM/YYYY") : "NA"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Expiry Date
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {clinicDetails ? moment(clinicDetails.SubscriptionEndDate).format("DD/MM/YYYY") : "NA"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Subscription Type
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {clinicDetails ? clinicDetails.SubscriptionType : 'NA'}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container xs={12}>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderTop: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Subscription Fees
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {clinicDetails ? clinicDetails.SubscriptionAmount : "NA"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', borderTop: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Total Amount
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', marginLeft: 10, marginRight: 10 }}>
                                        {clinicDetails ? clinicDetails.TotalAmount : "NA"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', borderTop: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Other Fees
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontFamily: 'Poppins', marginLeft: 10, marginRight: 10 }}>
                                        {clinicDetails ? clinicDetails.OtherFees : 'NA'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', borderTop: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Payment Mode
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontFamily: 'Poppins', marginLeft: 10, marginRight: 10 }}>
                                        {clinicDetails ? clinicDetails.PaymentMode : 'NA'}
                                    </Typography>
                                </Grid>
                            </Grid>



                            <Grid container xs={12} style={{ marginTop: 15 }}>
                                <Grid item sm={6} >
                                    <Button className={classes.btnregister} onClick={() => handleGoBack()} style={{ float: 'right', marginRight: 20 }}>Cancel</Button>
                                </Grid>
                                <Grid item sm={6} >
                                    <Button className={classes.btnregister} onClick={() => setopeneditmodal(true)} style={{ float: 'left', marginLeft: 20 }}>Edit</Button>
                                </Grid>
                            </Grid>

                        </center>
                    </Paper>

                </Grid>

                {openeditmodal ? <Edit_Subscription show={openeditmodal} data={clinicDetails} handleclose={() => setopeneditmodal(false)} /> : null}

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
        fontFamily: '"Poppins", san-serif;',
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
        marginTop: 10,
        fontSize: '11px'
    },
    formControlForm: {
        paddingBottom: theme.spacing(2.5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    textFieldForm: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 11,
    },
}));