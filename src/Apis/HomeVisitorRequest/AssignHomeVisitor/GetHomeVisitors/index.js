import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ip from '../../../../ipaddress/ip';

export const GetHomeVisitorDoctors = async () => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    try {
        const res = await axios.post(ip + 'Web_GetHomeVisitorDoctorsforClinic', { ClinicId: clinicid });
        return res?.data?.HomeVisitors;
    }
    catch (error) {
        return error;
    }
}
