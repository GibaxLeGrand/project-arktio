interface UserSession {
    userId: number,
    userName: string
}

declare module "express-session" {
    interface SessionData {
        user: UserSession
    }
}

export type {UserSession};