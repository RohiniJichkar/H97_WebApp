import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Slide, Select, FormControl, InputLabel, Typography, Button, Table, TableContainer, TableBody, TableCell, TableHead, InputBase, TableRow, TablePagination, Drawer, Divider, MenuItem, Menu, ListItem, ListItemIcon, ListItemText, List, IconButton, Grid, Paper, Link } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Register_Patient } from '../../../Apis/Clinic_Patients/Patient_Registration';

const drawerWidth = 240;

const Add_Patinet = ({ show, handleclose }) => {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [maxWidth, setMaxWidth] = React.useState('md');

    const [firstnm, setfirstnm] = useState('');
    const [lastnm, setlastnm] = useState('');
    const [mobile, setmobile] = useState('');
    const [email, setemail] = useState('');
    const [dob, setdob] = useState('');
    const [password, setpassword] = useState('');
    const [gender, setgender] = useState('');
    const [address, setaddress] = useState('');
    const [city, setcity] = useState('');
    const [pincode, setpincode] = useState('');
    const [state, setstate] = useState('');
    const [country, setcountry] = useState('');
    const [height, setheight] = useState('');
    const [weight, setweight] = useState('');
    const [showPassword, setshowPassword] = useState(false);

    const PatientRegistration = async (firstnm, lastnm, mobile, password, email, dob, gender, address, city, pincode, state, country, height, weight) => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        const date = new Date();
        const now = date.toISOString().split('T')[0];
       
        if (firstnm.trim() == '' || lastnm.trim() == '' || mobile.trim() == '' || password.trim() == '' || dob.trim() == '' || gender.trim() == '') {
            alert('Please Enter Mandatory fields')
            return;
        }
        else if (dob > now) {
            alert('Invalid Date of Birth');
            return;
        }

        var FirstNm = firstnm.split(/\s/).join('');

        let dobstr = dob;

        let birth_year = Number(dobstr.substring(0, 4));
        let birth_month = Number(dobstr.substring(5, 2));
        let birth_day = Number(dobstr.substring(8, 2));

        let today_year = date.getFullYear();
        let today_month = date.getMonth();
        let today_day = date.getDate();
        let age = today_year - birth_year;

        if (today_month < (birth_month - 1)) {
            age--;
            return age;
        }
        if (((birth_month - 1) == today_month) && (today_day < birth_day)) {
            age--;
            return age;
        }

        const obj = {
            ClinicId: clinicid,
            FirstName: FirstNm,
            LastName: lastnm,
            MobileNo: mobile,
            Password: password,
            Email: email,
            DOB: dob,
            Age: age,
            Gender: gender,
            Address: address,
            City: city,
            Pincode: pincode,
            State: state,
            Country: country,
            Height: height,
            Weight: weight,
            createdDate: now
        }

        try {
            const registration = await Register_Patient(obj);
            let parse = JSON.parse(registration);
            if (parse.success === "200") {
                alert(parse.message);
                // setOpenmodal(false);
                window.location.reload()
            } else {
                alert(parse.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Dialog
                open={show}
                maxWidth={maxWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Register New Patient"}
                    <IconButton edge="start" color="inherit" onClick={handleclose} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container>
                            <Grid item xs={12} sm={6} style={{ borderRight: '1px solid #F0F0F0' }}>
                                <center>
                                    <div>
                                        <TextField className={classes.inputFields} value={firstnm}
                                            onChange={(e) => {
                                                const re = /^[a-z ,.'-]+$/i;
                                                // if value is not blank, then test the regex
                                                if (e.target.value == '' || re.test(e.target.value)) {
                                                    setfirstnm(e.target.value)
                                                }
                                            }} style={{ marginLeft: 13 }}
                                            id="outlined-basic" size="small" placeholder="First Name" variant="outlined" />
                                        <span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span>
                                        <TextField className={classes.inputFields} value={lastnm}
                                            onChange={(e) => {
                                                const re = /^[a-z ,.'-]+$/i;

                                                // if value is not blank, then test the regex

                                                if (e.target.value == '' || re.test(e.target.value)) {
                                                    setlastnm(e.target.value)
                                                }
                                            }} style={{ marginLeft: 13 }} id="outlined-basic" size="small" placeholder="Last Name" variant="outlined" />
                                        <span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span>
                                        <TextField
                                            className={classes.inputFields}
                                            value={mobile}
                                            onChange={(e) => {
                                                const re = /^[0-9\b]+$/;

                                                // if value is not blank, then test the regex

                                                if (e.target.value == '' || re.test(e.target.value)) {
                                                    setmobile(e.target.value)
                                                }
                                            }} style={{ marginLeft: 13 }}
                                            id="outlined-basic"
                                            type="number"
                                            size="small"
                                            placeholder="Mobile Number"
                                            variant="outlined"
                                            onInput={(e) => {
                                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                            }}
                                        /> <span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span>

                                        <TextField className={classes.inputFields} value={password} onChange={(e) => setpassword(e.target.value)}
                                            id="outlined-basic" type={showPassword ? 'text' : 'password'} size="small" placeholder="Password" variant="outlined"
                                            style={{ marginLeft: 12 }}
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
                                            }} />  <span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span>
                                        <TextField className={classes.inputFields} value={email} onChange={(e) => setemail(e.target.value)} id="outlined-basic" type="email" size="small" placeholder="Email Id" variant="outlined" style={{marginLeft: 30}}/>
                                        <span style={{position:'relative', top:50, right:290, fontSize:13}}>DOB</span>
                                        <TextField className={classes.inputFields} style={{ marginLeft: 13 }} defaultValue={new Date()} value={dob} onChange={(e) => setdob(e.target.value)} id="outlined-basic" type="date" size="small" variant="outlined" />
                                        <span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span>
                                        <FormControl variant="outlined" size='small' className={classes.formControl}  >
                                            <Select
                                                className={classes.inputFields}
                                                native
                                                size='small'
                                                value={gender}
                                                label="Gender"
                                                onChange={(e) => setgender(e.target.value)}

                                                inputProps={{
                                                    name: 'gender',
                                                    id: 'outlined-gender-native-simple',
                                                }}
                                                style={{ marginLeft: 14 }}
                                            >
                                                <option aria-label="None" value="" >Gender*</option>
                                                <option value='Male'>Male</option>
                                                <option value='Female'>Female</option>

                                            </Select>
                                        </FormControl> <span style={{ position: 'relative', bottom: 4, fontSize: 20, right: 8, color: 'red' }}> *</span>
                                    </div>
                                </center>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <center>
                                    <div>
                                        <TextField className={classes.inputFields} value={country}
                                            onChange={(e) => {
                                                const re = /^[A-Za-z]+$/;

                                                // if value is not blank, then test the regex

                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    setcountry(e.target.value)
                                                }
                                            }} id="outlined-basic" size="small" placeholder="Country" variant="outlined" />

                                     
                                        <TextField className={classes.inputFields} value={state}
                                            onChange={(e) => {
                                                const re = /^[A-Za-z]+$/;

                                                // if value is not blank, then test the regex

                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    setstate(e.target.value)
                                                }
                                            }}
                                            id="outlined-basic" size="small" placeholder="State" variant="outlined" />
                                        <TextField
                                            className={classes.inputFields}
                                            value={city}
                                            onChange={(e) => {
                                                const re = /^[A-Za-z]+$/;

                                                // if value is not blank, then test the regex

                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    setcity(e.target.value)
                                                }
                                            }}
                                            id="outlined-basic"
                                            size="small"
                                            placeholder="City"
                                            variant="outlined"
                                        />
                                        <TextField className={classes.inputFields} multiline
                                            onChange={(e) => {
                                                setaddress(e.target.value)
                                            }}
                                            rows={2}
                                            rowsMax={6} id="outlined-basic" size="small" label="Address" variant="outlined"
                                        />

                                        <TextField className={classes.inputFields} value={pincode} onChange={(e) => setpincode(e.target.value)} id="outlined-basic" size="small" placeholder="Pincode" variant="outlined" />


                                        <TextField
                                            className={classes.inputFields}
                                            value={height}
                                            onChange={(e) => {
                                                const re = /^[0-9-.\b]+$/;
                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    setheight(e.target.value)
                                                }
                                            }}
                                            id="outlined-basic"
                                            size="small"
                                            placeholder="Height"
                                            variant="outlined"
                                        />

                                        <TextField className={classes.inputFields} value={weight} onChange={(e) => setweight(e.target.value)} id="outlined-basic" size="small" placeholder="Weight" variant="outlined" />

                                    </div>
                                </center>
                            </Grid>

                            <Grid container>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnCancle} onClick={handleclose} style={{ float: 'right', marginRight: 20 }}>
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnregister} onClick={() => PatientRegistration(firstnm, lastnm, mobile, password, email, dob, gender, address, city, pincode, state, country, height, weight)} autoFocus style={{ float: 'left', marginLeft: 20 }}>
                                        Register
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
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
}))

export default Add_Patinet
