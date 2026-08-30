import { API_BASE_URL } from "../../config/api";
import type { UserInfo, UserInfoDTO } from "./user-info.types";
import { mapUserInfoDTOToUserInfo } from "./user-info.mapper";

export async function getUserInfo(token: string): Promise<UserInfo> {
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
