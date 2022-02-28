// import React, { useState, useEffect } from 'react';
// import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
// import { useNavigate } from 'react-router-dom';
// import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField, Slide, Select, FormControl, Button, IconButton, Grid, InputLabel, Radio, Typography, Paper, Link } from "@material-ui/core";
// import CloseIcon from '@material-ui/icons/Close';
// import { EditPatient } from '../../../Apis/Clinic_Patients/Edit_Patient';
// import { EditStaffdata } from '../../../Apis/Clinic_Staff/index';
// import { Doctor_Category} from '../../../Apis/Clinic_Staff/index';
// import { Times} from '../../../Apis/Clinic_Staff/index';
// const drawerWidth = 240;

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });



// export default function Edit_staff({ show, data, handleCloseEditmodal }) {
//     const classes = useStyles();
//     const theme = useTheme();
//     const navigate = useNavigate();
//     let obj = JSON.stringify(data);
//     let parse=JSON.parse(obj)
    
//     const [maxWidth, setMaxWidth] = React.useState('md');
//     const [firstnm, setfirstnm] = useState(parse[0].FirstName);
//     const [lastnm, setlastnm] = useState(obj ? obj.LastName : '');
//     const [mobile, setmobile] = useState(obj ? obj.MobileNo : '');
//     const [email, setemail] = useState(obj ? obj.Email : '');

//     // const [gender, setgender] = useState(obj ? obj?.Gender : '');
//     // const [address, setaddress] = useState(obj ? obj?.Address : '');
//     // const [city, setcity] = useState(obj ? obj?.City : '');
//     // const [pincode, setpincode] = useState(obj ? obj?.Pincode : '');
//     // const [state, setstate] = useState(obj ? obj?.State : '');
//     // const [country, setcountry] = useState(obj ? obj?.Country : '');
//     // const [height, setheight] = useState(obj ? obj?.Height : '');
//     // const [weight, setweight] = useState(obj ? obj?.Weight : '');

//     const [editfirstName, seteditfirstName] = useState(parse[0].FirstName);
//     const [editlastName, seteditlastName] = useState(parse[0].LastName);
//     const [editmobile, seteditmobile] = useState(parse[0]. MobileNo);
//     const [editaddress, seteditaddress] = useState(parse[0]. Address);
//     const [editeducation, setediteducation] = useState(parse[0].Education);
//     const [editemail, seteditemail] = useState(parse[0].Email);
//     const [editgender, seteditgender] = useState(parse[0].Gender);
//     const [editpassword, seteditpassword] = useState(parse[0]. Password);
//     const [editcategory, seteditcategory] = useState(parse[0]. Category);
//     const [editrole, seteditrole] = useState(parse[0].role);
//     const [doctorCategory, setdoctorCategory] = useState([]);
//     const [times, settimes] = useState([]);
//     const [editmorningStartTime, seteditmorningStartTime] = useState(parse[0]. morningStartTime);
//     const [editmorningEndTime, seteditmorningEndTime] = useState(parse[0].morningEndTime);
//     const [editeveningStartTime, setediteveningStartTime] = useState(parse[0]. eveningStartTime);
//     const [editeveningEndTime, setediteveningEndTime] = useState(parse[0]. eveningEndTime);

//     const fetchClinicStaffData = async () => {
//         var cdata = await localStorage.getItem("userdata");
//         let parsed = JSON.parse(cdata);
//         let clinicid = parsed.ClinicId;
       
        
//         const object = {
//             ClinicId: clinicid,
//             UserId: parse[0].UserId,
//             FirstName: editfirstName,
//             LastName: editlastName,
//             MobileNo: editmobile,
//             Education: editeducation,
//             Email: editemail,
//             Password: editpassword,
//             Gender: editgender,
//             Category: editcategory,
//             role: editrole,
//             Address: editaddress,
//             morningStartTime: editmorningStartTime,
//             morningEndTime: editmorningEndTime,
//             eveningStartTime: editeveningStartTime,
//             eveningEndTime: editeveningEndTime,


//             // City: city,
//             // Pincode: pincode,
//             // State: state,
//             // Country: country,
//             // Height: height,
//             // Weight: weight
//         }
//         const editPatientRequest = await EditStaffdata(object);
//         alert(editPatientRequest);
//         window.location.reload();

        

//     }
//     const fetchDoctorCategory = async () => {
//         const category = await Doctor_Category();
//         setdoctorCategory(category);
//     }
//     const fetchTimes = async () => {
//         const times = await Times();
//         settimes(times);
//     }

//     useEffect(() => {

        
//         fetchDoctorCategory();
//         fetchTimes();
//     }, []);

//     return (
//         <>
//             {/* Edit Patient Details */}

//             <Dialog
//                 open={show}
//                 onClose={handleCloseEditmodal}
//                 maxWidth={maxWidth}
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//             >
//                 <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Edit Details"}
//                     <IconButton edge="start" color="inherit" onClick={handleCloseEditmodal} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
//                         <CloseIcon />
//                     </IconButton>
//                 </DialogTitle>
//                 <DialogContent>
//                     <DialogContentText id="alert-dialog-description">
//                         <Grid container>
//                             <Grid item xs={6} style={{ borderRight: '1px solid #F0F0F0' }}>
//                                 <center>
//                                     <div>
//                                         <TextField className={classes.inputFields} value={editfirstName} onChange={(e) => seteditfirstName(e.target.value)} id="outlined-basic" size="small" label="First Name" variant="outlined" />
//                                         <TextField className={classes.inputFields} value={editlastName} onChange={(e) => seteditlastName(e.target.value)} id="outlined-basic" size="small" label="Last Name" variant="outlined" />
//                                         <TextField className={classes.inputFields} value={editmobile} onChange={(e) => seteditmobile(e.target.value)} id="outlined-basic" type="number" size="small" label="Mobile Number" variant="outlined" />
//                                         <TextField className={classes.inputFields} value={editemail} onChange={(e) => seteditemail(e.target.value)} id="outlined-basic" type="email" size="small" label="Email Id" variant="outlined" />
//                                         <TextField className={classes.inputFields} value={editpassword} onChange={(e) => seteditpassword(e.target.value)} type="password" id="outlined-basic" size="small" label="Password" variant="outlined" />
//                                         <TextField className={classes.inputFields} multiline
//                                             rows={3}
//                                             rowsMax={5} id="outlined-basic" size="small" label="Address" variant="outlined" value={editaddress} onChange={(e) => seteditaddress(e.target.value)}
//                                         />
//                                     </div>
//                                 </center>
//                             </Grid>


//                             <Grid item xs={6}>
//                                 <center>
//                                     <Grid container style={{ marginTop: '-15px' }}>
//                                         <Grid item xs={12} sm={6}>
//                                             <InputLabel htmlFor="outlined-age-native-simple" style={{ marginLeft: 20 }}>Doctor
//                                                 <Radio
//                                                     checked={editrole === 'Doctor'}
//                                                     color='primary'
//                                                     onChange={(e) => seteditrole(e.target.value)} 
//                                                     value={editrole}
//                                                     name="radio-button-demo"
//                                                     inputProps={{ 'aria-label': 'Doctor' }}

//                                                 /></InputLabel>
//                                         </Grid>

//                                         <Grid item xs={12} sm={6}>

//                                             <InputLabel htmlFor="outlined-age-native-simple" style={{ marginRight: 30 }}>Receptionist

//                                                 <Radio
//                                                     checked={editrole === 'Receptionist'}
//                                                     onChange={(e) => seteditrole(e.target.value)} value={editrole}
//                                                     color='primary'
//                                                     name="radio-button-demo"
//                                                     inputProps={{ 'aria-label': 'Receptionist' }}
//                                                 /></InputLabel>

//                                         </Grid>
//                                         <Grid xs={12} style={{ marginTop: 5 }}>
//                                             <FormControl variant="outlined" size="small" className={classes.formControlForm} style={{ width: '73%' }} >
//                                                 <InputLabel htmlFor="outlined-age-native-simple" style={{ marginLeft: 20 }}>Gender</InputLabel>
//                                                 <Select
//                                                     className={classes.textFieldForm}
//                                                     size='large'
//                                                     native
//                                                     value={editgender}
//                                                     onChange={(e) => seteditgender(e.target.value)}
//                                                     label="Gender"
//                                                     inputProps={{
//                                                         name: 'gender',
//                                                         id: 'outlined-gender-native-simple',
//                                                     }}
//                                                     style={{ width: '90%', fontSize: 14 }}
//                                                 >
//                                                     <option aria-label="None" value="" />
//                                                     <option value={"Male"}>Male</option>
//                                                     <option value={"Female"}>Female</option>

//                                                 </Select>
//                                             </FormControl>
//                                         </Grid>
//                                     </Grid>

//                                     <div >
//                                         <TextField className={classes.inputFields} value={editeducation} onChange={(e) => setediteducation(e.target.value)} id="outlined-basic" label="Education" variant="outlined" size="small" />
//                                         {/* <TextField className={classes.inputFields} id="outlined-basic" label="Category" variant="outlined" size="small" />  */}
//                                         <Grid xs={12} >
//                                             <FormControl variant="outlined" size="small" className={classes.formControlForm} style={{ width: '73%' }} >
//                                                 <InputLabel htmlFor="outlined-age-native-simple" style={{ marginLeft: 20 }}>Category</InputLabel>
//                                                 <Select
//                                                     className={classes.textFieldForm}
//                                                     size='large'
//                                                     native
//                                                     value={editcategory}
//                                                     onChange={(e) => seteditcategory(e.target.value)}
//                                                     label="Category"
//                                                     inputProps={{
//                                                         name: 'category',
//                                                         id: 'outlined-category-native-simple',
//                                                     }}
//                                                     style={{ width: '90%', fontSize: 14 }}
//                                                 >
//                                                     <option aria-label="None" value="" >Category</option>
//                                                     {doctorCategory.map((item) => {
//                                                         return (
//                                                             <option value={item.Category}>{item.Category}</option>
//                                                         )
//                                                     })}
//                                                 </Select>
//                                             </FormControl>
//                                         </Grid>
//                                         <Grid item xs={12}>
//                                             <center>
//                                                 <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
//                                                     Morning Shift Time
//                                                 </Typography>
//                                             </center>
//                                         </Grid>

//                                         <Grid container style={{ padding: 5 }}>
//                                             <Grid item xs={6}>
//                                                 <center>
//                                                     <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', marginLeft: 50 }}>
//                                                         Start Time
//                                                     </Typography>
//                                                 </center>
//                                             </Grid>
//                                             <Grid item xs={6}>
//                                                 <center>
//                                                     <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', marginRight: 50 }}>
//                                                         End Time
//                                                     </Typography>
//                                                 </center>
//                                             </Grid>
//                                         </Grid>
//                                         <Grid container>
//                                             <Grid item xs={6}>
//                                                 <center>
//                                                     <FormControl variant="outlined" size="small" className={classes.formControlForm} style={{ width: '65%', float: 'right', marginRight: 10 }} >

//                                                         <Select
//                                                             className={classes.textFieldForm}
//                                                             size='large'
//                                                             native
//                                                             value={editmorningStartTime}
//                                                             onChange={(e) => seteditmorningStartTime(e.target.value)}
//                                                             label="Start Time"
//                                                             inputProps={{
//                                                                 name: 'start time',
//                                                                 id: 'outlined-start-time-native-simple',
//                                                             }}
//                                                             style={{ width: '90%', fontSize: 12 }}
//                                                         >
//                                                             <option aria-label="None" value="" >Start Time</option>
//                                                             {times.map((item) => {
//                                                                 return (
//                                                                     <option value={item.ActualTime}>{item.DisplayTime}</option>
//                                                                 )
//                                                             })}

//                                                         </Select>
//                                                     </FormControl>
//                                                 </center>
//                                             </Grid>

//                                             <Grid item xs={6}>
//                                                 <center>
//                                                     <FormControl variant="outlined" size="small" className={classes.formControlForm} style={{ width: '65%', float: 'left', marginLeft: 10 }} >

//                                                         <Select
//                                                             className={classes.textFieldForm}
//                                                             size='large'
//                                                             native
//                                                             value={editmorningEndTime}
//                                                             onChange={(e) => seteditmorningEndTime(e.target.value)}
//                                                             label="End Time"
//                                                             inputProps={{
//                                                                 name: 'end time',
//                                                                 id: 'outlined-end-time-native-simple',
//                                                             }}
//                                                             style={{ width: '90%', fontSize: 12 }}
//                                                         >
//                                                             <option aria-label="None" value="" >End Time</option>
//                                                             {times.map((item) => {
//                                                                 return (
//                                                                     <option value={item.ActualTime}>{item.DisplayTime}</option>
//                                                                 )
//                                                             })}
//                                                         </Select>
//                                                     </FormControl>
//                                                 </center>
//                                             </Grid>
//                                         </Grid>
//                                         <Grid item xs={12} style={{ marginTop: '-10px' }}>
//                                             <center>
//                                                 <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
//                                                     Evening Shift Time
//                                                 </Typography>
//                                             </center>
//                                         </Grid>

//                                         <Grid container style={{ padding: 5 }}>
//                                             <Grid item xs={6}>
//                                                 <center>
//                                                     <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', marginLeft: 50 }}>
//                                                         Start Time
//                                                     </Typography>
//                                                 </center>
//                                             </Grid>
//                                             <Grid item xs={6}>
//                                                 <center>
//                                                     <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', marginRight: 50 }}>
//                                                         End Time
//                                                     </Typography>
//                                                 </center>
//                                             </Grid>
//                                         </Grid>

//                                         <Grid container >
//                                             <Grid item xs={6}>
//                                                 <center>
//                                                     <FormControl variant="outlined" size="small" className={classes.formControlForm} style={{ width: '65%', float: 'right', marginRight: 10 }} >

//                                                         <Select
//                                                             className={classes.textFieldForm}
//                                                             size='large'
//                                                             native
//                                                             value={editeveningStartTime}
//                                                             onChange={(e) => setediteveningStartTime(e.target.value)}
//                                                             label="Start Time"
//                                                             inputProps={{
//                                                                 name: 'start time',
//                                                                 id: 'outlined-start-time-native-simple',
//                                                             }}
//                                                             style={{ width: '90%', fontSize: 12 }}
//                                                         >
//                                                             <option aria-label="None" value="" >Start Time</option>
//                                                             {times.map((item) => {
//                                                                 return (
//                                                                     <option value={item.ActualTime}>{item.DisplayTime}</option>
//                                                                 )
//                                                             })}

//                                                         </Select>
//                                                     </FormControl>
//                                                 </center>
//                                             </Grid>

//                                             <Grid item xs={6}>
//                                                 <center>
//                                                     <FormControl variant="outlined" size="small" className={classes.formControlForm} style={{ width: '65%', float: 'left', marginLeft: 10 }} >

//                                                         <Select
//                                                             className={classes.textFieldForm}
//                                                             size='large'
//                                                             native
//                                                             value={editeveningEndTime}
//                                                             onChange={(e) => setediteveningEndTime}
//                                                             label="End Time"
//                                                             inputProps={{
//                                                                 name: 'end time',
//                                                                 id: 'outlined-end-time-native-simple',
//                                                             }}
//                                                             style={{ width: '90%', fontSize: 12 }}
//                                                         >
//                                                             <option aria-label="None" value="" >End Time</option>
//                                                             {times.map((item) => {
//                                                                 return (
//                                                                     <option value={item.ActualTime}>{item.DisplayTime}</option>
//                                                                 )
//                                                             })}
//                                                         </Select>
//                                                     </FormControl>
//                                                 </center>
//                                             </Grid>
//                                         </Grid>

//                                     </div>
//                                 </center>
//                             </Grid>
//                             <Grid container>
//                                 <Grid xs={12} sm={6}>
//                                     <Button className={classes.btnCancle} onClick={handleCloseEditmodal} style={{ float: 'right', marginRight: 20 }}>
//                                         Cancle
//                                     </Button>
//                                 </Grid>
//                                 <Grid xs={12} sm={6}>
//                                     <Button className={classes.btnCancle} onClick={fetchClinicStaffData} autoFocus style={{ float: 'left', marginLeft: 20 }}>
//                                         Submit
//                                     </Button>
//                                 </Grid>
//                             </Grid>

//                         </Grid>
//                     </DialogContentText>
//                 </DialogContent>

//             </Dialog>

//         </>
//     );
// }

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         flexGrow: 1,
//         backgroundColor: 'white',
//     },
//     title: {
//         flexGrow: 1,
//     },
//     hide: {
//         display: 'none',
//     },
//     content: {
//         flexGrow: 1,
//         padding: theme.spacing(2),
//     },
//     paper: {
//         padding: theme.spacing(1),
//         color: '#78B088',
//         fontFamily: '"Poppins", san-serif;',
//         fontStyle: 'normal',
//         fontWeight: 800,
//         overflow: 'hidden',
//         whiteSpace: 'nowrap',
//         textOverflow: 'ellipsis',
//     },
//     grid: {
//         overflow: 'hidden',
//         whiteSpace: 'nowrap',
//         textOverflow: 'ellipsis',
//         marginTop: 70,
//         marginLeft: 25,
//         marginRight: 1
//     },
//     gridShift: {
//         marginLeft: drawerWidth,
//         width: `calc(100% - ${drawerWidth}px)`,
//         transition: theme.transitions.create(['width', 'margin'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//     },
//     griditem: {
//         color: '#2C7FB2',
//     },
//     paperServices: {
//         padding: theme.spacing(1),
//         color: '#00318B',
//         fontFamily: '"Poppins", san-serif;',
//         fontStyle: 'normal',
//         fontWeight: 800,
//         overflow: 'hidden',
//         whiteSpace: 'nowrap',
//         textOverflow: 'ellipsis',
//         textAlign: 'center',

//     },
//     gridServices: {
//         overflow: 'hidden',
//         whiteSpace: 'nowrap',
//         textOverflow: 'ellipsis',
//         fontFamily: '"Poppins", san-serif;',
//         fontStyle: 'normal',
//         fontWeight: 800,
//         textAlign: 'center',

//     },
//     search: {
//         position: 'relative',
//         borderRadius: theme.shape.borderRadius,
//         backgroundColor: alpha(theme.palette.common.white, 0.15),
//         '&:hover': {
//             backgroundColor: alpha(theme.palette.common.white, 0.25),
//         },
//         marginRight: theme.spacing(2),
//         marginLeft: 0,
//         width: '100%',
//         [theme.breakpoints.up('sm')]: {
//             marginLeft: theme.spacing(3),
//             width: 'auto',
//         },
//         fontFamily: '"Poppins", san-serif;',
//         fontStyle: 'normal',
//         fontWeight: 800,

//     },
//     searchIcon: {
//         paddingTop: 10,
//         position: 'absolute',
//         pointerEvents: 'none',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         color: "gray",
//     },
//     inputRoot: {
//         color: 'inherit',
//         fontFamily: '"Poppins", san-serif;',
//         fontStyle: 'normal',
//         fontWeight: 200,
//     },
//     inputInput: {
//         padding: theme.spacing(0, 0, 0, 0),
//         // vertical padding + font size from searchIcon
//         paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
//         transition: theme.transitions.create('width'),
//         width: '100%',
//         [theme.breakpoints.up('md')]: {
//             width: '30ch',
//             height: '30px'
//         },
//         border: '1px solid lightgray',
//         borderRadius: 20,
//         fontFamily: '"Poppins", san-serif;',
//         fontStyle: 'normal',
//         fontWeight: 400,
//         fontSize: 11,
//         color: 'gray'
//     },
//     btnview: {
//         backgroundColor: '#2C7FB2 !important',
//         color: '#fff !important',
//         fontFamily: '"Poppins", san-serif;',
//         fontStyle: 'normal',
//         fontWeight: 400,
//         textAlign: 'center',
//         borderRadius: 25,
//         paddingLeft: 35,
//         paddingRight: 35,
//         float: 'right'
//     },
//     headingAddMedicine: {
//         color: '#00318B !important',
//         fontFamily: '"Poppins", san-serif;',
//         fontStyle: 'normal',
//         fontWeight: 400,
//         overflow: 'hidden',
//         whiteSpace: 'nowrap',
//         textOverflow: 'ellipsis',
//     },
//     inputFields: {
//         // [`& fieldset`]: {
//         //     borderRadius: 25,
//         // },
//         width: 300,
//         fontFamily: 'Poppins',
//         fontStyle: 'normal',
//         fontWeight: 200,
//         marginBottom: 20
//     },
//     formControl: {
//         margin: theme.spacing(1),
//         minWidth: 180,
//     },
//     btnAdd: {
//         backgroundColor: '#2C7FB2 !important',
//         color: '#fff !important',
//         fontFamily: '"Poppins", san-serif;',
//         fontStyle: 'normal',
//         fontWeight: 400,
//         textAlign: 'center',
//         borderRadius: 28,
//         width: 130,
//     },
//     btnCancle: {
//         backgroundColor: '#2C7FB2 !important',
//         color: '#fff !important',
//         fontFamily: 'Poppins',
//         fontStyle: 'normal',
//         fontWeight: 400,
//         textAlign: 'center',
//         borderRadius: 28,
//         width: 120,
//         marginTop: 10,
//         fontSize: 12
//     },
//     btnregister: {
//         backgroundColor: '#2C7FB2 !important',
//         color: '#fff !important',
//         fontFamily: 'Poppins',
//         fontStyle: 'normal',
//         fontWeight: 400,
//         textAlign: 'center',
//         borderRadius: 28,
//         width: 120,
//         marginTop: 10,
//         fontSize: 12
//     },
// }));







import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField, Slide, Select, FormControl, Button, IconButton, Grid, InputLabel, Radio, Typography, Paper, Link } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { EditPatient } from '../../../Apis/Clinic_Patients/Edit_Patient';
import { EditStaffdata } from '../../../Apis/Clinic_Staff/index';
import { Doctor_Category} from '../../../Apis/Clinic_Staff/index';
import { Times} from '../../../Apis/Clinic_Staff/index';
const drawerWidth = 240;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});




export default function Edit_staff({ show, data, handleCloseEditmodal }) {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    let obj = JSON.stringify(data);
    let parse=JSON.parse(obj)
    
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [firstnm, setfirstnm] = useState(parse[0].FirstName);
    const [lastnm, setlastnm] = useState(obj ? obj.LastName : '');
    const [mobile, setmobile] = useState(obj ? obj.MobileNo : '');
    const [email, setemail] = useState(obj ? obj.Email : '');

    // const [gender, setgender] = useState(obj ? obj?.Gender : '');
    // const [address, setaddress] = useState(obj ? obj?.Address : '');
    // const [city, setcity] = useState(obj ? obj?.City : '');
    // const [pincode, setpincode] = useState(obj ? obj?.Pincode : '');
    // const [state, setstate] = useState(obj ? obj?.State : '');
    // const [country, setcountry] = useState(obj ? obj?.Country : '');
    // const [height, setheight] = useState(obj ? obj?.Height : '');
    // const [weight, setweight] = useState(obj ? obj?.Weight : '');

    const [editfirstName, seteditfirstName] = useState(parse[0].FirstName);
    const [editlastName, seteditlastName] = useState(parse[0].LastName);
    const [editmobile, seteditmobile] = useState(parse[0]. MobileNo);
    const [editaddress, seteditaddress] = useState(parse[0]. Address);
    const [editeducation, setediteducation] = useState(parse[0].Education);
    const [editemail, seteditemail] = useState(parse[0].Email);
    const [editgender, seteditgender] = useState(parse[0].Gender);
    // const [editpassword, seteditpassword] = useState(parse[0]. Password);
    const [editcategory, seteditcategory] = useState(parse[0]. Category);
    const [editrole, seteditrole] = useState(parse[0].role);
    const [doctorCategory, setdoctorCategory] = useState([]);
    const [times, settimes] = useState([]);
    const [editmorningStartTime, seteditmorningStartTime] = useState(parse[0]. morningStartTime);
    const [editmorningEndTime, seteditmorningEndTime] = useState(parse[0].morningEndTime);
    const [editeveningStartTime, setediteveningStartTime] = useState(parse[0]. eveningStartTime);
    const [editeveningEndTime, setediteveningEndTime] = useState(parse[0]. eveningEndTime);
 
    const [openModal, setopenModal] = React.useState(false);

   

    const fetchClinicStaffData = async () => {
        var cdata = await localStorage.getItem("userdata");
        let parsed = JSON.parse(cdata);
        let clinicid = parsed.ClinicId;
       
        
        const object = {
            ClinicId: clinicid,
            UserId: parse[0].UserId,
            FirstName: editfirstName,
            LastName: editlastName,
            MobileNo: editmobile,
            Education: editeducation,
            Email: editemail,
            // Password: editpassword,
            Gender: editgender,
            Category: editcategory,
            role: editrole,
            Address: editaddress,
            morningStartTime: editmorningStartTime,
            morningEndTime: editmorningEndTime,
            eveningStartTime: editeveningStartTime,
            eveningEndTime: editeveningEndTime,


            // City: city,
            // Pincode: pincode,
            // State: state,
            // Country: country,
            // Height: height,
            // Weight: weight
        }
        
    const editPatientRequest = await EditStaffdata(object);
    let par = JSON.parse(editPatientRequest);
    if (par.success === "200") {
        alert('clinic Staff Details Edited Successfully');
        handleCloseEditmodal();
        window.location.reload();
    }
    else {
        alert(par.message);
    }
}
    const fetchDoctorCategory = async () => {
        const category = await Doctor_Category();
        setdoctorCategory(category);
    }
    const fetchTimes = async () => {
        const times = await Times();
        settimes(times);
    }

    const handleGoBack = () => {
        navigate("/DoctorClinicStaff");
    };

    function disableBtn() {
        document.getElementById("outlined-category-native-simple").hidden= true;
        document.getElementById("mybtn").hidden= true;
        document.getElementById("mybtn2").hidden= true;
       
        document.getElementById("mybtn3").hidden= true;
        document.getElementById("mybtn4").hidden= true;
        document.getElementById("mybtn5").hidden= true;
        document.getElementById("mybtn6").hidden= true;
        document.getElementById("mybtn7").hidden= true;
        document.getElementById("mybtn8").hidden= true;
        document.getElementById("mybtn9").hidden= true;
        document.getElementById("mybtn10").hidden= true;
        document.getElementById("mybtn11").hidden= true;
        // document.getElementById("outlined-start-time-native-simple").disabled= true;
        // document.getElementById("outlined-end-time-native-simple").disabled= true;
        // document.getElementById("outlined-start1-time-native-simple").disabled= true;
        // document.getElementById("outlined-end1-time-native-simple").disabled= true;
      }
      function enableBtn() {
        document.getElementById("outlined-category-native-simple").hidden= false;
        document.getElementById("mybtn").hidden= false;
        document.getElementById("mybtn2").hidden= false;
        document.getElementById("mybtn3").hidden= false;
        document.getElementById("mybtn4").hidden= false;
        document.getElementById("mybtn5").hidden= false;
        document.getElementById("mybtn6").hidden= false;
        document.getElementById("mybtn7").hidden= false;
        document.getElementById("mybtn8").hidden= false;
        document.getElementById("mybtn9").hidden= false;
        document.getElementById("mybtn10").hidden= false;
        document.getElementById("mybtn11").hidden= false;
        // document.getElementById("mybtn").hidden= false;
        // document.getElementById("outlined-start-time-native-simple").disabled= false;
        // document.getElementById("outlined-end-time-native-simple").disabled= false;
        // document.getElementById("outlined-start1-time-native-simple").disabled= false;
        // document.getElementById("outlined-end1-time-native-simple").disabled= false;
      }

    useEffect(() => {

        
        fetchDoctorCategory();
        fetchTimes();
    }, []);

    return (
        <>
            {/* Edit Patient Details */}

            <Dialog
                open={show}
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
                            <Grid item xs={6} style={{ borderRight: '1px solid #F0F0F0' }}>
                                <center>
                                    <div>
                                        <TextField className={classes.inputFields} label="FirstName" 
                                        value={editfirstName} onChange={(e) => {
                                            const re = /^[A-Za-z]+$/;

                                            // if value is not blank, then test the regex

                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                seteditfirstName(e.target.value)
                                            }

                                        }}
                                        id="outlined-basic" size="small" placeholder="First Name" variant="outlined" />
                                        <TextField className={classes.inputFields} label="LastName"
                                         value={editlastName} onChange={(e) => {
                                            const re = /^[A-Za-z]+$/;

                                            // if value is not blank, then test the regex

                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                seteditlastName(e.target.value)
                                            }

                                        }} id="outlined-basic" size="small" placeholder="Last Name" variant="outlined" />
                                        <TextField className={classes.inputFields} label="Mobile"
                                        value={mobile}
                                        onChange={(e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setmobile(e.target.value)
                                            }
                                        }}id="outlined-basic" type="number" size="small" placeholder="Mobile Number" variant="outlined"
                                        onInput={(e) => {
                                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)

                                        }} />
                                        <TextField className={classes.inputFields} label="Email" 
                                        value={editemail} onChange={(e) => seteditemail(e.target.value)} id="outlined-basic" type="email" size="small" placeholder="Email Id" variant="outlined" />
                                        {/* <TextField className={classes.inputFields} value={editpassword} onChange={(e) => seteditpassword(e.target.value)} type="password" id="outlined-basic" size="small" label="Password" variant="outlined" /> */}
                                        <TextField className={classes.inputFields} multiline
                                            rows={3}
                                            rowsMax={5} id="outlined-basic" size="small" label="Address" placeholder="Address" variant="outlined" value={editaddress} onChange={(e) => seteditaddress(e.target.value)}
                                        />

                                         <Grid item xs={12} sm={6}>
                                            <InputLabel htmlFor="outlined-age-native-simple" style={{ marginLeft: -210 }}>Doctor
                                                <Radio
                                                    checked={editrole === 'Doctor'}
                                                    color='primary'
                                                    onChange={(e) => seteditrole(e.target.value)} value={editrole}
                                                  onClick={enableBtn}
                                                    value="Doctor"
                                                    name="radio-button-demo"
                                                    inputProps={{ 'aria-label': 'Doctor' }}

                                                /></InputLabel>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>

                                            <InputLabel htmlFor="outlined-age-native-simple" style={{ marginRight: -50, marginTop: -40 }}>Receptionist

                                                <Radio
                                                    checked={editrole === 'Receptionist'}
                                                    onChange={(e) => seteditrole(e.target.value)} value={editrole}
                                                    onClick={disableBtn}
                                                    value="Receptionist"
                                                    color='primary'
                                                    name="radio-button-demo"
                                                    inputProps={{ 'aria-label': 'Receptionist' }}
                                                /></InputLabel>

                                        </Grid>

                                    </div>
                                </center>
                            </Grid>


                            <Grid item xs={6}>
                                <center>
                                    <Grid container style={{ marginTop: '-5px' }}>
                                
                                        <Grid xs={12} style={{ marginTop: 5 }}>
                                            <FormControl variant="outlined" size="small" className={classes.formControlForm} style={{ width: '73%' }} >
                                                <InputLabel htmlFor="outlined-age-native-simple"  style={{ marginLeft: 20}}>Gender</InputLabel>
                                                <Select
                                                    className={classes.textFieldForm}
                                                    size='large'
                                                    native
                                                    value={editgender}
                                                    onChange={(e) => seteditgender(e.target.value)} value={editgender}
                                                    placeholder='gender'
                                                    inputProps={{
                                                        name: 'gender',
                                                        id: 'outlined-gender-native-simple',
                                                    }}
                                                    style={{ width: '90%', fontSize: 14,}}
                                                >
                                                   
                                                    <option value={"Male"}>Male</option>
                                                    <option value={"Female"}>Female</option>

                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <div >
                                        <TextField className={classes.inputFields} label="Education" value={editeducation} 
                                        onChange={(e) => {
                                            const re = /^[A-Za-z]+$/;

                                            // if value is not blank, then test the regex

                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setediteducation(e.target.value)
                                            }

                                        }}
                                         id="outlined-basic" placeholder="Education" variant="outlined" size="small" />
                                        {/* <TextField className={classes.inputFields} id="outlined-basic" label="Category" variant="outlined" size="small" />  */}
                                        <Grid xs={12} >
                                            <FormControl  id='mybtn' variant="outlined" size="small" className={classes.formControlForm} style={{ width: '73%' }} >
                                                <InputLabel  htmlFor="outlined-age-native-simple"style={{ marginLeft: 20 }}>Category</InputLabel>
                                                <Select
                                                    className={classes.textFieldForm}
                                                    size='large'
                                                    native
                                                    value={editcategory} 
                                                    
                                                    onChange={(e) => seteditcategory(e.target.value)}

                                                    placeholder='Category'
                                                    inputProps={{
                                                        name: 'category',
                                                        id: 'outlined-category-native-simple',
                                                    }}
                                                    style={{ width: '90%', fontSize: 14 }}
                                                >
                                                    
                                                    {doctorCategory.map((item) => {
                                                        return (
                                                            <option value={item.Category}>{item.Category}</option>
                                                        )
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        
                                        <Grid item xs={12}>
                                            <center  id='mybtn2'>
                                                <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                                    Morning Shift Time
                                                </Typography>
                                            </center>
                                        </Grid>

                                        <Grid container style={{ padding: 5 }}>
                                            <Grid item xs={6}>
                                                <center id='mybtn3' >
                                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', marginLeft: 50 }}>
                                                        Start Time
                                                    </Typography>
                                                </center>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <center id='mybtn4'>
                                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', marginRight: 50 }}>
                                                        End Time
                                                    </Typography>
                                                </center>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <center id='mybtn5'>
                                                    <FormControl variant="outlined" size="small" className={classes.formControlForm} style={{ width: '65%', float: 'right', marginRight: 10 }} >

                                                        <Select
                                                            className={classes.textFieldForm}
                                                            size='large'
                                                            native
                                                            value={editmorningStartTime}
                                                            onChange={(e) => seteditmorningStartTime(e.target.value)}
                                                            label="Start Time"
                                                            inputProps={{
                                                                name: 'start time',
                                                                id: 'outlined-start-time-native-simple',
                                                            }}
                                                            style={{ width: '90%', fontSize: 12 }}
                                                        >
                                                            <option aria-label="None" value="" >Start Time</option>
                                                            {times.map((item) => {
                                                                return (
                                                                    <option value={item.ActualTime}>{item.DisplayTime}</option>
                                                                )
                                                            })}

                                                        </Select>
                                                    </FormControl>
                                                </center>
                                            </Grid>

                                            <Grid item xs={6}>
                                                <center id='mybtn6'>
                                                    <FormControl variant="outlined" size="small" className={classes.formControlForm} style={{ width: '65%', float: 'left', marginLeft: 10 }} >

                                                        <Select
                                                            className={classes.textFieldForm}
                                                            size='large'
                                                            native
                                                            value={editmorningEndTime}
                                                            onChange={(e) => seteditmorningEndTime(e.target.value)}
                                                            label="End Time"
                                                            inputProps={{
                                                                name: 'end time',
                                                                id: 'outlined-end-time-native-simple',
                                                            }}
                                                            style={{ width: '90%', fontSize: 12 }}
                                                        >
                                                            <option aria-label="None" value="" >End Time</option>
                                                            {times.map((item) => {
                                                                return (
                                                                    <option value={item.ActualTime}>{item.DisplayTime}</option>
                                                                )
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </center>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} style={{ marginTop: '-10px' }}>
                                            <center id='mybtn7'>
                                                <Typography variant="h6" noWrap={true} style={{ fontSize: 14, color: '#707070', fontWeight: 600, fontFamily: 'Poppins' }}>
                                                    Evening Shift Time
                                                </Typography>
                                            </center>
                                        </Grid>

                                        <Grid container style={{ padding: 5 }}>
                                            <Grid item xs={6}>
                                                <center id='mybtn8'>
                                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', marginLeft: 50 }}>
                                                        Start Time
                                                    </Typography>
                                                </center>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <center id='mybtn9'>
                                                    <Typography variant="h6" noWrap={true} style={{ fontSize: 13, color: '#707070', fontWeight: 600, fontFamily: 'Poppins', marginRight: 50 }}>
                                                        End Time
                                                    </Typography>
                                                </center>
                                            </Grid>
                                        </Grid>

                                        <Grid container >
                                            <Grid item xs={6}>
                                                <center id='mybtn10'>
                                                    <FormControl variant="outlined" size="small" className={classes.formControlForm} style={{ width: '65%', float: 'right', marginRight: 10 }} >

                                                        <Select
                                                            className={classes.textFieldForm}
                                                            size='large'
                                                            native
                                                            value={editeveningStartTime}
                                                            onChange={(e) => setediteveningStartTime(e.target.value)}
                                                            label="Start Time"
                                                            inputProps={{
                                                                name: 'start time',
                                                                id: 'outlined-start1-time-native-simple',
                                                            }}
                                                            style={{ width: '90%', fontSize: 12 }}
                                                        >
                                                            <option aria-label="None" value="" >Start Time</option>
                                                            {times.map((item) => {
                                                                return (
                                                                    <option value={item.ActualTime}>{item.DisplayTime}</option>
                                                                )
                                                            })}

                                                        </Select>
                                                    </FormControl>
                                                </center>
                                            </Grid>

                                            <Grid item xs={6}>
                                                <center id='mybtn11'>
                                                    <FormControl variant="outlined" size="small" className={classes.formControlForm} style={{ width: '65%', float: 'left', marginLeft: 10 }} >

                                                        <Select
                                                            className={classes.textFieldForm}
                                                            size='large'
                                                            native
                                                            value={editeveningEndTime}
                                                            onChange={(e) => setediteveningEndTime}
                                                            label="End Time"
                                                            inputProps={{
                                                                name: 'end time',
                                                                id: 'outlined-end1-time-native-simple',
                                                            }}
                                                            style={{ width: '90%', fontSize: 12 }}
                                                        >
                                                            <option aria-label="None" value="" >End Time</option>
                                                            {times.map((item) => {
                                                                return (
                                                                    <option value={item.ActualTime}>{item.DisplayTime}</option>
                                                                )
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </center>
                                            </Grid>
                                        </Grid>

                                    </div>
                                </center>
                            </Grid>
                            <Grid container>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnCancle} onClick={() => handleCloseEditmodal(false)} style={{ float: 'right', marginRight: 20 }}>
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnCancle} onClick={fetchClinicStaffData} autoFocus style={{ float: 'left', marginLeft: 20 }}>
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </DialogContentText>
                </DialogContent>

            </Dialog>

        </>
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
