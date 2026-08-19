export type LoginRequestDTO = {
    username: string;
    password: string;
};

export type LoginResponseDTO = {
    token: string;
    userId: string;
};