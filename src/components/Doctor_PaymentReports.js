import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography, Button, IconButton, Grid, Paper } from "@material-ui/core";
import DoctorNavbar from './Doctor_Navbar';
import Box from '@material-ui/core/Box';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

//components
import AppointmentReports from './Payment_Reports/Appointment_Reports/index';
import Home_Visitor_reports from './Payment_Reports/Home_visitor_Reports/index';
import Staff_Analysis_reports from './Payment_Reports/Staff_Reports/index';
import Finance_Analysis_reports from './Payment_Reports/Finance_Reports/index';

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

const PaymentReports = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [catsKey, setCatsKey] = React.useState(0);
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleGoBack = () => {
        navigate(-1);
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
                                    backgroundColor: "#78B088"
                                }
                            }}
                            style={{
                                backgroundColor: 'white',
                                color: '#2C7FB2',
                            }}
                        >

                            <Tab label="Appointment Report" {...a11yProps(0)} style={{ fontWeight: 600,
                                fontFamily: 'Poppins', marginLeft:'35px'}}/>
                            <Tab label="Home Visitor Report" {...a11yProps(1)} style={{ fontWeight: 600,
                                fontFamily: 'Poppins'}} />
                            <Tab label="Finance Report" {...a11yProps(2)} style={{ fontWeight: 600,
                                fontFamily: 'Poppins'}}  />
                            {/* <Tab label="Patient Visit Report" {...a11yProps(3)} /> */}
                            <Tab label="Staff Report" {...a11yProps(3)} style={{ fontWeight: 600,
                                fontFamily: 'Poppins'}} />
                                 <Button style={{   color: '#2C7FB2', borderRadius: 105, fontSize: '12px', marginLeft: '-741px',   }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        </Tabs>
                    </AppBar>

                    <TabPanel value={value} index={0}>
                        <AppointmentReports />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Home_Visitor_reports />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Finance_Analysis_reports />
                    </TabPanel>
                    {/* <TabPanel value={value} index={3}>
                        Item Four
                    </TabPanel> */}
                    <TabPanel value={value} index={3}>
                        <Staff_Analysis_reports />
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


export default PaymentReports
