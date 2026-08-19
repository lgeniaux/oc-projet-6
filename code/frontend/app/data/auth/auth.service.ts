import type { LoginRequestDTO, LoginResponseDTO } from './auth.types';

export async function login(request: LoginRequestDTO): Promise<LoginResponseDTO>{
    const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: LoginResponseDTO = await response.json();
    return data;
}