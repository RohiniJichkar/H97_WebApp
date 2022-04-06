import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField, Typography, Select, FormControl, Button, IconButton, Grid } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { AddTips } from '../../../Admin_Apis/Tips';

const drawerWidth = 240;

const Add_Tips = ({ show, handleclose }) => {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const [category, setcategory] = useState('');
    const [file, setfile] = useState(null);
    const [Files, setFile] = useState(undefined);


    const api_add_tips = async () => {

        // if (title == '') {
        //     alert('Please Enter Title');
        //     return;
        // }
        // else if (category == '') {
        //     alert('Please Choose Category');
        //     return;
        // }
        // else if (description == '') {
        //     alert('Please Enter Description');
        //     return;
        // }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('Title', title);
        formData.append('DoctorId', '183664111');
        formData.append('ClinicId', '245122166');
        formData.append('Discription', description);
        formData.append('Category', category);

        console.log(formData)

        try {
            const add_service = await AddTips(formData);
            let parse = JSON.parse(add_service);
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
                    <DialogContentText id="alert-dialog-description">
                        <Grid container item xs={12} style={{ marginRight: -40, marginLeft: -40 }} >

                            <Grid item xs={6}>
                                <Typography variant="h6" noWrap={true}
                                    style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins',
                                        fontStyle: 'normal',
                                        color: '#707070',
                                        fontWeight: 600,
                                        textAlign: 'center',

                                    }}>
                                    Title:
                                </Typography>
                            </Grid>

                            <Grid item xs={6} >
                                <TextField id="outlined-basic" size="small" label=""
                                    value={title}
                                    onChange={(e) => settitle(e.target.value)}
                                    variant="outlined"
                                    style={{ width: '100%' }} />
                            </Grid>

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
                                    Category:
                                </Typography>

                            </Grid>

                            <Grid item xs={6} >

                                <FormControl variant="outlined" size='small' className={classes.formControl}  >
                                    <Select
                                        className={classes.inputFields}
                                        value={category}
                                        onChange={(e) => setcategory(e.target.value)}
                                        native
                                        size='small'
                                        label="category"
                                        inputProps={{
                                            name: 'category',
                                            id: 'outlined-category-native-simple',
                                        }}
                                        style={{ width: '185%', marginTop: 20, fontWeight: 500, fontFamily: 'Poppins', fontSize: 15 }}
                                    >
                                        <option aria-label="None" value="" >Category</option>
                                        <option value='Pregnancy'>Pregnancy</option>
                                        <option value='Health'>Health</option>
                                        <option value='Eye Care'>Eye Care</option>
                                        <option value='Dental'>Dental</option>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>

                                <Typography variant="h6" noWrap={true} style={{
                                    fontSize: 16,
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    color: '#707070',
                                    fontWeight: 600,
                                    textAlign: 'center',

                                }}>
                                    Description:
                                </Typography>

                            </Grid>

                            <Grid item xs={6} >

                                <TextField id="outlined-basic" size="small"
                                    value={description}
                                    onChange={(e) => setdescription(e.target.value)}
                                    multiline
                                    rows={5}
                                    rowsMax={7}
                                    variant="outlined"
                                    style={{ width: '100%' }} />
                            </Grid>

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

                            <Grid item xs={6} >

                                <TextField id="outlined-basic" name="file" type="file" size="small" label=""
                                    onChange={e => {
                                        setfile(e.target.files[0])
                                        setFile(URL.createObjectURL(e.target.files[0]));
                                    }}
                                    variant="outlined"
                                    style={{ float: 'right', width: '100%', marginTop: 20 }} />
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
                                <Button className={classes.btnregister} onClick={api_add_tips} style={{ float: 'left', marginLeft: 20 }}>
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
            width: '30ch',
            height: '30px'
        },
        border: '1px solid lightgray',
        borderRadius: 20,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 11,
        color: 'gray'
    },
    btnview: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 25,
        paddingLeft: 35,
        paddingRight: 35,
        float: 'right'
    },
    headingAddMedicine: {
        color: '#00318B !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    inputFields: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 200,
        marginBottom: 20
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
    btnCancle: {
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

export default Add_Tips;
