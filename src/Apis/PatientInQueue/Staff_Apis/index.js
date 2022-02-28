import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ip from '../../../ipaddress/ip';


export const PatientInQueue = async () => {
    var data = localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let ClinicId = parsed.ClinicId;
    try {
        const res = await axios.post(ip + 'Web_Staff_ShowPatientInQueue', { ClinicId: ClinicId });
        return res?.data?.Appointment;
    }
    catch (error) {
        return error;
    }
}


export const BookedAppointments = async () => {
    var data = localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let ClinicId = parsed.ClinicId;
    try {
        const res = await axios.post(ip + 'Web_Staff_BookedAppointments', { ClinicId: ClinicId });
        return res?.data?.Appointment;
    }
    catch (error) {
        return error;
    }
}


export const SendIn = async (id, UserId, FirstName) => {

    try {
        const res = await axios.patch(ip + 'Web_SendIn', {
            id: id,
            AppointmentStatus: 'Send In',
            UserId: UserId,
            FirstName: FirstName
        });
        return { id, UserId, FirstName };
    }
    catch (error) {
        return error;
    }
}


export const PatientIn = async (id, FirstName) => {

    try {
        const res = await axios.patch(ip + 'Web_PatientIn', {
            id: id,
            AppointmentStatus: 'Patient In',
            FirstName: FirstName
        });
        return { id, FirstName };
    }
    catch (error) {
        return error;
    }
}