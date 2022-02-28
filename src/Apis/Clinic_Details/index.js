import React from 'react';
import axios from 'axios';
import ip from '../../ipaddress/ip';



export const EditClinicdata = async (obj) => {
    try {
        const editclinicrequest = await axios.patch(ip + 'Web_EditDoctor',obj)
        return JSON.stringify(editclinicrequest?.data);
    }
    catch (error) {
        return (error.response.data.message);
    }
}