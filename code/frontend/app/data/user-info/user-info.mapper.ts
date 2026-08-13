import type { UserInfoDTO, UserInfo } from "./user-info.types";

export function mapUserInfoDTOToUserInfo(apiResponse: UserInfoDTO) : UserInfo {
    return {
        profile: {
            firstName: apiResponse.profile.firstName,
            lastName: apiResponse.profile.lastName,
            createdAt: apiResponse.profile.createdAt,
            age: apiResponse.profile.age,
            weight: apiResponse.profile.weight,
            height: apiResponse.profile.height,
            profilePicture: apiResponse.profile.profilePicture
        },
        statistics: {
            totalDistance: Number(apiResponse.statistics.totalDistance),
            totalSessions: apiResponse.statistics.totalSessions,
            totalDuration: apiResponse.statistics.totalDuration
        }
    };
}
