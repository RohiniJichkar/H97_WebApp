import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Typography, IconButton, Button, Grid, Paper } from "@material-ui/core";
import DoctorNavbar from './Doctor_Navbar';
import VideoPlayer from "react-background-video-player";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Get_Subscription } from '../Apis/Settings/index';


const drawerWidth = 240;

export default function DoctorTrainingVideo() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [subscriptionData, setsubscriptionData] = useState({});


    const fetchSubscriptionData = async () => {
        try {
            const subcriptionInfo = await Get_Subscription();
            setsubscriptionData(subcriptionInfo);
        } catch (e) {
            console.log(e);
        }
    }

    const handleRenewPlans = () => {
        navigate('/DoctorRenewSubscription');
    }


    useEffect(() => {
        fetchSubscriptionData();
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
                        Training
                    </Typography>
                </Grid>
                <Grid xs={12} style={{ marginTop: 5 }}>
                    <Paper elevation={6} className={classes.paper} style={{ marginLeft: 10, marginRight: 25, marginBottom: 10, borderRadius: 20 }}>
                        <div>
                            <video width="100%" height="500" controls>
                                <source src="clinic (1).mp4" type="video/mp4" />

                            </video>
                            {/* <VideoPlayer
                                    className="video"
                                    src={
                                        'clinic (1).mp4'
                                    }
                                    autoPlay={true}
                                    style={{ height: '100%', width: '100%', marginTop: 120, marginLeft: 50, marginRight: 100 }}

                                    muted={true}
                                /> */}
                        </div>
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
        padding: theme.spacing(3),
        color: '#78B088',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,
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
        width: 150,
        fontSize: 12,
        marginTop: 10,
        marginBottom: -10
    },
}));