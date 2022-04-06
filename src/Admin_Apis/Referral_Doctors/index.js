import axios from 'axios';
import ip from '../../ipaddress/ip';


export const Referral_Doctors = async () => {
    try {
        const clinicdata = await axios.post(ip + 'Web_Admin_ReferralDoctors');
        return clinicdata?.data?.Doctor;
    } catch (error) {
        console.log(error)
    }
}


export const Edit_ReferralDoctors_Status = async (obj) => {
    try {
        const request = await axios.patch(ip + 'Web_Admin_EditReferralStatus', obj);
        return JSON.stringify(request?.data);
    } catch (error) {
        return JSON.stringify(error.response.data)
    }
}


export const DeleteReferrals = async (id) => {
    try {
        const request = await axios.delete(ip + 'Web_Admin_DeleteReferrals', { data: { id: id } });
        return JSON.stringify(request?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}