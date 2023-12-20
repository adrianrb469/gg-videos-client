import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

function RequireAuth({ adminOnly = false }) {
    const { auth } = useAuth()!;
    const location = useLocation();

    if (!auth?.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (adminOnly && !auth.user.is_admin) {
        return (
            <Navigate to="/unauthorized" state={{ from: location }} replace />
        );
    }

    return <Outlet />;
}

export default RequireAuth;
