import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, Slide, Button, Grid, } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer
} from "@react-pdf/renderer";
// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: "#fff",
        color: "black"
    },
    Headersection: {
        margin: 10,
        padding: 10,
    },
    Header: {
        flexDirection: "row",
        border: "1px solid gray",
        backgroundColor: '#2C7FB2'
    },
    body: {
        border: "1px solid gray",
        backgroundColor: '#FFF',
    },
    section: {
        margin: 5,
        padding: 5,
        border: '1px solid black'
    },
    viewer: {
        width: '100%', //the pdf viewer will take up all of the width and height
        height: '550%'
    },
    hdText: {
        color: '#FFF',
        fontSize: 14,
    },
    Text: {
        color: '#707070',
        fontSize: 12,
        textAlign: 'center'
    },
    table: {
        width: '100%',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        borderTop: '1px solid #EEE',
        paddingTop: 8,
        paddingBottom: 8,
    },
    header: {
        borderTop: 'none',
    },
    bold: {
        fontSize: 12,
        Overflow: 'wrap'
    },
    // So Declarative and unDRY 👌
    row1: {
        width: '18%',
        padding: 5
    },
    row2: {
        width: '11%',
        padding: 2
    },
    row3: {
        padding: 2,
        width: '12%',
        textAlign: 'center'
    },
    row4: {
        textAlign: 'center',
        padding: 2,
        width: '13%',
    },
    row5: {
        textAlign: 'center',
        padding: 2,
        width: '17%',
    },
    row6: {
        textAlign: 'center',
        padding: 2,
        width: '12%',
    },
    row7: {
        textAlign: 'center',
        padding: 2,
        width: '18%',
    },
    //for finance
    frow1: {
        textAlign: 'center',
        width: '18%',
        padding: 2
    },
    frow2: {
        width: '18%',
        padding: 2,
        textAlign: 'center'
    },
    frow3: {
        padding: 2,
        width: '14%',
        textAlign: 'center'
    },
    frow4: {
        textAlign: 'center',
        padding: 2,
        width: '13%',
    },
    frow5: {
        textAlign: 'center',
        padding: 2,
        width: '17%',
    },
});

const Show_pdf_data = ({ show, data, column, handleclose, Type }) => {
    const classes = useStyles();

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const Delete_Api = async (PatientId) => {

        const request = await Delete_home_visitor_Details_by_id(PatientId);
        let response = JSON.parse(request);
        if (response.success == '200') {
            alert(response.message);
            window.location.reload();
        }
        else {
            alert(request);
        }
    }
    console.log(column)
    if (Type === 'Finance') {
        return (
            <>
                <Dialog
                    open={show}
                    fullScreen
                    TransitionComponent={Transition}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <div>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <Typography variant="h6" className={classes.title}>
                                    Download PDF
                                </Typography>
                                <IconButton edge="start" color="inherit" onClick={handleclose} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <PDFViewer style={styles.viewer}>
                            {/* Start of the document*/}
                            <Document>
                                {/*render a single page*/}
                                <Page size="A4" style={styles.page}>
                                    <View style={styles.Header}>
                                        {column.map(v => (
                                            <>
                                                <View style={styles.Headersection}>
                                                    <Text style={styles.hdText}>{v.headerName}</Text>
                                                </View>
                                            </>
                                        ))}
                                    </View>
                                    <View style={styles.body}>
                                        {data.map((v, i) => (
                                            <>
                                                <View key={i} style={styles.row} wrap={false}>
                                                    <Text style={styles.frow1}>
                                                        <Text style={styles.bold}>{v.PFName} {v.PLName}</Text>
                                                    </Text>
                                                    <Text style={styles.frow2}>
                                                        <Text style={styles.bold}>{v.DFName}{v.DLName}</Text>
                                                    </Text>
                                                    <Text style={styles.frow3}>
                                                        <Text style={styles.bold}>{v.AppointmentTime}</Text>
                                                    </Text>
                                                    <Text style={styles.frow4}>
                                                        <Text style={styles.bold}>{v.AppointmentStatus}</Text>
                                                    </Text>
                                                    <Text style={styles.frow4}>
                                                        <Text style={styles.bold}>{v.cash ? v.cash : 'NA'}</Text>
                                                    </Text>
                                                    <Text style={styles.frow4}>
                                                        <Text style={styles.bold}>{v.online ? v.online : 'NA'}</Text>
                                                    </Text>
                                                    {/* <Text style={styles.row4}>
                                                        <Text style={styles.bold}>{v.AppointmentStatus}</Text>
                                                    </Text> */}
                                                </View>
                                            </>
                                        ))}
                                    </View>

                                </Page>
                            </Document>
                        </PDFViewer>
                    </div>
                </Dialog>
            </>
        )
    }
    else if (Type === 'Staff') {
        return (
            <>
                <Dialog
                    open={show}
                    fullScreen
                    TransitionComponent={Transition}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <div>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <Typography variant="h6" className={classes.title}>
                                    Download PDF
                                </Typography>
                                <IconButton edge="start" color="inherit" onClick={handleclose} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <PDFViewer style={styles.viewer}>
                            {/* Start of the document*/}
                            <Document>
                                {/*render a single page*/}
                                <Page size="A4" style={styles.page}>
                                    <View style={styles.Header}>
                                        {column.map(v => (
                                            <>
                                                <View style={styles.Headersection}>
                                                    <Text style={styles.hdText}>{v.headerName}</Text>
                                                </View>
                                            </>
                                        ))}
                                    </View>
                                    <View style={styles.body}>
                                        {data.map((v, i) => (
                                            <>
                                                <View key={i} style={styles.row} wrap={false}>
                                                    <Text style={styles.frow2}>
                                                        <Text style={styles.bold}>{v.DFName}{v.DLName}</Text>
                                                    </Text>
                                                    <Text style={styles.frow3}>
                                                        <Text style={styles.bold}>{v.AppointmentTime}</Text>
                                                    </Text>
                                                    <Text style={styles.frow4}>
                                                        <Text style={styles.bold}>{v.AppointmentStatus}</Text>
                                                    </Text>
                                                    <Text style={styles.frow4}>
                                                        <Text style={styles.bold}>{v.cash ? v.cash : 'NA'}</Text>
                                                    </Text>
                                                    <Text style={styles.frow4}>
                                                        <Text style={styles.bold}>{v.online ? v.online : 'NA'}</Text>
                                                    </Text>
                                                    {/* <Text style={styles.row4}>
                                                        <Text style={styles.bold}>{v.AppointmentStatus}</Text>
                                                    </Text> */}
                                                </View>
                                            </>
                                        ))}
                                    </View>

                                </Page>
                            </Document>
                        </PDFViewer>
                    </div>
                </Dialog>
            </>
        )
    }
    else if (Type === 'Home Visitor') {
        return (
            <>
                <Dialog
                    open={show}
                    fullScreen
                    TransitionComponent={Transition}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <div>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <Typography variant="h6" className={classes.title}>
                                    Download PDF
                                </Typography>
                                <IconButton edge="start" color="inherit" onClick={handleclose} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <PDFViewer style={styles.viewer}>
                            {/* Start of the document*/}
                            <Document>
                                {/*render a single page*/}
                                <Page size="A4" style={styles.page}>
                                    <View style={styles.Header}>
                                        {column.map(v => (
                                            <>
                                                <View style={styles.Headersection}>
                                                    <Text style={styles.hdText}>{v.headerName}</Text>
                                                </View>
                                            </>
                                        ))}
                                    </View>
                                    <View style={styles.body}>
                                        {data.map((v, i) => (
                                            <>
                                                <View key={i} style={styles.row} wrap={false}>
                                                    <Text style={styles.frow1}>
                                                        <Text style={styles.bold}>{v.PFName}{v.PLName}</Text>
                                                    </Text>
                                                    <Text style={styles.frow2}>
                                                        <Text style={styles.bold}>{v.DFName}{v.DLName}</Text>
                                                    </Text>
                                                    <Text style={styles.frow3}>
                                                        <Text style={styles.bold}>{v.AppointmentTime}</Text>
                                                    </Text>
                                                    <Text style={styles.frow4}>
                                                        <Text style={styles.bold}>{v.AppointmentStatus}</Text>
                                                    </Text>
                                                    <Text style={styles.frow4}>
                                                        <Text style={styles.bold}>{v.PaymentMode}</Text>
                                                    </Text>
                                                    {/* <Text style={styles.row4}>
                                                        <Text style={styles.bold}>{v.AppointmentStatus}</Text>
                                                    </Text> */}
                                                </View>
                                            </>
                                        ))}
                                    </View>

                                </Page>
                            </Document>
                        </PDFViewer>
                    </div>
                </Dialog>
            </>
        )
    }
    else {
        return (
            <>
                <Dialog
                    open={show}
                    fullScreen
                    TransitionComponent={Transition}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <div>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <Typography variant="h6" className={classes.title}>
                                    Download PDF
                                </Typography>
                                <IconButton edge="start" color="inherit" onClick={handleclose} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <PDFViewer style={styles.viewer}>
                            {/* Start of the document*/}
                            <Document>
                                {/*render a single page*/}
                                <Page size="A4" style={styles.page} wrap>
                                    <View style={styles.Header}>
                                        {column.map(v => (
                                            <>
                                                <View style={styles.Headersection}>
                                                    <Text style={styles.hdText} break>{v.headerName}</Text>
                                                </View>
                                            </>
                                        ))}
                                    </View>
                                    <View style={styles.body}>
                                        {data.map((v, i) => (
                                            <>
                                                <View key={i} style={styles.row} wrap={false}>
                                                    <Text style={styles.row1}>
                                                        <Text style={styles.bold}>{v.FirstName} {v.LastName}</Text>
                                                    </Text>
                                                    <Text style={styles.row2}>
                                                        <Text style={styles.bold}>{v.AppointmentDate}</Text>
                                                    </Text>
                                                    <Text style={styles.row3}>
                                                        <Text style={styles.bold}>{v.AppointmentTime}</Text>
                                                    </Text>
                                                    <Text style={styles.row4}>
                                                        <Text style={styles.bold}>{v.AppointmentStatus}</Text>
                                                    </Text>
                                                    <Text style={styles.row5}>
                                                        <Text style={styles.bold}>{v.AppointmentChannel}</Text>
                                                    </Text>
                                                    <Text style={styles.row6}>
                                                        <Text style={styles.bold}>{v.PaymentMode}</Text>
                                                    </Text>
                                                    <Text style={styles.row7}>
                                                        <Text style={styles.bold}>{v.TotalAmount}</Text>
                                                    </Text>
                                                </View>
                                            </>
                                        ))}
                                    </View>

                                </Page>
                            </Document>
                        </PDFViewer>
                    </div>
                </Dialog>
            </>
        )
    }
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        backgroundColor: '#2C7FB2'
    },
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

export default Show_pdf_data;
