import axios from 'axios';
import ip from '../../ipaddress/ip';

export const Times = async () => {
    const times = await axios.post(ip + 'GetSlots');
    return times?.data?.Slots;
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


export const EditProfile = async (obj) => {
    try {
        const editInfo = await axios.patch(ip + 'Web_EditLabProfile', obj)
        return JSON.stringify(editInfo?.data);
    }
    catch (error) {
        return JSON.stringify(error.response.data);
    }
}


export const UpdateLabLogo = async (formdata) => {
    try {
        const lablogo = await axios.patch(ip + 'Web_UpdateLabLogo', formdata, { headers: { "Content-Type": "multipart/form-data" } });
        return JSON.stringify(lablogo?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}