import { Link, Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/auth-context";

export default function AppLayout() {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <header className="app-header">
                <Link className="app-logo" to="/dashboard">
                    <span className="app-logo__mark" aria-hidden="true" />
                    SPORTSEE
                </Link>
                <nav className="app-navigation" aria-label="Navigation principale">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/profile">Mon profil</Link>
                </nav>
            </header>
            <Outlet />
        </>
    );
}
