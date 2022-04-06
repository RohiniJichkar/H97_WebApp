import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Container, FormControl, TextField, Typography, Button, Avatar, Table, TableContainer, TableBody, TableCell, TableHead, InputBase, TableRow, TablePagination, Drawer, Divider, MenuItem, Menu, ListItem, ListItemIcon, ListItemText, List, IconButton, Grid, Paper, Link } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import DoctorNavbar from './Doctor_Navbar';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CancleIcon from '@material-ui/icons/CancelRounded';

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
        fontWeight: 400,
        
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
    btnUpload: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 130,
    },
    btnSearch: {
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
        width: 100,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#00318B',
        paddingTop: 50,
        borderRadius: 20,
        marginLeft: 50
    },
    facilitiesInput: {
        fontSize: 16,
        color: '#00318B !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 600,
        padding: 2
    },

    textField: {
        borderRadius: 5, 
        border: '1px solid gray',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontSize: 12,
        fontWeight: 400,
    }
}));


export default function DoctorAddFacilities() {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
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
                            fontWeight: 600,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#2C7FB2',

                        }}>
                        Add Facilities
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4} style={{ paddingTop: 30 }}>
                    <Paper elevation={6} className={classes.paper} style={{ borderRadius: 10, paddingTop: 20, paddingBottom: 20 }}>
                        
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
                          
                            <Grid item xs={3} style={{alignSelf: 'center'}}>
                               <Button  className={classes.btnview} size="small" style={{ float:'right', fontSize: 11, textAlign: 'center' }}>Search</Button> 
                            </Grid>
                            <Grid item xs={3} style={{alignSelf: 'center',}}>
                               <Button  className={classes.btnview} size="small" style={{float:'right',  fontSize: 11, textAlign: 'center' }}>View Facility</Button> 
                            </Grid>
                           

                        </Grid>
                        {/* <SearchIcon className={classes.searchIcon} />
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
                        <Button className={classes.btnview} size="small" style={{ fontSize: 12, marginLeft: 15 }}>Search</Button>
                        <Button className={classes.btnview} size="small" style={{ fontSize: 12, marginLeft: 15 }}>View Facility</Button> */}

                        {/* <Grid item xs={12} sm={12}>
                            <Paper className={classes.paper}> */}
                        <TableContainer style={{ paddingTop: 20 }}>
                            <Table stickyHeader aria-label="sticky table" >
                                <TableHead>
                                    <TableRow >
                                        {columns.map((column) => (
                                            <TableCell
                                                size="small"
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
                                                    fontSize: 12,
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
                                                            <TableCell key={column.id} align={column.align} size="small" style={{
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

                        <Divider />
                        <Grid container xs={12} style={{ paddingTop: 75 }}>
                            <Grid item xs={6}>
                                <center> <Button className={classes.btnUpload} size="small" style={{ fontSize: 12 }}>Upload</Button> </center>
                            </Grid>
                            <Grid item xs={6}>
                                <center>   <Button size="small" className={classes.btnSearch} style={{ fontSize: 12 }}>View Report</Button> </center>
                            </Grid>
                        </Grid>

                    </Paper>
                </Grid>

                {/* Start Facility Grid */}
                <Grid item xs={12} sm={5} style={{ paddingTop: 30, marginLeft: 130, marginRight: 40 }}>
                    {/* Start Facility Paper */}
                    <Paper elevation={6} style={{ paddingLeft: 20, borderRadius: 10, paddingTop: 20, paddingBottom: 20 }}>
                        <Typography variant="h6" noWrap={true}
                            style={{
                                fontFamily: '"Poppins", san-serif;',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                color: '#00318B',

                            }}>
                            Facility
                        </Typography>


                        <Grid container spacing={2} style={{ paddingTop: 20 }}>
                            <Grid item sm={6} >
                                <Typography variant="h6" noWrap={true} className={classes.facilitiesInput}>Sonography</Typography>
                                <Typography variant="h6" noWrap={true} className={classes.facilitiesInput}>1000 Rs</Typography>
                                <Typography variant="h6" noWrap={true} className={classes.facilitiesInput}>UltraSound</Typography>

                            </Grid>
                            <Grid item sm={6} style={{ marginTop: '-40px', align: 'right' }}>
                                <Paper elevation={3} className={classes.groupreports}>
                                    Sonography
                                    <div style={{ marginTop: 55 }}>
                                        <EditIcon style={{ backgroundColor: '#2C7FB2', color: '#fff', borderRadius: 15, marginLeft: 5, padding: 4 }} />
                                        <CancleIcon style={{ backgroundColor: '#2C7FB2', color: '#fff', borderRadius: 15, marginLeft: 10, padding: 4 }} />

                                    </div>
                                </Paper>

                            </Grid>

                        </Grid>

                        <Divider style={{ marginTop: 20, border: '1px solid #F0F0F0' }} />

                        {/* Start Edit Container Grid */}
                        <Grid container spacing={2} style={{ paddingTop: 30, paddingRight: 20 }}>
                            <Grid item sm={12} >
                                <Typography style={{
                                    fontFamily: '"Poppins", san-serif;',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#00318B',

                                }}>
                                    Edit Facility
                                </Typography>
                            </Grid>
                            <Grid item sm={6} >
                                <input className={classes.textField} name="Name" label="Name" style={{ width: 180 }}/>
                            </Grid>
                            <Grid item sm={3} >
                                <select className={classes.textField} name="Category" id="Category" >
                                    <option value="sonography">Sonography</option>
                                    <option value="colposcopy">Colposcopy</option>
                                    <option value="bloodtest">Blood Test</option>
                                    <option value="ECG">ECG</option>
                                </select>
                            </Grid>
                            <Grid item sm={3} >
                                <input className={classes.textField} name="Discount" label="Discount" style={{ width: 110 }} />
                            </Grid>
                            <Grid item sm={6} >
                                <textarea className={classes.textField} id="Description" name="Description" rows="1" label="Description" style={{ width: 180 }}>
                                </textarea>
                            </Grid>
                            <Grid item sm={6} >
                                <input className={classes.textField} name="Service Cost" label="Service Cost" style={{ width: 230 }} />
                            </Grid>

                            {/* End Edit Facitlity */}
                        </Grid>
                        <Divider style={{ border: '1px solid #F0F0F0', marginTop: 5 }} />
                        {/* Start Button Container */}
                        <Grid container style={{ paddingTop: 15 }}>
                            <Grid item xs={6} >
                                <center> <Button className={classes.btnUpload} size="small" style={{ fontSize: 12 }}>Cancle</Button> </center>

                            </Grid>
                            <Grid item xs={6}>
                                <center><Button className={classes.btnUpload} size="small" style={{ fontSize: 12 }}>Save</Button></center>
                            </Grid>

                            {/* End Button Container */}
                        </Grid>
                        {/* End Facitlity Paper */}
                    </Paper>
                    {/* End Facilties */}
                </Grid>
            </Grid> {/* main grid */}

        </div >
    );
}
