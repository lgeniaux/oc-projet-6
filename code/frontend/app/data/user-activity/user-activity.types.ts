type ActivitySessionDTO = {
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
