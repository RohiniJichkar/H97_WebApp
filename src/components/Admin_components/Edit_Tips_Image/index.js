import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField, Typography, Button, IconButton, Grid } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { EditImage } from '../../../Admin_Apis/Tips';

const drawerWidth = 240;

const Edit_Tips_Image = ({ show, data, handleclose }) => {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const [file, setfile] = useState(null);
    const [Files, setFile] = useState(undefined);


    const api_edit_image = async () => {

        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', data.id);

        try {
            const editimage = await EditImage(formData);
            let parse = JSON.parse(editimage);
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
                <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Edit Image"}
                    <IconButton edge="start" color="inherit" onClick={handleclose} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container item xs={12} style={{  }} >

                            <Grid item xs={6}>

                                <Typography variant="h6" noWrap={true} style={{
                                    fontSize: 16,
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    color: '#707070',
                                    fontWeight: 600,
                                    textAlign: 'center',
                                    marginTop: 20

                                }}>
                                    Image:
                                </Typography>

                            </Grid>

                            <Grid item xs={6} style={{paddingRight: 100}}>

                                <TextField id="outlined-basic" name="file" type="file" size="small" label=""
                                    onChange={e => {
                                        setfile(e.target.files[0])
                                        setFile(URL.createObjectURL(e.target.files[0]));
                                    }}
                                    variant="outlined"
                                    style={{ marginTop: 20, width: '150%' }} />
                            </Grid>

                        </Grid>
                        <Grid item xs={12}>
                            <center>
                                <img src={Files} style={{ maxWidth: "100%", maxHeight: 300, marginTop: 10 }}></img>
                            </center>
                        </Grid>

                        <Grid container>
                            <Grid xs={12} sm={6}>
                                <Button className={classes.btnregister} onClick={handleclose} style={{ float: 'right', marginRight: 20 }}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <Button className={classes.btnregister} onClick={api_edit_image} style={{ float: 'left', marginLeft: 20 }}>
                                    Edit
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
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
    formControl: {
        minWidth: 150,
    },
    btnAdd: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
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

export default Edit_Tips_Image;
