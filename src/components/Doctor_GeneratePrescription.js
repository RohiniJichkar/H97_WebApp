import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Switch, Typography, Button, InputBase, Grid, Paper, Card, CardContent, Link } from "@material-ui/core";
import DoctorNavbar from './Doctor_Navbar';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Pdf from '../Prescription_VinayH7B8_38 (1).pdf';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { DataGrid } from '@material-ui/data-grid';
import { fetchMedicineData, addPrescriptionDetails, generatePrescription, generateGeneralPrescription, UpdateAppointmentDetails, } from '../Apis/PatientInQueue/Generate_Prescription/Medicines_Table/index';
import { Search_Medicine } from '../Apis/Medicines/index';
import { useDispatch, connect, useSelector } from 'react-redux';
import DoctorSelectedMedicineList from './Generate_Prescription/selected_medicines';
import PaymentMode from './Generate_Prescription/Payment_Mode/index';
import axios from 'axios';
import ip from '../ipaddress/ip';

const drawerWidth = 240;

const columns = [
    {
        field: 'MedicineId',
        headerName: 'Medicine Id',
        width: 160,
        editable: true,
    },
    {
        field: 'MedicineName',
        headerName: 'Name',
        width: 180,
        editable: true,
    },

];

function DoctorGeneratePrescription() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [details, setdetails] = useState([location.state.detail]);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const [counterbtn, setCounterBtn] = React.useState(0);
    const [counterbtn2, setCounterBtn2] = React.useState(0);
    const [btnColor, setBtnColor] = React.useState('white');
    const [dosestring1, setdosestring1] = React.useState(false);
    const [dosestring2, setdosestring2] = React.useState(false);
    const [dosestring3, setdosestring3] = React.useState(false);
    const [dosestring4, setdosestring4] = React.useState(false);
    const [medicineData, setmedicineData] = useState([]);
    const [medicineDetails, setmedicineDetails] = useState([]);
    const [prescriptiondata, setprescriptiondata] = React.useState('');
    const [beforeMeal, setbeforeMeal] = React.useState(false);
    const [openmodal, setopenmodal] = React.useState(false);
    const [searchterm, setsearchterm] = useState('');

    const [defaultarray, setdefaultarray] = useState(0);
    const dispatch = useDispatch();

    const selectedMedicine = useSelector(state => state);

    const fetchmedicines = async () => {
        const medicines = await fetchMedicineData();
        if (medicines) {
            setmedicineData(medicines);
        }
    }

    // const SearchMedicine = async (searchterm) => {
    //     try {
    //         const request = await Search_Medicine(searchterm);
    //         setmedicineData(request)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    const SearchMedicine = async (searchterm) => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        try {
            const medicineInfo = await axios.post(ip + 'Web_SearchMedicines', { ClinicId: clinicid, MedicineName: searchterm });
            setmedicineData(medicineInfo?.data?.MedicineInfo);
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleRowClick = async (id) => {
        setmedicineDetails(id);
    }

    const add_medicine_in_array = () => {
        if (medicineDetails.MedicineName) {
            var data = localStorage.getItem("userdata");
            let parsed = JSON.parse(data);
            let clinicid = parsed.ClinicId;
            let doctorid = parsed.userid;

            if (counterbtn == 0) {
                alert('Please Select Dose Days');
                return;
            }
            else if(counterbtn2 == 0){
                alert('Please Select Dose Times');
                return;
            }

            setdefaultarray(defaultarray + 1);
            const obj = {
                'id': defaultarray,
                'UserId': details[0].UserId,
                'ClinicId': clinicid,
                'DoctorId': doctorid,
                'AppointmentId': details[0].id,
                'MedicineName': medicineDetails.MedicineName,
                'DoseTime': counterbtn2,
                'DoseDays': counterbtn,
                'MorningDose': dosestring1,
                'AfternoonDose': dosestring2,
                'EveningDose': dosestring3,
                'NightDose': dosestring4,
                'BeforeMeal': beforeMeal,
                'PrescriptionNote': details[0].PrescriptionNote,
                'MedicineId': medicineDetails.MedicineId
            }
            dispatch({ type: 'ADD_MEDICINE', payload: obj })
            setprescriptiondata(selectedMedicine.reducer);
        }
        else {
            alert('Please Select Medicine');
            return;
        }
    }


    const handleaddPrescriptionDetails = async () => {
        if (selectedMedicine.reducer.length <= 0) {
            alert("Please add some medicines then try")
            return;
        }
        setopenmodal(true);
        const requestReports = await addPrescriptionDetails(selectedMedicine.reducer);
    }


    const Edit_Appointment = async () => {
        const obj = {
            AppointmentStatus: 'Completed',
            id: details[0].id
        }
        const editAppointment = await UpdateAppointmentDetails(obj);
    }

    const handleGeneratePDF = async () => {
        const obj = {
            UserId: details[0].UserId,
            id: details[0].id,
        }
        try {
            var data = await localStorage.getItem("userdata");
            let parsed = JSON.parse(data);
            let category = parsed.CodeValueCategory;

            if (category == 'Gynaecologist') {
                const request = await generatePrescription(obj);
                if (request.success === "200") {
                    dispatch({ type: 'RESET_MEDICINE_ITEM' });
                }
            } else {
                const request = await generateGeneralPrescription(obj);
                if (request.success === "200") {
                    dispatch({ type: 'RESET_MEDICINE_ITEM' });
                }
            }
        } catch (e) {
            console.log(e);
        }

    }

    useEffect(() => {
        fetchmedicines();
    }, []);


    const handleIncrement = (event) => {
        setCounterBtn(counterbtn + 1);
    };

    const handleDecrement = (event) => {
        if (counterbtn > 0) {
            setCounterBtn(counterbtn - 1);
        }
    };

    const handleIncrement2 = (event) => {
        setCounterBtn2(counterbtn2 + 1);
    };

    const handleDecrement2 = (event) => {
        if (counterbtn2 > 0) {
            setCounterBtn2(counterbtn2 - 1);
        }
    };

    const handleChange = (event) => {
        setbeforeMeal(event.target.checked);
    };

    const onPreviewClick = () => {
        window.open(Pdf);
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleContinue = () => {
        if (selectedMedicine.reducer.length <= 0) {
            alert("Please add some medicines then try")
            return;
        }
        handleaddPrescriptionDetails().then(data => {
            Edit_Appointment().then(data => {
                handleGeneratePDF();
                navigate('/DoctorPaymentDetails', { state: { detail: location.state.detail } })
            })
        })
    };

    const handleGoBack = () => {
        dispatch({ type: 'RESET_MEDICINE_ITEM' });
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
                        Generate Prescription
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4} style={{ marginTop: 1 }}>
                    <Paper elevation={6} className={classes.paper} style={{ padding: 20, paddingBottom: 50 }}>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <SearchIcon className={classes.searchIcon} />
                                <InputBase
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
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Button onClick={() => SearchMedicine(searchterm)} className={classes.btnview} size="small" style={{ fontSize: 12 }}>View</Button>
                            </Grid>

                        </Grid>

                        <DataGrid
                            style={{ height: 350, marginTop: 20, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2', cursor: 'pointer' }}
                            rows={medicineData}
                            rowHeight={30}
                            columns={columns}
                            columnWidth={10}
                            pageSize={10}
                            onRowClick={(newSelection) => {
                                handleRowClick(newSelection.row);
                            }}
                        />

                    </Paper>
                </Grid>


                <Grid item xs={12} sm={8} style={{ marginTop: 1 }} >
                    <Paper elevation={6} className={classes.paper} style={{ padding: 20, marginLeft: 20, marginRight: 25, height: 470 }}>
                        <Typography className={classes.headingAddMedicine} variant="h6" noWrap={true}  >
                            Add Medicines
                        </Typography>

                        <center>
                            <Typography variant="h6" noWrap={true} style={{
                                fontStyle: 'normal',
                                fontWeight: 600,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                color: '#2C7FB2',
                                fontSize: '16px',
                                marginTop: '-20px'
                            }}>
                                {medicineDetails.MedicineName ? medicineDetails.MedicineName : 'Not Provided'}
                            </Typography>
                        </center>

                        <Grid container style={{ marginTop: 10 }} >
                            <Grid item xs={12} sm={2} >
                                <Typography variant="h6" noWrap={true} style={{
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#707070',
                                    fontSize: 12
                                }}>
                                    Days
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={2} style={{ marginLeft: '-20px' }}>
                                <Typography variant="h6" noWrap={true} style={{
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#707070',
                                    fontSize: 12
                                }}>
                                    Times
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={4} style={{ marginLeft: '-20px' }}>
                                <Typography variant="h6" noWrap={true} style={{
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#707070',
                                    fontSize: 12
                                }}>
                                    Dosages
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={2} style={{ marginLeft: 40 }}>
                                <Typography variant="h6" noWrap={true} style={{
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    float: 'right',
                                    color: '#707070',
                                    fontSize: 12,

                                }}>
                                    Before Meal
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={1}>

                            </Grid>
                            <Grid item xs={12} sm={2} >

                                <Paper elevation={2} className={classes.paper} style={{ width: 70, height: 40, color: '#707070' }}>
                                    <div style={{ marginTop: 1 }}> {counterbtn} </div>
                                    <div>
                                        <ArrowDropUpIcon size='small' onClick={handleIncrement} style={{ marginTop: '-60px', marginLeft: 30, color: '#707070', cursor: 'pointer', fontSize: 35 }} />
                                    </div>
                                    <div>
                                        <ArrowDropDownIcon size='small' onClick={handleDecrement} style={{ marginTop: '-60px', marginLeft: 30, color: '#707070', cursor: 'pointer', fontSize: 35 }} />
                                    </div>
                                </Paper>

                                {/* <ButtonGroup size="small" aria-label="small outlined button group">
                                        <Button onClick={handleIncrement}>+</Button>
                                        <Button disabled>{counterbtn}</Button>
                                        <Button onClick={handleDecrement}>-</Button>
                                    </ButtonGroup> */}

                            </Grid>

                            <Grid item xs={12} sm={2} style={{ marginLeft: '-20px' }}>

                                <Paper elevation={2} className={classes.paper} style={{ width: 70, height: 40, color: '#707070' }}>
                                    <div style={{ marginTop: 1 }}> {counterbtn2} </div>
                                    <div>
                                        <ArrowDropUpIcon size='small' onClick={handleIncrement2} style={{ marginTop: '-60px', marginLeft: 30, color: '#707070', cursor: 'pointer', fontSize: 35 }} />
                                    </div>
                                    <div>
                                        <ArrowDropDownIcon size='small' onClick={handleDecrement2} style={{ marginTop: '-60px', marginLeft: 30, color: '#707070', cursor: 'pointer', fontSize: 35 }} />
                                    </div>
                                </Paper>
                            </Grid>


                            <Grid item xs={5} style={{ marginLeft: '-20px' }} >
                                {/* <ButtonGroup variant="contained" color="primary" aria-label="contained button group" style={{ marginTop: 5 }} > */}
                                {dosestring1 !== true ? <Button onClick={() => setdosestring1(true)} variant="contained" color="primary" size='small' style={{ color: 'black', backgroundColor: 'white', fontSize: '12px', marginTop: 5 }}>Morning</Button> :
                                    <Button onClick={() => setdosestring1(false)} variant="contained" color="primary" size='small' style={{ color: 'White', backgroundColor: '#2C7FB2', fontSize: '12px', marginTop: 5 }}>Morning</Button>
                                }
                                {dosestring2 !== true ? <Button onClick={() => setdosestring2(true)} variant="contained" color="primary" size='small' style={{ color: 'black', backgroundColor: 'white', fontSize: '12px', marginTop: 5 }}>Afternoon</Button> :
                                    <Button onClick={() => setdosestring2(false)} variant="contained" color="primary" size='small' style={{ color: 'White', backgroundColor: '#2C7FB2', fontSize: '12px', marginTop: 5 }}>Afternoon</Button>
                                }
                                {dosestring3 !== true ? <Button onClick={() => setdosestring3(true)} variant="contained" color="primary" size='small' style={{ color: 'black', backgroundColor: 'white', fontSize: '12px', marginTop: 5 }}>Evening</Button> :
                                    <Button onClick={() => setdosestring3(false)} variant="contained" color="primary" size='small' style={{ color: 'White', backgroundColor: '#2C7FB2', fontSize: '12px', marginTop: 5 }}>Evening</Button>
                                }
                                {dosestring4 !== true ? <Button onClick={() => setdosestring4(true)} variant="contained" color="primary" size='small' style={{ color: 'black', backgroundColor: 'white', fontSize: '12px', marginTop: 5 }}>Night</Button> :
                                    <Button onClick={() => setdosestring4(false)} variant="contained" color="primary" size='small' style={{ color: 'White', backgroundColor: '#2C7FB2', fontSize: '12px', marginTop: 5 }}>Night</Button>
                                }

                                {/* </ButtonGroup> */}
                            </Grid>

                            <Grid item xs={12} sm={2} style={{ paddingLeft: 25 }}>
                                <Switch
                                    checked={beforeMeal.checkedB}
                                    onChange={handleChange}
                                    color="primary"
                                    name="checkedB"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    style={{ color: '#2C7FB2' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={1} style={{ marginLeft: 10 }}>
                                <Button onClick={add_medicine_in_array} variant="contained" className={classes.btnAdd}  >
                                    Add
                                </Button>
                            </Grid>

                            {/* <Grid container xs={12} style={{ color: '#707070', marginTop: '10px' }}>
                                <Grid item xs={12} >
                                    <center>
                                        <Button variant="contained" className={classes.btnCancle} style={{ marginRight: 40 }}  >
                                            Cancel
                                        </Button>
                                        <Button onClick={add_medicine_in_array} variant="contained" className={classes.btnAdd}  >
                                            Add
                                        </Button>
                                    </center>
                                </Grid>
                            </Grid> */}


                            {/* medicine list in grid */}
                            {selectedMedicine.reducer.length > 0 ? <DoctorSelectedMedicineList data={selectedMedicine.reducer} /> :
                                <>
                                    <Card elevation={3} style={{ width: 750, marginTop: 15, color: '#2C7FB2', height: 280, fontWeight: 400 }}>
                                        <CardContent >
                                            No Medicine Selected
                                        </CardContent>
                                    </Card>

                                </>}


                            <Grid container xs={12} style={{ marginTop: '10px' }}>
                                <Grid item xs={12} >
                                    <center>
                                        <Button onClick={handleGoBack} className={classes.btnPreview} style={{ marginRight: 40 }}  >
                                            Cancel
                                        </Button>
                                        <Button variant="contained" onClick={() => handleContinue()} className={classes.btngenerate} >
                                            Continue
                                        </Button>
                                    </center>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {openmodal ? <PaymentMode show={openmodal} data={details} handlemodal={() => setopenmodal(false)} /> : ''}

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
        color: '#2C7FB2 !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontSize: '16px',
        textDecoration: 'underline',
        fontWeight: 600,
        textUnderlineOffset: '1px'
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
        fontWeight: 600,
        textAlign: 'center',
        borderRadius: 28,
        width: 90,
        fontSize: '10px'
    },
    btnCancle: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 600,
        textAlign: 'center',
        borderRadius: 28,
        width: 90,
        fontSize: '10px'
    },
    btnPreview: {
        color: '#fff',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
        fontSize: '12px',
        backgroundColor: '#2C7FB2 !important'
    },
    btngenerate: {
        color: '#fff',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
        fontSize: '12px',
        backgroundColor: '#2C7FB2 !important'

    },
}));

export default connect()(DoctorGeneratePrescription);