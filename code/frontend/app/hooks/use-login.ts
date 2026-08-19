import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/auth-context";
import { login } from "../data/auth/auth.service";
import type { LoginRequestDTO } from "../data/auth/auth.types";

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setToken } = useAuth();
    const navigate = useNavigate();

    async function submit(credentials: LoginRequestDTO) {
        setLoading(true);
        setError(null);

        try {
            const response = await login(credentials);
            setToken(response.token);
            navigate("/dashboard");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Connexion impossible");
        } finally {
            setLoading(false);
        }
    }

    return { submit, loading, error };
}
