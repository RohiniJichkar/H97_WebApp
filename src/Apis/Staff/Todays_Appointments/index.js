import React from 'react';
import axios from 'axios';
import ip from '../../../ipaddress/ip';

// export const GetMorningSlots = async () => {
//     try {
//         const getSlotInfo = await axios.post(ip + 'Web_GetTimingForTodaysApp1');
//         return getSlotInfo?.data?.Slots
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

// export const GetEveningSlots = async () => {
//     try {
//         const getSlotInfo = await axios.post(ip + 'Web_GetTimingForTodaysApp2');
//         return getSlotInfo?.data?.Slots
//     }
//     catch (error) {
//         console.log(error);
//     }
// }


export const GetMorningSlots = async (doctorid) => {
    var data = localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    let now = new Date();
    let date = now.toISOString().split('T')[0];
    try {
        const getAppInfo = await axios.post(ip + 'Web_GetTimingForTodaysApp1_Recp', { AppointmentDate: date, DoctorId: doctorid, ClinicId: clinicid });
        return getAppInfo?.data?.Appointment
    }
    catch (error) {
        console.log(error);
    }
}


export const GetEveningSlots = async (doctorid) => {
    var data = localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    let now = new Date();
    let date = now.toISOString().split('T')[0];

    try {
        const getAppInfo = await axios.post(ip + 'Web_GetTimingForTodaysApp2_Recp', { AppointmentDate: date, DoctorId: doctorid, ClinicId: clinicid });
        return getAppInfo?.data?.Appointment
    }
    catch (error) {
        console.log(error);
    }
}


export const Todays_Appointment_ForEdit = async () => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    try {
        const res = await axios.post(ip + 'Web_ShowAppointmentsforEditApp_Recp', { ClinicId: clinicid });
        return res?.data?.Appointment;
    }
    catch (error) {
        return error;
    }
}

export const Todays_Appointment = async (doctorid) => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    try {
        const res = await axios.post(ip + 'Web_ShowAppointmentsforTodaysApp_Recp', { DoctorId: doctorid, ClinicId: clinicid });
        return res?.data?.Appointment;
    }
    catch (error) {
        return error;
    }
}

export const Todays_Appointment_By_Date = async (clinicid, startdate, enddate) => {
    try {
        const res = await axios.post(ip + 'Web_SearchAppointmentByDate', { ClinicId: clinicid, StartDate: startdate, EndDate: enddate });
        return res?.data?.Appointment;
    }
    catch (error) {
        return error;
    }
}



export const GetAppByTimeWise = async (obj) => {
    try {
        const getAppInfo = await axios.post(ip + 'Web_GetTimeWiseAppointments', obj);
        return getAppInfo?.data?.Appointment
    }
    catch (error) {
        console.log(error);
    }
}