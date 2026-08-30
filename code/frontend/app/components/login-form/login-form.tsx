import { useState } from "react";
import { useLogin } from "../../hooks/use-login";

export function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { submit, loading, error } = useLogin();

    return (
        <form
            className="login-form"
            onSubmit={(event) => {
                event.preventDefault();
                void submit({ username, password });
            }}
        >
            <div className="login-form__field">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    autoComplete="username"
                    required
                />
            </div>
            <div className="login-form__field">
                <label htmlFor="password">Mot de passe</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                />
            </div>
            {error && (
                <p className="login-form__error" role="alert">
                    {error}
                </p>
            )}
            <button
                className="login-form__submit"
                type="submit"
                disabled={loading}
            >
                {loading ? "Connexion…" : "Se connecter"}
            </button>
            <p className="login-form__forgot">Mot de passe oublié ?</p>
        </form>
    );
}
