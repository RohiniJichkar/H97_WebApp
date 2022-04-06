import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Container, Switch, Avatar, Typography, Button, Table, TableContainer, TableBody, TableCell, TableHead, InputBase, TableRow, TablePagination, Grid, Paper, Link, Slide } from "@material-ui/core";
import AdminNavbar from './Admin_Navbar';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import Delete_Clinics from './Admin_components/Delete_Clinic/index';
import { Clinic_Doctors } from '../Admin_Apis/Clinic_Details/index';

const loginapi = 'http://13.233.217.107:8080/api/Login';
const searchapi = 'http://13.233.217.107:8080/api/Web_Admin_SearchDoctor';

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
        field: 'ClinicName',
        headerName: 'Clinic Name',
        width: 160,
        editable: true,
    },
];


export default function Admin_Doctor_Clinics() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [clinicData, setclinicData] = useState([]);
    const [doctordetails, setdoctordetails] = useState('');
    const [searchterm, setsearchterm] = useState('');
    const [opendeletemodal, setopendeletemodal] = useState(false);

    const fetchClinicData = async () => {
        try {
            const clinicInfo = await Clinic_Doctors();
            setclinicData(clinicInfo);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCellClick = async (id) => {
        setdoctordetails(id);
    }


    const searchDoctor = async (searchterm) => {
        try {
            const DoctorInfo = await axios.post(searchapi, { Name: searchterm });
            setclinicData(DoctorInfo?.data?.Doctor);
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleLogin = async () => {
        if (doctordetails) {
            try {
                await axios.post(loginapi, { MobileNo: doctordetails.MobileNo, Password: doctordetails.Password, Role: doctordetails.Role })
                    .then(Json => {
                        window.localStorage.setItem("userdata", JSON.stringify(Json?.data));
                        let responseData = Json.data
                        if (responseData.success == '200') {
                            if (responseData.Role === "Doctor") {
                                window.open('/DoctorHome', '_blank')
                            }
                            else {
                                window.open('/Staff_Home', '_blank')
                            }
                        }
                    }).catch(function (error) {
                        //handle error
                        console.log(error.response.data.message);
                        alert(error.response.data.message);
                    });

            } catch (error) {
                console.log(error)
            }
        } else {
            alert('Please Select Doctor from list');
        }
    }

    useEffect(() => {
        fetchClinicData();
    }, []);

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
                        Clinics
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4} >
                    <Paper elevation={6} className={classes.paper} style={{ padding: 30, paddingBottom: 10 }}>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <SearchIcon className={classes.searchIcon} />
                                <InputBase
                                    placeholder="Search by Clinic Name"
                                    onChange={(e) => setsearchterm(e.target.value)}
                                    value={searchterm}
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
                                <Button onClick={() => searchDoctor(searchterm)} className={classes.btnview} size="small" style={{ fontSize: 12 }}>View</Button>
                            </Grid>

                        </Grid>


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
                        <center>
                            <div style={{ paddingBottom: 10 }}>
                                {doctordetails ? doctordetails.ProfileImage ?
                                    <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} src={doctordetails.ProfileImage} /> :
                                    <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} /> : <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} />}
                            </div>

                            <Typography variant="h6" noWrap={true} style={{
                                fontSize: 16,
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                color: '#707070',
                                fontWeight: 600
                            }}>
                                {doctordetails ? doctordetails.FirstName : "NA"} {doctordetails ? doctordetails.LastName : ""}
                            </Typography>
                            <Typography variant="h6" noWrap={true} style={{
                                fontSize: 14,
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                color: '#707070',
                                fontWeight: 400
                            }}>
                                UID- {doctordetails ? doctordetails.UserId : null}
                            </Typography>
                            <Grid container xs={12} style={{ paddingTop: 15 }}>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Mobile Number
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {doctordetails ? doctordetails.MobileNo : "NA"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Email ID
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', marginLeft: 10, marginRight: 10, fontFamily: 'Poppins', }}>
                                        {doctordetails ? doctordetails.Email ? doctordetails.Email : doctordetails.StfEmail : "NA"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Education
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {doctordetails ? doctordetails.Education : "NA"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Category
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {doctordetails ? doctordetails.CodeValueCategory : 'NA'}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container xs={12}>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderTop: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Gender
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {doctordetails ? doctordetails.Gender ? doctordetails.Gender : doctordetails.StfGender : "NA"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', borderTop: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Address
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', marginLeft: 10, marginRight: 10 }}>
                                        {doctordetails ? doctordetails.Address ? doctordetails.Address : doctordetails.StfAddress : "NA"} {doctordetails ? doctordetails.City : null} {doctordetails ? doctordetails.State : null} {doctordetails ? doctordetails.Pincode : null} {doctordetails ? doctordetails.Country : null}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', borderTop: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Role
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', marginLeft: 10, marginRight: 10 }}>
                                        {doctordetails ? doctordetails.Role : 'NA'}
                                    </Typography>
                                </Grid>
                            </Grid>


                            <Grid container xs={12} style={{ marginTop: 15 }}>
                                <Grid item sm={6} >
                                    <Button onClick={() => setopendeletemodal(true)} className={classes.btnregister} style={{ float: 'right', marginRight: 20 }}>Delete</Button>
                                </Grid>
                                <Grid item sm={6} >
                                    <Button className={classes.btnregister} onClick={() => handleLogin()} style={{ float: 'left', marginLeft: 20 }}>Login As {doctordetails.FirstName ? doctordetails.FirstName : null}</Button>
                                </Grid>
                            </Grid>

                            {/* <Grid xs={12} style={{ marginTop: 15 }}>
                                <center>
                                    <Button onClick={() => handleLogin()} className={classes.btnregister}>Login As {doctordetails.FirstName ? doctordetails.FirstName : null}</Button>
                                </center>
                            </Grid> */}

                        </center>
                    </Paper>

                </Grid>

                {opendeletemodal ? <Delete_Clinics show={opendeletemodal} data={doctordetails} handleclose={() => setopendeletemodal(false)} /> : null}

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
        width: 160,
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