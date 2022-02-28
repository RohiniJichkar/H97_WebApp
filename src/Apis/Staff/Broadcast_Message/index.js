import React from 'react';
import axios from 'axios';
import ip from '../../../ipaddress/ip';

export const Add_Broadcast = async (obj) => {
    try {
        const broadcastmessage = await axios.post(ip + 'Web_AddBroadcast', obj)
        return JSON.stringify(broadcastmessage?.data);
    }
    catch (error) {
        return (error.response.data.message);
    }
}