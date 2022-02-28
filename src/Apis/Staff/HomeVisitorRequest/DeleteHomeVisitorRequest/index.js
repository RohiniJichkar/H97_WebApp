import axios from 'axios';
import ip from '../../../../ipaddress/ip';


export const Delete_Home_Visitor_Request = async (id) => {
    try {
        const deleterequest = await axios.delete(ip + 'Web_DeleteHomeVisitorRequest', { data: { id: id } });
        return JSON.stringify(deleterequest?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}