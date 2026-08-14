import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "SportSee - Dashboard" },
        { name: "description", content: "Tableau de bord" },
    ];
}

export default function Dashboard() {
    return (
        <main>
            <h1>Dashboard</h1>
        </main>
    );
}
