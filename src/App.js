import React, { useEffect, useState, Fragment } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import BookAppointment from './components/Staff_BookAppointment';
import HomeScreen from './components/HomeScreen';
import Login from './components/Login';
import { useNavigate } from 'react-router-dom';
import PatientRegistration from './components/Staff_PatientRegistration';
import TodaysAppointment from './components/Staff_TodaysAppointment';
import Dashboard from './components/Staff_Dashboard';
import ClinicPatients from './components/Staff_ClinicPatients';
import ForgotPassword from './components/ForgotPassword';
import DoctorNavbar from './components/Doctor_Navbar';

import DoctorDashboard from './components/Doctor_Dashboard';
import DoctorHome from './components/Doctor_Home';
import DoctorAddMedicine from './components/Doctor_AddMedicine';
import DoctorReports from './components/Doctor_Reports';
import DoctorAddFacilities from './components/Doctor_AddFacilities';
import DoctorUploadReports from './components/Doctor_UploadReports';
import DoctorAddStaff from './components/Doctor_AddStaff';
import DoctorBookAppointment from './components/Doctor_BookAppointment';
import DoctorAddServices from './components/Doctor_AddServices';
import DoctorClinicServices from './components/Doctor_ClinicServices';
import DoctorPatientRegistration from './components/Doctor_PatientRegistration';
import DoctorTodaysAppointment from './components/Doctor_TodaysAppointment';
import DoctorPatientDetails_SendIn from './components/Doctor_PatientDetails_SendIn';
import DoctorTreatPatient from './components/Doctor_TreatPatient';
import DoctorGeneratePrescription from './components/Doctor_GeneratePrescription';
import DoctorClinicPatients from './components/Doctor_ClinicPatients';
import ClinicServices from './components/Staff_ClinicServices';
import PatientDetails_SendIn from './components/Staff_PatientDetails_SendIn';
import DoctorProfile from './components/Doctor_Profile';
import DoctorPatientMedicalHistory from './components/Doctor_PatientMedicalHistory';
import DoctorEditProfile from './components/Doctor_EditProfile';
import DoctorHomeVisitors from './components/Doctor_HomeVisitors';
import DoctorHomeVisitRequest from './components/Doctor_HomeVisitRequest';
import DoctorAddHomeVisitors from './components/Doctor_AddHomeVisitors';
import DoctorClinicStaff from './components/Doctor_ClinicStaff';
import DoctorAssignHomeVisitor from './components/Doctor_AssignHomeVisitor';
import Doctor_TV_TodaysAppointments from './components/Doctor_TV_TodaysAppointments';
import DoctorEditClinicDetails from './components/Doctor_EditClinicDetails';
import DoctorHomeVisitHistory from './components/Doctor_HomeVisitorHistory';
import DoctorPaymentDetails from './components/Doctor_PaymentDetails';
import PaymentReports from './components/Doctor_PaymentReports';
import Todays_appointment_Tabs from './components/Todays_appointment_tabs';
import Calander_appointment_tabs from './components/Calander_appointment_tabs';
import DoctorTodaysHVAppDiary from './components/Doctor_TodaysHVAppDiary';
import DoctorAdvertisements from './components/Doctor_Advertisements';



import SignUp from './components/SignUp';

import AdminAddClinic from './components/Admin_AddClinic';
import AdminHome from './components/Admin_Home';
import AdminDashboard from './components/Admin_Dashboard';
import AdminClinicDetails from './components/Admin_ClinicDetails';
import AdminDoctorDetails from './components/Admin_DoctorDetails';
import AdminClinicDoctors from './components/Admin_Doctor_Clinics';
import Admin_Referral_Doctors from './components/Admin_Referral_Doctors';
import Admin_Tips from './components/Admin_Tips';
import Admin_Lab_Details from './components/Admin_Lab_Details';


//staff
import Staff_Home from './components/Staff_Screens/Staff_Home';
import Staff_Dashboard from './components/Staff_Screens/Staff_Dashboard';
import Staff_ClinicPatients from './components/Staff_Screens/Staff_ClinicPatients';
import Staff_Book_Appointment from './components/Staff_Screens/Staff_Book_Appointment';
import Staff_Todays_Appointment from './components/Staff_Screens/Staff_Todays_Appointment';
import Staff_TV_TodaysAppointments from './components/Staff_Screens/Staff_TV_TodaysAppointments';
import Staff_Profile from './components/Staff_Screens/Staff_Profile';
import Staff_EditProfile from './components/Staff_Screens/Staff_EditProfile';
import Staff_Reports from './components/Staff_Screens/Staff_Reports';
import Staff_Upload_Reports from './components/Staff_Screens/Staff_UploadReports';
import Staff_Home_Visit_Request from './components/Staff_Screens/Staff_Home_Visit_Request';
import Staff_Home_Visitors from './components/Staff_Screens/Staff_Home_Visitors';
import Staff_Patient_Details_SendIn from './components/Staff_Screens/Staff_PatientDetails_SendIn';
import Staff_Assign_Home_Visitor from './components/Staff_Screens/Staff_Assign_Home_Visitor';
import Staff_payment from './components/Staff_Screens/Staff_payment';
import Staff_Monthly_Appointment from './components/Staff_Screens/Staff_Monthly_Appointment';

import { Provider } from 'react-redux';
import store from './Redux/Store/index';
import DoctorMedicines from './components/Doctor_Medicines';
import DoctorEditAppointment from './components/Doctor_EditAppointment';
import Staff_EditAppointment from './components/Staff_Screens/Staff_EditAppointment';
import Admin_Clinic_Subscription from './components/Admin_Clinic_Subscription';
import DoctorCurrentPlan from './components/Doctor_CurrentPlan';
import DoctorRenewSubscription from './components/Doctor_RenewSubscription';
import DoctorAboutUs from './components/Doctor_AboutUs';
import DoctorTrainingVideo from './components/Doctor_TrainingVideo';



//Lab
import LabHome from './components/Lab_Home';
import LabClinicPatients from './components/Lab_ClinicPatients';
import LabReports from './components/Lab_Reports';
import LabUploadReports from './components/Lab_UploadReports';
import DoctorHomeLogin from './components/Doctor_Home_Login';
import DoctorIPDHome from './components/Doctor_IPD_Home';
import LabProfile from './components/Lab_Profile';
import StaffHomeLogin from './components/Staff_Screens/Staff_Home_Login';
import StaffIPDHome from './components/Staff_Screens/Staff_IPD_Home';


const App = () => {
  const navigate = useNavigate();

  const CheckUserDetails = async () => {
    const itemStr = await localStorage.getItem('rememberme');
    var UserStr = await localStorage.getItem("userdata");
    if (UserStr) {
      const item = JSON.parse(itemStr)
      const now = new Date()
      // compare the expiry time of the item with the current time
      if (itemStr) {
        if (now.getTime() > item.expiry) {
          // If the item is expired, delete the item from storage
          // and return null
          localStorage.removeItem('rememberme')
          navigate('/')
        }
        navigate('/DoctorDashboard')
      }
    }
    else {
      navigate('/')
    }
  }
  // useEffect(() => {
  //   CheckUserDetails();
  // }, [])
  return (
    <div>
      <div>
        <Fragment>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path="/forgotpassword" element={<ForgotPassword />} />

            <Route exact path="/dashboard" element={<Dashboard />}></Route>
            <Route exact path="/DoctorNavbar" element={<DoctorNavbar />}></Route>
            <Route exact path="/DoctorDashboard" element={<DoctorDashboard />}></Route>
            <Route exact path="/DoctorHome" element={<DoctorHome />}></Route>
            <Route exact path="/home" element={<HomeScreen />}></Route>
            <Route exact path="/todaysappointment" element={<TodaysAppointment />}> </Route>
            <Route exact path="/bookappointment" element={<BookAppointment />}></Route>
            <Route exact path="/patientregistration" element={<PatientRegistration />}></Route>
            <Route exact path="/clinicpatients" element={<ClinicPatients />}></Route>
            <Route exact path="/clinicservices" element={<ClinicServices />}></Route>
            <Route exact path="/patientDetails_sendIn" element={<PatientDetails_SendIn />}></Route>
            <Route exact path="/SignUp" element={<SignUp />}></Route>

         

            <Route exact path="/DoctorMedicines" element={<DoctorMedicines />}> </Route>
            <Route exact path="/DoctorAddMedicine" element={<DoctorAddMedicine />}> </Route>
            <Route exact path="/DoctorReports" element={<DoctorReports />}></Route>
            <Route exact path="/DoctorAddFacilities" element={<DoctorAddFacilities />}></Route>
            <Route exact path="/DoctorUploadReports" element={<DoctorUploadReports />}></Route>
            <Route exact path="/DoctorAddStaff" element={<DoctorAddStaff />}> </Route>
            <Route exact path="/DoctorBookAppointment" element={<DoctorBookAppointment />}> </Route>
            <Route exact path="/DoctorAddServices" element={<DoctorAddServices />}></Route>
            <Route exact path="/DoctorClinicServices" element={<DoctorClinicServices />}></Route>
            <Route exact path="/DoctorPatientRegistration" element={<DoctorPatientRegistration />}></Route>
            <Route exact path="/DoctorTodaysAppointment" element={<DoctorTodaysAppointment />}></Route>
            <Route exact path="/DoctorPatientDetails_SendIn" element={<DoctorPatientDetails_SendIn />}></Route>
            <Route exact path="/DoctorTreatPatient" element={<DoctorTreatPatient />}> </Route>
            <Route exact path="/DoctorGeneratePrescription" element={<DoctorGeneratePrescription />}></Route>
            <Route exact path="/DoctorClinicPatients" element={<DoctorClinicPatients />}> </Route>
            <Route exact path="/DoctorProfile" element={<DoctorProfile />}> </Route>
            <Route exact path="/DoctorEditProfile" element={<DoctorEditProfile />}> </Route>
            <Route exact path="/DoctorHomeVisitors" element={<DoctorHomeVisitors />}> </Route>
            <Route exact path="/DoctorHomeVisitRequest" element={< DoctorHomeVisitRequest />}></Route>
            <Route exact path="/DoctorAddHomeVisitors" element={<DoctorAddHomeVisitors />}></Route>
            <Route exact path="/DoctorPatientMedicalHistory" element={<DoctorPatientMedicalHistory />}></Route>
            <Route exact path="/DoctorClinicStaff" element={<DoctorClinicStaff />}></Route>
            <Route exact path="/DoctorAssignHomeVisitor" element={<DoctorAssignHomeVisitor />}></Route>
            <Route exact path="/Doctor_TV_TodaysAppointments" element={<Doctor_TV_TodaysAppointments />}></Route>
            <Route exact path="/DoctorEditClinicDetails" element={<DoctorEditClinicDetails />}></Route>
            <Route exact path="/DoctorPaymentDetails" element={<DoctorPaymentDetails />}></Route>
            <Route exact path='/DoctorPaymentReports' element={<PaymentReports />}></Route>
            <Route exact path='/DoctorHomeVisitHistory' element={<DoctorHomeVisitHistory />}></Route>
            <Route exact path="/Todays_appointment_Tabs" element={<Todays_appointment_Tabs />}></Route>
            <Route exact path="/Calander_appointment_tabs" element={<Calander_appointment_tabs />}></Route>
            <Route exact path="/DoctorAdvertisements" element={<DoctorAdvertisements />}></Route>

            <Route exact path="/DoctorTodaysHVAppDiary" element={<DoctorTodaysHVAppDiary />}></Route>
            <Route exact path="/DoctorEditAppointment" element={<DoctorEditAppointment />}></Route>
            <Route exact path="/DoctorCurrentPlan" element={<DoctorCurrentPlan />}></Route>
            <Route exact path="/DoctorRenewSubscription" element={<DoctorRenewSubscription />}></Route>
            <Route exact path="/DoctorAboutUs" element={<DoctorAboutUs />}></Route>
            <Route exact path="/DoctorTrainingVideo" element={<DoctorTrainingVideo />}></Route>

            <Route exact path="/DoctorHomeLogin" element={<DoctorHomeLogin />}></Route>
            <Route exact path="/DoctorIPDHome" element={<DoctorIPDHome />}></Route>
            {/* <Route exact path="/Doctor_IPD_Beds" element={< Doctor_IPD_Beds />}></Route>
            // 
            //
            <Route exact path="/Doctor_IPD_Navbar" element={<Doctor_IPD_Navbar />}></Route>
            <Route exact path="/Doctor_Ipd_Dashboard" element={<Doctor_Ipd_Dashboard/>}></Route>
            <Route exact path="/Doctor_IPD_Medicines" element={<Doctor_IPD_Mediciens/>}></Route>
            <Route exact path="/Special_IPD_Room" element={<Special_IPD_Room/>}></Route> */}
           

            <Route exact path="/AdminHome" element={<AdminHome />}></Route>
            <Route exact path="/AdminDashboard" element={<AdminDashboard />}></Route>
            <Route exact path="/AdminAddClinic" element={<AdminAddClinic />}></Route>
            <Route exact path="/AdminClinicDetails" element={<AdminClinicDetails />}></Route>
            <Route exact path="/AdminDoctorDetails" element={<AdminDoctorDetails />}></Route>
            <Route exact path="/AdminClinicDoctors" element={<AdminClinicDoctors />}></Route>
            <Route exact path="/AdminReferralDoctors" element={<Admin_Referral_Doctors />}></Route>
            <Route exact path="/AdminTips" element={<Admin_Tips />}></Route>
            <Route exact path="/AdminClinicSubscription" element={<Admin_Clinic_Subscription />}></Route>
            <Route exact path="/Admin_Lab_Details" element={<Admin_Lab_Details />}></Route>


            <Route exact path="/Staff_Home" element={<Staff_Home />}></Route>
            <Route exact path="/Staff_Assign_Home_Visitor" element={<Staff_Assign_Home_Visitor />}></Route>
            <Route exact path="/Staff_Dashboard" element={<Staff_Dashboard />}></Route>
            <Route exact path="/Staff_ClinicPatients" element={<Staff_ClinicPatients />}></Route>
            <Route exact path="/Staff_Book_Appointment" element={<Staff_Book_Appointment />}></Route>
            <Route exact path="/Staff_Todays_Appointment" element={<Staff_Todays_Appointment />}></Route>
            <Route exact path="/Staff_TV_TodaysAppointments" element={<Staff_TV_TodaysAppointments />}></Route>
            <Route exact path="/Staff_Profile" element={<Staff_Profile />}></Route>
            <Route exact path="/Staff_EditProfile" element={<Staff_EditProfile />}></Route>
            <Route exact path="/Staff_Reports" element={<Staff_Reports />}></Route>
            <Route exact path="/Staff_Upload_Reports" element={<Staff_Upload_Reports />}></Route>
            <Route exact path="/Staff_Home_Visit_Request" element={<Staff_Home_Visit_Request />}></Route>
            <Route exact path="/Staff_Home_Visitors" element={<Staff_Home_Visitors />}></Route>
            <Route exact path="/Staff_Patient_Details_SendIn" element={<Staff_Patient_Details_SendIn />}></Route>
            <Route exact path="/Staff_payment" element={<Staff_payment />}></Route>
            <Route exact path="/Staff_EditAppointment" element={<Staff_EditAppointment />}></Route>
            <Route exact path="/Staff_Monthly_Appointment" element={<Staff_Monthly_Appointment />}></Route>
            <Route exact path="/StaffHomeLogin" element={<StaffHomeLogin />}></Route>
            <Route exact path="/StaffIPDHome" element={<StaffIPDHome />}></Route>



            <Route exact path="/LabHome" element={<LabHome />}></Route>
            {/* <Route exact path="/LabNavbar" element={<LabNavbar />}></Route> */}
            <Route exact path="/LabClinicPatients" element={<LabClinicPatients />}> </Route>
            <Route exact path="/LabReports" element={<LabReports />}></Route>
            <Route exact path="/LabUploadReports" element={<LabUploadReports />}></Route>
            <Route exact path="/LabProfile" element={<LabProfile />}></Route>





          </Routes>
        </Fragment>
      </div>
      {/* <Route exact path="/forgotpassword" component={ForgotPassword}><ForgotPassword /> </Route>
        <Route exact path="/" component={Navbar}><Navbar /> </Route>
        <Route exact path="/dashboard" component={Dashboard}><Dashboard /> </Route>
        <Route exact path="/home" component={HomeScreen}><HomeScreen /> </Route>
        <Route exact path="/todaysappointment" component={TodaysAppointment}><TodaysAppointment /> </Route>
        <Route exact path="/bookappointment" component={BookAppointment}><BookAppointment /> </Route>
        <Route exact path="/patientregistration" component={PatientRegistration}><PatientRegistration /> </Route>
        <Route exact path="/clinicpatients" component={ClinicPatients}><ClinicPatients /> </Route>
        <Route exact path="/clinicservices" component={ClinicServices}><ClinicServices /> </Route>
        <Route exact path="/patientDetails_sendIn" component={PatientDetails_SendIn}><PatientDetails_SendIn /> </Route>

        <Route exact path="/DoctorNavbar" component={DoctorNavbar}><DoctorNavbar /> </Route>
        <Route exact path="/DoctorDashboard" component={DoctorDashboard}><DoctorDashboard /> </Route>
        <Route exact path="/DoctorHome" component={DoctorHome}><DoctorHome /> </Route>
        <Route exact path="/DoctorAddMedicine" component={DoctorAddMedicine}><DoctorAddMedicine /> </Route>
        <Route exact path="/DoctorReports" component={DoctorReports}><DoctorReports /> </Route>
        <Route exact path="/DoctorAddFacilities" component={DoctorAddFacilities}><DoctorAddFacilities /> </Route>
        <Route exact path="/DoctorUploadReports" component={DoctorUploadReports}><DoctorUploadReports /> </Route>
        <Route exact path="/DoctorAddStaff" component={DoctorAddStaff}><DoctorAddStaff /> </Route>
        <Route exact path="/DoctorBookAppointment" component={DoctorBookAppointment}><DoctorBookAppointment /> </Route>
        <Route exact path="/DoctorAddServices" component={DoctorAddServices}><DoctorAddServices /> </Route>
        <Route exact path="/DoctorClinicServices" component={DoctorClinicServices}><DoctorClinicServices /> </Route>
        <Route exact path="/DoctorPatientRegistration" component={DoctorPatientRegistration}><DoctorPatientRegistration /> </Route>
        <Route exact path="/DoctorTodaysAppointment" component={DoctorTodaysAppointment}><DoctorTodaysAppointment /> </Route>
        <Route exact path="/DoctorPatientDetails_SendIn" component={DoctorPatientDetails_SendIn}><DoctorPatientDetails_SendIn /> </Route>
        <Route exact path="/DoctorTreatPatient" component={DoctorTreatPatient}><DoctorTreatPatient /> </Route>
        <Route exact path="/DoctorGeneratePrescription" component={DoctorGeneratePrescription}><DoctorGeneratePrescription /> </Route>
        <Route exact path="/DoctorClinicPatients" component={DoctorClinicPatients}><DoctorClinicPatients /> </Route>
        <Route exact path="/DoctorProfile" component={DoctorProfile}><DoctorProfile /> </Route>
        <Route exact path="/DoctorEditProfile" component={DoctorEditProfile}><DoctorEditProfile /> </Route>
        <Route exact path="/DoctorHomeVisitors" component={DoctorHomeVisitors}><DoctorHomeVisitors /> </Route>
        <Route exact path="/DoctorHomeVisitRequest" component={DoctorHomeVisitRequest}>< DoctorHomeVisitRequest /> </Route>
        <Route exact path="/DoctorAddHomeVisitors" component={DoctorAddHomeVisitors}>< DoctorAddHomeVisitors /> </Route>
        <Route exact path="/DoctorPatientMedicalHistory" component={DoctorPatientMedicalHistory}><DoctorPatientMedicalHistory /> </Route>
        <Route exact path="/DoctorClinicStaff" component={DoctorClinicStaff}><DoctorClinicStaff /> </Route>
        <Route exact path="/DoctorAssignHomeVisitor" component={DoctorAssignHomeVisitor}><DoctorAssignHomeVisitor /> </Route>
        <Route exact path="/Doctor_TV_TodaysAppointments" component={Doctor_TV_TodaysAppointments}><Doctor_TV_TodaysAppointments /> </Route>
        <Route exact path="/DoctorEditClinicDetails" component={DoctorEditClinicDetails}><DoctorEditClinicDetails /> </Route>



        <Route exact path="/AdminHome" component={AdminHome}><AdminHome /> </Route>
        <Route exact path="/AdminDashboard" component={AdminDashboard}><AdminDashboard /> </Route>
        <Route exact path="/AdminAddClinic" component={AdminAddClinic}><AdminAddClinic /> </Route>
        <Route exact path="/AdminClinicDetails" component={AdminClinicDetails}><AdminClinicDetails /> </Route>
        <Route exact path="/AdminDoctorDetails" component={AdminDoctorDetails}><AdminDoctorDetails /> </Route> */}

      {/* </Routes>
      </BrowserRouter> */}
    </div>

  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};