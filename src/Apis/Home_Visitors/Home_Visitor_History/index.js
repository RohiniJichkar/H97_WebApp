import React from 'react';
import axios from 'axios';
import ip from '../../../ipaddress/ip';

export const HV_Appointments_by_date = async (startdate, endDate, doctor) => {
    var data = localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let ClinicId = parsed.ClinicId;

    const body = {
        ClinicId: ClinicId,
        StartDate: startdate,
        EndDate: endDate,
        DoctorId: doctor
    }

    try {
        const response = await axios.post(ip + 'Web_HVAppointmentReport', body);
        return (response?.data);
    }
    catch (error) {
        return (error.response.data.message)
    }
}
