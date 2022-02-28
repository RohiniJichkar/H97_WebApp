import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField, Slide, Select, FormControl, Button, IconButton, Grid, Paper, Link } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { EditPatient } from '../../../Apis/Clinic_Patients/Edit_Patient';

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
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function Edit_Patient({ show, data, handleCloseEditmodal }) {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    let obj = {};
    obj = data;
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [firstnm, setfirstnm] = useState(obj ? obj.FirstName : '');
    const [lastnm, setlastnm] = useState(obj ? obj.LastName : '');
    const [mobile, setmobile] = useState(obj ? obj.MobileNo : '');
    const [email, setemail] = useState(obj ? obj.Email : '');
    const [dob, setdob] = useState(obj ? obj.DOB : '');
    const [gender, setgender] = useState(obj ? obj?.Gender : '');
    const [address, setaddress] = useState(obj ? obj?.Address : '');
    const [city, setcity] = useState(obj ? obj?.City : '');
    const [pincode, setpincode] = useState(obj ? obj?.Pincode : '');
    const [state, setstate] = useState(obj ? obj?.State : '');
    const [country, setcountry] = useState(obj ? obj?.Country : '');
    const [height, setheight] = useState(obj ? obj?.Height : '');
    const [weight, setweight] = useState(obj ? obj?.Weight : '');

    const EditDetails = async () => {
        var cdata = await localStorage.getItem("userdata");
        let parsed = JSON.parse(cdata);
        let clinicid = parsed.ClinicId;

        const object = {
            ClinicId: clinicid,
            UserId: obj.UserId,
            FirstName: firstnm,
            LastName: lastnm,
            MobileNo: mobile,
            Email: email,
            DOB: dob,
            Gender: gender,
            Address: address,
            City: city,
            Pincode: pincode,
            State: state,
            Country: country,
            Height: height,
            Weight: weight
        }
        try {
            const editPatientRequest = await EditPatient(object);
            const parse = JSON.parse(editPatientRequest);
            alert(parse.message);
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {/* Edit Patient Details */}

            <Dialog
                open={show}
                onClose={handleCloseEditmodal}
                maxWidth={maxWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Edit Details"}
                    <IconButton edge="start" color="inherit" onClick={handleCloseEditmodal} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container>
                            <Grid item xs={12} sm={6} style={{ borderRight: '1px solid #F0F0F0' }}>
                                <center>
                                    <div style={{ paddingTop: 10 }}>
                                        <TextField className={classes.inputFields} value={firstnm} onChange={(e) => {
                                            const re = /^[A-Za-z]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setfirstnm(e.target.value)
                                            }
                                        }} id="outlined-basic" size="small" label="First Name" variant="outlined" />
                                        <TextField className={classes.inputFields} value={lastnm} onChange={(e) => {
                                            const re = /^[A-Za-z]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setlastnm(e.target.value)
                                            }
                                        }} id="outlined-basic" size="small" label="Last Name" variant="outlined" />
                                        <TextField className={classes.inputFields} value={mobile} onChange={(e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setmobile(e.target.value)
                                            }
                                        }} onInput={(e) => {
                                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                        }} id="outlined-basic" type="number" size="small" label="Mobile Number" variant="outlined" />
                                        <TextField className={classes.inputFields} value={email} onChange={(e) => setemail(e.target.value)} id="outlined-basic" type="email" size="small" label="Email Id" variant="outlined" />
                                        <TextField className={classes.inputFields} value={dob} onChange={(e) => setdob(e.target.value)} id="outlined-basic" type="date" size="small" label="DOB" variant="outlined" />
                                        <FormControl variant="outlined" size='small' className={classes.formControl}  >
                                            <Select
                                                className={classes.inputFields}
                                                native
                                                size='small'
                                                value={gender}
                                                onChange={(e) => setgender(e.target.value)}
                                                label="Gender"
                                                inputProps={{
                                                    name: 'gender',
                                                    id: 'outlined-gender-native-simple',
                                                }}

                                            >
                                                <option aria-label="None" value="" >Gender</option>
                                                <option value='Male'>Male</option>
                                                <option value='Female'>Female</option>

                                            </Select>
                                        </FormControl>
                                    </div>
                                </center>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <center>
                                    <div style={{ paddingTop: 10 }}>
                                        <TextField className={classes.inputFields} multiline value={address} onChange={(e) => setaddress(e.target.value)}
                                            rows={2}
                                            rowsMax={5} id="outlined-basic" size="small" label="Address" variant="outlined"
                                        />
                                        <TextField className={classes.inputFields} value={city} onChange={(e) => {
                                            const re = /^[A-Za-z]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setcity(e.target.value)
                                            }
                                        }} id="outlined-basic" size="small" label="City" variant="outlined" />
                                        <TextField className={classes.inputFields} value={pincode} onChange={(e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setpincode(e.target.value)
                                            }
                                        }} id="outlined-basic" size="small" label="Pincode" variant="outlined" />
                                        <TextField className={classes.inputFields} value={state} onChange={(e) => {
                                            const re = /^[A-Za-z]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setstate(e.target.value)
                                            }
                                        }} id="outlined-basic" size="small" label="State" variant="outlined" />
                                        <TextField className={classes.inputFields} value={country} onChange={(e) => {
                                            const re = /^[A-Za-z]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setcountry(e.target.value)
                                            }
                                        }} id="outlined-basic" size="small" label="Country" variant="outlined" />
                                        <Grid container>
                                            <Grid item xs={12} sm={6}>
                                                <center>
                                                    <TextField className={classes.inputFields} value={height} onChange={(e) => setheight(e.target.value)} id="outlined-basic" size="small" type="number" label="Height" variant="outlined" style={{ width: 145, float: 'right', marginRight: 5 }} />
                                                </center>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <center>
                                                    <TextField className={classes.inputFields} value={weight} onChange={(e) => setweight(e.target.value)} id="outlined-basic" size="small" type="number" label="Weight" variant="outlined" style={{ width: 150, float: 'left', }} />
                                                </center>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </center>
                            </Grid>

                            <Grid container>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnCancle} onClick={handleCloseEditmodal} style={{ float: 'right', marginRight: 20 }}>
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnregister} onClick={EditDetails} style={{ float: 'left', marginLeft: 20 }}>
                                        Update
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
}