import {InternalUserRepository} from "../domain/repositories/internal-user.repository";
import InternalUser from "../domain/entities/internal-user";

export default class InternalUserRepositoryFake implements InternalUserRepository {
    constructor(
        private internalUsers: InternalUser[] = []
    ) {}

    async save(internalUser: InternalUser): Promise<void> {
        this.internalUsers.push(internalUser)
    }

    async getInternalUserByEmail(email: string): Promise<InternalUser> {
        return this.internalUsers.find((internalUser) => internalUser.email === email)
    }

    async getInternalUserByUuid(internalUserUuid: string): Promise<InternalUser> {
        return this.internalUsers.find((internalUser) => internalUser.internalUserUuid === internalUserUuid)
    }
}