import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Container, Switch, ButtonGroup, FormControl, TextField, Typography, Button, Divider, Card, CardContent, MenuItem, Menu, ListItem, ListItemIcon, ListItemText, List, Grid, } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, connect, useSelector } from 'react-redux';

const drawerWidth = 240;

function DoctorSelectedMedicineList({ data }) {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const selectedMedicine = useSelector(state => state);
    const dispatch = useDispatch();
    function handleRemove(id) {
        dispatch({ type: 'DELETE_MEDICINE', payload: id })
    }

    return (
        <Grid container style={{ height: 280, overflowY: 'scroll' }} >
            {data.map((item, index) => {
                return (
                    <>
                        <Card elevation={1} style={{ width: 730, marginTop: 10, color: '#2C7FB2', paddingBottom: 0 }}>
                            <CardContent style={{ marginTop: '-5px', paddingBottom: 0 }}>
                                <Grid container xs={12}>
                                    <Grid item xs={8}>
                                        <Typography variant="h6" noWrap={true} style={{
                                            fontSize: 16, fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            fontWeight: 600,
                                        }}>
                                            {item.MedicineName}
                                        </Typography>
                                        {/* <Typography variant="h6" noWrap={true} style={{
                                            fontSize: 12, fontFamily: '"Poppins", san-serif;',
                                            fontStyle: 'normal',
                                            fontWeight: 600,
                                            color: '#707070',
                                            marginLeft: 10
                                        }}>
                                            ( {item.BeforeMeal == true ? 'Before Meal' : 'After Meal'} )
                                        </Typography> */}
                                    </Grid>

                                    <Grid container item xs={4}>
                                        <Grid item xs={7}>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 12, fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                fontWeight: 600,
                                                color: '#707070',
                                                float: 'right'

                                            }}>
                                                ( {item.BeforeMeal == true ? 'Before Meal' : 'After Meal'} )
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={4} style={{ paddingLeft: 27 }}>
                                            <DeleteIcon onClick={() => handleRemove(item)} style={{ color: '#707070', cursor: 'pointer' }} />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid container xs={12} style={{ overflow: 'auto' }}>
                                    <Grid item sm={1} style={{
                                        fontSize: 12,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        color: '#707070'
                                    }}>
                                        Days:
                                    </Grid>
                                    <Grid item xs={12} sm={1}>
                                        <Typography variant="h6" noWrap={true} style={{
                                            fontSize: 12,
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            fontWeight: 600,
                                            color: '#707070'
                                        }} >
                                            {item.DoseDays}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={1} style={{
                                        fontSize: 12,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        color: '#707070'
                                    }}>
                                        Times:
                                    </Grid>
                                    <Grid item xs={12} sm={1}>
                                        <Typography variant="h6" noWrap={true} style={{
                                            fontSize: 12,
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            fontWeight: 600,
                                            color: '#707070'
                                        }} >
                                            {item.DoseTime}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={1} style={{
                                        fontSize: 12,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        color: '#707070'
                                    }}>
                                        Morning:
                                    </Grid>
                                    <Grid item xs={12} sm={1}>
                                        <Typography variant="h6" noWrap={true} style={{
                                            fontSize: 12,
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            fontWeight: 600,
                                            color: '#707070'
                                        }} >
                                            {item.MorningDose == true ? '1' : '0'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={1} style={{
                                        fontSize: 12,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        color: '#707070'
                                    }}>
                                        Afternoon:
                                    </Grid>
                                    <Grid item xs={12} sm={1}>
                                        <Typography variant="h6" noWrap={true} style={{
                                            fontSize: 12,
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            fontWeight: 600,
                                            color: '#707070',
                                            marginLeft: 10
                                        }}>
                                            {item.AfternoonDose == true ? '1' : '0'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={1} style={{
                                        fontSize: 12,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        color: '#707070'
                                    }}>
                                        Evening:
                                    </Grid>
                                    <Grid item xs={12} sm={1}>
                                        <Typography variant="h6" noWrap={true} style={{
                                            fontSize: 12,
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            fontWeight: 600,
                                            color: '#707070'
                                        }}>
                                            {item.EveningDose == true ? '1' : '0'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={1} style={{
                                        fontSize: 12,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        color: '#707070'
                                    }}>
                                        Night:
                                    </Grid>
                                    <Grid item xs={12} sm={1}>
                                        <Typography variant="h6" noWrap={true} style={{
                                            fontSize: 12,
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            fontWeight: 600,
                                            color: '#707070'
                                        }}>
                                            {item.NightDose == true ? '1' : '0'}
                                        </Typography>
                                    </Grid>

                                </Grid>

                            </CardContent>
                        </Card>
                    </>
                );
            })}

        </Grid>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        backgroundColor: 'white',
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
    griditem: {
        color: '#2C7FB2',
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

    },
    searchIcon: {
        paddingTop: 10,
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "gray",
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
        fontWeight: 400,
        fontSize: 11,
        color: 'gray'
    },
    btnview: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 25,
        paddingLeft: 35,
        paddingRight: 35,
        float: 'right'
    },
    headingAddMedicine: {
        color: '#00318B !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontSize: '16px'
    },
    inputFields: {
        [`& fieldset`]: {
            borderRadius: 25,
        },
        width: 300,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 200,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    btnAdd: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 600,
        textAlign: 'center',
        borderRadius: 28,
        width: 90,
        fontSize: '10px'
    },
    btnCancle: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 600,
        textAlign: 'center',
        borderRadius: 28,
        width: 90,
        fontSize: '10px'
    },
    btnPreview: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 150,
        fontSize: '12px'
    },
    btngenerate: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 150,
        fontSize: '12px'
    },
}));

export default connect()(DoctorSelectedMedicineList);