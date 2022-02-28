import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import Radio from '@material-ui/core/Radio';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { forgot_password } from '../Apis/Profile/index';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const classes = useStyles();
  const [mobile, setmobile] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const forgotPassword = async () => {
    if (selectedValue) {
      const obj = {
        MobileNo: mobile,
        Role: selectedValue
      }
      const forgotpass = await forgot_password(obj);
      console.log(forgotpass);
      let parse = JSON.parse(forgotpass);
      if (parse.success === "200") {
        alert(parse.message);
        navigate('/');
      }
    } else {
      alert("Please Select Role")
    }
  }

  return (

    <Grid container component="main" className={classes.root} style={{ backgroundColor: '#fff' }}>
      <CssBaseline />
      <Grid item xs={12} sm={6} className={classes.image} />

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
      </Grid>
      <Grid item xs={12} sm={5} component={Paper} elevation={0} square style={{ backgroundColor: '#fff' }}>
        <div className={classes.paper}>
          <div>
            <img src="h97 logo potrait-01.png" height='150'></img>
          </div>
          <Typography component="h1" variant="h5">
            Forgot Password?
          </Typography>
          <Typography align="center">
            <p> Enter Your Registered Mobile Number.</p>
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              onChange={(e) => setmobile(e.target.value)}
              fullWidth
              id="mobile"
              type='number'
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
              }}
              label="Mobile Number"
              name="number"
              autoComplete="number"
              size='small'
            />

            <div>
              <Radio
                checked={selectedValue === 'Doctor'}
                color='primary'
                onChange={handleChange}
                value="Doctor"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'Doctor' }}
              />Doctor
              <Radio
                checked={selectedValue === 'Receptionist'}
                onChange={handleChange}
                value="Receptionist"
                color='primary'
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'Receptionist' }}
              />Receptionist
              <Radio
                checked={selectedValue === 'Admin'}
                color='primary'
                onChange={handleChange}
                value="Admin"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'Admin' }}
              />Admin
            </div>

            <Grid container style={{ paddingTop: '10px' }}>
              <Button
                onClick={() => forgotPassword()}
                fullWidth
                variant="contained"
                className={classes.submit}
                style={{ color: '#fff', backgroundColor: '#78B088', borderRadius: 20 }}
              >
                Submit
              </Button>

            </Grid>
            <Typography component="h1">
              <Box mt={2}>
                {/* <Copyright /> */}
                To request an account just <a href="https://rajyugsolutions.com/contact" style={{ color: '#78B088' }}> email us </a>

              </Box>
            </Typography>
            <center>
              <Typography component="h1">
                <Box mt={2}>             
                  <a href="/" style={{ color: '#78B088' }}> Go Back </a>  
                </Box>
              </Typography>
            </center>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: "url('Login2.png')",
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(6, 10, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    // [`& fieldset`]: {
    //     borderRadius: 25,
    // },
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));