import React from 'react';
import axios from 'axios';
import ip from '../../ipaddress/ip';

export const Register_Patient = async (obj) => {
    try {
        const registerPatient = await axios.post(ip + 'Web_AddPatients', obj)
        return JSON.stringify(registerPatient?.data);
    }
    catch (error) {
        return JSON.stringify(error.response.data);
    }
}