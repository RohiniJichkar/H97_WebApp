import axios from 'axios';
import ip from '../../ipaddress/ip';


export const Referral_Doctors = async () => {
    try{
    const doctordata = await axios.post(ip + 'Web_Admin_ReferralDoctors');
    return doctordata?.data?.Doctor;
    }catch(error){
        console.log(error)
    }
}