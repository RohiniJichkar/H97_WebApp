import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Typography, IconButton, Button, Grid, Paper, Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import DoctorNavbar from './Doctor_Navbar';
import { Get_Plans } from '../Apis/Settings/index';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckIcon from '@material-ui/icons/Check';

const drawerWidth = 240;

export default function DoctorRenewSubscription() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [plansData, setplansData] = useState({});


    const fetchPlanData = async () => {
        try {
            const plans = await Get_Plans();
            setplansData(plans);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchPlanData();
    }, [])


    const handleGoBack = () => {
        navigate('/DoctorHome');
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
            >
                <Grid item xs={12} >
                    <Typography variant="h5" noWrap={true}
                        style={{
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',

                        }}>
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', borderRadius: 105, fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Subscription Plans
                    </Typography>
                </Grid>
                <Grid xs={12} style={{ marginTop: -15 }}>
                    <Paper elevation={6} className={classes.paper} style={{ marginLeft: 10, marginRight: 25, marginBottom: 10, borderRadius: 20, marginTop: 20 }}>
                        <Grid container style={{ marginTop: 10 }}>
                            <Grid spacing={2} item xs={4}>
                                <Paper elevation={4} className={classes.paper} style={{ marginLeft: 30, borderRadius: 20, marginTop: 20, marginBottom: 10 }}>
                                    <Typography style={{
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        textAlign: 'center',
                                        color: '#fff',
                                        backgroundColor: '#2C7FB2',
                                        fontSize: 18,
                                        textDecorationLine: 'underline',
                                        textUnderlineOffset: '1px',
                                        textDecorationThickness: '1px',
                                        paddingTop: 10,
                                        paddingBottom: 10
                                    }}>
                                        Basic
                                    </Typography>

                                    <Typography style={{
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        fontSize: 35,
                                        textAlign: 'center',
                                        color: '#fff',
                                        backgroundColor: '#2C7FB2',

                                    }}>
                                        Rs. 999 /-
                                    </Typography>
                                    <Typography style={{
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        fontSize: 14,
                                        textAlign: 'center',
                                        color: '#fff',
                                        backgroundColor: '#2C7FB2',
                                        paddingBottom: 10
                                    }}>
                                        (1 Month)
                                    </Typography>
                                    <List>
                                        <ListItem >
                                            <ListItemIcon style={{ color: '#2C7FB2' }}>
                                                <CheckIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="2 Doctors" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon style={{ color: '#2C7FB2' }}>
                                                <CheckIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="3 Staff" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon style={{ color: '#2C7FB2' }}>
                                                <CheckIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="5 Services" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon style={{ color: '#2C7FB2' }}>
                                                <CheckIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="-" />
                                        </ListItem>
                                    </List>
                                    <Grid xs={12} style={{ borderTop: '1px solid lightgray' }}>
                                        <center>
                                            <Button className={classes.btnregister}>Renew Subscription</Button>

                                        </center>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid spacing={2} item xs={4}>
                                <Paper elevation={4} className={classes.paper} style={{ marginLeft: 15, marginRight: 15, borderRadius: 20, marginTop: 20, marginBottom: 10 }}>
                                    <Typography style={{
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        textAlign: 'center',
                                        color: '#fff',
                                        backgroundColor: '#2C7FB2',
                                        fontSize: 18,
                                        textDecorationLine: 'underline',
                                        textUnderlineOffset: '1px',
                                        textDecorationThickness: '1px',
                                        paddingTop: 10,
                                        paddingBottom: 10
                                    }}>
                                        Standard
                                    </Typography>

                                    <Typography style={{
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        fontSize: 35,
                                        textAlign: 'center',
                                        color: '#fff',
                                        backgroundColor: '#2C7FB2',

                                    }}>
                                        Rs. 1499 /-
                                    </Typography>
                                    <Typography style={{
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        fontSize: 14,
                                        textAlign: 'center',
                                        color: '#fff',
                                        backgroundColor: '#2C7FB2',
                                        paddingBottom: 10
                                    }}>
                                        (6 Month)
                                    </Typography>
                                    <List>
                                        <ListItem >
                                            <ListItemIcon style={{ color: '#2C7FB2' }}>
                                                <CheckIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="5 Doctors" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon style={{ color: '#2C7FB2' }}>
                                                <CheckIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="5 Staff" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon style={{ color: '#2C7FB2' }}>
                                                <CheckIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="10 Services" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon style={{ color: '#2C7FB2' }}>
                                                <CheckIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="1 Pager Website" />
                                        </ListItem>
                                       
                                    </List>
                                    <Grid xs={12} style={{ borderTop: '1px solid lightgray' }}>
                                        <center>
                                            <Button className={classes.btnregister}>Renew Subscription</Button>
                                        </center>
                                    </Grid>
                                </Paper>
                            </Grid>

                            <Grid item xs={4}>
                                <Paper elevation={4} className={classes.paper} style={{ marginRight: 30, borderRadius: 20, marginTop: 20, marginBottom: 10 }}>
                                    <Typography style={{
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        textAlign: 'center',
                                        color: '#fff',
                                        backgroundColor: '#2C7FB2',
                                        fontSize: 18,
                                        textDecorationLine: 'underline',
                                        textUnderlineOffset: '1px',
                                        textDecorationThickness: '1px',
                                        paddingTop: 10,
                                        paddingBottom: 10
                                    }}>
                                        Premium
                                    </Typography>

                                    <Typography style={{
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        fontSize: 35,
                                        textAlign: 'center',
                                        color: '#fff',
                                        backgroundColor: '#2C7FB2',

                                    }}>
                                        Rs. 1999 /-
                                    </Typography>
                                    <Typography style={{
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        fontSize: 14,
                                        textAlign: 'center',
                                        color: '#fff',
                                        backgroundColor: '#2C7FB2',
                                        paddingBottom: 10
                                    }}>
                                        (1 Year)
                                    </Typography>
                                    <List>
                                        <ListItem >
                                            <ListItemIcon style={{ color: '#2C7FB2' }}>
                                                <CheckIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="10 Doctors" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon style={{ color: '#2C7FB2' }}>
                                                <CheckIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="10 Staff" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon style={{ color: '#2C7FB2' }}>
                                                <CheckIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="20 Services" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon style={{ color: '#2C7FB2' }}>
                                                <CheckIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="10 Pager Website" />
                                        </ListItem>
                                    </List>
                                    <Grid xs={12} style={{ borderTop: '1px solid lightgray' }}>
                                        <center>
                                            <Button className={classes.btnregister}>Renew Subscription</Button>

                                        </center>
                                    </Grid>
                                </Paper>
                            </Grid>

                        </Grid>
 <Typography style={{textAlign: 'center', fontSize: 13}}>
     Note: You will get Health97-OPD Mobile Application with Every Package
 </Typography>
                    </Paper>


                </Grid>

            </Grid> {/* main grid */}

        </div >
    );
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
        paddingBottom: theme.spacing(3),
        color: '#78B088',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 12,
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
    formControl: {
        paddingBottom: theme.spacing(2.5),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnregister: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 500,
        textAlign: 'center',
        borderRadius: 28,
        width: 170,
        fontSize: 12,
        marginTop: 10,
        marginBottom: -10
    },
}));