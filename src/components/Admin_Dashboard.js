import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Container, AppBar, Toolbar, CssBaseline, Typography, Button, Avatar, Drawer, Divider, MenuItem, Menu, ListItem, ListItemIcon, ListItemText, List, IconButton, Grid, Paper, Link } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import DoctorNavbar from './Doctor_Navbar';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    BarSeries,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation, Stack } from '@devexpress/dx-react-chart';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;


const data = [
    { argument: '2021', value: 30 },
    { argument: '2020', value: 20 },
    { argument: '2019', value: 20 },
    { argument: '2018', value: 50 },
    { argument: '2017', value: 50 },
    { argument: '2016', value: 40 },
    { argument: '2015', value: 45 },
];


const Subscription = [{
    year: '2021',
    registration: 36,
    expiry: 38,
  }, {
    year: '2020',
    registration: 26,
    expiry: 40,
  }, {
    year: '2019',
    registration: 35,
    expiry: 28,
  }, {
    year: '2018',
    registration: 45,
    expiry: 20,
  }, {
    year: '2017',
    registration: 36,
    expiry: 38,
  }];

const legendStyles = () => ({
    root: {
      display: 'flex',
      margin: 'auto',
      flexDirection: 'row',
      color:'#00318B'
    },
  });
const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
);

const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const legendLabelStyles = () => ({
    label: {
        whiteSpace: 'nowrap',
    },
});
const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);


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


export default function AdminDashboard() {

    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleRegisterClick = () => {
        navigate("/patientregistration");
    };

    const handleBookAppointmentClick = () => {
        navigate("/bookappointment");
    };

    const handleTodaysAppointmentClick = () => {
        navigate("/todaysappointment");
    };


    const handleSendIn = () => {
        navigate("/DoctorPatientDetails_SendIn");
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
                alignItems="center"
                justify="center"

            >
                {/* Reports Grid Start */}


                <Grid item className={classes.griditem} xs={12} sm={4} style={{ borderRight: '1px solid gray' }}>
                    <Paper className={classes.paper} elevation={0} >
                        <div className="row" style={{ padding: theme.spacing(0), color: '#78B088' }}>
                            <Typography variant="h7" noWrap={true}
                                style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#78B088',

                                }}
                            >
                                MONTHLY REGISTRATION
                            </Typography>
                        </div>
                        <div className="row" style={{ padding: theme.spacing(0), color: '#00318B' }}>
                            <Typography variant="h4" noWrap={true}>
                                20
                            </Typography>
                        </div>
                    </Paper>
                </Grid>

                <Grid item className={classes.griditem} xs={12} sm={4} style={{ borderRight: '1px solid gray' }}>
                    <Paper className={classes.paper} elevation={0} >
                        <div className="row" style={{ padding: theme.spacing(0), color: '#78B088' }}>
                            <Typography variant="h7" noWrap={true}
                                style={{
                                    fontFamily: '"Poppins", san-serif;',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#78B088',

                                }}>
                                YEARLY REGISTRATION
                            </Typography>
                        </div>
                        <div className="row" style={{ padding: theme.spacing(0), color: '#00318B' }}>
                            <Typography variant="h4" noWrap={true}>
                                40
                            </Typography>
                        </div>
                    </Paper>
                </Grid>

                <Grid item className={classes.griditem} xs={12} sm={4} >
                    <Paper className={classes.paper} elevation={0} >
                        <div className="row" style={{ padding: theme.spacing(0), color: '#78B088' }}>
                            <Typography variant="h7" noWrap={true}
                                style={{
                                    fontFamily: '"Poppins", san-serif;',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#78B088',
                                }}>
                                EXPIRED SUBSCRIPTION
                            </Typography>
                        </div>
                        <div className="row" style={{ padding: theme.spacing(0), color: '#00318B' }}>
                            <Typography variant="h4" noWrap={true}>
                                100
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
                {/* Reports grid end */}


                <Grid container spacing={4} style={{ marginTop: 20 }}>
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={6} className={classes.paper} style={{ marginBottom: 50, color:'#00318B' }}>
                            <Chart
                                data={data}
                                height={400}
                            >
                                <ArgumentAxis />
                                <ValueAxis />

                                <BarSeries name="Clinic Registration" valueField="value" argumentField="argument" color="#2C7FB2" />
                                <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
                                <Title text="Clinic Registrations"/>
                           
                                <Animation />
                            </Chart>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Paper elevation={6} className={classes.paper} style={{color:'#00318B'}}>
                            <Chart
                                data={Subscription}
                                height={400}
                            >
                                <ArgumentAxis />
                                <ValueAxis />

                                <BarSeries
                                    name="Clinic Registration"
                                    valueField="registration"
                                    argumentField="year"
                                    color="#2C7FB2"
                                />
                                <BarSeries
                                    name="Subscription Expired"
                                    valueField="expiry"
                                    argumentField="year"
                                    color="lightgray"
                                />
                                                           
                                <Animation />
                                <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
                                <Title text="Registration/Expired Subscription" />
                                <Stack />
                            </Chart>
                        </Paper>
                    </Grid>

                </Grid>
            </Grid> {/* main grid */}

        </div>
    );
}
