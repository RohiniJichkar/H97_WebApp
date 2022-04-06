import axios from 'axios';
import ip from '../../ipaddress/ip';

export const GetTips = async () => {
    try {
        const tips = await axios.post(ip + 'Admin_GetAllTips');
        return tips?.data?.Tips;
    } catch (e) {
        console.log(e)
    }
}


export const AddTips = async (formdata) => {
    try {
        const add_tips = await axios.post(ip + 'AddTips', formdata, { headers: { "Content-Type": "multipart/form-data" } });
        return JSON.stringify(add_tips?.data);
    } catch (error) {
        return JSON.stringify(error.response.data);
    }
}


export const EditTips = async (obj) => {
    try {
        const edit_tips = await axios.patch(ip + 'EditTips', obj );
        return JSON.stringify(edit_tips?.data);
    } catch (error) {
        return JSON.stringify(error.response.data);
    }
}


export const EditImage = async (formdata) => {
    try {
        const edit_image = await axios.patch(ip + 'EditTipsImage', formdata, { headers: { "Content-Type": "multipart/form-data" } });
        return JSON.stringify(edit_image?.data);
    } catch (error) {
        return JSON.stringify(error.response.data);
    }
}

export const DeleteTips = async (id) => {
    try {
        const delete_tips = await axios.delete(ip + 'DeleteTips', { data: { id: id } });
        return JSON.stringify(delete_tips?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}