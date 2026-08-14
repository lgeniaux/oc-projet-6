import type { UserInfo } from '../../data/user-info/user-info.types.ts';

type UserSummaryProps = {
    userInfo: UserInfo;
};

export function UserSummary({ userInfo }: UserSummaryProps) { // Destructuration du prop userInfo, remplace const userInfo = props.userInfo;
    const { profile, statistics } = userInfo; // Destructuration, remplace const profile = userInfo.profile; const statistics = userInfo.statistics;
    
    return (
        <div className="user-summary">
            <div className="profile">
                <img src={profile.profilePicture} alt={`${profile.firstName} ${profile.lastName}`} />
                <h2>{`${profile.firstName} ${profile.lastName}`}</h2>
                <p>Age: {profile.age}</p>
                <p>Weight: {profile.weight} kg</p>
                <p>Height: {profile.height} cm</p>
                <p>Member since: {new Date(profile.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="statistics">
                <h3>Statistics</h3>
                <p>Total Distance: {statistics.totalDistance} km</p>
                <p>Total Sessions: {statistics.totalSessions}</p>
                <p>Total Duration: {statistics.totalDuration} hours</p>
            </div>
        </div>
    );
}

