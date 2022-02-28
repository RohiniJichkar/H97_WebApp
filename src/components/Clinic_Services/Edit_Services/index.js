
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Container, FormControl, InputLabel, TextField, Typography, Button, Slide, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableContainer, TableBody, TableCell, TableHead, InputBase, TableRow, TablePagination, Drawer, Divider, MenuItem, Menu, ListItem, ListItemIcon, ListItemText, List, IconButton, Grid, Paper, Link } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

import { Edit_Services } from '../../../Apis/Clinic_Services/index';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Edit_Service_Details = ({ show, data, handleclose }) => {
    console.log(data)
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();

    const [maxWidth, setMaxWidth] = React.useState('md');
    const [ServiceName, setServiceName] = useState(data.ServiceName)
    const [Category, setCategory] = useState(data.Category)
    const [cost, setcost] = useState(data.Price)
    const [Discount, setDiscount] = useState(data.Discount);
    const [Description, setDescription] = useState(data.Description)

    const Edit = async (id, Userid, ClinicID, ServiceName, Category, Cost, Discount, Description) => {
        try {
            const request = await Edit_Services(id, Userid, ClinicID, ServiceName, Category, Cost, Discount, Description)
            let response=JSON.parse(request);
            if(response.success=='200'){
                alert(response.message)
                handleclose();
                window.location.reload();
            }
            else{
                alert(request.message)
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
                <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Edit Services"}
                    <IconButton edge="start" color="inherit" onClick={handleclose} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container>
                            <Grid item xs={12}>
                                <center>
                                    <TextField value={ServiceName} onChange={(e) => setServiceName(e.target.value)} className={classes.textField} id="outlined-basic" size="small" variant="outlined" style={{ marginTop: 0 }} />
                                </center>
                                <center>
                                    <TextField value={Category} onChange={(e) => setCategory(e.target.value)} className={classes.textField} id="outlined-basic" size="small" variant="outlined" />
                                </center>
                                <center>
                                    <TextField value={cost} onChange={(e) => setcost(e.target.value)} className={classes.textField} id="outlined-basic" type="number" size="small" variant="outlined" />
                                </center>
                                <center>
                                    <TextField value={Discount} onChange={(e) => setDiscount(e.target.value)} className={classes.textField} id="outlined-basic" type="number" size="small" variant="outlined" />
                                </center>
                                <center>
                                    <TextField
                                        className={classes.textField}
                                        value={Description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        multiline={true}
                                        rows={2}
                                        rowsMax={10} id="outlined-basic" size="small" variant="outlined"
                                    />
                                </center>
                            </Grid>
                            <Grid container>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnregister} onClick={handleclose} style={{ float: 'right', marginRight: 20 }}>
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnregister} onClick={() => Edit(data.id, data.DoctorId, data.ClinicId, ServiceName, Category, cost, Discount, Description)} autoFocus style={{ float: 'left', marginLeft: 20 }}>
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </>
    )
}

export default Edit_Service_Details

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