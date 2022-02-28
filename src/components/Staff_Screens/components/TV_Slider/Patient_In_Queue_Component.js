import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Avatar, Grid, Paper, } from "@material-ui/core";
import { get_patientinqueue } from '../../../../Apis/Staff/TV_Advertisements/index';

const drawerWidth = 240;

export default function Patient_In_Queue_TV_Component({data}) {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  
  console.log(data);

 
  // if (patientIn.length !== 0) {

  return (
    <>
      {data.map((item) => {
        return(<>
       
        <Grid item xs={2} style={{ paddingTop: 10, marginLeft: '-40px' }}>
          <div>
            <center>
              <Avatar style={{ borderRadius: 50, height: 55, width: 55 }} />
            </center>
          </div>
          <Paper className={classes.paper} elevation={4} style={{ marginRight: 25, marginLeft: 25, justifyContent: 'center', alignItems: 'center', marginTop: '-40px', borderRadius: 20, fontFamily: '"Poppins", san-serif;', fontStyle: 'normal', fontWeight: 400, }}>
            <Grid item xs={12} style={{
              color: '#2C7FB2', textAlign: 'center', paddingTop: 40, fontWeight: 600, fontSize: '13px', overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis', width: 120,
              marginTop: '-5px'
            }}>
             {item.FirstName} {item.LastName}
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center', color: '#2C7FB2' }}>
              {item.AppointmentTime}
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center', color: '#2C7FB2', paddingBottom: 10 }}>
              {item.AppointmentStatus}
            </Grid>
          </Paper>

        </Grid>
        </>);
      } 
      ) }
    </>
  ); //return close




  // }
  // else {
  //   return (
  //     <>
  //       <Grid item xs={2} style={{ paddingTop: 30, marginLeft: '-30px' }}>
  //         <Grid item xs={6} sm={12} style={{ flex: 1, justifyContent: 'center', textAlign: 'center' }}>
  //           <center>
  //             <Avatar style={{ borderRadius: 50, height: 60, width: 60 }} /> </center>
  //         </Grid>
  //         <Paper className={classes.paper} elevation={4} style={{ marginRight: 25, marginLeft: 25, flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '-40px', borderRadius: 20, fontFamily: '"Poppins", san-serif;', fontStyle: 'normal', fontWeight: 400, backgroundColor: '#fff' }}>
  //           <Grid item xs={12} style={{ textAlign: 'center', paddingTop: 40, paddingBottom: 40, fontSize: 14, fontFamily: 'Poppins', color: '#000' }}>
  //             No Patients
  //           </Grid>

  //         </Paper>
  //       </Grid>
  //     </>
  //   );
  // }
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
    marginLeft: 30,
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
}));