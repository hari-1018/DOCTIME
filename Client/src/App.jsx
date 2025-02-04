import './App.css';
import {Routes, Route} from 'react-router-dom';
import Landing from './pages/Landing';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import DoctorLogin from './components/Auth/DoctorLogin';
import ForgotPassword from './components/Auth/ForgotPassword';
import Home from './pages/Home';
import DoctorsListing from "./components/Doctors/DoctorsListing";
import DoctorDetails from './components/Doctors/DoctorDetails';
import DoctorAppointments from './components/Doctors/DoctorAppointments';
import Appointments from './components/Appointments/Appointments';
import Sidebar from './components/Admin/Sidebar';
import Dashboard from './components/Admin/Dashboard';
import AllDoctors from './components/Admin/Doctors';
import Patients from './components/Admin/Patients';
import AllAppointments from './components/Admin/Appointments';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';
import Selection from './components/Auth/Selection';
import DoctorSidebar from './components/Doctors/DoctorSidebar';
import DoctorDashboard from './components/Doctors/DoctorDashboard';



function App() {

  return (
    <>
<Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/register" element={<Register />} />
  <Route path="/select" element={<Selection />} />
  <Route path="/login" element={<Login />} />
  <Route path='/doctor-login' element={<DoctorLogin/>}/>
  <Route path='/forgot-password' element={<ForgotPassword/>}/>


  {/* User Routes */}
  <Route element={<UserRoutes/>}>
    <Route path="/home" element={<Home />} />
    <Route path="/doctors" element={<DoctorsListing />} />
    <Route path="/doctors/:id" element={<DoctorDetails />} />
    <Route path="/appointments/:id" element={<Appointments />} />

  </Route>

  {/* Admin Routes */}
  {/* <Route element={<AdminRoutes />}> */}
  <Route path="/admin" element={<Sidebar />}>
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="all-patients" element={<Patients />} />
    <Route path="all-doctors" element={<AllDoctors />} />
    <Route path="all-appointments" element={<AllAppointments />} />
  </Route>
  {/* </Route> */}

  {/* Doctor Routes */}
  <Route path="/doctor" element={<DoctorSidebar />}>
  <Route index element={<DoctorDashboard />} />
  <Route path="dashboard" element={<DoctorDashboard/>} />
  <Route path=":id/my-patients" element={<Patients />} />
  <Route path=":id/my-appointments" element={<DoctorAppointments />} />
  </Route>
</Routes>


    </>
  )
}

export default App;
