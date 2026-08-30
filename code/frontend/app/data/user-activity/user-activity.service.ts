import { API_BASE_URL } from "../../config/api";
import type {
    DailyHeartRate,
    UserActivityDTO,
    WeeklyDistance,
    WeeklySummary,
} from "./user-activity.types";

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const WEEK_IN_MS = 7 * DAY_IN_MS;
const WEEK_DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

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

function getLatestActivityDate(activity: UserActivityDTO) {
    let latestDate = activity[0].date;

    for (const session of activity) {
        if (session.date > latestDate) {
            latestDate = session.date;
        }
    }

    return parseDate(latestDate);
}

function getPeriodWeekStart(activity: UserActivityDTO, periodOffset: number) {
    const monday = startOfWeek(getLatestActivityDate(activity));
    monday.setUTCDate(monday.getUTCDate() - Math.max(0, periodOffset) * 7);
    return monday;
}

export function getOldestPeriodOffset(activity: UserActivityDTO): number {
    if (activity.length === 0) {
        return 0;
    }

    let oldestDate = activity[0].date;

    for (const session of activity) {
        if (session.date < oldestDate) {
            oldestDate = session.date;
        }
    }

    const latestWeek = getPeriodWeekStart(activity, 0);
    const oldestWeek = startOfWeek(parseDate(oldestDate));
    return Math.floor(
        (latestWeek.getTime() - oldestWeek.getTime()) / WEEK_IN_MS,
    );
}

export function mapActivityToWeeklyDistances(
    activity: UserActivityDTO,
    periodOffset = 0,
): WeeklyDistance[] {
    if (activity.length === 0) {
        return [];
    }

    const firstMonday = getPeriodWeekStart(activity, periodOffset);
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
            (parseDate(session.date).getTime() - firstMonday.getTime()) /
                WEEK_IN_MS,
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

export function getWeeklyHeartRates(
    activity: UserActivityDTO,
    periodOffset = 0,
): DailyHeartRate[] {
    if (activity.length === 0) {
        return [];
    }

    const monday = getPeriodWeekStart(activity, periodOffset);
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
            (parseDate(session.date).getTime() - monday.getTime()) / DAY_IN_MS,
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
        day.average =
            (currentAverage * count + heartRate.average) / (count + 1);
        sessionCounts[dayIndex] = count + 1;
    }

    for (const day of days) {
        if (day.average !== null) {
            day.average = Number(day.average.toFixed(1));
        }
    }

    return days;
}

export function getWeeklySummary(
    activity: UserActivityDTO,
    periodOffset = 0,
): WeeklySummary | null {
    if (activity.length === 0) {
        return null;
    }

    const monday = getPeriodWeekStart(activity, periodOffset);
    const sunday = new Date(monday.getTime() + 6 * DAY_IN_MS);
    const summary: WeeklySummary = {
        startDate: toISODate(monday),
        endDate: toISODate(sunday),
        sessions: 0,
        duration: 0,
        distance: 0,
    };

    for (const session of activity) {
        const sessionDate = parseDate(session.date);

        if (sessionDate >= monday && sessionDate <= sunday) {
            summary.sessions += 1;
            summary.duration += session.duration;
            summary.distance += session.distance;
        }
    }

    summary.distance = Number(summary.distance.toFixed(1));
    return summary;
}

export async function getUserActivity(token: string): Promise<UserActivityDTO> {
    const endDate = new Date().toISOString().slice(0, 10);
    const searchParams = new URLSearchParams({
        startWeek: "2000-01-01",
        endWeek: endDate,
    });
    const response = await fetch(
        `${API_BASE_URL}/api/user-activity?${searchParams}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            throw new Error("Votre session a expiré");
        }

        throw new Error("Impossible de charger les activités");
    }

    const data: UserActivityDTO = await response.json();
    return data;
}
