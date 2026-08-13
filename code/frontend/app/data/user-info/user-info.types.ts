export type UserInfoDTO = {
    profile: {
        firstName: string;
        lastName: string;
        createdAt: string;
        age: number;
        weight: number;
        height: number;
        profilePicture: string;
    };
    statistics: {
        totalDistance: string;
        totalSessions: number;
        totalDuration: number;
    };
};

export type UserInfo = {
    profile: {
        firstName: string;
        lastName: string;
        createdAt: string;
        age: number;
        weight: number;
        height: number;
        profilePicture: string;
    };
    statistics: {
        totalDistance: number;
        totalSessions: number;
        totalDuration: number;
    };
};
