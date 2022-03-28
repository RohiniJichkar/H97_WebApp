import React from 'react';
import axios from 'axios';
import ip from '../../../ipaddress/ip';

export const Register_Patient = async (obj) => {
    try {
        const registerPatient = await axios.post(ip + 'Web_AddPatients', obj)
        return JSON.stringify(registerPatient?.data);
    }
    catch (error) {
        return JSON.stringify(error.response.data);
    }
}

export const Country = async () => {
    const country = await axios.post(ip + 'Web_GetCountries');
    return country?.data?.Country;
}

export const State = async () => {
    const state = await axios.post(ip + 'Web_GetStates');
    return state?.data?.State;
}

export const City = async (obj) => {
    const city = await axios.post(ip + 'Web_GetCities', obj);
    return city?.data?.City;
}