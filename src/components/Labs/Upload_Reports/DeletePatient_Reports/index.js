import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, AppBar, IconButton, Toolbar, DialogContent, DialogActions, DialogTitle, DialogContentText, Button, Slide } from "@material-ui/core";
import { DeleteReportsByTitle } from '../../../../Lab_Apis/Patient_Reports';
import { transparent } from 'material-ui/styles/colors';

export const DeletePatientReports = ({ show, data, handleCloseDeletemodal }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [maxWidth, setMaxWidth] = useState('sm');
    console.log(data)

    const DeleteReports = async (userid, reporttitle) => {
        const request = await DeleteReportsByTitle(userid, reporttitle);
        let parse = JSON.parse(request);
        if (parse.success === "200") {
            handleCloseDeletemodal();
            window.location.reload()
        }
    }

    return (
        <>  <Dialog
            open={show}
            keepMounted
            onClose={handleCloseDeletemodal}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title" style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#00318B' }}>{"Are you sure ?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description" style={{ fontFamily: 'Poppins', fontWeight: 400, color: '#707070' }}>
                    Do you want to Delete Reports?
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{ marginTop: 20 }}>
                <Button className={classes.btnregister} onClick={handleCloseDeletemodal} style={{ width: 100 }} >
                    No
                </Button>
                <Button className={classes.btnregister} onClick={() => DeleteReports(data.UserId, data.ReportTitle)} style={{ width: 100 }}>
                    Yes
                </Button>
            </DialogActions>
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
}));