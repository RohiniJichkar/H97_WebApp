import axios from 'axios';
import ip from '../../ipaddress/ip';



export const Lab_add = async (obj) => {
    try {
        const registerPatient = await axios.post(ip + 'Web_AddLab', obj)
        return JSON.stringify(registerPatient?.data);
    }
    catch (error) {
        return JSON.stringify(error.response.data);
    }
}

export const Lab_Register = async (obj) => {
    try {
        const registerPatient = await axios.patch(ip + 'Web_EditLabProfile', obj)
        return JSON.stringify(registerPatient?.data);
    }
    catch (error) {
        return JSON.stringify(error.response.data);
    }
}

export const Delete_Labs_Details_by_id = async (UserId) => {
    try {
        const deleteLabs = await axios.patch(ip + 'Web_DeleteLab', { UserId: UserId });
        return JSON.stringify(deleteLabs?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}