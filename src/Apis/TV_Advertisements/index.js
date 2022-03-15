import React from 'react';
import axios from 'axios';
import ip from '../../ipaddress/ip';


export const get_advertisments = async () => {
    try {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        const getadvertisements = await axios.post(ip + 'Web_GetAllTVAdvertisements', { ClinicId: clinicid });
        return (getadvertisements?.data?.Advetisements);
    } catch (error) {
        return (error.response.data.message);
    }
}


export const get_patientinqueue = async () => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    try {
        const getpatientinqueue = await axios.post(ip + 'Web_ShowPatientInQueueForTV', { ClinicId: clinicid });
        return (getpatientinqueue?.data?.Appointment);
    } catch (error) {
        return (error.response.data.message);
    }
}


