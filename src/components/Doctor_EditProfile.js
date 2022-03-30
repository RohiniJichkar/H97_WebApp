import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { Select, InputLabel, FormControl, TextField, Typography, Button, Grid, Paper, Avatar } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import DoctorNavbar from './Doctor_Navbar';
import CreateIcon from '@material-ui/icons/Create';
import { EditDoctordata } from '../Apis/Profile/index';
import axios from 'axios';
import ip from '../ipaddress/ip';
import { connect } from 'react-redux';
import { Times, Doctor_Category } from '../Apis/Home_Visitors/index';
import EditImage from './Profile/Edit_Profile/Doctor_EditProfileImage';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const getDoctorsdata = 'http://13.233.217.107:8080/api/Web_AddStaff'

const drawerWidth = 220;

export default function DoctorEditProfile() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [doctordata, setdoctordata] = useState([location.state.details]);


    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [editmodal, seteditmodal] = useState(false);
    const [openChangePassDialog, setOpenChangePassDialog] = React.useState(false);
    const [FirstName, setFirstName] = useState(doctordata[0].FirstName);
    const [LastName, setLastName] = useState(doctordata[0].LastName);
    const [MobileNo, setMobileNo] = useState(doctordata[0].MobileNo);
    const [Email, setEmail] = useState(doctordata[0].Email);
    const [Education, setEducation] = useState(doctordata[0].Education);
    const [DOB, setDOB] = useState(doctordata[0].DOB);
    const [Category, setCategory] = useState(doctordata[0].Category);
    const [Address, setAddress] = useState(doctordata[0].Address);
    const [City, setCity] = useState(doctordata[0].City);
    const [Pincode, setPincode] = useState(doctordata[0].Pincode);
    const [State, setState] = useState(doctordata[0].State);
    const [Country, setCountry] = useState(doctordata[0].Country);
    const [MorningStartTime, setMorningStartTime] = useState(doctordata[0].MorningStartTime);
    const [MorningEndTime, setMorningEndTime] = useState(doctordata[0].MorningEndTime);
    const [EveningStartTime, setEveningStartTime] = useState(doctordata[0].EveningStartTime);
    const [EveningEndTime, setEveningEndTime] = useState(doctordata[0].EveningEndTime);
    const [Experience, setExperience] = useState(doctordata[0].Experience);
    const [Gender, setGender] = useState(doctordata[0].Gender);
    const [times, setTimes] = useState([]);
    const [doctorCategory, setdoctorCategory] = useState([]);

    const Edit_DoctorData = async (FirstName, LastName, MobileNo, Email, Address, Category, City, Pincode, State, Country, Education, DOB, MorningStartTime, MorningEndTime, EveningStartTime, EveningEndTime, Experience, Gender) => {
        var cdata = await localStorage.getItem("userdata");
        let parsed = JSON.parse(cdata);
        let DoctorId = parsed.userid;
        let clinicid = parsed.ClinicId;
        try {
            const editDoctorRequest = await EditDoctordata(DoctorId, clinicid, FirstName, LastName, MobileNo, Email, Address, Category, City, Pincode, State, Country, Education, DOB, MorningStartTime, MorningEndTime, EveningStartTime, EveningEndTime, Experience, Gender);
            let response = JSON.parse(editDoctorRequest);
            if (response.success == '200') {
                alert(response.message);
                navigate(-1)
            }
            else {
                alert(response.message);
            }
        }
        catch (e) {
            console.log(e)
        }
    }
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

    const handleClickOpen = () => {
        setOpenChangePassDialog(true);
    };

    const handleclickOpenEditmodal = () => {
        seteditmodal(true);
    }

    const handleClose = () => {
        setOpenChangePassDialog(false);
    };

    const handleClickOpenEditmodal = () => {
        seteditmodal(true);
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleChangePass = () => {
        navigate("/DoctorTreatPatient");
    };

    const handleGoBack = () => {
        navigate("/DoctorProfile");
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
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',

                        }}>
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', borderRadius: 105, fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button> Profile
                    </Typography>
                </Grid>

                <Grid item xs={12} >
                    <Paper elevation={6} className={classes.paper} style={{ marginLeft: 5, marginRight: 20, borderRadius: 20, marginTop: -15 }}>
                        <Grid container >
                            <Grid item xs={12}>
                                <Typography variant="h6" noWrap={true} style={{
                                    fontSize: 16,
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    color: '#2C7FB2',
                                    marginTop: '-10px',
                                    textDecoration: 'underline',

                                }}>
                                    Profile
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                {editmodal ? <EditImage show={editmodal} data={doctordata} handleCloseEditmodal={() => seteditmodal(false)} /> : null}
                                <center>
                                    <div style={{ paddingBottom: 10 }}>
                                        {doctordata[0].ProfileImage ? <Avatar src={doctordata[0].ProfileImage} style={{ borderRadius: '50%', height: 80, width: 80 }} /> :
                                            <Avatar style={{ borderRadius: '50%', height: 80, width: 80 }} />
                                        }
                                        <div style={{ marginTop: '-15px', marginRight: '-60px' }}>
                                            <CreateIcon size='small' onClick={handleclickOpenEditmodal} style={{ borderRadius: '50%', backgroundColor: '#707070', color: '#fff', padding: 2, cursor: 'pointer' }} />
                                        </div>
                                    </div>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070'

                                    }}>
                                        Dr. {doctordata[0].FirstName} {doctordata[0].LastName}
                                    </Typography>
                                </center>
                                <Grid item xs={12} style={{ paddingTop: 10 }}>
                                    <center>
                                        <Typography variant="h6" noWrap={true} style={{
                                            fontSize: 14,
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            color: '#707070',
                                            fontWeight: 600

                                        }}>
                                            Experience (in years)
                                        </Typography>
                                    </center>
                                </Grid>
                                <Grid item xs={12} style={{ paddingTop: 5 }}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControl}  >
                                            <TextField className={classes.textField}
                                                InputProps={{
                                                    inputProps: { min: 0 }
                                                }}
                                                id="outlined-basic" type='number' placeholder="Experience (Yrs)" onChange={(e) => setExperience(e.target.value)} value={Experience ? Experience : doctordata.Experience} variant="outlined" size="small" />
                                        </FormControl>
                                    </center>
                                </Grid>
                                <Grid item xs={12} style={{ paddingTop: 5 }}>
                                    <center>
                                        <Typography variant="h6" noWrap={true} style={{
                                            fontSize: 14,
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            color: '#707070',
                                            fontWeight: 600

                                        }}>
                                            Education
                                        </Typography>
                                    </center>
                                </Grid>
                                <Grid item xs={12} style={{ paddingTop: 5 }}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControl}  >
                                            <TextField className={classes.textField} id="outlined-basic" placeholder="Education" value={Education} onChange={(e) => setEducation(e.target.value)} variant="outlined" size="small" />
                                        </FormControl>
                                    </center>
                                </Grid>
                                <Grid item xs={12} style={{ paddingTop: 5 }}>
                                    <center>
                                        <Typography variant="h6" noWrap={true} style={{
                                            fontSize: 14,
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            color: '#707070',
                                            fontWeight: 600

                                        }}>
                                            Category
                                        </Typography>
                                    </center>
                                </Grid>
                                <Grid item xs={12} style={{ paddingTop: 5 }}>
                                    <center>
                                        <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '60%' }} >
                                            <InputLabel htmlFor="outlined-age-native-simple" value={Category ? Category : doctordata.Category} onChange={(e) => setCategory(e.target.value)} ></InputLabel>
                                            <Select
                                                className={classes.textFieldForm}
                                                size='medium'
                                                native
                                                value={Category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                placeholder="Category"
                                                inputProps={{
                                                    name: 'category',
                                                    id: 'outlined-category-native-simple',
                                                }}
                                                style={{ width: '100%', fontSize: 14 }}
                                            >
                                                {doctorCategory.map((item) => {
                                                    return (
                                                        <option value={item.Category}>{item.Category}</option>
                                                    )
                                                })}

                                                {/* <option aria-label="None" value="" /> */}

                                            </Select>
                                        </FormControl>
                                    </center>
                                </Grid>
                            </Grid>


                            <Grid item xs={4}>
                                <center>
                                    <div style={{ paddingTop: 5 }}>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm} id="outlined-basic" size="small" value={FirstName} label="First Name" onChange={(e) => {
                                                const re = /^[A-Za-z]+$/;
                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    setFirstName(e.target.value)
                                                }
                                            }} variant="outlined" style={{ width: '130%' }} />
                                        </FormControl>
                                    </div>
                                    <div>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm} id="outlined-basic" label="Last Name" value={LastName} onChange={(e) => {
                                                const re = /^[A-Za-z]+$/;
                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    setLastName(e.target.value)
                                                }
                                            }} variant="outlined" size="small" style={{ width: '130%' }} />
                                        </FormControl>

                                    </div>
                                    <div>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm} disabled id="outlined-basic" type='number' label="Mobile No" value={MobileNo} onChange={(e) => {
                                                const re = /^[0-9\b]+$/;
                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    setMobileNo(e.target.value)
                                                }
                                            }} onInput={(e) => {
                                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                            }} variant="outlined" size="small" style={{ width: '130%' }} />
                                        </FormControl>
                                    </div>
                                    <div>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm} id="outlined-basic" type='email' label="Email ID" value={Email} onChange={(e) => setEmail(e.target.value)} variant="outlined" size="small" style={{ width: '130%' }} />
                                        </FormControl>
                                    </div>
                                    <div>
                                        <FormControl variant="outlined" className={classes.formControlForm}  >
                                            <TextField className={classes.textFieldForm} id="outlined-basic" value={DOB} onChange={(e) => setDOB(e.target.value)} type="date" variant="outlined" size="small" style={{ width: '150%' }} />
                                        </FormControl>

                                    </div>
                                    <div>
                                        <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '73%', }} >
                                            <InputLabel htmlFor="outlined-age-native-simple" onChange={(e) => setGender(e.target.value)} value={Gender ? Gender : doctordata.Gender}  ></InputLabel>
                                            <Select
                                                className={classes.textFieldForm}
                                                size='medium'
                                                native
                                                value={Gender ? Gender : doctordata.Gender} onChange={(e) => setGender(e.target.value)}
                                                // label="Gender"
                                                inputProps={{
                                                    name: 'gender',
                                                    id: 'outlined-gender-native-simple',
                                                }}


                                                style={{ width: '100%', fontSize: 14 }}
                                            >
                                                <option value={1}>Male</option>
                                                <option value={2}>Female</option>

                                            </Select>
                                        </FormControl>
                                    </div>
                                </center>
                            </Grid>


                            <Grid item xs={5}>
                                <Grid item xs={12}>
                                    <center>
                                        <Typography variant="h6" noWrap={true} style={{ fontSize: 14, marginTop: -10, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                            OPD Morning Time
                                        </Typography>
                                    </center>
                                </Grid>

                                <Grid container style={{ padding: 5 }}>
                                    <Grid item xs={6}>
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                                Start Time
                                            </Typography>
                                        </center>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                                End Time
                                            </Typography>
                                        </center>
                                    </Grid>
                                </Grid>

                                <Grid container>
                                    <Grid item xs={6}>
                                        <center>
                                            <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '55%' }} >
                                                <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                                                <Select
                                                    className={classes.textFieldForm}
                                                    size='large'
                                                    native
                                                    value={MorningStartTime}
                                                    onChange={(e) => setMorningStartTime(e.target.value)}
                                                    inputProps={{
                                                        name: 'start time',
                                                        id: 'outlined-start-time-native-simple',
                                                    }}
                                                    style={{ width: '90%', fontSize: 14 }}
                                                >
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
                                            <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '55%' }} >
                                                <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                                                <Select
                                                    className={classes.textFieldForm}
                                                    size='large'
                                                    native
                                                    onChange={(e) => setMorningEndTime(e.target.value)} value={MorningEndTime}
                                                    inputProps={{
                                                        name: 'end time',
                                                        id: 'outlined-end-time-native-simple',
                                                    }}
                                                    style={{ width: '90%', fontSize: 14 }}
                                                >
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


                                <Grid item xs={12} style={{ marginTop: '-12px' }}>
                                    <center>
                                        <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                            OPD Evening Time
                                        </Typography>
                                    </center>
                                </Grid>

                                <Grid container style={{ padding: 5 }}>
                                    <Grid item xs={6}>
                                        <center>
                                            <Typography variant="h6" value={EveningStartTime} onChange={(e) => setEveningStartTime(e.target.value)} noWrap={true} style={{ fontSize: 13, marginTop: -5, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                                Start Time
                                            </Typography>
                                        </center>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <center>
                                            <Typography variant="h6" value={EveningEndTime} onChange={(e) => setEveningEndTime(e.target.value)} noWrap={true} style={{ fontSize: 13, marginTop: -5, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                                End Time
                                            </Typography>
                                        </center>
                                    </Grid>
                                </Grid>

                                <Grid container >
                                    <Grid item xs={6}>
                                        <center>
                                            <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '55%' }} >
                                                <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                                                <Select
                                                    className={classes.textFieldForm}
                                                    size='large'
                                                    native
                                                    onChange={(e) => setEveningStartTime(e.target.value)} value={EveningStartTime}
                                                    inputProps={{
                                                        name: 'start time',
                                                        id: 'outlined-start-time-native-simple',
                                                    }}
                                                    style={{ width: '90%', fontSize: 14 }}
                                                >
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
                                            <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '55%' }} >
                                                <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                                                <Select
                                                    className={classes.textFieldForm}
                                                    size='large'
                                                    native
                                                    onChange={(e) => setEveningEndTime(e.target.value)} value={EveningEndTime}
                                                    inputProps={{
                                                        name: 'end time',
                                                        id: 'outlined-end-time-native-simple',
                                                    }}
                                                    style={{ width: '90%', fontSize: 14 }}
                                                >
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

                                <Grid item xs={12} style={{ marginTop: 1 }}>
                                    <center>
                                        <FormControl variant="outlined" className={classes.formControl}  >
                                            <TextField className={classes.textField} multiline rows={2.5} rowsMax={2.5} id="outlined-basic" size="small" label="Address" value={Address} onChange={(e) => setAddress(e.target.value)} variant="outlined" style={{ width: '182%' }} />
                                        </FormControl>
                                    </center>
                                </Grid>

                                <Grid container xs={12} style={{ marginTop: 30 }}>
                                    <Grid item xs={6}>
                                        <FormControl variant="outlined" className={classes.formControl} style={{ float: 'right', marginLeft: 40 }}>
                                            <TextField className={classes.textField} id="outlined-basic" size="small" label="City" value={City} onChange={(e) => { setCity(e.target.value) }}
                                                variant="outlined" />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl variant="outlined" className={classes.formControl} style={{ marginRight: 40 }}>
                                            <TextField className={classes.textField} id="outlined-basic" size="small" label="Pincode" value={Pincode} onChange={(e) => {
                                                const re = /^[0-9\b]+$/;
                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    setPincode(e.target.value)
                                                }
                                            }} variant="outlined" />
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid container xs={12} style={{ marginTop: 3 }}>
                                    <Grid item xs={6}>
                                        <FormControl variant="outlined" className={classes.formControl} style={{ float: 'right', marginLeft: 40 }}>
                                            <TextField className={classes.textField} id="outlined-basic" size="small" label="State" value={State} onChange={(e) => {
                                                const re = /^[A-Za-z]+$/;
                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    setState(e.target.value)
                                                }
                                            }} variant="outlined" />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl variant="outlined" className={classes.formControl} style={{ marginRight: 40 }}>
                                            <TextField className={classes.textField} id="outlined-basic" size="small" label="Country" value={Country} onChange={(e) => {
                                                const re = /^[A-Za-z]+$/;
                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    setCountry(e.target.value)
                                                }
                                            }} variant="outlined" />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container >
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnCancle} onClick={() => handleGoBack(false)} style={{ float: 'right', marginRight: 20 }}>
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnCancle} onClick={() => Edit_DoctorData(FirstName, LastName, MobileNo, Email, Address, Category, City, Pincode, State, Country, Education, DOB, MorningStartTime, MorningEndTime, EveningStartTime, EveningEndTime, Experience, Gender)} style={{ float: 'left', marginLeft: 20 }}>
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

            </Grid> {/* main grid */}

            {/* {editmodal? <EditImage show={editmodal} data={doctordata} handleCloseEditmodal ={()=>seteditmodal(false)}/>:null} */}

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
        paddingBottom: theme.spacing(3.1),
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
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        marginTop: -5,
        fontSize: '11px'
    },
    inputFields: {
        // [`& fieldset`]: {
        //     borderRadius: 25,
        // },
        width: 300,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 200,
        marginTop: 10
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
