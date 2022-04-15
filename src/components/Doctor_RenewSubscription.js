import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Typography, IconButton, Button, Grid, Paper, Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import DoctorNavbar from './Doctor_Navbar';
import { Get_Plans, Renew_Subscription } from '../Apis/Settings/index';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckIcon from '@material-ui/icons/Check';


const drawerWidth = 240;

export default function DoctorRenewSubscription() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [plansData, setplansData] = useState([]);

    const fetchPlanData = async () => {
        try {
            const plans = await Get_Plans();
            setplansData(plans);
        } catch (e) {
            console.log(e);
        }
    }


    const renewSubscription = async (title, cost) => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;

        const obj = {
            ClinicId: clinicid,
            Title: title,
            RenewAmount: cost
        }

        try {
            const renew = await Renew_Subscription(obj);
            alert('Renew mail send successfully');
        } catch (error) {
            console.log(error);
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
                <Grid xs={12} style={{ marginTop: -20 }}>
                    <Paper elevation={6} className={classes.paper} style={{ marginLeft: 10, marginRight: 25, marginBottom: 10, borderRadius: 20, marginTop: 20, paddingRight: 25 }}>
                        <Grid container style={{ marginTop: 10 }}>

                            {plansData.length != 0 ?

                                <Grid container style={{ marginTop: 10 }}>
                                    {plansData.map((item) => {
                                        return (
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
                                                        {item.Title}
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
                                                        Rs. {item.Cost} /-
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
                                                        ({item.Days} Days)
                                                    </Typography>
                                                    <List>
                                                        <ListItem >
                                                            <ListItemIcon style={{ color: '#2C7FB2' }}>
                                                                <CheckIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary={<Typography type="body2" style={{
                                                                fontFamily: 'Poppins',
                                                                fontStyle: 'normal',
                                                                fontWeight: 600,
                                                                fontSize: 15,
                                                            }}>{item.Doctors} Doctors</Typography>} />
                                                        </ListItem>
                                                        <ListItem>
                                                            <ListItemIcon style={{ color: '#2C7FB2' }}>
                                                                <CheckIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary={<Typography type="body2" style={{
                                                                fontFamily: 'Poppins',
                                                                fontStyle: 'normal',
                                                                fontWeight: 600,
                                                                fontSize: 15,
                                                            }}>{item.Staff} Staffs</Typography>} />
                                                        </ListItem>
                                                        <ListItem>
                                                            <ListItemIcon style={{ color: '#2C7FB2' }}>
                                                                <CheckIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary={<Typography type="body2" style={{
                                                                fontFamily: 'Poppins',
                                                                fontStyle: 'normal',
                                                                fontWeight: 600,
                                                                fontSize: 15,
                                                            }}>{item.Services} Services</Typography>} />
                                                        </ListItem>
                                                        <ListItem>
                                                            <ListItemIcon style={{ color: '#2C7FB2' }}>
                                                                <CheckIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary={<Typography type="body2" style={{
                                                                fontFamily: 'Poppins',
                                                                fontStyle: 'normal',
                                                                fontWeight: 600,
                                                                fontSize: 15,
                                                            }}>{item.Websites} Page Website</Typography>} />
                                                        </ListItem>
                                                    </List>
                                                    <Grid xs={12} style={{ borderTop: '1px solid lightgray' }}>
                                                        <center>
                                                            <Button className={classes.btnregister} onClick={() => renewSubscription(item.Title, item.Cost)}>Renew Subscription</Button>
                                                        </center>
                                                    </Grid>

                                                </Paper>
                                            </Grid>
                                        );
                                    })}

                                </Grid>
                                : null
                            }

                        </Grid>
                        <Typography style={{ textAlign: 'center', fontSize: 13 }}>
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