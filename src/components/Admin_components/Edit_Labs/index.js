import React, { useState, useEffect, Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField, Slide, Select, FormControl, InputLabel, Typography, Button, IconButton, Grid, Paper } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { Country, State, City } from '../../../Apis/Clinic_Patients/Patient_Registration';
import { Times } from '../../../Apis/Home_Visitors';
import { Lab_Register } from '../../../Admin_Apis/Labs';
import { createTheme } from '@material-ui/core/styles';

const defaultMaterialTheme = createTheme({
    palette: {
        primary: {
            main: '#1769aa',
        },
    },
});

const drawerWidth = 240;

const Edit_Lab = ({ show, handleCloseEditmodal, data }) => {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [maxWidth, setMaxWidth] = React.useState('md');
    let obj = {};
    obj = data;
    const [firstnm, setfirstnm] = useState(obj ? obj.FirstName : '');
    const [lastnm, setlastnm] = useState(obj ? obj.LastName : '');
    const [mobile, setmobile] = useState(obj ? obj.LabMobileNo : '');
    const [email, setemail] = useState(obj ? obj.LabEmail : '');
    const [password, setpassword] = useState('');
    const [title, settitle] = useState(obj ? obj.NmTitle : '');
    const [address, setaddress] = useState(obj ? obj.LabAddress : '');
    const [city, setcity] = useState(obj ? obj.LabCity : '');
    const [pincode, setpincode] = useState(obj ? obj.LabPincode : '');
    const [state, setstate] = useState(obj ? obj.LabState : '');
    const [country, setcountry] = useState(obj ? obj.LabCountry : '');
    const [times, settimes] = useState([]);
    const [labname, setlabename] = useState(obj ? obj.LabName : '');
    const [GstNumber, setGstNumber] = useState(obj ? obj.LabGstNumber : '')
    const [Registration, setRegistration] = useState(obj ? obj.LabRegistrationNumber : '')
    const [MorningStartTime, setMorningStartTime] = useState(obj ? obj.LabMorningStartTime : '');
    const [MorningEndTime, setMorningEndTime] = useState(obj ? obj.LabMorningEndTime : '');
    const [EveningStartTime, setEveningStartTime] = useState(obj ? obj.LabEveningStartTime : '');
    const [EveningEndTime, setEveningEndTime] = useState(obj ? obj.LabEveningEndTime : '');

    const [countryData, setcountryData] = useState([]);
    const [stateData, setstateData] = useState([]);
    const [cityData, setcityData] = useState([]);

    const fetchCountry = async () => {
        const countries = await Country();
        setcountryData(countries);
    }
    const fetchTimes = async () => {
        const times = await Times();
        settimes(times);
    }

    console.log(data.LabId)

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

    useEffect(() => {
        fetchCountry();
        fetchState();
        fetchTimes();
    }, []);

    const Editlab = async () => {

        const date = new Date();
        const now = date.toISOString().split('T')[0];

        const obj = {
            LabId: data.LabId,
            NmTitle: title,
            FirstName: firstnm,
            LastName: lastnm,
            LabName: labname,
            MobileNo: mobile,
            Password: password,
            Email: email,
            LabAddress: address,
            LabCity: city,
            LabPincode: pincode,
            LabState: state,
            LabCountry: country,
            LabRegistrationNumber: Registration,
            LabGstNumber: GstNumber,
            LabMorningStartTime: MorningStartTime,
            LabMorningEndTime: MorningEndTime,
            LabEveningStartTime: EveningStartTime,
            LabEveningEndTime: EveningEndTime,
            createdDate: now
        }

        try {
            const registration = await Lab_Register(obj);
            let parse = JSON.parse(registration);
            if (parse.success === "200") {
                alert(parse.message);
                handleCloseEditmodal();
                window.location.reload()
            } else {
                alert(parse.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Dialog
                open={show}
                maxWidth={maxWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2', height: '40px' }}>{"Edit Lab"}
                    <IconButton edge="start" color="inherit" onClick={handleCloseEditmodal} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container>
                            <Grid item xs={12} sm={6} style={{ borderRight: '1px solid #F0F0F0', overflow: 'hidden' }}>
                                <center>
                                    <div>
                                        <Grid container style={{ marginTop: '20px' }}>
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
                                                            style={{ marginLeft: 68, width: 78, marginTop: 2, fontWeight: 500 }}
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
                                                        }} style={{ marginLeft: 90, width: 210, marginTop: 10 }}
                                                        id="outlined-basic" size="small" placeholder="First Name" label="First Name" variant="outlined" />
                                                    <span style={{ fontSize: 20, color: 'red', marginLeft: '102%', top: -70, position: 'relative' }}> *</span>
                                                </center>
                                            </Grid>
                                        </Grid>

                                        <TextField className={classes.inputFields} value={lastnm}
                                            onChange={(e) => {
                                                const re = /^[a-z ,.'-]+$/i;

                                                // if value is not blank, then test the regex

                                                if (e.target.value == '' || re.test(e.target.value)) {
                                                    setlastnm(e.target.value)
                                                }
                                            }} style={{ marginLeft: 13, marginTop: -36 }} id="outlined-basic" size="small" label="Last Name" placeholder="Last Name" variant="outlined" />
                                        <span style={{ position: 'relative', bottom: 45, fontSize: 20, color: 'red' }}> *</span>
                                        <TextField className={classes.inputFields} value={labname}
                                            onChange={(e) => {
                                                const re = /^[a-z ,.'-]+$/i;

                                                // if value is not blank, then test the regex

                                                if (e.target.value == '' || re.test(e.target.value)) {
                                                    setlabename(e.target.value)
                                                }
                                            }} style={{ marginLeft: 13, marginTop: -6 }} id="outlined-basic" size="small" label="Lab Name" placeholder="Lab Name" variant="outlined" />
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
                                            label="Mobile Number"
                                            placeholder="Mobile Number"
                                            variant="outlined"
                                            onInput={(e) => {
                                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                            }}
                                        /> <span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span>

                                        <TextField className={classes.inputFields} value={email} onChange={(e) => setemail(e.target.value)} id="outlined-basic" type="email" size="small" label="Email Id" placeholder="Email Id" variant="outlined" style={{}} />
                                        <FormControl variant="outlined" size="small" className={classes.formControl} style={{ marginLeft: 48, width: '75%', fontWeight: 600, marginTop: -1 }} >
                                            <Select
                                                className={classes.textFieldForm}
                                                size='large'
                                                native
                                                value={country}
                                                key={country}
                                                onChange={(e) => { setcountry(e.target.value) }}
                                                defaultChecked='India'
                                                label="Country"
                                                placeholder='Country'
                                                inputProps={{
                                                    name: 'Country',
                                                    id: 'outlined-end-time-native-simple',
                                                }}
                                                style={{ width: '88%', height: '45px', fontSize: 14, fontWeight: 600, color: '#707070' }}
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

                                        <FormControl variant="outlined" size="small" onClick={() => fetchCity()} className={classes.formControl} style={{ marginLeft: 48, width: '75%', fontWeight: 600 }} >
                                            <Select
                                                disabled={country ? false : true}
                                                className={classes.textFieldForm}
                                                size='large'
                                                native
                                                value={state}
                                                onChange={(e) => setstate(e.target.value)}
                                                label="State"
                                                placeholder='State'
                                                inputProps={{
                                                    name: 'State',
                                                    id: 'outlined-end-time-native-simple',
                                                }}
                                                style={{ width: '88%', height: '45px', fontSize: 14, fontWeight: 600, color: '#707070' }}
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

                                        <FormControl variant="outlined" size="small" className={classes.formControl} style={{ marginLeft: 48, width: '75%', fontWeight: 600, }} >
                                            <Select
                                                disabled={country ? false : true}
                                                className={classes.textFieldForm}
                                                size='large'
                                                native
                                                value={city}
                                                onChange={(e) => setcity(e.target.value)}
                                                label="City"
                                                placeholder='City'
                                                inputProps={{
                                                    name: 'City',
                                                    id: 'outlined-end-time-native-simple',
                                                }}
                                                style={{ width: '88%', height: '45px', fontSize: 14, fontWeight: 600, color: '#707070', marginTop: 3 }}
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
                                    </div>
                                </center>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <center>
                                    <div style={{ marginTop: '20px' }}>
                                        <TextField className={classes.inputFields} multiline
                                            value={address}
                                            onChange={(e) => {
                                                setaddress(e.target.value)
                                            }}

                                            id="outlined-basic" size="small" label="Address" placeholder='Address' variant="outlined"
                                            style={{ marginTop: 10, }}
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
                                            label="Pincode"
                                            variant="outlined" />
                                        <TextField className={classes.inputFields}
                                            value={GstNumber}
                                            onChange={(e) => setGstNumber(e.target.value)}
                                            id="outlined-basic" size="small"
                                            placeholder="Gst Number"
                                            label="Gst Number"
                                            variant="outlined" />
                                        <TextField className={classes.inputFields}
                                            value={Registration}
                                            label="Registration Number"
                                            onChange={(e) => setRegistration(e.target.value)}
                                            id="outlined-basic" size="small"
                                            placeholder="Registration Number"
                                            variant="outlined" />
                                        <Grid item xs={12}>
                                            <center id='mybtn2'>
                                                <Typography id='mybtn' variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', marginTop: '-10px' }}>
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
                                                            style={{ width: '90%', fontSize: 14 }}
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
                                                            style={{ width: '90%', fontSize: 14 }}
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
                                        <Grid item xs={12} style={{ marginTop: '10px' }}>
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
                                                            style={{ width: '90%', fontSize: 14 }}
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
                                                            style={{ width: '90%', fontSize: 14 }}
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

                            <Grid container style={{ marginBottom: -10 }}>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnCancle} onClick={handleCloseEditmodal} style={{ float: 'right', marginRight: 20 }}>
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnregister} onClick={() => Editlab()} autoFocus style={{ float: 'left', marginLeft: 20 }}>
                                        Save
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

export default Edit_Lab
