import React, { useEffect, useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { Slots } from '../../../Apis/Todays_Appointments/index';
import { Grid, Paper } from "@material-ui/core";

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: 'white',
        flexGrow: 1,
    },
    //   menuButton: {
    //     marginRight: theme.spacing(2),
    //   },
    title: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
        color: '#2C7FB2'
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: '#2C7FB2',
        color: '#fff'
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
        backgroundColor: '#2C7FB2',
        color: '#fff'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    clinicname: {
        // flexGrow: 1,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(0),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(0),
        },
        flex: 1,
        textAlign: 'center',
        color: '#00318B',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 800,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    drname: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        padding: theme.spacing(1),
        flex: 0.2,
        alignSelf: 'right',
        textAlign: 'right',
        color: '#00318B',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'

    },
    paper: {
        padding: theme.spacing(1),
        // textAlign: 'center',
        color: '#78B088',
        // fontFamily: '"San Francisco", Helvetica, Arial, san-serif;',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 800,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        borderRadius: 10
    },

    services: {
        // paddingTop: 100,
        // textAlign: 'center',
        color: '#78B088',
        fontFamily: '"San Francisco", Helvetica, Arial, san-serif;',
    },
    report: {
        // flex: 1,
        // border:'1px solid red',
        justifyContent: 'center',
        // textAlign: 'center',
        color: '#78B088',
        fontFamily: '"San Francisco", Helvetica, Arial, san-serif;',
        fontWeight: 'bold'
    },
    grid: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    griditem: {
        textAlign: 'center',
        color: '#2C7FB2'
    },
    headings: {
        color: '#78B088',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 800,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 800,
        color: '#2C7FB2'
    },
    searchIcon: {
        padding: theme.spacing(0, 0, 0, 0),
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "gray",
        marginTop: '-35px',
        marginLeft: 75
    },
    inputRoot: {
        color: 'inherit',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 200,
    },
    inputInput: {
        padding: theme.spacing(0, 0, 0, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '30ch',
            height: '30px'
        },
        border: '1px solid lightgray',
        borderRadius: 20,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 200,
    },
    textField: {
        [`& fieldset`]: {
            borderRadius: 25,
        },
    }
}));


export default function Slot_Component({ data }) {
    const classes = useStyles();
    const theme = useTheme();
    const [slots, setslots] = useState([]);

    const timings = async () => {
        try {
            const times = await Slots();
            setslots(times);
        }
        catch (e) {
            console.log(e);
        }
    }
    console.log(slots)

    useEffect(() => {
        timings();
    }, []);

    return (
        <>
            {data.map((item) => {
                <Grid className={classes.grid} item sm style={{ paddingTop: 50, marginLeft: '-150px' }}>
                    <Paper className={classes.paper} elevation={4} >
                        <Grid className={classes.griditem} item xs >
                            {item.ActualTime}
                        </Grid>
                    </Paper>
                </Grid>
            })}
        </>
    );
};