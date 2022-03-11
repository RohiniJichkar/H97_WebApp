import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Container, FormControl, InputLabel, TextField, Typography, Button, Slide, Dialog, Select, DialogContent, DialogContentText, DialogTitle, Table, TableContainer, TableBody, TableCell, TableHead, InputBase, TableRow, TablePagination, Drawer, Divider, MenuItem, Menu, ListItem, ListItemIcon, ListItemText, List, IconButton, Grid, Paper, Link } from "@material-ui/core";
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

import { Add_Medicine, Search_Medicine } from '../Apis/Medicines/index';
import Edit_Medicine from './Medicines/Edit_Medicine/index';
import Delete_Medicine from './Medicines/Delete_Medicine/index';
import ip from '../ipaddress/ip';


const drawerWidth = 240;

const columns = [
    {
        field: 'MedicineId',
        headerName: 'Id',
        width: 100,
        editable: false,
    },
    {
        field: 'MedicineName',
        headerName: 'Name',
        width: 150,
        editable: true,
    },
    {
        field: 'Strength',
        headerName: 'Strength',
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
        // [`& fieldset`]: {
        //     borderRadius: 25,
        // },
        width: 295,
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
        marginTop: 3
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

export default function DoctorMedicines() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const [selectedValue, setSelectedValue] = useState('');
    const [maxWidth, setMaxWidth] = React.useState('md');

    const [medicines, setmedicines] = useState([]);
    const [medicineDetails, setmedicineDetails] = useState('');
    const [mName, setmName] = useState('');
    const [mDescription, setmDescription] = useState('');
    const [mSymptoms, setmSymptoms] = useState('');
    const [mType, setmType] = useState('');
    const [mStrength, setmStrength] = useState('');
    const [mQuantity, setmQuantity] = useState('');
    const [mStartDate, setmStartDate] = useState('');
    const [mExpiryDate, setmExpiryDate] = useState('');
    const [openAddModal, setopenAddModal] = React.useState(false);
    const [openeditmodal, setopeneditmodal] = useState(false);
    const [opendeletemodal, setOpenDeletemodal] = useState(false);

    const [serviceDetails, setserviceDetails] = useState('');
    const [searchterm, setsearchterm] = useState('');


    const fetchmedicines = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        const medicineInfo = await axios.post(ip + 'Web_GetAllMedicines', { ClinicId: clinicid });
        setmedicines(medicineInfo?.data?.Medicine);
    }

    const handleCellClick = async (id) => {
        const medicineDetailedInfo = await axios.post(ip + 'Web_GetMedicineById', { id: id });
        setmedicineDetails(medicineDetailedInfo?.data?.Medicine);
    }

    const SearchMedicine = async (searchterm) => {
        try {
            const request = await Search_Medicine(searchterm);
            setmedicines(request)
        } catch (e) {
            console.log(e)
        }
    }


    const addMedicine = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        let doctorid = parsed.userid;
        const obj = {
            ClinicId: clinicid,
            DoctorId: doctorid,
            MedicineName: mName,
            MedicineDiscription: mDescription,
            Symptoms: mSymptoms,
            Strength: mStrength,
            MedicineType: mType,
            Quantity: mQuantity,
            StartDate: mStartDate,
            ExpiryDate: mExpiryDate
        }
        const add = await Add_Medicine(obj);
        let parse = JSON.parse(add);
        if (parse.success === "200") {
            alert(parse.message);
            window.location.reload()
        }
    }


    const handlereload = () => {
        window.location.reload();
    };

    useEffect(() => {
        fetchmedicines();
    }, []);

    const handleGoBack = () => {
        navigate("/DoctorHome");
    };


    const handleCloseAddModal = () => {
        setopenAddModal(false);
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
                            fontFamily: '"Poppins", san-serif;',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',

                        }}>
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', borderRadius: 105, fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Medicines
                        <Button className={classes.btnregister} onClick={() => setopenAddModal(true)} style={{ float: 'right', marginRight: 20, width: '150px', fontFamily: 'Poppins', fontSize: 12.5, fontWeight: 400 }}>Add Medicines</Button>
                    </Typography>
                </Grid>

                <Grid item xs={12} container style={{ marginTop: 10 }}>
                    <Grid item xs={12} sm={4}>
                        <Paper elevation={6} className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <center> <SearchIcon className={classes.searchIcon} />
                                        <InputBase
                                            placeholder="Search by Medicine Name"
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
                                    <Button className={classes.btnview} onClick={() => SearchMedicine(searchterm)} size="small" style={{ float: 'right', fontSize: 11, textAlign: 'center' }}>View Medicine</Button>
                                </Grid>

                            </Grid>

                            <DataGrid
                                style={{ height: 325, marginTop: 20, fontSize: 12, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2', cursor: 'pointer' }}
                                rows={medicines}
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
                                    Details
                                    <Button size='small'
                                        onClick={() => {
                                            if (medicineDetails === '') {
                                                alert("Please select medicine");
                                                return;
                                            }
                                            setopeneditmodal(true)
                                        }}
                                        style={{ float: 'right', backgroundColor: '#2C7FB2', color: '#fff', marginLeft: 20, fontFamily: 'Poppins', fontSize: 13, fontWeight: 400, width: 100, borderRadius: 20 }}>
                                        Edit
                                    </Button>
                                    <Button size='small'
                                        onClick={() => {
                                            if (medicineDetails === '') {
                                                alert("Please select medicine");
                                                return;
                                            }
                                            setOpenDeletemodal(true)
                                        }}
                                        style={{ float: 'right', backgroundColor: '#2C7FB2', color: '#fff', marginLeft: 20, fontFamily: 'Poppins', fontSize: 13, fontWeight: 400, width: 100, borderRadius: 20 }}>
                                        Delete
                                    </Button>
                                </Typography>

                            </Grid>

                            <Grid container spacing={2} style={{ paddingTop: 20 }}>
                                <Grid item sm={6} >
                                    <Grid container>
                                        <Grid item xs={12} sm={4}>
                                            <Typography variant="h6" noWrap={true} className={classes.facilitiesTitle}>Name</Typography>
                                            <Typography variant="h6" noWrap={true} className={classes.facilitiesTitle}>Type</Typography>
                                            <Typography variant="h6" noWrap={true} className={classes.facilitiesTitle}>Start Date</Typography>
                                            <Typography variant="h6" noWrap={true} className={classes.facilitiesTitle}>End Date</Typography>
                                            <Typography variant="h6" noWrap={true} className={classes.facilitiesTitle}>Strength</Typography>

                                        </Grid>
                                        <Grid item xs={12} sm={8} >
                                            <Typography variant="h6" noWrap={true} className={classes.facilitiesInput} >
                                                {medicineDetails.MedicineName ? medicineDetails.MedicineName : 'NA'}
                                            </Typography>
                                            <Typography variant="h6" noWrap={true} className={classes.facilitiesInput}>
                                                {medicineDetails.MedicineType ? medicineDetails.MedicineType : 'NA'}
                                            </Typography>
                                            <Typography variant="h6" noWrap={true} className={classes.facilitiesInput}>
                                                {medicineDetails.StartDate ? medicineDetails.StartDate : 'NA'}
                                            </Typography>
                                            <Typography variant="h6" noWrap={true} className={classes.facilitiesInput}>
                                                {medicineDetails.ExpiryDate ? medicineDetails.ExpiryDate : 'NA'}
                                            </Typography>
                                            <Typography variant="h6" noWrap={true} className={classes.facilitiesInput}>
                                                {medicineDetails.Strength ? medicineDetails.Strength : 'NA'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
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
                                    <div className={classes.description} style={{ height: 125, width: 750, }}>
                                        {medicineDetails.MedicineDiscription != '' ? medicineDetails.MedicineDiscription : 'Not Provided'}
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>





                {/* Add Medicine Details  */}

                <Dialog
                    open={openAddModal}
                    onClose={handleCloseAddModal}
                    maxWidth={maxWidth}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Add Medicines"}
                        <IconButton edge="start" color="inherit" onClick={handleCloseAddModal} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Grid container>
                                <div>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControl}  >
                                            <TextField className={classes.inputFields} onChange={(e) => setmName(e.target.value)} id="outlined-basic" label="Medicine Name" variant="outlined" size="small" />
                                        </FormControl>
                                    </center>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControl}  >
                                            <TextField className={classes.inputFields} onChange={(e) => setmDescription(e.target.value)} multiline rows={2} maxRows={4} id="outlined-basic" label="Description" variant="outlined" size="small" />
                                        </FormControl>
                                    </center>
                                    <center>
                                        <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '65%', marginLeft: '-5px' }} >

                                            <Select
                                                className={classes.textFieldForm}
                                                size='large'
                                                native
                                                value={mType}
                                                onChange={(e) => setmType(e.target.value)}
                                                label="Medicine Type"
                                                inputProps={{
                                                    name: 'medicine-type',
                                                    id: 'outlined-medicine-type-native-simple',
                                                }}
                                                style={{ width: '105%', fontSize: 14 }}
                                            >
                                                <option aria-label="None" value="" >Medicine Type</option>
                                                <option value='Tablet'>Tablet</option>
                                                <option value='Syrup'>Syrup</option>
                                            </Select>
                                        </FormControl>
                                    </center>
                                    <Grid container style={{ marginTop: 10 }}>
                                        <Grid item xs={6}>
                                            <TextField className={classes.inputFields} onChange={(e) => setmStrength(e.target.value)} id="outlined-basic" label="Strength" variant="outlined" size="small" style={{ width: '130px', float: 'right', marginRight: 15 }} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField className={classes.inputFields} onChange={(e) => setmQuantity(e.target.value)} id="outlined-basic" label="Quantity" variant="outlined" size="small" style={{ width: '130px', marginLeft: 15 }} />
                                        </Grid>
                                    </Grid>

                                    <Grid container style={{ marginTop: 2 }}>
                                        <Grid item xs={6}>
                                            <center>
                                                <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', marginRight: '-5px' }}>
                                                    Start Date
                                                </Typography>
                                            </center>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <center>
                                                <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', marginLeft: '-7px' }}>
                                                    Expiry Date
                                                </Typography>
                                            </center>
                                        </Grid>
                                        <Grid item xs={6} style={{ marginTop: 10 }}>
                                            <TextField className={classes.inputFields} onChange={(e) => setmStartDate(e.target.value)} id="outlined-basic" type='date' variant="outlined" size="small" style={{ width: '130px', float: 'right', marginRight: 15 }} />
                                        </Grid>
                                        <Grid item xs={6} style={{ marginTop: 10 }}>
                                            <TextField className={classes.inputFields} onChange={(e) => setmExpiryDate(e.target.value)} id="outlined-basic" type='date' variant="outlined" size="small" style={{ width: '130px', marginLeft: 15 }} />
                                        </Grid>
                                    </Grid>


                                    <div>
                                        <Grid container xs={12} style={{ marginTop: 15 }}>
                                            <Grid item sm={6} >
                                                <Button className={classes.btnregister} onClick={handlereload} style={{ float: 'right', marginRight: 20 }}>Cancel</Button>
                                            </Grid>
                                            <Grid item sm={6} >
                                                <Button onClick={addMedicine} className={classes.btnregister} style={{ float: 'left', marginLeft: 20 }}>Add</Button>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                            </Grid>
                        </DialogContentText>
                    </DialogContent>

                </Dialog>

                {openeditmodal ? <Edit_Medicine show={openeditmodal} data={medicineDetails} handleEditModal={() => setopeneditmodal(false)} /> : null}
                {opendeletemodal ? <Delete_Medicine show={opendeletemodal} data={medicineDetails} handleclose={() => setOpenDeletemodal(false)} /> : null}


            </Grid > {/* main grid */}

        </div >
    );
}
