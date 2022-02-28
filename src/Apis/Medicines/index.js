import React from 'react';
import axios from 'axios';
import ip from '../../ipaddress/ip';

export const Add_Medicine = async (obj) => {
    try {
        const addmedicine = await axios.post(ip + 'Web_AddMedicines', obj);
        return JSON.stringify(addmedicine?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}

export const Delete_Medicine_Details_by_id = async (id) => {
    try {
        const deletereports = await axios.patch(ip + 'Web_DeleteMedicines', { id: id });
        return JSON.stringify(deletereports?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}


export const edit_Medicine = async (obj) => {
    try {
        const editmedicine = await axios.patch(ip + 'Web_EditMedicines', obj);
        return JSON.stringify(editmedicine?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}


export const Search_Medicine= async (MedicineName) => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    try {
        const medicineInfo = await axios.post(ip + 'Web_SearchMedicines', { ClinicId: clinicid, MedicineName: MedicineName });
        return medicineInfo?.data?.Medicine;
    } catch (error) {
       return (error.response.data.message);
    }
}