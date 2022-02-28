import React from 'react';
import axios from 'axios';
import ip from '../../../ipaddress/ip';

export const App_Channels = async () => {
    const appchannelInfo = await axios.post(ip + 'GetAppointmentChannels');
    return appchannelInfo?.data?.AppointmentChannel;
}

export const App_Types = async () => {
    const apptypeInfo = await axios.post(ip + 'GetAppointmentTypes');
    return apptypeInfo?.data?.AppointmentType;
}

export const Time = async () => {
    const timingInfo = await axios.post(ip + 'GetSlots');
    return timingInfo?.data?.Slots;
}


export const Doctors = async () => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    const doctorInfo = await axios.post(ip + 'GetAllDoctorsUsingIdForWeb', { ClinicId: clinicid })
    return doctorInfo?.data?.Data;
}


export const Book_Appointment = async (obj) => {
    try {
        const addAppointment = await axios.post(ip + 'Web_BookAppointment', obj);
        return JSON.stringify(addAppointment?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}


export const Note_for_Doctor = async () => {
    try {
        const notefordoctor = await axios.post(ip + 'GetNoteForDoctor');
        return notefordoctor?.data?.NoteForDoctor;
    } catch (error) {
        return (error.response.data.message);
    }
}

