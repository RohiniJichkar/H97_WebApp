import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ip from '../../../ipaddress/ip';

export const ApprovedHomeVisitorRequest = async (object, hvobject, time) => {

    const date = new Date();
    const now = date.toISOString().split('T')[0];
    // const time = date.getHours() + ":" + date.getMinutes();
    var data = localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    try {
        const res = await axios.post(ip + 'ApprovedHomeVisitorRequest', {
            id: object.id,
            ClinicId: clinicid,
            FirstName: object.FirstName,
            LastName: object.LastName,
            Title: object.HomeVisitReason,
            RequesterId: object.RequesterId,
            HomeVisitorId: hvobject,
            AppointmentDate: now,
            BookedDate: now,
            AppointmentTime: time,
            AppointmentStatus: 'Booked'
        })

        return res?.data;
    }
    catch (error) {
        return error;
    }

}
