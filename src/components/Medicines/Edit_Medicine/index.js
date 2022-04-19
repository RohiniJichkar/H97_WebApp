import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField, Slide, Select, FormControl, Button, IconButton, Grid, InputLabel, Radio, Typography, Paper, Link } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { edit_Medicine } from '../../../Apis/Medicines/index';
import axios from 'axios';
import ip from '../../../ipaddress/ip';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const defaultMaterialTheme = createTheme({
    palette: {
        primary: {
            main: '#1769aa',
        },
    },
});

const drawerWidth = 240;


export default function Edit_Medicine({ show, data, handleEditModal }) {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [maxWidth, setMaxWidth] = useState('sm');

    const [mName, setmName] = useState(data.MedicineName);
    const [mDescription, setmDescription] = useState(data.MedicineDiscription);
    const [mType, setmType] = useState(data.MedicineType);
    const [mStrength, setmStrength] = useState(data.Strength);
    const [mQuantity, setmQuantity] = useState(data.Quantity);
    const [mStartDate, setmStartDate] = useState(data.StartDate ? data.StartDate : new Date());
    const [mExpiryDate, setmExpiryDate] = useState(data.ExpiryDate ? data.ExpiryDate : new Date());
    const [medicineTypes, setmedicineTypes] = useState([]);

    const fetchmedicinetypes = async () => {
        try {
            const medicineInfo = await axios.post(ip + 'Web_GetMedicineTypes');
            setmedicineTypes(medicineInfo?.data?.MedicineType);
        } catch (e) {
            console.log(e);
        }
    }

    const editMedicine = async () => {
        var sessiondata = await localStorage.getItem("userdata");
        let parsed = JSON.parse(sessiondata);
        let clinicid = parsed.ClinicId;
        let doctorid = parsed.userid;

        // let startDate = mStartDate.toISOString().split('T')[0];
        // let expirtyDate = mExpiryDate.toISOString().split('T')[0];

        const obj = {
            id: data.id,
            ClinicId: clinicid,
            DoctorId: doctorid,
            MedicineName: mName,
            MedicineDiscription: mDescription,
            Strength: mStrength,
            MedicineType: mType,
            Quantity: mQuantity,
            StartDate: mStartDate,
            ExpiryDate: mExpiryDate,
        }
        try {
            const edit = await edit_Medicine(obj);
            let parse = JSON.parse(edit);
            if (parse.success === "200") {
                alert(parse.message);
                window.location.reload()
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchmedicinetypes();
    }, []);

    return (
        <>
            {/* Edit Patient Details */}

            <Dialog
                open={show}
                maxWidth={maxWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Edit Medicine Details"}
                    <IconButton edge="start" color="inherit" onClick={handleEditModal} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container>
                            <Grid item xs={12} style={{ borderRight: '1px solid #F0F0F0' }}>
                                <center>
                                    <div>
                                        <TextField className={classes.inputFields} value={mName} onChange={(e) => setmName(e.target.value)} id="outlined-basic" size="small" label="Medicine Name" variant="outlined" />
                                        <TextField className={classes.inputFields} value={mDescription} onChange={(e) => setmDescription(e.target.value)} id="outlined-basic" multiline rows={3}
                                            rowsMax={5} size="small" label="Description" variant="outlined" />
                                        <Grid xs={12} >
                                            <FormControl variant="outlined" size="small" className={classes.formControlForm} style={{ width: '73%' }} >
                                                <Select
                                                    className={classes.textFieldForm}
                                                    size='large'
                                                    value={mType}
                                                    onChange={(e) => setmType(e.target.value)}
                                                    native
                                                    label="Medicine Type"
                                                    inputProps={{
                                                        name: 'gender',
                                                        id: 'outlined-gender-native-simple',
                                                    }}
                                                    style={{ width: '75%', fontSize: 14, marginLeft: 50, marginBottom: 15 }}
                                                >
                                                    <option aria-label="None" value="" >Medicine Type</option>
                                                    {medicineTypes.map(v => (<option value={v.MedicineType}>{v.MedicineType}</option>))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <TextField className={classes.inputFields}
                                            InputProps={{
                                                inputProps: { min: 0 }
                                            }}
                                            value={mStrength} onChange={(e) => setmStrength(e.target.value)} id="outlined-basic" size="small" label="Strength" variant="outlined" />
                                        <TextField className={classes.inputFields}
                                            InputProps={{
                                                inputProps: { min: 0 }
                                            }}
                                            value={mQuantity} onChange={(e) => setmQuantity(e.target.value)} id="outlined-basic" type="number" size="small" label="Quantity" variant="outlined" />
                                        <Grid container style={{ marginTop: -10 }}>
                                            <Grid item xs={6}>
                                                <center>
                                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', marginLeft: 80 }}>
                                                        Start Date
                                                    </Typography>
                                                </center>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <center>
                                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', marginRight: 80 }}>
                                                        Expiry Date
                                                    </Typography>
                                                </center>
                                            </Grid>
                                            <Grid item xs={6} style={{ marginTop: 10 }}>
                                                <ThemeProvider theme={defaultMaterialTheme}>
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <KeyboardDatePicker
                                                            autoOk
                                                            size='small'
                                                            value={mStartDate}
                                                            onChange={setmStartDate}
                                                            inputVariant="outlined"
                                                            label="Start Date"
                                                            format='dd/MM/yyyy'
                                                            style={{ float: 'right', width: '130px', marginRight: 20 }}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </ThemeProvider>
                                                {/* <TextField className={classes.inputFields} value={mStartDate} onChange={(e) => setmStartDate(e.target.value)} id="outlined-basic" type='date' variant="outlined" size="small" style={{ width: '130px', float: 'right', marginRight: 20 }} /> */}
                                            </Grid>
                                            <Grid item xs={6} style={{ marginTop: 5 }}>
                                                <ThemeProvider theme={defaultMaterialTheme}>
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <KeyboardDatePicker
                                                            autoOk
                                                            size='small'
                                                            value={mExpiryDate}
                                                            onChange={setmExpiryDate}
                                                            inputVariant="outlined"
                                                            label="Expiry Date"
                                                            format='dd/MM/yyyy'
                                                            style={{ float: 'left', width: '130px', marginLeft: 20 }}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </ThemeProvider>
                                                {/* <TextField className={classes.inputFields} value={mExpiryDate} onChange={(e) => setmExpiryDate(e.target.value)} id="outlined-basic" type='date' variant="outlined" size="small" style={{ width: '130px', float: 'left', marginLeft: 20 }} /> */}
                                            </Grid>
                                        </Grid>
                                    </div>
                                </center>
                            </Grid>


                            <Grid container>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnCancle} onClick={handleEditModal} style={{ float: 'right', marginRight: 20 }}>
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnCancle} onClick={() => editMedicine()} autoFocus style={{ float: 'left', marginLeft: 20 }}>
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </DialogContentText>
                </DialogContent>

            </Dialog>

        </>
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