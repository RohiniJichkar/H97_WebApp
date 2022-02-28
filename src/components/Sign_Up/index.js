import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, Typography, List, ListItem, ListItemText, Button, IconButton, Grid, Paper, Link } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { Payment_Packages, Sign_Up_Clinic } from '../../Admin_Apis/Add_Clinic/index';
import axios from 'axios';
import ip from '../../ipaddress/ip';

const loadscript = (src) => {
    return new Promise(resolve => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script);
    })
};

const _DEV_ = document.domain === 'localhost'


const PaymentPackages = ({ show, data, handleclose }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    console.log(data)

    const [packages, setpackages] = useState([]);
    const [amount, setamount] = React.useState('');

    const displayRazorpay = async (amt) => {
        const src = await loadscript("https://checkout.razorpay.com/v1/checkout.js")

        if (!src) {
            alert('Razorpay SDK failed to load')
            return;
        }

        try {
            const datas = await axios.post(ip + 'RazoprPay', { amount: amt.Package })
            console.log(datas?.data?.order)
            setamount(datas?.data?.order)
        } catch (error) {
            console.log(error)
        }

        let amtvalue = amt.Package + '00';
        const options = {
            "key": _DEV_ ? 'rzp_test_pysA4xvflQ8uDz' : 'PRODUCT_KEY',
            "amount": amtvalue, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "name": "Health97",
            "currency": amount.currency,
            "description": "Test Transaction",
            "order_id": amount.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response) {
                alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
                AddClinic(amt);
            },
            "prefill": {
                "name": data.FirstName + data.LastName,
                "email": data.Email,
                "contact": data.MobileNo
            },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }



    const AddClinic = async (amt) => {

        var now = new Date();
        var date = now.toISOString().split('T')[0];

        var afterDate = new Date(new Date().setDate(now.getDate() + parseInt(amt.DurationCode)));
        var endDt = afterDate.toISOString().split('T')[0];

        var formData = new FormData();
        formData.append('file', data.file);
        formData.append('ClinicName', data.ClinicName);
        formData.append('ClinicMobileNo', data.ClinicMobileNo);
        formData.append('ClinicEmail', data.ClinicEmail);
        formData.append('ClinicAddress', data.ClinicAddress);
        formData.append('ClinicCity', data.ClinicCity);
        formData.append('ClinicState', data.ClinicState);
        formData.append('ClinicPincode', data.ClinicPincode);
        formData.append('ClinicGstNumber', data.ClinicGstNumber);
        formData.append('ClinicRegistrationNumber', data.ClinicRegistrationNumber);
        formData.append('ClinicStartTime', data.ClinicStartTime);
        formData.append('ClinicEndTime', data.ClinicEndTime);
        formData.append('NoOfStaff', data.NoOfStaff);
        formData.append('createdDate', date);
        formData.append('Latitude', data.Latitude);
        formData.append('Longitude', data.Longitude);
        formData.append('FirstName', data.FirstName);
        formData.append('LastName', data.LastName);
        formData.append('Password', data.Password);
        formData.append('MobileNo', data.MobileNo);
        formData.append('Email', data.Email);
        formData.append('Address', data.Address);
        formData.append('City', data.City);
        formData.append('Pincode', data.Pincode);
        formData.append('State', data.State);
        formData.append('Country', data.Country);
        formData.append('MorningStartTime', data.MorningStartTime);
        formData.append('MorningEndTime', data.MorningEndTime);
        formData.append('EveningStartTime', data.EveningStartTime);
        formData.append('EveningEndTime', data.EveningEndTime);
        formData.append('Category', data.Category);
        formData.append('Gender', data.Gender);
        formData.append('Education', data.Education);
        formData.append('ClinicTime', data.ClinicStartTime + '-' + data.ClinicEndTime);
        formData.append('SubscriptionStartDate', date);
        formData.append('SubscriptionEndDate', endDt);
        formData.append('SubscriptionType', amt.DisplayTime);
        formData.append('SubscriptionAmount', amt.Package);
        formData.append('OtherFees', '0');
        formData.append('TotalAmount', amt.Package);
        formData.append('PaymentMode', 'Online');

        try {
            const clinicdetails = await Sign_Up_Clinic(formData);
            let parse = JSON.parse(clinicdetails);
            if (parse.success == "200") {
                alert(parse.message);
                navigate('/');
            } else {
                alert(parse.message);
            }
        } catch (error) {
            console.log(error)
        }
    }


    const fetchPackages = async () => {
        const request = await Payment_Packages();
        if (request) {
            setpackages(request)
        }

    }

    useEffect(() => {
        fetchPackages();
    }, []);

    return (
        <>
            <Dialog
                open={show}
                fullScreen

                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title" style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2' }}>{"Packages"}
                    <IconButton edge="start" color="inherit" onClick={handleclose} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" >
                        <Grid container>
                            {packages.map((item) => {
                                return (
                                    <>
                                        <Grid item xs={4} container>
                                            <Paper elevation={3} spacing={4} style={{ padding: 20, width: 400 }}>

                                                <Grid item xs={12}>
                                                    <center>
                                                        <Typography variant="h6" noWrap={true} style={{
                                                            fontSize: 16,
                                                            fontFamily: 'Poppins',
                                                            fontStyle: 'normal',
                                                            color: '#707070',
                                                            fontWeight: 600,

                                                        }}>
                                                            {item.Title}
                                                        </Typography>
                                                    </center>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <center>
                                                        <Typography variant="h6" noWrap={true} style={{
                                                            fontSize: 16,
                                                            fontFamily: 'Poppins',
                                                            fontStyle: 'normal',
                                                            color: '#707070',
                                                            fontWeight: 600
                                                        }}>
                                                            {item.DisplayTime}
                                                        </Typography>
                                                    </center>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <center>
                                                        <Typography variant="h6" noWrap={true} style={{
                                                            fontSize: 18,
                                                            fontFamily: 'Poppins',
                                                            fontStyle: 'normal',
                                                            color: '#707070',
                                                            fontWeight: 600
                                                        }}>
                                                            ₹ {item.Package}
                                                        </Typography>
                                                    </center>
                                                </Grid>

                                                <Grid item style={{
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                }}>
                                                    <center>
                                                        <Typography variant="h6" noWrap={true} style={{
                                                            fontSize: 16,
                                                            fontFamily: 'Poppins',
                                                            fontStyle: 'normal',
                                                            color: '#707070',
                                                            overflow: "auto",
                                                            whiteSpace: 'pre-wrap',
                                                            overflowWrap: 'break-word',
                                                            fontWeight: 600
                                                        }}>
                                                            {item.Description}
                                                        </Typography>
                                                    </center>
                                                </Grid>


                                                <Grid item xs={12} style={{ marginTop: 10 }}>
                                                    <center>
                                                        {/* displayRazorpay(item.Package + '00') */}
                                                        <Button className={classes.btnregister} onClick={() => { displayRazorpay(item) }} style={{ width: 100, }} >
                                                            Buy Now
                                                        </Button>
                                                    </center>
                                                </Grid>

                                            </Paper>
                                        </Grid>
                                    </>
                                );
                            })}

                        </Grid>
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </>
    )
}

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
    },
    inputFields: {
        // [`& fieldset`]: {
        //     borderRadius: 25,
        // },
        width: 300,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 200,
        marginBottom: 20
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
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
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
        fontSize: 12
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
        fontSize: 12
    },
}));

export default PaymentPackages
