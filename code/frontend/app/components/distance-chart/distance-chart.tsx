import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type { UserActivityDTO } from "../../data/user-activity/user-activity.types";
import { mapActivityToWeeklyDistances } from "../../data/user-activity/user-activity.service";

type DistanceChartProps = {
    activity: UserActivityDTO;
    periodOffset: number;
    onPreviousPeriod: () => void;
    onNextPeriod: () => void;
    canGoPrevious: boolean;
    canGoNext: boolean;
};

function formatDate(date: string) {
    const parts = date.split("-");
    return parts[2] + "/" + parts[1];
}

export function DistanceChart(props: DistanceChartProps) {
    const weeks = mapActivityToWeeklyDistances(
        props.activity,
        props.periodOffset,
    );
    let totalDistance = 0;

    for (const week of weeks) {
        totalDistance += week.distance;
    }

    let average = 0;
    let period = "Aucune activité";

    if (weeks.length > 0) {
        average = totalDistance / weeks.length;
        period = `${formatDate(weeks[0].startDate)} au ${formatDate(weeks[3].endDate)}`;
    }

    return (
        <section
            className="distance-card"
            aria-labelledby="distance-chart-title"
        >
            <header className="distance-card__header">
                <div>
                    <h2 id="distance-chart-title">
                        {average.toFixed(1)} km en moyenne
                    </h2>
                    <p>Total des kilomètres des 4 dernières semaines</p>
                </div>
                <div className="chart-period">
                    <button
                        className="chart-period__button"
                        type="button"
                        onClick={props.onPreviousPeriod}
                        disabled={!props.canGoPrevious}
                        aria-label="Afficher une période plus ancienne"
                    >
                        ‹
                    </button>
                    <span aria-live="polite">{period}</span>
                    <button
                        className="chart-period__button"
                        type="button"
                        onClick={props.onNextPeriod}
                        disabled={!props.canGoNext}
                        aria-label="Afficher une période plus récente"
                    >
                        ›
                    </button>
                </div>
            </header>

            <div className="distance-card__chart">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeks}>
                        <CartesianGrid vertical={false} stroke="#F1F1F1" />
                        <XAxis
                            dataKey="week"
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Bar
                            dataKey="distance"
                            name="Km"
                            fill="#7987FF"
                            radius={8}
                            barSize={15}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
