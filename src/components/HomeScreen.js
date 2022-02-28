import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Navbar from './Navbar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 2,
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function HomeScreen() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Navbar />
            <Grid container spacing={2}
                direction="row"
                alignItems="center"
                justify="center"
                style={{ minHeight: '50vh', border:'1px solid red' }}>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
            </Grid>
        </div>
    );
}
