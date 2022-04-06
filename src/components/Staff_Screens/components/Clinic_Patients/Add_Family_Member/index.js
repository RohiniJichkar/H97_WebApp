import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField, Slide, Select, FormControl, Button, IconButton, Grid, Paper } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { AddFamilyMember } from '../../../../../Apis/Staff/Clinic_Patients/Add_Family_Member';
import { Country, State, City } from '../../../../../Apis/Staff/Clinic_Patients/Patient_Registration';
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function Add_Family_Member({ show, data, handleclose }) {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    let obj = {};
    obj = data;
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [firstnm, setfirstnm] = useState();
    const [lastnm, setlastnm] = useState();
    const [mobile, setmobile] = useState(obj ? obj.MobileNo : '');
    const [alternatemobile, setalternatemobile] = useState('');
    const [email, setemail] = useState();
    const [dob, setdob] = useState(new Date());
    const [gender, setgender] = useState();
    const [bloodrelation, setbloodrelation] = useState('');
    const [address, setaddress] = useState(obj ? obj?.Address : '');
    const [city, setcity] = useState(obj ? obj?.City : '');
    const [pincode, setpincode] = useState(obj ? obj?.Pincode : '');
    const [state, setstate] = useState(obj ? obj?.State : '');
    const [country, setcountry] = useState(obj ? obj?.Country : '');
    const [height, setheight] = useState();
    const [weight, setweight] = useState();
    const [countryData, setcountryData] = useState([]);
    const [stateData, setstateData] = useState([]);
    const [cityData, setcityData] = useState([]);
    const [title, settitle] = useState('');

    const fetchCountry = async () => {
        const countries = await Country();
        setcountryData(countries);
    }

    const fetchState = async () => {
        const statess = await State();
        setstateData(statess);
    }

    const fetchCity = async () => {
        const obj = {
            StateName: state
        }
        const cities = await City(obj);
        setcityData(cities);
    }


    const AddDFamilyMemberDetails = async () => {
        var cdata = await localStorage.getItem("userdata");
        let parsed = JSON.parse(cdata);
        let clinicid = parsed.ClinicId;
        const date = new Date();
        const now = date.toISOString().split('T')[0];

        let Dob = dob.toISOString().split('T')[0];

        if (title == '') {
            alert('Please Select Title');
            return;
        }
        if (firstnm == '') {
            alert('Please Enter First Name');
            return;
        }
        else if (lastnm == '') {
            alert('Please Enter Last Name');
            return;
        }
        else if (dob == '') {
            alert('Please Enter DOB');
            return;
        }
        else if (gender == '') {
            alert('Please Enter Gender');
            return;
        }

        const object = {
            ClinicId: clinicid,
            FirstName: firstnm,
            LastName: lastnm,
            MobileNo: obj.MobileNo,
            Email: email,
            DOB: Dob,
            // Age: age,
            Gender: gender,
            Address: address,
            City: city,
            Pincode: pincode,
            State: state,
            Country: country,
            Height: height,
            Weight: weight,
            AlternateMobileNo: alternatemobile,
            BloodRelation: bloodrelation,
            createdDate: now
        }
        try {
            const addPatientRequest = await AddFamilyMember(object);
            const parse = JSON.parse(addPatientRequest);
            if (parse.success === "200") {
                alert(parse.message);
                handleclose();
                window.location.reload();
            } else {
                alert(parse.message);
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchCountry();
        fetchState();
    }, []);

    return (
        <>
            {/* Add Family Member Patient Details */}

            <Dialog
                open={show}
                onClose={handleclose}
                maxWidth={maxWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Add New Family Member"}
                    <IconButton edge="start" color="inherit" onClick={handleclose} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container>
                            <Grid item xs={12} sm={6} style={{ borderRight: '1px solid #F0F0F0' }}>
                                <center>
                                    <div style={{ paddingTop: 10 }}>
                                        <Grid container style={{ marginBottom: -35 }}>
                                            <Grid item xs={2}>
                                                <center>
                                                    <FormControl variant="outlined" size='small' className={classes.formControl}  >
                                                        <Select
                                                            className={classes.inputFields}
                                                            native
                                                            size='small'
                                                            value={title}
                                                            label="title"
                                                            onChange={(e) => settitle(e.target.value)}

                                                            inputProps={{
                                                                name: 'title',
                                                                id: 'outlined-title-native-simple',
                                                            }}
                                                            style={{ marginLeft: 68, width: 78, marginTop: -9 }}
                                                        >
                                                            <option aria-label="None" value="" >Title</option>
                                                            <option value='Mr.'>Mr.</option>
                                                            <option value='Mrs.'>Mrs.</option>
                                                            <option value='Ms.'>Ms.</option>
                                                            <option value='Miss.'>Miss.</option>
                                                        </Select>
                                                    </FormControl> <span style={{ fontSize: 20, color: 'red', marginLeft: '207%', top: -80, position: 'relative' }}> *</span>
                                                </center>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <center>
                                                    <TextField className={classes.inputFields} value={firstnm}
                                                        onChange={(e) => {
                                                            const re = /^[a-z ,.'-]+$/i;
                                                            // if value is not blank, then test the regex
                                                            if (e.target.value == '' || re.test(e.target.value)) {
                                                                setfirstnm(e.target.value)
                                                            }
                                                        }} style={{ marginLeft: 90, width: 210 }}
                                                        id="outlined-basic" size="small" placeholder="First Name" variant="outlined" />
                                                    <span style={{ fontSize: 20, color: 'red', marginLeft: '102%', top: -70, position: 'relative' }}> *</span>
                                                </center>
                                            </Grid>
                                        </Grid>
                                        {/* <TextField className={classes.inputFields} value={firstnm} onChange={(e) => {
                                            const re = /^[A-Za-z]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setfirstnm(e.target.value)
                                            }
                                        }} id="outlined-basic" size="small" label="First Name" variant="outlined" style={{ marginLeft: 12 }} />
                                        <span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span> */}
                                        <TextField className={classes.inputFields} value={lastnm} onChange={(e) => {
                                            const re = /^[A-Za-z]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setlastnm(e.target.value)
                                            }
                                        }} id="outlined-basic" size="small" label="Last Name" variant="outlined" style={{ marginLeft: 12 }} />
                                        <span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span>
                                        <TextField className={classes.inputFields} value={mobile} disabled onChange={(e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setmobile(e.target.value)
                                            }
                                        }} onInput={(e) => {
                                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                        }} id="outlined-basic" type="number" size="small" label="Mobile Number" variant="outlined" />

                                        <TextField className={classes.inputFields} value={alternatemobile} onChange={(e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setalternatemobile(e.target.value)
                                            }
                                        }} onInput={(e) => {
                                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                        }} id="outlined-basic" type="number" size="small" label="Alternate Mobile Number" variant="outlined" />

                                        <TextField className={classes.inputFields} value={email} onChange={(e) => setemail(e.target.value)} id="outlined-basic" type="email" size="small" label="Email Id" variant="outlined" />
                                        <ThemeProvider theme={defaultMaterialTheme}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    autoOk
                                                    className={classes.inputFields}
                                                    size='small'
                                                    value={dob}
                                                    onChange={setdob}
                                                    inputVariant="outlined"
                                                    label="DOB"
                                                    format='dd/MM/yyyy'
                                                    style={{ marginLeft: 10 }}
                                                /><span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span>
                                            </MuiPickersUtilsProvider>
                                        </ThemeProvider>
                                        {/* <span style={{ position: 'relative', top: 50, right: 270, fontSize: 13 }}>DOB</span>
                                        <TextField className={classes.inputFields} defaultValue={new Date()} value={dob} onChange={(e) => setdob(e.target.value)} id="outlined-basic" type="date" size="small" variant="outlined" style={{ marginLeft: 10 }} /><span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span> */}
                                        <FormControl variant="outlined" size='small' className={classes.formControl}  >
                                            <Select
                                                className={classes.inputFields}
                                                native
                                                size='small'
                                                value={gender}
                                                onChange={(e) => setgender(e.target.value)}
                                                label="Gender"
                                                inputProps={{
                                                    name: 'gender',
                                                    id: 'outlined-gender-native-simple',
                                                }}
                                                style={{ marginLeft: 10, marginTop: -10 }}
                                            >
                                                <option aria-label="None" value="" >Gender</option>
                                                <option value='Male'>Male</option>
                                                <option value='Female'>Female</option>

                                            </Select>
                                        </FormControl><span style={{ position: 'relative', bottom: 4, fontSize: 20, right: 8, color: 'red' }}> *</span>
                                    </div>
                                </center>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <center>
                                    <div style={{ paddingTop: 10 }}>

                                        <FormControl variant="outlined" size="small" className={classes.formControl} style={{ marginLeft: 43, width: '75%', fontWeight: 600 }} >
                                            <Select
                                                className={classes.textFieldForm}
                                                size='large'
                                                native
                                                value={bloodrelation}
                                                onChange={(e) => setbloodrelation(e.target.value)}
                                                defaultChecked='India'
                                                label="Blood Relation"
                                                inputProps={{
                                                    name: 'Blood Relation',
                                                    id: 'outlined-end-time-native-simple',
                                                }}
                                                style={{ width: '90%', fontSize: 14, fontWeight: 600, color: '#707070' }}
                                            >
                                                <option aria-label="None" value="">Blood Relation</option>
                                                <option value='Father'>Father</option>
                                                <option value='Mother'>Mother</option>
                                                <option value='Spouse'>Spouse</option>
                                                <option value='Daughter'>Daughter</option>
                                                <option value='Son'>Son</option>
                                                <option value='Siblings'>Siblings</option>
                                                <option value='Other'>Other</option>
                                            </Select>
                                        </FormControl>

                                        <FormControl variant="outlined" size="small" className={classes.formControl} style={{ marginLeft: 43, width: '75%', fontWeight: 600 }} >
                                            <Select
                                                className={classes.textFieldForm}
                                                size='large'
                                                native
                                                value={country}
                                                key={country}
                                                onChange={(e) => { setcountry(e.target.value) }}
                                                defaultChecked='India'
                                                label="Country"
                                                inputProps={{
                                                    name: 'Country',
                                                    id: 'outlined-end-time-native-simple',
                                                }}
                                                style={{ width: '90%', fontSize: 14, fontWeight: 600, color: '#707070' }}
                                            >
                                                <option aria-label="None" value="">Country</option>
                                                {countryData.map(v => {
                                                    return (
                                                        <>
                                                            <option key={v.id} value={v.Name}>{v.Name}</option>
                                                        </>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>

                                        <FormControl variant="outlined" size="small" onClick={() => fetchCity()} className={classes.formControl} style={{ marginLeft: 43, width: '75%', fontWeight: 600 }} >
                                            <Select
                                                disabled={country ? false : true}
                                                className={classes.textFieldForm}
                                                size='large'
                                                native
                                                value={state}
                                                onChange={(e) => setstate(e.target.value)}
                                                label="State"
                                                inputProps={{
                                                    name: 'State',
                                                    id: 'outlined-end-time-native-simple',
                                                }}
                                                style={{ width: '90%', fontSize: 14, fontWeight: 600, color: '#707070' }}
                                            >
                                                <option aria-label="None" value="">State</option>
                                                {stateData.map(v => {
                                                    return (
                                                        <>
                                                            <option value={v.StateName}>{v.StateName}</option>
                                                        </>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>

                                        <FormControl variant="outlined" size="small" className={classes.formControl} style={{ marginLeft: 43, width: '75%', fontWeight: 600 }} >
                                            <Select
                                                disabled={country ? false : true}
                                                className={classes.textFieldForm}
                                                size='large'
                                                native
                                                value={city}
                                                onChange={(e) => setcity(e.target.value)}
                                                label="City"
                                                inputProps={{
                                                    name: 'City',
                                                    id: 'outlined-end-time-native-simple',
                                                }}
                                                style={{ width: '90%', fontSize: 14, fontWeight: 600, color: '#707070' }}
                                            >
                                                <option aria-label="None" value="">City</option>
                                                {cityData.map(v => {
                                                    return (
                                                        <>
                                                            <option value={v.CityName}>{v.CityName}</option>
                                                        </>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>

                                        <TextField className={classes.inputFields} multiline style={{ marginTop: 10 }} value={address} onChange={(e) => setaddress(e.target.value)}
                                            rows={2}
                                            rowsMax={2} id="outlined-basic" size="small" label="Address" variant="outlined"
                                        />

                                        <TextField className={classes.inputFields}
                                            value={pincode}
                                            type='number'
                                            onInput={(e) => {
                                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
                                            }}
                                            onChange={(e) => setpincode(e.target.value)}
                                            id="outlined-basic" size="small"
                                            placeholder="Pincode"
                                            variant="outlined" />


                                        <Grid container>
                                            <Grid item xs={12} sm={6}>
                                                <center>
                                                    <TextField
                                                        InputProps={{
                                                            inputProps: { min: 0 }
                                                        }}
                                                        className={classes.inputFields}
                                                        value={height} onChange={(e) => setheight(e.target.value)}
                                                        id="outlined-basic" size="small" type="number" label="Height"
                                                        variant="outlined" style={{ width: 145, float: 'right', marginRight: 5 }} />
                                                </center>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <center>
                                                    <TextField
                                                        InputProps={{
                                                            inputProps: { min: 0 }
                                                        }}
                                                        className={classes.inputFields}
                                                        value={weight} onChange={(e) => setweight(e.target.value)}
                                                        id="outlined-basic" size="small" type="number" label="Weight"
                                                        variant="outlined" style={{ width: 150, float: 'left', }} />
                                                </center>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </center>
                            </Grid>

                            <Grid container style={{ marginTop: -10 }}>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnCancle} onClick={handleclose} style={{ float: 'right', marginRight: 20 }}>
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnregister} onClick={() => AddDFamilyMemberDetails()} style={{ float: 'left', marginLeft: 20 }}>
                                        Register
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
        fontSize: 12
    },
}));