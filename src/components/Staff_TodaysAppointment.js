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
    TablePagination
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
import { ReportGmailerrorred } from '@mui/icons-material';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const drawerWidth = 240;

const columns = [
    { id: 'name', label: 'NAME', minWidth: 100 },
    { id: 'uid', label: 'UID', minWidth: 60 },
    {
        id: 'mobile',
        label: 'MOBILE NO',
        minWidth: 50,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'email',
        label: 'EMAIL ID',
        minWidth: 100,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'appchannel',
        label: 'APPOINTMENT CHANNEL',
        minWidth: 50,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'date',
        label: 'DATE & TIME',
        minWidth: 50,
        align: 'left',
        format: (value) => value.toFixed(2),
    },

];

function createData(name, uid, mobile, email, appchannel, date) {
    return { name, uid, mobile, email, appchannel, date };
}

const rows = [
    createData('Pallavi Kale', 'Pallavi123', '8977889898', 'pallavi@gmail.com', 'Walk In', '2021-09-23 00:19:21'),
    createData('Rudrayani Tidake', 'Rudrayani123', '67848484848', 'rudra@gmail.com', 'By App', '2021-09-23 00:19:21'),
    createData('Kajal Bhagavat', 'kajal123', '7833674758', 'kajal@gmail.com', 'Walk In', '2021-09-23 00:19:21'),
    createData('Shweta Wankhade', 'shweta908', '7484949490', 'shweta@gmail.com', 'Walk In', '2021-09-23 00:19:21'),
    createData('Rutuja Pingle', 'rutuja892', '94848590332', 'rutuja@gmail.com', 'By App', '2021-09-23 00:19:21'),
    createData('Sharayu Shende', 'sharayu90', '8977889898', 'sharayu@gmail.com', 'Walk In', '2021-09-23 00:19:21'),
    createData('Gunjun Kale', 'Gunjan356', '64748897867', 'gunjan@gmail.com', 'By App', '2021-09-23 00:19:21'),
    createData('Pallavi Kale', 'Pallavi123', '8977889898', 'pallavi@gmail.com', 'Walk In', '2021-09-23 00:19:21'),
    createData('Rudrayani Tidake', 'Rudrayani123', '67848484848', 'rudra@gmail.com', 'By App', '2021-09-23 00:19:21'),
    createData('Kajal Bhagavat', 'kajal123', '7833674758', 'kajal@gmail.com', 'Walk In', '2021-09-23 00:19:21'),
    createData('Shweta Wankhade', 'shweta908', '7484949490', 'shweta@gmail.com', 'Walk In', '2021-09-23 00:19:21'),
    createData('Rutuja Pingle', 'rutuja892', '94848590332', 'rutuja@gmail.com', 'By App', '2021-09-23 00:19:21'),
    createData('Sharayu Shende', 'sharayu90', '8977889898', 'sharayu@gmail.com', 'Walk In', '2021-09-23 00:19:21'),
    createData('Gunjun Kale', 'Gunjan356', '64748897867', 'gunjan@gmail.com', 'By App', '2021-09-23 00:19:21'),
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor:'white',
        flexGrow: 1,
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
        padding: theme.spacing(1),
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
        padding: theme.spacing(0, 0, 0, 0),
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "gray",
        marginTop: '-35px',
        marginLeft: 75
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
        borderRadius:20,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 200,
    },
    textField: {
        [`& fieldset`]: {
            borderRadius: 25,
        },
    }
}));

export default function TodaysAppointment() {
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

    // function EnhancedTableHead(props) {
    //     const { classes, onSelectAllClick} = props;
    //     const createSortHandler = (property) => (event) => {
    //       onRequestSort(event, property);
    //     };

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


            <div className="row">
                <div className={classes.morningslot} style={{ paddingTop: 100 }}>
                    <Container display='flex' flexGrow={1} flexDirection="column" justify='center' style={{}}>
                        <Grid container spacing={2} display='flex' direction="row" wrap="nowrap" flexGrow={1} style={{}}>
                            <Typography className={classes.headings} variant="h6" noWrap={true} >
                                Morning Slots
                            </Typography>
                            <Grid className={classes.grid} item sm style={{ paddingTop: 50, marginLeft: '-150px' }}>
                                <Paper className={classes.paper} elevation={4} >
                                    <Grid className={classes.griditem} item xs >
                                        08:00
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4} >
                                    <Grid className={classes.griditem} item xs>
                                        08:30
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4} >
                                    <Grid className={classes.griditem} item xs >
                                        09:00
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4} >
                                    <Grid className={classes.griditem} item xs >
                                        09:30
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4}>
                                    <Grid className={classes.griditem} item xs >
                                        10:00
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4} s>
                                    <Grid className={classes.griditem} item xs >
                                        10:30
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4} >
                                    <Grid className={classes.griditem} item xs >
                                        11:00
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4} >
                                    <Grid className={classes.griditem} item xs >
                                        11:30
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4} >
                                    <Grid className={classes.griditem} item xs >
                                        12:00
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4} >
                                    <Grid className={classes.griditem} item xs >
                                        12:30
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4} >
                                    <Grid className={classes.griditem} item xs >
                                        01:00
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4} >
                                    <Grid className={classes.griditem} item xs>
                                        01:30
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </div>

                <div className={classes.morningslot} style={{ paddingTop: 30 }}>
                    <Container display='flex' flexGrow={1} flexDirection="column" justify='center' style={{}}>
                        <Grid container spacing={2} display='flex' direction="row" wrap="nowrap" flexGrow={1} style={{}}>
                            <Typography className={classes.headings} variant="h6" noWrap={true} >
                                Evening Slots
                            </Typography>
                            <Grid item sm style={{ paddingTop: 50, marginLeft: '-150px' }}>
                                <Paper className={classes.paper} elevation={4} >
                                    <Grid className={classes.griditem} item xs>
                                        04:30
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4} >
                                    <Grid className={classes.griditem} item xs>
                                        05:00
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4} >
                                    <Grid className={classes.griditem} item xs >
                                        05:30
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4} >
                                    <Grid className={classes.griditem} item xs >
                                        06:00
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4}>
                                    <Grid className={classes.griditem} item xs >
                                        06:30
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4} >
                                    <Grid className={classes.griditem} item xs>
                                        07:00
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4} >
                                    <Grid className={classes.griditem} item xs >
                                        07:30
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4} >
                                    <Grid className={classes.griditem} item xs >
                                        08:00
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4} >
                                    <Grid className={classes.griditem} item xs >
                                        08:30
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4} >
                                    <Grid className={classes.griditem} item xs >
                                        09:00
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4}>
                                    <Grid className={classes.griditem} item xs >
                                        09:30
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm style={{ paddingTop: 50 }}>
                                <Paper className={classes.paper} elevation={4} >
                                    <Grid className={classes.griditem} item xs >
                                        10:00
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </div>


                <div className={classes.morningslot} style={{ paddingTop: 40 }}>
                    <Container display='flex' flexGrow={1} flexDirection="column" justify='center' style={{}}>

                        <div className={classes.search} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: '-10px' }}>
                            <div className='column' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Typography variant="h8" noWrap={true} style={{ paddingRight: 20 }}>
                                    Search
                                </Typography>
                                <SearchIcon className={classes.searchIcon} />
                                <InputBase
                                    label="Search by Name/Email"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    variant='outlined'
                                    inputProps={{ 'aria-label': 'search' }}
                                > </InputBase>

                                <Typography variant="h8"  noWrap={true} style={{ paddingLeft: 40, paddingRight: 20 }}>
                                    From
                                </Typography>
                                <TextField
                                    id="outlined-size-small"
                                    defaultValue="Small"
                                    variant="outlined"
                                    size="small"
                                    type='date'
                                    className={classes.textField}
                                />

                                <Typography variant="h8" noWrap={true} style={{ paddingLeft: 40, paddingRight: 20 }}>
                                    To
                                </Typography>
                                <TextField
                                    id="outlined-size-small"
                                    defaultValue="Small"
                                    variant="outlined"
                                    size="small"
                                    type='date'
                                    className={classes.textField}
                                />

                                <Button style={{ backgroundColor: '#2C7FB2', color: '#fff', marginLeft: '50px', borderRadius:20 }}>View</Button>

                            </div>
                        </div>
                    </Container>
                </div>


                <div className={classes.patienttable} style={{ paddingTop: 40 }}>
                    <Paper sx={{ width: '80%' }}>
                        <TableContainer sx={{ maxHeight: 440, align: 'center' }}>
                            <Table stickyHeader aria-label="sticky table" style={{ borderRadius: 5 }}>
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
                                        <TableCell style={{
                                            textAlign: 'center',
                                            backgroundColor: '#78B088',
                                            color: '#fff',
                                            fontFamily: '"Poppins", san-serif;',
                                            fontStyle: 'normal',
                                            fontWeight: 600,
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                        }}>Actions</TableCell>
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
                                                                justifyContent: 'center'
                                                            }}>
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}

                                                            </TableCell>
                                                        );
                                                    })}
                                                    <TableCell style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                        <Button color="primary"><EditIcon /> </Button>
                                                        <Button color="primary"><DeleteIcon /></Button>

                                                    </TableCell>  
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
                </div>
            </div>
            <Footer />
        </div>
    );
}
