import React from 'react';
import axios from 'axios';
import ip from '../../ipaddress/ip';

export const Add_PatientHistory = async (Obje) => {
    try {
        const addPatienthistory = await axios.patch(ip + 'Web_AddPatientHistory', Obje);
        return JSON.stringify(addPatienthistory?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}