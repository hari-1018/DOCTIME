import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
    const isAuthenticated = localStorage.getItem('role') === "Admin";

    return isAuthenticated ? <Outlet /> : <Navigate to="/login"/> ;
  }


export default AdminRoutes;
