import {Routes, Route} from 'react-router-dom';

//Common Routes
import Landing from '../../pages/Landing';
import Register from '../../components/Auth/Register';
import Selection from '../../components/Auth/Selection';
import Login from '../../components/Auth/Login';

//Doctor Routes
import LoginDoctor from '../../components/Auth/DoctorLogin';
import ForgotPassword from '../../components/Doctors/ForgotPassword';
import ResetPassword from '../../components/Doctors/ResetPassword';
import DoctorSidebar from '../../components/Doctors/DoctorSidebar';
import DoctorDashboard from '../../components/Doctors/DoctorDashboard';
import DoctorAppointments from '../../components/Doctors/DoctorAppointments';

//Patient Routes
import UserRoutes from '../ProtectedRoutes/UserRoutes';
import Home from '../../pages/Home';
import DoctorListing from '../../components/Doctors/DoctorsListing';
import DoctorDetails from '../../components/Doctors/DoctorDetails';
import Appointments from '../../components/Appointments/Appointments';
import AppointmentDetails from '../../components/Appointments/AppointmentDetails';
import FeedbackForm from '../../components/Appointments/Feedback';

//Admin Routes
// import AdminRoutes from '../ProtectedRoutes/AdminRoutes';
import LoginAdmin from '../../components/Auth/AdminLogin';
import Sidebar from '../../components/Admin/Sidebar';
import Dashboard from '../../components/Admin/Dashboard';
import AllPatients from '../../components/Admin/Patients';
import AllDoctors from '../../components/Admin/Doctors';
import AddDoctor from '../../components/Admin/AddDoctor';
import EditDoctor from '../../components/Admin/EditDoctor';
import AdminDoctorDetails from '../../components/Admin/DoctorDetails';
import AllAppointments from '../../components/Admin/Appointments';


const AppRoutes = () => {
  return (
    <>
        <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/select" element={<Selection/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/doctor-login" element={<LoginDoctor/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />

        {/* UserRoutes */}
        <Route element={<UserRoutes/>} >
            <Route path="/home" element={<Home/>} />
            <Route path="/doctors" element={<DoctorListing/>} />
            <Route path="/doctors/:id" element={<DoctorDetails/>} />
            <Route path="/appointments/:id" element={<Appointments/>} />
            <Route path="/appointment-details/:appointmentId" element={<AppointmentDetails/>} />
            <Route path="/feedback/:doctorId" element={<FeedbackForm/>} />
        </Route>

        {/* Doctor Routes */}
        <Route path="/doctor" element={<DoctorSidebar/>}>
            <Route index element={<DoctorDashboard/>} />
            <Route path="dashboard" element={<DoctorDashboard/>} />
            <Route path=":id/my-appointments" element={<DoctorAppointments/>} />
        </Route>

        {/* Admin Routes */}
        <Route path='/admin/login' element={<LoginAdmin/>} />
        {/* <Route element={<AdminRoutes/>}> */}
            <Route path="/admin" element={<Sidebar/>} >
            <Route index element={<Dashboard/>} />
            <Route path="dashboard" element={<Dashboard/>} />
            <Route path="all-patients" element={<AllPatients/>} />
            <Route path="all-doctors" element={<AllDoctors/>} />
            <Route path="add-doctor" element={<AddDoctor/>} />
            <Route path="edit-doctor/:id" element={<EditDoctor/>} />
            <Route path="view-doctor/:id" element={<AdminDoctorDetails/>} />
            <Route path="all-appointments" element={<AllAppointments/>} />    
            </Route>   
        {/* </Route>  */}
        </Routes>
    </>
    
  )
}

export default AppRoutes