import React from 'react';
import axios from 'axios';
import ip from '../../../ipaddress/ip';

export const change_password = async (obj) => {
    try {
        const changepass = await axios.patch(ip + 'Web_Resetpassword', obj);
        return JSON.stringify(changepass?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}


export const forgot_password = async (obj) => {
    try {
        const forgotpass = await axios.post(ip + 'Web_Forgotpassword', obj);
        return JSON.stringify(forgotpass?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}


export const EditDoctordata = async (DoctorId,clinicid,FirstName,LastName,MobileNo,Email,Address,Category,City,Pincode,State,Country,Education,DOB,MorningStartTime,MorningEndTime,EveningStartTime,EveningEndTime,Experience,Gender) => {
    const body = {
        UserId: DoctorId,
        ClinicId: clinicid,
        FirstName: FirstName,
        LastName: LastName,
        MobileNo: MobileNo,
        Email: Email,
        Address: Address,
        Category: Category,
        City: City,
        Pincode: Pincode,
        State: State,
        Country: Country,
        Education: Education,
        DOB: DOB,
        MorningStartTime: MorningStartTime,
        MorningEndTime: MorningEndTime,
        EveningStartTime: EveningStartTime,
        EveningEndTime: EveningEndTime,
        Experience: Experience,
        Gender: Gender,
    }
    try {
        const editdoctorsrequest = await axios.patch(ip + 'EditUser', body)
        return JSON.stringify(editdoctorsrequest?.data);
    }
    catch (error) {
        return JSON.stringify(error.response.data);
    }

}

