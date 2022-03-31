import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import VideoPlayer from "react-background-video-player";
import TextField from '@material-ui/core/TextField';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
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
import FormGroup from '@material-ui/core/FormGroup';;


const loginapi = 'http://13.233.217.107:8080/api/Login';
const adminlogin = 'http://13.233.217.107:8080/api/AdminLogin';

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  icon: {
    lineHeight: 2,
    position: 'relative',
    width: '100px',

    height: '100px',
    background: '#f8fbff',
    marginLeft: '90px',
    fontSize: '48px',
    color: '#2C7FB2',
    borderRadius: '50%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: 'linear-gradient(90deg, rgba(15,106,162,1) 1%, rgba(44,127,178,1) 38%, rgba(120,176,136,1) 76%)'
  },
}));


function Login(props) {

  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState('');
  const [state, setState] = useState(false);

  const [mobile, setmobile] = useState('');
  const [password, setpassword] = useState('');
  const [showPassword, setshowPassword] = useState(false);

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

  function setWithExpiry(key, value, ttl, mobile, password, state, role) {

    const now = new Date()
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
      mobile: mobile,
      password: password,
      checkbox: state,
      Role: role
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
            navigate('/AdminAddClinic');
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

      <div>
        <VideoPlayer
          className="video"
          src={
            'clinic (1).mp4'
          }
          autoPlay={true}
          style={{ height: '549px' }}

          muted={true}
        />
        <nav class="navbar fixed-top navbar-expand-md navbar-light white double-nav scrolling-navbar" style={{ background: 'white', position: 'fixed', width: '100%' }}>
          <div class="container">

            <img src="h97 logo horizontal-01.png" alt="Health97" height="60px" width="230px"
              style={{ marginLeft: '-60px' }}></img>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav"
              aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="oi oi-menu"></span> Menu
            </button>

            <div class="collapse navbar-collapse" id="ftco-nav">
              <ul class="navbar-nav ml-auto" >
                <li class="nav-item"><a href="/" class="nav-link"
                  style={{ fontWeight: 600, fontSize: '110%', marginLeft: 700, fontFamily: 'Poppins' }}>Home</a></li>
                {/* <li class="nav-item"><a href="about.html" class="nav-link"
                  style={{ fontWeight: 600, fontSize: '110%', paddingLeft: 20 }}>About</a></li> */}
                <li class="nav-item"><a href="#doctordiv" class="nav-link"
                  style={{ fontWeight: 600, fontSize: '110%', paddingLeft: 20, fontFamily: 'Poppins'  }}>Doctor</a></li>
                <li class="nav-item"><a href="#patientdiv" class="nav-link"
                  style={{ fontWeight: 600, fontSize: '110%', paddingLeft: 20, fontFamily: 'Poppins'  }}>Patients</a></li>
                <li class="nav-item"><a href="#contactdiv" class="nav-link"
                  style={{ fontWeight: 600, fontSize: '110%', paddingLeft: 20, fontFamily: 'Poppins'  }}>Contact</a></li>

              </ul>
            </div>
          </div>

        </nav>
      </div>


      <Grid container component="main" className={classes.root} >

        <Grid item xs={12} sm={5} component={Paper} elevation={0} square style={{ position: 'relative', backgroundColor: 'transparent', marginLeft: -80, height: 360, marginTop: 90 }} >
          <div className={classes.paper} >

            <form className={classes.form} noValidate style={{ position: 'relative', color: 'black' }}>
              <TextField

                variant="outlined"
                margin="normal"
                fullWidth
                id="mobile"
                required
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

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
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


              <div>
                <Radio
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
              </div>

              <Grid container style={{ paddingTop: '15px' }}>
                <Grid item sm={6} align="left" style={{ marginTop: '-10px' }}>
                  <FormGroup  >
                    <FormControlLabel
                      control={<GreenCheckbox checked={state.checked} onChange={handleChangeCheckBox} />}
                      label="Remember Me"
                      style={{ fontSize: '10px' }}

                    />
                  </FormGroup>


                  {/* <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                /> */}
                </Grid>
                <Grid item sm={6} align="right"  >
                  <Link onClick={() => handleClickForgotPass()} variant="body2" style={{ color: 'black', cursor: 'pointer' }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Button 
                  fullWidth
                  className={classes.submit}
                  style={{ color: '#fff', backgroundColor: 'linear-gradient(90deg, rgba(15,106,162,1) 1%, rgba(44,127,178,1) 38%, rgba(120,176,136,1) 76%)', borderRadius: 20 }}
                  onClick={handleSubmit}
                >
                  Sign In
                </Button>

              </Grid>
              {/* <Typography component="h1">
              <Box mt={2}>
                {/* <Copyright /> */}
              {/* To request an account just <a href="https://rajyugsolutions.com/contact" style={{ color: '#78B088' }}> email us </a>
                <a onClick={() => handleClickSignUp()} style={{ color: 'brown', float: 'right', fontFamily: 'Poppins', fontSize: 14, textDecoration: 'underline', cursor: 'pointer' }}> Sign Up</a> */}
              {/* <Button
                style={{ color: '#fff', fontSize: 12, fontFamily: 'Poppins', backgroundColor: '#78B088', float: 'right' }}   
              >
                Sign Up
              </Button> */}
              {/* </Box>  */}

              {/* </Typography> */}

            </form>
          </div>


        </Grid>

      </Grid >

      <div  style={{ backgroundImage: 'linear-gradient(to right, #4ca2cd, #67b26f)', display: 'block', width: '100%', height: '10px', marginTop: '-87px' }} > </div>
      <p  id='doctordiv' style={{ marginTop: '8px', height: '20px', marginLeft: '505px', color: '#2C7FB2', fontSize: '36px', fontWeight: 'bold' }}>425+ DOCTORS REGISTERED</p>
      <div style={{ backgroundImage: 'linear-gradient(to right, #4ca2cd, #67b26f)', display: 'block', width: '100%', height: '10px', marginTop: '40px' }}> </div>

      <section  class="ftco-section ftco-services" style={{ backgroundImage: 'linear-gradient(to right, #67b26f, #4ca2cd)' }}>
        <div class="container" style={{ height: '60%' }}>
          <div class="row justify-content-center" >
            <div class="col-md-7 col-sm-12 text-center heading-section ftco-animate">
              <h3 class="mb-2" style={{ fontWeight: 'bold', color: 'aliceblue' }}>Doctor's
                Features</h3>
              <p style={{ color: 'white' }}>We have successfully registered more than 185 doctors.</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3 col-sm-3 d-flex align-self-stretch ftco-animate">
              <div class="media block-6 services d-block text-center">
                <div className={classes.icon}>
                  <span class="fal fa-users-medical"></span>
                </div>
                <div class="media-body p-2 mt-3">
                  <h5 class="heading" style={{ color: 'white', marginLeft: '35px' }}>Home Visitor Facility</h5>

                </div>
              </div>
            </div>
            <div class="col-md-3 col-sm-3 d-flex align-self-stretch ftco-animate">
              <div class="media block-6 services d-block text-center">
                <div className={classes.icon}>
                  <span class="fal fa-tasks-alt"></span>
                </div>
                <div class="media-body p-2 mt-3">
                  <h5 class="heading" style={{ color: 'white', marginLeft: '10px' }}>OPD Queue Management</h5>

                </div>
              </div>
            </div>
            <div class="col-md-3 col-sn-3 d-flex align-self-stretch ftco-animate">
              <div class="media block-6 services d-block text-center">
                <div className={classes.icon}>
                  <span class="fal fa-book-open"></span>
                </div>
                <div class="media-body p-2 mt-3">
                  <h5 class="heading" style={{ color: 'white', marginLeft: '35px' }}>Digital Prescriptions</h5>

                </div>
              </div>
            </div>
            <div class="col-md-3 col-sm-3 d-flex align-self-stretch ftco-animate">
              <div class="media block-6 services d-block text-center">
                <div className={classes.icon}>
                  <span class="fal fa-calendar-week"></span>
                </div>
                <div class="media-body p-2 mt-3">
                  <h5 class="heading" style={{ color: 'white', marginLeft: '34px' }}>Analytical Dashboard</h5>

                </div>
              </div>
            </div>
            <div class="col-md-3 col-sm-3 d-flex align-self-stretch ftco-animate">
              <div class="media block-6 services d-block text-center">
                <div className={classes.icon}>
                  <span class="fal fa-badge-check"></span>
                </div>
                <div class="media-body p-2 mt-3">
                  <h5 class="heading" style={{ color: 'white', marginLeft: '20px' }}>Online Patient History Lifetime</h5>

                </div>
              </div>
            </div>
            <div class="col-md-3 col-sm-3 d-flex align-self-stretch ftco-animate">
              <div class="media block-6 services d-block text-center">
                <div className={classes.icon}>
                  <span class="fal fa-comment-alt"></span>
                </div>
                <div class="media-body p-2 mt-3">
                  <h5 class="heading" style={{ color: 'white', marginLeft: '20px' }}>Message Broadcasting</h5>

                </div>
              </div>
            </div>
            <div class="col-md-3 col-sm-3 d-flex align-self-stretch ftco-animate">
              <div class="media block-6 services d-block text-center">
                <div className={classes.icon}>
                  <span class="fal fa-calendar-check"></span>
                </div>
                <div class="media-body p-2 mt-3">
                  <h5 class="heading" style={{ color: 'white', marginLeft: '10px' }}>Online Appointment Booking</h5>

                </div>
              </div>
            </div>
            <div class="col-md-3 col-sm-3 d-flex align-self-stretch ftco-animate">
              <div class="media block-6 services d-block text-center">
                <div className={classes.icon}>
                  <span class="fal fa-file-chart-pie"></span>
                </div>
                <div class="media-body p-2 mt-3">
                  <h5 class="heading" style={{ color: 'white', marginLeft: '44px' }}>Financial Reporting</h5>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <div style={{ backgroundImage: 'linear-gradient(to right, #4ca2cd, #67b26f)', display: 'block', width: '100%', height: '10px' }} > </div>
      <p id= 'patientdiv' style={{ marginTop: '8px', height: '20px', marginLeft: '505px', color: '#2C7FB2', fontSize: '36px', fontWeight: 'bold' }}>24000+ PATIENTS REGISTERED</p>
      <div style={{ backgroundImage: 'linear-gradient(to right, #4ca2cd, #67b26f)', display: 'block', width: '100%', height: '10px', marginTop: '40px' }}> </div>




      {/* Patient Features */}

      <section class="ftco-section ftco-services" style={{ backgroundImage: 'linear-gradient(to right, #67b26f, #4ca2cd)' }}>
        <div class="container" style={{ height: '60%' }}>
          <div class="row justify-content-center" >
            <div class="col-md-7 col-sm-12 text-center heading-section ftco-animate">
              <h3 class="mb-2" style={{ fontWeight: 'bold', color: 'aliceblue' }}>Patient's
                Features</h3>
              <p style={{ color: 'white' }}>More than 20,000 patients trust on us and use Health97 app on daily basis.</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3 col-sm-3 d-flex align-self-stretch ftco-animate">
              <div class="media block-6 services d-block text-center">
                <div className={classes.icon}>
                  <span class="fal fa-analytics"></span>
                </div>
                <div class="media-body p-2 mt-3">
                  <h5 class="heading" style={{ color: 'white', marginLeft: '55px' }}>Activity Trackers</h5>

                </div>
              </div>
            </div>
            <div class="col-md-3 col-sm-3 d-flex align-self-stretch ftco-animate">
              <div class="media block-6 services d-block text-center">
                <div className={classes.icon}>
                  <span class="fal fa-calendar-check"></span>
                </div>
                <div class="media-body p-2 mt-3">
                  <h5 class="heading" style={{ color: 'white', marginLeft: '10px' }}>Online Appointment Booking</h5>

                </div>
              </div>
            </div>
            <div class="col-md-3 col-sn-3 d-flex align-self-stretch ftco-animate">
              <div class="media block-6 services d-block text-center">
                <div className={classes.icon}>
                  <span class="fal fa-file-prescription"></span>
                </div>
                <div class="media-body p-2 mt-3">
                  <h5 class="heading" style={{ color: 'white', marginLeft: '45px' }}>Digital Prescriptions</h5>

                </div>
              </div>
            </div>
            <div class="col-md-3 col-sm-3 d-flex align-self-stretch ftco-animate">
              <div class="media block-6 services d-block text-center">
                <div className={classes.icon}>
                  <span class="fal fa-hospital"></span>
                </div>
                <div class="media-body p-2 mt-3">
                  <h5 class="heading" style={{ color: 'white', marginLeft: '34px' }}>Nearby Hospitals Search</h5>

                </div>
              </div>
            </div>
            <div class="col-md-3 col-sm-3 d-flex align-self-stretch ftco-animate">
              <div class="media block-6 services d-block text-center">
                <div className={classes.icon}>
                  <span class="fal fa-home"></span>
                </div>
                <div class="media-body p-2 mt-3">
                  <h5 class="heading" style={{ color: 'white', marginLeft: '30px' }}>Home Remedies Info</h5>

                </div>
              </div>
            </div>
            <div class="col-md-3 col-sm-3 d-flex align-self-stretch ftco-animate">
              <div class="media block-6 services d-block text-center">
                <div className={classes.icon}>
                  <span class="fal fa-plus-square"></span>
                </div>
                <div class="media-body p-2 mt-3">
                  <h5 class="heading" style={{ color: 'white', marginLeft: '40px' }}>Latest Health News</h5>

                </div>
              </div>
            </div>
            <div class="col-md-3 col-sm-3 d-flex align-self-stretch ftco-animate">
              <div class="media block-6 services d-block text-center">
                <div className={classes.icon}>
                  <span class="fal fa-users-medical"></span>
                </div>
                <div class="media-body p-2 mt-3">
                  <h5 class="heading" style={{ color: 'white', marginLeft: '70px' }}>Pregancy Tips</h5>

                </div>
              </div>
            </div>
            <div class="col-md-3 col-sm-3 d-flex align-self-stretch ftco-animate">
              <div class="media block-6 services d-block text-center">
                <div className={classes.icon}>
                  <span class="fal fa-tooth"></span>
                </div>
                <div class="media-body p-2 mt-3">
                  <h5 class="heading" style={{ color: 'white', marginLeft: '54px' }}>Dental Care Tips</h5>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="ftco-section ftco-services" >
        <div class="container">
          <p style={{ textAlign: 'center', color: '#4ccbeb', fontSize: '35px', fontFamily: 'sans-serif' }}>Highly Used Services
          </p>
          <p style={{ color: '#496cbd', fontWeight: 'bold', textAlign: 'center' }}>We offer more than many services out of
            those below are some most popular services.</p>
          <div class="row">
            <div class="col-md-3 col-sm-6 col-xs-12">
              <div class="service-widget">
                <div class="post-media wow fadeIn">
                  <a data-rel="prettyPhoto[gal]" class="hoverbutton global-radius"><i
                    class="flaticon-unlink"></i></a>
                  <img src="ambulance.png" alt="" class="img-responsive" width="109%" height="200px"
                    style={{ position: 'relative', bottom: '134%' }} />
                </div>
                <h5 style={{ marginLeft: '70px' }}>24/7 Ambulance Booking Service</h5>
              </div>

            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
              <div class="service-widget">
                <div class="post-media wow fadeIn">
                  <a data-rel="prettyPhoto[gal]" class="hoverbutton global-radius"><i
                    class="flaticon-unlink"></i></a>
                  <img src="Appointment.png" alt="" class="img-responsive" width="120%" height="200px" />
                </div>
                <h5 style={{ marginLeft: '40px' }}>Online Appointment Booking</h5>
              </div>

            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
              <div class="service-widget">
                <div class="post-media wow fadeIn">
                  <a data-rel="prettyPhoto[gal]" class="hoverbutton global-radius"><i
                    class="flaticon-unlink"></i></a>
                  <img src="home visit.png" alt="" class="img-responsive" width="115%" height="200px" />
                </div>
                <h5 style={{ marginLeft: '70px' }}>Doctor Home Visit</h5>
              </div>

            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
              <div class="service-widget">
                <div class="post-media wow fadeIn">
                  <a data-rel="prettyPhoto[gal]" class="hoverbutton global-radius"><i
                    class="flaticon-unlink"></i></a>
                  <img src="patienthistory1.png" alt="" class="img-responsive" width="115%" height="200px"
                    style={{ position: 'relative', left: '4%' }} />
                </div>
                <h5 style={{ marginLeft: '90px' }}>Online Patient History Lifetime</h5>
              </div>

            </div>
          </div>

        </div>
      </section>



      {/* Footer */}

      <footer id='contactdiv' class="ftco-footer ftco-bg-dark ftco-section" style={{ marginTop: '40px', background: '#191919', height: '50%', padding: '6em 0', fontSize: 16 }} >
        <div class="container" style={{ height: '250px', color: 'white', marginTop: '-75px' }}>
          <div class="row">
            <div class="col-md-3">
              <div class="ftco-footer-widget">
                <img src="h97 logo horizontal-01.png" alt="Health97" height="60px" width="230px"
                  style={{ marginTop: '-15px', textTransform: 'uppercase', letterSpacing: '.1em' }}></img>
                <p style={{ color: 'white', fontSize: '17px' }}>Health 97 app revolutionizes the way doctors & Patients consult and
                  acquire
                  scientific treatment and reveal their scientific situations.</p>
              </div>

            </div>
            <div class="col-md-4" style={{ marginLeft: '95px' }}>
              <div class="ftco-footer-widget">
                <h2 class="ftco-heading-2" style={{
                  textDecoration: 'underline', marginLeft: '94px', fontWeight: 'normal', color: '#fff',
                  marginBottom: ' 40px',
                  fontSize: '18px',
                  fontWeight: 400
                }}>Office</h2>
                <div class="block-23">
                  <ul style={{ marginTop: '-20px', paddingBottom: '40px' }}>
                    <li><span class="text" style={{ fontSize: '18px' }}>Office 812, City
                      Avenue, Hinjewadi, Pune, Maharashtra</span></li>
                    <li style={{ color: 'white', marginTop: '20px' }}><span
                      class="text" >+912046009797</span></li>
                    <li style={{ color: 'white', marginTop: '20px' }}><span  >
                      info@Health97.com</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-4" style={{ marginLeft: '0px' }}>
              <h2 style={{ textDecoration: 'underline', fontSize: '15px', marginLeft: '44', color: '#f1f4f8' }}>Follow us</h2>
              <ul class="ftco-footer-social list-unstyled float-md-left float-lft "  >
                <TwitterIcon onClick={event =>  window.location.href='https://twitter.com/97Health'} style={{fontSize: 40, cursor: 'pointer'}} />
                <FacebookIcon onClick={event =>  window.location.href="https://www.facebook.com/health97/"} style={{fontSize: 40, marginLeft: 20, cursor: 'pointer'}} />
                <InstagramIcon onClick={event =>  window.location.href="https://www.instagram.com/health_97_/"} style={{fontSize: 40, marginLeft: 20, cursor: 'pointer'}} />
                <LinkedInIcon onClick={event =>  window.location.href="https://www.linkedin.com/company/health97/"} style={{fontSize: 40, marginLeft: 20, cursor: 'pointer'}} />
              
              </ul>
              <a href="https://play.google.com/store/apps/details?id=com.usersmygynic">
                <img src="googleplay.png" alt="" class="img-responsive" width="50%" height="50px"
                /></a>
            </div>

            <div style={{ textAlign: 'center', width: '100%' }}>
              <p>
                Copyright &copy;
                <script>document.write(new Date().getFullYear())</script> All rights reserved | by Health 97
              </p>
              <div style={{ marginTop: '-20px' }}>
                Designed by <a href="https://rajyugsolutions.com/" target="blank" style={{color: '#fff', textDecoration: 'none'}}>RajYug IT Solutions</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

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