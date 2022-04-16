import React from 'react';
import axios from 'axios';
import ip from '../../../ipaddress/ip';


export const Patients_Data = async () => {
    var data = await localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    const patientInfo = await axios.post(ip + 'Web_GetPatients', { ClinicId: clinicid });
    return patientInfo?.data?.Patients;
}


export const Reports = async (userid) => {
  
    try {
        const reports = await axios.post(ip + 'Web_GetGroupPatientReportsbyTitleForStaff', { UserId: userid});
        return reports?.data?.PatientReports;
    } catch (error) {
        return (error.response.data.message);
    }
}


export const Upload_Reports = async (obj) => {
    try {
        const addReports = await axios.post(ip + 'Web_AddPatientReports', { reportsdata: obj })
        return JSON.stringify(addReports?.data);
    }
    catch (error) {
        return JSON.stringify(error.response.data);
    }
}


export const getReportsByTitle = async (userid, reportitle) => {
    let body = {
        UserId: userid,
        ReportTitle: reportitle,
    }
    try {
        const getPatientReports = await axios.post(ip + 'Web_GetPatientReportsForStaff', body);
        return getPatientReports?.data?.PatientReports
    } catch (error) {
        return (error.response.data.message);
    }
}


export const DeleteReportsByTitle = async (userid, reporttitle) => {
    try {
        const deletereports = await axios.delete(ip + 'Web_DeletePatientReportsByTitleForStaff', { data: { UserId: userid, ReportTitle: reporttitle } });
        return JSON.stringify(deletereports?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}


export const DeleteReportsById = async (id) => {
    try {
        const deletereports = await axios.delete(ip + 'Web_DeletePatientReportById', { data: { id: id } });
        return JSON.stringify(deletereports?.data);
    } catch (error) {
        return (error.response.data.message);
    }
}