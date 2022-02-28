import axios from 'axios';
import ip from '../../../../ipaddress/ip';


export const AddHomeVisitorRequest = async (RequesterId, HomeVisitorId, ClinicId, RequestStatus, MobileNo, Address, PreferedTime, PreferedDate, HomeVisitReason) => {
    const body = {
        RequesterId: RequesterId,
        HomeVisitorId: HomeVisitorId,
        ClinicId: ClinicId,
        RequestStatus: RequestStatus,
        MobileNo: MobileNo,
        Address: Address,
        PreferedTime: PreferedTime,
        PreferedDate: PreferedDate + " " + PreferedTime,
        HomeVisitReason: HomeVisitReason,
    }
    try {
        const res = await axios.post(ip + 'Web_AddHomeVisitorRequest', body);
        return JSON.stringify(res?.data);
    }
    catch (error) {
        return JSON.stringify(error.response.data);
    }
}