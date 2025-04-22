import InternalUser from "../entities/internal-user";

export interface InternalUserRepository {
    save(internalUser: InternalUser): Promise<void>
    getInternalUserByEmail(email: string): Promise<InternalUser>
    getInternalUserByUuid(internalUserUuid: string): Promise<InternalUser>
}