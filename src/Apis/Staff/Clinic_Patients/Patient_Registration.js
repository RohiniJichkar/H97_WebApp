import React from 'react';
import axios from 'axios';
import ip from '../../../ipaddress/ip';

export const Register_Patient = async (clinicid, firstnm, lastnm, mobile, password, email, dob, gender, address, city, pincode, state, country, height, weight, now) => {
    const body = {
        ClinicId:clinicid, 
        FirstName:firstnm, 
        LastName:lastnm, 
        MobileNo:mobile, 
        Password:password, 
        Email:email, 
        DOB:dob, 
        Gender:gender, 
        Address:address, 
        City:city, 
        Pincode:pincode, 
        State:state, 
        Country:country, 
        Height:height, 
        Weight:weight, 
        createdDate:now
    }
    try {
        const registerPatient = await axios.post(ip + 'Web_AddPatient',body)
        return JSON.stringify(registerPatient?.data);
    }
    catch (error) {
        return JSON.stringify(error.response.data);
    }
}