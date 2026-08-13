import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SportSee" },
    { name: "description", content: "Tableau de bord de SportSee" },
  ];
}

export default function Home() {
  return (
    <main>
      <h1>SportSee</h1>
      <p>Suivez vos performances sportives</p>
    </main>
  );
}
