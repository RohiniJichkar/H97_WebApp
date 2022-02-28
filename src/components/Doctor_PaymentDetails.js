import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, FormControl, Dialog, Radio, Card, CardContent, Slide, Switch, FormControlLabel, Select, InputLabel, TextField, Typography, Button, Avatar, Table, TableContainer, TableBody, TableCell, TableHead, InputBase, TableRow, TablePagination, Drawer, Divider, MenuItem, Menu, ListItem, ListItemIcon, ListItemText, List, IconButton, Grid, Paper, Link } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import DoctorNavbar from './Doctor_Navbar';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, connect, useSelector } from 'react-redux';
import { paymentDetails, getPrescription } from '../Apis/PatientInQueue/Generate_Prescription/Medicines_Table/index';
const drawerWidth = 240;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DoctorPaymentDetails() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const [paymentmode, setpaymentmode] = useState('');
    const [fees, setfees] = useState('');
    const [details, setdetails] = useState(location.state.detail);
    const [pdf, setpdf] = useState('');

    const dispatch = useDispatch();
    const selectedMedicine = useSelector(state => state.reducer);

    const handlePaymentDetails = async () => {
        var sessiondata = await localStorage.getItem("userdata");
        let parsed = JSON.parse(sessiondata);
        let clinicid = parsed.ClinicId;
        let doctorid = parsed.userid;
        const obj = {
            ClinicId: clinicid,
            DoctorId: doctorid,
            PatientId: details.UserId,
            AppointmentId: details.id,
            PaymentAmount: fees,
            PaymentMode: paymentmode,
        }
        try {
            const request = await paymentDetails(obj);
            let response = JSON.parse(request);
            if (response.success === "200") {
                alert(response.message);
                dispatch({ type: 'RESET_MEDICINE_ITEM' });
                navigate('/DoctorDashboard');
            }
        } catch (error) {
            console.log(error);
        }
    }


    const handlePrintFinish = async () => {
        handlePaymentDetails().then(data => {
            window.open(pdf, "PRINT", "height=400,width=600");
        })
    }

    const handlePreviewPDF = async (id) => {
        try {
            const request = await getPrescription(details.id)
            let response = JSON.parse(request);

            if (response) {
                setpdf(response.PdfPrescription)
            }
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        handlePreviewPDF();
    }, []);

    const handleGoBack = () => {
        dispatch({ type: 'RESET_MEDICINE_ITEM' });
        navigate(-1);
    };

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const handleChangeAllDays = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
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
                            fontWeight: 500,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',

                        }}>
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', borderRadius: 105, fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Payment Details
                    </Typography>
                </Grid>

                <Grid item xs={12} container style={{ marginTop: 10 }}>
                    <Grid item xs={12} sm={4}>
                        <Paper elevation={6} className={classes.paper}>
                            <Grid container>
                                <Grid item xs={12} sm={4} style={{ border: '1px solid lightgray', borderLeft: '0px', borderTop: '0px' }}>
                                    <center>
                                        {details.ProfileImage ?
                                            <Avatar style={{ borderRadius: 200, height: 90, width: 90, marginTop: 20 }} src={details.ProfileImage} /> :
                                            <Avatar style={{ borderRadius: 200, height: 90, width: 90, marginTop: 20 }} />}
                                    </center>
                                </Grid>

                                <Grid container item xs={12} sm={8} style={{ border: '1px solid lightgray', borderLeft: '0px', borderTop: '0px', borderRight: 0 }}>
                                    <Grid item xs={12} style={{ borderBottom: '1px solid lightgray' }}>
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 18,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600
                                            }}>
                                                {details.FirstName} {details.LastName}
                                            </Typography>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 16,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                marginTop: 10,
                                                marginBottom: 10,
                                            }}>
                                                PID- {details.PatientId}
                                            </Typography>
                                        </center>
                                    </Grid>
                                    <Grid item xs={12} container >
                                        <Grid item xs={12} sm={6}>
                                            <center>
                                                <Typography variant="h6" noWrap={true} style={{
                                                    fontSize: 16,
                                                    fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    color: '#707070',
                                                    fontWeight: 600,
                                                    borderRight: '1px solid lightgray',
                                                    paddingTop: 10,
                                                    paddingBottom: 10,
                                                }}>
                                                    Mobile No
                                                </Typography>
                                            </center>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <center>
                                                <Typography variant="h6" noWrap={true} style={{
                                                    fontSize: 16,
                                                    fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    color: '#707070',
                                                    fontWeight: 600,
                                                    borderRight: '0px',
                                                    paddingTop: 10,
                                                    paddingBottom: 10,
                                                }}>
                                                    Date
                                                </Typography>
                                            </center>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <center>
                                                <Typography variant="h6" noWrap={true} style={{
                                                    fontSize: 14,
                                                    fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    color: '#707070',
                                                    borderRight: '1px solid lightgray',
                                                    paddingBottom: 10,
                                                }}>
                                                    {details.MobileNo}
                                                </Typography>
                                            </center>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <center>
                                                <Typography variant="h6" noWrap={true} style={{
                                                    fontSize: 14,
                                                    fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    color: '#707070',
                                                    borderRight: '0px',
                                                    paddingBottom: 10,
                                                }}>
                                                    {details.AppointmentDate}
                                                </Typography>
                                            </center>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <center>
                                        <Typography variant="h6" noWrap={true} style={{
                                            fontSize: 16,
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            color: '#707070',
                                            fontWeight: 600,
                                            paddingTop: 10,
                                            paddingBottom: 10,

                                        }}>
                                            Title
                                        </Typography>
                                    </center>
                                    <center>
                                        <Typography variant="h6" noWrap={true} style={{
                                            fontSize: 16,
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            color: '#707070',
                                            borderBottom: '1px solid lightgray',
                                            paddingBottom: 10,
                                        }}>
                                            {details.Title}
                                        </Typography>
                                    </center>
                                </Grid>

                                <Grid item xs={12} container >
                                    <Grid item xs={12} sm={6}>
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 16,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600,
                                                borderRight: '1px solid lightgray',
                                                paddingTop: 10,
                                                paddingBottom: 10,
                                            }}>
                                                Payment Mode
                                            </Typography>
                                        </center>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <center>
                                            <Typography variant="h6" noWrap={true} style={{
                                                fontSize: 16,
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                color: '#707070',
                                                fontWeight: 600,
                                                borderRight: '0px',
                                                paddingTop: 10,
                                                paddingBottom: 10,
                                            }}>
                                                Total Fee
                                            </Typography>
                                        </center>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>

                                        <Grid item xs={12} container style={{ borderRight: '1px solid lightgray' }}>
                                            <Grid item xs={6}>

                                                <InputLabel htmlFor="outlined-age-native-simple" style={{ fontFamily: 'Poppins', fontSize: 14 }}  >
                                                    <Radio
                                                        checked={paymentmode === 'Cash'}
                                                        color='primary'
                                                        onChange={(e) => setpaymentmode(e.target.value)}
                                                        value="Cash"
                                                        name="radio-button-demo"
                                                        inputProps={{ 'aria-label': 'Cash' }}
                                                    />Cash</InputLabel>
                                            </Grid>
                                            <Grid item xs={6}>

                                                <InputLabel htmlFor="outlined-age-native-simple" style={{ fontFamily: 'Poppins', fontSize: 14 }}>
                                                    <Radio
                                                        checked={paymentmode === 'Online'}
                                                        color='primary'
                                                        onChange={(e) => setpaymentmode(e.target.value)}
                                                        value="Online"
                                                        name="radio-button-demo"
                                                        inputProps={{ 'aria-label': 'Online' }}

                                                    />Online</InputLabel>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <center>
                                            <TextField className={classes.inputFields} onChange={(e) => setfees(e.target.value)} type='number' id="outlined-basic" size="small" label="Fees" variant="outlined" />
                                        </center>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={8} >
                        <Paper className={classes.paper} elevation={6} style={{ marginLeft: 25, marginRight: 20 }}>
                            <Grid style={{ height: 290, overflowY: 'scroll' }}>
                                {selectedMedicine.map((item) => {
                                    return (
                                        <>
                                            <Card elevation={1} style={{ width: 730, marginTop: 5, color: '#2C7FB2', paddingBottom: 0 }}>
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

                                                        </Grid>

                                                        <Grid container item xs={4}>
                                                            <Grid item xs={12}>
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
                                    )
                                })}

                            </Grid>

                            <Grid container xs={12} style={{ marginTop: 10 }}>
                                <Grid item sm={4} >
                                    <center>
                                        <Button onClick={() => window.open(pdf, '_blank')} className={classes.btnregister} style={{ float: 'right', marginRight: '-40px' }}>Preview PDF</Button>
                                    </center>
                                </Grid>
                                <Grid item sm={4} >
                                    <center>
                                        <Button onClick={() => handlePrintFinish()} className={classes.btnregister} style={{}}>Print & Finish</Button>
                                    </center>
                                </Grid>
                                <Grid item sm={4} >
                                    <center>

                                        <Button onClick={() => handlePaymentDetails()} className={classes.btnregister} style={{ float: 'left', marginLeft: '-40px' }}>Finish</Button>
                                    </center>

                                </Grid>
                            </Grid>


                        </Paper>

                    </Grid>
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
    griditem: {
        color: '#2C7FB2',
    },
    paperServices: {
        padding: theme.spacing(1),
        color: '#00318B',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        textAlign: 'center',

    },
    gridServices: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontFamily: 'Poppins',
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
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,

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
        fontFamily: 'Poppins',
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
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        color: '#707070'
    },
    btnview: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
    },
    inputFields: {
        [`& fieldset`]: {
            borderRadius: 25,
        },
        width: 300,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 200,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    groupreports: {
        height: 140,
        width: 250,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#00318B',
        paddingTop: 50,
        borderRadius: 20,
        float: 'right'
    },
    btnUpload: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
        marginBottom: 10,
        marginTop: 20
    },
    textField: {
        // [`& fieldset`]: {
        //     borderRadius: 25,
        // },
        padding: 8,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        textAlign: 'center',
        width: '100%'
    },
    facilitiesInput: {
        fontSize: 16,
        color: '#00318B !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,
        padding: 2
    },
    description: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        height: 145,
        color: 'gray',
        border: '1px solid #F0F0F0',
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
        fontSize: '11px'
    },
    formControlForm: {
        paddingBottom: theme.spacing(1.2),
    },
    textFieldForm: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 8,
    },
    inputFields: {
        width: 150,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 200,
        marginBottom: 20
    },
    btnregister: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        marginTop: 10,
        fontSize: 12,
        position: 'relative'
    },

}));


export default connect()(DoctorPaymentDetails);
