import { Link, Outlet } from "react-router";

export default function AppLayout() {
    return <>
        <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Mon profil</Link>
        </nav>
        <Outlet />
    </>;
}
