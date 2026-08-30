import type { UserInfo } from "../../data/user-info/user-info.types";

type DashboardUserSummaryProps = {
    userInfo: UserInfo | null;
    loading: boolean;
    error: string | null;
};

function formatDate(date: string) {
    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(date));
}

export function DashboardUserSummary(props: DashboardUserSummaryProps) {
    if (props.loading) {
        return (
            <section className="dashboard-user-summary" aria-label="Résumé du profil">
                <p className="page-status" aria-live="polite">
                    Chargement du profil…
                </p>
            </section>
        );
    }

    if (props.error || !props.userInfo) {
        return (
            <section className="dashboard-user-summary" aria-label="Résumé du profil">
                <p className="page-status page-status--error" role="alert">
                    {props.error ?? "Résumé du profil indisponible"}
                </p>
            </section>
        );
    }

    const { profile, statistics } = props.userInfo;
    const totalDistance = statistics.totalDistance.toLocaleString("fr-FR", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });

    return (
        <section
            className="dashboard-user-summary"
            aria-labelledby="dashboard-user-summary-title"
        >
            <div className="dashboard-user-summary__identity">
                <img
                    src={profile.profilePicture}
                    alt={`${profile.firstName} ${profile.lastName}`}
                />
                <div>
                    <h2 id="dashboard-user-summary-title">
                        {profile.firstName} {profile.lastName}
                    </h2>
                    <p>Membre depuis le {formatDate(profile.createdAt)}</p>
                </div>
            </div>

            <div className="dashboard-user-summary__distance">
                <p>Distance totale parcourue</p>
                <strong>{totalDistance} km</strong>
            </div>
        </section>
    );
}
