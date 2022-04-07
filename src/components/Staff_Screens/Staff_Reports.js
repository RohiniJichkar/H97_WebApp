
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, InputBase, Divider, Grid, Paper, IconButton, Box } from "@material-ui/core";
import DoctorNavbar from './Staff_Navbar';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { DataGrid } from '@material-ui/data-grid';
import { Patients_Data, Reports, getReportsByTitle } from '../../Apis/Staff/Patient_Reports/index';
import { PatientReportImages } from './components/Patient_Reports_Image_Comp/index';
import { DeletePatientReports } from './components/Patient_Reports_Image_Comp/DeletePatient_Report';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const getPatientSearchApi = 'http://13.233.217.107:8080/api/Web_SearchPatients';

const drawerWidth = 240;

const columns = [
    {
        field: 'fullName',
        headerName: 'Full name',
        sortable: false,
        width: 200,
        headerClassName: 'super-app-theme--header',
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


export default function Staff_Reports() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [patientData, setpatientData] = React.useState([]);
    const [reportsData, setreportsData] = React.useState([]);
    const [puserid, setpuserid] = React.useState('');
    const [openmodal, setopenmodal] = React.useState(false);
    const [modalData, setmodalData] = React.useState([]);
    const [opendeletemodal, setopendeletemodal] = React.useState(false);
    const [deletemodalData, setdeletemodalData] = React.useState([]);
    const [patientsearch, setpatientsearch] = useState([]);

    const fetchPatientData = async () => {
        const patientInfo = await Patients_Data();
        setpatientData(patientInfo);
    }

    useEffect(() => {
        fetchPatientData();
    }, []);

    const handleRowClick = async (id) => {
        const report = await Reports(id.UserId);
        setreportsData(report);
        setpuserid(id.UserId)
    }

    // const handleRowClick = async (UserId) => {
    //     setpuserid(UserId)
    //     const report = await Reports(puserid);
    //     setreportsData(report);
    // }

    const handleSubmit = async () => {
        if (puserid == '') {
            alert('Please Select Patient');
            return;
        }
        navigate('/Staff_Upload_Reports', {
            state: { detail: puserid }
        });
    }

    const getImageData = async (item) => {
        setmodalData(item);
        setopenmodal(true);
    }

    const getDeleteModalData = async (item) => {
        setdeletemodalData(item);
        setopendeletemodal(true);
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
                        Reports
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4} >
                    <Paper elevation={6} className={classes.paper} style={{ borderRadius: 10, paddingTop: 20, paddingBottom: 20 }}>
                        <Grid container xs={12}>
                            <Grid item xs={6}>
                                <center>
                                    <SearchIcon className={classes.searchIcon} />
                                    <InputBase
                                        placeholder="Search by Name/Email"
                                        onChange={(e) => setpatientsearch(e.target.value)}
                                        value={patientsearch}
                                        classes={{
                                            input: classes.inputInput,
                                        }}
                                        variant='outlined'
                                        inputProps={{ 'aria-label': 'search' }}
                                        style={{ borderRadius: 15 }}
                                    > </InputBase>
                                </center>
                            </Grid>
                            <Grid item xs={6} style={{ alignSelf: 'center', }}>
                                <Button className={classes.btnSearch} onClick={() => searchPatient(patientsearch)} size="small" style={{ float: 'right', fontSize: 12, textAlign: 'center' }}>Search</Button>
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
                                style={{ height: 270, marginTop: 20, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2', cursor: 'pointer' }}
                                rows={patientData}
                                rowHeight={30}
                                columns={columns}
                                columnWidth={10}
                                pageSize={6}
                                onRowClick={(newSelection) => handleRowClick(newSelection.row)}
                            />
                        </Box>
                        
                        <Divider />
                        <Grid container xs={12} style={{ paddingTop: 20 }}>
                            <Grid item xs={12}>
                                <center> <Button className={classes.btnUpload} onClick={handleSubmit} size="small" style={{ fontSize: 12 }}>Upload</Button> </center>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={8}>
                    <Paper elevation={6} style={{ borderRadius: 10, padding: 20, marginLeft: 25, marginRight: 20 }}>
                        <Typography variant="h6" noWrap={true}
                            style={{
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                color: '#2C7FB2',
                                textDecoration: 'underline',
                                fontSize: 18,
                                textUnderlineOffset: '1px',
                            }}>
                            View Reports
                        </Typography>

                        {reportsData.length != 0 ?
                            <Grid container spacing={2} style={{ paddingTop: 20, height: 355, overflowY: 'auto' }}>
                                {reportsData.map((item) => {
                                    return (
                                        <Grid item sm={2} >
                                            <Paper elevation={3} className={classes.groupreports} >
                                                <center>
                                                    <IconButton edge="start" size='small' aria-label="close" style={{ marginTop: '-15px', float: 'right', color: 'gray' }}>
                                                        <DeleteIcon size='small' onClick={() => getDeleteModalData(item)} />
                                                    </IconButton>
                                                    {item.ReportImage ? <img src={item.ReportImage} onClick={() => getImageData(item)} style={{ height: '120px', width: '100%', borderRadius: 10, cursor: 'pointer' }} onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null; // prevents looping
                                                        currentTarget.src = "default-pdf-image.jpg";
                                                    }} /> : <img src="default-image.png" style={{ height: '120px', width: '100%' }} />
                                                    }
                                                </center>
                                            </Paper>
                                            <div style={{ marginTop: 10 }}>
                                                <center>
                                                    <Typography variant="h6" noWrap={true}
                                                        style={{
                                                            fontFamily: '"Poppins", san-serif;',
                                                            fontStyle: 'normal',
                                                            fontWeight: 600,
                                                            overflow: 'hidden',
                                                            whiteSpace: 'nowrap',
                                                            textOverflow: 'ellipsis',
                                                            color: '#2C7FB2',
                                                            fontSize: 14
                                                        }}>
                                                        {item.ReportTitle}
                                                    </Typography>
                                                </center>
                                            </div>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                            :
                            <Grid container spacing={2} style={{ paddingTop: 20, height: 355, overflowY: 'auto' }}>
                                <Grid item sm={2} >
                                    <Paper elevation={3} className={classes.groupreports} >
                                        <center>
                                            <img src="default-image.png" style={{ height: '120px', width: '100%' }} />
                                        </center>
                                        <center>
                                            <Typography variant="h6" noWrap={true}
                                                style={{
                                                    fontFamily: '"Poppins", san-serif;',
                                                    fontStyle: 'normal',
                                                    fontWeight: 600,
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    color: '#2C7FB2',
                                                    fontSize: 14
                                                }}>
                                                Select Image
                                            </Typography>
                                        </center>
                                    </Paper>
                                </Grid>
                            </Grid>
                        }
                    </Paper>
                </Grid>

                {openmodal ? <PatientReportImages show={openmodal} data={modalData} handleClosemodal={() => setopenmodal(false)} /> : null}
                {opendeletemodal ? <DeletePatientReports show={opendeletemodal} data={deletemodalData} handleCloseDeletemodal={() => setopendeletemodal(false)} /> : null}

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
            width: '25ch',
            height: '30px'
        },
        border: '1px solid lightgray',
        borderRadius: 20,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        color: '#707070',
        fontWeight: 400,
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
        width: 300,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 200,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    btnUpload: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
    },
    btnSearch: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
    },
    groupreports: {
        height: 110,
        width: 100,
        borderRadius: 10,
    },
}));

