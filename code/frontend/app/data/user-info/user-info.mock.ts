import type { UserInfoDTO } from "./user-info.types";

export const mockUserInfo : UserInfoDTO = {
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
