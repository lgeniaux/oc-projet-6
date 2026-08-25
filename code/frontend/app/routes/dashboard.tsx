import { DistanceChart } from "../components/distance-chart/distance-chart";
import { HeartRateChart } from "../components/heart-rate-chart/heart-rate-chart";
import { WeeklyGoalChart } from "../components/weekly-goal-chart/weekly-goal-chart";
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
            <div className="dashboard__charts">
                <DistanceChart activity={mockUserActivity} />
                <HeartRateChart activity={mockUserActivity} />
            </div>
            <WeeklyGoalChart activity={mockUserActivity} goal={6} />
        </main>
    );
}
