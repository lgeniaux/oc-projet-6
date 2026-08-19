import { useState } from "react";
import { useLogin } from "../../hooks/use-login";

export function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { submit, loading, error } = useLogin();

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            void submit({ username, password });
        }}>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                />
            </div>
            {error && <p role="alert">{error}</p>}
            <button type="submit" disabled={loading}>
                {loading ? "Connexion…" : "Se connecter"}
            </button>
        </form>
    );
}
