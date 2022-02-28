import React from 'react';
import axios from 'axios';
import ip from '../../ipaddress/ip';

export const GetAppointmentStatus = async () => {
    try {
        const Response = await axios.post(ip + 'Web_AppointmentStatus');
        return Response?.data?.Appointment
    }
    catch (error) {
        console.log(error);
    }
}

export const Appointment_Details_by_date = async (startdate, endDate, status) => {
    var data = localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let ClinicId = parsed.ClinicId;

    const body = {
        ClinicId: ClinicId,
        StartDate: startdate,
        EndDate: endDate,
        AppointmentStatus: status
    }

    try {
        const response = await axios.post(ip + 'Web_AppointmentAnalysisReport', body);
        return (response?.data);
    }
    catch (error) {
        return (error.response.data.message)
    }
}


export const Home_Visitor_Details_by_date = async (startdate, endDate, status) => {
    var data = localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let ClinicId = parsed.ClinicId;

    const body = {
        ClinicId: ClinicId,
        StartDate: startdate,
        EndDate: endDate,
        AppointmentStatus: status
    }

    try {
        const response = await axios.post(ip + 'Web_HomeVisitorAnalysisReport', body);
        return (response?.data);
    }
    catch (error) {
        return (error.response.data.message)
    }
}


export const Staff_Analysis_Details_by_date = async (startdate, endDate, status, UserId) => {
    var data = localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let ClinicId = parsed.ClinicId;

    const body = {
        ClinicId: ClinicId,
        StartDate: startdate,
        EndDate: endDate,
        UserId: status
    }

    try {
        const response = await axios.post(ip + 'Web_StaffAnalysisReport', body);
        return (response?.data);
    }
    catch (error) {
        return (error.response.data.message)
    }
}

export const Finance_Analysis_Details_by_date = async (startdate, endDate, status, UserId) => {
    var data = localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let ClinicId = parsed.ClinicId;

    const body = {
        ClinicId: ClinicId,
        StartDate: startdate,
        EndDate: endDate,
        DoctorId: status
    }

    try {
        const response = await axios.post(ip + 'Web_FinanceAnalysisReport', body);
        return (response?.data);
    }
    catch (error) {
        return (error.response.data.message)
    }
}