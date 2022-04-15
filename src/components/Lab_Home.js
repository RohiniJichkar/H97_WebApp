import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Paper } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import LabNavbar from './Lab_Navbar';
import { BroadcastMessage } from './Broadcast_Messages/index';

const drawerWidth = 240;

export default function LabHome() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [openmodal, setOpenmodal] = React.useState(false);


    const handleClinicPatients = () => {
        navigate("/LabClinicPatients");
    };
    const handleUploadReports = () => {
        // var data = localStorage.getItem("userdata");
        // let parsed = JSON.parse(data);
        // let role = parsed.Role;
        // if (role == 'Lab') {
        navigate("/LabReports");
        // }
        // else {
        //     alert("Access Denied");
        // }
    };

    // const handleUploadReports = () => {
    //     var data = localStorage.getItem("userdata");
    //     let parsed = JSON.parse(data);
    //     let role = parsed.Role;
    //     if (role == 'Doctor') {
    //         navigate("/DoctorReports");
    //     }
    //     else {
    //         alert("Access Denied");
    //     }
    // };

    // const handlePaymentReport = () => {
    //     navigate("/DoctorPaymentReports");
    // };

    // const handleClinicStaff = () => {
    //     navigate("/DoctorClinicStaff");
    // };


    const handleAddMedicines = () => {
        navigate("/DoctorMedicines");
    };

    const handleHomeVisitor = () => {
        navigate("/DoctorHomeVisitors");
    };

    const handleFacilities = () => {
        navigate("/DoctorClinicServices");
    };

    const handleAddServices = () => {
        navigate("/DoctorClinicServices");
    };

    return (
        <div className={classes.root} style={{ backgroundColor: '#ffffff' }}>
            <LabNavbar />

            {/* main grid */}
            <Grid container spacing={2}
                className={clsx(classes.grid, {
                    [classes.gridShift]: open,
                })}
                direction="row"
                alignItems="center"
                justify="center"

            >

                <Grid item xs={12} sm={2} style={{ marginLeft: -867 }} onClick={handleClinicPatients} >
                    <Paper elevation={6} className={classes.paper} >
                        <center>
                            <img src="clinic patients-01.png" style={{ height: 60, width: 60 }}></img>
                            <Typography variant="h5" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#2C7FB2',
                                    marginTop: 10,
                                    fontSize: 18,
                                    cursor: 'pointer'
                                }}>
                                Add <br /> Patients
                            </Typography>
                        </center>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={2} onClick={handleUploadReports} >
                    <Paper elevation={6} className={classes.paper} >
                        <center>
                            <img src="reports-01.png" style={{ height: 60, width: 60 }}></img>
                            <Typography variant="h5" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#2C7FB2',
                                    marginTop: 10,
                                    fontSize: 18,
                                    cursor: 'pointer'
                                }}>
                                Patient <br /> Reports
                            </Typography>
                        </center>
                    </Paper>
                </Grid>



                {openmodal ? <BroadcastMessage show={openmodal} handlemodal={() => setOpenmodal(false)} /> : null}
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
        padding: theme.spacing(3),
        color: '#78B088',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 800,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        paddingTop: 40,
        paddingBottom: 40,
        cursor: 'pointer'
    },
    grid: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginTop: 70,
        marginLeft: 5,
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
}));
