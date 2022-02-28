import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Container, Select, FormControl, Radio, InputLabel, TextField, Typography, Button, Avatar, Table, TableContainer, TableBody, TableCell, TableHead, InputBase, TableRow, TablePagination, Drawer, Divider, MenuItem, Menu, ListItem, ListItemIcon, ListItemText, List, IconButton, Grid, Paper, Link } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import DoctorNavbar from './Doctor_Navbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const drawerWidth = 240;

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
        padding: theme.spacing(2),
        color: '#78B088',
        fontFamily: '"Poppins", san-serif;',
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
            width: '25ch',
            height: '30px'
        },
        border: '1px solid lightgray',
        borderRadius: 20,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 200,
        fontSize: 11
    },
    headingNewRegistration: {
        alignItems: 'center',
        color: '#00318B !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
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
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.spacing(1.2),
        minWidth: 220,
    },
    btnregister: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        marginTop: 10,
        fontSize: '11px'
    },
    btnCancle: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
    },
    groupreports: {
        height: 120,
        width: 100,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#00318B',
        paddingTop: 50,
        borderRadius: 20,
        marginLeft: 20
    },
    btnUpload: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
        marginBottom: 10,
        marginTop: 10
    },
    textField: {
        // [`& fieldset`]: {
        //     borderRadius: 25,
        // },
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        width: '80%',
        height: 30,
    }


}));


export default function DoctorPatientRegistration() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = useState('');


    const [gender, setGender] = React.useState("");

    function handleChangedGender(event) {
        setGender(event.target.value);
    }

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleGoBack = () => {
        navigate("/DoctorHome");
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
                            fontFamily: '"Poppins", san-serif;',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',

                        }}>
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', borderRadius: 105, fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Patient Registration
                    </Typography>
                </Grid>
                <Grid item xs={12} container style={{ marginTop: 2 }}>

                    <Grid item xs={12} sm={4}  >
                        <Paper elevation={6} className={classes.paper} style={{ justifyContent: 'center', textAlign: 'center' }}>
                            <Typography className={classes.headingNewRegistration} variant="h6" noWrap={true} >
                                New Registration
                            </Typography>
                            <div style={{ paddingTop: 5 }}>
                                <FormControl variant="outlined" className={classes.formControl}  >
                                    <TextField className={classes.textField} id="outlined-basic" size="small" label="FirstName" variant="outlined" />
                                </FormControl>
                            </div>
                            <div>
                                <FormControl variant="outlined" className={classes.formControl}  >
                                    <TextField className={classes.textField} id="outlined-basic" label="Last Name" variant="outlined" size="small" />
                                </FormControl>

                            </div>
                            <div>
                                <FormControl variant="outlined" className={classes.formControl}  >
                                    <InputLabel style={{ marginLeft: 40, marginTop: '-15px' }}>Gender</InputLabel>
                                    <Select
                                        className={classes.textField}
                                        native
                                        value={gender}
                                        onChange={handleChangedGender}
                                        label="Gender"
                                        inputProps={{
                                            name: 'gender',
                                            id: 'outlined-gender-native-simple',
                                        }}

                                    >
                                        <option aria-label="None" value="" />
                                        <option value={1}>Male</option>
                                        <option value={2}>Female</option>

                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl variant="outlined" className={classes.formControl}  >
                                    <TextField className={classes.textField} id="outlined-basic" type='number' label="Mobile No" variant="outlined" size="small" />
                                </FormControl>
                            </div>
                            <div>
                                <FormControl variant="outlined" className={classes.formControl}  >
                                    <TextField className={classes.textField} id="outlined-basic" type='email' label="Email ID" variant="outlined" size="small" />
                                </FormControl>
                            </div>
                            <div>
                                <FormControl variant="outlined" className={classes.formControl}  >
                                    <TextField className={classes.textField} id="outlined-basic" type="date" label="DOB" variant="outlined" size="small" />
                                </FormControl>
                            </div>
                            <div>
                                <FormControl variant="outlined" className={classes.formControl}  >
                                    <TextField className={classes.textField} id="outlined-basic" type='password' label="Password" variant="outlined" size="small" />
                                </FormControl>

                            </div>
                            <Grid container xs={12}>
                                <Grid item sm={6} >
                                    <center><Button className={classes.btnregister} style={{ float: 'right', marginRight: 10 }}>Cancle</Button></center>
                                </Grid>
                                <Grid item sm={6} >
                                    <center><Button className={classes.btnregister} style={{ float: 'left', marginLeft: 10 }}>Register</Button></center>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>


                    <Grid item xs={12} sm={8} >
                        <Paper className={classes.paper} elevation={6} style={{ marginLeft: 25, marginRight: 20 }}>
                            <Typography variant="h6" noWrap={true} style={{
                                fontSize: 18, color: '#00318B', fontFamily: '"Poppins", san-serif;',
                                fontStyle: 'normal',
                                
                            }}>
                                Profile
                            </Typography>
                            <center>
                                <div style={{ paddingBottom: 10 }}>
                                    <img src="Pallavi Kale.jpg" style={{ borderRadius: 50, height: 100 }}></img>
                                </div>

                                <Typography variant="h6" noWrap={true} style={{
                                    fontSize: 16,
                                    fontFamily: '"Poppins", san-serif;',
                                    fontStyle: 'normal',
                                    color: '#707070',
                                    fontWeight: 600
                                }}>
                                    Pallavi Kale
                                </Typography>
                                <Typography variant="h6" noWrap={true} style={{
                                    fontSize: 14,
                                    fontFamily: '"Poppins", san-serif;',
                                    fontStyle: 'normal',
                                    color: '#707070',
                                    fontWeight: 400
                                }}>
                                    PID- 123445
                                </Typography>
                                <Grid container xs={12} style={{ paddingTop: 15 }}>
                                    <Grid item xs={3} style={{ border: '1px solid #F0F0F0', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600 }}>
                                            Mobile Number
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070' }}>
                                            9095009797
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600 }}>
                                            Email ID
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070' }}>
                                            pallavi.kale @rajyugsolution.com
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600 }}>
                                            Date Of Birth
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070' }}>
                                            13/04/1998
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600 }}>
                                            Age
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070' }}>
                                            30
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid container xs={12}>
                                    <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderTop: '0px', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600 }}>
                                            Gender
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070' }}>
                                            Female
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', borderTop: '0px', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600 }}>
                                            Address
                                        </Typography>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070' }}>
                                            8th floor, City Avenue, Mumbai-Banglore Highway, Wakad, Pune, 411007
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', borderTop: '0px', paddingBottom: 20 }}>
                                        <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600 }}>
                                            Medical History
                                        </Typography>
                                        <a href='/' style={{ fontSize: 12, color: '#2C7FB2' }}>Patient History</a>
                                    </Grid>
                                </Grid>



                                <Grid container xs={12} style={{ marginTop: 15 }}>
                                    <Grid item sm={6} >
                                        <Button className={classes.btnregister} style={{ float: 'right', marginRight: 20 }}>Delete</Button>

                                    </Grid>
                                    <Grid item sm={6} >
                                        <Button className={classes.btnregister} style={{ float: 'left', marginLeft: 20 }}>Edit</Button>

                                    </Grid>
                                </Grid>

                            </center>
                        </Paper>

                    </Grid>
                </Grid>

            </Grid> {/* main grid */}

        </div >
    );
}
