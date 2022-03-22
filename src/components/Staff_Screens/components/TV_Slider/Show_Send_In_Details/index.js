import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, IconButton, DialogContent, FormControl, Select, DialogTitle, DialogContentText, Typography, Grid, TextField, Button, Avatar } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { transparent } from 'material-ui/styles/colors';
import { TailSpin } from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Slider from "react-slick";
const drawerWidth = 240;

export const Show_Send_In_Details = ({ show, data, handlemodal }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [maxWidth, setMaxWidth] = useState('sm');
    const [fullWidth, setFullWidth] = React.useState(true);
    return (
        <>
            <Dialog
                fullScreen
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={show}
                style={{alignItems:'center',justifyContent:'center'}}
                // BackdropProps={{ invisible: true }}
                // PaperProps={{
                //     style: {
                //         backgroundColor: 'transparent',
                //         boxShadow: 'none',
                //     },
                // }}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div style={{marginTop:150}}>
                            <Slider dots={true} autoplay={true}>
                                {data.length != 0 ?
                                    data.map((item) => (
                                        <center>
                                            <div key={item.id}>
                                                <Avatar style={{ borderRadius: 150, height: 70, width: 70 }} />
                                            </div>
                                            <Grid item xs={12}
                                                style={{
                                                    marginTop: 20
                                                }}
                                            >
                                                <center>
                                                    <h1 style={{
                                                        fontFamily: "Poppins",
                                                        color: '#78B088',
                                                        fontWeight: 600
                                                    }}>{item.FirstName} {item.LastName}</h1>
                                                </center>
                                            </Grid>
                                            <Grid item xs={12}
                                                style={{
                                                    marginTop: 20
                                                }}
                                            >
                                                <center>
                                                    <h3
                                                        style={{
                                                            fontFamily: "Poppins",
                                                            color: '#2C7FB2',
                                                        }}
                                                    >Now it's your turn please visit</h3>
                                                    <h3
                                                        style={{
                                                            marginTop:50,
                                                            fontFamily: "Poppins",
                                                            color: '#2C7FB2',
                                                            fontWeight:600
                                                        }}
                                                    >Dr.{item.DFName} {item.DLName}</h3>
                                                </center>
                                            </Grid>
                                        </center>
                                    ))
                                    :
                                    <>
                                        <center>
                                            <h4 style={{
                                                fontFamily: "Poppins",
                                                color: '#78B088',
                                                fontWeight: 600
                                            }}>No Patient</h4>
                                        </center>
                                    </>
                                }
                            </Slider>
                            {/* <div>
                                        <center>
                                            {data.ProfileImage ?
                                                <Avatar src={data.ProfileImage} style={{ borderRadius: 150, height: 70, width: 70 }} />
                                                : <Avatar style={{ borderRadius: 150, height: 70, width: 70 }} />}
                                        </center>
                                        <Grid item xs={12}
                                            style={{
                                                marginTop: 20
                                            }}
                                        >
                                            <center>
                                                <h4 style={{
                                                    fontFamily: "Poppins",
                                                    color: '#78B088',
                                                    fontWeight: 600
                                                }}>{data.FirstName} {data.LastName}</h4>
                                            </center>
                                        </Grid>
                                        <Grid item xs={12}
                                            style={{
                                                marginTop: 20
                                            }}
                                        >
                                            <center>
                                                <h3
                                                    style={{
                                                        fontFamily: "Poppins",
                                                        color: '#2C7FB2',
                                                    }}
                                                >Now it's your turn please go for the treatment</h3>
                                            </center>
                                        </Grid>
                                    </div> */}
                            {/* <TailSpin color="#2C7FB2" height={80} width={80} /> */}
                        </div>
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