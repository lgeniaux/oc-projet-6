import { API_BASE_URL } from "../../config/api";
import { USE_MOCK_DATA } from "../../config/data-source";
import { mapUserInfoDTOToUserInfo } from "./user-info.mapper";
import { mockUserInfo } from "./user-info.mock";
import type { UserInfo, UserInfoDTO } from "./user-info.types";

export async function getUserInfo(token: string): Promise<UserInfo> {
    if (USE_MOCK_DATA) {
        return mapUserInfoDTOToUserInfo(mockUserInfo);
    }

    const response = await fetch(`${API_BASE_URL}/api/user-info`, {
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
