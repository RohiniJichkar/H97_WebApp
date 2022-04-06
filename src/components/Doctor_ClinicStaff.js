import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Avatar, Select, FormControl, InputLabel, Radio, Dialog, Box, IconButton, DialogContent, DialogContentText, DialogTitle, TextField, Typography, Button, InputBase, Grid, Paper, Slide } from "@material-ui/core";
import DoctorNavbar from './Doctor_Navbar';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import { DataGrid, gridColumnLookupSelector } from '@material-ui/data-grid';
import { Add_Staff, Doctor_Category, Times, EditStaffdata } from '../Apis/Clinic_Staff/index';
import ip from '../ipaddress/ip';

//components
import Edit_Patient from './Clinic_Patients/Edit_Patient';
import Edit_staff from './EditStaffDetails/Editstaff';
import Delete_Staff_Details from './EditStaffDetails/Delele_Staff/index';
import { red } from '@material-ui/core/colors';

const getStaffData = 'http://13.233.217.107:8080/api/GetAllUsers';
const getStaffDetails = 'http://13.233.217.107:8080/api/ShowUserDetailUsingId';
const getStaffSearchApi = 'http://13.233.217.107:8080/api/Web_SearchStaff';

const drawerWidth = 240;

const columns = [
    {
        field: 'fullName',
        headerName: 'Full name',
        sortable: false,
        width: 200,
        headerClassName: 'super-app-theme--header',
        valueGetter: (params) =>
            `${params.getValue(params.id, 'FirstName') || ''} ${params.getValue(params.id, 'LastName') || ''
            }`,
    },
    {
        field: 'MobileNo',
        headerName: 'Contact No',
        headerClassName: 'super-app-theme--header',
        width: 160,
        editable: true,
    },
];


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DoctorClinicStaff() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const [counterbtn, setCounterBtn] = React.useState(0);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [openmodal, setOpenmodal] = React.useState(false);
    const [staffData, setstaffData] = useState([]);
    const [staffDetails, setstaffDetails] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [mobile, setmobile] = useState('');
    const [email, setemail] = useState('');
    const [gender, setgender] = useState('');
    const [role, setrole] = useState('');
    const [password, setpassword] = useState('');
    const [Category, setCategory] = useState('');
    const [address, setaddress] = useState('');
    const [education, seteducation] = useState('');
    const [MorningStartTime, setMorningStartTime] = useState('');
    const [MorningEndTime, setMorningEndTime] = useState('');
    const [EveningStartTime, setEveningStartTime] = useState('');
    const [EveningEndTime, setEveningEndTime] = useState('');
    const [doctorCategory, setdoctorCategory] = useState([]);
    const [times, settimes] = useState([]);
    const [editmodal, seteditmodal] = useState(false);
    const [editrole, seteditrole] = useState();
    const [staffsearch, setstaffsearch] = useState([]);
    const [showPassword, setshowPassword] = useState(false);
    const [doctordata, setdoctordata] = useState({});
    const [title, settitle] = useState('');

    const fetchStaffData = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        const staffInfo = await axios.post(getStaffData, { ClinicId: clinicid });
        setstaffData(staffInfo?.data?.NewUser);
    }


    const searchStaff = async (staffsearch) => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        try {
            const staffInfo = await axios.post(getStaffSearchApi, { ClinicId: clinicid, Name: staffsearch });
            setstaffData(staffInfo?.data?.Staff);
        }
        catch (e) {
            console.log(e)
        }
    }

    console.log(staffDetails)


    const fetchDoctorCategory = async () => {
        const category = await Doctor_Category();
        setdoctorCategory(category);
    }

    const fetchTimes = async () => {
        const times = await Times();
        settimes(times);
    }

    const Register_Staff = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;

        if (editrole == 'Doctor') {
            if (Category == '') {
                alert('Please Select Category');
                return;
            }
        }

        const obj = {
            ClinicId: clinicid,
            NmTitle: title,
            FirstName: firstName,
            LastName: lastName,
            Role: editrole,
            Password: password,
            MobileNo: mobile,
            Email: email,
            Address: address,
            Education: education,
            Category: Category,
            Gender: gender,
            MorningStartTime: MorningStartTime,
            MorningEndTime: MorningEndTime,
            EveningStartTime: EveningStartTime,
            EveningEndTime: EveningEndTime

        }
        try {
            const registration = await Add_Staff(obj);
            let parse = JSON.parse(registration);
            if (parse.success === "200") {
                alert(parse.message);
                setOpenmodal(false);
                window.location.reload()
            }
            else {
                alert(parse.message);
            }
        } catch (e) {
            console.log(e);
        }
    }


    function disableBtn() {
        // document.getElementById("outlined-category-native-simple").hidden= true;
        document.getElementById("mybtn").hidden = true;
        document.getElementById("mybtn2").hidden = true;

        document.getElementById("mybtn3").hidden = true;
        document.getElementById("mybtn4").hidden = true;
        document.getElementById("mybtn5").hidden = true;
        document.getElementById("mybtn6").hidden = true;
        document.getElementById("mybtn7").hidden = true;
        document.getElementById("mybtn8").hidden = true;
        document.getElementById("mybtn9").hidden = true;
        document.getElementById("mybtn10").hidden = true;
        document.getElementById("mybtn11").hidden = true;


    }

    function enableBtn() {
        //   document.getElementById("outlined-category-native-simple").hidden= false;
        document.getElementById("mybtn").hidden = false;
        document.getElementById("mybtn2").hidden = false;
        document.getElementById("mybtn3").hidden = false;
        document.getElementById("mybtn4").hidden = false;
        document.getElementById("mybtn5").hidden = false;
        document.getElementById("mybtn6").hidden = false;
        document.getElementById("mybtn7").hidden = false;
        document.getElementById("mybtn8").hidden = false;
        document.getElementById("mybtn9").hidden = false;
        document.getElementById("mybtn10").hidden = false;
        document.getElementById("mybtn11").hidden = false;
    }



    useEffect(() => {
        fetchStaffData();
        fetchDoctorCategory();
        fetchTimes();
    }, []);


    const handleCellClick = async (userid, role) => {
        const staffDetailedInfo = await axios.post(getStaffDetails, { UserId: userid, Role: role });
        setstaffDetails(staffDetailedInfo?.data?.NewUser);
    }

    const [openeditmodal, setOpenEditmodal] = React.useState(false);

    const handleClickOpenEditmodal = () => {
        if (staffDetails != '') {
            seteditmodal(true);
        }
        else {
            alert('Please Select Staff from List');
        }
    };


    const handleClickOpenDeletemodal = () => {
        if (staffDetails != '') {
            setOpenDeletemodal(true);
        }
        else {
            alert('Please Select Staff from List');
        }
    };

    const handleCloseEditmodal = () => {
        setOpenEditmodal(false);
    };

    const [opendeletemodal, setOpenDeletemodal] = React.useState(false);

    const handleGoBack = () => {
        navigate("/DoctorHome");
    };


    const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Clinic Staff
                        <Button className={classes.btnregister} onClick={() => setOpenmodal(true)} style={{ float: 'right', marginRight: 20, width: '200px', fontFamily: 'Poppins', fontSize: 12.5, fontWeight: 400 }}>New Staff Registration</Button>
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4} >
                    <Paper elevation={6} className={classes.paper} style={{ padding: 30, paddingBottom: 10, height: 450 }}>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <SearchIcon className={classes.searchIcon} />
                                <InputBase
                                    onChange={(e) => setstaffsearch(e.target.value)}
                                    value={staffsearch}
                                    placeholder='Search by Name'
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
                                <Button className={classes.btnview} onClick={() => searchStaff(staffsearch)} size="small" style={{ fontSize: 12 }}>View</Button>
                            </Grid>

                        </Grid>

                        <Box
                            sx={{
                                '& .super-app-theme--header': {
                                    // backgroundColor: '#78B088',
                                    // color: '#fff
                                    fontSize: 15,
                                    marginLeft: 10
                                },
                            }}
                        >
                            <DataGrid
                                style={{ height: 340, marginTop: 20, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2', cursor: 'pointer' }}
                                rows={staffData}
                                rowHeight={30}
                                columns={columns}
                                columnWidth={10}
                                pageSize={10}
                                onRowClick={(newSelection) => {
                                    handleCellClick(newSelection.row.UserId, newSelection.row.Role)
                                }}
                            />
                        </Box>

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
                            <div style={{ paddingBottom: 0, height: 84, position: 'relative', bottom: 15 }}>
                                {staffDetails[0] ? staffDetails[0].ProfileImage ? <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} src={staffDetails[0].ProfileImage} /> : staffDetails[0].Gender == 'Female' ? <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} src='recepicon.png' /> :
                                    <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} src='doctoricon.png' /> : <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} />
                                }
                                {/* {staffDetails[0] ? staffDetails[0].ProfileImage ?
                                    <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} src={staffDetails[0].ProfileImage} /> :
                                    <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} /> : <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} />} */}
                            </div>

                            <Typography variant="h6" noWrap={true} style={{
                                fontSize: 16,
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                color: '#707070',
                                fontWeight: 600
                            }}>
                                {staffDetails[0] ? staffDetails[0].NmTitle : ""} {staffDetails[0] ? staffDetails[0].FirstName : "NA"} {staffDetails[0] ? staffDetails[0].LastName : ""}
                            </Typography>
                            <Typography variant="h6" noWrap={true} style={{
                                fontSize: 14,
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                color: '#707070',
                                fontWeight: 400
                            }}>
                                UID- {staffDetails[0] ? staffDetails[0].UserId : ''}
                                <div>
                                    {staffDetails[0] ? staffDetails[0].Role : 'NA'}
                                </div>
                            </Typography>
                            <Grid container xs={12} style={{ paddingTop: 15 }}>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Mobile Number
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {staffDetails[0] ? staffDetails[0].MobileNo : "NA"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Email ID
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', marginLeft: 10, marginRight: 10, fontFamily: 'Poppins', }}>
                                        {staffDetails[0] ? staffDetails[0].Email : "NA"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Education
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {staffDetails[0] ? staffDetails[0].Education : "NA"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Category
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {staffDetails[0] ? staffDetails[0].Category : 'NA'}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container xs={12}>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderTop: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Gender
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {staffDetails[0] ? staffDetails[0].Gender : "NA"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', borderTop: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Address
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', marginLeft: 10, marginRight: 10 }}>
                                        {staffDetails[0] ? `${staffDetails[0].Address}` : "NA"}{staffDetails[0] ? staffDetails[0].City ? `, ${staffDetails[0].City}` : ' ' : ' '}{staffDetails[0] ? staffDetails[0].State ? `, ${staffDetails[0].State}` : '' : ''}{staffDetails[0] ? staffDetails[0].Country ? `, ${staffDetails[0].Country}` : '' : ''}{staffDetails[0] ? staffDetails[0].Pincode ? `, ${staffDetails[0].Pincode}` : '' : ''}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', borderTop: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Shift Timing
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontFamily: 'Poppins', marginLeft: 10, marginRight: 10 }}>
                                        {staffDetails[0] ? staffDetails[0].From_AvailabilityTime ? staffDetails[0].From_AvailabilityTime : staffDetails[0].MorningStartTime : null} - {staffDetails[0] ? staffDetails[0].To_AvailabilityTime ? staffDetails[0].To_AvailabilityTime : staffDetails[0].MorningEndTime : null}
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontFamily: 'Poppins', marginLeft: 10, marginRight: 10 }}>
                                        {staffDetails[0] ? staffDetails[0].EveningStartTime !== null ? staffDetails[0].EveningStartTime : '' : null} - {staffDetails[0] ? staffDetails[0].EveningEndTime !== null ? staffDetails[0].EveningEndTime : '' : null}
                                    </Typography>
                                </Grid>
                            </Grid>



                            <Grid container xs={12} style={{ marginTop: 15 }}>
                                <Grid item sm={6} >
                                    <Button className={classes.btnregister} onClick={() => handleClickOpenDeletemodal()} style={{ float: 'right', marginRight: 20 }}>Delete</Button>
                                </Grid>
                                <Grid item sm={6} >
                                    <Button className={classes.btnregister} onClick={() => handleClickOpenEditmodal()} style={{ float: 'left', marginLeft: 20 }}>Edit</Button>
                                </Grid>
                            </Grid>

                        </center>
                    </Paper>

                </Grid>

                {editmodal ? <Edit_staff show={editmodal} data={staffDetails} handleCloseEditmodal={() => seteditmodal(false)} /> : null}

                {/* Add new staff */}
                <Dialog
                    open={openmodal}
                    onClose={() => setOpenmodal(false)}
                    maxWidth={maxWidth}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Add Staff"}<span style={{ marginLeft: 200, color: 'red', fontFamily: 'Poppins', fontSize: 12 }}>Note : You have added {staffData.length} out of 5 staffs in current subscription</span>
                        <IconButton edge="start" color="inherit" onClick={() => setOpenmodal(false)} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Grid container>
                                <Grid item xs={6} style={{ borderRight: '3px solid #F0F0F0' }}>
                                    <center>
                                        <div>
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
                                                                style={{ marginLeft: 68, width: 78, marginTop: -9, fontWeight: 500 }}
                                                            >
                                                                <option aria-label="None" value="" >Title</option>
                                                                <option value='Dr.'>Dr.</option>
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
                                                        <TextField className={classes.inputFields} value={firstName}
                                                            onChange={(e) => {
                                                                const re = /^[A-Za-z]+$/;
                                                                if (e.target.value === '' || re.test(e.target.value)) { setfirstName(e.target.value) }
                                                            }} style={{ marginLeft: 90, width: 210 }}
                                                            id="outlined-basic" size="small" placeholder="First Name" variant="outlined" />
                                                        <span style={{ fontSize: 20, color: 'red', marginLeft: '102%', top: -70, position: 'relative' }}> *</span>
                                                    </center>
                                                </Grid>
                                            </Grid>
                                            {/* <TextField className={classes.inputFields} value={firstName}
                                                onChange={(e) => {
                                                    const re = /^[A-Za-z]+$/;
                                                    if (e.target.value === '' || re.test(e.target.value)) { setfirstName(e.target.value) }
                                                }} style={{ marginLeft: 14 }}
                                                id="outlined-basic" size="small" label="First Name*" variant="outlined" /><span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span> */}
                                            <TextField className={classes.inputFields} value={lastName}
                                                onChange={(e) => {
                                                    const re = /^[A-Za-z]+$/;
                                                    if (e.target.value === '' || re.test(e.target.value)) { setlastName(e.target.value) }
                                                }} style={{ marginLeft: 14 }}
                                                id="outlined-basic" size="small" label="Last Name*" variant="outlined" /><span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span>
                                            <TextField

                                                className={classes.inputFields}
                                                value={mobile}
                                                onChange={(e) => {
                                                    const re = /^[0-9\b]+$/;
                                                    if (e.target.value === '' || re.test(e.target.value)) {
                                                        setmobile(e.target.value)
                                                    }
                                                }}
                                                id="outlined-basic"
                                                type="number"
                                                size="small"
                                                placeholder="Mobile Number*"
                                                variant="outlined"
                                                onInput={(e) => {
                                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)

                                                }} style={{ marginLeft: 14 }}

                                            /><span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span>
                                            <TextField className={classes.inputFields}
                                                onChange={(e) => setemail(e.target.value)}
                                                id="outlined-basic" type="email" size="small" label="Email Id" variant="outlined" />
                                            <TextField className={classes.inputFields}
                                                onChange={(e) => setpassword(e.target.value)}
                                                type={showPassword ? 'text' : 'password'} id="outlined-basic" size="small" label="Password*" variant="outlined"
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
                                                }} style={{ marginLeft: 14 }}
                                            /><span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span>
                                            <TextField className={classes.inputFields} multiline
                                                onChange={(e) => setaddress(e.target.value)}
                                                rows={3.5}
                                                rowsMax={4} id="outlined-basic" size="small" label="Address*" variant="outlined" style={{ marginLeft: 14 }}
                                            /> <span style={{ position: 'relative', bottom: 8, color: 'red', fontSize: 20 }}> *</span>
                                        </div>
                                    </center>
                                </Grid>

                                <Grid item xs={6}>
                                    <center>
                                        <Grid container style={{ marginTop: '-15px' }}>
                                            <Grid item xs={12} sm={6}>
                                                <InputLabel htmlFor="outlined-age-native-simple" style={{ marginLeft: 20 }}>Doctor
                                                    <Radio
                                                        checked={editrole === 'Doctor'}
                                                        color='primary'
                                                        onChange={(e) => seteditrole(e.target.value)}
                                                        value='Doctor'
                                                        onClick={enableBtn}
                                                        name="radio-button-demo"
                                                        inputProps={{ 'aria-label': 'Doctor' }}

                                                    /></InputLabel>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>

                                                <InputLabel htmlFor="outlined-age-native-simple" style={{ marginRight: 30 }}>Receptionist

                                                    <Radio
                                                        checked={editrole === 'Receptionist'}
                                                        onChange={(e) => seteditrole(e.target.value)}
                                                        value="Receptionist"
                                                        onClick={disableBtn}
                                                        color='primary'
                                                        name="radio-button-demo"
                                                        inputProps={{ 'aria-label': 'Receptionist' }}
                                                    /></InputLabel>

                                            </Grid>
                                            <Grid xs={12} style={{ marginTop: 5 }}>
                                                <FormControl variant="outlined" size="small" className={classes.formControlForm} style={{ width: '73%' }} >

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
                                                        style={{ width: '90%', fontSize: 14, marginLeft: 14 }}
                                                    >
                                                        <option aria-label="None" value="" >Gender*</option>
                                                        <option value='Male'>Male</option>
                                                        <option value='Female'>Female</option>

                                                    </Select>
                                                </FormControl><span style={{ position: 'relative', right: 11, bottom: 8, fontSize: 20, color: 'red' }}> *</span>
                                            </Grid>
                                        </Grid>

                                        <div>
                                            <TextField className={classes.inputFields} id="outlined-basic" value={education}
                                                onChange={(e) => {
                                                    const re = /^[A-Za-z]+$/;
                                                    if (e.target.value === '' || re.test(e.target.value)) { seteducation(e.target.value) }
                                                }}
                                                label="Education" variant="outlined" size="small" />
                                            {/* <TextField className={classes.inputFields} id="outlined-basic" label="Category" variant="outlined" size="small" />  */}
                                            <Grid xs={12} >
                                                <FormControl id='mybtn' variant="outlined" size="small" className={classes.formControlForm} style={{ width: '73%' }} >

                                                    <Select
                                                        className={classes.textFieldForm}
                                                        size='large'
                                                        native
                                                        value={Category}
                                                        onChange={(e) => setCategory(e.target.value)}
                                                        label="Category"
                                                        inputProps={{
                                                            name: 'category',
                                                            id: 'outlined-category-native-simple',
                                                        }}
                                                        style={{ width: '90%', fontSize: 14, marginLeft: 14 }}
                                                    >
                                                        <option aria-label="None" value="" >Category*</option>
                                                        {doctorCategory.map((item) => {
                                                            return (
                                                                <option value={item.Category}>{item.Category}</option>
                                                            )
                                                        })}

                                                    </Select>
                                                </FormControl><span style={{ position: 'relative', right: 11, bottom: 8, fontSize: 20, color: 'red' }}> *</span>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <center id='mybtn2'>
                                                    <Typography id='mybtn' variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                                        Morning Shift Time
                                                    </Typography>
                                                </center>
                                            </Grid>

                                            <Grid container style={{ padding: 5 }}>
                                                <Grid item xs={6}>
                                                    <center id='mybtn3'>
                                                        <Typography id='mybtn' variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', marginLeft: 50 }}>
                                                            Start Time
                                                        </Typography>
                                                    </center>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <center id='mybtn4'>
                                                        <Typography id='mybtn' variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', marginRight: 50 }}>
                                                            End Time
                                                        </Typography>
                                                    </center>
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <center id='mybtn5'>
                                                        <FormControl id='mybtn' variant="outlined" size="small" className={classes.formControlForm} style={{ width: '65%', float: 'right', marginRight: 10 }} >

                                                            <Select
                                                                className={classes.textFieldForm}
                                                                size='large'
                                                                native
                                                                value={MorningStartTime}
                                                                onChange={(e) => setMorningStartTime(e.target.value)}
                                                                label="Start Time"
                                                                inputProps={{
                                                                    name: 'start time',
                                                                    id: 'outlined-start-time-native-simple',
                                                                }}
                                                                style={{ width: '90%', fontSize: 12 }}
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
                                                    <center id='mybtn6'>
                                                        <FormControl id='mybtn' variant="outlined" size="small" className={classes.formControlForm} style={{ width: '65%', float: 'left', marginLeft: 10 }} >

                                                            <Select
                                                                className={classes.textFieldForm}
                                                                size='large'
                                                                native
                                                                value={MorningEndTime}
                                                                onChange={(e) => setMorningEndTime(e.target.value)}
                                                                label="End Time"
                                                                inputProps={{
                                                                    name: 'end time',
                                                                    id: 'outlined-end-time-native-simple',
                                                                }}
                                                                style={{ width: '90%', fontSize: 12 }}
                                                            >
                                                                <option aria-label="None" value="" >End Time</option>
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
                                            <Grid item xs={12} style={{ marginTop: '-10px' }}>
                                                <center id='mybtn7'>
                                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                                        Evening Shift Time
                                                    </Typography>
                                                </center>
                                            </Grid>

                                            <Grid container style={{ padding: 5 }}>
                                                <Grid item xs={6}>
                                                    <center id='mybtn8'>
                                                        <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', marginLeft: 50 }}>
                                                            Start Time
                                                        </Typography>
                                                    </center>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <center id='mybtn9'>
                                                        <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', marginRight: 50 }}>
                                                            End Time
                                                        </Typography>
                                                    </center>
                                                </Grid>
                                            </Grid>

                                            <Grid container >
                                                <Grid item xs={6}>
                                                    <center id='mybtn10'>
                                                        <FormControl variant="outlined" size="small" className={classes.formControlForm} style={{ width: '65%', float: 'right', marginRight: 10 }} >

                                                            <Select
                                                                className={classes.textFieldForm}
                                                                size='large'
                                                                native
                                                                value={EveningStartTime}
                                                                onChange={(e) => setEveningStartTime(e.target.value)}
                                                                label="Start Time"
                                                                inputProps={{
                                                                    name: 'start time',
                                                                    id: 'outlined-start-time-native-simple',
                                                                }}
                                                                style={{ width: '90%', fontSize: 12 }}
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
                                                    <center id='mybtn11'>
                                                        <FormControl variant="outlined" size="small" className={classes.formControlForm} style={{ width: '65%', float: 'left', marginLeft: 10 }} >

                                                            <Select
                                                                className={classes.textFieldForm}
                                                                size='large'
                                                                native
                                                                value={EveningEndTime}
                                                                onChange={(e) => setEveningEndTime(e.target.value)}
                                                                label="End Time"
                                                                inputProps={{
                                                                    name: 'end time',
                                                                    id: 'outlined-end-time-native-simple',
                                                                }}
                                                                style={{ width: '90%', fontSize: 12 }}
                                                            >
                                                                <option aria-label="None" value="" >End Time</option>
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

                                        </div>
                                    </center>
                                </Grid>
                                <Grid container>
                                    <Grid xs={12} sm={6}>
                                        <Button className={classes.btnCancle} onClick={() => setOpenmodal(false)} style={{ float: 'right', marginRight: 20 }}>
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid xs={12} sm={6}>
                                        <Button className={classes.btnCancle} onClick={Register_Staff} autoFocus style={{ float: 'left', marginLeft: 20 }}>
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </DialogContentText>
                    </DialogContent>

                </Dialog>


                {/* Edit Details  */}
                {/* <Edit_Patient /> */}

                {/* for Delete User */}
                {opendeletemodal ? <Delete_Staff_Details show={opendeletemodal} data={staffDetails} handleclose={() => setOpenDeletemodal(false)} /> : null}


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
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        marginTop: 10,
        fontSize: '11px'
    },
    formControlForm: {
        paddingBottom: theme.spacing(2.5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    textFieldForm: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 11,
    },
}));