import { DistanceChart } from "../components/distance-chart/distance-chart";
import { HeartRateChart } from "../components/heart-rate-chart/heart-rate-chart";
import { WeeklyGoalChart } from "../components/weekly-goal-chart/weekly-goal-chart";
import { useUserActivity } from "../hooks/use-user-activity";
import "../styles/dashboard.css";

export function meta() {
    return [
        { title: "SportSee - Dashboard" },
        { name: "description", content: "Tableau de bord" },
    ];
}

export default function Dashboard() {
    const { activity, loading, error } = useUserActivity();

    if (loading) {
        return (
            <main className="dashboard">
                <p className="page-status" aria-live="polite">
                    Chargement des activités…
                </p>
            </main>
        );
    }

    if (error || !activity) {
        return (
            <main className="dashboard">
                <p className="page-status page-status--error" role="alert">
                    {error ?? "Aucune activité disponible"}
                </p>
            </main>
        );
    }

    return (
        <main className="dashboard">
            <h1>Vos dernières performances</h1>
            <div className="dashboard__charts">
                <DistanceChart activity={activity} />
                <HeartRateChart activity={activity} />
            </div>
            <WeeklyGoalChart activity={activity} goal={6} />
        </main>
    );
}
