import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import VideoPlayer from "react-background-video-player";
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

const GreenRadio = withStyles({
  root: {
    color: '#2C7FB2',
    '&$checked': {
      color: '#2C7FB2',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

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
    margin: theme.spacing(0, 17, 6),
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

    <Grid container component="main" className={classes.root} style={{}}>
      <CssBaseline />
      <div>
        <VideoPlayer
          className="video"
          src={
            'clinic (1).mp4'
          }
          autoPlay={true}
          muted={true}
        />
        <div className="mainInput">
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Where to?"
          />
        </div>
      </div>
      {/* <Grid item xs={12} sm={6} className={classes.image} />

      <Grid item xs={12} md={1} style={{ alignSelf: 'center', flex: 1, backgroundColor: '#fff', borderRight: '1px solid white', padding: 10 }}>
        <Grid item xs={12} style={{ paddingBottom: 10 }}>
          <center><a href="https://www.facebook.com/health97"> <FacebookIcon style={{ color: 'gray', fontSize: '30px' }} /> </a> </center>
        </Grid>
        <Grid item xs={12} style={{ paddingBottom: 10 }}>
          <center><a href="https://www.instagram.com/health_97_/?utm_medium=copy_link"> <InstagramIcon style={{ color: 'gray', fontSize: '30px' }} /> </a></center>
        </Grid>
        <Grid item xs={12} style={{ paddingBottom: 10 }} >
          <center><a href="https://twitter.com/97Health"> <TwitterIcon style={{ color: 'gray', fontSize: '30px' }} /> </a></center>
        </Grid>
        <Grid item xs={12} style={{ paddingBottom: 10 }}>
          <center><a href="https://www.linkedin.com/company/health97/"> <LinkedInIcon style={{ color: 'gray', fontSize: '30px' }} /> </a> </center>
        </Grid>
      </Grid> */}
      <Grid item xs={12} sm={5} component={Paper} elevation={0} square style={{ position: 'relative', backgroundColor: 'transparent', marginLeft: -260, height: 360, marginTop: 90 }} >
        <div className={classes.paper}>
          <div>
            <img src="H97_Logo_Login.png" height='130' style={{ position: 'relative', marginTop: -100, }}></img>
          </div>
          {/* <Typography component="h1" variant="h5" style={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: 18, marginTop: '-10px' }}>
            Login Account
          </Typography>
          <Typography align="center">
            <p style={{ fontFamily: 'Poppins', fontSize: 12 }}> This is a secure system and you will need to provide your login details to access this site.</p>
          </Typography> */}

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
              <GreenRadio
                checked={selectedValue === 'Doctor'}
                color='primary'
                onChange={handleChange}
                value="Doctor"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'Doctor' }}
                classes={{root: classes.radio, checked: classes.checked}}
              />Doctor
              <GreenRadio
                checked={selectedValue === 'Receptionist'}
                onChange={handleChange}
                value="Receptionist"
                color='primary'
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'Receptionist' }}
              />Receptionist
              <GreenRadio
                checked={selectedValue === 'Admin'}
                color='primary'
                onChange={handleChange}
                value="Admin"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'Admin' }}
              />Admin
            </div>

            <Grid container style={{ paddingTop: '15px' }}>
              <Grid item sm={6} align="left" style={{ marginTop: '-10px', }}>
                <FormGroup  >
                  <FormControlLabel
                    control={<GreenCheckbox checked={state.checked} onChange={handleChangeCheckBox} />}
                    label={<Typography style={{ fontSize: 14, fontWeight: 400 }}>Remember Me</Typography>}

                  />
                </FormGroup>


                {/* <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                /> */}
              </Grid>
              <Grid item sm={6} align="right" >
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