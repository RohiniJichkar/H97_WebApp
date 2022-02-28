import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    Drawer,
    Divider,
    MenuItem,
    Menu,
    ListItem,
    ListItemIcon,
    ListItemText,
    List,
    Button,
    Avatar,
    IconButton,
    Grid,
    Paper,
    Link,
    InputBase,
    TextField,
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableContainer,
    TableRow,
    TablePagination,
    InputLabel,
    Select,
    FormControl

} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Footer from './Footer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import TodayIcon from '@material-ui/icons/Today';
import ListIcon from '@material-ui/icons/List';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PeopleIcon from '@material-ui/icons/People';
import SearchIcon from '@material-ui/icons/Search';
import './BookAppointment.css';


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
        flex: 1,
        backgroundColor: 'white',

    },
    //   menuButton: {
    //     marginRight: theme.spacing(2),
    //   },
    title: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
        color: '#2C7FB2'
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: '#2C7FB2',
        color: '#fff'
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
        backgroundColor: '#2C7FB2',
        color: '#fff'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    clinicname: {
        // flexGrow: 1,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(0),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(0),
        },
        flex: 1,
        textAlign: 'center',
        color: '#00318B',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 800,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    drname: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        padding: theme.spacing(1),
        flex: 0.2,
        alignSelf: 'right',
        textAlign: 'right',
        color: '#00318B',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'

    },

    paper: {
        padding: theme.spacing(2),
        // textAlign: 'center',
        color: '#78B088',
        // fontFamily: '"San Francisco", Helvetica, Arial, san-serif;',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 800,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        borderRadius: 10
    },

    services: {
        // paddingTop: 100,
        // textAlign: 'center',
        color: '#78B088',
        fontFamily: '"San Francisco", Helvetica, Arial, san-serif;',
    },
    report: {
        // flex: 1,
        // border:'1px solid red',
        justifyContent: 'center',
        // textAlign: 'center',
        color: '#78B088',
        fontFamily: '"San Francisco", Helvetica, Arial, san-serif;',
        fontWeight: 'bold'
    },
    grid: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
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
        textAlign: 'center',
        color: '#2C7FB2'
    },
    headings: {
        color: '#78B088',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 800,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
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
        color: '#2C7FB2'
    },
    searchIcon: {
        paddingTop: '10px',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "gray",

        // marginLeft: 70
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
        borderRadius:20,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 200,
    },
    btnviewprofile: {
        marginLeft: 10,
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 25,
        aspectRatio: 5,

    },
    tbl: {
        overflow: 'scroll',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    btnbookappointment: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 25,

    },
    btnreset: {
        backgroundColor: '#78B088 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 25,
        width: 150

    },
    headingBookAppointment: {
        paddingTop: 10,
        color: '#00318B !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 600,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    headingBookAppointmentShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    textField: {
        [`& fieldset`]: {
            borderRadius: 25,
        },
    }

}));


  
export default function BookAppointment() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open1 = Boolean(anchorEl);

    const [authProfile, setAuthProfile] = React.useState(true);
    const [anchorElProfile, setAnchorElProfile] = React.useState(null);
    const openprofile = Boolean(anchorElProfile);
    const navigate = useNavigate();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);

    const [values, setValues] = React.useState([
        "Dr. Pradeep Musale",
        "Dr. Kirti Virnak",

    ]);

    const [selected, setSelected] = React.useState("Dr. Pradeep Musale");

    function handleChangedDropDown(event) {
        setSelected(event.target.value);
    }


    const [appselected, setAppSelected] = React.useState("");

    function handleChangedAppointmentChannel(event) {
        setAppSelected(event.target.value);
    }


    const [appvalues, setAppValues] = React.useState([
        "Walk In",
        "Online",
        "By Web"

    ]);



    const [timevalues, setTimeValues] = React.useState([
        "08:00",
        "09:00",

    ]);
    const [timeselected, setTimeSelected] = React.useState("");

    function handleChangedTime(event) {
        setTimeSelected(event.target.value);
    }



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleChange = (event) => {
        setAuthProfile(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorElProfile(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElProfile(null);
    };


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const menuItems = [
        {
            text: 'Dashboard',
            icon: DashboardIcon,
            onClick: () => navigate("/dashboard"),
        },
        {
            text: 'Patient Registration',
            icon: GroupAddIcon,
            onClick: () => navigate('/patientregistration'),
        },
        {
            text: 'Book Appointment',
            icon: PermContactCalendarIcon,
            onClick: () => navigate("/bookappointment"),
        },
        {
            text: "Today's Appointments",
            icon: TodayIcon,
            onClick: () => navigate("/todaysappointment"),
        },
        {
            text: 'Clinic Patients',
            icon: PeopleIcon,
            onClick: () => navigate("/clinicpatients"),
        },
        {
            text: "Clinic Services",
            icon: ListIcon,
            onClick: () => navigate("/clinicservices"),
        },
    ];



    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                style={{ backgroundColor: 'white' }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open1}
                        onClose={handleClose}
                    >
                        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem> */}
                    </Menu>
                    <div>
                        <img src="h97 logo horizontal-01.png" alt="logo" className={classes.logo} height='40px' style={{ flex: 1 }} />
                    </div>
                    <div className={classes.clinicname}>
                        <Typography variant="h5" noWrap={true}>
                            AKSHAY NURSING HOME
                        </Typography>
                    </div>
                    <div className={classes.drname}>
                        <Typography variant="h8" noWrap={true}  >
                            Dr. Pradeep Musale
                        </Typography>
                    </div>
                    {auth && (
                        <div className={classes.profile}>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="primary"

                            >
                                <AccountCircle style={{ height: 35, width: 35 }} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElProfile}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={openprofile}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar} style={{ color: '#fff' }}>
                    <IconButton onClick={handleDrawerClose} style={{ color: '#fff' }}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {menuItems.map(({ text, icon: Icon, onClick }, index) => (
                        <ListItem button key={text} onClick={onClick}>
                            <ListItemIcon style={{ color: '#fff' }}>
                                <Icon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>


            <Typography className={clsx(classes.headingBookAppointment, {
                [classes.headingBookAppointmentShift]: open,
            })} variant="h5" noWrap={true} style={{ paddingTop: 70, paddingLeft: '90px' }}>
                Book Appointment
            </Typography>
            <Grid container className={clsx(classes.grid, {
                [classes.gridShift]: open,
            })} spacing={3} style={{ paddingLeft: '90px', paddingTop: 5, backgroundColor: '#fff' }}>

                <Grid item xs={12} sm={4}>
                    <Paper elevation={6} className={classes.paper}>
                        <SearchIcon className={classes.searchIcon} />
                        <InputBase
                            label="Search by Name/Email"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                                
                            }}
                            variant='outlined'
                            inputProps={{ 'aria-label': 'search' }}
                            style={{ borderRadius: 15 }}
                        > </InputBase>
                        <Button className={classes.btnviewprofile} size="small" style={{ fontSize: 11 }}>View Profile</Button>
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
                                                                fontWeight: 200,
                                                                overflow: 'hidden',
                                                                whiteSpace: 'nowrap',
                                                                textOverflow: 'ellipsis',
                                                                justifyContent: 'center'
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
                        <Divider style={{ padding: '5px', borderBlockEnd: '1px solid #F0F0F0', backgroundColor: '#fff', paddingBottom: 20 }} />

                        <Typography variant="h7" noWrap={true} style={{
                            fontFamily: '"Poppins", san-serif;',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#00318B'

                        }} >
                            Profile Details
                        </Typography>

                        {/* </Grid> */}
                        <Grid container spacing={3} style={{ paddingTop: theme.spacing(3) }}>
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
                                    color: 'gray'
                                }}>
                                    Location: <Typography variant="h7" noWrap={true} style={{
                                        fontFamily: '"Poppins", san-serif;',
                                        fontStyle: 'normal',
                                        fontWeight: 300,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        padding: theme.spacing(2),
                                        color: 'gray'
                                    }}
                                    >
                                        Wakad, Pune
                                    </Typography>
                                    <Divider style={{ paddingTop: '10px', backgroundColor: '#fff' }} />
                                    Contact: <Typography variant="h7" noWrap={true} style={{
                                        fontFamily: '"Poppins", san-serif;',
                                        fontStyle: 'normal',
                                        fontWeight: 300,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        padding: theme.spacing(2),
                                        color: 'gray'
                                    }}
                                    >
                                        8790332435
                                    </Typography>
                                    <Divider style={{ paddingTop: '10px', backgroundColor: '#fff' }} />
                                    Email Id: <Typography variant="h7" noWrap={true} style={{

                                        fontFamily: '"Poppins", san-serif;',
                                        fontStyle: 'normal',
                                        fontWeight: 300,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        padding: theme.spacing(2),
                                        color: 'gray'
                                    }}
                                    >
                                        pallavikale@gmail.com
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>


                <Grid item xs={12} sm={8} >
                    <Paper className={classes.paper} elevation={6}>
                        <Grid container spacing={3} style={{ backgroundColor: '#fff', borderBlockEnd: '1px solid #F0F0F0' }}>
                            <Grid item xs={12} sm={6} style={{ borderRight: '1px solid #F0F0F0', }}>
                                <Typography variant="h7" noWrap={true} style={{

                                    fontFamily: '"Poppins", san-serif;',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    padding: theme.spacing(2),
                                    color: '#00318B'
                                }}
                                >
                                    Details
                                </Typography>
                                <Divider />

                                <center>
                                    <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '50vh', justifyContent: 'center', }}>
                                        <InputLabel htmlFor="outlined-age-native-simple">Doctor</InputLabel>
                                        <Select
                                            className={classes.textField}
                                            native
                                            value={selected}
                                            onChange={handleChangedDropDown}
                                            label="doctor"
                                            inputProps={{
                                                name: 'doctor',
                                                id: 'outlined-doctor-native-simple',
                                            }}
                                        >
                                            <option aria-label="None" value="" />
                                            <option value={1}>Dr. Pradeep Musale</option>
                                            <option value={2}>Dr. Kirti Virnak</option>

                                        </Select>
                                    </FormControl>
                                </center>


                                <center>
                                    <FormControl variant="outlined" size="small" className={classes.formControl} style={{ width: '50vh', justifyContent: 'center', }}>
                                        <InputLabel htmlFor="outlined-age-native-simple">Appointment Channel</InputLabel>
                                        <Select
                                            className={classes.textField}
                                            native
                                            value={appselected}
                                            onChange={handleChangedAppointmentChannel}
                                            label="Age"
                                            inputProps={{
                                                name: 'appointmentchannel',
                                                id: 'outlined-appointment-native-simple',
                                            }}
                                        >
                                            <option aria-label="None" value="" />
                                            <option value={1}>Walk In</option>
                                            <option value={2}>Online</option>
                                            <option value={2}>By Web</option>
                                        </Select>
                                    </FormControl>
                                </center>

                                <center>
                                    <FormControl variant="outlined" className={classes.formControl} style={{ width: '50vh', justifyContent: 'center', }}>
                                        <TextField className={classes.textField} id="outlined-basic" size="small" label="Appointment Title" variant="outlined" />
                                    </FormControl>
                                </center>
                                {/* <InputLabel htmlFor="agent-simple" style={{ paddingTop: 20 }}>Doctor</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={selected}
                                    onChange={handleChangedDropDown}
                                    inputProps={{
                                        name: "doctor",
                                        id: "age-simple"
                                    }}
                                >
                                    {values.map((value, index) => {
                                        return <MenuItem value={value}>{value}</MenuItem>;
                                    })}
                                </Select> */}

                            </Grid>


                            <Grid item xs={12} sm={6}>
                                <Typography variant="h7" noWrap={true} style={{

                                    fontFamily: '"Poppins", san-serif;',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    padding: theme.spacing(2),
                                    color: '#00318B'

                                }}
                                >
                                    Appointment Details
                                </Typography>
                                <Divider />
                                <center>

                                    <FormControl variant="outlined" className={classes.formControl} size="small">
                                        <InputLabel htmlFor="outlined-age-native-simple">Time</InputLabel>
                                        <Select
                                            className={classes.textField}
                                            native
                                            value={timeselected}
                                            onChange={handleChangedTime}
                                            label="Age"
                                            inputProps={{
                                                name: 'time',
                                                id: 'outlined-appointment-native-simple',
                                            }}

                                        >
                                            <option aria-label="None" value="" />
                                            <option value={1}>08:00</option>
                                            <option value={2}>09:00</option>
                                            <option value={2}>10:00</option>
                                            <option value={2}>11:00</option>
                                            <option value={2}>12:00</option>
                                        </Select>


                                    </FormControl>

                                    <FormControl variant="outlined" className={classes.formControl} >
                                        <TextField
                                            variant="outlined"
                                            id="date"
                                            label=""
                                            type="date"
                                            className={classes.textField}
                                            size="small"

                                        />
                                    </FormControl>
                                </center>
                                <center>
                                    <FormControl variant="outlined" className={classes.formControl} style={{ width: '62vh', justifyContent: 'center', }}>
                                        <TextField className={classes.textField} id="outlined-basic" label="Previous Appointments (if any)" variant="outlined" size="small" />
                                    </FormControl>
                                </center>

                            </Grid>

                        </Grid>

                        <Grid item xs={12} sm={6} style={{ paddingTop: 20 }}>

                            <center>
                                <FormControl variant="outlined" className={classes.formControl} style={{ width: '50vh', marginLeft: '-10px' }}>
                                    <TextField className={classes.textField} id="outlined-basic" size="small" label="Reason" variant="outlined" />
                                </FormControl>
                            </center>

                        </Grid>

                        <Grid item xs={12} sm={8} style={{ paddingTop: 20 }}>
                            <Typography variant="h7" noWrap={true} style={{

                                fontFamily: '"Poppins", san-serif;',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                padding: theme.spacing(2),
                                color: '#00318B'
                            }}
                            >
                                Vitals
                            </Typography>


                        </Grid>

                        <Grid container spacing={2} style={{ padding: 10 }}>
                            <Grid item xs={12} sm={6} style={{ borderRight: '1px solid #F0F0F0', justifyContent: 'center' }}>
                                <Grid container spacing={2} style={{ padding: 10 }}>
                                    <Grid item xs={6}>
                                        <TextField
                                            className={classes.textField}
                                            label="BP"
                                            id="outlined-size-small"
                                            variant="outlined"
                                            size="small"

                                        />
                                    </Grid>
                                    <Grid item xs={6} >

                                        <TextField
                                            className={classes.textField}
                                            label="Temp"
                                            id="outlined-size-small"
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            className={classes.textField}
                                            label="Height"
                                            id="outlined-size-small"
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={6} >

                                        <TextField
                                            className={classes.textField}
                                            label="Weight"
                                            id="outlined-size-small"
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={2} style={{ padding: 10 }}>
                                    <Grid item xs={6}>
                                        <TextField
                                            className={classes.textField}
                                            label="SPO2"
                                            id="outlined-size-small"
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={6} >

                                        <TextField
                                            className={classes.textField}
                                            label="Pulse Rate"
                                            id="outlined-size-small"
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <center> <Button className={classes.btnbookappointment} style={{ width: 170 }}>Reset</Button> </center>

                                    </Grid>
                                    <Grid item xs={6}>

                                        <center> <Button className={classes.btnbookappointment}>Book Appointment</Button> </center>

                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>

                </Grid>
            </Grid>

            <Footer />

        </div>
    );
}
