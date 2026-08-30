import { Link, Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/auth-context";
import "../styles/layout.css";

export default function AppLayout() {
    const { token, logout } = useAuth();

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
                <nav
                    className="app-navigation"
                    aria-label="Navigation principale"
                >
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/profile">Mon profil</Link>
                    <span
                        className="app-navigation__divider"
                        aria-hidden="true"
                    />
                    <button type="button" onClick={logout}>
                        Se déconnecter
                    </button>
                </nav>
            </header>
            <Outlet />
            <footer className="app-footer">
                <div>
                    <span>©Sportsee</span>
                    <span>Tous droits réservés</span>
                </div>
                <div className="app-footer__links">
                    <span>Conditions générales</span>
                    <span>Contact</span>
                    <span className="app-footer__mark" aria-hidden="true" />
                </div>
            </footer>
        </>
    );
}
