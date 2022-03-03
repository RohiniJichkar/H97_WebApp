import React from 'react';
import axios from 'axios';
import ip from '../../ipaddress/ip';


export const Services = async () => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    try {
        const serviceInfo = await axios.post(ip + 'GetAllServices', { ClinicId: clinicid });
        return serviceInfo?.data?.Service;
    } catch (error) {
        return (error.response.data.message);
    }
}


export const Add_Services = async (formData) => {
    try {
        const addService = await axios.post(ip + 'Web_AddServices', formData, { headers: { "Content-Type": "multipart/form-data" } });
        return JSON.stringify(addService?.data);
    } catch (error) {
        return JSON.stringify(error.response.data);
    }
}


export const Delete_Service_Details_by_id = async (id) => {
    try {
        const deletereports = await axios.patch(ip + 'Web_DeleteServices', { id: id, });
        return JSON.stringify(deletereports?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}


export const Edit_Services=async (id,Userid,ClinicID,ServiceName,Category,Cost,Discount,Description)=>{
    let body = {
        "id": id,
        "DoctorId": Userid,
        "ClinicId": ClinicID,
        "ServiceName": ServiceName,
        "Category": Category,
        "Discount": Discount,
        "Price": Cost,
        "Description": Description
    }
    try {
        const res = await axios.patch(ip + 'EditServices', body)
        return JSON.stringify(res?.data);

    } catch (error) {
        return (error.response.data);
    }
}


export const Search_service = async (ServiceName) => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    try {
        const serviceInfo = await axios.post(ip + 'Web_SearchServices', { ClinicId: clinicid, ServiceName: ServiceName });
        return serviceInfo?.data?.Service;
    } catch (error) {
       return (error.response.data.message);
    }
}


export const UploadServiceImage = async (formdata) => {
    try {
        const add_Service = await axios.patch(ip + 'UploadServiceImageUsingS3',formdata, { headers: { "Content-Type": "multipart/form-data" } });
        return JSON.stringify(add_Service?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}


export const UploadClinicdetail = async (formdata) => {
    try {
        const add_Service = await axios.patch(ip + 'Web_UploadClinicLogoUsingS3',formdata, { headers: { "Content-Type": "multipart/form-data" } });
        return JSON.stringify(add_Service?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}
