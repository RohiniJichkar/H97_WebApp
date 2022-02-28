import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, IconButton, DialogContent, DialogActions, DialogTitle, DialogContentText, Typography, Grid, TextField, Button } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { getReportsByTitle, DeleteReportsByTitle, DeleteReportsById } from '../../Apis/Patient_Reports/index';
import { transparent } from 'material-ui/styles/colors';
import { Add_Broadcast } from '../../Apis/Broadcast_Message/index';
import Alert from '@material-ui/lab/Alert';

const drawerWidth = 240;

export const BroadcastMessage = ({ show, handlemodal }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [maxWidth, setMaxWidth] = useState('sm');
    const [fullWidth, setFullWidth] = React.useState(true);
    const [title, settitle] = React.useState('');
    const [description, setdescription] = React.useState('');

    const addBroadcastMessage = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        let userid = parsed.userid;

        const obj = {
            DoctorId: userid,
            ClinicId: clinicid,
            Title: title,
            Discription: description
        }
        const request = await Add_Broadcast(obj);
        let parse = JSON.parse(request);
        if (parse.success === "200") {
            alert(parse.message);
            handlemodal();
        }

    }

    return (
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={show}
                onClose={handlemodal}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Broadcast Message"}
                    <IconButton edge="start" color="inherit" onClick={() => handlemodal(false)} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container>
                            <Grid item xs={12} sm={12}>
                                <center>
                                    <TextField className={classes.inputFields} onChange={(e) => settitle(e.target.value)} id="outlined-basic" label="Title" variant="outlined" />
                                    <TextField className={classes.inputFields} onChange={(e) => setdescription(e.target.value)} multiline rows={3} rowsMax={6} id="outlined-basic" label="Description" variant="outlined" />
                                    <Alert severity="warning" style={{fontsize:15, position:'relative',bottom:14,width:400}}>Note : This message broadcasted to all the clinic patients</Alert>
                                    <Grid container xs={12} style={{ marginTop: 5 }}>
                                        <Grid item sm={6} >
                                            <Button className={classes.btnregister} onClick={() => handlemodal(false)} style={{ float: 'right', marginRight: 20 }}>Cancel</Button>
                                        </Grid>
                                        <Grid item sm={6} >
                                            <Button className={classes.btnregister} onClick={() => addBroadcastMessage()} style={{ float: 'left', marginLeft: 20 }}>Send</Button>
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