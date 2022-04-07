import axios from 'axios';
import ip from '../../ipaddress/ip';


export const Get_Subscription = async () => {
    try {
        const subscription = await axios.post(ip + 'Web_Admin_SubscriptionDetails');
        return subscription?.data?.Subscription;
    } catch (e) {
        console.log(e);
    }
}

export const editSubscription = async (obj) => {
    try {
        const editsubscription = await axios.patch(ip + 'Web_Admin_Edit_Subscription', obj );
        return JSON.stringify(editsubscription?.data);
    } catch (error) {
        return JSON.stringify(error.response.data);
    }
}
