import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogContentText, Switch, InputLabel, FormControlLabel, DialogTitle, Typography, TextField, Slide, Select, FormControl, Button, IconButton, Grid, Paper, Link } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { Edit_HomeVisitor } from '../../../Apis/Home_Visitors/index';
import { Times, Doctor_Category } from '../../../Apis/Home_Visitors/index';
import axios from 'axios';
const getHomevisitors = 'http://13.233.217.107:8080/api/GetHomeVisitorDoctorsforClinic';
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
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        textAlign: 'center',

    },
    gridServices: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontFamily: 'Poppins',
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
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,

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
        fontFamily: 'Poppins',
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
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        color: '#707070'
    },
    btnview: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
    },
    inputFields: {
        [`& fieldset`]: {
            borderRadius: 25,
        },
        width: 300,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 200,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    groupreports: {
        height: 140,
        width: 250,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#00318B',
        paddingTop: 50,
        borderRadius: 20,
        float: 'right'
    },
    btnUpload: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
        marginBottom: 10,
        marginTop: 20
    },
    textField: {
        // [`& fieldset`]: {
        //     borderRadius: 25,
        // },
        padding: 8,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        textAlign: 'center',
        width: '100%'
    },
    facilitiesInput: {
        fontSize: 16,
        color: '#00318B !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,
        padding: 2
    },
    description: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        height: 145,
        color: 'gray',
        border: '1px solid #F0F0F0',
    },
    btnregister: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        fontSize: '11px'
    },
    formControlForm: {
        paddingBottom: theme.spacing(1.2),

    },
    textFieldForm: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 8,
    },

}));

export default function EditHomeVisitors({ show, data, handleCloseEditmodal }) {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    let obj = JSON.stringify(data);
    let parse = JSON.parse(obj);
    console.log(data);
    const [homevisitorData, sethomevisitorData] = useState([]);
    const [homevisitorDetails, sethomevisitorDetails] = useState({});
    const [openeditmodal, setOpenEditmodal] = React.useState(false);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [firstName, setfirstName] = useState(parse[0].FirstName);
    const [lastName, setlastName] = useState(parse[0].LastName);
    const [mobileno, setmobileno] = useState(parse[0].MobileNo);
    const [email, setemail] = useState(parse[0].Email);
    const [address, setaddress] = useState(parse[0].Address);
    const [education, seteducation] = useState(parse[0].Education);
    const [category, setcategory] = useState(parse[0].Category);
    const [From_AvailabilityTime, setFrom_AvailabilityTime] = useState(parse[0].From_AvailabilityTime);
    const [To_AvailabilityTime, setTo_AvailabilityTime] = useState(parse[0].To_AvailabilityTime);
    const [monday, setmonday] = useState(data[0].Monday);
    const [tuesday, settuesday] = useState(data[0].Tuesday);
    const [wednesday, setwednesday] = useState(data[0].Wednesday);
    const [thursday, setthursday] = useState(data[0].Thursday);
    const [friday, setfriday] = useState(data[0].Friday);
    const [saturday, setsaturday] = useState(data[0].Saturday);
    const [sunday, setsunday] = useState(data[0].Sunday);
    const [password, setpassword] = useState('');
    const [editstate, seteditstate] = useState('');
    const [Pincode, setPincode] = useState('');
    const [City, setCity] = useState('');
    const [Country, setCountry] = useState('');
    const [Gender, setGender] = useState('');
    const [DOB, setDOB] = useState('');
    const [Experience, setExperience] = useState('');
    const [times, setTimes] = useState([]);
    const [doctorCategory, setdoctorCategory] = useState([]);

    const handlemonday = () => {
        setmonday(previousState => !previousState);
    }
    const handletuesday = () => {
        settuesday(previousState => !previousState);
    }
    const handlewednesday = () => {
        setwednesday(previousState => !previousState);
    }
    const handlethursday = () => {
        setthursday(previousState => !previousState);
    }
    const handlefriday = () => {
        setfriday(previousState => !previousState);
    }
    const handlesaturday = () => {
        setsaturday(previousState => !previousState);
    }
    const handlesunday = () => {
        setsunday(previousState => !previousState);
    }
    const handleAll = async () => {
        setmonday(previousState => !previousState);
        settuesday(previousState => !previousState);
        setwednesday(previousState => !previousState);
        setthursday(previousState => !previousState);
        setfriday(previousState => !previousState);
        setsaturday(previousState => !previousState);
        setsunday(previousState => !previousState);
    }


    const EditHomeVisitor = async () => {
        var sessiondata = await localStorage.getItem("userdata");
        let parsed = JSON.parse(sessiondata);
        let clinicid = parsed.ClinicId;
        console.log(data[0].UserId)
        const obje = {
            ClinicId: clinicid,
            UserId: data[0].UserId,
            FirstName: firstName,
            LastName: lastName,
            MobileNo: mobileno,
            Password: password,
            Email: email,
            Address: address,
            Education: education,
            From_AvailabilityTime: From_AvailabilityTime,
            To_AvailabilityTime: To_AvailabilityTime,
            Sunday: sunday,
            Monday: monday,
            Tuesday: tuesday,
            Wednesday: wednesday,
            Thursday: thursday,
            Friday: friday,
            Saturday: saturday,
            Pincode: Pincode,
            EditState: editstate,
            City: City,
            Country: Country,
            Gender: Gender,
            DOB: DOB,
            Experience: Experience,
            // Role: 'Home Visitor'
        }
        const edithomevisitorrequest = await Edit_HomeVisitor(obje);
        let parse = JSON.parse(edithomevisitorrequest);
        if (parse.success === "200") {
            alert('Home Visitor Details Edited Successfully');
            handleCloseEditmodal();
            window.location.reload();
        }
        else {
            alert(parse.message);
        }
    }
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const handleChangeAllDays = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleGoBack = () => {
        navigate("/DoctorHomeVisitors");
    };

    const fetchTimes = async () => {
        const times = await Times();
        setTimes(times);
    }
    const fetchDoctorCategory = async () => {
        const category = await Doctor_Category();
        setdoctorCategory(category);
    }
    useEffect(() => {
        fetchTimes();
        fetchDoctorCategory();
    }, []);
    console.log(thursday)

    return (
        <>

            <Dialog
                open={show}
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
                            <Grid item xs={5} style={{ marginLeft: 10 }}>
                                <Typography variant="h6" noWrap={true} style={{
                                    fontSize: 18, color: '#2C7FB2', fontFamily: 'Poppins',
                                    fontStyle: 'normal', textDecorationLine: 'underline', textUnderlineOffset: '1px',
                                    position: 'relative', bottom: 14

                                }}>
                                    Details
                                </Typography>

                                <div style={{ marginTop: 13 }}>
                                    <FormControl variant="outlined" className={classes.formControlForm}  >
                                        <TextField className={classes.textFieldForm} id="outlined-basic" size="small" label="First Name"
                                            value={firstName}
                                            onChange={(e) => {
                                                const re = /^[A-Za-z]+$/;



                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    setfirstName(e.target.value)
                                                }
                                            }
                                            } variant="outlined" style={{ width: '160%' }} />
                                    </FormControl>
                                </div>
                                <div>
                                    <FormControl variant="outlined" className={classes.formControlForm}  >
                                        <TextField className={classes.textFieldForm} id="outlined-basic" label="Last Name"
                                            value={lastName} onChange={(e) => {
                                                const re = /^[A-Za-z]+$/;

                                                // if value is not blank, then test the regex

                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    setlastName(e.target.value)
                                                }

                                            }} variant="outlined" size="small" style={{ width: '160%', marginTop: 12 }} />
                                    </FormControl>
                                </div>
                                <div>
                                    <FormControl variant="outlined" className={classes.formControlForm} >
                                        <TextField className={classes.textFieldForm} id="outlined-basic" type="text" label="Education"
                                            value={education} onChange={(e) => {
                                                const re = /^[A-Za-z]+$/;

                                                // if value is not blank, then test the regex

                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    seteducation(e.target.value)
                                                }
                                            }} variant="outlined" size="small" style={{ width: '160%', marginTop: 10 }} />
                                    </FormControl>
                                </div>


                            </Grid>

                            <Grid item xs={6} >
                                <div>
                                    <FormControl variant="outlined" className={classes.formControlForm}  >
                                        <TextField className={classes.textFieldForm} id="outlined-basic" type='number' label="Mobile No"
                                            value={mobileno}
                                            onChange={(e) => {
                                                const re = /^[0-9\b]+$/;
                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    setmobileno(e.target.value)
                                                }
                                            }} variant="outlined" size="small" style={{ width: '115%', marginLeft: 98, marginTop: 40 }}
                                            onInput={(e) => {
                                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)

                                            }} />
                                    </FormControl>
                                </div>
                                <div>
                                    <FormControl variant="outlined" className={classes.formControlForm}  >
                                        <TextField className={classes.textFieldForm} id="outlined-basic" type='email' value={email} onChange={(e) => setemail(e.target.value)} label="Email ID" variant="outlined" size="small" style={{ width: '115%', marginLeft: 98, marginTop: 12, }} />
                                    </FormControl>
                                </div>

                                <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '102%', marginLeft: '64px', marginTop: 16 }} >
                                    <InputLabel htmlFor="outlined-category-native-simple"></InputLabel>
                                    <Select
                                        className={classes.textFieldForm}
                                        size='large'
                                        native
                                        value={category}
                                        onChange={(e) => setcategory(e.target.value)}
                                        label="Category"
                                        inputProps={{
                                            name: 'category',
                                            id: 'outlined-category-native-simple',
                                        }}
                                        style={{ width: '80%', height: 40, fontSize: 14, marginTop: '-7px', marginLeft: 34 }}
                                    >
                                        <option aria-label="None" value="" >Category</option>
                                        {doctorCategory.map((item) => {
                                            return (
                                                <option value={item.Category}>{item.Category}</option>
                                            )
                                        })}
                                    </Select>
                                </FormControl>

                            </Grid>
                        </Grid>





                        <Grid container>
                            <Grid item xs={12}>

                                <div>
                                    <FormControl variant="outlined" className={classes.formControlForm}  >
                                        <TextField className={classes.textFieldForm} multiline rows={2} rowsMax={4} id="outlined-basic" type='text' value={address} onChange={(e) => setaddress(e.target.value)} label="Add" variant="outlined" size="small" style={{ width: '395%', marginTop: 10, marginLeft: 10 }} />
                                    </FormControl>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6}>
                                <Grid container style={{ marginTop: 10 }}>
                                    <Grid item xs={2}>
                                        <Typography variant="h6" noWrap={true} style={{
                                            fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            fontWeight: 600,
                                            marginLeft: 22
                                        }}>
                                            From
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '55%' }} >
                                            <Select
                                                className={classes.textFieldForm}
                                                size='medium'
                                                native
                                                value={From_AvailabilityTime}
                                                onChange={(e) => setFrom_AvailabilityTime(e.target.value)}
                                                inputProps={{
                                                    name: 'fromtime',
                                                    id: 'outlined-from-time-native-simple',
                                                }}
                                                style={{ width: '90%', fontSize: 12, marginLeft: 117 }}
                                            >
                                                <option aria-label="None" value='' >From</option>

                                                {times.map((item) => {
                                                    return (
                                                        <option value={item.ActualTime}>{item.DisplayTime}</option>
                                                    )
                                                })}

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="h6" noWrap={true} style={{
                                            fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            textAlign: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 600,
                                            position: 'relative',
                                            left: 250

                                        }}>
                                            To
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '55%' }} >
                                            <Select
                                                className={classes.textFieldForm}
                                                size='medium'
                                                native
                                                value={To_AvailabilityTime}
                                                onChange={(e) => setTo_AvailabilityTime(e.target.value)}
                                                inputProps={{
                                                    name: 'totime',
                                                    id: 'outlined-to-time-native-simple',
                                                }}
                                                style={{ width: '90%', fontSize: 12, marginLeft: 385 }}
                                            >
                                                <option aria-label="None" value='' >To</option>
                                                {times.map((item) => {
                                                    return (
                                                        <option value={item.ActualTime}>{item.DisplayTime}</option>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>

                                        <Grid container style={{ marginLeft: 30 }}>

                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 18, color: '#2C7FB2', fontFamily: 'Poppins',
                                                fontStyle: 'normal', position: 'relative', right: 327,
                                                textDecorationLine: 'underline', textUnderlineOffset: '1px',
                                            }}>
                                                Availability
                                            </Typography>
                                            <Grid container style={{ marginTop: 10 }}>
                                                <Grid item xs={8}>
                                                    <Typography variant="h6" noWrap={true} style={{
                                                        fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                        fontStyle: 'normal',
                                                        textAlign: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 600,
                                                        position: 'relative',
                                                        right: 323,
                                                        top: 10

                                                    }}>
                                                        All Days
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                onClick={(e) => handleAll(e.target.value)}
                                                                name="checkedA"
                                                                color='primary'
                                                                style={{ color: '#78B088', float: 'right', }}
                                                            />
                                                        }
                                                        style={{ color: '#78B088', float: 'right', paddingRight: 20, position: 'relative', right: 205, top: 8 }}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container>
                                                <Grid item xs={4}>
                                                    <Typography variant="h6" noWrap={true} style={{
                                                        fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                        fontStyle: 'normal',
                                                        textAlign: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 600,
                                                        marginRight: -34,
                                                        position: 'relative',
                                                        right: 320,
                                                        top: 16
                                                    }}>
                                                        Monday
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant="h6" noWrap={true} style={{
                                                        fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                        fontStyle: 'normal',
                                                        textAlign: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 600,
                                                        marginRight: -34,
                                                        position: 'relative',
                                                        right: 356,
                                                        top: 60
                                                    }}>
                                                        Tuesday
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant="h6" noWrap={true} style={{
                                                        fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                        fontStyle: 'normal',
                                                        textAlign: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 600,
                                                        marginRight: -64,
                                                        position: 'relative',
                                                        right: 106,
                                                        top: -30
                                                    }}>
                                                        Wednesday
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                            <Grid container>
                                                <Grid item xs={4}>
                                                    <FormControlLabel
                                                        control={

                                                            <Switch checked={monday}
                                                                onChange={handlemonday}
                                                                name="checkedB"
                                                                color='primary'
                                                                style={{ color: '#2C7FB2', float: 'right' }}
                                                            />
                                                        }
                                                        style={{ color: '#2C7FB2', float: 'right', paddingRight: 20, position: 'relative', right: 149, bottom: 6 }}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch checked={tuesday}
                                                                onChange={handletuesday}
                                                                name="checkedB"
                                                                color='primary'
                                                                style={{ color: '#2C7FB2', float: 'right' }}
                                                            />
                                                        }
                                                        style={{ color: '#2C7FB2', float: 'right', paddingRight: 20, position: 'relative', right: 187, top: 38 }}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch checked={wednesday}
                                                                onChange={handlewednesday}
                                                                name="checkedB"
                                                                color='primary'
                                                                style={{ color: '#2C7FB2', float: 'right' }}
                                                            />
                                                        }
                                                        style={{ color: '#2C7FB2', float: 'right', paddingRight: 20, position: 'relative', right: -95, bottom: 54 }}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container>
                                                <Grid item xs={4}>
                                                    <Typography variant="h6" noWrap={true} style={{
                                                        fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                        fontStyle: 'normal',
                                                        textAlign: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 600,
                                                        marginRight: -64,
                                                        position: 'relative',
                                                        right: 40,
                                                        top: -40
                                                    }}>
                                                        Thursday
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant="h6" noWrap={true} style={{
                                                        fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                        fontStyle: 'normal',
                                                        textAlign: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 600,
                                                        marginRight: -64,
                                                        position: 'relative',
                                                        right: 86,
                                                        top: 0
                                                    }}>
                                                        Friday
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant="h6" noWrap={true} style={{
                                                        fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                        fontStyle: 'normal',
                                                        textAlign: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 600,
                                                        marginRight: -64,
                                                        position: 'relative',
                                                        right: -186,
                                                        bottom: 92
                                                    }}>
                                                        Saturday
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                            <Grid container>
                                                <Grid item xs={4}>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch checked={thursday}
                                                                onChange={handlethursday}
                                                                name="checkedB"
                                                                color='primary'
                                                                style={{ color: '#2C7FB2', float: 'right' }}
                                                            />
                                                        }
                                                        style={{ color: '#2C7FB2', float: 'right', paddingRight: 20, position: 'relative', left: 170, bottom: 65 }}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch checked={friday}
                                                                onChange={handlefriday}
                                                                name="checkedB"
                                                                color='primary'
                                                                style={{ color: '#2C7FB2', float: 'right' }}
                                                            />
                                                        }
                                                        style={{ color: '#2C7FB2', float: 'right', paddingRight: 20, position: 'relative', left: 133, bottom: 22 }}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch checked={saturday}
                                                                onChange={handlesaturday}
                                                                name="checkedB"
                                                                color='primary'
                                                                style={{ color: '#2C7FB2', float: 'right' }}
                                                            />
                                                        }
                                                        style={{ color: '#2C7FB2', float: 'right', paddingRight: 20, position: 'relative', left: 380, bottom: 118 }}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <center>
                                                        <Typography variant="h6" noWrap={true} style={{
                                                            fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                            fontStyle: 'normal',
                                                            textAlign: 'center',
                                                            justifyContent: 'center',
                                                            fontWeight: 600,
                                                            marginRight: -64,
                                                            position: 'relative',
                                                            right: -216,
                                                            bottom: 103
                                                        }}>
                                                            Sunday
                                                        </Typography>
                                                    </center>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <center>
                                                        <FormControlLabel
                                                            control={
                                                                <Switch checked={sunday}
                                                                    onChange={handlesunday}
                                                                    name="checkedB"
                                                                    color='primary'
                                                                    style={{
                                                                        color: '#2C7FB2',
                                                                    }}
                                                                />
                                                            }
                                                            style={{ color: '#2C7FB2', float: 'center', marginLeft: 40, position: 'relative', left: 362, bottom: 129 }}
                                                        />
                                                    </center>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid>

                            <Grid container xs={12} style={{ marginTop: -40 }}>
                                <Grid item sm={6} >
                                    <Button className={classes.btnregister} onClick={handleCloseEditmodal} style={{ float: 'right', marginRight: 20 }}>Cancel</Button>
                                </Grid>
                                <Grid item sm={6} >
                                    <Button className={classes.btnregister} onClick={EditHomeVisitor} style={{ float: 'left', marginLeft: 20 }}>Submit</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </>
    )
}
