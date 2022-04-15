import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, IconButton, DialogContent, DialogActions, DialogTitle, DialogContentText, Typography, List, ListItemText, ListItem, Divider, Paper, Grid } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { getReportsByTitle, DeleteReportsByTitle, DeleteReportsById } from '../../Apis/Patient_Reports/index';
import { transparent } from 'material-ui/styles/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import IosShareIcon from '@mui/icons-material/IosShare';
import Get_Lab_Clinics from '../Labs/Upload_Reports/Clinic_List';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const drawerWidth = 240;

export const PatientReportImages = ({ show, data, handleClosemodal }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [Data, setData] = useState([]);
    const [maxWidth, setMaxWidth] = useState('sm');
    const [fullWidth, setFullWidth] = React.useState(true);
    const [docData, setdocData] = useState([]);
    const [openclinicmodal, setopenclinicmodal] = React.useState(false);

    useEffect(() => {
        FetchData();
    }, []);

    const FetchData = async () => {
        const request = await getReportsByTitle(data.UserId, data.ReportTitle);
        setData(request);
    }


    const DeleteReport = async (id) => {
        const request = await DeleteReportsById(id)
        console.log("Request data : ", request);
        if (Data.length > 0) {
            FetchData();
            // window.location.reload();
        }
    }

    const getClinicModalData = async (item) => {
        setdocData(item);
        setopenclinicmodal(true);
    }


    return (
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={show}
                onClose={handleClosemodal}
                aria-labelledby="max-width-dialog-title"
                style={{ height: 550 }}
            >
                <DialogContent>

                    <DialogTitle id="alert-dialog-title" >
                        <IconButton edge="start" onClick={handleClosemodal} color="inherit" aria-label="close" style={{ float: 'right', color: '#2C7FB2' }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>

                    {Data.length > 0 ?
                        <>
                            <Grid container spacing={2} style={{ height: 250, overflowY: 'auto' }}>
                                {Data.map((item) => {
                                    return (
                                        <>
                                            <Grid item sm={2} >
                                                <div style={{ marginTop: 10 }}>
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
                                                            {item.ReportTitle}
                                                        </Typography>
                                                    </center>
                                                </div>
                                                <Paper spacing={2} elevation={2} className={classes.groupreports} >
                                                    <center>
                                                        <IconButton edge="start" size='small' aria-label="close" style={{ marginTop: '-15px', float: 'right', color: '#da3d3d' }}>
                                                            <DeleteForeverOutlinedIcon size='small' onClick={() => DeleteReport(item.id)} />
                                                        </IconButton>
                                                        {/* <IconButton edge="start" size='small' aria-label="close" style={{ marginTop: '-15px', float: 'right', color: 'black', marginRight: 30 }}>
                                                            <IosShareIcon size='small' onClick={() => getClinicModalData(item)} />
                                                        </IconButton> */}
                                                        {item.ReportImage ?
                                                            <img onClick={() => window.open(item.ReportImage, '_blank')} style={{ height: 120, width: '100%' }} src={item.ReportImage} onError={({ currentTarget }) => {
                                                                currentTarget.onerror = null; // prevents looping
                                                                currentTarget.src = "default-pdf-image.jpg";
                                                            }} /> :
                                                            null}
                                                    </center>
                                                </Paper>
                                            </Grid>
                                        </>
                                    )
                                })
                                }
                            </Grid>
                        </>
                        :
                        <>
                            <Grid container spacing={2} style={{ paddingTop: 20, height: 355, overflowY: 'auto' }}>
                                <Grid item sm={12} >
                                    <div>
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
                                            No Records Found
                                        </Typography>
                                    </div>
                                    <Paper spacing={2} elevation={3} className={classes.groupreports} >
                                        <center>
                                            <img src="default-image.png" style={{ height: '120px', width: '100%' }} />
                                        </center>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </>}
                        {openclinicmodal ? <Get_Lab_Clinics show={openclinicmodal} data={data} handleclose={() => setopenclinicmodal(false)} /> : null}

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
    groupreports: {

        width: 90,
        borderRadius: 10,
    },
}));