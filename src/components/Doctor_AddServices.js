import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { TextField, Typography, Button, Slide, DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog, InputBase, IconButton, Grid, Paper } from "@material-ui/core";
import DoctorNavbar from './Doctor_Navbar';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import { DataGrid } from '@material-ui/data-grid';
import { Services, Add_Services, Search_service } from '../Apis/Clinic_Services/index';
import Delete_Service from './Clinic_Services/Delete_Service/index';

const drawerWidth = 240;

const columns = [
    {
        field: 'ServiceName',
        headerName: 'ServiceName',
        width: 190,
        editable: true,
    },
    {
        field: 'Price',
        headerName: 'Price',
        width: 140,
        editable: true,
    },
    {
        field: 'Discount',
        headerName: 'Discount',
        width: 140,
        editable: true,
    },
    {
        field: 'DiscountPrice',
        headerName: 'Total Price',
        width: 150,
        editable: true
    },
    {
        field: "Action",
        width: 130,
        sortable: false,

        RenderCell: (params) => {
            const onClickDelete = async () => {
                return alert("Are you Sure!! Do you want to delete service");
            };
            const [opendeletemodal, setopendeletemodal] = useState(false)
            return (
                <>
                    {opendeletemodal ? <Delete_Service show={opendeletemodal} data={params.row} handleclose={() => setopendeletemodal(false)} /> : null}
                    <IconButton color="secondary" onClick={() => setopendeletemodal(true)} style={{ color: '#707070' }}>
                        <DeleteIcon />
                    </IconButton>

                </>
            );
        }
    },
];


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
        fontFamily: 'Poppins',
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
        fontFamily: 'Poppins',
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
        fontFamily: 'Poppins',
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
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: 14,
        fontWeight: 600,

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
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 200,
        float: 'left'
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
        color: '#707070',
        border: '1px solid lightgray',
        borderRadius: 20,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 13,
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
        fontFamily: 'Poppins',
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
        fontFamily: 'Poppins',
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
        width: 130,
    },
    groupreports: {
        height: 120,
        width: 100,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#00318B',
        paddingTop: 50,
        borderRadius: 20,
        marginLeft: 20
    },
    btnUpload: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
        marginBottom: 10,
        marginTop: 20
    },
    textField: {
        // [`& fieldset`]: {
        //     borderRadius: 25,
        // },
        padding: 8,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        textAlign: 'center',
        width: '100%'
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DoctorAddServices() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [serviceData, setserviceData] = React.useState([]);
    const [serviceName, setserviceName] = useState('');
    const [price, setprice] = useState('');
    const [discount, setdiscount] = useState('');
    const [category, setcategory] = useState('');
    const [description, setdescription] = useState('');
    const [seriveImage, setserviceImage] = useState(null);
    const [searchterm, setsearchterm] = useState('');

    const fetchServices = async () => {
        const services = await Services();
        setserviceData(services);
    }

    const AddService = async () => {

        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        let doctorid = parsed.userid;

        const formData = new FormData();
        formData.append('file', seriveImage);
        formData.append('ServiceName', serviceName);
        formData.append('DoctorId', doctorid);
        formData.append('ClinicId', clinicid);
        formData.append('Price', price);
        formData.append('Category', category);
        formData.append('Discount', discount);
        formData.append('Description', description);

        try {
            const add_service = await Add_Services(formData);
           
                let parse = JSON.parse(add_service);
                if (parse.success === "200") {
                    alert(parse.message);
                    window.location.reload()
                }else{
                    alert(parse.message);
                }
         
        } catch (e) {
            console.log(e)
        }
    }

    const SearchService = async (searchterm) => {
        try {
            const request = await Search_service(searchterm);
            setserviceData(request)
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        fetchServices();
    }, []);


    const handleGoBack = () => {
        navigate("/DoctorClinicServices");
    };

    const [opendeletemodal, setOpenDeletemodal] = React.useState(false);

    const handleClickOpenDeletemodal = () => {
        setOpenDeletemodal(true);
    };

    const handleCloseDeletemodal = () => {
        setOpenDeletemodal(false);
    };

    const handlereload = () => {
        window.location.reload();
    };

    return (
        <div className={classes.root} style={{ backgroundColor: '#ffffff' }}>
            <DoctorNavbar />

            {/* main grid */}
            <Grid container spacing={2}
                className={clsx(classes.grid, {
                    [classes.gridShift]: open,
                })}
                direction="row"
            >
                <Grid item xs={12} >
                    <Typography variant="h5" noWrap={true}
                        style={{
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',

                        }}>
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', borderRadius: 105, fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Add Services
                    </Typography>
                </Grid>

                <Grid item xs={12} container style={{ marginTop: 10 }}>
                    <Grid item xs={12} sm={4} >
                        <Paper className={classes.paper} elevation={6} style={{ paddingBottom: 0 }}>
                            <Typography variant="h7" noWrap={true} style={{

                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                padding: theme.spacing(2),
                                color: '#2C7FB2',
                                fontSize: 16
                            }}
                            >
                                Add Details
                            </Typography>


                            <div style={{ paddingTop: 10 }}>
                                <center>
                                    <TextField className={classes.textField} id="outlined-basic" value={serviceName} onChange={(e) => {
                                        const re = /^[A-Za-z]+$/;
                                        if (e.target.value === '' || re.test(e.target.value)) {
                                            setserviceName(e.target.value)
                                        }
                                    }} size="small" label="Service Name" variant="outlined" />
                                </center>
                                <center>
                                    <TextField className={classes.textField} id="outlined-basic" value={category}
                                        onChange={(e) => {
                                            const re = /^[A-Za-z]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setcategory(e.target.value)
                                            }
                                        }} size="small" label="Category" variant="outlined" />
                                </center>
                                <center>
                                    <TextField className={classes.textField} id="outlined-basic" value={price}
                                        onChange={(e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) { setprice(e.target.value) }
                                        }}
                                        type="number" size="small" label="Cost" variant="outlined" />
                                </center>
                                <center>
                                    <TextField className={classes.textField} id="outlined-basic" value={discount}
                                        onChange={(e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) { setdiscount(e.target.value) }
                                        }}
                                        type="number" size="small" label="Discount" variant="outlined" />
                                </center>
                                <center>
                                    <TextField className={classes.textField} multiline={true}
                                        rows={2}
                                        rowsMax={2} id="outlined-basic" onChange={(e) => setdescription(e.target.value)} size="small" label="Description" variant="outlined"
                                    />
                                </center>
                                <div style={{ marginLeft: 10 }}>
                                    <input type="file" onChange={(e) => setserviceImage(e.target.files[0])} id="serviceimage" style={{ color: '#000' }} />
                                </div>
                            </div>

                            <Grid container style={{ padding: 12 }}>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnregister} onClick={handlereload} style={{ float: 'right', marginRight: 20 }}>
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <Button onClick={AddService} className={classes.btnregister} >Add Service</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={8}>
                        <Paper elevation={6} className={classes.paper} style={{ marginLeft: 25, marginRight: 20 }}>
                            <Grid container spacing={2}>
                                <SearchIcon className={classes.searchIcon} />
                                <InputBase
                                    placeholder='Search by Service Name'
                                    value={searchterm}
                                    onChange={(e) => setsearchterm(e.target.value)}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    variant='outlined'
                                    inputProps={{ 'aria-label': 'search' }}
                                    style={{ borderRadius: 15 }}
                                > </InputBase>
                                <Button className={classes.btnview} onClick={() => SearchService(searchterm)} size="small" style={{ float: 'left', fontSize: 11, textAlign: 'center', marginLeft: 20 }}>View Service</Button>
                            </Grid>
                            <DataGrid
                                style={{ height: 365, marginTop: 20, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2' }}
                                rows={serviceData}
                                rowHeight={30}
                                columns={columns}
                                columnWidth={10}
                                pageSize={10}
                            />
                        </Paper>
                    </Grid>
                </Grid>


                {/* for Delete User */}

                <Dialog
                    open={opendeletemodal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseDeletemodal}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title" style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#00318B' }}>{"Are you sure ?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description" style={{ fontFamily: 'Poppins', fontWeight: 400, color: '#707070' }}>
                            Do you want to Delete Service?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ marginTop: 20 }}>
                        <Button className={classes.btnregister} onClick={handleCloseDeletemodal} style={{ width: 100 }} >
                            No
                        </Button>
                        <Button className={classes.btnregister} onClick={handleCloseDeletemodal} style={{ width: 100 }}>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>


            </Grid> {/* main grid */}

        </div >
    );
}
