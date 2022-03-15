import React from 'react';
import axios from 'axios';
import ip from '../../../ipaddress/ip';

export const HV_Appointments_by_date = async (startdate, endDate, doctor) => {
    var data = localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let ClinicId = parsed.ClinicId;

    const body = {
        ClinicId: ClinicId,
        StartDate: startdate,
        EndDate: endDate,
        DoctorId: doctor
    }

    try {
        const response = await axios.post(ip + 'Web_HVAppointmentReport', body);
        return (response?.data);
    }
    catch (error) {
        return (error.response.data.message)
    }
}


export const Todays_Appointment = async () => {
    var data = localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    try {
        const res = await axios.post(ip + 'Web_ShowHVAppointmentsforTodaysApp', { ClinicId: clinicid });
        return res?.data?.Appointment;
    }
    catch (error) {
        return error;
    }
}


export const GetMorningSlots = async () => {
    var data = localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;

    try {
        const getAppInfo = await axios.post(ip + 'Web_GetTodaysHVApp1', { ClinicId: clinicid });
        return getAppInfo?.data?.Appointment
    }
    catch (error) {
        console.log(error);
    }
}


export const GetEveningSlots = async () => {
    var data = localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    let now = new Date();
    let date = now.toISOString().split('T')[0];

    try {
        const getAppInfo = await axios.post(ip + 'Web_GetTodaysHVApp2', { ClinicId: clinicid });
        return getAppInfo?.data?.Appointment
    }
    catch (error) {
        console.log(error);
    }
}