import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Slide, Select, FormControl, InputLabel, Typography, Button, Table, TableContainer, TableBody, TableCell, TableHead, InputBase, TableRow, TablePagination, Drawer, Divider, MenuItem, Menu, ListItem, ListItemIcon, ListItemText, List, IconButton, Grid, Paper, Link } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Register_Patient } from '../../../Apis/Clinic_Patients/Patient_Registration';

const drawerWidth = 240;

const Add_Patinet = ({ show, handleclose }) => {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [maxWidth, setMaxWidth] = React.useState('md');

    const [firstnm, setfirstnm] = useState('');
    const [lastnm, setlastnm] = useState('');
    const [mobile, setmobile] = useState('');
    const [email, setemail] = useState('');
    const [dob, setdob] = useState('');
    const [password, setpassword] = useState('');
    const [gender, setgender] = useState('');
    const [address, setaddress] = useState('');
    const [city, setcity] = useState('');
    const [pincode, setpincode] = useState('');
    const [state, setstate] = useState('');
    const [country, setcountry] = useState('');
    const [height, setheight] = useState('');
    const [weight, setweight] = useState('');
    const [showPassword, setshowPassword] = useState(false);

    const PatientRegistration = async (firstnm, lastnm, mobile, password, email, dob, gender, address, city, pincode, state, country, height, weight) => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        const date = new Date();
        const now = date.toISOString().split('T')[0];
        //     try {
        //         const registration = await Register_Patient(clinicid, firstnm, lastnm, mobile, password, email, dob, gender, address, city, pincode, state, country, height, weight, now);
        //         let parse = JSON.parse(registration);
        //         if (parse.success === "200") {
        //             alert(parse.message);
        //             handleclose();
        //             window.location.reload()
        //         }
        //         else {
        //             alert(parse.message);
        //         }
        //     } catch (e) {
        //         console.log(e)
        //     }

        // }
        if (firstnm.trim() == '' || lastnm.trim() == '' || mobile.trim() == '' || password.trim() == '' || dob.trim() == '' || gender.trim() == '') {
            alert('Please Enter Mandatory fields')
            return;
        }

        var FirstNm = firstnm.split(/\s/).join('');

        // var dobstr = dob;
        // var birth_year = dobstr.substr(0, 4);
        // var birth_month = dobstr.substr(5, 2);
        // var birth_day = dobstr.substr(8, 2);

        // var today_year = date.getFullYear();
        // var today_month = date.getMonth();
        // var today_day = date.getDate();
        // var age = today_year - birth_year;

        // if (today_month < (birth_month - 1)) {
        //     age--;
        //     return age;
        // }
        // if (((birth_month - 1) == today_month) && (today_day < birth_day)) {
        //     age--;
        //     return age;
        // }

        const obj = {
            ClinicId: clinicid,
            FirstName: FirstNm,
            LastName: lastnm,
            MobileNo: mobile,
            Password: password,
            Email: email,
            DOB: dob,
            // Age: age,
            Gender: gender,
            Address: address,
            City: city,
            Pincode: pincode,
            State: state,
            Country: country,
            Height: height,
            Weight: weight,
            createdDate: now
        }

        try {
            const registration = await Register_Patient(obj);
            let parse = JSON.parse(registration);
            if (parse.success === "200") {
                alert(parse.message);
                // setOpenmodal(false);
                window.location.reload()
            } else {
                alert(parse.message);
            }
        } catch (error) {
            console.log(error);
        }
    }



    const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // document.addEventListener('DOMContentLoaded', () => {

    //     const selectDrop = document.querySelector('#countries');
    //     // const selectDrop = document.getElementById('countries');
    //     fetch("https://api.countrystatecity.in/v1/countries/IN/states/MH/cities").then(res => {
    //       return res.json();
    //     }).then(data => {
    //       let output = "";
    //       data.forEach(country => {
    //         output += `
    //         <option value="${country.name}">${country.name}</option>`;
    //       })
    //       selectDrop.innerHTML = output;
    //     }).catch(err => {
    //       console.log(err);
    //     })    
    //   });


    //      document.addEventListener('DOMContentLoaded', () => {
    //     var headers = new Headers();
    // headers.append("X-CSCAPI-KEY", "API_KEY");

    // var requestOptions = {
    //   method: 'GET',
    //   headers: headers,
    //   redirect: 'follow'
    // };

    // fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
    // });

    // var headers = new Headers();
    // headers.append("X-CSCAPI-KEY", "API_KEY");

    // var requestOptions = {
    //   method: 'GET',
    //   headers: headers,
    //   redirect: 'follow'
    // };

    // // Pass Country & State Code -- Eg: Country Code : IN & State Code : MH
    // fetch("https://api.countrystatecity.in/v1/countries/IN/states/MH/cities", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));




    // setOptions({
    //     theme: 'ios',
    //     themeVariant: 'light'
    // });

    // function App() {
    //     const [myData, setMyData] = React.useState([]);

    //     const inputProps = {
    //         inputStyle: 'box',
    //         labelStyle: 'stacked',
    //         placeholder: 'Please select...'
    //     };

    //     React.useEffect(() => {
    //         getJson('https://trial.mobiscroll.com/content/countries.json', (resp) => {
    //             const countries = [];
    //             for (let i = 0; i < resp.length; ++i) {
    //                 const country = resp[i];
    //                 countries.push({ text: country.text, value: country.value });
    //             }
    //             setMyData(countries);
    //         });
    //     }, []);

    //     const renderCustomItem = (item) => {
    //         return <div className="md-country-picker-item">
    //             <img className="md-country-picker-flag" src={'https://img.mobiscroll.com/demos/flags/' + item.data.value + '.png'} alt="Flag" />
    //             {item.display}
    //         </div>;
    //     }

    //     return (
    //         <Page>
    //             <Select
    //                 data={myData}
    //                 label="Countries"
    //                 inputProps={inputProps}
    //                 display="anchored"
    //                 itemHeight={40}
    //                 renderItem={renderCustomItem}
    //             />
    //         </Page>
    //     ); 
    // }






    // mobiscroll.setOptions({
    //     theme: 'ios',
    //     themeVariant: 'light'
    // });

    // var inst = mobiscroll.select('#demo-country-picker', {
    //     display: 'anchored',
    //     filter: true,
    //     itemHeight: 40,
    //     renderItem: function (item) {
    //         return '<div class="md-country-picker-item">' +
    //             '<img class="md-country-picker-flag" src="https://img.mobiscroll.com/demos/flags/' + item.data.value + '.png" />' +
    //             item.display + '</div>';
    //     }
    // });

    // mobiscroll.util.http.getJson('https://trial.mobiscroll.com/content/countries.json', function (resp) {
    //     var countries = [];
    //     for (var i = 0; i < resp.length; ++i) {
    //         var country = resp[i];
    //         countries.push({ text: country.text, value: country.value });
    //     }
    //     inst.setOptions({ data: countries });
    // });



    // function ajaxCall() {
    //     this.send = function(data, url, method, success, type) {
    //         type = type||'json';
    //         var successRes = function(data) {
    //             success(data);
    //         }

    //         var errorRes = function(e) {
    //             console.log(e);
    //             //alert("Error found \nError Code: "+e.status+" \nError Message: "+e.statusText);
    //             //jQuery('#loader').modal('hide');
    //         }
    //         jQuery.ajax({
    //             url: url,
    //             type: method,
    //             data: data,
    //             success: successRes,
    //             error: errorRes,
    //             dataType: type,
    //             timeout: 60000
    //         });

    //     }

    // }

    // function locationInfo() {
    //     var rootUrl = "https://api.countrystatecity.in/v1/countries/IN/states/MH/cities";
    //     //now check for set values
    //     var addParams = '';
    //     if(jQuery("#gds_appid").length > 0) {
    //         addParams += '&appid=' + jQuery("#gds_appid").val();
    //     }
    //     if(jQuery("#gds_hash").length > 0) {
    //         addParams += '&hash=' + jQuery("#gds_hash").val();
    //     }

    //     var call = new ajaxCall();

    //     this.confCity = function(id) {
    //      //   console.log(id);
    //      //   console.log('started');
    //         var url = rootUrl+'?type=confCity&countryId='+ jQuery('#countryId option:selected').attr('countryid') +'&stateId=' + jQuery('#stateId option:selected').attr('stateid') + '&cityId=' + id;
    //         var method = "post";
    //         var data = {};
    //         call.send(data, url, method, function(data) {
    //             if(data){
    //                 //    alert(data);
    //             }
    //             else{
    //                 //   alert('No data');
    //             }
    //         });
    //     };

    //     this.getCities = function(id) {
    //         jQuery(".cities option:gt(0)").remove();
    //         //get additional fields
    //         var stateClasses = jQuery('#cityId').attr('class');

    //         var cC = stateClasses.split(" ");
    //         cC.shift();
    //         var addClasses = '';
    //         if(cC.length > 0)
    //         {
    //             acC = cC.join();
    //             addClasses = '&addClasses=' + encodeURIComponent(acC);
    //         }
    //         var url = rootUrl+'?type=getCities&countryId='+ jQuery('#countryId option:selected').attr('countryid') +'&stateId=' + id + addParams + addClasses;
    //         var method = "post";
    //         var data = {};
    //         jQuery('.cities').find("option:eq(0)").html("Please wait..");
    //         call.send(data, url, method, function(data) {
    //             jQuery('.cities').find("option:eq(0)").html("Select City");
    //             if(data.tp == 1){
    //                 var listlen = Object.keys(data['result']).length;

    //                 if(listlen > 0)
    //                 {
    //                     jQuery.each(data['result'], function(key, val) {

    //                         var option = jQuery('<option />');
    //                         option.attr('value', val).text(val);
    //                         jQuery('.cities').append(option);
    //                     });
    //                 }
    //                 else
    //                 {
    //                     var usestate = jQuery('#stateId option:selected').val();
    //                     var option = jQuery('<option />');
    //                     option.attr('value', usestate).text(usestate);
    //                     option.attr('selected', 'selected');
    //                     jQuery('.cities').append(option);
    //                 }

    //                 jQuery(".cities").prop("disabled",false);
    //             }
    //             else{
    //                 alert(data.msg);
    //             }
    //         });
    //     };
    //     this.getStates = function(id) {
    //         jQuery(".states option:gt(0)").remove();
    //         jQuery(".cities option:gt(0)").remove();
    //         //get additional fields
    //         var stateClasses = jQuery('#stateId').attr('class');

    //         var cC = stateClasses.split(" ");
    //         cC.shift();
    //         var addClasses = '';
    //         if(cC.length > 0)
    //         {
    //             acC = cC.join();
    //             addClasses = '&addClasses=' + encodeURIComponent(acC);
    //         }
    //         var url = rootUrl+'?type=getStates&countryId=' + id + addParams  + addClasses;
    //         var method = "post";
    //         var data = {};
    //         jQuery('.states').find("option:eq(0)").html("Please wait..");
    //         call.send(data, url, method, function(data) {
    //             jQuery('.states').find("option:eq(0)").html("Select State");
    //             if(data.tp == 1){
    //                 jQuery.each(data['result'], function(key, val) {
    //                     var option = jQuery('<option />');
    //                     option.attr('value', val).text(val);
    //                     option.attr('stateid', key);
    //                     jQuery('.states').append(option);
    //                 });
    //                 jQuery(".states").prop("disabled",false);
    //             }
    //             else{
    //                 alert(data.msg);
    //             }
    //         });
    //     };

    //     this.getCountries = function() {
    //         //get additional fields
    //         var countryClasses = jQuery('#countryId').attr('class');

    //         var cC = countryClasses(" ");
    //         cC.shift();
    //         var addClasses = '';
    //         if(cC.length > 0)
    //         {
    //             acC = cC.join();
    //             addClasses = '&addClasses=' + encodeURIComponent(acC);
    //         }

    //         var presel = false;
    //         var iip = 'N';
    //         jQuery.each(cC, function( index, value ) {
    //             if (value.match("^presel-")) {
    //                 presel = value.substring(7);

    //             }
    //             if(value.match("^presel-byi"))
    //             {
    //                 var iip = 'Y';
    //             }
    //         });

    //         var url = rootUrl+'?type=getCountries' + addParams + addClasses;
    //         var method = "post";
    //         var data = {};
    //         jQuery('.countries').find("option:eq(0)").html("Please wait..");
    //         call.send(data, url, method, function(data) {
    //             jQuery('.countries').find("option:eq(0)").html("Select Country");

    //             if(data.tp == 1){
    //                 if(presel == 'byip')
    //                 {
    //                     presel = data['presel'];
    //                     console.log('2 presel is set as ' + presel);
    //                 }


    //                 if(jQuery.inArray("group-continents",cC) > -1)
    //                 {
    //                     var $select = jQuery('.countries');
    //                     console.log(data['result']);
    //                     jQuery.each(data['result'], function(i, optgroups) {
    //                         var $optgroup = jQuery("<optgroup>", {label: i});
    //                         if(optgroups.length > 0)
    //                         {
    //                             $optgroup.appendTo($select);
    //                         }

    //                         jQuery.each(optgroups, function(groupName, options) {
    //                             var coption = jQuery('<option />');
    //                             coption.attr('value', options.name).text(options.name);
    //                             coption.attr('countryid', options.id);
    //                             if(presel) {
    //                                 if (presel.toUpperCase() == options.id) {
    //                                     coption.attr('selected', 'selected');
    //                                 }
    //                             }
    //                             coption.appendTo($optgroup);
    //                         });
    //                     });
    //                 }
    //                 else
    //                 {
    //                     jQuery.each(data['result'], function(key, val) {
    //                         var option = jQuery('<option />');
    //                         option.attr('value', val).text(val);
    //                         option.attr('countryid', key);
    //                         if(presel)
    //                         {
    //                             if(presel.toUpperCase() ==  key)
    //                             {
    //                                 option.attr('selected', 'selected');
    //                             }
    //                         }
    //                         jQuery('.countries').append(option);
    //                     });
    //                 }
    //                 if(presel)
    //                 {
    //                     jQuery('.countries').trigger('change');
    //                 }
    //                 jQuery(".countries").prop("disabled",false);
    //             }
    //             else{
    //                 alert(data.msg);
    //             }
    //         });
    //     };

    // }

    // jQuery(function() {
    //     var loc = new locationInfo();
    //     loc.getCountries();
    //     jQuery(".countries").on("change", function(ev) {
    //         var countryId = jQuery("option:selected", this).attr('countryid');
    //         if(countryId != ''){
    //             loc.getStates(countryId);
    //         }
    //         else{
    //             jQuery(".states option:gt(0)").remove();
    //         }
    //     });
    //     jQuery(".states").on("change", function(ev) {
    //         var stateId = jQuery("option:selected", this).attr('stateid');
    //         if(stateId != ''){
    //             loc.getCities(stateId);
    //         }
    //         else{
    //             jQuery(".cities option:gt(0)").remove();
    //         }
    //     });

    //     jQuery(".cities").on("change", function(ev) {
    //         var cityId = jQuery("option:selected", this).val();
    //         if(cityId != ''){
    //             loc.confCity(cityId);
    //         }
    //     });
    // });



    return (
        <>

            <Dialog
                open={show}
                maxWidth={maxWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Register New Patient"}
                    <IconButton edge="start" color="inherit" onClick={handleclose} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container>
                            <Grid item xs={12} sm={6} style={{ borderRight: '1px solid #F0F0F0' }}>
                                <center>
                                    <div>
                                        <TextField className={classes.inputFields} value={firstnm}
                                            onChange={(e) => {
                                                const re = /^[a-z ,.'-]+$/i;
                                                // if value is not blank, then test the regex
                                                if (e.target.value == '' || re.test(e.target.value)) {
                                                    setfirstnm(e.target.value)
                                                }
                                            }} style={{ marginLeft: 13 }}
                                            id="outlined-basic" size="small" placeholder="First Name" variant="outlined" />
                                        <span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span>
                                        <TextField className={classes.inputFields} value={lastnm}
                                            onChange={(e) => {
                                                const re = /^[a-z ,.'-]+$/i;

                                                // if value is not blank, then test the regex

                                                if (e.target.value == '' || re.test(e.target.value)) {
                                                    setlastnm(e.target.value)
                                                }
                                            }} style={{ marginLeft: 13 }} id="outlined-basic" size="small" placeholder="Last Name" variant="outlined" />
                                        <span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span>
                                        <TextField
                                            className={classes.inputFields}
                                            value={mobile}
                                            onChange={(e) => {
                                                const re = /^[0-9\b]+$/;

                                                // if value is not blank, then test the regex

                                                if (e.target.value == '' || re.test(e.target.value)) {
                                                    setmobile(e.target.value)
                                                }
                                            }} style={{ marginLeft: 13 }}
                                            id="outlined-basic"
                                            type="number"
                                            size="small"
                                            placeholder="Mobile Number"
                                            variant="outlined"
                                            onInput={(e) => {
                                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                            }}
                                        /> <span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span>

                                        <TextField className={classes.inputFields} value={password} onChange={(e) => setpassword(e.target.value)}
                                            id="outlined-basic" type={showPassword ? 'text' : 'password'} size="small" placeholder="Password" variant="outlined"
                                            style={{ marginLeft: 12 }}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }} />  <span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span>
                                        <TextField className={classes.inputFields} value={email} onChange={(e) => setemail(e.target.value)} id="outlined-basic" type="email" size="small" placeholder="Email Id" variant="outlined" />
                                        <TextField className={classes.inputFields} style={{ marginLeft: 13 }} value={dob} onChange={(e) => setdob(e.target.value)} id="outlined-basic" type="date" size="small" placeholder="DOB" variant="outlined" />
                                        <span style={{ position: 'relative', bottom: 8, fontSize: 20, color: 'red' }}> *</span>
                                        <FormControl variant="outlined" size='small' className={classes.formControl}  >
                                            <Select
                                                className={classes.inputFields}
                                                native
                                                size='small'
                                                value={gender}
                                                label="Gender"
                                                onChange={(e) => setgender(e.target.value)}

                                                inputProps={{
                                                    name: 'gender',
                                                    id: 'outlined-gender-native-simple',
                                                }}
                                                style={{ marginLeft: 14 }}
                                            >
                                                <option aria-label="None" value="" >Gender*</option>
                                                <option value='Male'>Male</option>
                                                <option value='Female'>Female</option>

                                            </Select>
                                        </FormControl> <span style={{ position: 'relative', bottom: 4, fontSize: 20, right: 8, color: 'red' }}> *</span>
                                    </div>
                                </center>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <center>
                                    <div>
                                        <TextField className={classes.inputFields} value={country}
                                            onChange={(e) => {
                                                const re = /^[A-Za-z]+$/;

                                                // if value is not blank, then test the regex

                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    setcountry(e.target.value)
                                                }
                                            }} id="outlined-basic" size="small" placeholder="Country" variant="outlined" />

                                        {/* <select name="country" class="countries" id="countryId">
                                             <option value="">Select Country</option>
                                            </select> */}

                                        {/* <label for="countries">Choose your Country:</label>
                                        <select id="countries" name="countries"></select> */}

                                        <TextField className={classes.inputFields} value={state}
                                            onChange={(e) => {
                                                const re = /^[A-Za-z]+$/;

                                                // if value is not blank, then test the regex

                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    setstate(e.target.value)
                                                }
                                            }}
                                            id="outlined-basic" size="small" placeholder="State" variant="outlined" />
                                        <TextField
                                            className={classes.inputFields}
                                            value={city}
                                            onChange={(e) => {
                                                const re = /^[A-Za-z]+$/;

                                                // if value is not blank, then test the regex

                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    setcity(e.target.value)
                                                }
                                            }}
                                            id="outlined-basic"
                                            size="small"
                                            placeholder="City"
                                            variant="outlined"
                                        />
                                        <TextField className={classes.inputFields} multiline
                                            onChange={(e) => {
                                                setaddress(e.target.value)
                                            }}
                                            rows={2}
                                            rowsMax={6} id="outlined-basic" size="small" label="Address" variant="outlined"
                                        />

                                        <TextField className={classes.inputFields} value={pincode} onChange={(e) => setpincode(e.target.value)} id="outlined-basic" size="small" placeholder="Pincode" variant="outlined" />


                                        <TextField
                                            className={classes.inputFields}
                                            value={height}
                                            onChange={(e) => setheight(e.target.value)}
                                            id="outlined-basic"
                                            size="small"
                                            placeholder="Height"
                                            variant="outlined"
                                        />
                                        <TextField className={classes.inputFields} value={weight} onChange={(e) => setweight(e.target.value)} id="outlined-basic" size="small" placeholder="Weight" variant="outlined" />

                                    </div>
                                </center>
                            </Grid>

                            <Grid container>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnCancle} onClick={handleclose} style={{ float: 'right', marginRight: 20 }}>
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <Button className={classes.btnregister} onClick={() => PatientRegistration(firstnm, lastnm, mobile, password, email, dob, gender, address, city, pincode, state, country, height, weight)} autoFocus style={{ float: 'left', marginLeft: 20 }}>
                                        Register
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
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
}))

export default Add_Patinet
