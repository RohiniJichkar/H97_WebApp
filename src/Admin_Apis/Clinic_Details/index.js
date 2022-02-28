import axios from 'axios';
import ip from '../../ipaddress/ip';


export const Clinic_Doctors = async () => {
    try{
    const clinicdata = await axios.post(ip + 'Web_Admin_GetAllClinicDetails');
    return clinicdata?.data?.ClinicData;
    }catch(error){
        console.log(error)
    }
}