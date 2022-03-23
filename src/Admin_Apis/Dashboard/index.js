import axios from 'axios';
import ip from '../../ipaddress/ip';

export const Appointment_Details = async (startdate, endDate, clinicid) => {
    const body = {
        StartDate: startdate,
        EndDate: endDate,
        ClinicId: clinicid
    }
    try {
        const response = await axios.post(ip + 'Web_Admin_DashboardReportByDate', body);
        return (response?.data);
    }
    catch (error) {
        return (error.response.data.message)
    }
}