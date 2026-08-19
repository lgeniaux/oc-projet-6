import type { UserActivityDTO } from "./user-activity.types";

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const WEEK_IN_MS = 7 * DAY_IN_MS;

export type WeeklyDistance = {
    week: string;
    distance: number;
    startDate: string;
    endDate: string;
};

function parseDate(date: string) {
    return new Date(date + "T00:00:00Z");
}

function toISODate(date: Date) {
    return date.toISOString().slice(0, 10);
}

function startOfWeek(date: Date) {
    const monday = new Date(date);
    let day = monday.getUTCDay();

    if (day === 0) {
        day = 7;
    }

    monday.setUTCDate(monday.getUTCDate() - day + 1);
    return monday;
}

export function mapActivityToWeeklyDistances(activity: UserActivityDTO): WeeklyDistance[] {
    if (activity.length === 0) {
        return [];
    }

    let latestDate = activity[0].date;

    for (const session of activity) {
        if (session.date > latestDate) {
            latestDate = session.date;
        }
    }

    const firstMonday = startOfWeek(parseDate(latestDate));
    firstMonday.setUTCDate(firstMonday.getUTCDate() - 21);

    const weeks: WeeklyDistance[] = [];

    for (let index = 0; index < 4; index++) {
        const start = new Date(firstMonday.getTime() + index * WEEK_IN_MS);
        const end = new Date(start.getTime() + 6 * DAY_IN_MS);

        weeks.push({
            week: "S" + (index + 1),
            distance: 0,
            startDate: toISODate(start),
            endDate: toISODate(end),
        });
    }

    for (const session of activity) {
        const weekIndex = Math.floor(
            (parseDate(session.date).getTime() - firstMonday.getTime()) / WEEK_IN_MS
        );

        if (weekIndex >= 0 && weekIndex < weeks.length) {
            weeks[weekIndex].distance += session.distance;
        }
    }

    for (const week of weeks) {
        week.distance = Number(week.distance.toFixed(1));
    }

    return weeks;
}
