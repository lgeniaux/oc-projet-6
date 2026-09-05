import { Link } from "react-router";
import "../styles/not-found.css";

export function meta() {
    return [
        { title: "Page introuvable - SportSee" },
        { name: "description", content: "Cette page n'existe pas" },
    ];
}

export default function NotFound() {
    return (
        <main className="not-found-page">
            <section className="not-found-card">
                <p className="not-found-card__code">404</p>
                <h1>Cette page n’existe pas</h1>
                <p>
                    L’adresse saisie est incorrecte ou la page a été déplacée.
                </p>
                <Link to="/dashboard">Retourner au dashboard</Link>
            </section>
        </main>
    );
}
