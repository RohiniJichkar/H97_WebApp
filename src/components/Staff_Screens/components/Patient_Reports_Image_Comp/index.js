import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, IconButton, DialogContent, DialogActions, DialogTitle, DialogContentText, Typography, List, ListItemText, ListItem, Divider, Paper, Grid } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { getReportsByTitle, DeleteReportsByTitle, DeleteReportsById } from '../../../../Apis/Staff/Patient_Reports/index';
import { transparent } from 'material-ui/styles/colors';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

const drawerWidth = 240;

export const PatientReportImages = ({ show, data, handleClosemodal }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [Data, setData] = useState([]);
    const [maxWidth, setMaxWidth] = useState('sm');
    const [fullWidth, setFullWidth] = React.useState(true);

    useEffect(() => {
        FetchData();
    }, []);

    const FetchData = async () => {
        const request = await getReportsByTitle(data.UserId, data.ReportTitle);
        setData(request);
    }


    const DeleteReport = async (id) => {
        const request = await DeleteReportsById(id)
        if (Data.length > 0) {
            FetchData();
            window.location.reload();
        }
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
                                                {/* <div style={{ marginTop: 10 }}>
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
                                                </div> */}
                                                <Paper spacing={2} elevation={2} className={classes.groupreports} >
                                                    <center>
                                                        <IconButton edge="start" size='small' aria-label="close" style={{ marginTop: '-15px', float: 'right', color: '#da3d3d' }}>
                                                            <DeleteForeverOutlinedIcon size='small' onClick={() => DeleteReport(Data[0].id)} />
                                                        </IconButton>
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

                    {/* <Grid container spacing={2} style={{ paddingTop: 20, height: 355, overflowY: 'auto' }}>
                        {Data.length > 0 ?
                            Data.map((item) => {
                                return (
                                    <>
                                        <Grid item sm={2} >
                                            <Paper elevation={3} className={classes.groupreports} >
                                                <center>
                                                    <IconButton edge="start" size='small' aria-label="close" style={{ marginTop: '-15px', float: 'right', color: 'gray' }}>
                                                        <DeleteIcon size='small' onClick={() => DeleteReport(Data[0].id)} />
                                                    </IconButton>
                                                    {item.ReportImage ?
                                                        <img onClick={() => window.open(item.ReportImage, '_blank')} style={{ height: 150, width: '100%' }} src={item.ReportImage} onError={({ currentTarget }) => {
                                                            currentTarget.onerror = null; // prevents looping
                                                            currentTarget.src = "default-pdf-image.jpg";
                                                        }} /> :
                                                        null}
                                                </center>
                                            </Paper>
                                        </Grid> */}

                    {/* <ListItem button>
                                            <ListItemText>
                                                <div>
                                                    <IconButton edge="start" size='small' aria-label="close" style={{ marginTop: '-15px', float: 'right', color: 'gray' }}>
                                                        <DeleteIcon onClick={() => DeleteReport(Data[0].id)} size='small' />
                                                    </IconButton>
                                                    <ListItemText>{item.ReportTitle}</ListItemText>
                                                </div>
                                                {item.ReportImage ?
                                                    <img onClick={() => window.open(item.ReportImage, '_blank')} style={{ height: 150, width: '100%' }} src={item.ReportImage} onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null; // prevents looping
                                                        currentTarget.src = "default-pdf-image.jpg";
                                                    }} /> :
                                                    null}
                                            </ListItemText>
                                        </ListItem> */}
                    {/* <Divider style={{ border: '1px solid gray' }} /> */}
                    {/* </>
                                )
                            })

                            : <>
                                <Grid container spacing={2} style={{ paddingTop: 20, height: 355, overflowY: 'auto' }}>
                                    <Grid item sm={2} >
                                        <Paper elevation={3} className={classes.groupreports} >
                                            <center>
                                                <img src="default-image.png" style={{ height: '120px', width: '100%' }} />
                                            </center>
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
                                                    No Records Found
                                                </Typography>
                                            </center>
                                        </Paper>
                                    </Grid>
                                </Grid> */}
                    {/* <ListItemText>
                                    <div>
                                        <ListItemText style={{ fontSize: 16, fontFamily: 'Poppins', fontWeight: 400, color: '#2C7FB2' }}>No Records Found</ListItemText>
                                    </div>
                                    <img src="default-image.png" style={{ height: 180, width: '100%' }} />
                                </ListItemText> */}
                    {/* </>

                        }
                    </Grid> */}
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