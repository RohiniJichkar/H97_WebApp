import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Avatar, Select, FormControl, InputLabel, Radio, Dialog, Box, IconButton, DialogContent, DialogContentText, DialogTitle, TextField, Typography, Button, InputBase, Grid, Paper, Slide } from "@material-ui/core";
import AdminNavbar from './Admin_Navbar';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';


import ip from '../ipaddress/ip';
import Edit_Lab from './Admin_components/Edit_Labs';
import Delete_Labs from './Admin_components/Delete_Labs';
import Admin_Lab from './Admin_components/Admin_Labs';

const drawerWidth = 240;

const columns = [
    {
        field: 'LabName',
        headerName: 'Full name',
        sortable: false,
        width: 200,
        headerClassName: 'super-app-theme--header',
        // valueGetter: (params) =>
        //     `${params.getValue(params.id, 'FirstName') || ''} ${params.getValue(params.id, 'LastName') || ''
        //     }`,
    },
    {
        field: 'LabMobileNo',
        headerName: 'Contact No',
        headerClassName: 'super-app-theme--header',
        width: 160,
        editable: true,
    },
];


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Admin_Lab_Details() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [openmodal, setOpenmodal] = React.useState(false);
    const [labData, setlabData] = useState([]);
    const [Labdetails, setLabdetails] = useState('');
    const [editmodal, seteditmodal] = useState(false);
    const [search, setsearch] = useState('');

    const fetchLabData = async () => {
        try {
            const labInfo = await axios.post(ip + 'Web_GetLab');
            setlabData(labInfo?.data?.Lab);
        } catch (error) {
            console.log(error);
        }
    }

    const handleOpenDeleteModal = () => {
        if (Labdetails != '') {
            setOpenDeletemodal(true);
        } else {
            alert('Please Select Lab from List');
        }
    };


    const searchLab = async (search) => {
        try {
            const searchInfo = await axios.post(ip + 'Web_SearchLab', { searchText: search });
            setlabData(searchInfo?.data?.Lab);
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleOpenEditModal = () => {
        if (Labdetails != '') {
            seteditmodal(true);
        } else {
            alert('Please Select Lab from List');
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchLabData();
        }, 2000);
        return () => clearInterval(interval);
    }, []);


    const handleCellClick = async (id) => {
        setLabdetails(id);
    }

    const [opendeletemodal, setOpenDeletemodal] = React.useState(false);

    const handleGoBack = () => {
        navigate("/AdminDashboard");
    };


    return (
        <div className={classes.root} style={{ backgroundColor: '#ffffff' }}>
            <AdminNavbar />

            {/* main grid */}
            <Grid container spacing={2}
                className={clsx(classes.grid, {
                    [classes.gridShift]: open,
                })}
                direction="row"
            >
                <Grid item xs={12}>
                    <Typography variant="h5" noWrap={true}
                        style={{
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',
                        }}>
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Lab
                        <Button className={classes.btnregister} onClick={() => setOpenmodal(true)} style={{ float: 'right', marginRight: 20, width: '100px', fontFamily: 'Poppins', fontSize: 12.5, fontWeight: 400 }}>Add Lab</Button>
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4} >
                    <Paper elevation={6} className={classes.paper} style={{ padding: 30, paddingBottom: 10, height: 428 }}>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <SearchIcon className={classes.searchIcon} />
                                <InputBase
                                    onChange={(e) => setsearch(e.target.value)}
                                    value={search}
                                    placeholder='Search by Name'
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    variant='outlined'
                                    inputProps={{ 'aria-label': 'search' }}
                                    style={{ borderRadius: 15 }}
                                > </InputBase>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Button className={classes.btnview} onClick={() => searchLab(search)} size="small" style={{ fontSize: 12 }}>View</Button>
                            </Grid>

                        </Grid>

                        <Box
                            sx={{
                                '& .super-app-theme--header': {
                                    fontSize: 15,
                                    marginLeft: 10
                                },
                            }}
                        >
                            <DataGrid
                                style={{ height: 340, marginTop: 20, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2', cursor: 'pointer' }}
                                rows={labData}
                                rowHeight={30}
                                columns={columns}
                                columnWidth={10}
                                pageSize={10}
                                onRowClick={(newSelection) => {
                                    handleCellClick(newSelection.row)
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid>


                <Grid item xs={12} sm={8} >
                    <Paper className={classes.paper} elevation={6} style={{ marginLeft: 25, marginRight: 20 }}>
                        <Typography variant="h6" noWrap={true} style={{
                            fontSize: 18, color: '#2C7FB2', fontFamily: 'Poppins', textDecorationLine: 'underline', textUnderlineOffset: '1px', textDecorationThickness: '1px',
                            fontStyle: 'normal',

                        }}>
                            Profile
                        </Typography>
                        <center>
                            <div style={{ paddingBottom: 0, height: 84, position: 'relative', bottom: 15 }}>
                                {Labdetails[0] ? Labdetails[0].Logo ? <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} src={Labdetails[0].Logo} /> : Labdetails[0].Gender == 'Female' ? <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} src='recepicon.png' /> :
                                    <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} src='doctoricon.png' /> : <Avatar style={{ borderRadius: 50, height: 100, width: 100 }} />
                                }
                            </div>

                            <Typography variant="h6" noWrap={true} style={{
                                fontSize: 16,
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                color: '#707070',
                                fontWeight: 600
                            }}>
                                {Labdetails ? Labdetails.NmTitle : ""} {Labdetails ? Labdetails.FirstName : "NA"} {Labdetails ? Labdetails.LastName : ""}
                            </Typography>
                            <Typography variant="h6" noWrap={true} style={{
                                fontSize: 14,
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                color: '#707070',
                                fontWeight: 400
                            }}>
                                UID- {Labdetails ? Labdetails.UserId : ''}
                            </Typography>
                            <Grid container xs={12} style={{ paddingTop: 15 }}>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Lab Name
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {Labdetails ? Labdetails.LabName : "NA"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        MobileNo
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', marginLeft: 10, marginRight: 10, fontFamily: 'Poppins', }}>
                                        {Labdetails ? Labdetails.LabMobileNo : "NA"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Email
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {Labdetails ? Labdetails.LabEmail : "NA"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Registration No
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {Labdetails ? Labdetails.LabRegistrationNumber : 'NA'}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container xs={12}>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderTop: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        GST Number
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        {Labdetails ? Labdetails.LabGstNumber : "NA"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', borderTop: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Address
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', marginLeft: 10, marginRight: 10 }}>
                                        {Labdetails ? `${Labdetails.LabAddress}` : "NA"}{Labdetails.LabCity ? `, ${Labdetails.LabCity}` : ' '}{Labdetails.LabState ? `, ${Labdetails.LabState}` : ''}{Labdetails.LabCountry ? `, ${Labdetails.LabCountry}` : ''}{Labdetails.LabPincode ? `, ${Labdetails.LabPincode}` : ''}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid #F0F0F0', borderLeft: '0px', borderTop: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Shift Timing
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontFamily: 'Poppins', marginLeft: 10, marginRight: 10 }}>
                                        {Labdetails ? Labdetails.LabMorningStartTime ? Labdetails.LabMorningStartTime : Labdetails.LabMorningStartTime : null} - {Labdetails ? Labdetails.LabMorningEndTime ? Labdetails.LabMorningEndTime : Labdetails.LabMorningEndTime : null}
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontFamily: 'Poppins', marginLeft: 10, marginRight: 10 }}>
                                        {Labdetails ? Labdetails.LabEveningStartTime !== null ? Labdetails.LabEveningStartTime : '' : null} - {Labdetails ? Labdetails.LabEveningEndTime !== null ? Labdetails.LabEveningEndTime : '' : null}
                                    </Typography>
                                </Grid>
                            </Grid>



                            <Grid container xs={12} style={{ marginTop: 15 }}>
                                <Grid item sm={6} >
                                    <Button className={classes.btnregister} onClick={() => handleOpenDeleteModal()} style={{ float: 'right', marginRight: 20 }}>Delete</Button>
                                </Grid>
                                <Grid item sm={6} >
                                    <Button className={classes.btnregister} onClick={() => handleOpenEditModal()} style={{ float: 'left', marginLeft: 20 }}>Edit</Button>
                                </Grid>
                            </Grid>

                        </center>
                    </Paper>

                </Grid>

                {editmodal ? <Edit_Lab show={editmodal} data={Labdetails} handleCloseEditmodal={() => seteditmodal(false)} /> : null}

                {/* Add new staff */}


                {/* Edit Details  */}

                {/* for Delete User */}
                {openmodal ? <Admin_Lab show={openmodal} handleclose={() => setOpenmodal(false)} /> : null}
                {opendeletemodal ? <Delete_Labs show={opendeletemodal} data={Labdetails} handleclose={() => setOpenDeletemodal(false)} /> : null}


            </Grid> {/* main grid */}

        </div >
    );
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
        // [`& fieldset`]: {
        //     borderRadius: 25,
        // },
        width: 300,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 200,
        marginBottom: 20
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
        fontSize: '11px'
    },
    formControlForm: {
        paddingBottom: theme.spacing(2.5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    textFieldForm: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 11,
    },
}));