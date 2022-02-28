import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Container, FormControl, Radio, InputLabel, TextField, Typography, Button, Avatar, Table, TableContainer, TableBody, TableCell, TableHead, InputBase, TableRow, TablePagination, Drawer, Divider, MenuItem, Menu, ListItem, ListItemIcon, ListItemText, List, IconButton, Grid, Paper, Link } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import DoctorNavbar from './Doctor_Navbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Add_Staff } from '../Apis/Clinic_Staff/index';

const drawerWidth = 240;

const columns = [
    { id: 'name', label: 'NAME', minWidth: 100 },
    {
        id: 'mobile',
        label: 'MOBILE NO',
        minWidth: 50,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
];

function createData(name, mobile,) {
    return { name, mobile };
}

const rows = [
    createData('Pallavi Kale', '8977889898', 'pallavi@gmail.com'),
    createData('Rudrayani Tidake', '67848484848', 'rudra@gmail.com'),
    createData('Kajal Bhagavat', '7833674758', 'kajal@gmail.com'),
    createData('Shweta Wankhade', '7484949490', 'shweta@gmail.com'),
    createData('Rutuja Pingle', '94848590332', 'rutuja@gmail.com'),
    createData('Sharayu Shende', '8977889898', 'sharayu@gmail.com'),
    createData('Gunjun Kale', '64748897867', 'gunjan@gmail.com'),
    createData('Pallavi Kale', '8977889898', 'pallavi@gmail.com'),
    createData('Rudrayani Tidake', '67848484848', 'rudra@gmail.com'),
    createData('Kajal Bhagavat', '7833674758', 'kajal@gmail.com'),
    createData('Shweta Wankhade', '7484949490', 'shweta@gmail.com'),
    createData('Rutuja Pingle', '94848590332', 'rutuja@gmail.com'),
    createData('Sharayu Shende', '8977889898', 'sharayu@gmail.com'),
    createData('Gunjun Kale', '64748897867', 'gunjan@gmail.com'),
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
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
        marginBottom: 10,
        marginTop: 10
    },
    textField: {
        // [`& fieldset`]: {
        //     borderRadius: 25,
        // },
        padding: 8,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        textAlign: 'center',
        width: '100%'
    }


}));


export default function DoctorAddStaff() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleGoBack = () => {
        navigate("/DoctorHome");
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
                            fontFamily: '"Poppins", san-serif;',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',

                        }}>
                        <Button style={{ marginLeft: '-20px', backgroundColor: 'white', color: '#2C7FB2', borderRadius: 105, fontSize: '12px' }}> <ArrowBackIcon onClick={handleGoBack} />  </Button>
                        Clinic Staff
                    </Typography>
                </Grid>

                <Grid item xs={12} container style={{ marginTop: 10 }}>
                    <Grid item xs={12} sm={4}>
                        <Paper elevation={6} className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <center> <SearchIcon className={classes.searchIcon} />
                                        <InputBase
                                            label="Search by Name/Email"
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,

                                            }}
                                            variant='outlined'
                                            inputProps={{ 'aria-label': 'search' }}
                                            style={{ borderRadius: 15 }}
                                        > </InputBase> </center>
                                </Grid>

                                <Grid item xs={6} style={{ alignSelf: 'center' }}>
                                    <Button className={classes.btnview} size="small" style={{ float: 'right', fontSize: 11, textAlign: 'center' }}>View Profile</Button>
                                </Grid>


                            </Grid>
                            {/* <Grid item xs={12} sm={12}>
                            <Paper className={classes.paper}> */}
                            <TableContainer style={{ paddingTop: 20 }} >
                                <Table className={classes.tbl} size="small" stickyHeader aria-label="sticky table" style={{ borderRadius: 5 }}>
                                    <TableHead style={{}}>
                                        <TableRow style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{
                                                        minWidth: column.minWidth,
                                                        backgroundColor: '#78B088',
                                                        color: '#fff',
                                                        fontFamily: '"Poppins", san-serif;',
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
                                                                    fontFamily: '"Poppins", san-serif;',
                                                                    fontStyle: 'normal',
                                                                    fontWeight: 600,
                                                                    overflow: 'hidden',
                                                                    whiteSpace: 'nowrap',
                                                                    textOverflow: 'ellipsis',
                                                                    justifyContent: 'center',
                                                                    fontSize: 12
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
                            {/* </Paper> */}
                            <Divider style={{ padding: '5px', borderTop: '1px solid #F0F0F0', backgroundColor: '#fff', paddingBottom: 10 }} />

                            <Typography variant="h7" noWrap={true} style={{
                                fontFamily: '"Poppins", san-serif;',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                color: '#00318B',
                                marginLeft: 4,

                            }} >
                                Profile Details
                            </Typography>

                            <Grid container spacing={3} style={{ paddingTop: theme.spacing(2) }}>
                                <Grid item xs={12} sm={4}>
                                    <Paper elevation={0} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <center> <Avatar style={{ align: 'center', height: '50px', width: '50px' }}><AccountCircle /></Avatar> </center>
                                        <Divider style={{ paddingTop: '10px', backgroundColor: '#fff' }} />
                                        <Typography variant="h7" noWrap={true} style={{
                                            fontFamily: '"Poppins", san-serif;',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            padding: theme.spacing(2),
                                            color: 'gray'
                                        }}
                                        >
                                            Pallavi Kale
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Paper elevation={0} style={{
                                        fontFamily: '"Poppins", san-serif;',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        color: 'gray',
                                    }}>
                                        Location: <Typography variant="h7" noWrap={true} style={{
                                            fontFamily: '"Poppins", san-serif;',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            padding: theme.spacing(2),
                                            color: 'gray',
                                            fontSize: 12,
                                        }}
                                        >
                                            Wakad, Pune
                                        </Typography>
                                        <Divider style={{ paddingTop: '10px', backgroundColor: '#fff' }} />
                                        Contact: <Typography variant="h7" noWrap={true} style={{
                                            fontFamily: '"Poppins", san-serif;',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            padding: theme.spacing(2),
                                            color: 'gray',
                                            fontSize: 12,
                                        }}
                                        >
                                            8790332435
                                        </Typography>
                                        <Divider style={{ paddingTop: '10px', backgroundColor: '#fff' }} />
                                        Email Id: <Typography variant="h7" noWrap={true} style={{

                                            fontFamily: '"Poppins", san-serif;',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            padding: theme.spacing(2),
                                            color: 'gray',
                                            fontSize: 12,
                                        }}
                                        >
                                            pallavikale@gmail.com
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} xs={2}>
                        <Paper elevation={0}></Paper>
                    </Grid>


                    <Grid item xs={12} sm={4} >
                        <Paper className={classes.paper} elevation={6} style={{ paddingBottom: 0 }}>
                            <Typography variant="h7" noWrap={true} style={{

                                fontFamily: '"Poppins", san-serif;',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                padding: theme.spacing(2),
                                color: '#00318B',
                                fontSize: 16
                            }}
                            >
                                Add Staff
                            </Typography>


                            <div style={{ paddingTop: 10 }}>

                                <center>
                                    <TextField className={classes.textField} id="outlined-basic" size="small" label="First Name" variant="outlined" />
                                </center>
                                <center>
                                    <TextField className={classes.textField} id="outlined-basic" size="small" label="Last Name" variant="outlined" />
                                </center>
                                <center>
                                    <TextField className={classes.textField} id="outlined-basic" type="number" size="small" label="Mobile Number" variant="outlined" />
                                </center>
                                <center>
                                    <TextField className={classes.textField} multiline
                                        rows={2}
                                        rowsMax={2} id="outlined-basic" size="small" label="Address" variant="outlined"
                                    />
                                </center>
                                <center>
                                    <TextField className={classes.textField} type="password" id="outlined-basic" size="small" label="Password" variant="outlined" />
                                </center>
                            </div>

                            <Grid container>
                                <Grid item xs={12} sm={4}>
                                    <InputLabel htmlFor="outlined-age-native-simple" style={{ paddingLeft: 10 }}>Doctor
                                        <Radio
                                            checked={selectedValue === 'Doctor'}
                                            color='primary'
                                            onChange={handleChange}
                                            // onChange={roleChange}
                                            value="Doctor"
                                            name="radio-button-demo"
                                            inputProps={{ 'aria-label': 'Doctor' }}

                                        /></InputLabel>
                                </Grid>

                                <Grid item xs={12} sm={4}>

                                    <InputLabel htmlFor="outlined-age-native-simple">Receptionist

                                        <Radio
                                            checked={selectedValue === 'Receptionist'}
                                            onChange={handleChange}
                                            // onChange={roleChange}
                                            value="Receptionist"
                                            color='primary'
                                            name="radio-button-demo"
                                            inputProps={{ 'aria-label': 'Receptionist' }}
                                        /></InputLabel>
                                </Grid>
                            </Grid>
                            <div>
                                <center>   <Button className={classes.btnUpload} >Register</Button> </center>
                            </div>
                        </Paper>

                    </Grid>
                </Grid>
            </Grid> {/* main grid */}

        </div >
    );
}
