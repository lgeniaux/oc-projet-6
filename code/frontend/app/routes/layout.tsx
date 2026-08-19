import { Link, Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/auth-context";

export default function AppLayout() {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return <>
        <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Mon profil</Link>
        </nav>
        <Outlet />
    </>;
}
