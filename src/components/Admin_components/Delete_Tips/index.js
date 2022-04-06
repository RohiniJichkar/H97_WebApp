import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Button, IconButton, Grid } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { DeleteTips } from '../../../Admin_Apis/Tips';

const drawerWidth = 240;

const Delete_Tips = ({ show, data, handleclose }) => {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const api_delete_tips = async (id) => {

        try {
            const delete_tips = await DeleteTips(id);
            let parse = JSON.parse(delete_tips);
            if (parse.success === "200") {
                alert(parse.message);
                window.location.reload()
            } else {
                alert(parse.message);
            }

        } catch (e) {
            console.log(e)
        }

    }

    return (
        <>
            <Dialog
                open={show}
                maxWidth={maxWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Add Tips"}
                    <IconButton edge="start" color="inherit" onClick={handleclose} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" style={{ fontFamily: 'Poppins', fontWeight: 400, color: '#707070' }}>
                        Do you want to Delete Tips?
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ marginTop: 20 }}>
                    <Button className={classes.btnregister} onClick={handleclose} style={{ width: 100 }} >
                        No
                    </Button>
                    <Button className={classes.btnregister} onClick={() => api_delete_tips(data.id)} style={{ width: 100 }}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
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
}))

export default Delete_Tips;
