import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import VideoPlayer from "react-background-video-player";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import { green } from '@material-ui/core/colors';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FormGroup from '@material-ui/core/FormGroup';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

const drawerWidth = 0;


const loginapi = 'http://13.233.217.107:8080/api/Login';
const adminlogin = 'http://13.233.217.107:8080/api/AdminLogin';
const userlogin = 'http://13.233.217.107:8080/api/Web_UserLogin';
const getroles = 'http://13.233.217.107:8080/api/Web_LoginRoles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const GreenCheckbox = withStyles({
  root: {

    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',

  },
  notchedOutline: {
    borderWidth: "1.5px",
    borderColor: "black !important",
    color: 'black'
  },
  input: {
    color: "#2C7FB2",
    borderWidth: "1px",
    borderColor: "yellow !important"
  },
  image: {

    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(0, 15, 6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#2C7FB2'

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    // width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    textAlign: 'center'
  },
  icon: {
    lineHeight: 2,
    position: 'relative',
    width: '100px',
    height: '100px',
    background: '#f8fbff',
    fontSize: '48px',
    color: '#2C7FB2',
    borderRadius: '50%'
  },
  icon1: {
    lineHeight: 2,
    position: 'relative',
    width: '100px',
    height: '100px',
    background: '#f8fbff',
    fontSize: '48px',
    color: '#2C7FB2',
    borderRadius: '50%'
  },

  grid: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',

  },
  gridShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  icon2: {
    lineHeight: 2,
    position: 'relative',
    width: '100px',
    height: '100px',
    background: '#f8fbff',
    fontSize: '48px',
    color: '#2C7FB2',
    borderRadius: '50%'
  },
  icon4: {
    lineHeight: 2,
    position: 'relative',
    width: '100px',
    height: '100px',
    background: '#f8fbff',
    fontSize: '48px',
    color: '#2C7FB2',
    borderRadius: '50%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '280px',
    background: 'linear-gradient(90deg, rgba(15,106,162,1) 1%, rgba(44,127,178,1) 38%, rgba(120,176,136,1) 76%)'
  },
  select: {
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'black',
      borderWidth: '1px'
    },
  },
}));


function Login(props) {

  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState('');
  const [state, setState] = useState(false);
  const [mobile, setmobile] = useState('');
  const [password, setpassword] = useState('');
  const [showPassword, setshowPassword] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [role, setrole] = useState('');
  const [roleData, setroleData] = useState([]);

  // const handleRoles = async () => {
  //   const fetchRoles = axios.post(getroles);
  //   setroleData(fetchRoles?.data?.Role);
  // }

  const handleRoles = async () => {
    const roleInfo = await axios.post(getroles);
    setroleData(roleInfo?.data?.Role);
  }

  const handleChangeCheckBox = (event) => {
    setState(true);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const setMobileNo = (e) => {
    setmobile(e.target.value);
  }
  const setPassword = (e) => {
    setpassword(e.target.value);
  }

  const navigate = useNavigate();

  function setWithExpiry(key, value, ttl, mobile, password, state, selectedValue) {

    const now = new Date()
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
      mobile: mobile,
      password: password,
      checkbox: state,
      Role: selectedValue
    }
    localStorage.setItem(key, JSON.stringify(item))

  }

  const RememberUser = async () => {

    const itemStr = await localStorage.getItem('rememberme');
    const item = [JSON.parse(itemStr)]
    if (itemStr) {
      console.log(item)
      setmobile(item[0].mobile)
      setSelectedValue(item[0].role)
    }
  }

  const handleClickSignUp = () => {
    navigate('/SignUp');
  }

  const handleClickForgotPass = () => {
    navigate('/ForgotPassword');
  }

  useEffect(() => {
    RememberUser();
    handleRoles();
  }, [])

  const handleSubmit = async () => {
    var date = new Date();
    date.setDate(date.getDate() + 30);
    var dateString = date.toISOString().split('T')[0];
    if (selectedValue == 'Admin') {
      try {
        var login = await axios.post(adminlogin, { MobileNo: mobile, Password: password }).then(Json => {
          window.localStorage.setItem("userdata", JSON.stringify(Json?.data));
          let responseData = Json.data;
          if (responseData.success == '200') {
            navigate('/AdminDashboard');
          }
          if (state) {
            setWithExpiry("rememberme", Json?.data?.token, dateString, mobile, password, state, selectedValue)
          }

        }).catch(function (error) {
          //handle error
          console.log(error.response.data.message);
          alert(error.response.data.message);
        });
      } catch (error) {
        console.log(error);
      }
    }
    else if (selectedValue == 'Lab') {
      try {
        var login = await axios.post(userlogin, { MobileNo: mobile, Password: password, Role: 'Lab' }).then(Json => {
          window.localStorage.setItem("userdata", JSON.stringify(Json?.data));
          let responseData = Json.data;
          if (responseData.success == '200') {
            navigate('/LabHome');
          }
          if (state) {
            setWithExpiry("rememberme", Json?.data?.token, dateString, mobile, password, state, selectedValue)
          }

        }).catch(function (error) {
          //handle error
          console.log(error.response.data.message);
          alert(error.response.data.message);
        });
      } catch (error) {
        console.log(error);
      }
    }
    else {
      try {
        await axios.post(loginapi, { MobileNo: mobile, Password: password, Role: selectedValue })
          .then(Json => {
            window.localStorage.setItem("userdata", JSON.stringify(Json?.data));
            let responseData = Json.data
            if (responseData.success == '200') {
              if (responseData.Role === "Doctor") {
                navigate('/DoctorHome')
              }
              else {
                navigate('/Staff_Home')
              }
            }
            if (state) {
              setWithExpiry("rememberme", Json?.data?.token, dateString, mobile, password, state, selectedValue)
            }

          }).catch(function (error) {
            //handle error
            console.log(error.response.data.message);
            alert(error.response.data.message);
          });
      } catch (error) {
        console.log(error);
      }
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
      <div className={classes.root} style={{ backgroundColor: '#ffffff' }}>
        <Grid container spacing={2}
          className={clsx(classes.grid, {
            [classes.gridShift]: open,
          })}
          direction="row"
        >
          <Grid item xs={12} sm={12} lg={3}>
            <div>
              <VideoPlayer
                className="video"
                src={
                  'clinic (1).mp4'
                }
                autoPlay={true}
                style={{ height: '519px', width: '100%' }}

                muted={true}
              />
            </div>
          </Grid>
          <Grid id='homediv' item xs={12} sm={12} lg={12}>
            <nav class="navbar fixed-top navbar-expand-md navbar-light white double-nav scrolling-navbar" style={{ background: 'white', position: 'fixed', width: '100%' }}>


              <img src="h97 logo horizontal-01.png" alt="Health97" height="60px" width="230px"
                style={{ marginLeft: '50px' }}></img>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav"
                aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="oi oi-menu"></span> Menu
              </button>

              <div class="collapse navbar-collapse" id="ftco-nav">
                <ul class="navbar-nav ml-auto" >
                  <li class="nav-item"><a href="#homediv" class="nav-link"
                    style={{ fontWeight: 'bold', fontSize: '110%', marginLeft: 700 }}>Home</a></li>
                  {/* <li class="nav-item"><a href="about.html" class="nav-link"
                  style={{ fontWeight: 'bold', fontSize: '110%', paddingLeft: 20 }}>About</a></li> */}
                  <li class="nav-item"><a href="#doctordiv" class="nav-link"
                    style={{ fontWeight: 'bold', fontSize: '110%', paddingLeft: 20 }}>Doctor</a></li>
                  <li class="nav-item"><a href="#patientdiv" class="nav-link"
                    style={{ fontWeight: 'bold', fontSize: '110%', paddingLeft: 20 }}>Patients</a></li>
                  {/* <li class="nav-item"><a href="gallery.html" class="nav-link"
                  style={{ fontWeight: 'bold', fontSize: '110%', paddingLeft: 20 }}>Gallery</a></li> */}
                  <li class="nav-item"><a href="#contactdiv" class="nav-link"
                    style={{ fontWeight: 'bold', fontSize: '110%', paddingLeft: 20 }}>Contact</a></li>

                </ul>
              </div>


            </nav>

          </Grid>


          <Grid item xs={11} sm={3} component={Paper} elevation={0} square style={{ backgroundColor: 'transparent', marginLeft: -80, height: 360, marginTop: 90 }} >
            <div className={classes.paper} >

              <form className={classes.form} noValidate style={{ position: 'relative', width: '330px', borderColor: 'linear-gradient(90deg, rgba(15,106,162,1) 1%, rgba(44,127,178,1) 38%, rgba(120,176,136,1) 76%)', border: '3px solid ', height: '320px', paddingTop: '10px', marginLeft: '190px' }}>
                <Grid item xs={12} sm={12} >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    id="mobile"
                    required
                    style={{ width: '275px' }}
                    label="Phone Number"
                    type='number'
                    size='small'
                    value={mobile}
                    InputLabelProps={{
                      style: { color: 'black' },
                    }}
                    InputProps={{
                      classes: {
                        input: classes.input,
                        notchedOutline: classes.notchedOutline
                      }
                    }}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                    }}
                    onChange={(e) => setMobileNo(e)}

                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    style={{ width: '275px' }}
                    variant="outlined"
                    margin="normal"
                    id="password"
                    required
                    label="Password"
                    value={password}
                    type={showPassword ? 'text' : 'password'}
                    size='small'
                    onChange={(e) => setPassword(e)}
                    InputLabelProps={{
                      style: { color: 'black' },
                    }}
                    InputProps={{
                      classes: {
                        input: classes.input,
                        notchedOutline: classes.notchedOutline
                      },
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
                </Grid>

                <div style={{ marginLeft: '-12px' }}>
                  <FormControl variant="outlined" size="small"
                    style={{ marginLeft: 38, width: '91%', color: 'black', fontWeight: 600, marginTop: '13px', }} >
                    <Select
                      size='large'
                      native
                      value={selectedValue}
                      onChange={(e) => setSelectedValue(e.target.value)}
                      className={classes.select}
                      style={{ width: '89%', fontSize: 14, fontWeight: 600, }}
                    >
                      <option value=''>Select Role</option>
                      {roleData.map((item) => {
                        return (
                          <option value={item.Role}>{item.Role}</option>
                        )
                      })}


                    </Select>
                  </FormControl>

                  {/* <FormControl variant="outlined" size="small" className={classes.formControlForm} style={{ width: '73%', marginTop: 15 }} >

                    <Select
                      className={classes.textFieldForm}
                      size='large'
                      native
                      label="Gender"
                      inputProps={{
                        name: 'gender',
                        id: 'outlined-gender-native-simple',
                      }}
                      style={{ width: '113%', fontSize: 14, marginLeft: -10  }}
                    >
                      <option aria-label="None" value="" >Gender*</option>
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>

                    </Select>
                  </FormControl> */}
                </div>
                {/* <Radio
                  checked={selectedValue === 'Doctor'}
                  onChange={handleChange}
                  value="Doctor"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'Doctor' }}
                  style={{ color: '#2C7FB2' }}
                />Doctor
                <Radio
                  checked={selectedValue === 'Receptionist'}
                  onChange={handleChange}
                  value="Receptionist"
                  style={{ color: '#2C7FB2' }}

                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'Receptionist' }}
                />Receptionist
                <Radio
                  checked={selectedValue === 'Admin'}
                  color='primary'
                  onChange={handleChange}
                  value="Admin"
                  name="radio-button-demo"
                  style={{ color: '#2C7FB2' }}
                  inputProps={{ 'aria-label': 'Admin' }}
                />Admin
              </div> */}

                <Grid container style={{ paddingTop: '15px' }}>
                  <Grid item xs={6} sm={6} align="left" style={{ marginTop: '-10px' }}>
                    <FormGroup  >
                      <FormControlLabel
                        control={<GreenCheckbox checked={state.checked} onChange={handleChangeCheckBox} />}
                        label="Remember Me"
                        style={{ fontSize: '10px', marginLeft: '15px' }}

                      />
                    </FormGroup>


                    {/* <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                /> */}
                  </Grid>
                  <Grid item xs={6} sm={6} style={{ paddingBootom: '25px' }} >
                    <Link onClick={() => handleClickForgotPass()} variant="body2" style={{ color: 'black', cursor: 'pointer', marginTop: '-15px' }}>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      className={classes.submit}
                      style={{ color: '#fff', backgroundColor: 'linear-gradient(90deg, rgba(15,106,162,1) 1%, rgba(44,127,178,1) 38%, rgba(120,176,136,1) 76%)', borderRadius: 20 }}
                      onClick={handleSubmit}
                    >
                      Sign In
                    </Button>
                  </Grid>
                </Grid>

              </form>
            </div>
          </Grid>


          <Grid container style={{ position: 'relative' }}>
            <Grid item xs={12} sm={12}>
              <div id='doctordiv' style={{ backgroundImage: 'linear-gradient(to right, #4ca2cd, #67b26f)', display: 'block', height: '10px', marginTop: '45px' }} > </div>
              <p style={{ textAlign: 'center', color: '#2C7FB2', fontSize: '36px', fontWeight: 'bold', overflow: 'hidden', whiteSpace: 'pre-wrap', overflowWrap: 'break-word', }}>425+ DOCTORS REGISTERED</p>
              <div style={{ backgroundImage: 'linear-gradient(to right, #4ca2cd, #67b26f)', display: 'block', height: '10px', marginTop: '8px' }}> </div>
            </Grid>
          </Grid>


          <Grid container >
            <Grid item xs={12} sm={12}>
              <section class="ftco-section ftco-services" style={{ backgroundImage: 'linear-gradient(to right, #67b26f, #4ca2cd)', }}>

                <h3 class="mb-2" style={{ fontWeight: 'bold', color: 'aliceblue', textAlign: 'center' }}>Doctor's
                  Features</h3>

                <p style={{ color: 'white', textAlign: 'center' }}>We have successfully registered more than 425 doctors.</p>

                <Grid container >
                  <Grid item xs={12} sm={3}>
                    <center>
                      <div class="media block-6 services ">
                        <div className={classes.icon} style={{ alignSelf: 'center', textAlign: 'center' }}>
                          <span class="fal fa-users-medical"></span>
                        </div>
                        <div class="media-body p-2 mt-3">
                          <h5 class="heading" style={{ color: 'white' }}>Home Visitor Facility</h5>
                        </div>
                      </div>
                    </center>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <center>
                      <div class="media block-6 services">
                        <div className={classes.icon} style={{ alignSelf: 'center', textAlign: 'center' }}>
                          <span class="fal fa-tasks-alt"></span>
                        </div>
                        <div class="media-body p-2 mt-3">
                          <h5 class="heading" style={{ color: 'white' }}>OPD Queue Management</h5>

                        </div>
                      </div>
                    </center>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <center>
                      <div class="media block-6 services">
                        <div className={classes.icon} style={{ alignSelf: 'center', textAlign: 'center' }}>
                          <span class="fal fa-book-open"></span>
                        </div>
                        <div class="media-body p-2 mt-3">
                          <h5 class="heading" style={{ color: 'white' }}>Digital Prescriptions</h5>

                        </div>
                      </div>
                    </center>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <center>
                      <div class="media block-6 services ">
                        <div className={classes.icon} style={{ alignSelf: 'center', textAlign: 'center' }}>
                          <span class="fal fa-calendar-week"></span>
                        </div>
                        <div class="media-body p-2 mt-3">
                          <h5 class="heading" style={{ color: 'white' }}>Analytical Dashboard</h5>

                        </div>
                      </div>
                    </center>
                  </Grid>
                </Grid>

                <Grid container >
                  <Grid item xs={12} sm={3}>
                    <center>
                      <div class="media block-6 services ">
                        <div className={classes.icon2} style={{ alignSelf: 'center', textAlign: 'center' }}>
                          <span class="fal fa-badge-check"></span>
                        </div>
                        <div class="media-body p-2 mt-3">
                          <h5 class="heading" style={{ color: 'white' }}>Online Patient History Lifetime</h5>

                        </div>
                      </div>
                    </center>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <center>
                      <div class="media block-6 services">
                        <div className={classes.icon1} style={{ alignSelf: 'center', textAlign: 'center' }}>
                          <span class="fal fa-comment-alt"></span>
                        </div>
                        <div class="media-body p-2 mt-3">
                          <h5 class="heading" style={{ color: 'white' }}>Message Broadcasting</h5>

                        </div>
                      </div>
                    </center>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <center>
                      <div class="media block-6 services ">
                        <div className={classes.icon1} style={{ alignSelf: 'center', textAlign: 'center' }}>
                          <span class="fal fa-calendar-check"></span>
                        </div>
                        <div class="media-body p-2 mt-3">
                          <h5 class="heading" style={{ color: 'white' }}>Online Appointment Booking</h5>

                        </div>
                      </div>
                    </center>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <center>
                      <div class="media block-6 services ">
                        <div className={classes.icon1} style={{ alignSelf: 'center', textAlign: 'center' }}>
                          <span class="fal fa-file-chart-pie"></span>
                        </div>
                        <div class="media-body p-2 mt-3">
                          <h5 class="heading" style={{ color: 'white' }}>Financial Reporting</h5>

                        </div>
                      </div>
                    </center>
                  </Grid>
                </Grid>
              </section>
            </Grid>
          </Grid>


          <Grid id='patientdiv' item xs={12} >
            <div style={{ backgroundImage: 'linear-gradient(to right, #4ca2cd, #67b26f)', display: 'block', height: '10px', marginTop: '-8px', marginLeft: -8, marginRight: 10 }} > </div>
            <Grid item xs={12}>
              <p style={{ textAlign: 'center', color: '#2C7FB2', fontSize: '36px', fontWeight: 'bold', overflow: 'auto', whiteSpace: 'pre-wrap', overflowWrap: 'break-word', }}>24000+ PATIENTS REGISTERED</p>
            </Grid>
            <div style={{ backgroundImage: 'linear-gradient(to right, #4ca2cd, #67b26f)', display: 'block', height: '10px', marginTop: '5px', marginLeft: -8 }}> </div>

          </Grid>


          {/* Patient Features */}

          <Grid container >
            <Grid item xs={12} sm={12}>

              <section class="ftco-section ftco-services" style={{ backgroundImage: 'linear-gradient(to right, #67b26f, #4ca2cd)', marginTop: -8 }}>

                <h3 class="mb-2" style={{ fontWeight: 'bold', color: 'aliceblue', textAlign: 'center' }}>Patient's
                  Features</h3>
                <p style={{ color: 'white', textAlign: 'center' }}>We have successfully registered more than 24000 patients.</p>

                <Grid container >
                  <Grid item xs={12} sm={3}>
                    <center>
                      <div class="media block-6 services ">
                        <div className={classes.icon} style={{ alignSelf: 'center', textAlign: 'center' }}>
                          <span class="fal fa-analytics"></span>
                        </div>
                        <div class="media-body p-2 mt-3">
                          <h5 class="heading" style={{ color: 'white', marginLeft: '-20' }}>Activity Trackers</h5>

                        </div>
                      </div>
                    </center>
                  </Grid>


                  <Grid item xs={12} sm={3}>
                    <center>
                      <div class="media block-6 services ">
                        <div className={classes.icon} style={{ alignSelf: 'center', textAlign: 'center' }}>
                          <span class="fal fa-calendar-check"></span>
                        </div>
                        <div class="media-body p-2 mt-3">
                          <h5 class="heading" style={{ color: 'white' }}>Online Appointment Booking</h5>

                        </div>
                      </div>
                    </center>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <center>
                      <div class="media block-6 services ">
                        <div className={classes.icon} style={{ alignSelf: 'center', textAlign: 'center' }}>
                          <span class="fal fa-file-prescription"></span>
                        </div>
                        <div class="media-body p-2 mt-3">
                          <h5 class="heading" style={{ color: 'white' }}>Digital Prescriptions</h5>

                        </div>
                      </div>
                    </center>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <center>
                      <div class="media block-6 services ">
                        <div className={classes.icon} style={{ alignSelf: 'center', textAlign: 'center' }}>
                          <span class="fal fa-hospital"></span>
                        </div>
                        <div class="media-body p-2 mt-3">
                          <h5 class="heading" style={{ color: 'white' }}>Nearby Hospitals Search</h5>

                        </div>
                      </div>
                    </center>
                  </Grid>
                </Grid>


                <Grid container >
                  <Grid item xs={12} sm={3}>
                    <center>
                      <div class="media block-6 services ">
                        <div className={classes.icon2} style={{ alignSelf: 'center', textAlign: 'center' }}>
                          <span class="fal fa-home"></span>
                        </div>
                        <div class="media-body p-2 mt-3">
                          <h5 class="heading" style={{ color: 'white' }}>Home Remedies Info</h5>

                        </div>
                      </div>
                    </center>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <center>
                      <div class="media block-6 services ">
                        <div className={classes.icon1} style={{ alignSelf: 'center', textAlign: 'center' }}>
                          <span class="fal fa-plus-square"></span>
                        </div>
                        <div class="media-body p-2 mt-3">
                          <h5 class="heading" style={{ color: 'white' }}>Latest Health News</h5>

                        </div>
                      </div>
                    </center>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <center>
                      <div class="media block-6 services">
                        <div className={classes.icon1} style={{ alignSelf: 'center', textAlign: 'center' }}>
                          <span class="fal fa-users-medical"></span>
                        </div>
                        <div class="media-body p-2 mt-3">
                          <h5 class="heading" style={{ color: 'white' }}>Pregancy Tips</h5>

                        </div>
                      </div>
                    </center>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <center>
                      <div class="media block-6 services">
                        <div className={classes.icon1} style={{ alignSelf: 'center', textAlign: 'center' }}>
                          <span class="fal fa-tooth"></span>
                        </div>
                        <div class="media-body p-2 mt-3">
                          <h5 class="heading" style={{ color: 'white' }}>Dental Care Tips</h5>

                        </div>
                      </div>
                    </center>
                  </Grid>
                </Grid>
              </section>
            </Grid>
          </Grid>


          <Grid container >
            <Grid item xs={12} sm={12}>
              <section class="ftco-section ftco-services" >
                <p style={{ textAlign: 'center', color: '#4ccbeb', fontSize: '35px', fontFamily: 'sans-serif' }}>Highly Used Services
                </p>
                <Grid item xs={12} noWrap={true}>
                  <p style={{
                    color: '#496cbd', fontWeight: 'bold', textAlign: 'center',
                    overflow: "hidden",
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                  }}>We offer more than many services out of
                    those below are some most popular services.</p>
                </Grid>

                <Grid container>
                  <Grid item xs={12} sm={3}>
                    <center>
                      <div class="service-widget">
                        <div class="post-media wow fadeIn">
                          <a data-rel="prettyPhoto[gal]" class="hoverbutton global-radius"><i
                            class="flaticon-unlink"></i></a>
                          <img src="ambulance.PNG" alt="" class="img-responsive" width="100%" height="200px" />
                        </div>
                        <h5 style={{ textAlign: 'center' }}>24/7 Ambulance Booking Service</h5>
                      </div>
                    </center>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <center>
                      <div class="service-widget">
                        <div class="post-media wow fadeIn">
                          <a data-rel="prettyPhoto[gal]" class="hoverbutton global-radius"><i
                            class="flaticon-unlink"></i></a>
                          <img src="Appointment.png" alt="" class="img-responsive" width="100%" height="200px" />
                        </div>
                        <h5 style={{ textAlign: 'center' }}>Online Appointment Booking</h5>
                      </div>
                    </center>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <center>
                      <div class="service-widget">
                        <div class="post-media wow fadeIn">
                          <a data-rel="prettyPhoto[gal]" class="hoverbutton global-radius"><i
                            class="flaticon-unlink"></i></a>
                          <img src="home visit.PNG" alt="" class="img-responsive" width="100%" height="200px" />
                        </div>
                        <h5 style={{ textAlign: 'center' }}>Doctor Home Visit</h5>
                      </div>
                    </center>
                  </Grid>
                  <Grid item xs={12} sm={3} >
                    <center>
                      <div class="service-widget">
                        <div class="post-media wow fadeIn">
                          <a data-rel="prettyPhoto[gal]" class="hoverbutton global-radius"><i
                            class="flaticon-unlink"></i></a>
                          <img src="patienthistory1.PNG" alt="" class="img-responsive" width="100%" height="200px"
                          />
                        </div>
                        <h5 style={{ textAlign: 'center' }}>Online Patient History Lifetime</h5>
                      </div>
                    </center>
                  </Grid>

                </Grid>

              </section>

            </Grid>
          </Grid>






          {/* Footer */}
          <Grid container  >
            <Grid item xs={12} sm={12}>
              <footer class="ftco-footer ftco-bg-dark ftco-section" style={{ marginTop: 20, background: '#191919', fontSize: 16 }} >

                <Grid container >
                  <Grid item xs={12} sm={4}>

                    <div class="ftco-footer-widget" style={{ marginLeft: '20px' }}>
                      <img src="h97 logo horizontal-01.png" alt="Health97" height="60px"
                        style={{ textTransform: 'uppercase', letterSpacing: '.1em' }}></img>
                      <p style={{
                        color: 'white', fontSize: '17px', overflow: "auto",
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'break-word',
                      }}>Health 97 app revolutionizes the way doctors acquire Patients consult and scientific treatment and reveal their scientific situations.
                      </p>
                      {/* <p style={{ color: 'white', fontSize: '17px' }}> &<p style={{ color: 'white', fontSize: '17px' }}> </p></p> */}
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={4}>

                    <div class="ftco-footer-widget">
                      <h2 class="ftco-heading-2" style={{
                        textDecoration: 'underline', marginLeft: '24px', fontWeight: 'normal', color: '#fff',
                        marginTop: 20,
                        fontSize: '18px',
                        fontWeight: 400
                      }}>Office</h2>

                      <ul style={{ color: 'white' }}>
                        <li><span class="text" style={{
                          fontSize: '18px', color: 'white', overflow: "auto",
                          whiteSpace: 'pre-wrap',
                          overflowWrap: 'break-word',
                        }}>Office 812, City
                          Avenue, Hinjewadi, Pune,
                          Maharashtra</span></li>
                        <li style={{ color: 'white', marginTop: '20px' }}><span
                          class="text" >+912046009797, +91 84 1100 9797</span></li>
                        <li style={{ color: 'white', marginTop: '20px' }}><span  >
                          info@Health97.com</span></li>
                      </ul>

                    </div>

                  </Grid>
                  <Grid item xs={12} sm={4} >

                    <h2 id='contactdiv' style={{ textDecoration: 'underline', fontSize: '15px', marginLeft: '34px', color: '#f1f4f8', marginTop: 20 }}>Follow us</h2>

                    <Grid container>

                      <ul class="ftco-footer-social list-unstyled float-md-left float-lft " style={{ marginTop: '20px' }}  >
                        <Grid item xs={12}>
                          <TwitterIcon onClick={event => window.location.href = 'https://twitter.com/97Health'} style={{ fontSize: 40, color: 'white', marginLeft: 30, cursor: 'pointer' }} />
                          <FacebookIcon onClick={event => window.location.href = "https://www.facebook.com/health97/"} style={{ fontSize: 40, color: 'white', cursor: 'pointer' }} />
                          <InstagramIcon onClick={event => window.location.href = "https://www.instagram.com/health_97_/"} style={{ fontSize: 40, color: 'white', cursor: 'pointer' }} />
                          <LinkedInIcon onClick={event => window.location.href = "https://www.linkedin.com/company/health97/"} style={{ fontSize: 40, color: 'white', cursor: 'pointer' }} />
                        </Grid>
                        <Grid item xs={12}>
                          <a href="https://play.google.com/store/apps/details?id=com.usersmygynic">

                            <div style={{ marginLeft: '30px' }}>
                              <img src="googleplay.png" alt="" class="img-responsive" height="50px"
                              />
                            </div>
                          </a>
                        </Grid>
                      </ul>

                    </Grid>

                  </Grid>

                </Grid>

                <Grid item xs={12}>
                  <center>
                    <div style={{
                      overflow: "auto",
                      whiteSpace: 'pre-wrap',
                      overflowWrap: 'break-word',
                    }}>
                      <p style={{ color: '#fff' }}>
                        Copyright &copy;
                        All rights reserved | by Health 97

                        Designed by <a href="https://rajyugsolutions.com/" target="blank" style={{ color: '#fff', textDecoration: 'none', }}>RajYug IT Solutions</a>
                      </p>

                    </div>
                  </center>
                </Grid>


              </footer>

            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;



