import type { Route } from "./+types/profile";
import { UserSummary } from "../components/user-summary/user-summary";
import { mapUserInfoDTOToUserInfo } from "../data/user-info/user-info.mapper";
import { mockUserInfo } from "../data/user-info/user-info.mock";


export function meta({}: Route.MetaArgs) {
    return [
        { title: "SportSee - Profile" },
        { name: "description", content: "Profil utilisateur" },
    ];
}

export default function Profile() {
    return (
        <main>
            <h1>Profile</h1>
            <UserSummary userInfo={mapUserInfoDTOToUserInfo(mockUserInfo)} />
        </main>
    );
}
