import { Navigate } from "react-router";
import type { Route } from "./+types/home";
import { API_BASE_URL } from "../config/api";
import { useAuth } from "../contexts/auth-context";
import { LoginForm } from "../components/login-form/login-form";
import "../styles/login.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SportSee" },
    { name: "description", content: "Tableau de bord de SportSee" },
  ];
}

export default function Home() {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="login-page">
      <section className="login-page__content">
        <div className="login-logo">
          <span className="app-logo__mark" aria-hidden="true" />
          SPORTSEE
        </div>

        <div className="login-card">
          <h1>
            Transformez
            <br />
            vos stats en résultats
          </h1>
          <h2>Se connecter</h2>
          <LoginForm />
        </div>
      </section>

      <div className="login-page__visual">
        <img src={`${API_BASE_URL}/images/emma.jpg`} alt="" />
        <p className="login-page__message">
          Analysez vos performances en un clin d’œil, suivez vos progrès et
          atteignez vos objectifs.
        </p>
      </div>
    </main>
  );
}
