export type ActivitySessionDTO = {
    date: string;
    distance: number;
    duration: number;
    heartRate: {
        min: number;
        max: number;
        average: number;
    };
    caloriesBurned: number;
};

export type UserActivityDTO = ActivitySessionDTO[];

export type WeeklyDistance = {
    week: string;
    distance: number;
    startDate: string;
    endDate: string;
};

export type DailyHeartRate = {
    day: string;
    date: string;
    min: number | null;
    max: number | null;
    average: number | null;
};

export type WeeklySummary = {
    startDate: string;
    endDate: string;
    sessions: number;
    duration: number;
    distance: number;
};
