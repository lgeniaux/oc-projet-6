import {
    getRestDays,
    getTotalCalories,
} from "../../data/user-activity/user-activity.service";
import type { UserActivityDTO } from "../../data/user-activity/user-activity.types";
import type { UserInfo } from "../../data/user-info/user-info.types";

type UserSummaryProps = {
    userInfo: UserInfo;
    activity: UserActivityDTO;
};

export function UserSummary(props: UserSummaryProps) {
    const profile = props.userInfo.profile;
    const statistics = props.userInfo.statistics;
    const memberSince = new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(profile.createdAt));
    const hours = Math.floor(statistics.totalDuration / 60);
    const minutes = statistics.totalDuration % 60;
    const heightInMeters = Math.floor(profile.height / 100);
    const heightInCentimeters = String(profile.height % 100).padStart(2, "0");
    const totalCalories = getTotalCalories(props.activity);
    const restDays = getRestDays(props.activity, profile.createdAt);
    let totalDuration = hours + "h";

    if (minutes > 0) {
        totalDuration += " " + minutes + "min";
    }

    return (
        <div className="user-summary">
            <div className="user-summary__profile">
                <section
                    className="profile-identity-card"
                    aria-labelledby="profile-name"
                >
                    <img
                        src={profile.profilePicture}
                        alt={`${profile.firstName} ${profile.lastName}`}
                    />
                    <div>
                        <h1 id="profile-name">
                            {profile.firstName} {profile.lastName}
                        </h1>
                        <p>Membre depuis le {memberSince}</p>
                    </div>
                </section>

                <section
                    className="profile-details-card"
                    aria-labelledby="profile-details-title"
                >
                    <h2 id="profile-details-title">Votre profil</h2>
                    <dl>
                        <div>
                            <dt>Âge</dt>
                            <dd>{profile.age} ans</dd>
                        </div>
                        <div>
                            <dt>Taille</dt>
                            <dd>
                                {heightInMeters}m{heightInCentimeters}
                            </dd>
                        </div>
                        <div>
                            <dt>Poids</dt>
                            <dd>{profile.weight} kg</dd>
                        </div>
                    </dl>
                </section>
            </div>

            <section
                className="profile-statistics"
                aria-labelledby="profile-statistics-title"
            >
                <header>
                    <h2 id="profile-statistics-title">Vos statistiques</h2>
                    <p>depuis le {memberSince}</p>
                </header>

                <div className="profile-statistics__grid">
                    <article>
                        <h3>Temps total couru</h3>
                        <p>{totalDuration}</p>
                    </article>
                    <article>
                        <h3>Calories brûlées</h3>
                        <p>{totalCalories.toLocaleString("fr-FR")} kcal</p>
                    </article>
                    <article>
                        <h3>Distance totale parcourue</h3>
                        <p>
                            {statistics.totalDistance.toLocaleString("fr-FR")}{" "}
                            km
                        </p>
                    </article>
                    <article>
                        <h3>Nombre de jours de repos</h3>
                        <p>{restDays} jours</p>
                    </article>
                    <article>
                        <h3>Nombre de sessions</h3>
                        <p>{statistics.totalSessions} sessions</p>
                    </article>
                </div>
            </section>
        </div>
    );
}
