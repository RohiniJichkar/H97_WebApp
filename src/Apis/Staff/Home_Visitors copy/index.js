import React from 'react';
import axios from 'axios';
import ip from '../../ipaddress/ip';

export const Times = async () => {
    const times = await axios.post(ip + 'GetSlots');
    return times?.data?.Slots;
}

export const Doctor_Category = async () => {
    const category = await axios.post(ip + 'GetDoctorsCategory');
    return category?.data?.DoctorsCategory;
}

export const Add_HomeVisitor = async (obj) => {
    try {
        const registerHomeVisitor = await axios.post(ip + 'AddHomeVisitorDoctors', obj);
        return JSON.stringify(registerHomeVisitor?.data);
    } catch (error) {
        return JSON.stringify(error.response.data);
    }
}

export const Delete_home_visitor_Details_by_id = async (UserId, Role) => {
    try {
        const deletereports = await axios.patch(ip + 'Web_DeleteStaff', { UserId: UserId, Role: 'Home Visitor' });
        return JSON.stringify(deletereports?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}



export const Edit_HomeVisitor = async (obje) => {
    try {
        const editHomeVisitor = await axios.patch(ip + 'Web_EditHomeVisitorDoctor', obje)
        return JSON.stringify(editHomeVisitor?.data);
    } catch (error) {
        return JSON.stringify(error.response.data);
    }
}