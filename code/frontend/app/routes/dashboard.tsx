import { DistanceChart } from "../components/distance-chart/distance-chart";
import { mockUserActivity } from "../data/user-activity/user-activity.mock";

export function meta() {
    return [
        { title: "SportSee - Dashboard" },
        { name: "description", content: "Tableau de bord" },
    ];
}

export default function Dashboard() {
    return (
        <main className="dashboard">
            <h1>Vos dernières performances</h1>
            <DistanceChart activity={mockUserActivity} />
        </main>
    );
}
