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
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';


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
        borderRadius: 20,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 11,
        color: 'gray'
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


export default function ClinicPatients() {
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
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
        <div className={classes.root} style={{ backgroundColor: 'white' }}>
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
            })} variant="h5" noWrap={true} style={{ paddingTop: 80, paddingLeft: '90px' }}>
                Clinic Patients
            </Typography>
            <Grid container className={clsx(classes.grid, {
                [classes.gridShift]: open,
            })} spacing={3} style={{ paddingLeft: '90px', paddingTop: 15, backgroundColor: '#fff', height: '80vh' }}>

                <Grid item xs={12} sm={4}>
                    <Paper elevation={6} className={classes.paper}>

                        <Grid container xs={12}>
                            <Grid item xs={6}>
                                <center> <SearchIcon className={classes.searchIcon} />
                                    <InputBase
                                        label="Search by Name/Email"
                                        classes={{
                                            // root: classes.inputRoot,
                                            input: classes.inputInput,

                                        }}
                                        variant='outlined'
                                        inputProps={{ 'aria-label': 'search' }}
                                        style={{ borderRadius: 15 }}
                                    > </InputBase> </center>
                            </Grid>
                            <Grid item xs={6} style={{ alignSelf: 'center', }}>
                                <Button className={classes.btnviewprofile} size="small" style={{ float: 'right', fontSize: 12, textAlign: 'center' }}>View Profile</Button>
                            </Grid>
                        </Grid>

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

                    </Paper>
                </Grid>

                <Grid item xs={12} sm={1}>
                    <Paper className={classes.paper} elevation={0}></Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper} elevation={6}>
                        <Grid container xs spacing={3}>

                            <Grid item sm={6} style={{ borderRight: '1px solid gray' }}>
                                <center>
                                    <div style={{ paddingBottom: 20 }}>
                                        <img src="Pallavi Kale.jpg" style={{ borderRadius: 50, height: 70 }}></img>
                                    </div>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 18, color: '#00318B' }}>
                                        Details:
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{
                                        fontSize: 14,
                                        fontFamily: '"Poppins", san-serif;',
                                        fontStyle: 'normal',
                                        color: 'gray'

                                    }}>
                                        Pallavi Kale
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 18, color: '#00318B' }}>
                                        Address
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: 'gray' }}>
                                        Pimple Saudagar, Pune
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 18, color: '#00318B' }}>
                                        Email ID:
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: 'gray' }}>
                                        pallavi.kale@rajyugsolution.com
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ paddingTop: 10, fontSize: 18, color: '#00318B' }}>
                                        Mobile No:
                                    </Typography>
                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: 'gray' }}>
                                        9095009797
                                    </Typography>
                                </center>
                            </Grid>

                            <Grid item sm={6}>
                                <div>
                                    <FixedSizeList height={300} width={300} itemSize={60} itemCount={6} style={{ color: '#00318B' }} >
                                        {renderRow}
                                    </FixedSizeList>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>

                </Grid>
            </Grid>

            <Footer />

        </div>
    );
}
