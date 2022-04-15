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
    let doctorid = parsed.userid;
    try {
        const reports = await axios.post(ip + 'Web_GetGroupPatientReportsbyTitle', { UserId: userid, DoctorId: doctorid });
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
        return (error.response.data.message);
    }
}


export const getReportsByTitle = async (userid, reportitle) => {
    var data = localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    let doctorid = parsed.userid;

    let body = {
        UserId: userid,
        DoctorId: doctorid,
        ReportTitle: reportitle
    }
    try {
        const getPatientReports = await axios.post(ip + 'Web_GetPatientReports', body);
        return getPatientReports?.data?.PatientReports
    } catch (error) {
        return (error.response.data.message);
    }
}


export const DeleteReportsByTitle = async (userid, reporttitle) => {
    var data = localStorage.getItem("userdata");
    let parsed = JSON.parse(data);
    let clinicid = parsed.ClinicId;
    let doctorid = parsed.userid;
    try {
        const deletereports = await axios.delete(ip + 'Web_DeletePatientReportsByTitle', { data: { UserId: userid, ReportTitle: reporttitle, DoctorId: doctorid } });
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