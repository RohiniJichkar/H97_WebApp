import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Container, FormControl, InputLabel, TextField, Typography, Button, Select, Slide, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableContainer, TableBody, TableCell, TableHead, InputBase, TableRow, TablePagination, Drawer, Divider, MenuItem, Menu, ListItem, ListItemIcon, ListItemText, List, IconButton, Grid, Paper, Link } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import DoctorNavbar from './Doctor_Navbar';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import ip from '../ipaddress/ip';
import { Add_Medicine, Search_Medicine } from '../Apis/Medicines/index';
import Edit_Medicine from './Medicines/Edit_Medicine/index';
import Delete_Medicine from './Medicines/Delete_Medicine/index';

const drawerWidth = 240;


const columns = [
    {
        field: 'MedicineName',
        headerName: 'Name',
        width: 160,
        editable: true,
    },
    {
        field: 'MedicineId',
        headerName: 'Medicine Id',
        width: 160,
        editable: true,
    },
    {
        field: 'MedicineDiscription',
        headerName: 'Expiry Date',
        width: 160,
        editable: true,
    },
    {
        field: 'Strength',
        headerName: 'Strength',
        width: 160,
        editable: true,
        align: 'center'
    },
    {
        field: "Action",
        width: 130,
        sortable: false,

        RenderCell: (params) => {
            const onClickDelete = async () => {
                return alert("Are you Sure!! Do you want to delete medicine");
            };
            const onClickEdit = async () => {
                return alert(JSON.stringify(params.row, null, 4));
            };
            const [openeditmodal, setopeneditmodal] = useState(false);
            const [opendeletemodal, setOpenDeletemodal] = useState(false);

            return (
                <>
                    {openeditmodal ? <Edit_Medicine show={openeditmodal} data={params.row} handleEditModal={() => setopeneditmodal(false)} /> : null}
                    <IconButton onClick={() => setopeneditmodal(true)} style={{ color: '#2C7FB2' }}>
                        <EditIcon />
                    </IconButton>
                    {opendeletemodal ? <Delete_Medicine show={opendeletemodal} data={params.row} handleclose={() => setOpenDeletemodal(false)} /> : null}
                    <IconButton color="secondary" onClick={() => setOpenDeletemodal(true)} style={{ color: '#707070' }}>
                        <DeleteIcon />
                    </IconButton>

                </>
            );
        }
    },
];


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DoctorAddMedicine() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [medicines, setmedicines] = useState([]);
    const [mName, setmName] = useState('');
    const [mDescription, setmDescription] = useState('');
    const [mSymptoms, setmSymptoms] = useState('');
    const [mType, setmType] = useState('');
    const [mStrength, setmStrength] = useState('');
    const [mQuantity, setmQuantity] = useState('');
    const [mStartDate, setmStartDate] = useState('');
    const [mExpiryDate, setmExpiryDate] = useState('');
    const [searchterm, setsearchterm] = useState('');


    const fetchmedicines = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        const medicineInfo = await axios.post(ip + 'Web_GetAllMedicines', { ClinicId: clinicid });
        setmedicines(medicineInfo?.data?.Medicine);
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


    const SearchMedicine = async (searchterm) => {
        try {
            const request = await Search_Medicine(searchterm);
            setmedicines(request)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchmedicines();
    }, [])


    const handleGoBack = () => {
        navigate("/DoctorHome");
    };

    const handlereload = () => {
        window.location.reload();
    };

    const [openeditmodal, setOpenEditmodal] = React.useState(false);

    const handleClickOpenEditmodal = () => {
        setOpenEditmodal(true);
    };

    const handleCloseEditmodal = () => {
        setOpenEditmodal(false);
    };


    const [opendeletemodal, setOpenDeletemodal] = React.useState(false);

    const handleClickOpenDeletemodal = () => {
        setOpenDeletemodal(true);
    };

    const handleCloseDeletemodal = () => {
        setOpenDeletemodal(false);
    };

    

    // const fun = () => {  
    //     document.getElementById("outlined-basic").reset(true);  
    //   } ;

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
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',
                        }}>
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', borderRadius: 105, fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Add Medicines
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4} >
                    <Paper elevation={6} className={classes.paper} >
                        <center> <Typography className={classes.headingAddMedicine} variant="h6" noWrap={true}>
                            Add Medicines
                        </Typography></center>

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
                                <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '83%', marginLeft: 40 }} >

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
                                        style={{ width: '90%', fontSize: 14 }}
                                    >
                                        <option aria-label="None" value="" >Medicine Type</option>
                                        <option value='Tablet'>Tablet</option>
                                        <option value='Syrup'>Syrup</option>
                                    </Select>
                                </FormControl>
                            </center>
                            <Grid container style={{ marginTop: 10 }}>
                                <Grid item xs={6}>
                                    <TextField className={classes.inputFields} onChange={(e) => setmStrength(e.target.value)} id="outlined-basic" label="Strength" variant="outlined" size="small" style={{ width: '130px', float: 'right', marginRight: 20 }} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className={classes.inputFields} onChange={(e) => setmQuantity(e.target.value)} id="outlined-basic" label="Quantity" variant="outlined" size="small" style={{ width: '130px', marginLeft: 20 }} />
                                </Grid>
                            </Grid>

                            <Grid container style={{ marginTop: 2 }}>
                                <Grid item xs={6}>
                                    <center>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                            Start Date
                                        </Typography>
                                    </center>
                                </Grid>
                                <Grid item xs={6}>
                                    <center>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                            Expiry Date
                                        </Typography>
                                    </center>
                                </Grid>
                                <Grid item xs={6} style={{ marginTop: 10 }}>
                                    <TextField className={classes.inputFields} onChange={(e) => setmStartDate(e.target.value)} id="outlined-basic" type='date' variant="outlined" size="small" style={{ width: '130px', float: 'right', marginRight: 20 }} />
                                </Grid>
                                <Grid item xs={6} style={{ marginTop: 10 }}>
                                    <TextField className={classes.inputFields} onChange={(e) => setmExpiryDate(e.target.value)} id="outlined-basic" type='date' variant="outlined" size="small" style={{ width: '130px', marginLeft: 20 }} />
                                </Grid>
                            </Grid>


                            <div>
                                <Grid container xs={12} style={{ marginTop: 15 }}>
                                    <Grid item sm={6} >
                                        <Button className={classes.btnregister} onClick={handlereload}  style={{ float: 'right', marginRight: 20 }}>Cancel</Button>
                                    </Grid>
                                    <Grid item sm={6} >
                                        <Button onClick={addMedicine} className={classes.btnregister} style={{ float: 'left', marginLeft: 20 }}>Add</Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={8}>
                    <Paper elevation={6} className={classes.paper} style={{ marginLeft: 20, marginRight: 30, paddingTop: 20 }}>

                        <Grid item xs={12} sm={6}>
                            <SearchIcon className={classes.searchIcon} />
                            <InputBase
                                label="Search by Name"
                                value={searchterm}
                                placeholder="Search by Medicines"
                                onChange={(e) => setsearchterm(e.target.value)}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,

                                }}
                                variant='outlined'
                                inputProps={{ 'aria-label': 'search' }}
                                style={{ borderRadius: 15 }}
                            > </InputBase>

                            <Button className={classes.btnview} onClick={() => SearchMedicine(searchterm)} size="small" style={{ fontSize: 12 }}>View</Button>

                        </Grid>

                        <DataGrid
                            style={{ height: 365, marginTop: 20, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2' }}
                            rows={medicines}
                            rowHeight={30}
                            columns={columns}
                            columnWidth={10}
                            pageSize={10}
                        />
                    </Paper>
                </Grid>


                {/* Edit Details  */}

                <Dialog
                    open={openeditmodal}
                    onClose={handleCloseEditmodal}
                    maxWidth={maxWidth}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Edit Details"}
                        <IconButton edge="start" color="inherit" onClick={handleCloseEditmodal} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Grid container>
                                <div >
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControl}  >
                                            <TextField className={classes.inputFields} id="outlined-basic" label="Medicine Name" variant="outlined" size="small" />
                                        </FormControl>
                                    </center>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControl}  >
                                            <TextField className={classes.inputFields} multiline rows={2} maxRows={4} id="outlined-basic" label="Description" variant="outlined" size="small" />
                                        </FormControl>
                                    </center>
                                    <center>
                                        <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '73%', marginLeft: 35 }} >
                                            <InputLabel htmlFor="outlined-age-native-simple">Medicine Type</InputLabel>
                                            <Select
                                                className={classes.textFieldForm}
                                                size='large'
                                                native
                                                label="Medicine Type"
                                                inputProps={{
                                                    name: 'medicine-type',
                                                    id: 'outlined-medicine-type-native-simple',
                                                }}
                                                style={{ width: '90%', fontSize: 13 }}
                                            >
                                                <option aria-label="None" value="" />
                                                <option value={1}>Tablet</option>
                                                <option value={2}>Syrup</option>
                                            </Select>
                                        </FormControl>
                                    </center>
                                    <Grid container style={{ marginTop: 10 }}>
                                        <Grid item xs={6}>
                                            <TextField className={classes.inputFields} id="outlined-basic" label="Strength" variant="outlined" size="small" style={{ width: '130px', float: 'right', marginRight: 20 }} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField className={classes.inputFields} id="outlined-basic" label="Quantity" variant="outlined" size="small" style={{ width: '130px', marginLeft: 20 }} />
                                        </Grid>
                                    </Grid>

                                    <Grid container style={{ marginTop: 2 }}>
                                        <Grid item xs={6}>
                                            <center>
                                                <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                                    Start Date
                                                </Typography>
                                            </center>
                                        </Grid>
                                        <Grid item xs={6} style={{ marginTop: 10 }}>
                                            <TextField className={classes.inputFields} id="outlined-basic" type='date' variant="outlined" size="small" style={{ width: '130px', marginLeft: 20 }} />
                                        </Grid>
                                        <Grid item xs={6} style={{ marginTop: 10 }}>
                                            <center>
                                                <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                                    Expiry Date
                                                </Typography>
                                            </center>
                                            {/* <TextField className={classes.inputFields} id="outlined-basic" type='date' variant="outlined" size="small" style={{ width: '130px', float: 'right', marginRight: 20 }} /> */}
                                        </Grid>
                                        <Grid item xs={6} style={{ marginTop: 10 }}>
                                            <TextField className={classes.inputFields} id="outlined-basic" type='date' variant="outlined" size="small" style={{ width: '130px', marginLeft: 20 }} />
                                        </Grid>
                                    </Grid>


                                    <div>
                                        <Grid container xs={12} style={{ marginTop: 15 }}>
                                            <Grid item sm={6} >
                                                <Button className={classes.btnregister} style={{ float: 'right', marginRight: 20 }}>Cancel</Button>
                                            </Grid>
                                            <Grid item sm={6} >
                                                <Button className={classes.btnregister} onClick={addMedicine} style={{ float: 'left', marginLeft: 20 }}>Add</Button>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                            </Grid>
                        </DialogContentText>
                    </DialogContent>

                </Dialog>


                {/* for Delete User */}
                {/* <Dialog
                    open={opendeletemodal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseDeletemodal}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title" style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#00318B' }}>{"Are you sure ?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description" style={{ fontFamily: 'Poppins', fontWeight: 400, color: '#707070' }}>
                            Do you want to Delete Medicine?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ marginTop: 20 }}>
                        <Button className={classes.btnregister} onClick={handleCloseDeletemodal} style={{ width: 100 }} >
                            No
                        </Button>
                        <Button className={classes.btnregister} onClick={handleCloseDeletemodal} style={{ width: 100 }}>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog> */}


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
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 11,
        color: 'gray'
    },
    btnview: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 25,
        paddingLeft: 35,
        paddingRight: 35,
        marginLeft:20
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
        fontSize: '11px'
    },
}));