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
import { Addinformationhistory } from '../../Apis/PatientInQueue/Generate_Prescription/Medicines_Table';
import { AdditionalPrescriptionDetails } from '../../Apis/PatientInQueue/Generate_Prescription/Medicines_Table';
import { Add_Pdf_Download } from '../Add_Pdf_Download';



const drawerWidth = 240;

const getPatientDetailsApi = 'http://13.233.217.107:8080/api/ShowPatientDetailUsingId';

export const Add_Patients_History = ({ show, data, handleclose }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [maxWidth, setMaxWidth] = useState('md');
    const [fullWidth, setFullWidth] = React.useState(true);
    const [title, settitle] = React.useState('');
    const [pdf, setpdf] = useState('');
    const [description, setdescription] = React.useState(data ? data.PatientHistoryDiscription : '');
    const [historyTypes, sethistoryTypes] = useState([]);
    const [pdfdescription, setpdfdescription] = useState([]);
    const [patientDetails, setpatientDetails] = useState([]);
    const [openmodal, setopenmodal] = useState(false);




    console.log('patient data', data.PdfPatientHistory);

    const handleGeneratePDF = async () => {

      
       
        var data1 = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data1);
        let clinicid = parsed.ClinicId;
       
        const obj = {
            ClinicId: clinicid,
            UserId: data.UserId,

        }
      
        try {
            const request = await Addinformationhistory(obj);
            if(description==''){
                alert("Pdf can not be Generated for Blank Page ");
            }else{
                setopenmodal(true);
            }
            
          

            // let parse = JSON.parse(request);
            // if (parse.success === "200") {
            //     alert(parse.message);
            //     handleclose();
            // } else {
            //     alert(parse.message);
            // }
            // setpdf(request?.data?.Patient?.PdfPatientHistory)
        }
        catch (e) {
            
            console.log(e);
        }

    }
    const handlePrescriptionDetails = async () => {

        const obj = {
            UserId: data.UserId,
            // PdfPatientHistory: pdfdescription
        }
        const requestReports = await AdditionalPrescriptionDetails(obj);
        setpdfdescription(requestReports);
        // window.open(pdfdescription, '_blank')
    }



    const handlePrescDetails = async () => {
        try {
            const patientDetailedInfo = await axios.post(getPatientDetailsApi, { UserId: data.UserId });
            setpatientDetails(patientDetailedInfo?.data?.PatientDetails);
            window.open(patientDetails.PdfPatientHistory, '_blank')
        } catch (e) {
            console.log(e);
        }
    }


    const handleContinue = async () => {
        await handleGeneratePDF().then(async data => {
            // const interval = await setInterval(() => {
            //      handlePrescDetails();
            // }, 100);
            await handlePrescDetails();
        })
    }

    console.log("patient data", data.UserId)
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
            }
            
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={show}
                style={{ overflow: 'hidden', height: 650, marginTop: '-10px' }}
               
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
                                    <TextField className={classes.inputFields} value={description} onChange={(e) => setdescription(e.target.value)} multiline rows={400} rowsMax={20} id="outlined-basic" label="Patient Details" variant="outlined" />
                                    {/* <Alert severity="warning" style={{fontsize:15, position:'relative',bottom:14,width:400}}>Note : This message will be send to all the patients in your Clinic so carefully write the message.</Alert> */}
                                    <Grid container xs={12} style={{ marginTop: 5 }}>
                                        <Grid item sm={3} >
                                            <Button className={classes.btnregister} onClick={() => handleclose(false)} style={{ float: 'right', marginRight: '-100%' }}>Cancel</Button>
                                        </Grid>
                                        <Grid item sm={3} >
                                            <Button className={classes.btnregister} onClick={() => AddpatientHistory()} style={{ float: 'left', marginLeft: '113%' }}>Save</Button>
                                        </Grid>
                                        <Grid item sm={3} >
                                            <Button className={classes.btnregister} onClick={() => { handleGeneratePDF() }} style={{ float: 'left', marginLeft: 180 }}> Generate Pdf</Button>
                                        </Grid>
                                    </Grid>
                                   
                                </center>
                            </Grid>
                            {openmodal ? <Add_Pdf_Download show={openmodal} data={data}  handleclose={() => setopenmodal(false)} /> : null}
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
        width: 800,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 200,
        color: '#2C7FB2',
        marginBottom: 10
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