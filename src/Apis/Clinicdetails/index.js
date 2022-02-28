import React, { useState } from "react";
import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField, Slide, Select, FormControl, Button, IconButton, Grid, InputLabel, Radio, Typography, Paper, Link } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';

import { UploadClinicdetail } from "../Clinic_Services/index";

export default function ClinicDetails({ show, handleCloseEditmodal }) {
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [file, setfile] = useState();
    const [Files, setFile] = useState(undefined);
    const classes = useStyles();

    const fetchClinic = async () => {
        var cdata = await localStorage.getItem("userdata");
        let parsed = JSON.parse(cdata);
        let clinicid = parsed.ClinicId;

        const formdata = new FormData();
        formdata.append("file", file);
        //formdata.append("id", data.id);
        formdata.append("ClinicId", clinicid);

        // data.append("ClinicId", clinicid);
        const addclinicservice = await UploadClinicdetail(formdata);

        let parse = JSON.parse(addclinicservice);
        if (parse.success === "200") {
            alert(parse.message);
            window.location.reload()
        }
    }

    return (
        <>
            <Dialog
                open={show}
                onClose={handleCloseEditmodal}
                maxWidth={maxWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Upload Clinic Details"}
                    <IconButton edge="start" color="inherit" onClick={handleCloseEditmodal} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container>
                            <Grid item xs={6}>
                                <center>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600,
                                        alignItems: 'center',

                                    }}>
                                        Logo:
                                    </Typography>
                                </center>
                            </Grid>

                            <Grid item xs={6} style={{ paddingRight: 80 }}>

                                <TextField id="outlined-basic" name="file" type="file" enctype="multipart/form-data" size="small" label=""
                                    onChange={e => {
                                        const file = e.target.files[0];
                                        setFile(URL.createObjectURL(e.target.files[0]));
                                        setfile(file)
                                    }} variant="outlined"
                                    style={{ float: 'left', width: '150%' }} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <center>
                                <img src={Files} style={{ maxWidth: "100%", maxHeight: 300, marginTop: 10 }}></img>
                            </center>
                        </Grid>

                        <Grid container>
                            <Grid xs={12} sm={6}>
                                <Button className={classes.btnregister} onClick={handleCloseEditmodal} style={{ float: 'right', marginRight: 20 }}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <Button className={classes.btnregister} onClick={fetchClinic} autoFocus style={{ float: 'left', marginLeft: 20 }}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}


const drawerWidth = 240;

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
        padding: theme.spacing(3),
        color: '#78B088',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 800,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    grid: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginTop: 70,
        marginLeft: 25,
        marginRight: 1
    },
    gridShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    griditem: {
        color: '#2C7FB2',
    },
    paperServices: {
        padding: theme.spacing(1),
        color: '#00318B',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 800,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        textAlign: 'center',

    },
    gridServices: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 800,
        textAlign: 'center',

    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 800,
    },
    searchIcon: {
        paddingTop: 10,
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "gray",
    },
    inputRoot: {
        color: 'inherit',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 200,
    },
    inputInput: {
        padding: theme.spacing(0, 0, 0, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '25ch',
            height: '30px'
        },
        border: '1px solid lightgray',
        borderRadius: 20,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 200,
        fontSize: 11
    },
    btnview: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
    },
    headingAddMedicine: {
        paddingTop: 20,
        alignItems: 'center',
        color: '#2C7FB2 !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    inputFields: {
        [`& fieldset`]: {
            borderRadius: 25,
        },
        width: 300,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 200,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
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
        height: 140,
        width: 250,
        borderRadius: 20,
        float: 'right'
    },
    btnUpload: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
        marginBottom: 10,
        marginTop: 20
    },
    textField: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        textAlign: 'center',
        width: '70%',
        marginTop: 15
    },
    facilitiesTitle: {
        fontSize: 16,
        color: '#00318B !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        padding: 2
    },
    facilitiesInput: {
        fontSize: 14,
        color: '#00318B !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 600,
        padding: 2,
    },
    description: {
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,

        color: 'gray',
        border: '1px solid #F0F0F0',
    },
    btnregister: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        marginTop: 10,
        fontSize: '12px'
    },

}));