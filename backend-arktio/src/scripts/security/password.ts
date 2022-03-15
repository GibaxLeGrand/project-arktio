import crypto from "crypto"

export function hash_password(password: string) : string {
    const salt = crypto.randomBytes(8).toString("hex")
    const hash = crypto.createHash("sha256").update(salt+password).digest("hex");
    return `${salt}$${hash}`;
}

export function validate_password(password: string, hashed : string) : boolean {
    const [salt, hash] = hashed.split("$");
    const hashed_password = crypto.createHash("sha256").update(salt+password).digest("hex")
    return hashed_password === hash;
}