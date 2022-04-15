import React from 'react';
import axios from 'axios';
import ip from '../../ipaddress/ip';


export const Patients_Data = async () => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    const patientInfo = await axios.post(ip + 'Web_GetPatients', { ClinicId: clinicid });
    return patientInfo?.data?.Patients;
}


export const Reports = async (userid) => {
    var data = localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let labid = parsed.UserProfile.LabId;
    try {
        const reports = await axios.post(ip + 'Web_GetGroupPatientReportsbyTitleForLab', { UserId: userid, ClinicId: labid });
        return reports?.data?.PatientReports;
    } catch (error) {
        return (error.response.data.message);
    }
}


export const Upload_Reports = async (obj) => {
    try {
        const addReports = await axios.post(ip + 'Web_ShareSingleReport', obj)
        return JSON.stringify(addReports?.data);
    }
    catch (error) {
        return (error.response.data.message);
    }
}


export const getReportsByTitle = async (userid, reportitle) => {
    var data = localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let labid = parsed.UserProfile.LabId;
    let doctorid = parsed.userid;

    let body = {
        UserId: userid,
        ClinicId: labid,
        ReportTitle: reportitle
    }
    try {
        const getPatientReports = await axios.post(ip + 'Web_GetPatientReportsForLab', body);
        return getPatientReports?.data?.PatientReports
    } catch (error) {
        return (error.response.data.message);
    }
}


export const DeleteReportsByTitle = async (userid, reporttitle) => {
    var data = localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let labid = parsed.UserProfile.LabId;
    let doctorid = parsed.userid;
    try {
        const deletereports = await axios.delete(ip + 'Web_DeletePatientReportsByTitleForLab', { data: { UserId: userid, ReportTitle: reporttitle, ClinicId: labid } });
        return JSON.stringify(deletereports?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}


export const DeleteReportsById = async (id) => {
    try {
        const deletereports = await axios.delete(ip + 'Web_DeletePatientReportById', { data: { id: id } });
        console.log("Delete Reports : ", deletereports?.data);
        return JSON.stringify(deletereports?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}



export const Doctor_Data = async () => {
    const doctorInfo = await axios.post(ip + 'GetDoctorsListForWeb');
    return doctorInfo?.data?.Data;
}
