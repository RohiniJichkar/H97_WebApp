import axios from 'axios';
import ip from '../../ipaddress/ip';


export const Clinic_Doctors = async () => {
    try {
        const clinicdata = await axios.post(ip + 'Web_Admin_GetAllClinicDetails');
        return clinicdata?.data?.ClinicData;
    } catch (error) {
        console.log(error)
    }
}

export const DeleteClinics = async (clinicid) => {
    try {
        const request = await axios.patch(ip + 'Web_Admin_DeleteClinic', { ClinicId: clinicid });
        return JSON.stringify(request?.data);
    } catch (error) {
        return JSON.stringify(error.response.data)
    }
}