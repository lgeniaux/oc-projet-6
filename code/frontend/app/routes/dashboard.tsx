import { useEffect, useState } from "react";
import { DashboardUserSummary } from "../components/dashboard-user-summary/dashboard-user-summary";
import { DistanceChart } from "../components/distance-chart/distance-chart";
import { HeartRateChart } from "../components/heart-rate-chart/heart-rate-chart";
import { WeeklyGoalChart } from "../components/weekly-goal-chart/weekly-goal-chart";
import { getOldestPeriodOffset } from "../data/user-activity/user-activity.service";
import { useUserActivity } from "../hooks/use-user-activity";
import { useUserInfo } from "../hooks/use-user-info";
import "../styles/dashboard.css";

export function meta() {
    return [
        { title: "SportSee - Dashboard" },
        { name: "description", content: "Tableau de bord" },
    ];
}

export default function Dashboard() {
    const { activity, loading, error } = useUserActivity();
    const {
        userInfo,
        loading: userInfoLoading,
        error: userInfoError,
    } = useUserInfo();
    const [periodOffset, setPeriodOffset] = useState(0);

    useEffect(() => {
        setPeriodOffset(0);
    }, [activity]);

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

    const oldestPeriodOffset = getOldestPeriodOffset(activity);
    const canGoPrevious = periodOffset < oldestPeriodOffset;
    const canGoNext = periodOffset > 0;
    const goToPreviousPeriod = () => {
        setPeriodOffset((currentOffset) =>
            Math.min(currentOffset + 1, oldestPeriodOffset),
        );
    };
    const goToNextPeriod = () => {
        setPeriodOffset((currentOffset) => Math.max(currentOffset - 1, 0));
    };

    return (
        <main className="dashboard">
            <DashboardUserSummary
                userInfo={userInfo}
                loading={userInfoLoading}
                error={userInfoError}
            />
            <h1>Vos dernières performances</h1>
            <div className="dashboard__charts">
                <DistanceChart
                    activity={activity}
                    periodOffset={periodOffset}
                    onPreviousPeriod={goToPreviousPeriod}
                    onNextPeriod={goToNextPeriod}
                    canGoPrevious={canGoPrevious}
                    canGoNext={canGoNext}
                />
                <HeartRateChart
                    activity={activity}
                    periodOffset={periodOffset}
                    onPreviousPeriod={goToPreviousPeriod}
                    onNextPeriod={goToNextPeriod}
                    canGoPrevious={canGoPrevious}
                    canGoNext={canGoNext}
                />
            </div>
            <WeeklyGoalChart
                activity={activity}
                goal={6}
                periodOffset={periodOffset}
            />
        </main>
    );
}
