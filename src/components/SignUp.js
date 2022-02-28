import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Container, FormControlLabel, InputAdornment, Select, InputLabel, FormControl, TextField, Typography, Button, Grid, Paper, IconButton } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import AdminNavbar from './Admin_Navbar';
import CreateIcon from '@material-ui/icons/Create';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Add_Clinic, Times, Doctor_Category, Payment_Packages } from '../Admin_Apis/Add_Clinic/index';
import PaymentPackages from './Sign_Up';

const drawerWidth = 240;



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
        fontWeight: 600,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    grid: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginTop: 10,
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
    formControl: {
        paddingBottom: theme.spacing(2.5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    textField: {
        // [`& fieldset`]: {
        //     borderRadius: 25,
        // },

        fontFamily: 'Poppins;',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 11,
        textAlign: 'center',
        width: '80%',
        height: 30,
    },
    formControlForm: {
        paddingBottom: theme.spacing(3),
        alignItems: 'center',
        justifyContent: 'center',
    },
    textFieldForm: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 11,
    },
    reason: {
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        height: 50,
        color: 'gray',
        border: '1px solid #F0F0F0',
    },
    btnCancle: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 600,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        marginTop: 10,
        fontSize: '13px'
    },
    inputFields: {
        // [`& fieldset`]: {
        //     borderRadius: 25,
        // },
        width: 300,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 200,
        marginTop: 15
    },
    btnSubmit: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
    },

}));


export default function SignUp() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [mobile, setmobile] = useState('');
    const [dob, setdob] = useState('');
    const [gender, setgender] = useState('');
    const [email, setemail] = useState('');
    const [address, setaddress] = useState('');
    const [city, setcity] = useState('');
    const [state, setstate] = useState('');
    const [pincode, setpincode] = useState('');
    const [country, setcountry] = useState('');
    const [education, seteducation] = useState('');
    const [category, setcategory] = useState('');
    const [clinicName, setclinicName] = useState('');
    const [clinicAddress, setclinicAddress] = useState('');
    const [clinicMobile, setclinicMobile] = useState('');
    const [clinicEmail, setclinicEmail] = useState('');
    const [clinicCity, setclinicCity] = useState('');
    const [clinicState, setclinicState] = useState('');
    const [clinicPincode, setclinicPincode] = useState('');
    const [clinicCountry, setclinicCountry] = useState('');
    const [clinicRegNo, setclinicRegNo] = useState('');
    const [clinicGSTNo, setclinicGSTNo] = useState('');
    const [noofStaff, setnoofStaff] = useState('');
    const [clinicStartTime, setclinicStartTime] = useState('');
    const [clinicEndTime, setclinicEndTime] = useState('');
    const [latitude, setlatitude] = useState('');
    const [longitude, setlongitude] = useState('');
    const [morningStartTime, setmorningStartTime] = useState('');
    const [morningEndTime, setmorningEndTime] = useState('');
    const [eveningStartTime, seteveningStartTime] = useState('');
    const [eveningEndTime, seteveningEndTime] = useState('');
    const [subscriptionType, setsubscriptionType] = useState('');
    const [subscriptionAmount, setsubscriptionAmount] = useState('');
    const [subscriptionStartDate, setsubscriptionStartDate] = useState('');
    const [subscriptionEndDate, setsubscriptionEndDate] = useState('');
    const [subscriptionOtherFees, setsubscriptionOtherFees] = useState('');
    const [subscriptionTotalAmount, setsubscriptionTotalAmount] = useState('');
    const [subscriptionPaymentMode, setsubscriptionPaymentMode] = useState('');
    const [profileImage, setprofileImage] = useState('');
    const [clinicLogo, setclinicLogo] = useState(null);
    const [doctorCategory, setdoctorCategory] = useState([]);
    const [times, settimes] = useState([]);
    const [amount, setamount] = React.useState('');
    const [packages, setpackages] = useState([]);
    var now = new Date();
    var date = now.toISOString().split('T')[0];
    var afterDate = new Date(new Date().setDate(now.getDate() + 30));
    var endDt = afterDate.toISOString().split('T')[0];
    const [dataformodal, setdataformodal] = useState([]);
    const [showpackagemodal, setshowpackagemodal] = useState(false);
    const [showPassword, setshowPassword] = useState(false);
    const [password, setpassword] = useState('');

    const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const fetchDoctorCategory = async () => {
        const category = await Doctor_Category();
        setdoctorCategory(category);
    }

    const fetchTimes = async () => {
        const times = await Times();
        settimes(times);
    }


    const fetchPaymentPackages = async () => {
        const packages = await Payment_Packages();
        if (packages) {
            setpackages(packages);
        }
    }


    const Add_Clinic = async () => {
        if (clinicLogo == '') {
            alert("Please Select Clinic Logo")
            return;
        }
        else if (clinicName == '') {
            alert("Please Enter Clinic Name")
            return;
        }
        else if (clinicMobile == '') {
            alert("Please Enter Clinic Mobile No")
            return;
        }
        else if (clinicAddress == '') {
            alert("Please Enter Clinic Address")
            return;
        }
        else if (firstName == '') {
            alert("Please Enter First Name")
            return;
        }
        else if (lastName == '') {
            alert("Please Enter Last Name");
            return
        }
        else if (password == '') {
            alert("Please Enter Password");
            return
        }
        else if (city == '') {
            alert("Please Enter City");
            return
        }
        else if (state == '') {
            alert("Please Enter State");
            return
        }
        else if (country == '') {
            alert("Please Enter Country");
            return
        }
        else if (clinicGSTNo == '') {
            alert("Please Enter Clinic Gst Number");
            return
        }
        else if (clinicRegNo == '') {
            alert("Please Enter Clinic Registration Number");
            return
        }
        else if (noofStaff == '') {
            alert("Please Enter Clinic Number of Staff");
            return
        }
        else if (clinicStartTime == '') {
            alert("Please Enter Clinic Start Time");
            return
        }
        else if (clinicEndTime == '') {
            alert("Please Enter Clinic End Time");
            return
        }

        setdataformodal(
            {
                'file': clinicLogo,
                'ClinicName': clinicName,
                'ClinicMobileNo': clinicMobile,
                'ClinicEmail': clinicEmail,
                'ClinicAddress': clinicAddress,
                'ClinicCity': clinicCity,
                'ClinicState': clinicState,
                'ClinicPincode': clinicPincode,
                'ClinicGstNumber': clinicGSTNo,
                'ClinicRegistrationNumber': clinicRegNo,
                'ClinicStartTime': clinicStartTime,
                'ClinicEndTime': clinicEndTime,
                'NoOfStaff': noofStaff,
                'createdDate': date,
                'Latitude': latitude,
                'Longitude': longitude,
                'FirstName': firstName,
                'LastName': lastName,
                'Password': password,
                'MobileNo': mobile,
                'Email': email,
                'Address': address,
                'City': city,
                'Pincode': pincode,
                'State': state,
                'Country': country,
                'MorningStartTime': morningStartTime,
                'MorningEndTime': morningEndTime,
                'EveningStartTime': eveningStartTime,
                'EveningEndTime': eveningEndTime,
                'Category': category,
                'Gender': gender,
                'Education': education,
                'ClinicTime': clinicStartTime + '-' + clinicEndTime,

            }
        )
        setshowpackagemodal(true);
    }

    // const convertToBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);
    //         fileReader.onload = () => {
    //             resolve(fileReader.result);
    //         };
    //         fileReader.onerror = (error) => {
    //             reject(error);
    //         };
    //     });
    // };
    // const handleFileUpload = async (e) => {
    //     const file = e.target.files[0];
    //     const base64 = await convertToBase64(file);
    //     setclinicLogo(base64);
    // };


    useEffect(() => {
        fetchDoctorCategory();
        fetchTimes();
        fetchPaymentPackages();
    }, []);


    const handleGoBack = () => {
        navigate('/');
    };


    return (
        <div className={classes.root} style={{ backgroundColor: '#ffffff' }}>

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
                            fontWeight: 500,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',

                        }}>
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', borderRadius: 105, fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Add Clinic
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    <Paper elevation={4} className={classes.paper} style={{ marginLeft: 5, marginRight: 20, marginBottom: 40, borderRadius: 20 }}>
                        <Grid container >
                            <Grid item xs={12}>
                                <Typography variant="h6" noWrap={true} style={{
                                    fontSize: 16,
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    color: '#2C7FB2',
                                    fontWeight: 600,
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '1px',
                                }}>
                                    Clinic Details

                                </Typography>
                            </Grid>
                            <Grid container style={{ marginTop: 20 }}>
                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Clinic Name:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm}
                                                value={clinicName}
                                                onChange={(e) => setclinicName(e.target.value)} id="outlined-basic" size="small" label="Clinic Name" variant="outlined" style={{ width: '150%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Timings:
                                    </Typography>

                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container style={{ marginTop: '-30px' }}>
                                        <Grid item xs={6}>
                                            <center>
                                                <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', fontWeight: 600 }}>
                                                    Start Time
                                                </Typography>
                                            </center>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <center>
                                                <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', fontWeight: 600 }}>
                                                    End Time
                                                </Typography>
                                            </center>
                                        </Grid>
                                    </Grid>
                                    <Grid container style={{ marginTop: 10 }}>
                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '80%', fontWeight: 600 }} >
                                                    <Select
                                                        className={classes.textFieldForm}
                                                        size='large'
                                                        native
                                                        value={clinicStartTime}
                                                        onChange={(e) => setclinicStartTime(e.target.value)}
                                                        label="Start Time"
                                                        inputProps={{
                                                            name: 'start time',
                                                            id: 'outlined-start-time-native-simple',
                                                        }}
                                                        style={{ width: '90%', fontSize: 14, fontWeight: 600 }}
                                                    >
                                                        <option aria-label="None" value="">Start Time</option>
                                                        {times.map((item) => {
                                                            return (
                                                                <option value={item.ActualTime}>{item.DisplayTime}</option>
                                                            )
                                                        })}

                                                    </Select>
                                                </FormControl>
                                            </center>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '80%', fontWeight: 600 }} >
                                                    <Select
                                                        className={classes.textFieldForm}
                                                        size='large'
                                                        native
                                                        value={clinicEndTime}
                                                        onChange={(e) => setclinicEndTime(e.target.value)}
                                                        label="End Time"
                                                        inputProps={{
                                                            name: 'end time',
                                                            id: 'outlined-end-time-native-simple',
                                                        }}
                                                        style={{ width: '90%', fontSize: 14, fontWeight: 600 }}
                                                    >
                                                        <option aria-label="None" value="">End Time</option>
                                                        {times.map((item) => {
                                                            return (
                                                                <option value={item.ActualTime}>{item.DisplayTime}</option>
                                                            )
                                                        })}
                                                    </Select>
                                                </FormControl>
                                            </center>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Contact Number:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm}
                                                value={clinicMobile}
                                                onChange={(e) => setclinicMobile(e.target.value)}
                                                type='number'
                                                id="outlined-basic" size="small" label="Clinic Mobile No" variant="outlined" style={{ width: '150%' }}
                                                onInput={(e) => {
                                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                                }} />
                                        </FormControl>
                                    </center>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Clinic GST Number:
                                    </Typography>

                                </Grid>
                                <Grid item xs={4}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm}
                                                value={clinicGSTNo}
                                                onChange={(e) => setclinicGSTNo(e.target.value)}
                                                id="outlined-basic" size="small" label="Gst Number" variant="outlined" style={{ width: '150%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Email ID:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm} value={clinicEmail} onChange={(e) => setclinicEmail(e.target.value)} id="outlined-basic" size="small" label="Email Id" variant="outlined" style={{ width: '150%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Registration Number:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm} value={clinicRegNo} onChange={(e) => setclinicRegNo(e.target.value)} id="outlined-basic" size="small" label="Registration Number" variant="outlined" style={{ width: '150%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>


                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600

                                    }}>
                                        Address:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm} value={clinicAddress} onChange={(e) => setclinicAddress(e.target.value)} id="outlined-basic" size="small" label="Address" variant="outlined" style={{ width: '150%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        No. of Staff:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm} value={noofStaff} onChange={(e) => setnoofStaff(e.target.value)} id="outlined-basic" size="small" label="Number of Staff" variant="outlined" style={{ width: '150%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>


                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        City/Pincode:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" className={classes.formControlForm}  >
                                                    <TextField className={classes.textFieldForm} value={clinicCity}
                                                        onChange={(e) => {
                                                            const re = /^[A-Za-z]+$/;

                                                            // if value is not blank, then test the regex

                                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                                setclinicCity(e.target.value)
                                                            }
                                                        }} id="outlined-basic" size="small" label="City" variant="outlined" style={{ width: '70%' }} />
                                                </FormControl>
                                            </center>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" className={classes.formControlForm}  >
                                                    <TextField className={classes.textFieldForm} value={clinicPincode} onChange={(e) => setclinicPincode(e.target.value)} id="outlined-basic" size="small" label="Pincode" variant="outlined" style={{ width: '70%' }} />
                                                </FormControl>
                                            </center>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Geographic Location:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" className={classes.formControlForm}  >
                                                    <TextField className={classes.textFieldForm} value={latitude} onChange={(e) => setlatitude(e.target.value)} id="outlined-basic" size="small" label="Latitude" variant="outlined" style={{ width: '70%' }} />
                                                </FormControl>
                                            </center>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" className={classes.formControlForm}  >
                                                    <TextField className={classes.textFieldForm} value={longitude} onChange={(e) => setlongitude(e.target.value)} id="outlined-basic" size="small" label="Longitude" variant="outlined" style={{ width: '70%' }} />
                                                </FormControl>
                                            </center>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        State/Country:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" className={classes.formControlForm}  >
                                                    <TextField className={classes.textFieldForm} value={clinicState} onChange={(e) => setclinicState(e.target.value)} id="outlined-basic" size="small" label="State" variant="outlined" style={{ width: '70%' }} />
                                                </FormControl>
                                            </center>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" className={classes.formControlForm}  >
                                                    <TextField className={classes.textFieldForm}
                                                        value={clinicCountry}
                                                        onChange={(e) => {
                                                            const re = /^[A-Za-z]+$/;

                                                            // if value is not blank, then test the regex

                                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                                setclinicCountry(e.target.value)
                                                            }
                                                        }} id="outlined-basic" size="small" label="Country" variant="outlined" style={{ width: '70%' }} />
                                                </FormControl>
                                            </center>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Logo:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <center>
                                        {/* <input type='file' /> */}
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm} onChange={(e) => setclinicLogo(e.target.files[0])} id="outlined-basic" type="file" size="small" label="" variant="outlined" style={{ width: '100%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Paper>



                    <Paper elevation={4} className={classes.paper} style={{ marginLeft: 5, marginRight: 20, marginBottom: 40, borderRadius: 20 }}>
                        <Grid container >
                            <Grid item xs={12}>
                                <Typography variant="h6" noWrap={true} style={{
                                    fontSize: 16,
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    color: '#2C7FB2',
                                    fontWeight: 600,
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '1px',
                                }}>
                                    Doctor Details

                                </Typography>
                            </Grid>
                            <Grid container style={{ marginTop: 20 }}>
                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        First Name:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm}
                                                value={firstName}
                                                onChange={(e) => {
                                                    const re = /^[A-Za-z]+$/;

                                                    // if value is not blank, then test the regex

                                                    if (e.target.value === '' || re.test(e.target.value)) {
                                                        setfirstName(e.target.value)
                                                    }
                                                }} id="outlined-basic" size="small" label="First Name" variant="outlined" style={{ width: '150%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Morning Shift:
                                    </Typography>

                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container style={{ marginTop: '-40px' }}>
                                        <Grid item xs={6}>
                                            <center>
                                                <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', fontWeight: 600 }}>
                                                    Start Time
                                                </Typography>
                                            </center>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <center>
                                                <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', fontWeight: 600 }}>
                                                    End Time
                                                </Typography>
                                            </center>
                                        </Grid>
                                    </Grid>
                                    <Grid container style={{ marginTop: 10 }}>
                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '80%', fontWeight: 600 }} >

                                                    <Select
                                                        className={classes.textFieldForm}
                                                        size='large'
                                                        native
                                                        value={morningStartTime}
                                                        onChange={(e) => setmorningStartTime(e.target.value)}
                                                        label="Start Time"
                                                        inputProps={{
                                                            name: 'start time',
                                                            id: 'outlined-start-time-native-simple',
                                                        }}
                                                        style={{ width: '90%', fontSize: 14, fontWeight: 600 }}
                                                    >
                                                        <option aria-label="None" value="">Start Time</option>
                                                        {times.map((item) => {
                                                            return (
                                                                <option value={item.ActualTime}>{item.DisplayTime}</option>
                                                            )
                                                        })}
                                                    </Select>
                                                </FormControl>
                                            </center>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '80%', fontWeight: 600 }} >

                                                    <Select
                                                        className={classes.textFieldForm}
                                                        size='large'
                                                        native
                                                        value={morningEndTime}
                                                        onChange={(e) => setmorningEndTime(e.target.value)}
                                                        label="End Time"
                                                        inputProps={{
                                                            name: 'end time',
                                                            id: 'outlined-end-time-native-simple',
                                                        }}
                                                        style={{ width: '90%', fontSize: 14, fontWeight: 600 }}
                                                    >
                                                        <option aria-label="None" value="">End Time</option>
                                                        {times.map((item) => {
                                                            return (
                                                                <option value={item.ActualTime}>{item.DisplayTime}</option>
                                                            )
                                                        })}
                                                    </Select>
                                                </FormControl>
                                            </center>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Last Name:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm}
                                                value={lastName}
                                                onChange={(e) => {
                                                    const re = /^[A-Za-z]+$/;
                                                    if (e.target.value === '' || re.test(e.target.value)) {
                                                        setlastName(e.target.value)
                                                    }
                                                }} id="outlined-basic" size="small" label="Last Name" variant="outlined" style={{ width: '150%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Evening Shift:
                                    </Typography>

                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container style={{ marginTop: '-30px' }}>
                                        <Grid item xs={6}>
                                            <center>
                                                <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', fontWeight: 600 }}>
                                                    Start Time
                                                </Typography>
                                            </center>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <center>
                                                <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', fontWeight: 600 }}>
                                                    End Time
                                                </Typography>
                                            </center>
                                        </Grid>
                                    </Grid>
                                    <Grid container style={{ marginTop: 10 }}>
                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '80%', fontWeight: 600 }} >

                                                    <Select
                                                        className={classes.textFieldForm}
                                                        size='large'
                                                        native
                                                        value={eveningStartTime}
                                                        onChange={(e) => seteveningStartTime(e.target.value)}
                                                        label="Start Time"
                                                        inputProps={{
                                                            name: 'start time',
                                                            id: 'outlined-start-time-native-simple',
                                                        }}
                                                        style={{ width: '90%', fontSize: 14, fontWeight: 600 }}
                                                    >
                                                        <option aria-label="None" value="" >Start Time</option>
                                                        {times.map((item) => {
                                                            return (
                                                                <option value={item.ActualTime}>{item.DisplayTime}</option>
                                                            )
                                                        })}

                                                    </Select>
                                                </FormControl>
                                            </center>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '80%', fontWeight: 600 }} >
                                                    <Select
                                                        className={classes.textFieldForm}
                                                        size='large'
                                                        native
                                                        value={eveningEndTime}
                                                        onChange={(e) => seteveningEndTime(e.target.value)}
                                                        label="End Time"
                                                        inputProps={{
                                                            name: 'end time',
                                                            id: 'outlined-end-time-native-simple',
                                                        }}
                                                        style={{ width: '90%', fontSize: 14, fontWeight: 600 }}
                                                    >
                                                        <option aria-label="None" value="">End Time</option>
                                                        {times.map((item) => {
                                                            return (
                                                                <option value={item.ActualTime}>{item.DisplayTime}</option>
                                                            )
                                                        })}
                                                    </Select>
                                                </FormControl>
                                            </center>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Email ID:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm} value={email} onChange={(e) => setemail(e.target.value)} id="outlined-basic" size="small" label="Email Id" variant="outlined" style={{ width: '150%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Address:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField multiline rows={2} maxRows={5} value={address} className={classes.textFieldForm} onChange={(e) => setaddress(e.target.value)} id="outlined-basic" size="small" label="Address" variant="outlined" style={{ width: '165%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>

                                <Grid item xs={2} style={{ marginTop: '-20px' }}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600

                                    }}>
                                        Mobile No:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} style={{ marginTop: '-20px' }}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm}
                                                value={mobile}
                                                onChange={(e) => {
                                                    const re = /^[0-9\b]+$/;
                                                    if (e.target.value === '' || re.test(e.target.value)) {
                                                        setmobile(e.target.value)
                                                    }
                                                }} type='number' id="outlined-basic" size="small" label="Mobile No" variant="outlined" style={{ width: '150%' }}
                                                onInput={(e) => {
                                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                                }}
                                            />
                                        </FormControl>
                                    </center>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        City/Pincode:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" className={classes.formControlForm}  >
                                                    <TextField className={classes.textFieldForm} value={city} onChange={(e) => setcity(e.target.value)} id="outlined-basic" size="small" label="City" variant="outlined" style={{ width: '70%' }} />
                                                </FormControl>
                                            </center>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" className={classes.formControlForm}  >
                                                    <TextField className={classes.textFieldForm} value={pincode} onChange={(e) => setpincode(e.target.value)} id="outlined-basic" size="small" label="Pincode" variant="outlined" style={{ width: '70%' }} />
                                                </FormControl>
                                            </center>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={2} style={{ marginTop: '-20px' }}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Degree:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} style={{ marginTop: '-20px' }}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm} value={education} onChange={(e) => seteducation(e.target.value)} id="outlined-basic" size="small" label="Degree" variant="outlined" style={{ width: '150%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        State/Country:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" className={classes.formControlForm}  >
                                                    <TextField className={classes.textFieldForm} value={state} onChange={(e) => setstate(e.target.value)} id="outlined-basic" size="small" label="State" variant="outlined" style={{ width: '70%' }} />
                                                </FormControl>
                                            </center>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <center>
                                                <FormControl variant="outlined" className={classes.formControlForm}  >
                                                    <TextField className={classes.textFieldForm} value={country} onChange={(e) => setcountry(e.target.value)} id="outlined-basic" size="small" label="Country" variant="outlined" style={{ width: '70%' }} />
                                                </FormControl>
                                            </center>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} style={{ marginTop: '-20px' }}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Category:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} style={{ marginTop: '-20px' }}>
                                    <center>
                                        <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '85%', fontWeight: 600 }} >
                                            <Select
                                                className={classes.textFieldForm}
                                                size='large'
                                                native
                                                value={category}
                                                onChange={(e) => setcategory(e.target.value)}
                                                label="category"
                                                inputProps={{
                                                    name: 'category',
                                                    id: 'outlined-category-native-simple',
                                                }}
                                                style={{ width: '100%', fontSize: 14, fontWeight: 600 }}
                                            >
                                                <option aria-label="None" value="" >Category</option>
                                                {doctorCategory.map((item) => {
                                                    return (
                                                        <option value={item.Category}>{item.Category}</option>
                                                    )
                                                })}

                                            </Select>
                                        </FormControl>
                                    </center>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Registration Number:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} >
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm} value={clinicRegNo} id="outlined-basic" size="small" label="Registration Number" variant="outlined" style={{ width: '150%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>

                                <Grid item xs={2} style={{ marginTop: '-20px' }}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Date of Birth:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} style={{ marginTop: '-20px' }}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <FormControl variant="outlined" className={classes.formControlForm}  >
                                                <TextField className={classes.textFieldForm} value={dob} onChange={(e) => setdob(e.target.value)} id="outlined-basic" type="date" size="small" variant="outlined" style={{ width: '82%', float: 'right', marginLeft: 10, fontSize: 10 }} />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '88%', fontWeight: 600 }} >
                                                <Select
                                                    className={classes.textFieldForm}
                                                    size='large'
                                                    native
                                                    value={gender}
                                                    onChange={(e) => setgender(e.target.value)}
                                                    label="Gender"
                                                    inputProps={{
                                                        name: 'gender',
                                                        id: 'outlined-gender-native-simple',
                                                    }}
                                                    style={{ width: '90%', fontSize: 14, fontWeight: 600, float: 'left' }}
                                                >
                                                    <option aria-label="None" value="">Gender</option>
                                                    <option value='Male'>Male</option>
                                                    <option value='Female'>Female</option>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600
                                    }}>
                                        Password:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} >
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm} label="Password"
                                                value={password}
                                                type={showPassword ? 'text' : 'password'}
                                                onChange={(e) => setpassword(e.target.value)}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                            >
                                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                id="outlined-basic" size="small" variant="outlined" style={{ width: '120%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Paper>




                    {showpackagemodal ? <PaymentPackages show={showpackagemodal} data={dataformodal} handleclose={() => setshowpackagemodal(false)} /> : null}

                    <Grid container style={{ marginTop: '-20px', paddingBottom: 30 }}>
                        <Grid xs={12} sm={6}>
                            <Button className={classes.btnCancle} style={{ float: 'right', marginRight: 20 }}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Button onClick={() => {
                                Add_Clinic();

                            }} className={classes.btnCancle} style={{ float: 'left', marginLeft: 20 }}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>

            </Grid> {/* main grid */}

        </div >
    );
}
