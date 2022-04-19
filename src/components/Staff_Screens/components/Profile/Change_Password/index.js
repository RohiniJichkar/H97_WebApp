import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, IconButton, DialogContent, DialogTitle, DialogContentText, Grid, TextField, Button } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import { transparent } from 'material-ui/styles/colors';
import { change_password } from '../../../../../Apis/Staff/Profile/index';

const drawerWidth = 240;

export const Change_Password = ({ show, data, handlemodal }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [maxWidth, setMaxWidth] = useState('sm');
    const [fullWidth, setFullWidth] = useState(true);
    const [showPassword, setshowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);

    const [currentpass, setcurrentpass] = useState('');
    const [newpass, setnewpass] = useState('');
    const [confirmpass, setconfirmpass] = useState('');
    console.log(data)
    const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setshowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };


    const changePassword = async () => {

        if (newpass == confirmpass) {
            const obj = {
                UserId: data.UserId,
                CurrentPassword: currentpass,
                NewPassword: newpass,
                ConfirmPassword: confirmpass
            }
            const changepass = await change_password(obj);
            let parse = JSON.parse(changepass);
            if (parse.success === "200") {
                alert(parse.message);
                handlemodal()
            }
        } else {
            alert('New Password & Confirm Password does not Match');
        }

}

return (
    <>
        <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={show}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Change Password"}
                <IconButton edge="start" color="inherit" onClick={() => handlemodal(false)} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Grid container>
                        <Grid item xs={12} sm={12}>
                            <center>
                                <TextField size='small' className={classes.inputFields} onChange={(e) => setcurrentpass(e.target.value)} id="outlined-basic" label="Current Password" variant="outlined" />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    className={classes.inputFields}
                                    id="password"
                                    required
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    size='small'
                                    onChange={(e) => setnewpass(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    className={classes.inputFields}
                                    id="password"
                                    required
                                    label="Password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    size='small'
                                    onChange={(e) => setconfirmpass(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownConfirmPassword}
                                                >
                                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Grid container xs={12} style={{ marginTop: 5 }}>
                                    <Grid item sm={6} >
                                        <Button className={classes.btnregister} onClick={() => handlemodal(false)} style={{ float: 'right', marginRight: 20 }}>Cancel</Button>
                                    </Grid>
                                    <Grid item sm={6} >
                                        <Button onClick={() => changePassword()} className={classes.btnregister} style={{ float: 'left', marginLeft: 20 }}>Save</Button>
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