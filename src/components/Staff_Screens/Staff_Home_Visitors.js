import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Container, FormControl, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Switch, FormControlLabel, Select, InputLabel, TextField, Typography, Button, Avatar, Table, TableContainer, TableBody, TableCell, TableHead, InputBase, TableRow, TablePagination, Drawer, Divider, MenuItem, Menu, ListItem, ListItemIcon, ListItemText, List, IconButton, Grid, Paper, Link } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import DoctorNavbar from './Staff_Navbar';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import { Times, Doctor_Category, Add_HomeVisitor } from '../../Apis/Staff/Home_Visitors/index';
import Delete_Home_Vistor_Modal from './components/Home_Visitors/Delete_Home_Visitor/index';
import Edit_Home_Visitor from './components/Home_Visitors/Edit_Details/index'
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const getHomeVisitorSearchApi = 'http://13.233.217.107:8080/api/Web_SearchHomeVisitor';
const getHomevisitors = 'http://13.233.217.107:8080/api/GetHomeVisitorDoctorsforClinic';
const getHomeVisitorDoctorById = 'http://13.233.217.107:8080/api/GetHomeVisitorDoctorById';

const drawerWidth = 240;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Staff_Home_Visitors() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [openmodal, setOpenmodal] = React.useState(false);
    const [openeditmodal, setOpenEditmodal] = React.useState(false);
    const [opendeletemodal, setOpendeletemodal] = React.useState(false);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [homevisitorData, sethomevisitorData] = useState([]);
    const [homevisitorDetails, sethomevisitorDetails] = useState({});
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [mobile, setmobile] = useState('');
    const [email, setemail] = useState('');
    const [address, setaddress] = useState('');
    const [gender, setgender] = useState('');
    const [password, setpassword] = useState('');
    const [education, seteducation] = useState('');
    const [category, setcategory] = useState('');
    const [startTime, setstartTime] = useState('');
    const [endTime, setendTime] = useState('');
    const [monday, setmonday] = useState(false);
    const [tuesday, settuesday] = useState(false);
    const [wednesday, setwednesday] = useState(false);
    const [thursday, setthursday] = useState(false);
    const [friday, setfriday] = useState(false);
    const [saturday, setsaturday] = useState(false);
    const [sunday, setsunday] = useState(false);
    const [times, setTimes] = useState([]);
    const [doctorCategory, setdoctorCategory] = useState([]);
    const [homevisitorsearch, sethomevisitorsearch] = useState([]);
    const [showPassword, setshowPassword] = useState(false)

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

    const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const fetchHomeVisitorData = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        const homevisitorInfo = await axios.post(getHomevisitors, { ClinicId: clinicid });
        sethomevisitorData(homevisitorInfo?.data?.HomeVisitors);
    }

    const fetchTimes = async () => {
        const times = await Times();
        setTimes(times);
    }

    const fetchDoctorCategory = async () => {
        const category = await Doctor_Category();
        setdoctorCategory(category);
    }


    const searchHomeVisitor = async (homevisitorsearch) => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        try {
            const hvDoctorInfo = await axios.post(getHomeVisitorSearchApi, { ClinicId: clinicid, Name: homevisitorsearch });
            sethomevisitorData(hvDoctorInfo?.data?.HomeVisitor);
            console.log(homevisitorData)
        }
        catch (e) {
            console.log(e)
        }
    }


    const Register_HomeVisitor = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        const obj = {
            ClinicId: clinicid,
            FirstName: firstName,
            LastName: lastName,
            Password: password,
            MobileNo: mobile,
            Email: email,
            Gender: gender,
            Address: address,
            Category: category,
            Education: education,
            Monday: monday,
            Tuesday: tuesday,
            Wednesday: wednesday,
            Thursday: thursday,
            Friday: friday,
            Saturday: saturday,
            Sunday: sunday,
            From_AvailabilityTime: startTime,
            To_AvailabilityTime: endTime,
            Role: 'Home Visitor'
        }
        try {
            const registration = await Add_HomeVisitor(obj);
            let parse = JSON.parse(registration);
            if (parse.success === "200") {
                alert('Home Visitor Profile Details Added Successfully');
                setOpenmodal(false);
                window.location.reload()
            } else {
                alert(parse.message);
            }
        } catch (error) {
            console.log(error)
        }
    }


    const handleEditModal = async () => {
        if (homevisitorDetails.length > 0) {
            setOpenEditmodal(true)
        }
        else {
            alert("Please Select Home Visitor from List");
        }
    }

    const handleContinue = async () => {

        if (homevisitorDetails.length > 0) {
            setOpendeletemodal(true)
        }


        else {
            alert('Please select Home visitors from list');
        }

    };

    useEffect(() => {
        fetchHomeVisitorData();
        fetchTimes();
        fetchDoctorCategory();
    }, []);


    const handleRowClick = async (userid) => {
        var hvDoctorInfo = await axios.post(getHomeVisitorDoctorById, { UserId: userid });
        sethomevisitorDetails(hvDoctorInfo?.data?.HomeVisitor)
    }

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleHomeVisitRequest = () => {
        navigate("/Staff_Home_Visit_Request");
    };


    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const handleChangeAllDays = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
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
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', borderRadius: 105, fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Home Visitors
                        <Button className={classes.btnregister} onClick={(e) => setOpenmodal(true)} style={{ float: 'right', marginRight: 20, fontFamily: 'Poppins', fontSize: 12, width: 160 }}>Add New Home Visitor</Button>
                        <Button className={classes.btnregister} onClick={handleHomeVisitRequest} style={{ float: 'right', marginRight: 20, fontFamily: 'Poppins', fontSize: 12, width: 160 }}>Home Visitor Requests</Button>
                    </Typography>
                </Grid>

                <Grid item xs={12} container style={{ marginTop: 10 }}>
                    <Grid item xs={12} sm={4}>
                        <Paper elevation={6} className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <center> <SearchIcon className={classes.searchIcon} />
                                        <InputBase
                                            label="Search by Name"
                                            placeholder='Search by Home Visitor'
                                            onChange={(e) => sethomevisitorsearch(e.target.value)}
                                            value={homevisitorsearch}
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
                                    <Button className={classes.btnview} onClick={() => searchHomeVisitor(homevisitorsearch)} size="small" style={{ float: 'right', fontSize: 11, textAlign: 'center' }}>Search</Button>
                                </Grid>
                            </Grid>

                            <DataGrid
                                style={{ height: 350, marginTop: 20, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2', cursor: 'pointer' }}
                                rows={homevisitorData}
                                rowHeight={30}
                                columns={columns}
                                columnWidth={10}
                                pageSize={5}
                                onRowClick={(newSelection) => {
                                    handleRowClick(newSelection.row.UserId);
                                }}
                            />

                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={8} >
                        <Paper className={classes.paper} elevation={6} style={{ marginLeft: 25, marginRight: 20 }}>
                            <Typography variant="h6" noWrap={true} style={{
                                fontSize: 18, color: '#2C7FB2', fontFamily: 'Poppins', textDecorationLine: 'underline', textUnderlineOffset: '1px', textDecorationThickness: '1px',
                                fontStyle: 'normal',

                            }}>
                                Profile
                            </Typography>
                            <center>
                                <div style={{ paddingBottom: 5 }}>
                                    {homevisitorDetails[0] ? homevisitorDetails[0].ProfileImage ?
                                        <Avatar style={{ borderRadius: 50, height: 80, width: 80 }} src={homevisitorDetails[0].ProfileImage} /> :
                                        <Avatar style={{ borderRadius: 50, height: 80, width: 80 }} /> : <Avatar style={{ borderRadius: 50, height: 80, width: 80 }} />}
                                </div>

                                <Typography variant="h6" noWrap={true} style={{
                                    fontSize: 16,
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    color: '#707070',
                                    fontWeight: 600
                                }}>
                                    {homevisitorDetails[0] ? homevisitorDetails[0].FirstName : "NA"} {homevisitorDetails[0] ? homevisitorDetails[0].LastName : null}
                                </Typography>
                                <Typography variant="h6" noWrap={true} style={{
                                    fontSize: 14,
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    color: '#707070',
                                    fontWeight: 400
                                }}>
                                    {homevisitorDetails[0] ? homevisitorDetails[0].Education : "NA"}
                                    <span> ({homevisitorDetails[0] ? homevisitorDetails[0].Category : "NA"})</span>
                                </Typography>
                                <Grid container xs={12} style={{ paddingTop: 15 }}>
                                    <Grid item xs={3} style={{ border: '1px solid #F0F0F0', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: "Poppins" }}>
                                            Mobile Number
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                            {homevisitorDetails[0] ? homevisitorDetails[0].MobileNo : "NA"}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                            From
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                            {homevisitorDetails[0] ? homevisitorDetails[0].From_AvailabilityTime : "NA"}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                            To
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                            {homevisitorDetails[0] ? homevisitorDetails[0].To_AvailabilityTime : "NA"}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                            Email Id
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', marginLeft: 10, marginRight: 10 }}>
                                            {homevisitorDetails[0] ? homevisitorDetails[0].Email : "NA"}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid container xs={12}>
                                    <Grid item xs={6} style={{ border: '1px solid #F0F0F0', borderTop: '0px', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                            Address
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', marginLeft: 10, marginRight: 10 }}>
                                            {homevisitorDetails[0] ? homevisitorDetails[0].Address : "NA"} {homevisitorDetails[0] ? homevisitorDetails[0].City : null} {homevisitorDetails[0] ? homevisitorDetails[0].State : null} {homevisitorDetails[0] ? homevisitorDetails[0].Pincode : null} {homevisitorDetails[0] ? homevisitorDetails[0].Country : null}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', borderTop: '0px', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                            Availability
                                        </Typography>
                                        <Grid container>
                                            <Grid item xs={1} style={{ marginLeft: 20, color: '#707070', fontFamily: 'Poppins' }}>
                                                Mon
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20, color: '#707070', fontFamily: 'Poppins' }}>
                                                Tue
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20, color: '#707070', fontFamily: 'Poppins' }}>
                                                Wed
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20, color: '#707070', fontFamily: 'Poppins' }}>
                                                Thu
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20, color: '#707070', fontFamily: 'Poppins' }}>
                                                Fri
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20, color: '#707070', fontFamily: 'Poppins' }}>
                                                Sat
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20, color: '#707070', fontFamily: 'Poppins' }}>
                                                Sun
                                            </Grid>
                                        </Grid>

                                        <Grid container>
                                            <Grid item xs={1} style={{ marginLeft: 20 }}>
                                                <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                                    {homevisitorDetails[0] ? homevisitorDetails[0].Monday == '1' ? 'Yes' : 'No' : "NA"}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20 }}>
                                                <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                                    {homevisitorDetails[0] ? homevisitorDetails[0].Tuesday == '1' ? 'Yes' : 'No' : "NA"}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20 }}>
                                                <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                                    {homevisitorDetails[0] ? homevisitorDetails[0].Wednesday == '1' ? 'Yes' : 'No' : "NA"}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20 }}>
                                                <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                                    {homevisitorDetails[0] ? homevisitorDetails[0].Thursday == '1' ? 'Yes' : 'No' : "NA"}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20 }}>
                                                <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                                    {homevisitorDetails[0] ? homevisitorDetails[0].Friday == '1' ? 'Yes' : 'No' : "NA"}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20 }}>
                                                <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                                    {homevisitorDetails[0] ? homevisitorDetails[0].Saturday == '1' ? 'Yes' : 'No' : "NA"}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1} style={{ marginLeft: 20 }}>
                                                <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins' }}>
                                                    {homevisitorDetails[0] ? homevisitorDetails[0].Sunday == '1' ? 'Yes' : 'No' : "NA"}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Grid>



                                <Grid container xs={12} style={{ marginTop: 10 }}>
                                    <Grid item sm={6} >
                                        <Button className={classes.btnregister} onClick={handleContinue} style={{ float: 'right', marginRight: 20 }}>Delete</Button>

                                    </Grid>
                                    <Grid item sm={6} >
                                        <Button className={classes.btnregister} onClick={() => handleEditModal()} style={{ float: 'left', marginLeft: 20 }}>Edit</Button>
                                    </Grid>
                                </Grid>

                            </center>
                        </Paper>

                    </Grid>
                </Grid>


                {/* For add new visitor form */}

                <Dialog
                    open={openmodal}
                    maxWidth={maxWidth}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Add New Home Visitor"}
                        <IconButton edge="start" color="inherit" onClick={() => setOpenmodal(false)} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Grid container style={{ overflow: 'hidden', height: 585 }}>

                                <Grid container style={{ overflow: 'hidden' }}>
                                    <Grid container  >
                                        <Grid item sm={6} style={{ marginLeft: 10 }}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 17, color: '#2C7FB2', fontFamily: 'Poppins',
                                                fontStyle: 'normal', fontWeight: 600,
                                                textDecorationLine: 'underline', textUnderlineOffset: '1px',

                                            }}>
                                                Details
                                            </Typography>

                                            <div style={{ marginTop: 13 }}>
                                                <FormControl variant="outlined" className={classes.formControlForm}  >
                                                    <TextField className={classes.textFieldForm} value={firstName}
                                                        onChange={(e) => {
                                                            const re = /^[A-Za-z]+$/;

                                                            // if value is not blank, then test the regex

                                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                                setfirstName(e.target.value)
                                                            }
                                                        }
                                                        } id="outlined-basic" size="small" label="First Name" variant="outlined" style={{ width: '155%', position: 'relative', top: 3 }} />

                                                </FormControl><span style={{ position: 'relative', left: 120, bottom: 8, fontSize: 20, color: 'red' }}> *</span>
                                            </div>
                                            <div>
                                                <FormControl variant="outlined" className={classes.formControlForm}  >
                                                    <TextField className={classes.textFieldForm} value={lastName} onChange={(e) => {
                                                        const re = /^[A-Za-z]+$/;

                                                        // if value is not blank, then test the regex

                                                        if (e.target.value === '' || re.test(e.target.value)) {
                                                            setlastName(e.target.value)
                                                        }

                                                    }} id="outlined-basic" label="Last Name" variant="outlined" size="small" style={{ width: '155%', position: 'relative', top: 12 }} />
                                                </FormControl><span style={{ position: 'relative', left: 120, fontSize: 20, color: 'red' }}> *</span>
                                            </div>
                                            <div>
                                                <FormControl variant="outlined" className={classes.formControlForm} >
                                                    <TextField className={classes.textFieldForm} value={education} onChange={(e) => {
                                                        const re = /^[A-Za-z]+$/;

                                                        // if value is not blank, then test the regex

                                                        if (e.target.value === '' || re.test(e.target.value)) {
                                                            seteducation(e.target.value)
                                                        }
                                                    }} id="outlined-basic" type="text" label="Education" variant="outlined" size="small" style={{ width: '155%', position: 'relative', top: 25 }} />
                                                </FormControl>
                                            </div>
                                            <div>
                                                <FormControl variant="outlined" className={classes.formControlForm} >
                                                    <TextField className={classes.textFieldForm} value={address} onChange={(e) => setaddress(e.target.value)} multiline rows={1} rowsMax={1} id="outlined-basic" type="text" label="Address" variant="outlined" size="small" style={{ width: '167%', top: 30 }} />
                                                </FormControl>
                                            </div>
                                        </Grid>
                                        <div>
                                            <Grid item xs={6} >

                                                <FormControl variant="outlined" className={classes.formControlForm}  >
                                                    <TextField className={classes.textFieldForm} value={mobile}
                                                        onChange={(e) => {
                                                            const re = /^[0-9\b]+$/;
                                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                                setmobile(e.target.value)
                                                            }
                                                        }} id="outlined-basic" type='number' label="Mobile No" variant="outlined" size="small" style={{ width: '185%', marginLeft: 45, position: 'relative', top: 38 }}
                                                        onInput={(e) => {
                                                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)

                                                        }} />
                                                </FormControl><span style={{ position: 'relative', left: '211%', bottom: 23, fontSize: 20, color: 'red' }}> *</span>


                                                <div>
                                                    <FormControl variant="outlined" className={classes.formControlForm}  >
                                                        <TextField className={classes.textFieldForm} onChange={(e) => setemail(e.target.value)} id="outlined-basic" type='email' label="Email ID" variant="outlined" size="small" style={{ width: '185%', marginTop: 15, marginLeft: 43 }} />
                                                    </FormControl>
                                                </div>


                                                <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '55%', marginLeft: '-25px' }} >

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
                                                        style={{ width: '188%', fontSize: 14, marginTop: '5px', marginLeft: 67 }}
                                                    >
                                                        <option aria-label="None" value="">Category</option>
                                                        {doctorCategory.map((item) => {
                                                            return (
                                                                <option value={item.Category}>{item.Category}</option>
                                                            )
                                                        })}
                                                    </Select>
                                                </FormControl>

                                                <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '55%', marginLeft: '-25px' }} >

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
                                                        style={{ width: '188%', fontSize: 14, marginTop: '5px', marginLeft: 67 }}
                                                    >

                                                        <option aria-label="None" value="" >Gender</option>
                                                        <option value='Male'>Male</option>
                                                        <option value='Female'>Female</option>
                                                    </Select>
                                                </FormControl>

                                            </Grid>
                                        </div>

                                    </Grid>
                                    {/* <Grid container>
                                        <Grid item xs={12}>
                                            <div>
                                                <FormControl variant="outlined" className={classes.formControlForm}  >
                                                    <TextField className={classes.textFieldForm} onChange={(e) => setaddress(e.target.value)} multiline rows={2} rowsMax={4} id="outlined-basic" type='text' label="Address" variant="outlined" size="small" style={{ width: '405%', position: 'relative', top: 15, left: 10 }} />
                                                </FormControl>
                                            </div>
                                        </Grid>
                                    </Grid> */}
                                    <Grid container style={{ marginTop: 0 }}>
                                        <Grid item xs={6} style={{ marginTop: -25 }}>

                                            <div>
                                                <Typography variant="h6" noWrap={true} style={{
                                                    fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    fontWeight: 600,
                                                    marginTop: 30

                                                }}>
                                                    From
                                                </Typography>

                                                <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '55%' }} >
                                                    <Select
                                                        className={classes.textFieldForm}
                                                        size='medium'
                                                        native
                                                        value={startTime}
                                                        onChange={(e) => setstartTime(e.target.value)}
                                                        inputProps={{
                                                            name: 'fromtime',
                                                            id: 'outlined-from-time-native-simple',
                                                        }}
                                                        style={{
                                                            width: '50%', fontSize: 12, marginLeft: 46, marginTop: -30,
                                                        }}
                                                    >
                                                        <option aria-label="None" value='' >From</option>

                                                        {times.map((item) => {
                                                            return (
                                                                <option value={item.ActualTime}>{item.DisplayTime}</option>
                                                            )
                                                        })}

                                                    </Select>
                                                </FormControl>

                                                <Typography variant="h6" noWrap={true} style={{
                                                    fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    textAlign: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 600,
                                                    marginTop: -49,
                                                    marginLeft: -34

                                                }}>
                                                    To
                                                </Typography>

                                                <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '55%' }} >
                                                    <Select
                                                        className={classes.textFieldForm}
                                                        size='medium'
                                                        native
                                                        value={endTime}
                                                        onChange={(e) => setendTime(e.target.value)}
                                                        inputProps={{
                                                            name: 'totime',
                                                            id: 'outlined-to-time-native-simple',
                                                        }}
                                                        style={{ width: '50%', fontSize: 12, marginLeft: 220, marginTop: -27 }}
                                                    >
                                                        <option aria-label="None" value='' >To</option>

                                                        {times.map((item) => {
                                                            return (
                                                                <option value={item.ActualTime}>{item.DisplayTime}</option>
                                                            )
                                                        })}

                                                    </Select>
                                                </FormControl>

                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div>
                                                <FormControl variant="outlined" className={classes.formControlForm}  >
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        fullWidth
                                                        id="password"
                                                        required
                                                        label="Password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        size='small'
                                                        style={{ width: '103%', marginLeft: 53, marginTop: 5 }}
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
                                                    />
                                                </FormControl><span style={{ position: 'relative', left: 60, top: 5, fontSize: 20, color: 'red' }}> *</span>
                                            </div>

                                        </Grid>
                                    </Grid>
                                    <Grid container style={{ marginTop: -20, paddingBottom: 0 }}>
                                        <Grid item xs={12}>
                                            <Grid container >
                                                <Typography variant="h6" noWrap={true} style={{
                                                    fontSize: 17, color: '#2C7FB2', fontFamily: 'Poppins',
                                                    fontStyle: 'normal', fontWeight: 600,
                                                    textDecorationLine: 'underline', textUnderlineOffset: '1px',
                                                }}>
                                                    Availability
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container >
                                            <Grid item xs={2}>
                                                <Typography variant="h6" noWrap={true} style={{
                                                    fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    textAlign: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 600,
                                                    marginRight: 80,
                                                    marginTop: 15

                                                }}>
                                                    All Days
                                                </Typography>

                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            onClick={(e) => handleAll(e.target.value)}

                                                            color='primary'
                                                            style={{ color: '#78B088', float: 'right' }}
                                                        />
                                                    }
                                                    style={{ color: '#78B088', float: 'right', marginTop: -30, marginRight: -25 }}
                                                />
                                            </Grid>

                                            <Grid item xs={2}>
                                                <Typography variant="h6" noWrap={true} style={{
                                                    fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    textAlign: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 600,
                                                    marginRight: -175,
                                                    marginTop: 13
                                                }}>
                                                    Wednesday
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={5}>
                                                <Typography variant="h6" noWrap={true} style={{
                                                    fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    textAlign: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 600,
                                                    marginLeft: 223,
                                                    marginTop: 10

                                                }}>
                                                    Saturday
                                                </Typography>
                                            </Grid>

                                        </Grid>

                                        <Grid container>
                                            <Grid item xs={2}>
                                                <Typography variant="h6" noWrap={true} style={{
                                                    fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    textAlign: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 600,
                                                    marginRight: 80,
                                                    marginTop: 10

                                                }}>
                                                    Monday
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={3}>
                                                <Typography variant="h6" noWrap={true} style={{
                                                    fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    textAlign: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 600,
                                                    marginLeft: 85,
                                                    marginTop: 7

                                                }}>
                                                    Thursday
                                                </Typography>

                                            </Grid>
                                            <Grid item xs={4}>
                                                <center>
                                                    <Typography variant="h6" noWrap={true} style={{
                                                        fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                        fontStyle: 'normal',
                                                        textAlign: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 600,
                                                        marginLeft: 140,
                                                        marginTop: 5

                                                    }}>
                                                        Sunday
                                                    </Typography>
                                                </center>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={2}>
                                                <Typography variant="h6" noWrap={true} style={{
                                                    fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    textAlign: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 600,
                                                    marginTop: 17,
                                                    marginRight: 74

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
                                                    marginTop: 20

                                                }}>
                                                    Friday
                                                </Typography>
                                            </Grid>
                                        </Grid>


                                        <Grid container>
                                            <Grid item xs={4}>
                                                <FormControlLabel
                                                    control={
                                                        <Switch checked={monday}
                                                            onChange={handlemonday}
                                                            // name="checkedB"
                                                            color='primary'
                                                            style={{ color: '#2C7FB2', float: 'right' }}
                                                        />
                                                    }
                                                    style={{ color: '#2C7FB2', float: 'right', paddingRight: 20, marginTop: -78, marginRight: 104 }}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <FormControlLabel
                                                    control={
                                                        <Switch checked={tuesday}
                                                            onChange={handletuesday}
                                                            // name="checkedB"
                                                            color='primary'
                                                            style={{ color: '#2C7FB2', float: 'right' }}
                                                        />
                                                    }
                                                    style={{ color: '#2C7FB2', float: 'right', paddingRight: 20, marginTop: -36, marginRight: 403 }}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={wednesday}
                                                            onChange={handlewednesday}
                                                            name="checkedB"
                                                            color='primary'
                                                            style={{ color: '#2C7FB2', float: 'right' }}
                                                        />
                                                    }
                                                    style={{ color: '#2C7FB2', float: 'right', paddingRight: 20, marginRight: 403, marginTop: -122 }}
                                                />
                                            </Grid>
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
                                                style={{ color: '#2C7FB2', float: 'right', paddingRight: 20, marginRight: -194, marginTop: -83 }}
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
                                                style={{ color: '#2C7FB2', float: 'right', paddingRight: 20, marginRight: 103, marginTop: -39 }}
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
                                                style={{ color: '#2C7FB2', float: 'right', paddingRight: 20, marginRight: 130, marginTop: -130 }}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container>


                                        <Grid item xs={12}>
                                            <center>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={sunday}
                                                            onChange={handlesunday}
                                                            name="checkedB"
                                                            color='primary'
                                                            style={{
                                                                color: '#2C7FB2',
                                                            }}
                                                        />
                                                    }
                                                    style={{ color: '#2C7FB2', float: 'center', marginLeft: 560, marginTop: -175 }}
                                                />
                                            </center>
                                        </Grid>
                                    </Grid>

                                    <Grid container style={{ marginTop: -25, paddingBottom: 0, marginBottom: 0 }}>
                                        <Grid item sm={6} >
                                            <Button className={classes.btnregister} onClick={() => setOpenmodal(false)} style={{ float: 'right', marginRight: 20 }}>Cancel</Button>
                                        </Grid>
                                        <Grid item sm={6} >
                                            <Button className={classes.btnregister} onClick={Register_HomeVisitor} style={{ float: 'left', marginLeft: 20 }}>Register</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </DialogContent>

                </Dialog>


                {/* For Edit Visitor Details */}
                {openeditmodal ? <Edit_Home_Visitor show={openeditmodal} data={homevisitorDetails} handleCloseEditmodal={() => setOpenEditmodal(false)} /> : null}


                {/* for Delete User */}
                {opendeletemodal ? <Delete_Home_Vistor_Modal show={opendeletemodal} data={homevisitorDetails} handleclose={() => setOpendeletemodal(false)} /> : null}

            </Grid> {/* main grid */}

        </div >
    );
}

const columns = [
    {
        field: 'fullName',
        headerName: 'Full name',
        sortable: false,
        width: 200,
        valueGetter: (params) =>
            `${params.getValue(params.id, 'FirstName') || ''} ${params.getValue(params.id, 'LastName') || ''
            }`,
    },
    {
        field: 'MobileNo',
        headerName: 'Contact No',
        width: 160,
        editable: true,
    },
];

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
