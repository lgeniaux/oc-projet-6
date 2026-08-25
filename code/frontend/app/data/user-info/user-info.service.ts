import type { UserInfo, UserInfoDTO } from "./user-info.types";
import { mapUserInfoDTOToUserInfo } from "./user-info.mapper";

const USER_INFO_URL = "http://localhost:8000/api/user-info";

export async function getUserInfo(token: string): Promise<UserInfo> {
    const response = await fetch(USER_INFO_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            throw new Error("Votre session a expiré");
        }

        throw new Error("Impossible de charger le profil");
    }

    const apiResponse: UserInfoDTO = await response.json();

    return mapUserInfoDTOToUserInfo(apiResponse);
}
