import type { UserActivityDTO } from "./user-activity.types";

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const WEEK_IN_MS = 7 * DAY_IN_MS;

export type WeeklyDistance = {
    week: string;
    distance: number;
    startDate: string;
    endDate: string;
};

const WEEK_DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export type DailyHeartRate = {
    day: string;
    date: string;
    min: number | null;
    max: number | null;
    average: number | null;
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

export function getWeeklyHeartRates(activity: UserActivityDTO): DailyHeartRate[] {
    if (activity.length === 0) {
        return [];
    }

    let latestDate = activity[0].date;

    for (const session of activity) {
        if (session.date > latestDate) {
            latestDate = session.date;
        }
    }

    const monday = startOfWeek(parseDate(latestDate));
    const days: DailyHeartRate[] = [];
    const sessionCounts = [0, 0, 0, 0, 0, 0, 0];

    for (let index = 0; index < 7; index++) {
        const date = new Date(monday.getTime() + index * DAY_IN_MS);

        days.push({
            day: WEEK_DAYS[index],
            date: toISODate(date),
            min: null,
            max: null,
            average: null,
        });
    }

    for (const session of activity) {
        const dayIndex = Math.floor(
            (parseDate(session.date).getTime() - monday.getTime()) / DAY_IN_MS
        );

        if (dayIndex < 0 || dayIndex >= days.length) {
            continue;
        }

        const day = days[dayIndex];
        const heartRate = session.heartRate;

        if (day.min === null || heartRate.min < day.min) {
            day.min = heartRate.min;
        }

        if (day.max === null || heartRate.max > day.max) {
            day.max = heartRate.max;
        }

        const count = sessionCounts[dayIndex];
        const currentAverage = day.average ?? 0;
        day.average = (currentAverage * count + heartRate.average) / (count + 1);
        sessionCounts[dayIndex] = count + 1;
    }

    for (const day of days) {
        if (day.average !== null) {
            day.average = Number(day.average.toFixed(1));
        }
    }

    return days;
}
