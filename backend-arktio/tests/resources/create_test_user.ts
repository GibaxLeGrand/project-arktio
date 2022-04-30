import * as db from '../../src/bdd';

export async function createTestUser(name: string, email: string) : Promise<string> {
    let uuid: string;
    
    try {
        await db.getUserAuthentificate(email).then(user => {
            uuid = user.user_uuid;
        });
    } catch( error: any) {
        await db.putUser(name, email, "testpassword").then(user => {
            uuid = user.user_uuid;
        });
    }

    return uuid;
}