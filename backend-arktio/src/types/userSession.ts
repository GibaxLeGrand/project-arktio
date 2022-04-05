interface UserSession {
    userUUID: string,
    userName: string
}


// Override sessionData type
declare module "express-session" {
    interface SessionData {
        user: UserSession
    }
}

export type {UserSession};