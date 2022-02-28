import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ip from '../../../ipaddress/ip';

export const HomeVisitorRequest = async () => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    try {
        const res = await axios.post(ip + 'Web_GetHomeVisitorRequest', { ClinicId: clinicid });
        return res?.data?.HomeVisitorRequest;

    }
    catch (error) {
        return error;
    }
}
