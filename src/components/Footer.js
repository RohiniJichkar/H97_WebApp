import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


function Copyright() {
  return (
    <Typography variant="" color="textSecondary" position='absolute' style={{ color: "#2C7FB2", fontSize: "normal", flex: 1, textAlign: 'center' }}>
      {/* {'Copyright © '} */}
      <Link color="inherit" href="https://rajyugsolutions.com/">
        Powered By RajYug IT Solution Pvt Ltd @
      </Link>
      {new Date().getFullYear()}
      {/* {'.'} */}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({

  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: '#fff',
    color: '#2C7FB2',
    fontFamily: '"Poppins", san-serif;',
    fontStyle: 'normal',
    fontWeight: 400,
  },
  root: {
    flexGrow: 1,
    backgroundColor:'white',
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar} variant="outlined" fontSize="h6" >

        {/* <Toolbar variant="dense"> */}
        <Copyright />
        {/* </Toolbar> */}
      </AppBar>
    </div>
  );
}