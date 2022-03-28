import React from 'react';
import axios from 'axios';
import ip from '../../../ipaddress/ip';


export const AddFamilyMember = async (obj) => {
    try {
        const registerPatient = await axios.post(ip + 'Web_AddFamilyMembers', obj)
        return JSON.stringify(registerPatient?.data);
    }
    catch (error) {
        return JSON.stringify(error.response.data);
    }
}
