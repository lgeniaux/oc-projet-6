import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth-context";
import { getUserActivity } from "../data/user-activity/user-activity.service";
import type { UserActivityDTO } from "../data/user-activity/user-activity.types";

export function useUserActivity() {
    const { token } = useAuth();
    const [activity, setActivity] = useState<UserActivityDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;

        async function loadActivity() {
            if (!token) {
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            setActivity(null);

            try {
                const data = await getUserActivity(token);

                if (!ignore) {
                    setActivity(data);
                }
            } catch (error) {
                if (!ignore) {
                    const message = error instanceof Error && error.message === "Votre session a expiré"
                        ? error.message
                        : "Impossible de charger les activités";
                    setError(message);
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        void loadActivity();

        return () => {
            ignore = true;
        };
    }, [token]);

    return { activity, loading, error };
}
