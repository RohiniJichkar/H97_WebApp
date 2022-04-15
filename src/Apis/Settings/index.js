import axios from 'axios';
import ip from '../../ipaddress/ip';

export const Get_Subscription = async () => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    const subscription = await axios.post(ip + 'Web_ClinicSubscription', { ClinicId: clinicid });
    return subscription?.data?.Subscription;
}


export const Get_Plans = async () => {
    const plan = await axios.post(ip + 'GetPaymentPackages');
    return plan?.data?.Package;
}


export const Renew_Subscription = async (obj) => {
    try {
        const renew = await axios.post(ip + 'Web_RenewSubscriptionEmail', obj)
        return renew?.data;
    }
    catch (error) {
        return error.response.data;
    }
}