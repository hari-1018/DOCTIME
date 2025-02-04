import { Navigate, Outlet } from "react-router-dom";

const UserRoutes = () => {
    const isAuthenticated = localStorage.getItem('role')=== "user";

    return isAuthenticated ? <Outlet /> : <Navigate to="/login"/>;
  }

export default UserRoutes;
