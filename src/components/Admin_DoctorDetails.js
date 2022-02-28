import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Slide, Select, FormControl, InputLabel, Typography, Button, Table, TableContainer, TableBody, TableCell, TableHead, InputBase, TableRow, TablePagination, Drawer, Divider, MenuItem, Menu, ListItem, ListItemIcon, ListItemText, List, IconButton, Grid, Paper, Link } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import DoctorNavbar from './Doctor_Navbar';
import SearchIcon from '@material-ui/icons/Search';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

const drawerWidth = 240;

const columns = [

    { id: 'name', label: 'NAME', minWidth: 50 },
    {
        id: 'mobile',
        label: 'MOBILE NO',
        minWidth: 40,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },

];

function createData(name, mobile,) {
    return { name, mobile };
}

const rows = [
    createData('Pradeep Musale', '8977889898',),
    createData('Kirti Virnak', '6784848484',),
    createData('Payal Khodke', '7833674758',),
    createData('Akshaya Kulkarni', '7484949490',),
    createData('Sayali Pingle', '9484859033',),
    createData('Radha Kale', '8977889898',),
    createData('Tushar Chaudhari', '6474889786',),
    createData('Amol Umale', '8977889898',),
    createData('Pradeep Musale', '8977889898',),
    createData('Kirti Virnak', '6784848484',),
    createData('Payal Khodke', '7833674758',),
    createData('Akshaya Kulkarni', '7484949490',),
    createData('Sayali Pingle', '9484859033',),
    createData('Radha Kale', '8977889898',),
    createData('Tushar Chaudhari', '6474889786',),
    createData('Amol Umale', '8977889898',),
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
}));


function renderRow(props) {
    const { index, style } = props;

    return (
        // <List>
        <ListItem button style={style} key={index} >
            <ListItem >
                <ListItemText
                    style={{ borderBottom: '1px solid #F0F0F0' }}
                    primary={`Title : Regular Checkup`}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component={'span'}
                                variant={"body2"}
                                color="textPrimary"
                            >
                                {`Date : 2021-09-11`}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider />
        </ListItem>
        // </List>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AdminDoctorDetails() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const [counterbtn, setCounterBtn] = React.useState(0);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [openmodal, setOpenmodal] = React.useState(false);


    const handleClickOpenmodal = () => {
        setOpenmodal(true);
    };

    const handleClosemodal = () => {
        setOpenmodal(false);
    };

    const [openeditmodal, setOpenEditmodal] = React.useState(false);


    const handleClickOpenEditmodal = () => {
        setOpenEditmodal(true);
    };

    const handleCloseEditmodal = () => {
        setOpenEditmodal(false);
    };


    const [opendeletemodal, setOpenDeletemodal] = React.useState(false);

    const handleClickOpenDeletemodal = () => {
        setOpenDeletemodal(true);
    };

    const handleCloseDeletemodal = () => {
        setOpenDeletemodal(false);
    };

    const handleIncrement = (event) => {
        setCounterBtn(counterbtn + 1);
    };

    const handleDecrement = (event) => {
        setCounterBtn(counterbtn - 1);
    };

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleGoBack = () => {
        navigate("/AdminHome");
    };

    const handlenewregistration = () => {
        navigate("/DoctorPatientRegistration");
    };

    const [gender, setGender] = React.useState("");

    function handleChangedGender(event) {
        setGender(event.target.value);
    }

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
                <Grid item xs={12}>
                    <Typography variant="h5" noWrap={true}
                        style={{
                            fontFamily: '"Poppins", san-serif;',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',
                        }}>
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Doctors

                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4} >
                    <Paper elevation={6} className={classes.paper} style={{ padding: 30, paddingBottom: 10 }}>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <SearchIcon className={classes.searchIcon} />
                                <InputBase
                                    label="Search by Name"
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
                                <Button className={classes.btnview} size="small" style={{ fontSize: 12 }}>View</Button>
                            </Grid>

                        </Grid>

                        <TableContainer style={{ paddingTop: 15 }} >
                            <Table className={classes.tbl} size="small" stickyHeader aria-label="sticky table" >
                                <TableHead >
                                    <TableRow >
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{
                                                    minWidth: column.minWidth,
                                                    backgroundColor: '#78B088',
                                                    color: '#fff',
                                                    fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    fontWeight: 600,
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                }}

                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}

                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {rows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}  >
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align} style={{
                                                                color: '#2C7FB2',
                                                                fontFamily: 'Poppins',
                                                                fontStyle: 'normal',
                                                                fontWeight: 600,
                                                                overflow: 'hidden',
                                                                whiteSpace: 'nowrap',
                                                                textOverflow: 'ellipsis',
                                                                justifyContent: 'center',
                                                                fontSize: 11.5
                                                            }}>
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}

                                                            </TableCell>
                                                        );
                                                    })}

                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15, 25]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />

                    </Paper>

                </Grid>


                <Grid item xs={12} sm={8} >
                    <Paper className={classes.paper} elevation={6} style={{ marginLeft: 25, marginRight: 20, padding: theme.spacing(3) }}>
                        <Typography variant="h6" noWrap={true} style={{
                            fontSize: 18, color: '#00318B', fontFamily: 'Poppins',
                            fontStyle: 'normal',

                        }}>
                            Details
                        </Typography>
                        <center>
                            <Grid container>
                                <Grid item xs={12} style={{ marginTop: '-10px' }}>
                                    <center>
                                        <img src="Dr.Pradeep.png" style={{ borderRadius: 100, height: 80 }}></img>
                                    </center>
                                </Grid>
                            </Grid>
                            <Typography variant="h6" noWrap={true} style={{
                                fontSize: 16,
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                color: '#707070',
                                fontWeight: 600,
                                marginTop: 10
                            }}>
                                Dr. Pradip Musale
                            </Typography>


                            <Typography variant="h6" noWrap={true} style={{
                                fontSize: 14, color: '#707070', fontFamily: 'Poppins',
                                fontStyle: 'normal',
                            }}>
                                BAMS-MS (12 Years)
                            </Typography>

                            <Grid container xs={12} style={{ paddingTop: 15 }}>
                                <Grid item xs={3} style={{ border: '1px solid lightgray', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Mobile Number
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        8977889912
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid lightgray', borderLeft: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Email ID
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', marginLeft: 10, marginRight: 10, fontFamily: 'Poppins', }}>
                                        pradeep@gmail.com
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid lightgray', borderLeft: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Clinic Name
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins',  marginLeft: 10, marginRight: 10  }}>
                                        Akshay Nursing Home
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid lightgray', borderLeft: '0px',  paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Category
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        Gynecologist
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container xs={12}>

                                <Grid item xs={6} style={{ border: '1px solid lightgray', borderTop: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Address
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', marginLeft: 10, marginRight: 10 }}>
                                        8th floor, City Avenue, Mumbai-Banglore Highway, Wakad, Pune, 411007
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid lightgray', borderLeft: '0px', borderTop: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Morning Shift
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        08:00 - 02:00
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} style={{ border: '1px solid lightgray', borderLeft: '0px',borderTop: '0px', paddingBottom: 20 }}>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', }}>
                                        Evening Shift
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 5, fontSize: 14, color: '#707070', fontFamily: 'Poppins', }}>
                                        04:00 - 10:00
                                    </Typography>
                                </Grid>

                            </Grid>


                            <Grid container xs={12} style={{ marginTop: 5 }}>
                                <Grid item sm={6} >
                                    <Button className={classes.btnregister} onClick={handleClickOpenDeletemodal} style={{ float: 'right', marginRight: 20 }}>Delete</Button>
                                </Grid>
                                <Grid item sm={6} >
                                    <Button className={classes.btnregister} onClick={handleClickOpenEditmodal} style={{ float: 'left', marginLeft: 20 }}>Edit</Button>
                                </Grid>
                            </Grid>

                        </center>
                    </Paper>

                </Grid>


                {/* Add new Patient Dialog */}

                <Dialog
                    open={openmodal}
                    onClose={handleClosemodal}
                    maxWidth={maxWidth}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Register New Patient"}
                        <IconButton edge="start" color="inherit" onClick={handleClosemodal} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Grid container>
                                <Grid item xs={12} sm={6} style={{ borderRight: '1px solid #F0F0F0' }}>
                                    <center>
                                        <div style={{ paddingTop: 10 }}>
                                            <TextField className={classes.inputFields} id="outlined-basic" size="small" label="First Name" variant="outlined" />
                                            <TextField className={classes.inputFields} id="outlined-basic" size="small" label="Last Name" variant="outlined" />
                                            <TextField className={classes.inputFields} id="outlined-basic" type="number" size="small" label="Mobile Number" variant="outlined" />
                                            <TextField className={classes.inputFields} id="outlined-basic" type="email" size="small" label="Email Id" variant="outlined" />
                                            <TextField className={classes.inputFields} id="outlined-basic" type="date" size="small" label="DOB" variant="outlined" />
                                            <FormControl variant="outlined" size='small' className={classes.formControl}  >
                                                <InputLabel >Gender</InputLabel>
                                                <Select
                                                    className={classes.inputFields}
                                                    native
                                                    size='small'
                                                    value={gender}
                                                    onChange={handleChangedGender}
                                                    label="Gender"
                                                    inputProps={{
                                                        name: 'gender',
                                                        id: 'outlined-gender-native-simple',
                                                    }}

                                                >
                                                    <option aria-label="None" value="" />
                                                    <option value={1}>Male</option>
                                                    <option value={2}>Female</option>

                                                </Select>
                                            </FormControl>
                                        </div>
                                    </center>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <center>
                                        <div style={{ paddingTop: 10 }}>
                                            <TextField className={classes.inputFields} multiline
                                                rows={2}
                                                rowsMax={5} id="outlined-basic" size="small" label="Address" variant="outlined"
                                            />
                                            <TextField className={classes.inputFields} id="outlined-basic" size="small" label="City" variant="outlined" />
                                            <TextField className={classes.inputFields} id="outlined-basic" size="small" label="Pincode" variant="outlined" />
                                            <TextField className={classes.inputFields} id="outlined-basic" size="small" label="State" variant="outlined" />
                                            <TextField className={classes.inputFields} id="outlined-basic" size="small" label="Country" variant="outlined" />
                                            <Grid container>
                                                <Grid item xs={12} sm={6}>
                                                    <center>
                                                        <TextField className={classes.inputFields} id="outlined-basic" size="small" type="number" label="Height" variant="outlined" style={{ width: 150, float: 'right', marginRight: 5 }} />
                                                    </center>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <center>
                                                        <TextField className={classes.inputFields} id="outlined-basic" size="small" type="number" label="Weight" variant="outlined" style={{ width: 150, float: 'left', }} />
                                                    </center>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </center>
                                </Grid>

                                <Grid container>
                                    <Grid xs={12} sm={6}>
                                        <Button className={classes.btnCancle} onClick={handleClosemodal} style={{ float: 'right', marginRight: 20 }}>
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid xs={12} sm={6}>
                                        <Button className={classes.btnregister} onClick={handleClosemodal} autoFocus style={{ float: 'left', marginLeft: 20 }}>
                                            Register
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>


                {/* Edit Patient Details */}

                <Dialog
                    open={openeditmodal}
                    onClose={handleCloseEditmodal}
                    maxWidth={maxWidth}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Edit Details"}
                        <IconButton edge="start" color="inherit" onClick={handleCloseEditmodal} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Grid container>
                                <Grid item xs={12} sm={6} style={{ borderRight: '1px solid #F0F0F0' }}>
                                    <center>
                                        <div style={{ paddingTop: 10 }}>
                                            <TextField className={classes.inputFields} id="outlined-basic" size="small" label="First Name" variant="outlined" />
                                            <TextField className={classes.inputFields} id="outlined-basic" size="small" label="Last Name" variant="outlined" />
                                            <TextField className={classes.inputFields} id="outlined-basic" type="number" size="small" label="Mobile Number" variant="outlined" />
                                            <TextField className={classes.inputFields} id="outlined-basic" type="email" size="small" label="Email Id" variant="outlined" />
                                            <TextField className={classes.inputFields} id="outlined-basic" type="date" size="small" label="DOB" variant="outlined" />
                                            <FormControl variant="outlined" size='small' className={classes.formControl}  >
                                                <InputLabel >Gender</InputLabel>
                                                <Select
                                                    className={classes.inputFields}
                                                    native
                                                    size='small'
                                                    value={gender}
                                                    onChange={handleChangedGender}
                                                    label="Gender"
                                                    inputProps={{
                                                        name: 'gender',
                                                        id: 'outlined-gender-native-simple',
                                                    }}

                                                >
                                                    <option aria-label="None" value="" />
                                                    <option value={1}>Male</option>
                                                    <option value={2}>Female</option>

                                                </Select>
                                            </FormControl>
                                        </div>
                                    </center>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <center>
                                        <div style={{ paddingTop: 10 }}>
                                            <TextField className={classes.inputFields} multiline
                                                rows={2}
                                                rowsMax={5} id="outlined-basic" size="small" label="Address" variant="outlined"
                                            />
                                            <TextField className={classes.inputFields} id="outlined-basic" size="small" label="City" variant="outlined" />
                                            <TextField className={classes.inputFields} id="outlined-basic" size="small" label="Pincode" variant="outlined" />
                                            <TextField className={classes.inputFields} id="outlined-basic" size="small" label="State" variant="outlined" />
                                            <TextField className={classes.inputFields} id="outlined-basic" size="small" label="Country" variant="outlined" />
                                            <Grid container>
                                                <Grid item xs={12} sm={6}>
                                                    <center>
                                                        <TextField className={classes.inputFields} id="outlined-basic" size="small" type="number" label="Height" variant="outlined" style={{ width: 150, float: 'right', marginRight: 5 }} />
                                                    </center>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <center>
                                                        <TextField className={classes.inputFields} id="outlined-basic" size="small" type="number" label="Weight" variant="outlined" style={{ width: 150, float: 'left', }} />
                                                    </center>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </center>
                                </Grid>

                                <Grid container>
                                    <Grid xs={12} sm={6}>
                                        <Button className={classes.btnCancle} onClick={handleCloseEditmodal} style={{ float: 'right', marginRight: 20 }}>
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid xs={12} sm={6}>
                                        <Button className={classes.btnregister} onClick={handleCloseEditmodal} autoFocus style={{ float: 'left', marginLeft: 20 }}>
                                            Edit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>


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
                            Do you want to Delete Patient's Details?
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
