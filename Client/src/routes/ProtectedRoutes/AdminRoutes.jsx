import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
    const isAuthenticated = localStorage.getItem('role') === "admin";

    return isAuthenticated ? <Outlet /> : <Navigate to="/login"/> ;
  }


export default AdminRoutes;
