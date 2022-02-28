import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Container, FormControl, InputLabel, TextField, Typography, Button, Slide, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableContainer, TableBody, TableCell, TableHead, InputBase, TableRow, TablePagination, Drawer, Divider, MenuItem, Menu, ListItem, ListItemIcon, ListItemText, List, IconButton, Grid, Paper, Link } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import DoctorNavbar from './Doctor_Navbar';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import { Services, Search_service } from '../Apis/Clinic_Services/index';
import Edit_Service_Details from './Clinic_Services/Edit_Services/index'
import Clinic_Service_Image from './Clinic_Services/Image_Upload/index';

import ip from '../ipaddress/ip';


const drawerWidth = 240;

const columns = [
    {
        field: 'ServiceName',
        headerName: 'Service Name',
        width: 160,
        editable: true,
    },
    {
        field: 'Price',
        headerName: 'Price',
        width: 120,
        editable: true,
    },
    {
        field: 'Discount',
        headerName: 'Discount',
        width: 120,
        editable: true,
    },
];


function createData(name, price, discount) {
    return { name, price, discount };
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
        color: '#707070',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
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
    groupreports: {
        height: 140,
        width: 250,
        borderRadius: 20,
        float: 'right'
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
        marginBottom: 10,
        marginTop: 20
    },
    textField: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        textAlign: 'center',
        width: '70%',
        marginTop: 15
    },
    facilitiesTitle: {
        fontSize: 16,
        color: '#2C7FB2 !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        padding: 2
    },
    facilitiesInput: {
        fontSize: 14,
        color: '#2C7FB2 !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,
        padding: 2,
    },
    description: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        overflow: "auto",
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
        color: 'gray',
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
        fontSize: '12px'
    },

}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DoctorClinicServices() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const [selectedValue, setSelectedValue] = useState('');
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [serviceData, setserviceData] = useState([]);
    const [serviceDetails, setserviceDetails] = useState('');
    const [searchterm, setsearchterm] = useState('');
    const [clinicservices, setclinicservices] = useState('');

    const fetchServiceData = async () => {
        const services = await Services();
        setserviceData(services);
    }

    const handleCellClick = async (id) => {
        const serviceDetailedInfo = await axios.post(ip + 'Web_GetServicesById', { id: id });
        setserviceDetails(serviceDetailedInfo?.data?.Service);
    }

    useEffect(() => {
        fetchServiceData();
    }, []);

    const handleGoBack = () => {
        navigate("/DoctorHome");
    };

    const handleAddServices = () => {
        navigate("/DoctorAddServices");
    };

    const [openeditmodal, setOpenEditmodal] = React.useState(false);


    const handleClickOpenEditmodal = () => {
        setOpenEditmodal(true);
    };

    const handleCloseEditmodal = () => {
        setOpenEditmodal(false);
    };


    const SearchService = async (searchterm) => {
        try {
            const request = await Search_service(searchterm);
            setserviceData(request)
        } catch (e) {
            console.log(e)
        }
    }

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
                            fontFamily: '"Poppins", san-serif;',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',

                        }}>
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', borderRadius: 105, fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Clinic Services
                        <Button className={classes.btnregister} onClick={handleAddServices} style={{ float: 'right', marginRight: 20, width: '150px', fontFamily: 'Poppins', fontSize: 12.5, fontWeight: 400 }}>Add Services</Button>
                    </Typography>
                </Grid>

                <Grid item xs={12} container style={{ marginTop: 10 }}>
                    <Grid item xs={12} sm={4}>
                        <Paper elevation={6} className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <center> <SearchIcon className={classes.searchIcon} />
                                        <InputBase
                                            placeholder="Search by Service Name"
                                            value={searchterm}
                                            onChange={(e) => setsearchterm(e.target.value)}
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
                                    <Button className={classes.btnview} onClick={() => SearchService(searchterm)} size="small" style={{ float: 'right', fontSize: 11, textAlign: 'center' }}>View Service</Button>
                                </Grid>

                            </Grid>

                            <DataGrid
                                style={{ height: 325, marginTop: 20, fontSize: 12, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2', cursor: 'pointer' }}
                                rows={serviceData}
                                rowHeight={40}
                                columns={columns}
                                columnWidth={10}
                                pageSize={10}
                                onRowClick={(newSelection) => {
                                    handleCellClick(newSelection.row.id);
                                }}
                            />

                        </Paper>
                    </Grid>


                    <Grid item xs={12} sm={8}>
                        <Paper className={classes.paper} elevation={6} style={{ padding: 20, marginLeft: 25, marginRight: 20 }}>
                            <Grid item xs={12}>
                                <Typography variant="h6" noWrap={true}
                                    style={{
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        color: '#2C7FB2',
                                        fontSize: 18,
                                        textDecoration: 'underline'
                                    }}>
                                    Facility
                                    <Button
                                        onClick={() => {
                                            if (serviceDetails === '') {
                                                alert("Please select patient");
                                                return;
                                            }
                                            setOpenEditmodal(true)
                                        }}
                                        style={{ float: 'right', backgroundColor: '#fff', color: '#2C7FB2', marginLeft: 20, fontFamily: 'Poppins', fontSize: 13, fontWeight: 400 }}>
                                        Edit
                                    </Button>
                                </Typography>

                            </Grid>

                            <Grid container spacing={2} style={{ paddingTop: 20 }}>
                                <Grid item sm={6} >
                                    <Grid container>
                                        <Grid item xs={12} sm={4}>
                                            <Typography variant="h6" noWrap={true} className={classes.facilitiesTitle}>Name</Typography>
                                            <Typography variant="h6" noWrap={true} className={classes.facilitiesTitle}>Discount</Typography>
                                            <Typography variant="h6" noWrap={true} className={classes.facilitiesTitle}>Price</Typography>
                                            <Typography variant="h6" noWrap={true} className={classes.facilitiesTitle}>Total Price</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={8} >
                                            <Typography variant="h6" noWrap={true} className={classes.facilitiesInput} >
                                                {serviceDetails.ServiceName ? serviceDetails.ServiceName : 'NA'}
                                            </Typography>
                                            <Typography variant="h6" noWrap={true} className={classes.facilitiesInput}>
                                                {serviceDetails.Discount ? serviceDetails.Discount + '%' : '0 %'}
                                            </Typography>
                                            <Typography variant="h6" noWrap={true} className={classes.facilitiesInput}>
                                                {serviceDetails.Price != '' ? serviceDetails.Price : 'NA'}
                                            </Typography>
                                            <Typography variant="h6" noWrap={true} className={classes.facilitiesInput}>
                                                {serviceDetails.DiscountPrice != '' ? serviceDetails.DiscountPrice : 'NA'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sm={6} style={{ marginTop: '-10px' }}>
                                    <Paper elevation={3} className={classes.groupreports}>

                                        <center>
                                            {serviceDetails.ServiceImage ? <img src={serviceDetails.ServiceImage} style={{ height: '130px', width: '240px', marginTop: 5, borderRadius: 15 }} /> : <img src="default-image.png" style={{ height: '130px', width: '240px', marginTop: 5, borderRadius: 15 }} />
                                            }
                                            <IconButton onClick={() => setclinicservices(true)} edge="start" size='small' color="inherit" aria-label="close" style={{ marginTop: '-10px', float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0', marginRight: 25 }}>
                                                <EditIcon size='small' />
                                            </IconButton>
                                            {clinicservices ? <Clinic_Service_Image show={clinicservices} data={serviceDetails} handleCloseEditmodal={() => setclinicservices(false)} /> : null}

                                        </center>

                                    </Paper>

                                </Grid>

                            </Grid>

                            <Divider style={{ marginTop: 10, border: '1px solid #F0F0F0' }} />

                            <Grid container spacing={2} style={{ paddingTop: 10, paddingRight: 20 }}>
                                <Grid item sm={12} >
                                    <Typography style={{
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        color: '#2C7FB2',
                                        fontSize: 16,
                                        textDecoration: 'underline'
                                    }}>
                                        Description
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} >
                                    <div className={classes.description} style={{ height: 140, width: 750, }}>
                                        {serviceDetails.Description != '' ? serviceDetails.Description : 'Not Provided'}
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Edit Details  */}
                {openeditmodal ? <Edit_Service_Details show={openeditmodal} data={serviceDetails} handleclose={() => setOpenEditmodal(false)} /> : null}


            </Grid> {/* main grid */}

        </div >
    );
}
