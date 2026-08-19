import { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextValue = {
    token: string | null;
    setToken: (token: string) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setTokenState] = useState<string | null>(() =>
        typeof window === "undefined" ? null : sessionStorage.getItem("token")
    );

    function setToken(token: string) {
        sessionStorage.setItem("token", token);
        setTokenState(token);
    }

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}
