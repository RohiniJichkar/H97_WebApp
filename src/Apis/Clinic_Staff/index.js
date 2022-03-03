import React from 'react';
import axios from 'axios';
import ip from '../../ipaddress/ip';


export const Doctor_Category = async () => {
    const category = await axios.post(ip + 'GetDoctorsCategory');
    return category?.data?.DoctorsCategory;
}

export const Times = async () => {
    const times = await axios.post(ip + 'GetSlots');
    return times?.data?.Slots;
}

export const Add_Staff = async (obj) => {
    try {
        const registerStaff = await axios.post(ip + 'Web_AddStaff', obj);
        return JSON.stringify(registerStaff?.data);
    } catch (error) {
        return JSON.stringify(error.response.data);
    }
}

export const EditStaffdata = async (obj) => {
    try {
        const editstaffrequest = await axios.patch(ip + 'Web_EditStaff', obj)
        return JSON.stringify(editstaffrequest?.data);
    }
    catch (error) {
        return (error.response.data.message);
    }
}

export const EditClinicdata = async (obje) => {
    try {
        const editclinicrequest = await axios.patch(ip + 'Web_EditClinic', obje)
        return JSON.stringify(editclinicrequest?.data);
    }
    catch (error) {
        return (error.response.data.message);
    }
}


export const EditDoctordata = async (obje) => {
    try {
        const editdoctorsrequest = await axios.patch(ip + 'Web_EditDoctor', obje)
        return JSON.stringify(editdoctorsrequest?.data);
    }
    catch (error) {
        return (error.response.data.message);
    }
}

export const Delete_Staff_Details_by_id = async (UserId, Role) => {
    try {
        const deletereports = await axios.patch(ip + 'Web_DeleteStaff', { UserId: UserId, Role: Role });
        return JSON.stringify(deletereports?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}