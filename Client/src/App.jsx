import './App.css';
import {Routes, Route} from 'react-router-dom';
import Landing from './pages/Landing';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Home from './pages/Home';
import DoctorsListing from "./components/Doctors/DoctorsListing";
import DoctorDetails from './components/Doctors/DoctorDetails';
import Appointments from './components/Appointments/Appointments';
import Sidebar from './components/Admin/Sidebar';
import Dashboard from './components/Admin/Dashboard';
import Patients from './components/Admin/Patients';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';
import AllDoctors from './components/Admin/Doctors';


function App() {

  return (
    <>
<Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />

  {/* User Routes */}
  <Route element={<UserRoutes/>}>
    <Route path="/home" element={<Home />} />
    <Route path="/doctors" element={<DoctorsListing />} />
    <Route path="/doctors/:id" element={<DoctorDetails />} />
    <Route path="/appointments/:id" element={<Appointments />} />

  </Route>

  {/* Admin Routes */}
  <Route element={<AdminRoutes />}>
  <Route exact path="/admin" element={<Sidebar />}>
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="all-patients" element={<Patients />} />
    <Route path="all-doctors" element={<AllDoctors />} />
  </Route>
  </Route>
</Routes>


    </>
  )
}

export default App;
