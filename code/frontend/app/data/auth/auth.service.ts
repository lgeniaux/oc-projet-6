import { API_BASE_URL } from "../../config/api";
import type { LoginRequestDTO, LoginResponseDTO } from "./auth.types";

export async function login(
    request: LoginRequestDTO,
): Promise<LoginResponseDTO> {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        throw new Error(
            response.status === 401
                ? "Identifiant ou mot de passe incorrect"
                : "Connexion au serveur impossible",
        );
    }

    const data: LoginResponseDTO = await response.json();
    return data;
}
