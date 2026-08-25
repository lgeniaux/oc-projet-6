import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type { UserActivityDTO } from "../../data/user-activity/user-activity.types";
import { getWeeklyHeartRates } from "../../data/user-activity/user-activity.service";

type HeartRateChartProps = {
    activity: UserActivityDTO;
};

function formatDate(date: string) {
    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "short",
        timeZone: "UTC",
    }).format(new Date(date + "T00:00:00Z"));
}

export function HeartRateChart(props: HeartRateChartProps) {
    const days = getWeeklyHeartRates(props.activity);
    let totalHeartRate = 0;
    let daysWithActivity = 0;

    for (const day of days) {
        if (day.average !== null) {
            totalHeartRate += day.average;
            daysWithActivity += 1;
        }
    }

    let average = 0;
    let period = "Aucune activité";

    if (days.length > 0) {
        period = `${formatDate(days[0].date)} - ${formatDate(days[6].date)}`;
    }

    if (daysWithActivity > 0) {
        average = totalHeartRate / daysWithActivity;
    }

    return (
        <section className="heart-rate-card" aria-labelledby="heart-rate-chart-title">
            <header className="heart-rate-card__header">
                <div>
                    <h2 id="heart-rate-chart-title">{average.toFixed(0)} BPM</h2>
                    <p>Fréquence cardiaque moyenne</p>
                </div>
                <p>{period}</p>
            </header>

            <div className="heart-rate-card__chart">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={days} margin={{ top: 12, right: 24, bottom: 8, left: 0 }}>
                        <CartesianGrid vertical={false} stroke="#F1F1F1" strokeDasharray="2 2" />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tickMargin={20}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tickMargin={10}
                            domain={["dataMin - 5", "dataMax + 5"]}
                        />
                        <Tooltip />
                        <Bar
                            dataKey="min"
                            name="Min"
                            fill="#F99885"
                            radius={8}
                            barSize={14}
                        />
                        <Bar
                            dataKey="max"
                            name="Max BPM"
                            fill="#F4320B"
                            radius={8}
                            barSize={14}
                        />
                        <Line
                            type="monotone"
                            dataKey="average"
                            name="Moyenne BPM"
                            stroke="#0B23F4"
                            strokeWidth={3}
                            connectNulls
                            dot={{ r: 4, fill: "#0B23F4", stroke: "#FFFFFF", strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            <div className="heart-rate-card__legend" aria-label="Légende du graphique">
                <span>
                    <i className="heart-rate-card__legend-dot heart-rate-card__legend-dot--min" />
                    Min
                </span>
                <span>
                    <i className="heart-rate-card__legend-dot heart-rate-card__legend-dot--max" />
                    Max BPM
                </span>
                <span>
                    <i className="heart-rate-card__legend-dot heart-rate-card__legend-dot--average" />
                    Moyenne BPM
                </span>
            </div>
        </section>
    );
}
