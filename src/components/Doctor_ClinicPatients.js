import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Avatar, Slide, Typography, Button, InputBase, Divider, ListItem, ListItemText, IconButton, Grid, Paper } from "@material-ui/core";
import DoctorNavbar from './Doctor_Navbar';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import Edit_Patient from './Clinic_Patients/Edit_Patient/index';
import Delete_Patient from './Clinic_Patients/Delete_Patient/index';
import Add_Patinet from './Clinic_Patients/Add_Patient/index';
import Add_Family_Member from './Clinic_Patients/Add_Family_Member/index';

const getPatientDataApi = 'http://13.233.217.107:8080/api/Web_GetPatients';
const getPatientDetailsApi = 'http://13.233.217.107:8080/api/ShowPatientDetailUsingId';
const getPatientSearchApi = 'http://13.233.217.107:8080/api/Web_SearchPatients';
const getPatientsCount = 'http://13.233.217.107:8080/api/Web_GetNoOfPatientCount';


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

export default function DoctorClinicPatients() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [openmodal, setOpenmodal] = React.useState(false);
    const [patientData, setpatientData] = useState([]);
    const [patientDetails, setpatientDetails] = useState([]);
    const [openeditmodal, setOpenEditmodal] = React.useState(false);
    const [opendeletemodal, setOpenDeletemodal] = React.useState(false);
    const [openFamilyMemberModal, setopenFamilyMemberModal] = React.useState(false);
    const [patientsearch, setpatientsearch] = useState([]);
    const [patientcountData, setpatientcountData] = useState([]);

    const fetchPatientData = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        const patientInfo = await axios.post(getPatientDataApi, { ClinicId: clinicid });
        setpatientData(patientInfo?.data?.Patients);
    }

    const fetchPatientsCount = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        const patientInfo = await axios.post(getPatientsCount, { ClinicId: clinicid });
        setpatientcountData(patientInfo?.data?.Patients);
    }

    const searchPatient = async (patientsearch) => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        try {
            const patientsInfo = await axios.post(getPatientSearchApi, { ClinicId: clinicid, Name: patientsearch });
            setpatientData(patientsInfo?.data?.Patients);
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchPatientData();
        fetchPatientsCount();
    }, [])

    const handleCellClick = async (userid) => {
        try {
            const patientDetailedInfo = await axios.post(getPatientDetailsApi, { UserId: userid });
            setpatientDetails(patientDetailedInfo?.data?.PatientDetails);
        } catch (e) {
            console.log(e);
        }
    }


    const handleOpenEditModal = () => {
        if (patientDetails != '') {
            setOpenEditmodal(true);
        } else {
            alert('Please Select Patient from List');
        }
    };


    const handleOpenAddFamilyMemberModal = () => {
        if (patientDetails != '') {
            setopenFamilyMemberModal(true);
        } else {
            alert('Please Select Family Head Member from List');
        }
    };

    const handleOpenDeleteModal = () => {
        if (patientDetails != '') {
            setOpenDeletemodal(true);
        } else {
            alert('Please Select Patient from List');
        }
    };

    const handleGoBack = () => {
        navigate("/DoctorHome");
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
                            fontFamily: '"Poppins", san-serif;',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',
                        }}>
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Clinic Patients
                        <Button className={classes.btnregister} onClick={() => setOpenmodal(true)} style={{ float: 'right', marginRight: 20, width: '150px', fontFamily: 'Poppins', fontSize: 12.5, fontWeight: 400 }}>New Registration</Button>
                        <Button className={classes.btnregister} onClick={() => handleOpenAddFamilyMemberModal()} style={{ float: 'right', marginRight: 20, width: '150px', fontFamily: 'Poppins', fontSize: 12.5, fontWeight: 400 }}>Add Family Member</Button>
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
                            style={{ height: 350, marginTop: 20, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2', cursor: 'pointer' }}
                            rows={patientData}
                            rowHeight={30}
                            columns={columns}
                            columnWidth={10}
                            pageSize={10}
                            onRowClick={(newSelection) => {
                                handleCellClick(newSelection.row.UserId);
                            }}
                        />

                        <Typography variant="h6" noWrap={true} style={{
                            fontSize: 12, color: '#2C7FB2', fontFamily: 'Poppins',
                            fontStyle: 'normal',
                        }}>
                            Total Number of Patients : {patientcountData[0].Count}
                        </Typography>
                    </Paper>

                </Grid>


                <Grid item xs={12} sm={8} >
                    <Paper className={classes.paper} elevation={6} style={{ marginLeft: 25, marginRight: 20, padding: theme.spacing(2) }}>
                        <Typography variant="h6" noWrap={true} style={{
                            fontSize: 18, color: '#2C7FB2', fontFamily: 'Poppins', textDecorationLine: 'underline', textUnderlineOffset: '1px', textDecorationThickness: '1px',
                            fontStyle: 'normal',
                        }}>
                            Profile
                        </Typography>
                        <center>
                            <div style={{ paddingBottom: 10 }}>
                                {patientDetails.ProfileImage ?
                                    <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} src={patientDetails.ProfileImage} /> :
                                    <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} />}
                                {/* <img src="Pallavi Kale.jpg" style={{ borderRadius: 50, height: 100 }}></img> */}
                            </div>

                            <Typography variant="h6" noWrap={true} style={{
                                fontSize: 16,
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                color: '#707070',
                                fontWeight: 600
                            }}>
                                {patientDetails.FirstName ? patientDetails.FirstName : "NA"}   {patientDetails.LastName ? patientDetails.LastName : ""}

                            </Typography>
                            <Typography variant="h6" noWrap={true} style={{
                                fontSize: 14,
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                color: '#707070',
                                fontWeight: 400
                            }}>
                                PID- {patientDetails.PatientId}
                            </Typography>
                            <Grid container xs={12} style={{ paddingTop: 15 }}>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Mobile Number
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {patientDetails.MobileNo ? patientDetails.MobileNo : "NA"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Email ID
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', marginLeft: 10, marginRight: 10, fontFamily: 'Poppins', }}>
                                        {patientDetails.Email ? patientDetails.Email : 'NA'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Date Of Birth
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {patientDetails.DOB ? patientDetails.DOB : 'NA'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Age
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {patientDetails.Age ? patientDetails.Age : 'NA'} years
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container xs={12}>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderTop: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Gender
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {patientDetails.Gender ? patientDetails.Gender : 'NA'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', borderTop: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Address
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', marginLeft: 10, marginRight: 10 }}>
                                        {patientDetails.Address ? patientDetails.Address : 'NA'} {patientDetails.City} {patientDetails.State} {patientDetails.Country} {patientDetails.Pincode}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', borderTop: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Medical History
                                    </Typography>
                                    <a onClick={() => navigate('/DoctorPatientMedicalHistory', {
                                        state: { Details: patientDetails }
                                    })} style={{ fontSize: 12, color: '#2C7FB2', fontFamily: 'Poppins', cursor: 'pointer', textDecoration: 'underline' }}>Patient History</a>
                                </Grid>
                            </Grid>

                            <Grid container xs={12} style={{ marginTop: 15 }}>
                                <Grid item sm={6} >
                                    <Button className={classes.btnregister} onClick={() => handleOpenDeleteModal()} style={{ float: 'right', marginRight: 20 }}>Delete</Button>

                                </Grid>
                                <Grid item sm={6} >
                                    <Button className={classes.btnregister} onClick={() => handleOpenEditModal()} style={{ float: 'left', marginLeft: 20 }}>Edit</Button>
                                </Grid>
                            </Grid>

                        </center>
                    </Paper>

                </Grid>


                {/* Add new Patient Dialog */}
                {openmodal ? <Add_Patinet show={openmodal} handleclose={() => setOpenmodal(false)} /> : null}


                {openeditmodal ? <Edit_Patient show={openeditmodal} data={patientDetails} handleCloseEditmodal={() => setOpenEditmodal(false)} /> : null}


                {/* for Delete User */}

                {opendeletemodal ? <Delete_Patient show={opendeletemodal} data={patientDetails} handleclose={() => setOpenDeletemodal(false)} /> : null}


                {/* for Family Member */}

                {openFamilyMemberModal ? <Add_Family_Member show={openFamilyMemberModal} data={patientDetails} handleclose={() => setopenFamilyMemberModal(false)} /> : null}


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