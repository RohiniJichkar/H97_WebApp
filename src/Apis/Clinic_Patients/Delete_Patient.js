import React from 'react';
import axios from 'axios';
import ip from '../../ipaddress/ip';


export const Delete_Patient_Details = async (UserId) => {
    try {
        const deletereports = await axios.patch(ip + 'DeletePatient', { UserId: UserId });
        return JSON.stringify(deletereports?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}