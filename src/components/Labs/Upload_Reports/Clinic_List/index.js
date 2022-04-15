import React, { useState, useEffect, Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Box, Button, IconButton, Grid, Paper, } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import CloseIcon from '@material-ui/icons/Close';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import { Doctor_Data } from '../../../../Lab_Apis/Patient_Reports/index';
import { Upload_Reports } from '../../../../Lab_Apis/Patient_Reports/index';

const getClinicsApi = 'http://13.233.217.107:8080/api/GetAllClinic';

const defaultMaterialTheme = createTheme({
    palette: {
        primary: {
            main: '#1769aa',
        },
    },
});

const drawerWidth = 240;


const columns = [
    {
        field: 'fullName',
        headerName: 'Full name',
        sortable: false,
        headerClassName: 'super-app-theme--header',
        width: 180,
        valueGetter: (params) =>
            `${params.getValue(params.id, 'FirstName') || ''} ${params.getValue(params.id, 'LastName') || ''
            }`,
    },
    {
        field: 'ClinicName',
        headerName: 'Clinic Name',
        sortable: false,
        headerClassName: 'super-app-theme--header',
        width: 180,
    },
    // {
    //     field: 'MobileNo',
    //     headerName: 'Contact No',
    //     width: 190,
    //     headerClassName: 'super-app-theme--header',
    //     editable: false,
    // },
];


const Get_Lab_Clinics = ({ show, data, handleclose }) => {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [maxWidth, setMaxWidth] = React.useState('xs');
    // const [clinics, setclinics] = useState([]);
    const [doctors, setdoctors] = React.useState([]);
    const [doctorid, setdoctorid] = React.useState('');
    const [clinicid, setclinicid] = React.useState('');

    const fetchDoctors = async () => {
        const clinicInfo = await Doctor_Data();
        setdoctors(clinicInfo);
    }

    console.log(data);

    const handleRowClick = async (id) => {
        console.log('idd', id)
        setdoctorid(id.DoctorId);
        setclinicid(id.ClinicId);
    }

    const handleUploadReports = async () => {
        const date = new Date();
        const now = date.toISOString().split('T')[0];
        const obj = {
            UserId: data.UserId,
            DoctorId: doctorid,
            ClinicId: clinicid,
            ReportImage: data.ReportImage,
            ReportTitle: data.ReportTitle,
            Date: now
        }

        console.log('object', obj)
        const requestReports = await Upload_Reports(obj);
        let parse = JSON.parse(requestReports);
        if (parse.success === "200") {
            alert('Reports Shared Successfully');
            handleclose();
            window.location.reload();
        }

    }

    useEffect(() => {
        // const interval = setInterval(() => {
        fetchDoctors();
        // }, 100);
    }, []);


    return (
        <>
            <Dialog
                open={show}
                maxWidth={maxWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Clinics"}
                    <IconButton edge="start" color="inherit" onClick={handleclose} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container>

                            <Grid item xs={12}>
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
                                        style={{ height: 300, marginTop: -5, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2', cursor: 'pointer' }}
                                        rows={doctors}
                                        rowHeight={30}
                                        columns={columns}
                                        columnWidth={10}
                                        pageSize={6}
                                        onRowClick={(newSelection) => handleRowClick(newSelection.row)}
                                    />
                                </Box>
                            </Grid>
                            <Grid container style={{ marginBottom: -10 }}>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnCancle} onClick={handleclose} style={{ float: 'right', marginRight: 20 }}>
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnregister} onClick={handleUploadReports} style={{ float: 'left', marginLeft: 20 }}>
                                        Share
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
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
}))

export default Get_Lab_Clinics
