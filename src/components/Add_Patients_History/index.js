import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dialog, IconButton, DialogContent, DialogActions, DialogTitle, DialogContentText, Typography, Grid, TextField, Button } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { getReportsByTitle, DeleteReportsByTitle, DeleteReportsById } from '../../Apis/Patient_Reports/index';
import { transparent } from 'material-ui/styles/colors';
import { Add_Broadcast } from '../../Apis/Broadcast_Message';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import ip from '../../ipaddress/ip';
import { Add_PatientHistory } from '../../Apis/PatientHistory';


const drawerWidth = 240;

export const Add_Patients_History = ({ show, data, handleclose }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [maxWidth, setMaxWidth] = useState('sm');
    const [fullWidth, setFullWidth] = React.useState(true);
    const [title, settitle] = React.useState('');
    const [description, setdescription] = React.useState(data ? data.PatientHistoryDiscription : '');
    const [historyTypes, sethistoryTypes] = useState([]);

    // console.log('patient data', data.PatientHistoryDiscription);
    // const addBroadcastMessage = async () => {
    //     var data = await localStorage.getItem("userdata");
    //     let parsed = JSON.parse(data);
    //     let clinicid = parsed.ClinicId;
    //     let userid = parsed.userid;

    //     const obj = {
    //         DoctorId: userid,
    //         ClinicId: clinicid,
    //         Title: title,
    //         Discription: description
    //     }
    //     const request = await Add_Broadcast(obj);
    //     let parse = JSON.parse(request);
    //     if (parse.success === "200") {
    //         alert(parse.message);
    //         handleclose();
    //     }

    // }

    // const fetchAddHistorytypes = async () => {
    //     try {
    //         const medicineInfo = await axios.post(ip + 'Web_GetPatientHistory');
    //         sethistoryTypes(medicineInfo?.data?.PatientHistoryType);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // useEffect(() => {

    //     fetchAddHistorytypes();

    // }, []);
    const AddpatientHistory = async () => {
    
        const Obje = {
            UserId: data.UserId,
            PatientHistoryDiscription: description,
        }

        try {
            const add = await Add_PatientHistory(Obje);
            console.log(add);
            let parse = JSON.parse(add);
            if (parse.success === "200") {
                alert(parse.message);
                window.location.reload()
            }
        } catch (e) {
            console.log(e);
        }
    }
    console.log(description);

    return (
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={show}
                onClose={handleclose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: 12, color: '#2C7FB2' }}>{"Add More Information About Patient"}
                    <IconButton edge="start" color="inherit" onClick={() => handleclose(false)} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container>
                            <Grid item xs={12} sm={12}>
                                <center>
                                    {/* <TextField className={classes.inputFields} onChange={(e) => settitle(e.target.value)} id="outlined-basic" label="Title" variant="outlined" /> */}
                                    <TextField className={classes.inputFields} value={description} onChange={(e) => setdescription(e.target.value)} multiline rows={30} rowsMax={15} id="outlined-basic" label="Patient Details" variant="outlined" />
                                    {/* <Alert severity="warning" style={{fontsize:15, position:'relative',bottom:14,width:400}}>Note : This message will be send to all the patients in your Clinic so carefully write the message.</Alert> */}
                                    <Grid container xs={12} style={{ marginTop: 5 }}>
                                        <Grid item sm={6} >
                                            <Button className={classes.btnregister} onClick={() => handleclose(false)} style={{ float: 'right', marginRight: 20 }}>Cancel</Button>
                                        </Grid>
                                        <Grid item sm={6} >
                                            <Button className={classes.btnregister} onClick={() => AddpatientHistory()} style={{ float: 'left', marginLeft: 20 }}>Save</Button>
                                        </Grid>
                                    </Grid>
                                </center>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
            </Dialog>

        </>
    );
};



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        backgroundColor: 'white',
    },
    appBar: {
        position: 'relative',
        backgroundColor: transparent
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    btnYes: {
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
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
    },
    inputFields: {
        width: 400,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 200,
        color:'#2C7FB2',
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
        fontSize: 12
    },
}));