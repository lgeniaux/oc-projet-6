import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth-context";
import { getUserInfo } from "../data/user-info/user-info.service";
import type { UserInfo } from "../data/user-info/user-info.types";

export function useUserInfo() {
    const { token } = useAuth();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;

        async function loadUserInfo() {
            if (!token) {
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            setUserInfo(null);

            try {
                const data = await getUserInfo(token);

                if (!ignore) {
                    setUserInfo(data);
                }
            } catch (error) {
                if (!ignore) {
                    const message = error instanceof Error && error.message === "Votre session a expiré"
                        ? error.message
                        : "Impossible de charger le profil";
                    setError(message);
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        void loadUserInfo();

        return () => {
            ignore = true;
        };
    }, [token]);

    return { userInfo, loading, error };
}
