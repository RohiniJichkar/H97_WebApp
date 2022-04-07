import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField, Slide, Select, FormControl, Button, IconButton, Grid, Paper, Typography } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { editSubscription } from '../../../Admin_Apis/Clinic_Subscription/index';


const defaultMaterialTheme = createTheme({
    palette: {
        primary: {
            main: '#1769aa',
        },
    },
});

const drawerWidth = 240;

const Edit_Subscription = ({ show, data, handleclose }) => {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [subscriptionType, setsubscriptionType] = useState(data.SubscriptionType ? data.SubscriptionType : '');
    const [subscriptionAmount, setsubscriptionAmount] = useState(data.SubscriptionAmount ? data.SubscriptionAmount : '');
    const [subscriptionStartDate, setsubscriptionStartDate] = useState(data.SubscriptionStartDate ? data.SubscriptionStartDate : new Date());
    const [subscriptionEndDate, setsubscriptionEndDate] = useState(data.SubscriptionEndDate ? data.SubscriptionEndDate : new Date());
    const [subscriptionOtherFees, setsubscriptionOtherFees] = useState(data.OtherFees ? data.OtherFees : '');
    const [subscriptionTotalAmount, setsubscriptionTotalAmount] = useState(data.TotalAmount ? data.TotalAmount : '');
    const [subscriptionPaymentMode, setsubscriptionPaymentMode] = useState(data.PaymentMode ? data.PaymentMode : '');



    const api_edit_subscription = async (clinicid) => {

        const obj = {
            ClinicId: clinicid,
            SubscriptionType: subscriptionType,
            SubscriptionStartDate: subscriptionStartDate,
            SubscriptionEndDate: subscriptionEndDate,
            SubscriptionAmount: subscriptionAmount,
            OtherFees: subscriptionOtherFees,
            TotalAmount: subscriptionTotalAmount,
            PaymentMode: subscriptionPaymentMode
        }

        try {
            const editsubscription = await editSubscription(obj);
            let parse = JSON.parse(editsubscription);
            if (parse.success === "200") {
                alert(parse.message);
                window.location.reload()
            } else {
                alert(parse.message);
            }

        } catch (e) {
            console.log(e)
        }

    }


    return (
        <>
            <Dialog
                open={show}
                maxWidth={maxWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Edit Clinic Subscription"}
                    <IconButton edge="start" color="inherit" onClick={handleclose} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container>
                            <Grid item xs={12} sm={6} style={{ borderRight: '1px solid #F0F0F0' }}>
                                <center>
                                    <div>
                                        <Grid container xs={12}>
                                            <Grid item xs={12}>
                                                <FormControl variant="outlined" size='small' className={classes.formControl}  >
                                                    <Select
                                                        className={classes.inputFields}
                                                        native
                                                        size='small'
                                                        value={subscriptionType}
                                                        label="subscriptiontype"
                                                        onChange={(e) => setsubscriptionType(e.target.value)}
                                                        inputProps={{
                                                            name: 'subscriptiontype',
                                                            id: 'outlined-gender-native-simple',
                                                        }}
                                                        style={{ marginLeft: -100, fontWeight: 500, width: '225%' }}
                                                    >
                                                        <option aria-label="None" value="">Subscription Type</option>
                                                        <option value='Free 15 days'>Free 15 days</option>
                                                        <option value='30 days'>30 days</option>
                                                        <option value='45 days'>45 days</option>
                                                        <option value='90 days'>90 days</option>
                                                        <option value='1 year'>1 year</option>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    className={classes.inputFields}
                                                    value={subscriptionAmount}

                                                    id="outlined-basic"
                                                    type="number"
                                                    size="small"
                                                    placeholder="Subscription Amount"
                                                    variant="outlined"
                                                    onChange={(e) => setsubscriptionAmount(e.target.value)}
                                                    onInput={(e) => {
                                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                                    }}
                                                    style={{ marginLeft: -16, width: '74%' }}
                                                />

                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    className={classes.inputFields}
                                                    value={subscriptionOtherFees}
                                                    id="outlined-basic"
                                                    type="number"
                                                    size="small"
                                                    placeholder="Other Fees"
                                                    variant="outlined"
                                                    onChange={(e) => setsubscriptionOtherFees(e.target.value)}
                                                    onInput={(e) => {
                                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                                    }}
                                                    style={{ marginLeft: -16, width: '74%' }}
                                                />

                                            </Grid>
                                        </Grid>

                                    </div>
                                </center>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <center>
                                    <div>
                                        <Grid container item xs={12}>
                                            <Grid item xs={6}>
                                                <ThemeProvider theme={defaultMaterialTheme}>

                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <KeyboardDatePicker
                                                            autoOk
                                                            className={classes.inputFields}
                                                            size='small'
                                                            value={subscriptionStartDate}
                                                            onChange={setsubscriptionStartDate}
                                                            inputVariant="outlined"
                                                            label='Start Date'
                                                            format='dd/MM/yyyy'
                                                            style={{ width: '75%', float: 'left', marginLeft: 70 }}

                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </ThemeProvider>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <ThemeProvider theme={defaultMaterialTheme}>

                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <KeyboardDatePicker
                                                            autoOk
                                                            className={classes.inputFields}
                                                            size='small'
                                                            value={subscriptionEndDate}
                                                            onChange={setsubscriptionEndDate}
                                                            inputVariant="outlined"
                                                            label='Expiry Date'
                                                            format='dd/MM/yyyy'
                                                            style={{ width: '75%', float: 'left', marginLeft: 20 }}

                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </ThemeProvider>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <center>
                                                    <FormControl variant="outlined" size='small' className={classes.formControl}  >
                                                        <Select
                                                            className={classes.inputFields}
                                                            native
                                                            size='small'
                                                            value={subscriptionPaymentMode}
                                                            label="Payment Mode"
                                                            onChange={(e) => setsubscriptionPaymentMode(e.target.value)}

                                                            inputProps={{
                                                                name: 'Payment Mode',
                                                                id: 'outlined-Payment Mode-native-simple',
                                                            }}
                                                            style={{ width: '233%', marginLeft: -83, fontWeight: 500 }}
                                                        >
                                                            <option aria-label="None" value="" >Payment Mode</option>
                                                            <option value='Online'>Online</option>
                                                            <option value='Cash'>Cash</option>

                                                        </Select>
                                                    </FormControl>
                                                </center>
                                            </Grid>
                                        </Grid>
                                        <TextField className={classes.inputFields}
                                            value={subscriptionTotalAmount}
                                            type='number'
                                            onInput={(e) => {
                                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
                                            }}
                                            onChange={(e) => setsubscriptionTotalAmount(e.target.value)}
                                            id="outlined-basic" size="small"
                                            placeholder="Total Amount"
                                            variant="outlined"
                                            style={{ width: '76%', marginLeft: 30 }} />


                                    </div>
                                </center>
                            </Grid>

                            <Grid container style={{ marginTop: -10, marginBottom: -10 }}>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnCancle} onClick={handleclose} style={{ float: 'right', marginRight: 20 }}>
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnregister} onClick={() => api_edit_subscription(data.ClinicId)} style={{ float: 'left', marginLeft: 20 }}>
                                        Edit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
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
        minWidth: 150,
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
}))

export default Edit_Subscription
