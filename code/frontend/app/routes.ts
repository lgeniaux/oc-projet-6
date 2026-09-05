import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    layout("routes/layout.tsx", [
        route("dashboard", "routes/dashboard.tsx"),
        route("profile", "routes/profile.tsx"),
        route("*", "routes/not-found.tsx"),
    ]),
] satisfies RouteConfig;
