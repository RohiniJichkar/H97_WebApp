import React from 'react';
import axios from 'axios';
import ip from '../../../../ipaddress/ip';

export const UpdateAppointmentDetails = async (obj) => {
    try {
        const editAppointment = await axios.patch(ip + 'Web_EditAppointment', obj);
        return JSON.stringify(editAppointment?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}


export const fetchMedicineData = async () => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    const medicineInfo = await axios.post(ip + 'Web_GetAllMedicines', { ClinicId: clinicid });

    return medicineInfo?.data?.Medicine;
}

export const addPrescriptionDetails = async (obj) => {
    try {
        const addprescription = await axios.post(ip + 'Web_AddPrescriptionDetails', { prescriptiondata: obj })
        return JSON.stringify(addprescription?.data);
    }
    catch (error) {
        return (error.response.data.message);
    }
}

export const generatePrescription = async (obj) => {
    try {
        const generatePdf = await axios.post(ip + 'create_GynicPrescription', obj);
        return JSON.stringify(generatePdf?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}


export const paymentDetails = async (obj) => {
    try {
        const paymentdetails = await axios.post(ip + 'Web_AddAppointmentFee', obj);
        return JSON.stringify(paymentdetails?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}



export const getPrescription = async (id) => {
    try {
        const prescription = await axios.post(ip + 'Web_GetAppointmentById', {id : id});
        return JSON.stringify(prescription?.data?.Appointment);
    } catch (error) {
        return (error.response.data.message);
    }
}