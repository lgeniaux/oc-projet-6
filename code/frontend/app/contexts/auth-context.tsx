import { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextValue = {
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void;
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider(props: AuthProviderProps) {
    let savedToken: string | null = null;

    if (typeof window !== "undefined") {
        savedToken = sessionStorage.getItem("token");
    }

    const [token, setTokenState] = useState<string | null>(savedToken);

    function setToken(token: string) {
        sessionStorage.setItem("token", token);
        setTokenState(token);
    }

    function logout() {
        sessionStorage.removeItem("token");
        setTokenState(null);
    }

    return (
        <AuthContext.Provider value={{ token, setToken, logout }}>
            {props.children}
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
