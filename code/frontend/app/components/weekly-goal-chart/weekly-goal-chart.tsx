import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { UserActivityDTO } from "../../data/user-activity/user-activity.types";
import { getWeeklySummary } from "../../data/user-activity/user-activity.service";

type WeeklyGoalChartProps = {
    activity: UserActivityDTO;
    goal: number;
};

function formatDate(date: string) {
    const parts = date.split("-");
    return parts[2] + "/" + parts[1] + "/" + parts[0];
}

export function WeeklyGoalChart(props: WeeklyGoalChartProps) {
    const summary = getWeeklySummary(props.activity);
    const goal = props.goal > 0 ? props.goal : 0;
    const completed = summary?.sessions ?? 0;
    const remaining = Math.max(goal - completed, 0);
    const completedInGoal = Math.min(completed, goal);
    const chartData = [
        {
            name: completed + (completed > 1 ? " réalisées" : " réalisée"),
            value: completedInGoal,
            fill: "#0B23F4",
        },
        {
            name: remaining + (remaining > 1 ? " restantes" : " restante"),
            value: remaining,
            fill: "#AAB2FF",
        },
    ];

    let period = "Aucune activité enregistrée";

    if (summary) {
        period = `Du ${formatDate(summary.startDate)} au ${formatDate(summary.endDate)}`;
    }

    return (
        <section className="weekly-summary" aria-labelledby="weekly-summary-title">
            <header className="weekly-summary__header">
                <h2 id="weekly-summary-title">Cette semaine</h2>
                <p>{period}</p>
            </header>

            <div className="weekly-summary__grid">
                <article className="weekly-goal-card">
                    <header>
                        <h3>
                            <strong>x{completed}</strong>
                            <span> sur objectif de {goal}</span>
                        </h3>
                        <p>Courses hebdomadaires réalisées</p>
                    </header>

                    <div
                        className="weekly-goal-card__chart"
                        aria-label={`${completed} courses réalisées et ${remaining} restantes`}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Tooltip />
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={52}
                                    outerRadius={82}
                                    startAngle={90}
                                    endAngle={-270}
                                    stroke="none"
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="weekly-goal-card__legend" aria-label="Légende de l'objectif">
                        <span>
                            <i className="weekly-goal-card__dot weekly-goal-card__dot--completed" />
                            {completed} {completed > 1 ? "réalisées" : "réalisée"}
                        </span>
                        <span>
                            <i className="weekly-goal-card__dot weekly-goal-card__dot--remaining" />
                            {remaining} {remaining > 1 ? "restantes" : "restante"}
                        </span>
                    </div>
                </article>

                <div className="weekly-summary__stats">
                    <article className="weekly-stat-card">
                        <h3>Durée d’activité</h3>
                        <p>
                            <strong>{summary?.duration ?? 0}</strong> minutes
                        </p>
                    </article>
                    <article className="weekly-stat-card">
                        <h3>Distance</h3>
                        <p className="weekly-stat-card__distance">
                            <strong>{(summary?.distance ?? 0).toFixed(1)}</strong> kilomètres
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
}
