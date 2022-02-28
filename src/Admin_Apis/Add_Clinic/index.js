import React from 'react';
import axios from 'axios';
import ip from '../../ipaddress/ip';

export const Add_Clinic = async (formData) => {
    try {
        const clinic = await axios.post(ip + 'AddClinic', formData, { headers: { "Content-Type": "multipart/form-data" } });
        return JSON.stringify(clinic?.data);
    } catch (error) {
        return JSON.stringify(error.response.data);
    }
}



export const Sign_Up_Clinic = async (formData) => {
    try {
        const clinic = await axios.post(ip + 'Web_SignUp', formData, { headers: { "Content-Type": "multipart/form-data" } });
        return JSON.stringify(clinic?.data);
    } catch (error) {
        return JSON.stringify(error.response.data);
    }
}

export const Doctor_Category = async () => {
    const category = await axios.post(ip + 'GetDoctorsCategory');
    return category?.data?.DoctorsCategory;
}

export const Times = async () => {
    const times = await axios.post(ip + 'GetSlots');
    return times?.data?.Slots;
}



export const Payment_Packages = async () => {
    try {
        const packages = await axios.post(ip + 'GetPaymentPackages');
        return packages?.data?.Package;
    } catch (error) {
        console.log(error)
    }
}