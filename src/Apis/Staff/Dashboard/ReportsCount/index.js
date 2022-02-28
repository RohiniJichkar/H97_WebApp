import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ip from '../../../ipaddress/ip';

const counter = () => {

    const [today, settoday] = useState([]);

    useEffect(() => {
        Todays_registration();
    }, [input])

    const Todays_registration = async () => {
        var data = await localStorage.getItem("userdata");
        let parsed = JSON.parse(data);
        let clinicid = parsed.ClinicId;
        const res = await fetch(ip + 'Web_AppointmentReport', { ClinicId: clinicid });
        const actualData = await res.json();
       
    }
}