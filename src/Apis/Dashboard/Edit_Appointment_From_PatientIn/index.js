import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ip from '../../../ipaddress/ip';

export const Time = async () => {
    const timingInfo = await axios.post(ip + 'GetSlots');
    return timingInfo?.data?.Slots;
}

export const Note_for_Doctor = async () => {
    try {
        const notefordoctor = await axios.post(ip + 'GetNoteForDoctor');
        return notefordoctor?.data?.NoteForDoctor;
    } catch (error) {
        return (error.response.data.message);
    }
}


export const Edit_App_for_Dashboard = async (obj) => {
    try {
        const edit = await axios.patch(ip + 'Web_EditAppointmentForDashboard', obj)
        return JSON.stringify(edit?.data);
    }
    catch (error) {
        return (error.response.data.message);
    }
}