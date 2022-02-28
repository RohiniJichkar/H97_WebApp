import React from 'react';
import axios from 'axios';
import ip from '../../../../ipaddress/ip';


export const Cancel_Appointment_Details = async (id) => {
    try {
        const deletereports = await axios.patch(ip + 'CancelAppointment', { "id": id,});
        return JSON.stringify(deletereports?.data);
    } catch (error) {
        return JSON.stringify(error.response.data);
    }
}