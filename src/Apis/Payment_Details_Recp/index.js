import React from 'react';
import axios from 'axios';
import ip from '../../ipaddress/ip';


export const handle_cashpayment = async (obj) => {
    try {
        const category = await axios.patch(ip + 'Web_PaymentCompletedRecp', obj);
        return JSON.stringify(category?.data);
    } catch (e) {
        console.log(e);
    }
}