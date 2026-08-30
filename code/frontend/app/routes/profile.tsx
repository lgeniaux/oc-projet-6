import type { Route } from "./+types/profile";
import { UserSummary } from "../components/user-summary/user-summary";
import { useUserInfo } from "../hooks/use-user-info";
import "../styles/profile.css";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "SportSee - Profile" },
        { name: "description", content: "Profil utilisateur" },
    ];
}

export default function Profile() {
    const { userInfo, loading, error } = useUserInfo();

    if (loading) {
        return (
            <main className="profile-page">
                <p className="page-status" aria-live="polite">
                    Chargement du profil…
                </p>
            </main>
        );
    }

    if (error || !userInfo) {
        return (
            <main className="profile-page">
                <p className="page-status page-status--error" role="alert">
                    {error ?? "Profil indisponible"}
                </p>
            </main>
        );
    }

    return (
        <main className="profile-page">
            <UserSummary userInfo={userInfo} />
        </main>
    );
}
