import React from 'react';
import axios from 'axios';
import ip from '../../../ipaddress/ip';

export const EditPatient = async (obj) => {
    try {
        const registerPatient = await axios.patch(ip + 'Web_EditPatient', obj)
        return JSON.stringify(registerPatient?.data);
    }
    catch (error) {
        return JSON.stringify(error.response.data);
    }
}