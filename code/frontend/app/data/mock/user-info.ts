type UserInfoApiResponse = {
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


export const mockUserInfo : UserInfoApiResponse = {
    profile: {
        firstName: "Sophie",
        lastName: "Martin",
        createdAt: "2025-01-01",
        age: 30,
        weight: 60,
        height: 165,
        profilePicture: "http://localhost:8000/images/sophie.jpg"
    },
    statistics: {
        totalDistance: "2250.2",
        totalSessions: 348,
        totalDuration: 14625
    }
}