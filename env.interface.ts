export interface AppConfig {
    PORT: number;
    APP_ENV: string;
}

export interface JwtConfig {
    JWT_SECRET: string;
}

export interface SocketConfig {
    SOCKET_SERVER: string;
}
