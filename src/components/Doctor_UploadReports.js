import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, FormControl, TextField, Typography, Button, Avatar, Table, TableContainer, TableBody, TableCell, TableHead, InputBase, TableRow, TablePagination, Drawer, Divider, MenuItem, Menu, ListItem, ListItemIcon, ListItemText, List, IconButton, Grid, Paper, Link } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import DoctorNavbar from './Doctor_Navbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Upload_Reports } from '../Apis/Patient_Reports/index';

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

    btnview: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
    },
    headingAddMedicine: {
        paddingTop: 20,
        alignItems: 'center',
        color: '#2C7FB2 !important',
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
        paddingBottom: theme.spacing(2.5),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnAdd: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        marginTop: 10,
        fontSize: '12px'
    },
    btnCancle: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        marginTop: 10,
        fontSize: '12px'
    },
    groupreports: {
        height: 110,
        width: 100,
        borderRadius: 10,
    },
    btnUpload: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        marginTop: 50,
        fontSize: '12px'
    },
    textField: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 11,
        textAlign: 'center',
        width: '80%',
        height: 30,
    },
    btnDelete: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 100,
        marginTop: 10,
        fontSize: '12px'
    },

}));


function DoctorUploadReports() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const [reportdetails, setreportdetails] = useState(location.state.detail);
    const [base64, setbase64] = useState('');
    const [title, settitle] = useState('');
    const dispatch = useDispatch();

    var date = new Date();
    var today = date.toISOString().split('T')[0];

    let base64String = "";

    // const handleSubmit = async () => {
    //     navigate('/DoctorReports');
    // }
    const handleGoBack = () => {
        navigate("/DoctorHome");
    };

    const handlesGoBack = () => {
        navigate("/DoctorReports");
    };

    const convertToBase64 = () => {
        var file = document.querySelector('input[type=file]')['files'][0];
        console.log(file);
        var reader = new FileReader();
        reader.onload = function () {
            base64String = reader.result.replace("data:", "")
                .replace(/^.+,/, "");

            setbase64('data:image/png;base64,' + base64String)
        }
        reader.readAsDataURL(file);
    }

    let imageData = useSelector(state => state.addPatient_Reports)

    const handleAddReports = async () => {
        var data = localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        let doctorid = parsed.userid;
        const obj = {
            'id': Math.floor(Math.random() * 100 + 20),
            'UserId': reportdetails,
            'ClinicId': clinicid,
            'DoctorId': doctorid,
            'base64image': base64,
            'Date': today,
            'ReportTitle': title
        }
        dispatch({ type: 'ADD_REPORTS', payload: obj });
    }

    const handleUploadReports = async () => {
        const requestReports = await Upload_Reports(imageData);
        let parse = JSON.parse(requestReports);
        if (parse.success === "200") {
            alert(parse.message);
            dispatch({ type: 'RESET_REPORTS_ITEM' });
            navigate('/DoctorReports')
        }

    }
    const handlesContinue = () => {
        if (base64 == '') {
            alert('Please select request from list');
            return;
        }
        if (title == '') {
            alert("Please select the title");
        }
        else { handleAddReports(); }
    };


    const openImageInNewTab = async (data) => {
        var image = new Image();
        image.src = data;

        var w = window.open("");
        w.document.write(image.outerHTML);
    }



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
                            fontWeight: 500,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',

                        }}>
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', borderRadius: 105, fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Upload Reports
                    </Typography>
                </Grid>

                <Grid item xs={12} container style={{ marginTop: 20 }}>
                    <Grid item xs={4}>
                        <Paper elevation={6} className={classes.paper} style={{ marginLeft: 20, marginRight: 20 }}>
                            <center>
                                <Typography className={classes.headingAddMedicine} variant="h6" noWrap={true} >
                                    Upload Reports
                                </Typography>
                            </center>

                            <div style={{ paddingTop: 20 }}>
                                <div>
                                    <FormControl variant="outlined" className={classes.formControl}  >
                                        <TextField className={classes.textField} onChange={(e) => settitle(e.target.value)} id="outlined-basic" label="Title" variant="outlined" size="small" />
                                    </FormControl>
                                </div>
                                <div>
                                    <FormControl variant="outlined" className={classes.formControl}  >
                                        <TextField className={classes.textField} onChange={convertToBase64} id="outlined-basic" type='file' variant="outlined" size="small" />
                                    </FormControl>

                                </div>
                                <div style={{ paddingTop: 100 }}>
                                    <Divider style={{ border: ' 1px solid #F0F0F0' }} />
                                    <Grid container spacing={2} style={{ paddingTop: 10, paddingBottom: 10 }}>
                                        <Grid item xs={12} sm={6}>
                                            <center> <Button className={classes.btnCancle} onClick={handlesGoBack} >Cancel</Button> </center>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <center>
                                                <Button onClick={handlesContinue} className={classes.btnAdd}>Add</Button>
                                            </center>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </Paper>
                    </Grid>


                    <Grid item xs={8} spacing={2} >
                        <Paper elevation={6} style={{ padding: 20, marginLeft: 25, marginRight: 20, height: 370, overflowY: 'scroll' }}>
                            <Grid item xs={12}>
                                {imageData.length != 0 ?
                                    <Grid container xs={12} spacing={2} style={{}}>
                                        {imageData.map((item) => {
                                            return (
                                                <Grid item sm={2} >
                                                    <Paper elevation={3} className={classes.groupreports} style={{marginBottom: 45}}>
                                                        <center>
                                                            {item.base64image ? <img src={item.base64image} onClick={() => openImageInNewTab(item.base64image)} style={{ height: '120px', width: '100%', borderRadius: 10, cursor: 'pointer' }} onError={({ currentTarget }) => {
                                                                currentTarget.onerror = null; // prevents looping
                                                                currentTarget.src = "default-pdf-image.jpg";
                                                            }} /> : <img src="default-image.png" style={{ height: '120px', width: '100%' }} />
                                                            }
                                                        </center>
                                                        <center><Button className={classes.btnDelete} onClick={() => dispatch({ type: 'DELETE_REPORTS', payload: item })}>Delete</Button></center>
                                                    </Paper>
                                                </Grid>
                                            )
                                        })}

                                    </Grid>
                                    :
                                    <Grid container spacing={2} style={{ paddingTop: 20, height: 355, overflowY: 'auto' }}>
                                        <Grid item sm={2} >
                                            <Paper elevation={3} className={classes.groupreports} >
                                                <center>
                                                    <img src="default-image.png" style={{ height: '120px', width: '100%' }} />
                                                </center>
                                                <center>
                                                    <Typography variant="h6" noWrap={true}
                                                        style={{
                                                            fontFamily: '"Poppins", san-serif;',
                                                            fontStyle: 'normal',
                                                            fontWeight: 600,
                                                            overflow: 'hidden',
                                                            whiteSpace: 'nowrap',
                                                            textOverflow: 'ellipsis',
                                                            color: '#2C7FB2',
                                                            fontSize: 14
                                                        }}>
                                                        Select Image
                                                    </Typography>
                                                </center>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                }
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <center>  <Button className={classes.btnUpload} onClick={handleUploadReports}>Upload</Button> </center>
                                </Grid>
                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>
            </Grid> {/* main grid */}

        </div >
    );
}


export default connect()(DoctorUploadReports)