
import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography, Button, IconButton, Grid, Paper } from "@material-ui/core";
import DoctorNavbar from './Staff_Navbar';
import Box from '@material-ui/core/Box';

//components
import DoctorTodaysAppointment from '../Doctor_TodaysAppointment';
// import Appointments_On_Calender from '../Calender/index';
import Appointments_On_Calender from './Calender/index';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const Todays_appointment_Tabs = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [catsKey, setCatsKey] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className={classes.root} style={{ backgroundColor: '#ffffff' }}>
                <DoctorNavbar />
                <div className={classes.root2}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: "#78B088",
                                    
                                }
                            }}
                            style={{
                                backgroundColor: 'white',
                                color:'#2C7FB2'
                            }}
                        >
                            {/* <Tab label="Todays Appointment" {...a11yProps(0)} style={{ fontWeight: 600,
                                fontFamily: 'Poppins'}} /> */}
                            <Tab label="Calender" {...a11yProps(0)} style={{ fontWeight: 600,
                                fontFamily: 'Poppins'}} />
                        </Tabs>
                    </AppBar>
                    {/* <TabPanel value={value} index={0}>
                        <DoctorTodaysAppointment />
                    </TabPanel> */}
                    <TabPanel value={value} index={0}>
                        <Appointments_On_Calender />
                    </TabPanel>
                </div>
            </div>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 0.5,
        backgroundColor: 'white',
    },
    root2: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: 'white',
        marginTop: 70
    },
}));


export default Todays_appointment_Tabs

