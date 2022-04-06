import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, TextField, FormControl, Grid, Paper, IconButton, Dialog, DialogActions, DialogTitle, DialogContentText, DialogContent } from "@material-ui/core";
import DoctorNavbar from './Doctor_Navbar';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { DataGrid } from '@material-ui/data-grid';
import { Patients_Data, Reports, getReportsByTitle } from '../Apis/Patient_Reports/index';
import { PatientReportImages } from './Patient_Reports_Image_Comp/index';
import { DeletePatientReports } from './Patient_Reports_Image_Comp/DeletePatient_Report';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import ip from '../ipaddress/ip';
import { get_advertisments } from '../Apis/TV_Advertisements/index';
import CloseIcon from '@material-ui/icons/Close';

const drawerWidth = 240;


export default function DoctorAdvertisements() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [opendeletemodal, setopendeletemodal] = React.useState(false);
    const [advertisement, setAdvertisement] = useState([]);
    const [ids, setid] = React.useState('');
    const [openmodal, setopenmodal] = React.useState(false);
    const [file, setfile] = useState();
    const [Description, setDescription] = useState('');
    const [maxWidth, setMaxWidth] = React.useState('md');

    const fetchAdvertisements = async () => {
        try {
            const getrequest = await get_advertisments();
            setAdvertisement(getrequest);
        } catch (e) {
            console.log(e);
        }
    }


    const handleDelete = async () => {
        console.log(ids)
        try {
            const deleterequest = await axios.delete(ip + 'Web_DeleteTVAdvertisement', { data: { id: ids } });
            if (deleterequest) {
                alert('Advertisement Deleted Successfully');
                setopendeletemodal(false);
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
    }


    const addAdvertisement = async () => {
        var cdata = await localStorage.getItem("userdata");
        let parsed = JSON.parse(cdata);
        let clinicid = parsed.ClinicId;
        let doctorid = parsed.userid;

        const formdata = new FormData();
        formdata.append("file", file);
        formdata.append("DoctorId", doctorid);
        formdata.append("ClinicId", clinicid);
        formdata.append("Category", 'TV');
        formdata.append("Discription", Description);

        try {
            const addAdvertisements = await axios.post(ip + 'Web_AddTVAdvertisement', formdata, { headers: { "Content-Type": "multipart/form-data" } })
            if (addAdvertisements) {
                alert('Advertisement Added Successfully');
                setopenmodal(false);
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        fetchAdvertisements();
    }, []);


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
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',
                        }}>
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', borderRadius: 105, fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Advertisements
                        <Button className={classes.btnregister} onClick={() => setopenmodal(true)} style={{ float: 'right', marginRight: 20, width: '150px', fontFamily: 'Poppins', fontSize: 12.5, fontWeight: 400 }}>Add Advertisement</Button>
                    </Typography>
                </Grid>


                <Grid item xs={12}>
                    <Paper elevation={6} style={{ borderRadius: 10, padding: 20 }}>
                        <Typography variant="h6" noWrap={true}
                            style={{
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                color: '#2C7FB2',
                                textDecoration: 'underline',
                                fontSize: 18,
                                textUnderlineOffset: '1px',
                            }}>
                            View Advertisements
                        </Typography>

                        {advertisement.length != 0 ?
                            <Grid container spacing={2} style={{ paddingTop: 20, height: 410, overflowY: 'auto' }}>
                                {advertisement.map((item) => {
                                    return (
                                        <Grid item sm={2} style={{ marginRight: 100 }} >
                                            <Paper elevation={3} className={classes.groupreports} >
                                                <center>
                                                    <IconButton edge="start" size='small' aria-label="close" style={{ marginTop: '-15px', float: 'right', color: 'red' }}>
                                                        <DeleteIcon size='small' onClick={() => { setopendeletemodal(true); setid(item.id); }} />
                                                    </IconButton>
                                                    {item.Image ? <img src={item.Image} style={{ height: '200px', width: '100%', borderRadius: 10 }} /> : <img src="default-image.png" style={{ height: '200px', width: '100%' }} />
                                                    }
                                                </center>
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
                                            <img src="default-image.png" style={{ height: '200px', width: '100%' }} />
                                        </center>
                                        <center>
                                            <Typography variant="h6" noWrap={true}
                                                style={{
                                                    fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    fontWeight: 600,
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    color: '#2C7FB2',
                                                    fontSize: 14
                                                }}>
                                                No Advertisement
                                            </Typography>
                                        </center>
                                    </Paper>
                                </Grid>
                            </Grid>
                        }
                    </Paper>
                </Grid>


                {/* Add Advertisement */}


                {/* Add Advertisement */}
                <Dialog
                    open={openmodal}
                    maxWidth={maxWidth}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Upload Advertisements"}
                        <IconButton edge="start" color="inherit" onClick={() => setopenmodal(false)} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Grid container xs={12}>
                                <Grid item xs={6}>
                                    <center>
                                        <Typography variant="h6" noWrap={true} style={{
                                            fontSize: 16,
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            color: '#707070',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            alignItems: 'center',

                                        }}>
                                            Image:
                                        </Typography>
                                    </center>

                                    <center>
                                        <Typography variant="h6" noWrap={true} style={{
                                            fontSize: 16,
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            color: '#707070',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            alignItems: 'center',
                                            marginTop: 25

                                        }}>
                                            Description:
                                        </Typography>
                                    </center>
                                </Grid>
                                <Grid item xs={6}>
                                    <center>
                                        <FormControl variant="outlined"   >
                                            <TextField id="outlined-basic" enctype="multipart/form-data" onChange={e => {
                                                const file = e.target.files[0];
                                                setfile(file)
                                            }} type="file" size="small" label="" variant="outlined" />
                                        </FormControl>
                                    </center>

                                    <TextField multiline
                                        rows={2}
                                        rowsMax={6} id="outlined-basic" size="small" label="" variant="outlined"
                                        onChange={(e) => setDescription(e.target.value)}
                                        style={{ marginTop: 20, width: '94%', marginLeft: 10 }}
                                    />
                                </Grid>

                                <Grid container>
                                    <Grid xs={12} sm={6}>
                                        <Button className={classes.btnCancle} onClick={() => setopenmodal(false)} style={{ float: 'right', marginRight: 20, marginTop: 40 }}>
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid xs={12} sm={6}>
                                        <Button className={classes.btnregister} onClick={() => addAdvertisement()} autoFocus style={{ float: 'left', marginLeft: 20, marginTop: 40 }}>
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </DialogContentText>
                    </DialogContent>

                </Dialog>

                {/* Delete Advertisement */}
                <Dialog
                    open={opendeletemodal}
                    onClose={() => setopendeletemodal(false)}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title" style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#00318B' }}>{"Are you sure ?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description" style={{ fontFamily: 'Poppins', fontWeight: 400, color: '#707070' }}>
                            Do you want to Delete Advertisements?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ marginTop: 20 }}>
                        <Button onClick={() => setopendeletemodal(false)} style={{
                            backgroundColor: '#2C7FB2',
                            color: '#fff',
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            textAlign: 'center',
                            borderRadius: 28,
                            width: 130,
                        }} >
                            No
                        </Button>
                        <Button onClick={() => handleDelete()} style={{
                            backgroundColor: '#2C7FB2',
                            color: '#fff',
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            textAlign: 'center',
                            borderRadius: 28,
                            width: 130,
                        }}>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* {opendeletemodal ? <DeletePatientReports show={opendeletemodal} data={deletemodalData} handleCloseDeletemodal={() => setopendeletemodal(false)} /> : null} */}

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
        color: '#707070',
        fontWeight: 400,
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
        margin: theme.spacing(1),
        minWidth: 180,
    },
    groupreports: {
        height: 200,
        width: 300,
        borderRadius: 10,
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
}));

