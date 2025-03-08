import InternalUser from "./internal-user";

export interface InternalUserRepository {
    save(internalUser: InternalUser): Promise<void>
    getInternalUserByEmail(email: string): Promise<InternalUser>
}