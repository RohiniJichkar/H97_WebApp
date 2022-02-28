import React from 'react';
import axios from 'axios';
import ip from '../../../ipaddress/ip';


export const Cancel_Appointment_Details = async (id) => {
    try {
        const deletereports = await axios.patch(ip + 'Web_CancelAppointment', { "id": id,});
        return JSON.stringify(deletereports?.data);
    } catch (error) {
        return JSON.stringify(error.response.data);
    }
}

export const Cancel_Appointment_for_Calender = async (id) => {
    try {
        const response = await axios.patch(ip + 'Web_CancelAppointment', { "id": id,});
        return JSON.stringify(response?.data);
    } catch (error) {
        return JSON.stringify(error.response.data);
    }
}